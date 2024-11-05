<template>
    <div>
        <img src="@/assets/image/cheering_1.jpg" class="img-fluid" alt="cheering" />
        <img src="@/assets/image/cheering_2.jpg" class="img-fluid" alt="cheering" />
        <h2 class="page_title mb-4">지나가던분이라도 자유롭게 응원메세지 남겨주세요!!</h2>
        <!--<p class="text-center">13시 ~ 14시 데크에 다른팀 같이 사용</p>-->
        <form @submit.prevent="submitForm">
            <div class="mb-3" style="padding:10px; border-radius: 5px; border:1px solid #dee2e6;">
                <div class="mb-3">
                    <label for="name" class="form-label fw-bold">이름</label>
                    <input type="text" class="form-control" id="name" v-model="formData.name" ref="nameInput">
                    <p class="text-danger mt-2" v-if="errorMessage[1] === 1">{{errorMessage[0]}}</p>
                </div>
                <div>
                    <label for="name" class="form-label fw-bold">응원메세지</label>
                    <input type="text" class="form-control" id="name" v-model="formData.message" ref="messageInput">
                    <p class="text-danger mt-2" v-if="errorMessage[1] === 2">{{errorMessage[0]}}</p>
                </div>
            </div>
            <button type="submit" class="btn btn-primary w-100">등록</button>
        </form>
        <div class="mt-3">
            <p style="font-size: 12px; padding: 0 0 0 10px; text-align: right; margin-top:20px;">응원 메세지 {{apiData.length}}개</p>
            <div v-for="(item) in apiData.slice().reverse()" :key="item.key" class="mb-2" style="padding:10px; border:1px solid #dee2e6; border-radius: 5px; font-size: 12px">
                <div class="font-weight-bold">
                    {{ item.name }} ({{ item.date }})
                </div>
                <div>
                    <strong>{{ item.message }}</strong>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database"; // Firebase SDK에서 필요한 모듈을 임포트합니다.

export default {
    data(){
        return {
            apiUrl : "https://bonobono-e6ed4-default-rtdb.asia-southeast1.firebasedatabase.app/cheering.json",
            formData  :{
                name      :'',
                message     :'',
                date :'',
            },
            apiData:[],
            result   :'',
            interval: '',
            errorMessage:'',
            db: null, // 데이터베이스 참조 추가
        };
    },
    mounted(){
        this.db = getDatabase(); // Firebase 데이터베이스 초기화
        this.getData();
        // 데이터 변경 감지를 위해 리스너 추가
        const dataRef = ref(this.db, 'cheering'); // cheering 경로에 대한 참조
        onValue(dataRef, (snapshot) => {
            const getData = snapshot.val() || {};
            this.apiData = Object.keys(getData)
                .map(key => ({
                    key: key, // Firebase에서의 고유 키
                    ...getData[key] // 나머지 데이터
                }));
        });
    },
    beforeUnmount() {
        // clearInterval(this.interval); // 컴포넌트가 파괴될 때 인터벌 해제
    },
    methods:{
        validateForm() {
            const { name, message } = this.formData;

            if (!name) {
                this.showMessage("와타시노 나마에와.." , 1); // 사용자에게 메시지 표시
                this.$refs.nameInput.focus(); // 이름 입력 필드에 포커스
                // window.scrollTo({ top: 0, behavior: 'smooth' }); // 최상단으로 스크롤
                return false;
            }
            if (!message) {
                this.showMessage("응원 한마디좀....", 2);
                this.$refs.messageInput.focus(); // 소속 라디오 버튼에 포커스
                // window.scrollTo({ top: 0, behavior: 'smooth' });
                return false;
            }
            return true; // 모든 필드가 유효한 경우
        },

        showMessage(message , no) {
            // 메시지를 화면에 표시하는 로직을 구현합니다.
            // 예를 들어, Vue의 data 속성이나 상태 관리 라이브러리를 사용하여 메시지를 표시할 수 있습니다.
            this.errorMessage = [message, no]; // errorMessage는 화면에 표시할 메시지
            // 추가적인 UI 로직을 구현하여 사용자에게 알림을 줄 수 있습니다.
        },

        getData(){
            this.$axios.get(this.apiUrl).then(response => {
                this.apiData = response.data || {};
            }).catch(error => {
                console.error("응원 목록 가져오기 오류:", error);
            });
        },
        submitForm(){
            if(!this.validateForm()){
                return;
            }
            // 현재 시간을 원하는 형식으로 변환
            const now = new Date();
            const formattedDate = this.formatDate(now);

            const submitData = {
                name            :this.formData.name,
                message     :this.formData.message,
                date: formattedDate, // 로컬 시간 기준으로 저장
            };

            this.$axios.post(this.apiUrl, submitData).then(() => {
                this.result = '응원! 완료!';
                alert(this.result)
                this.getData(); // 신청자 목록 갱신
                this.formData = {
                    name : '',
                    message     :'',
                    date:'',
                };
            }).catch(error => {
                console.error('데이터 저장 오류:', error);
                this.result = '데이터 저장 오류가 발생했습니다.';
                alert(this.result)
            });
        },
        // 날짜를 원하는 형식으로 변환하는 함수
        formatDate(date) {
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1 필요
            const day = ('0' + date.getDate()).slice(-2);
            const hours = ('0' + date.getHours()).slice(-2);
            const minutes = ('0' + date.getMinutes()).slice(-2);
            const seconds = ('0' + date.getSeconds()).slice(-2);

            return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
        }
    }
};
</script>

<style>
/* 스타일 추가 (예: form 스타일링) */
</style>
