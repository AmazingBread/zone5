<template>
    <div>
        <div class="col-12 p-1">
            <div
                class="boxstyle2"
                style="font-size: 20px; "
            >
                ZONE5 관리자 화면
            </div>
        </div>
        <div style="margin: 24px 0">
            <h5>성장반 인원수 제한</h5>
            <input
                type="number"
                v-model.number="growthLimit"
                class="form-control mb-1"
                style="height: 3em; width: 100px; text-align: center;"
                @input="updateLimit($event.target.value)"
            />
        </div>

        <!-- 날짜 선택 및 이름 입력 -->
        <div style="margin: 24px 0">
            <h5>날짜 선택 및 이름 입력</h5>
            <div class="mb-3">
                <div
                    class="d-flex align-items-center"
                    v-for="(dateObj, index) in apiData"
                    :key="index"
                >
                    <input
                        type="text"
                        v-model="dateObj.date"
                        @blur="updateDate(index)"
                        class="form-control mb-1"
                        style="height: 3em;"
                    />
                </div>
            </div>
        </div>

        <!-- 신청자 목록 -->
        <div v-for="(dateObj, dateIdx) in apiData" :key="dateIdx" class="mb-3">
            <h6>{{ dateIdx + 1 }}. {{ dateObj.date }} ({{ dateObj.user?.length || 0 }}명)</h6>

            <div v-if="dateObj.user && dateObj.user.length" style="padding:10px; border:1px solid #dee2e6; border-radius:10px; margin-bottom:10px;">
                <!-- 훈련반 표시 (한 번만) -->
                <div v-if="dateObj.user.some(u => u.class === '선수반')" style="width:100%; font-weight:bold; margin-bottom:4px;">
                    선수반 ({{ dateObj.user.filter(u => u.class === '선수반').length }}명)
                </div>
                <div class="d-flex flex-wrap">
                    <div
                        v-for="(user, userIdx) in dateObj.user"
                        :key="userIdx"
                        v-if="user.class === '선수반'"
                        class="mb-2"
                        style="padding:10px; border:1px solid #dee2e6; border-radius:20px; font-size:15px; width: calc(50% - 8px); margin-right: 8px; display:flex; align-items:center;"
                    >
                        <!-- 입금 상태 버튼 -->
                        <button
                            class="btn"
                            :class="{ 'paid': user.paid, 'unpaid': !user.paid }"
                            style="padding:0.2rem 0.5rem; font-size:10px; margin-right:8px; border-radius:12px; font-weight:bold; border:1px solid;"
                            @click="togglePayment(dateIdx, userIdx)"
                        >
                            {{ user.paid ? '입완' : '미입금' }}
                        </button>

                        <!-- 이름 -->
                        <div class="font-weight-bold" style="flex:1; text-align:center;">{{ user.name }}</div>

                        <!-- 삭제 버튼 -->
                        <button
                            @click="deleteApplicant(dateIdx, userIdx)"
                            class="btn"
                            style="padding:0.2rem 0.5rem; font-size:10px; margin-left:8px; border-radius:12px; font-weight:bold; border:1px solid #ff1f1f; background:#ff4d4f; color:#ffffff;"
                        >
                            삭제
                        </button>
                    </div>
                </div>

                <!-- 강습반 표시 -->
                <div v-if="dateObj.user.some(u => u.class === '성장반')" style="width:100%; font-weight:bold; margin:10px 0 4px 0;">
                    성장반 ({{ dateObj.user.filter(u => u.class === '성장반').length }}명)
                </div>
                <div class="d-flex flex-wrap">
                    <div
                        v-for="(user, userIdx) in dateObj.user"
                        :key="userIdx + '-lesson'"
                        v-if="user.class === '성장반'"
                        class="mb-2"
                        style="padding:10px; border:1px solid #dee2e6; border-radius:20px; font-size:15px; width: calc(50% - 8px); margin-right: 8px; display:flex; align-items:center;"
                    >
                        <!-- 입금 상태 버튼 -->
                        <button
                            class="btn"
                            :class="{ 'paid': user.paid, 'unpaid': !user.paid }"
                            style="padding:0.2rem 0.5rem; font-size:10px; margin-right:8px; border-radius:12px; font-weight:bold; border:1px solid;"
                            @click="togglePayment(dateIdx, userIdx)"
                        >
                            {{ user.paid ? '입완' : '미입금' }}
                        </button>

                        <!-- 이름 -->
                        <div class="font-weight-bold" style="flex:1; text-align:center;">{{ user.name }}</div>

                        <!-- 삭제 버튼 -->
                        <button
                            @click="deleteApplicant(dateIdx, userIdx)"
                            class="btn"
                            style="padding:0.2rem 0.5rem; font-size:10px; margin-left:8px; border-radius:12px; font-weight:bold; border:1px solid #ff1f1f; background:#ff4d4f; color:#ffffff;"
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 전체 삭제 버튼 -->
        <div class="text-center mb-3">
            <button class="btn btn-danger" @click="deleteAllUsers">🔥 전체 초기화</button>
        </div>
    </div>
