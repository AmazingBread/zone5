<template>
    <div>
        <!--<div style="height: 30px"></div>-->
        <p class="text-center" style="font-size: 22px; font-weight: bold">{{currentMonth}}월 마일리지 이벤트</p>
        <p class="text-center" style="font-size: 22px; font-weight: bold; padding-bottom: 20px;">
            <button class="fit-certify-button mb-2" @click="openNameChangeModal">이름 변경</button><br>
            - {{ userName }} -
        </p>
        <div class="fit-header-row mt-1">
            <div class="btn btn-primary w-100" @click="saveUserData">💾 저장하기</div>
        </div>
        <table class="fit-table">
            <thead>
            <tr>
                <th>{{ currentMonth }}월</th>
                <th>🏊 수영 (m)</th>
                <th>🏃 러닝 (m)</th>
                <th>합계 (pt)</th>
            </tr>
            <tr>
                <th>point</th>
                <th>
                    🏊 {{ swimPoints }} pt
                </th>
                <th>
                    🏃 {{ runPoints }} pt
                </th>
                <th><strong style="color:#e44;">{{ totalPoints }} pt</strong></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(day, index) in daysInMonth" :key="index" :class="{ 'today-row': isToday(day) }">
                <td style="width:60px;">{{ day }}일</td>
                <td><input type="number" v-model="records[day].swim" style="width:80px"/></td>
                <td><input type="number" v-model="records[day].run" style="width:80px"/></td>
                <td style="font-size:13px; color:#555;">
                    {{ getDayPoints(day) }}
                </td>
            </tr>
            </tbody>
        </table>
        <div class="fit-header-row mt-3">
            <div class="btn btn-primary w-100" @click="saveUserData">💾 저장하기</div>
        </div>
        <div class="fit-header-row mt-1" style="display: flex; justify-content: flex-end; align-items: center;">
            <div class=" btn btn-danger" @click="deleteUser(userName)">삭제</div>
        </div>
        <!-- 이름 등록 모달 -->
        <div v-if="showRegisterModal" class="modal-backdrop">
            <div class="modal-box">
                <h2 class="modal-title">✏️ 이름 변경</h2>
                <input
                    type="text"
                    class="form-control mb-3"
                    placeholder="새 이름을 입력하세요"
                    v-model="userNameInput"
                />
                <div class="d-flex justify-content-end gap-2">
                    <button class="btn btn-secondary" @click="closeModal">닫기</button>
                    <button class="btn btn-primary" @click="submitNameChange">변경</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getDatabase, ref, set, get, update } from "firebase/database";

