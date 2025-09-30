<template>
<div>
    <div class="col-12 p-1">
        <div
            class="boxstyle2"
            style="font-size: 20px; "
        >
            ZONE5 훈련신청서 작성
        </div>
    </div>

    <!-- 날짜 선택 및 이름 입력 -->
    <div style="margin: 24px 0">
        <div class="mb-5">
            <h4 class="d-block font-weight-bold mb-2 text-center">훈련 날짜 선택</h4>
            <div
                class="mb-2 d-flex align-items-center"
                v-for="(dateObj, index) in apiData"
                :key="index"
                style="padding-left:30px;"
            >
                <input
                    class="form-check-input"
                    type="checkbox"
                    :id="'chk-' + index"
                    :value="dateObj.date"
                    v-model="selectedDates"
                    style="width: 1.8em; height: 1.8em; margin-right:10px;"
                />
                <label :for="'chk-' + index" style="cursor: pointer;">
                    {{ dateObj.date }}
                </label>
            </div>
        </div>
        <!-- 클래스 선택 -->
        <div class="mb-3">
            <h4 class="d-block font-weight-bold mb-3 text-center">훈련반/강습반 선택</h4>
            <div class="d-flex justify-content-center align-items-center mt-3" style="gap: 30px;">
                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="radio"
                        id="training"
                        value="훈련반"
                        v-model="selectedClass"
                        style="width: 20px; height: 20px;"
                    >
                    <label class="form-check-label" for="training" style="font-size:16px; font-weight:bold; cursor:pointer;">
                        &nbsp;훈련반
                    </label>
                </div>
                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="radio"
                        id="lesson"
                        value="강습반"
                        v-model="selectedClass"
                        style="width: 20px; height: 20px;"
                    >
                    <label class="form-check-label" for="lesson" style="font-size:16px; font-weight:bold; cursor:pointer;">
                        &nbsp;강습반
                    </label>
                </div>
            </div>

        </div>
        <div>
            <input
                type="text"
                class="form-control mb-3"
                placeholder="이름을 입력하세요"
                v-model="userName"
                style="height: 3em;"
            />
        </div>

        <div class="mb-3">
            <label class="form-label fw-bold">면책 동의</label>
            <div class="form-control mt-2" style="font-size: 11px; height: 100px; overflow-y: auto; border: 1px solid #ced4da; padding: 0.375rem 0.75rem; border-radius: 0.25rem; white-space: pre-wrap;">
                본 면책동의서는 스타트 강습 및 자율 스타트 연습에 참여하기 전 반드시 읽고 동의해야 하며, 카카오톡 투표에 참여한 순간 동의한 것으로 간주됩니다.<br><br>
                1.본인은 스타트 강습 및 자율 스타트 연습 중 발생할 수 있는 사고와 상해에 대해 책임을 스스로 지겠다는 것에 동의합니다.<br><br>
                2.강습 진행 전/중 사고나 환경적 요인으로 강습이 중단될 수 있음을 이해하며 동의합니다.<br><br>
                3.강습 및 자율 연습 중 발생한 사고로 인한 부상과 후유증에 대해 동호회와 강사님에게 책임을 묻지 않겠습니다.<br><br>
                4.강습 및 연습 시 강사님의 지시에 따르며, 사고 발생 시 법적 책임을 묻지 않겠다고 약속합니다.<br><br>
                5.카카오톡 투표 및 댓글 참가 의사를 표시한 순간 본 면책동의서에 동의한 것으로 간주됩니다.<br><br>
                6.강습 중 강사님의 판단에 따라 진행 여부가 결정되며, 불응 시 퇴장 조치가 있을 수 있습니다.<br><br>
                7.응급처치가 필요한 경우 거부할 수 있으며, 동의한 경우 이에 대한 책임을 묻지 않겠습니다.<br><br>
                8.본인은 안전을 최우선으로 하며, 문제가 발생할 경우 강습을 즉시 중지하거나 퇴수할 수 있습니다.<br><br>
                9.본인은 강습 및 연습 중 촬영된 영상 및 사진이 동호회 활동과 관련된 홍보나 기록을 위해 사용되는 것에 동의합니다.<br><br>
                10.위 내용을 모두 읽고 동의합니다.<br><br>
            </div>
        </div>
        <div>
            <div
                class="boxstyle3"
                style="font-size: 20px; "
                @click="submit"
            >
                신청하기
            </div>
        </div>
        <div style="background:#f6faff; border:1px solid #eee; border-radius: 2px; padding:10px; margin: 30px 0">
            <h5 class="form-label fw-bold">ZONE5 훈련 안내</h5>
            <div style="font-size:14px; padding:10px; line-height:1.7; max-width:400px;">
                <p style="margin:4px 0;">
                    📅 <strong>일요일 오전 6시 ~ 8시 (2시간)</strong><br>
                    📍 부산 해운대구 선수촌로 122 지하1층 (편의점쪽)
                </p>

                <p style="margin:8px 0;">
                    <span style="font-weight:bold; color:#2a5bd7;">1.</span> <strong>정기회원</strong><br>
                    - 매월 2회: 30,000원 (이월 불가)<br>
                    - 3회차부터: 회당 15,000원 추가<br>
                    - 참가 전일까지 입금
                </p>

                <p style="margin:8px 0;">
                    <span style="font-weight:bold; color:#2a5bd7;">2.</span> <strong>게스트 (월 1회 참석)</strong><br>
                    - 회당 20,000원<br>
                    - 참가 전일까지 입금
                </p>

                <p style="margin:8px 0;">
                    <span style="font-weight:bold; color:#2a5bd7;">3.</span> <strong>레인 안내</strong><br>
                    - 1~2레인: 초·중급 무료 강습 (접영 가능자 대상)<br>
                    - 3~6레인: 훈련반 운영
                </p>

                <p style="margin:8px 0;">
                    <span style="font-weight:bold; color:#2a5bd7;">4.</span> <strong>훈련반</strong><br>
                    - 드릴 + 인터벌 2,500~3,000m 후 스타트 연습<br>
                    - 핀 사용 가능
                </p>

                <p style="margin:8px 0;">
                    ❗ 문의: 010-5822-8122 (노원기)
                </p>
            </div>
        </div>
        <div style="font-size:15px; background:#f9fbfd; border:1px solid #e5e8eb; border-radius:6px; padding:14px 16px; margin:24px 0; max-width:420px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <label class="form-label fw-bold" style="margin:0;">💳 입금 계좌번호 안내</label>
                <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    @click="copyAccountNumber"
                    style="font-size:11px; padding:2px 6px;">
                    입금 계좌번호 복사
                </button>
            </div>

            <p ref="accountText" style="font-size:15px; font-weight:bold; color:#1a1a1a; margin:0 0 10px;">
                3333-20-4133950 카카오뱅크 노원기
            </p>

            <div style="background:#f1f5f9; border-radius:4px; padding:8px 10px;">
                <p style="font-size:13px; font-weight:bold; margin:0 0 4px; color:#333;">※ 환불 규정</p>
                <ul style="font-size:13px; margin:0; padding-left:18px; line-height:2.2;">
                    <li>날짜 변경 및 환불 가능</li>
                    <li style="font-size:13px;">
                        입금 후
                        <span style="font-size:12px; background:#ffec99; color:#7a5900; padding:1px 8px; border-radius:12px; font-weight:bold; border:1px solid #ffd324;">
                            미입금
                        </span>
                        &nbsp;→
                        <span style="font-size:12px; background:#81c784; color:#1b5e20; padding:1px 8px; border-radius:12px; font-weight:bold; border:1px solid #4caf50;">
                            입완
                        </span>
                        &nbsp;버튼 클릭
                    </li>
                    <li style="font-size:13px;">
                        날짜 변경은
                        <span style="font-size:12px; background:#ff4d4f; color:#ffffff; padding:1px 8px; border-radius:12px; font-weight:bold; border:1px solid #ff1f1f;">
                            삭제
                        </span>
                        &nbsp;후 다시
                        <span style="font-size:12px; background:#ff69b4; color:#ffffff; padding:1px 8px; border-radius:12px; font-weight:bold; border:1px solid #ff1493;">
                            신청
                        </span>
                    </li>
                    <li>당일 불참 시 환불 불가</li>
                </ul>
            </div>
        </div>

    </div>

    <!-- 신청자 목록 -->
    <div v-for="(dateObj, dateIdx) in apiData" :key="dateIdx" class="mb-3">
        <h6>{{ dateIdx + 1 }}. {{ dateObj.date }} ({{ dateObj.user?.length || 0 }}명)</h6>

        <div v-if="dateObj.user && dateObj.user.length" style="padding:10px; border:1px solid #dee2e6; border-radius:10px; margin-bottom:10px;">
            <!-- 훈련반 표시 (한 번만) -->
            <div v-if="dateObj.user.some(u => u.class === '훈련반')" style="width:100%; font-weight:bold; margin-bottom:4px;">
                훈련반 ({{ dateObj.user.filter(u => u.class === '훈련반').length }}명)
            </div>
            <div class="d-flex flex-wrap">
                <div
                    v-for="(user, userIdx) in dateObj.user"
                    :key="userIdx"
                    v-if="user.class === '훈련반'"
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
            <div v-if="dateObj.user.some(u => u.class === '강습반')" style="width:100%; font-weight:bold; margin:10px 0 4px 0;">
                강습반 ({{ dateObj.user.filter(u => u.class === '강습반').length }}명)
            </div>
            <div class="d-flex flex-wrap">
                <div
                    v-for="(user, userIdx) in dateObj.user"
                    :key="userIdx + '-lesson'"
                    v-if="user.class === '강습반'"
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
            selectedClass: "", // 추가: 훈련반/강습반 선택
        };
    },
    mounted() {
        this.loadUserData();
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
        updateDate(index) {
            const newDate = this.apiData[index].date.trim();
            if (!newDate) return;
            const db = getDatabase();
            set(ref(db, this.dbPath), this.apiData);
        },
        submit() {
            const name = this.userName.trim();
            if (!name) return alert("이름을 입력해 주세요");
            if (!this.selectedDates.length) return alert("훈련날짜를 선택해 주세요");
            if (!this.selectedClass) return alert("반을 선택해 주세요"); // 필수 선택 체크

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

                    dateObj.user.push({
                        name,
                        paid: false,
                        class: this.selectedClass // 추가
                    });
                });

                set(dbRef, currentData).then(() => {
                    this.userName = '';
                    this.selectedDates = [];
                    this.selectedClass = '';

                    alert("신청이 정상적으로 완료되었습니다!");
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
        copyAccountNumber(event) {
            event.preventDefault(); // 기본 동작 방지
            // 참조된 계좌번호 텍스트 가져오기
            const accountText = '3333-20-4133950 카카오뱅크 노원기'

            // 클립보드에 텍스트 복사
            navigator.clipboard.writeText(accountText)
            .then(() => {
                alert("계좌번호가 복사되었습니다: ");
            })
                      .catch(error => {
                console.error("계좌번호 복사 실패:", error);
            });
        }
    },
};
</script>

<style>
 .paid {
     background-color: #81c784 !important; /* 진한 초록 */
     color: #1b5e20 !important;
     border-color: #4caf50 !important;
 }

.unpaid {
    background-color: #ffec99 !important; /* 진한 노랑 */
    color: #7a5900 !important;
    border-color: #ffd324 !important;
}
</style>