</template>

<script>
import { getDatabase, ref, set, get, onValue } from "firebase/database";

export default {
    data() {
        return {
            dbPath: "zone5",
            apiData: [], // DB 데이터를 바로 사용
            userName: "",
            selectedDates: [],
            settingsPath: "zone5_settings", // 설정값 경로 추가
        };
    },
    computed: {
        // Vuex에서 실시간으로 값 가져오기
        growthLimit() {
            return this.$store.state.growthLimit;
        }
    },
    mounted() {
        this.loadUserData();
        this.loadSettings(); // 설정값 로드 추가
    },
    methods: {
        loadUserData() {
            const db = getDatabase();
            const dbRef = ref(db, this.dbPath);

            onValue(dbRef, (snapshot) => {
                let data = snapshot.val() || [];
                // 최소 4개 슬롯 확보
                while (data.length < 4) {
                    data.push({ date: `날짜${data.length + 1}`, user: [] });
                }
                this.apiData = data;
            });
        },
        // 1. 설정값(인원 제한) 불러오기
        loadSettings() {
            const db = getDatabase();
            const limitRef = ref(db, `${this.settingsPath}/growthLimit`);

            // 실시간 리스너 연결
            onValue(limitRef, (snapshot) => {
                const val = snapshot.val();
                if (val !== null) {
                    this.growthLimit = val;
                    // Vuex를 사용 중이라면 여기서 store에도 반영
                    this.$store.commit('SET_GROWTH_LIMIT', val);
                }
            });
        },
        updateDate(index) {
            const newDate = this.apiData[index].date.trim();
            if (!newDate) return;
            const db = getDatabase();
            set(ref(db, this.dbPath), this.apiData);
        },
        // 2. 인원 제한 수정 시 DB 저장
        updateLimit(newVal) {
            const limit = Number(newVal);
            if (this.growthLimit < 1) {
                alert("최소 1명 이상이어야 합니다.");
                this.growthLimit = 1;
            }
            const db = getDatabase();
            set(ref(db, `${this.settingsPath}/growthLimit`), limit)
            .then(() => {
                console.log("인원 제한 업데이트 완료");
            });
        },
        submit() {
            const name = this.userName.trim();
            if (!name) return alert("이름을 입력해주세요 행님!");
            if (!this.selectedDates.length) return alert("날짜를 선택해주세요 행님!");

            const db = getDatabase();
            const dbRef = ref(db, this.dbPath);

            get(dbRef).then(snapshot => {
                let currentData = snapshot.val() || [];

                this.selectedDates.forEach(selDate => {
                    // 해당 날짜 객체 찾기
                    let dateObj = currentData.find(d => d.date === selDate);

                    if (!dateObj) {
                        // 사실 없어서는 안 되지만, 안전하게 처리
                        dateObj = { date: selDate, user: [] };
                        currentData.push(dateObj);
                    }

                    // user 배열 없으면 초기화
                    if (!Array.isArray(dateObj.user)) dateObj.user = [];

                    // 신청자 추가
                    dateObj.user.push({ name, paid: false });
                });

                set(dbRef, currentData).then(() => {
                    this.userName = '';
                    this.selectedDates = [];
                });
            });
        },
        togglePayment(dateIdx, userIdx) {
            const db = getDatabase();
            get(ref(db, this.dbPath)).then((snapshot) => {
                let data = snapshot.val() || [];
                if (data[dateIdx] && data[dateIdx].user[userIdx]) {
                    data[dateIdx].user[userIdx].paid = !data[dateIdx].user[userIdx].paid;
                    set(ref(db, this.dbPath), data);
                }
            });
        },
        deleteApplicant(dateIdx, userIdx) {
            if (!confirm("신청자를 삭제하시겠습니까?")) return;
            const db = getDatabase();
            get(ref(db, this.dbPath)).then((snapshot) => {
                let data = snapshot.val() || [];
                if (data[dateIdx]) {
                    data[dateIdx].user.splice(userIdx, 1);
                    set(ref(db, this.dbPath), data);
                }
            });
        },
        deleteAllUsers() {
            if (!confirm("완전 초기화 하시겠습니까?")) return;

            const db = getDatabase();
            const initialData = [
                { date: "날짜1", user: [] },
                { date: "날짜2", user: [] },
                { date: "날짜3", user: [] },
                { date: "날짜4", user: [] },
            ];
            set(ref(db, this.dbPath), initialData).then(() => {
                this.apiData = initialData; // Vue data도 바로 갱신
            });
        },
    },
};
</script>

<style>
.modal-box {
    background: white;
    padding: 24px;
    border-radius: 8px;
    width: 300px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