export default {
    data(){
        return {
            dbPath : 'fit_diary_zone_five',
            userName: '',
            showRegisterModal: false,
            userNameInput: '',
            records: {},
            daysInMonth: [], // ← 일자 리스트
            currentMonth: '', // ← 월 정보
            showGoalWarning: false,
        };
    },
    mounted(){
        this.userName = this.$route.params.userName;
        this.initMonth();
        this.loadUserData()
    },
    beforeUnmount() {
        // clearInterval(this.interval); // 컴포넌트가 파괴될 때 인터벌 해제
    },
    computed: {
        swimPoints() {
            const totalM = Object.values(this.records).reduce((sum, r) => sum + Number(r.swim || 0), 0);
            return parseFloat((totalM / 100).toFixed(2));
        },
        runPoints() {
            const totalM = Object.values(this.records).reduce((sum, r) => sum + Number(r.run || 0), 0);
            return parseFloat((totalM / 400).toFixed(2));
        },
        totalPoints() {
            return parseFloat((this.swimPoints + this.runPoints).toFixed(2));
        }
    },
    methods:{
        // 하루치 포인트 계산
        getDayPoints(day) {
            const r = this.records[day] || {};
            const swimPt = Number(r.swim || 0) / 100;
            const runPt  = Number(r.run  || 0) / 400;
            return parseFloat((swimPt + runPt).toFixed(2));
        },
        initMonth() {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const days = new Date(year, month, 0).getDate();

            this.currentMonth = month;
            this.daysInMonth = Array.from({ length: days }, (_, i) => i + 1);

            this.records = {};
            for (let i = 1; i <= days; i++) {
                this.records[i] = { swim: '', run: '', gym: '' };
            }
        },
        loadUserData() {
            const db = getDatabase();
            const userRef = ref(db, this.dbPath + '/' + this.userName);
            get(userRef).then(snapshot => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const savedRecords = data.records || {};

                    // 🔥 새 객체를 만들어서 한 번에 통째로 교체 (반응성 확실히 보장)
                    const newRecords = {};
                    Object.keys(this.records).forEach(day => {
                        const rec = savedRecords[day] ?? savedRecords[Number(day)];
                        const swimVal = rec ? Number(rec.swim) : 0;
                        const runVal = rec ? Number(rec.run) : 0;

                        newRecords[day] = {
                            swim: swimVal ? swimVal : '',
                            run: runVal ? runVal : '',
                            gym: ''
                        };
                    });

                    this.records = newRecords; // ← 통째로 교체
                } else {
                    alert("데이터를 찾을 수 없습니다 행님!");
                    this.initMonth();
                }
            }).catch(error => {
                console.error("데이터 로드 실패:", error);
                alert("데이터 로드 중 오류가 발생했습니다 행님!");
            });
        },
        saveUserData() {
            const db = getDatabase();
            const userRef = ref(db, this.dbPath + '/' + this.userName);

            // ✅ 운동 기록 null/빈값 → 0 초기화
            Object.keys(this.records).forEach(day => {
                ['swim', 'run'].forEach(type => {
                    const val = this.records[day][type];
                    if (val === null || val === undefined || val === '') {
                        this.records[day][type] = 0;
                    }
                });
            });
            get(userRef).then(snapshot => {
                const existing = snapshot.val() || {};
                const payload = {
                    createdAt: existing.createdAt || Date.now(),
                    records  : this.records
                    // ❌ goals 삭제
                };

                update(userRef, payload)
                .then(() => {
                    alert("저장 완료됐습니다 행님!");
                    this.$router.push('/fit_diary_zone_five');
                })
                 .catch((error) => {
                    console.error("저장 실패:", error);
                    alert("저장 실패했습니다 행님!");
                });
            });
        },
        deleteUser(userName) {
            const password = prompt("삭제하려면 비밀번호를 입력하세요!");
            if (password !== '3333') {
                alert("비밀번호가 틀렸습니다!");
                return;
            }

            const db = getDatabase();
            const userRef = ref(db, this.dbPath + '/' + userName);
            if (confirm(`${userName}님 데이터를 정말 삭제할까요?`)) {
                set(userRef, null)
                .then(() => {
                    alert(`${userName}님 삭제 완료됐습니다!`);
                    this.$router.push('/fit_diary_zone_five');
                })
                .catch(() => alert("삭제 실패했습니다 행님!"));
            }
        },
        isToday(day) {
            const today = new Date();
            const currentDay = today.getDate();
            const currentMonth = today.getMonth() + 1;
            return day === currentDay && parseInt(this.currentMonth) === currentMonth;
        },
        submitNameChange() {
            const newName = this.userNameInput.trim();
            if (!newName) return alert("이름을 입력해 주세요 행님!");
            if (newName === this.userName) return alert("기존과 같은 이름입니다 행님!");

            const db = getDatabase();
            const oldRef = ref(db, this.dbPath + '/' + this.userName);
            const newRef = ref(db, this.dbPath + '/' + newName);

            get(newRef).then(snap => {
                if (snap.exists()) {
                    alert("이미 존재하는 이름입니다 행님!");
                    return;
                }

                // 기존 데이터 가져와서 새로 저장
                get(oldRef).then(oldSnap => {
                    if (!oldSnap.exists()) return alert("기존 데이터가 없습니다!");

                    const data = oldSnap.val();
                    const payload = {
                        goals: data.goals || {},
                        records: data.records || {},
                        createdAt: data.createdAt || Date.now()
                    };

                    set(newRef, payload)
                    .then(() => set(oldRef, null))
                     .then(() => {
                        alert(`'${this.userName}' ➡ '${newName}' 이름 변경 완료됐습니다 행님!`);
                        this.showRegisterModal = false;
                        this.$router.push('/fit_diary_zone_five');
                    });
                });
            });
        },
        openNameChangeModal() {
            this.userNameInput = this.userName; // 기존 이름 복사
            this.showRegisterModal = true;
        },
        closeModal() {
            this.showRegisterModal = false;
        },
    }
};
</script>

<style>
.today-row {
    background-color: #e0f0ff !important; /* 은은한 파란색 배경 */
}
</style>
