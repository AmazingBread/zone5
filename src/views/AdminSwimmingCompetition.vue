<template>
    <div>
        <h2 class="page_title mb-4">창원클럽대항전</h2>
        <!--<img src="@/assets/image/ulsan_01.jpg" class="img-fluid" alt="ulsan" />-->
        <!--<img src="@/assets/image/ulsan_02.jpg" class="img-fluid" alt="ulsan" />-->
        <!--<img src="@/assets/image/ulsan_03.jpg" class="img-fluid" alt="ulsan" />-->
        <!--<img src="@/assets/image/ulsan_04.jpg" class="img-fluid" alt="ulsan" />-->

        <p class="text-center text-bg-light" style="padding:10px;">📢📢📢  팀 보노보노 신청서 🏅🏅🏅🏅</p>
        <div class="mt-3">
            <p style="font-size: 12px; padding: 0 0 0 10px; text-align: right; margin-top:20px;">대회 신청자 {{apiData.length}}명</p>
            <div
                v-for="(item) in apiData.slice().reverse()"
                :key="item.key"
                class="mb-2"
                style="padding:10px; border:1px solid #dee2e6; border-radius: 5px; font-size: 15px"
            >
                <!-- 상단 버튼 영역 -->
                <div class="d-flex justify-content-between">
                    <!-- 왼쪽: 삭제 버튼 -->
                    <button @click="deleteApplicant(item.key)" class="btn btn-danger btn-sm" style="font-size:10px">
                        삭제
                    </button>

                    <!-- 오른쪽: 대회비 버튼 -->
                    <button
                        class="btn"
                        :class="{ 'btn-success': item.paid, 'btn-warning': !item.paid }"
                        style="padding: 0.2rem 0.5rem; font-size:10px"
                        @click="togglePayment(item.key)"
                    >
                        {{ item.paid ? '대회비 입완' : '대회비 미입금' }}
                    </button>
                </div>

                <!-- 하단 사용자 정보 -->
                <div class="font-weight-bold mt-1">
                    {{ item.name }}, {{ item.sex }}, {{ item.age }}, {{ item.phone }}
                </div>
                <div class="font-weight-bold">
                    {{ item.group }}, {{ item.events1 }}, {{ item.events2 }}
                </div>
            </div>
        </div>
        <div class="paidTable">
            <dl style="margin-right: 20px;">
                <dt>입금자 / 신청자</dt>
                <dd>{{ paidApplicantsCount }}명 / {{ apiData.length }}명</dd>
            </dl>

            <dl style="margin-right: 20px;">
                <dt>입금 총계</dt>
                <dd>{{ (paidApplicantsCount * 30000).toLocaleString() }}원 / 30,000원 x{{ paidApplicantsCount }}명</dd>
            </dl>
        </div>
    </div>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database"; // Firebase SDK에서 필요한 모듈을 임포트합니다.

