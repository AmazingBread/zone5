<template>
    <div class="container mt-5">
        <h2 class="mb-4">bonobono 관리자 화면</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="name" class="form-label fw-bold">이름</label>
                <input type="text" class="form-control" id="name" v-model="name" required>
            </div>
            <div class="mb-3">
                <label class="form-label fw-bold">소속</label>
                <div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="affiliation" id="bonobono" value="보노보노" v-model="formData.affiliation">
                        <label class="form-check-label" for="bonobono">보노보노</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="affiliation" id="shoulder" value="어깨탈골" v-model="formData.affiliation">
                        <label class="form-check-label" for="shoulder">어깨탈골</label>
                    </div>
                    <div class="form-check d-inline-block"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="affiliation" id="swimmy" value="스위미" v-model="formData.affiliation">
                        <label class="form-check-label" for="swimmy">스위미</label>
                    </div>

                    <!-- 기타 옵션 -->
                    <div class="form-check mt-3 d-flex align-items-center"> <!-- d-flex 클래스를 사용하여 flexbox로 정렬 -->
                        <input class="form-check-input" type="radio" name="affiliation" id="other" value="기타" v-model="formData.affiliation">
                        <label class="form-check-label me-2" for="other">기타</label> <!-- 오른쪽 마진 추가 -->
                        <input
                            type="text"
                            class="form-control"
                            v-model="formData.otherAffiliation"
                            placeholder="ex) 고수정 친구"
                            :disabled="formData.affiliation !== '기타'"
                            style="width: auto; flex-grow: 1;"
                        >
                    </div>

                </div>
            </div>
            <div class="mb-3">
                <label class="form-label fw-bold">입금 계좌번호 안내</label>
                <p class="highlighted-text">79420390777 카카오뱅크 배하정 (보노보노) 25,000원</p>
            </div>
            <div class="mb-3">
                <label for="message" class="form-label fw-bold">비고</label>
                <textarea class="form-control" id="message" v-model="formData.message" rows="2"></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-100">신청</button>
        </form>

        <table class="table mt-3">
            <tbody>
            <tr v-for="(item, index) in applicants" :key="item.key"> <!-- key를 index로 사용 -->
                <td style="width:20px;">{{ index + 1  }}</td> <!-- 번호를 1부터 시작하도록 설정 -->
                <td style="width:60px;">{{ item.name }}</td>
                <td style="width:60px;">
                    <span v-if="item.affiliation === '기타'">{{ item.otherAffiliation }}</span>
                    <span v-else>{{ item.affiliation }}</span>
                </td>
                <td style="white-space: pre-wrap; word-wrap: break-word; overflow-wrap: break-word;">{{ item.message }}</td>
                <td style="width:84px;">
                    <button
                        class="btn"
                        :class="{
                            'btn-success': item.paid,
                            'btn-warning': !item.paid,
                        }"
                        style="padding: 0.2rem 0.5rem; font-size: 0.9rem;"
                        @click="togglePayment(item.key)"
                    >
                        {{ item.paid ? '입금 확인' : '입금 확인중' }}
                    </button>
                </td>
                <td style="width:50px;">
                    <button @click="deleteApplicant(item.key)" class="btn btn-danger btn-sm">삭제</button>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="mb-5">
            <p>신청자 : {{ applicants.length }} 명</p>
            <p>받을돈 : {{ (applicants.length * 25000).toLocaleString() }} 원</p>
            <p>줄돈 : {{ ((applicants.length * 15000) + 100000).toLocaleString() }} 원</p>
        </div>
        <div class="pb-5"></div>
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
                paid   :"",
                message           :''
            },
            applicants:[],
            result   :'',
            applicantCount: 0 // 전역 변수 초기화
        };
    },
    mounted(){
        this.fetchApplicants();
    },
    methods:{
        togglePayment(key) {
            const applicant = this.applicants.find(item => item.key === key);
            if (applicant) {
                applicant.paid = !applicant.paid; // 토글
                // Firebase에 변경 사항 저장
                this.$axios.put(`${this.apiUrl.replace('.json', '')}/${key}.json`, applicant)
                .then(() => {
                    this.fetchApplicants(); // 신청자 목록 갱신
                })
                     .catch(error => {
                    console.error('입금 상태 업데이트 오류:', error);
                });
            } else {
                console.error('해당 키에 대한 신청자를 찾을 수 없습니다:', key);
            }
        },
        validateForm(){
            return this.name && this.formData.affiliation;
        },
        fetchApplicants(){
            this.$axios.get(this.apiUrl).then(response => {
                const applicantsData = response.data || {};
                this.applicants = Object.keys(applicantsData).map(key => ({
                    key: key, // Firebase에서의 고유 키
                    ...applicantsData[key] // 나머지 데이터
                }));
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
                paid            :false,
                message         :this.formData.message
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
        },
        deleteApplicant(key) {
            // 삭제 확인 창 띄우기
            const confirmDelete = confirm("진짜로 삭제하냐?");
            if (confirmDelete) {
                // Firebase에서 데이터 삭제
                this.$axios.delete(`${this.apiUrl.replace('.json', '')}/${key}.json`).then(() => {
                    this.fetchApplicants(); // 신청자 목록 갱신
                }).catch(error => {
                    console.error('삭제 오류:', error);
                });
            }
        }
    }
};
</script>

<style>
/* 스타일 추가 (예: form 스타일링) */
</style>
