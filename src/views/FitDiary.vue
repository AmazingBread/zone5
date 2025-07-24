<template>
    <div>
        <p class="text-center">운동 인증 프로그램</p>

        <div>
            <div class="fit-user-box">
                <div class="fit-user-header">
                    <span>이영은</span>
                    <button class="fit-certify-button">인증추가</button>
                </div>
                <div class="fit-progress-bar">
                    <div class="fit-progress-fill fit-swim" style="width: 80%;">수영 80% (20회 20k)</div>
                </div>
                <div class="fit-progress-bar">
                    <div class="fit-progress-fill fit-run" style="width: 70%;">러닝 70% (10회 50k)</div>
                </div>
                <div class="fit-progress-bar">
                    <div class="fit-progress-fill fit-gym" style="width: 2%;">헬스 2% (1회)</div>
                </div>
            </div>
            <div class="fit-user-box">
                <div class="fit-user-header">
                    <span>황영균</span>
                    <div class="fit-certify-button">인증추가</div>
                </div>
                <div class="fit-progress-bar">
                    <div class="fit-progress-fill fit-swim" style="width: 80%;">수영 80% (20회 20k)</div>
                </div>
                <div class="fit-progress-bar">
                    <div class="fit-progress-fill fit-run" style="width: 70%;">러닝 70% (10회 50k)</div>
                </div>
                <div class="fit-progress-bar">
                    <div class="fit-progress-fill fit-gym" style="width: 30%;">헬스 30% (5회)</div>
                </div>
            </div>
        </div>
        <div class="fit-header-row">
            <div class="btn btn-outline-primary w-100" @click="showModal = true">인증신청(매달1회)</div>
        </div>
        <!-- 이름 등록 모달 -->
        <div v-if="showModal" class="modal-backdrop">
            <div class="modal-box">
                <h2 class="modal-title">💪 인증 신청</h2>
                <input
                    type="text"
                    class="form-control mb-3"
                    placeholder="이름을 입력하세요"
                    v-model="userName"
                />
                <div class="d-flex justify-content-end gap-2">
                    <button class="btn btn-secondary" @click="closeModal">닫기</button>
                    <button class="btn btn-primary" @click="submitName">신청</button>
                </div>
            </div>
        </div>

        <div class="fit-header-row">
            <div class="btn btn-primary w-100">💾 저장하기</div>
        </div>
        <div class="fit-user-header">
            <span>황영균</span>
            <div class="btn btn-danger">삭제</div>
        </div>
        <table class="fit-table">
            <thead>
            <tr>
                <th rowspan="2">{{ currentMonth }}월</th>
                <th colspan="3">목표</th>
            </tr>
            <tr>
                <th><input type="text" v-model="goals.swim" placeholder="100" /> k</th>
                <th><input type="text" v-model="goals.run" placeholder="50" /> k</th>
                <th><input type="text" v-model="goals.gym" placeholder="50" /> 회</th>
            </tr>
            <tr>
                <th>일자</th>
                <th>수영</th>
                <th>러닝</th>
                <th>헬스</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(day, index) in daysInMonth" :key="index">
                <td>{{ day }}일</td>
                <td><input type="text" v-model="records[day].swim" /> k</td>
                <td><input type="text" v-model="records[day].run" /> k</td>
                <td><input type="text" v-model="records[day].gym" /> 회</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    data(){
        return {
            showModal: false,
            userName: '',
            currentMonth: '',   // 월 텍스트용
            records: {},
            goals: {
                swim: '',
                run: '',
                gym: ''
            },
            daysInMonth: []
        };
    },
    mounted(){
        this.test()
    },
    beforeUnmount() {
        // clearInterval(this.interval); // 컴포넌트가 파괴될 때 인터벌 해제
    },
    methods:{
        test(){
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth(); // 0부터 시작 (7 = 8월)
            const days = new Date(year, month + 1, 0).getDate();
            this.currentMonth = month + 1; // 사람 기준으로 월 표시 (1~12)

            // 일자별 인증 기록 초기화
            for (let i = 1; i <= days; i++) {
                this.records[i] = { swim: '', run: '', gym: '' };
            }

            // daysInMonth 배열 초기화
            this.daysInMonth = Array.from({ length: days }, (_, i) => i + 1);
        },
        closeModal() {
            this.showModal = false;
            this.userName = '';
        },
        submitName() {
            if (this.userName.trim()) {
                alert(this.userName + ' 등록 완료! 🎉');
                this.closeModal();
            } else {
                alert('이름을 입력해주세요, 행님!');
            }
        }
    }
};
</script>

<style>
.modal-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    padding-bottom: 12px;
}
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal-box {
    background: white;
    padding: 24px;
    border-radius: 8px;
    width: 300px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
