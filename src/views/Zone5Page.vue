<template>
<div class="mobile-detail training-page">
    <header class="detail-hero"><router-link to="/" class="back-link">‹ 홈으로</router-link><span class="detail-eyebrow">TRAIN WITH ZONE5</span><h1>함께하는 훈련,<br>여기서 시작해요.</h1><p>날짜와 반을 선택하고 훈련을 신청해 주세요.</p></header>
    <div class="program-image"><img src="@/assets/image/전체.png" class="img-fluid" alt="ZONE5 훈련 프로그램 안내"></div>
    <!-- 날짜 선택 및 이름 입력 -->
    <div class="application-form">
        <div class="form-section">
            <h4 class="section-title">01. 훈련 날짜 선택</h4>
            <div
                class="date-option"
                :class="{ selected: selectedDates.includes(dateObj.date) }"
                v-for="(dateObj, index) in apiData"
                :key="index"

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
        <div class="form-section">
            <h4 class="section-title">02. 훈련반 / 특강반 선택</h4>
            <div class="class-options">
                <div class="form-check class-option">
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
                <div class="form-check class-option">
                    <input
                        class="form-check-input"
                        type="radio"
                        id="lesson"
                        value="특강반"
                        v-model="selectedClass"
                        style="width: 20px; height: 20px;"
                    >
                    <label class="form-check-label" for="lesson"
                           style="font-size:16px; font-weight:bold; cursor:pointer;"
                    >
                        &nbsp;특강반
                        <span v-if="isGrowthClassFull" style="color: red; font-size: 12px; font-weight: normal;">
            (선택 날짜 중 마감 있음)
        </span>
                    </label>
                </div>
            </div>

        </div>
        <div class="form-section">
            <label for="training-name" class="section-title">03. 신청자 이름</label>
            <input
                id="training-name"
                autocomplete="name"
                type="text"
                class="form-control mb-3"
                placeholder="이름을 입력하세요"
                v-model="userName"
                style="height: 3em;"
            />
        </div>

        <div class="mb-3">
            <label class="form-label fw-bold">면책 동의</label>
            <div class="waiver-text" tabindex="0">
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
            <button type="button" class="primary-action" @click="submit">훈련 신청하기 <span aria-hidden="true">↗</span></button>
        </div>
        <section class="training-info guide-card">
            <h2>훈련 안내</h2><p class="guide-lead">일요일 오전 7:00–9:00 · 2시간</p>
            <div class="guide-block"><h3>훈련 장소</h3><div class="venue"><strong>만덕 카멜리아</strong><span>덕천로 257 지하 2층</span><small>무료 주차 2시간 · 차량 등록 필수</small></div><div class="venue"><strong>동래 클래스윔</strong><span>명장로20번길 98</span><small>무료 주차 3시간 · 차량 등록 필수</small></div></div>
            <div class="guide-block"><h3>회비 및 운영비</h3><dl class="fee-list"><div><dt>연회비</dt><dd>60,000원 <small>/ 연</small></dd></div><div><dt>훈련반</dt><dd>15,000원 <small>/ 회</small></dd></div><div><dt>특강반</dt><dd>20,000원 <small>/ 회</small></dd></div><div><dt>게스트</dt><dd>25,000원 <small>/ 회</small></dd></div><div><dt>단체</dt><dd>별도 문의</dd></div></dl><p class="guide-note">참가 전일까지 입금해 주세요.</p></div>
            <div class="guide-block"><h3>프로그램</h3><div class="program-description"><strong>훈련반</strong><p>드릴 + 인터벌 2,500–3,000m 후 스타트 연습<br>핀 사용 가능</p></div><div class="program-description"><strong>특강반</strong><p>드릴 + 교정 1,000–1,500m 후 스타트 연습<br>매회 강사 교대 강습 · 훈련 스케줄 참조</p></div></div>
            <a class="contact-link" href="tel:01058228122">문의 <strong>010-5822-8122</strong><span>노원기 ↗</span></a>
        </section>
        <section class="account-info guide-card">
            <div class="account-heading"><h2>입금 안내</h2><button type="button" class="copy-account" @click="copyAccountNumber">계좌 복사</button></div>
            <div class="account-number" ref="accountText"><small>카카오뱅크 · 노원기</small><strong>3333-20-4133950</strong></div>
            <div class="guide-block"><h3>입금자명은 이렇게 적어 주세요</h3><p class="guide-note">이름 + 훈련 날짜 + 신청 반</p><div class="deposit-example">노원기 17 훈련반 <span>또는</span> 노원기 17 특강</div></div>
            <div class="guide-block"><h3>입금 확인 및 변경·환불</h3><ul class="refund-list"><li>입금 후 아래 신청자 목록에서 <span class="inline-status">미입금</span> 버튼을 눌러 <span class="inline-status complete">입금완료</span>로 변경해 주세요.</li><li>날짜를 변경하려면 기존 신청의 <strong>×</strong> 버튼을 눌러 삭제한 뒤 다시 신청해 주세요.</li><li>날짜 변경 및 환불이 가능합니다. <strong class="refund-warning">당일 불참 시에는 환불되지 않습니다.</strong></li></ul></div>
        </section>
    </div>

    <!-- 신청자 목록 -->
    <h2 class="section-title roster-title">함께 훈련하는 멤버</h2>
    <div v-for="(dateObj, dateIdx) in apiData" :key="dateIdx" class="roster-card mb-3">
        <header class="roster-heading"><div><span class="roster-date">{{ rosterHeading(dateObj.date).date }}</span><h3 v-if="rosterHeading(dateObj.date).detail">{{ rosterHeading(dateObj.date).detail }}</h3></div><span class="roster-count">{{ dateObj.user?.length || 0 }}명</span></header>

        <div v-if="dateObj.user && dateObj.user.length" class="roster-body">
            <!-- 훈련반 표시 (한 번만) -->
            <div v-if="dateObj.user.some(u => u.class === '훈련반')" class="roster-class-label">
                훈련반 <span>{{ dateObj.user.filter(u => u.class === '훈련반').length }}</span>
            </div>
            <div class="applicant-grid">
                <div v-for="(user, userIdx) in dateObj.user" :key="userIdx" v-if="user.class === '훈련반'" class="applicant-row">
                    <span class="applicant-name">{{ user.name }}</span>
                    <button type="button" class="payment-status" :class="{ 'is-paid': user.paid }" :aria-label="user.name + ' 입금 상태 변경: ' + (user.paid ? '입금완료' : '미입금')" @click="togglePayment(dateIdx, userIdx)">{{ user.paid ? '입금완료' : '미입금' }}</button>
                    <button type="button" class="remove-applicant" :aria-label="user.name + ' 신청 삭제'" @click="deleteApplicant(dateIdx, userIdx)">×</button>
                </div>
            </div>

            <!-- 강습반 표시 -->
            <div v-if="dateObj.user.some(u => u.class === '특강반')" class="roster-class-label">
                특강반 <span>{{ dateObj.user.filter(u => u.class === '특강반').length }}</span>
            </div>
            <div class="applicant-grid">
                <div v-for="(user, userIdx) in dateObj.user" :key="userIdx + '-lesson'" v-if="user.class === '특강반'" class="applicant-row">
                    <span class="applicant-name">{{ user.name }}</span>
                    <button type="button" class="payment-status" :class="{ 'is-paid': user.paid }" :aria-label="user.name + ' 입금 상태 변경: ' + (user.paid ? '입금완료' : '미입금')" @click="togglePayment(dateIdx, userIdx)">{{ user.paid ? '입금완료' : '미입금' }}</button>
                    <button type="button" class="remove-applicant" :aria-label="user.name + ' 신청 삭제'" @click="deleteApplicant(dateIdx, userIdx)">×</button>
                </div>
            </div>
        </div>
        <p v-else class="roster-empty">아직 신청한 멤버가 없어요.</p>
    </div>