export default {
    data(){
        return {
            apiUrl : "https://bonobono-e6ed4-default-rtdb.asia-southeast1.firebasedatabase.app/swimming_competition.json",
            formData  :{
                checked      :'',
                name      :'',
                age      :'',
                sex      :'',
                phone      :'',
                group      :'',
                events1      :'',
                events2      :'',
                paid   :"",
                ok:'',
                liabilityAgreement: ''
            },
            apiData:[],
            result   :'',
            applicantCount: 0, // 전역 변수 초기화
            errorMessage:'',
            db: null, // 데이터베이스 참조 추가
        };
    },
    computed: {
        paidApplicantsCount() {
            return this.apiData.filter(applicant => applicant.paid).length;
        }
    },
    mounted(){
        this.db = getDatabase(); // Firebase 데이터베이스 초기화
        this.getData();
        // 데이터 변경 감지를 위해 리스너 추가
        const dataRef = ref(this.db, 'swimming_competition'); // cheering 경로에 대한 참조
        onValue(dataRef, (snapshot) => {
            const getData = snapshot.val() || {};
            this.apiData = Object.keys(getData)
                .filter(key => key !== 'swimming_competition_exemptCount') // exemptCount를 제외
                .map(key => ({
                    key: key, // Firebase에서의 고유 키
                    ...getData[key] // 나머지 데이터
                }));
        });
    },
    beforeUnmount() {
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
        // togglePayment(key) {
        //     const item = this.apiData[key];
        //     item.paid = !item.paid;
        //
        //     // Firebase에 상태 업데이트
        //     this.$axios.put(`${this.apiUrl.replace('.json', '')}/${key}.json`, item)
        //     .then(() => {
        //         console.log('입금 상태가 업데이트되었습니다.');
        //     })
        //         .catch(error => {
        //         console.error('입금 상태 업데이트 오류:', error);
        //     });
        // },
        validateForm() {
            const { name, sex, age, phone, group, events1, events2, ok, liabilityAgreement } = this.formData;

            if (!name) {
                this.showMessage("와타시노 나마에와.." , 1); // 사용자에게 메시지 표시
                this.$refs.name.focus(); // 이름 입력 필드에 포커스
                this.$refs.name.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!sex) {
                this.showMessage("남잔교 여잔교" , 2); // 사용자에게 메시지 표시
                this.$refs.sex.focus(); // 이름 입력 필드에 포커스
                this.$refs.sex.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!age) {
                this.showMessage("매살이고" , 3); // 사용자에게 메시지 표시
                this.$refs.age.focus(); // 이름 입력 필드에 포커스
                this.$refs.age.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!phone) {
                this.showMessage("저기 맘에들어서 그러는데 폰번호좀.." , 4); // 사용자에게 메시지 표시
                this.$refs.phone.focus(); // 이름 입력 필드에 포커스
                this.$refs.phone.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!group) {
                this.showMessage("몇그룹 출전?" , 5); // 사용자에게 메시지 표시
                this.$refs.group.focus(); // 이름 입력 필드에 포커스
                this.$refs.group.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!events1) {
                this.showMessage("종목 1 골라보이소" , 6); // 사용자에게 메시지 표시
                this.$refs.events1.focus(); // 이름 입력 필드에 포커스
                this.$refs.events1.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!events2) {
                this.showMessage("종목 2 골라보이소" , 7); // 사용자에게 메시지 표시
                this.$refs.events2.focus(); // 이름 입력 필드에 포커스
                this.$refs.events2.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!ok) {
                this.showMessage("돈 확인!!!", 8);
                this.$refs.sizeSelect.focus(); // 수업 선택 드롭다운에 포커스
                this.$refs.sizeSelect.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!liabilityAgreement) {
                this.showMessage("면책 동의좀 해주이소..", 9);
                this.$refs.agreeRadio.focus(); // 면책 동의 라디오 버튼에 포커스
                this.$refs.agreeRadio.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
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
                const apiData = response.data || {};
                this.apiData = Object.keys(apiData)
                    .filter(key => key !== 'swimming_competition_exemptCount') // exemptCount를 제외
                    .map(key => ({
                        key: key, // Firebase에서의 고유 키
                        ...apiData[key] // 나머지 데이터
                    })
                );
                console.log(' this.apiData',  this.apiData)
            }).catch(error => {
                console.error("신청자 목록 가져오기 오류:", error);
            });
        },
        submitForm(){
            if(!this.validateForm()){
                return;
            }

            const bearData = {
                name              :this.formData.name,
                sex               :this.formData.sex,
                age               :this.formData.age,
                phone             :this.formData.phone,
                group             :this.formData.group,
                events1            :this.formData.events1,
                events2            :this.formData.events2,
                paid              :false,
                ok                :this.formData.ok,
                liabilityAgreement: this.formData.liabilityAgreement // 면책 동의 추가
            };

            this.$axios.post(this.apiUrl, bearData).then(() => {
                this.result = '너 나의 동료가 되라! 완료!';
                alert(this.result)
                this.getData(); // 신청자 목록 갱신
                this.formData = {
                    name              :'',
                    sex               :'',
                    age               :'',
                    phone             :'',
                    group            :'',
                    events1              :'',
                    events2              :'',
                    paid              :'',
                    ok                :'',
                    liabilityAgreement: '' // 초기화
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
                this.getData(); // 신청자 목록 갱신
            }).catch(error => {
                console.error('삭제 오류:', error);
            });
        },
        togglePayment(key) {
            const applicant = this.apiData.find(item => item.key === key);
            if (applicant) {
                applicant.paid = !applicant.paid; // 토글
                // Firebase에 변경 사항 저장
                this.$axios.put(`${this.apiUrl.replace('.json', '')}/${key}.json`, applicant)
                .then(() => {
                    this.getData(); // 신청자 목록 갱신
                })
                     .catch(error => {
                    console.error('입금 상태 업데이트 오류:', error);
                });
            } else {
                console.error('해당 키에 대한 신청자를 찾을 수 없습니다:', key);
            }
        },
    }
};
</script>

<style>
/* 스타일 추가 (예: form 스타일링) */
</style>
