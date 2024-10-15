<template>
    <div class="container mt-5">
        <h2 class="mb-4">bonobono 스타트 신청서</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="name" class="form-label">이름</label>
                <input type="text" class="form-control" id="name" v-model="name" required>
            </div>
            <div class="mb-3">
                <label class="form-label">소속</label>
                <div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="affiliation" id="bonobono" value="보노보노" v-model="formData.affiliation">
                        <label class="form-check-label" for="bonobono">보노보노</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="affiliation" id="shoulder" value="어깨탈골" v-model="formData.affiliation">
                        <label class="form-check-label" for="shoulder">어깨탈골</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="affiliation" id="swimmy" value="스위미" v-model="formData.affiliation">
                        <label class="form-check-label" for="swimmy">스위미</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="affiliation" id="other" value="기타" v-model="formData.affiliation">
                        <label class="form-check-label" for="other">기타</label>
                        <input type="text" class="form-control mt-2" v-model="formData.otherAffiliation" placeholder="기타를 입력하세요" v-if="formData.affiliation === '기타'">
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">입금 계좌번호 안내</label>
                <h4>79420390777 카카오뱅크 배하정 (보노보노)</h4>
            </div>
            <div class="mb-3">
                <label for="message" class="form-label">하고싶은말</label>
                <textarea class="form-control" id="message" v-model="formData.message" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">신청</button>
        </form>

        <h2 class="mt-5">신청 목록</h2>
        <table class="table mt-3">
            <thead>
            <tr>
                <th scope="col" style="width: 25%;">이름</th>
                <th scope="col" style="width: 25%;">소속</th>
                <th scope="col" style="width: 25%;">입금 확인</th>
                <th scope="col" style="width: 25%;">비고</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in applicants" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.affiliation }}<span v-if="item.affiliation === '기타'"> ({{ item.otherAffiliation }})</span></td>
                <td>
                    <button
                        class="btn"
                        :class="{
                            'btn-success': item.paid,
                            'btn-warning': !item.paid, // 주황색 버튼
                        }"
                        style="padding: 0.2rem 0.5rem; font-size: 0.7rem;"
                        @click="togglePayment(item)"
                    >
                        {{ item.paid ? '입금 확인' : '입금 확인중' }}
                    </button>
                </td>
                <td>{{ item.message }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    data(){
        return {
            apiUrl : "https://bonobono-e6ed4-default-rtdb.asia-southeast1.firebasedatabase.app/applicants.json",
            name      :'',
            formData  :{
                affiliation     :'',
                otherAffiliation:'',
                paid   :false,
                message           :''
            },
            applicants:[],
            result   :''
        };
    },
    mounted(){
        this.fetchApplicants();
    },
    methods:{
        togglePayment(item) {
            item.paid = !item.paid; // paid 상태를 토글
            console.log(item.name + '의 입금 상태가 변경되었습니다: ' + item.paid);
            // 필요한 경우 서버에 상태를 업데이트하는 로직을 추가할 수 있습니다.
        },
        validateForm(){
            return this.name && this.formData.affiliation;
        },
        fetchApplicants(){
            this.$axios.get(this.apiUrl).then(response => {
                this.applicants = response.data || [];
            }).catch(error => {
                console.error("신청자 목록 가져오기 오류:", error);
            });
        },
        submitForm(){
            if(!this.validateForm()){
                alert('모든 필드를 작성해주세요.');
                return;
            }

            const applicantData = {
                name            :this.name,
                affiliation     :this.formData.affiliation,
                otherAffiliation:this.formData.otherAffiliation,
                paid   :this.formData.paid,
                message           :this.formData.message
            };

            this.$axios.post(this.apiUrl, applicantData).then(() => {
                this.result = '신청이 완료되었습니다.';
                this.fetchApplicants(); // 신청자 목록 갱신
                this.name = '';
                this.formData = {
                    affiliation     :'',
                    otherAffiliation:'',
                    paid   :'',
                    message           :''
                };
            }).catch(error => {
                console.error('데이터 저장 오류:', error);
                this.result = '데이터 저장 오류가 발생했습니다.';
            });
        }
    }
};
</script>

<style>
/* 스타일 추가 (예: form 스타일링) */
</style>