</div>
</template>

<script>
import { getDatabase, ref, set, get, onValue } from "firebase/database";

export default {
    data() {
        return {
            dbPath: "zone5",
            settingsPath: "zone5_settings", // 설정 경로 추가
            apiData: [], // DB 데이터를 바로 사용
            userName: "",
            selectedDates: [],
            selectedClass: "", // 추가: 훈련반/강습반 선택
        };
    },
    mounted() {
        this.loadUserData();
        this.loadSettings(); // 1. 설정값 로드 실행
    },
    watch: {
        // 1. 날짜를 변경할 때 체크
        selectedDates() {
            this.checkGrowthLimit();
        },
        // 2. 반(선수반/성장반)을 선택할 때 체크
        selectedClass(newVal) {
            if (newVal === '특강반') {
                this.checkGrowthLimit();
            }
        }
    },
    computed: {
        // 성장반이 마감되었는지 확인하는 로직
        isGrowthClassFull() {
            const limit = this.$store.state.growthLimit;
            if (this.selectedDates.length === 0) return false;

            // 선택된 모든 날짜에 대해 체크
            return this.selectedDates.some(selectedDate => {
                const targetDay = this.apiData.find(d => d.date === selectedDate);
                if (targetDay && targetDay.user) {
                    // 해당 날짜의 성장반 인원 계산
                    const count = targetDay.user.filter(u => u.class === '특강반').length;
                    return count >= limit; // 12명 이상이면 true
                }
                return false;
            });
        }
    },
    methods: {
        rosterHeading(value) {
            const text = String(value || '일정 안내');
            const match = text.match(/^(\d+월\s*\d+일(?:\s*\([^)]*\))?)\s*(.*)$/);
            return match ? { date: match[1], detail: match[2] } : { date: text, detail: '' };
        },
        loadSettings() {
            const db = getDatabase();
            const limitRef = ref(db, `${this.settingsPath}/growthLimit`);

            onValue(limitRef, (snapshot) => {
                const val = snapshot.val();
                if (val !== null) {
                    // 관리자가 바꾼 값(13)을 실시간으로 Vuex에 반영
                    this.$store.commit('SET_GROWTH_LIMIT', val);
                }
            });
        },
        // 마감 체크 공통 로직
        checkGrowthLimit() {
            const limit = this.$store.state.growthLimit;
            if (this.selectedClass === '특강반' && this.isGrowthClassFull) {
                alert(`선택하신 날짜 중 이미 특강반이 마감(${limit}명)된 날이 포함되어 있어 선택이 취소됩니다. 해당 날짜를 제외하거나 훈련반을 선택해 주세요.`);
                this.$nextTick(() => {
                    this.selectedClass = ''; // 선택 해제
                });
            }
        },
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

<style src="../styles/mobile-detail.css"></style>
