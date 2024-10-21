<template>
    <div>
        <h2 class="page_title mb-4">스타트데이 10월 27일 08시-10시</h2>
        <!--<p class="text-center">13시 ~ 14시 데크에 다른팀 같이 사용</p>-->
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="name" class="form-label fw-bold">이름</label>
                <input type="text" class="form-control" id="name" v-model="formData.name" required>
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
                <label for="openClass" class="form-label fw-bold">수업 선택</label>
                <select class="form-select" id="openClass" v-model="formData.openClass">
                    <option value="" disabled>수업을 선택하세요</option>
                    <option value="마스터즈반">1반. 대회 마스터즈반 (대회 나가요) </option>
                    <option value="대회뉴비반">2반. 대회 뉴비반 (스탓 잘 못해요)</option>
                    <option value="수영간지반">3반. 수영은 간지반 (대회 안가요, 영법 봐줘요)</option>
                </select>
            </div>
            <div style="background:#f8f8f8; border:1px solid #eee; border-radius: 2px; padding:10px; margin: 30px 0">
                <label class="form-label fw-bold">스타트 수업 안내</label>
                <p style="font-size:12px;">
                    1. 수업은 정각에 체조로 시작 됩니다. 정각 까지 입수해 주세요<br>
                    2. 체조후 초,중,고 레벨로 15분간 워밍업 진행<br>
                    3. 워밍업 후 통제에 따라 신청 하신 반으로 이동<br>
                    3-1. 기초반은 담당강사가 지도 (장미쌤 or 꾸꾸쌤)<br>
                    4. 마무리 10분전 쯔음 릴스타임이 있습니다<br>
                    5. 촬영된 영상은 인스타그램 댓글/DM 으로 신청하세요<br><br>
                    ! 문의사항은 인스타그램 댓글/DM 으로 남겨주세요.<br>
                </p>
            </div>

            <button type="submit" class="btn btn-primary w-100">신청</button>

            <div style="background:#f8f8f8; border:1px solid #eee; border-radius: 2px; padding:10px; margin: 30px 0">
                <label class="form-label fw-bold">입금 계좌번호 안내</label> <button type="button" class="btn btn-outline-secondary" @click="copyAccountNumber" style="font-size:10px">계좌번호 복사</button>
                <p class="highlighted-text" ref="accountText">79420390777 카카오뱅크 배하정 (보노보노)<br>25,000원</p>
            </div>
        </form>
        <table class="table mt-3">
            <tbody>
            <tr v-for="(item, index) in applicants.slice().reverse()" :key="item.key"> <!-- key를 index로 사용 -->
                <td style="width:20px;">
                    <input class="form-check-input" type="checkbox" v-model="item.checked" @change="updateChecked(item)" style="font-size:16px">
                </td> <!-- 번호를 1부터 시작하도록 설정 -->
                <td style="width:20px;">{{ applicants.length - index  }}</td> <!-- 번호를 1부터 시작하도록 설정 -->
                <td style="width:70px;">{{ item.name }}</td>
                <td>
                    <span v-if="item.affiliation === '기타'">{{ item.otherAffiliation }}</span>
                    <span v-else>{{ item.affiliation }}</span>
                </td>
                <td style="width: 90px">{{ item.openClass }}</td>
                <td style="width:60px;" class="text-center">
                    <button
                        class="btn"
                        :class="{
                            'btn-success': item.paid,
                            'btn-warning': !item.paid,
                        }"
                        style="padding: 0.2rem 0.5rem; font-size:10px"
                    >
                        {{ item.paid ? '입금' : '미입금' }}
                    </button>
                </td>
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
            formData  :{
                checked      :'',
                name      :'',
                affiliation     :'',
                otherAffiliation:'',
                paid   :"",
                openClass           :''
            },
            applicants:[],
            result   :'',
            applicantCount: 0, // 전역 변수 초기화
            interval: '',
        };
    },
    mounted(){
        this.fetchApplicants();
        this.interval = setInterval(() => {
            this.fetchApplicants(); // 1분마다 데이터 갱신
        }, 60000); // 60000ms = 1분
    },
    beforeUnmount() {
        clearInterval(this.interval); // 컴포넌트가 파괴될 때 인터벌 해제
    },
    methods:{
        updateChecked(item) {
            if (item) {
                this.$axios.put(`${this.apiUrl.replace('.json', '')}/${item.key}.json`, {
                    ...item, // 기존 데이터와 checked 상태 포함
                    checked: item.checked // checked 속성을 포함하여 업데이트
                })
                     .catch(error => {
                    console.error('출석체크 업데이트 오류:', error);
                });
            } else {
                console.error('출석체크 오류:', item.key);
            }
        },
        togglePayment(key) {
            const item = this.applicants[key];
            item.paid = !item.paid;

            // Firebase에 상태 업데이트
            this.$axios.put(`${this.apiUrl.replace('.json', '')}/${key}.json`, item)
            .then(() => {
                console.log('입금 상태가 업데이트되었습니다.');
            })
                .catch(error => {
                console.error('입금 상태 업데이트 오류:', error);
            });
        },
        validateForm(){
            return this.formData.name && this.formData.affiliation && this.formData.openClass
        },
        fetchApplicants(){
            this.$axios.get(this.apiUrl).then(response => {
                const applicantsData = response.data || {};
                this.applicants = Object.keys(applicantsData)
                    .filter(key => key !== 'exemptCount') // exemptCount를 제외
                    .map(key => ({
                        key: key, // Firebase에서의 고유 키
                        ...applicantsData[key] // 나머지 데이터
                    })
                );
                console.log(' this.applicants',  this.applicants)
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
                checked         :this.formData.checked,
                name            :this.formData.name,
                affiliation     :this.formData.affiliation,
                otherAffiliation:this.formData.otherAffiliation,
                paid            :false,
                openClass         :this.formData.openClass
            };

            this.$axios.post(this.apiUrl, applicantData).then(() => {
                this.result = '신청이 완료되었습니다.';
                alert(this.result)
                this.fetchApplicants(); // 신청자 목록 갱신
                this.formData = {
                    checked: '',
                    name : '',
                    affiliation     :'',
                    otherAffiliation:'',
                    paid   :'',
                    openClass           :''
                };
            }).catch(error => {
                console.error('데이터 저장 오류:', error);
                this.result = '데이터 저장 오류가 발생했습니다.';
                alert(this.result)
            });
        },
        deleteApplicant(key) {
            // Firebase에서 데이터 삭제
            this.$axios.delete(`${this.apiUrl.replace('.json', '')}/${key}.json`).then(() => {
                this.fetchApplicants(); // 신청자 목록 갱신
            }).catch(error => {
                console.error('삭제 오류:', error);
            });
        },
        copyAccountNumber(event) {
            event.preventDefault(); // 기본 동작 방지
            // 참조된 계좌번호 텍스트 가져오기
            const accountText = '79420390777 카카오뱅크 25,000원'

            // 클립보드에 텍스트 복사
            navigator.clipboard.writeText(accountText)
            .then(() => {
                alert("계좌번호가 복사되었습니다: ");
            })
                      .catch(error => {
                console.error("계좌번호 복사 실패:", error);
            });
        }
    }
};
</script>

<style>
/* 스타일 추가 (예: form 스타일링) */
</style>
