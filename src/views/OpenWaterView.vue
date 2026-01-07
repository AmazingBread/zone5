<template>
    <div>
        <!--<iframe-->
        <!--    src="https://docs.google.com/spreadsheets/d/1wXaD8aB8RvSgmBrGm9SPeCE_VEivT-nS/edit#gid=2061385483"-->
        <!--    width="100%"-->
        <!--    height="800px"-->
        <!--&gt;</iframe>-->
        <!--<p><img src="@/assets/image/광안리_러닝.png" style="width: 100%" class="img-fluid" alt="썸네일"/></p>-->
        <!--<h2 class="page_title mb-4">러닝코스</h2>-->
        <!--<p><img src="@/assets/image/광안리_알탕.png" style="width: 100%" class="img-fluid" alt="썸네일"/></p>-->
        <!--<h2 class="page_title mb-4">바수코스</h2>-->
        <div class="col-12 p-1">
            <div class="thumbnail-box" @click="$router.push('/open_water')">
                <img src="@/assets/image/슥이농장.jpg" style="width: 100%" class="img-fluid" alt="썸네일" />
            </div>
        </div>
        <!--<p><img src="@/assets/image/임랑_주차.png" style="width: 100%" class="img-fluid" alt="썸네일"/></p>-->
        <h2 class="page_title mb-4">11월 1일 토요일 06:00 아드파</h2>
        <div class="mt-3 mb-5">
            <p style="font-size: 12px; padding: 0 0 0 10px; text-align: right; margin-top:20px;">신청자 {{apiData.length}}명</p>
            <div class="d-flex flex-wrap">
                <div
                    v-for="(item) in apiData.slice().reverse()"
                    :key="item.key"
                    class="mb-2"
                    style="padding:10px; border:1px solid #dee2e6; border-radius:20px; font-size:15px; width: calc(50% - 8px); margin-right: 8px; display:flex; align-items:center;"
                >
                    <!-- 입금 상태 버튼 -->
                    <!--<button-->
                    <!--    class="btn"-->
                    <!--    :class="{ 'paid': item.paid, 'unpaid': !item.paid }"-->
                    <!--    style="padding:0.2rem 0.5rem; font-size:10px; margin-right:8px; border-radius:12px; font-weight:bold; border:1px solid;"-->
                    <!--    @click="togglePayment(item.key)"-->
                    <!--&gt;-->
                    <!--    {{ item.paid ? '입완' : '미입금' }}-->
                    <!--</button>-->

                    <!-- 이름 -->
                    <div class="font-weight-bold" style="flex:1; text-align:center;">{{ item.name }}</div>

                    <!-- 삭제 버튼 -->
                    <button
                        @click="deleteApplicant(item.key)"
                        class="btn"
                        style="padding:0.2rem 0.5rem; font-size:10px; margin-left:8px; border-radius:12px; font-weight:bold; border:1px solid #ff1f1f; background:#ff4d4f; color:#ffffff;"
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
        <!--<p><img src="@/assets/image/광안리_주차.png" style="width: 100%" class="img-fluid" alt="썸네일"/></p>-->
        <!--<h2 class="page_title mb-4">모임장소</h2>-->
        <!--<img src="@/assets/image/라온.png" style="width: 100%" class="img-fluid" alt="썸네일"/>-->
        <!--<img src="@/assets/image/라온주차장.png" style="width: 100%" class="img-fluid" alt="썸네일"/>-->
        <!--<h2 class="page_title mb-4">7월 20일 일요일 라온호텔앞 5시</h2>-->

        <!--<h2 class="page_title mb-4">7월 27일 일요일 강알리 5시</h2>-->
        <!--<p class="text-center">13시 ~ 14시 데크에 다른팀 같이 사용</p>-->
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="name" class="form-label fw-bold">이름</label>
                <input type="text" class="form-control" id="name" v-model="formData.name" ref="nameInput">
                <p class="text-danger mt-2" v-if="errorMessage[1] === 1">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label class="form-label fw-bold">소속</label>
                <div>
                    <div class="form-check d-inline-block me-3 mt-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="affiliation" id="bonobono" value="보노보노" v-model="formData.affiliation" ref="affiliationRadios">
                        <label class="form-check-label" for="bonobono">보노보노</label>
                    </div>
                    <div class="form-check mt-3 d-flex align-items-center"> <!-- d-flex 클래스를 사용하여 flexbox로 정렬 -->
                        <input class="form-check-input" type="radio" name="affiliation" id="other" value="기타" v-model="formData.affiliation">
                        <label class="form-check-label me-2" for="other">기타</label> <!-- 오른쪽 마진 추가 -->
                        <input
                            type="text"
                            class="form-control"
                            v-model="formData.otherAffiliation"
                            placeholder="ex) 게스트 1회 가능"
                            :disabled="formData.affiliation !== '기타'"
                            style="width: auto; flex-grow: 1;"
                        >
                    </div>
                </div>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 2">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label for="size" class="form-label fw-bold">참가비 확인</label>
                <select class="form-select" id="size" v-model="formData.ok" ref="sizeSelect">
                    <option value="" disabled>참가비</option>
                    <!--<option value="장소, 시간 확인함">7월 20일 송정 라온호텔앞 5시 집합 30분 입수</option>-->
                    <option value="참가비 확인">밥값 후불제</option>
                </select>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 3">{{errorMessage[0]}}</p>
            </div>
            <!--<div style="background:#f6faff; border:1px solid #eee; border-radius: 2px; padding:10px; margin: 30px 0">-->
            <!--    <label class="form-label fw-bold">보노보노 바다수영 안내</label>-->
            <!--    <p style="font-size:12px;">-->
            <!--        ※ 수트, 부이, 핀등 개인장비 준비해서 오세요<br>-->
            <!--        1. 공지된 시간에 주차장에 모여 준비합니다.<br>-->
            <!--        2. 20분 내외 준비후 백사장에서 체조후 입수<br>-->
            <!--        3. 거리는 바다 사정에따라 약 1.5키로 - 2키로 사이예상<br>-->
            <!--        4. 카메라 장비가 있을경우 중간에 릴스타임이 있습니다<br>-->
            <!--        5. 촬영된 영상은 인스타그램 댓글/DM 으로 신청하세요<br><br>-->
            <!--        ! 문의사항은 인스타그램 댓글/DM 으로 남겨주세요.<br>-->
            <!--    </p>-->
            <!--</div>-->
            <div class="mb-3">
                <label class="form-label fw-bold">면책 동의</label>
                <div class="d-flex justify-content-end">
                    <div class="form-check me-3">
                        <input class="form-check-input" type="radio" name="liabilityAgreement" id="agree" value="agree" v-model="formData.liabilityAgreement" ref="agreeRadio">
                        <label class="form-check-label" for="agree">동의</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="liabilityAgreement" id="disagree" value="disagree" v-model="formData.liabilityAgreement">
                        <label class="form-check-label" for="disagree">비동의</label>
                    </div>
                </div>
                <div class="form-control mt-2" style="font-size: 11px; height: 100px; overflow-y: auto; border: 1px solid #ced4da; padding: 0.375rem 0.75rem; border-radius: 0.25rem; white-space: pre-wrap;">
                    보노보노물보노 동호회(이하 "보노")는 개인의 개별가입과 동시에 "보노"에서 개최하는 모든 행사 및 모임관련 일체(온.오프라인) 행사에 . 본인의  개인정보를 수집 · 이용함을 설명 · 안내 받았으며, "보노"에서 정보를 제공하는 일체의 활동에 대해 면책 동의가 적용된다 것에 동의한다. (게스트: 보노회원이 동반한 회원의 지인 포함)<br>
                    <br>
                    이 면책 동의서는 "보노" 모임 시작과 동시에 효력이 발생하며 "보노"에서 주최하는 모든 모임의 안전사고와 재해사고 및 재해 사망사고 시 일체의 책임(민,형사상)을 본 동호회 운영진과 회원 및 모든 참가자에게 그 책임을 전가하지 못하며 또한 본인 이외에 법적 대리인(직계존속 등)도 그 책임을 본 동호회에 전가하지 아니한다. 사고자는 본인의 자발적인 동호회행사에 참가하였으며, 모든 책임은 본인의 과실로 인정한다.(게스트: 회원이 동반한 회원의 지인에게도 동일하게 적용됨)<br>
                    <br>
                    비록 자필서명이 없더라도 면책동의 후 행사신청 또는 참석 시 본 동호회에 면책동의를 한것으로 간주한다.<br>
                    이에 각 개인은 면책동의에 대한  설명 · 안내 받았으며, 상기의 면책동의서 사항에 다시 한번 동의함을 확인한다.<br>
                </div>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 4">{{errorMessage[0]}}</p>
            </div>
            <button type="submit" class="btn btn-primary w-100">신청</button>
        </form>
        <!--<div style="font-size:15px; background:#f9fbfd; border:1px solid #e5e8eb; border-radius:6px; padding:14px 16px; margin:24px 0; max-width:420px;">-->
        <!--    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">-->
        <!--        <label class="form-label fw-bold" style="margin:0;">💳 입금 계좌번호 안내</label>-->
        <!--        <button-->
        <!--            type="button"-->
        <!--            class="btn btn-sm btn-outline-secondary"-->
        <!--            @click="copyAccountNumber"-->
        <!--            style="font-size:11px; padding:2px 6px;">-->
        <!--            입금 계좌번호 복사-->
        <!--        </button>-->
        <!--    </div>-->

        <!--    <p ref="accountText" style="font-size:15px; font-weight:bold; color:#1a1a1a; margin:0 0 10px;">-->
        <!--        {{ accountText }}-->
        <!--    </p>-->

        <!--    <div style="background:#f1f5f9; border-radius:4px; padding:8px 10px;">-->
        <!--        <p style="font-size:13px; font-weight:bold; margin:0 0 4px; color:#333;">※ 환불 규정</p>-->
        <!--        <ul style="font-size:13px; margin:0; padding-left:18px; line-height:2.2;">-->
        <!--            <li style="font-size:13px;">-->
        <!--                입금 후-->
        <!--                <span style="font-size:12px; background:#ffec99; color:#7a5900; padding:1px 8px; border-radius:12px; font-weight:bold; border:1px solid #ffd324;">-->
        <!--                    미입금-->
        <!--                </span>-->
        <!--                &nbsp;→-->
        <!--                <span style="font-size:12px; background:#81c784; color:#1b5e20; padding:1px 8px; border-radius:12px; font-weight:bold; border:1px solid #4caf50;">-->
        <!--                    입완-->
        <!--                </span>-->
        <!--                &nbsp;버튼 클릭-->
        <!--            </li>-->
        <!--            <li style="font-size:13px;">-->
        <!--                취소는-->
        <!--                <span style="font-size:12px; background:#ff4d4f; color:#ffffff; padding:1px 8px; border-radius:12px; font-weight:bold; border:1px solid #ff1f1f;">-->
        <!--                    삭제-->
        <!--                </span>-->
        <!--            </li>-->
        <!--            <li>불참 시 환불 불가</li>-->
        <!--        </ul>-->
        <!--    </div>-->
        <!--</div>-->

        <div style="display:none; background:#f6faff; border:1px solid #eee; border-radius: 2px; padding:10px; margin: 30px 0">
            <h5 class="form-label fw-bold">추억만들기 준비물</h5>
            <div style="font-size:14px; padding:10px; line-height:1.7; max-width:400px;">
                <p style="margin:4px 0;">
                    📅 <strong>금요일 저녁 8시 ~ 토요일 8시 (12시간)</strong><br>
                    📍 임랑해수욕장 주차장
                </p>
                <p style="margin:8px 0;">
                    <span style="font-weight:bold; color:#2a5bd7;">1.</span> <strong>공통준비물</strong><br>
                    - 돕바<br>
                    - 개인 의자<br>
                    - 바수 세트 (수영복, 수모,수경, 수트, 오리발)<br>
                    - 담요, 베게<br>
                </p>

                <p style="margin:8px 0;">
                    <span style="font-weight:bold; color:#2a5bd7;">2.</span> <strong>노원기+안장미</strong><br>
                    - 원기 : 본토국밥 2인분 포장, 아박<br>
                    - 장미 : 과자, 짜슐량, 컵 <br>
                    - 마트 : 안승탕면, 얼음 2kg, 화요 2개, 토닉 10개, 음료, 물<br>
                </p>
                <p style="margin:8px 0;">
                    <span style="font-weight:bold; color:#2a5bd7;">3.</span> <strong>원스기</strong><br>
                    - 테이블<br>
                    - 텐트+바닥<br>
                    - 렌턴<br>
                    - 강염버너<br>
                </p>
                <p style="margin:8px 0;">
                    <span style="font-weight:bold; color:#2a5bd7;">4.</span> <strong>재가이</strong><br>
                    - 냄비<br>
                    - 버너, 가스<br>
                </p>
                <p style="margin:8px 0;">
                    <span style="font-weight:bold; color:#2a5bd7;">5.</span> <strong>유영이</strong><br>
                    - 낚시대<br>
                    - 뮤직+댄스<br>
                </p>
                <p style="margin:8px 0;">
                    <span style="font-weight:bold; color:#2a5bd7;">6.</span> <strong>스바</strong><br>
                    - 회 (대자) + @<br>
                    - 일회용품 (수저, 그릇, 접시)<br>
                    - 렌턴, 텐트+바닥<br>
                    - 마이크<br>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database"; // Firebase SDK에서 필요한 모듈을 임포트합니다.

export default {
    data(){
        return {
            dbPath: "open_water",
            apiUrl : "https://bonobono-e6ed4-default-rtdb.asia-southeast1.firebasedatabase.app/open_water.json",
            formData  :{
                checked      :'',
                name      :'',
                affiliation     :'',
                otherAffiliation:'',
                paid   :"",
                ok:'',
                liabilityAgreement: ''
            },
            apiData:[],
            result   :'',
            applicantCount: 0, // 전역 변수 초기화
            errorMessage:'',
            db: null, // 데이터베이스 참조 추가
            accountText: '79420390777 카카오뱅크 배하정'
        };
    },
    mounted(){
        this.db = getDatabase(); // Firebase 데이터베이스 초기화
        this.getData();
        // 데이터 변경 감지를 위해 리스너 추가
        const dataRef = ref(this.db, 'open_water'); // cheering 경로에 대한 참조
        onValue(dataRef, (snapshot) => {
            const getData = snapshot.val() || {};
            this.apiData = Object.keys(getData)
                .filter(key => key !== 'open_water_exemptCount') // exemptCount를 제외
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
            const { name, affiliation, ok, liabilityAgreement } = this.formData;

            if (!name) {
                this.showMessage("와타시노 나마에와.." , 1); // 사용자에게 메시지 표시
                this.$refs.nameInput.focus(); // 이름 입력 필드에 포커스
                this.$refs.nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!affiliation) {
                this.showMessage("누구냐 너....", 2);
                this.$refs.affiliationRadios.focus(); // 소속 라디오 버튼에 포커스
                this.$refs.affiliationRadios.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!ok) {
                this.showMessage("참가비 확인!!!", 3);
                this.$refs.sizeSelect.focus(); // 수업 선택 드롭다운에 포커스
                this.$refs.sizeSelect.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!liabilityAgreement) {
                this.showMessage("면책 동의좀 해주이소..", 4);
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
                    .filter(key => key !== 'open_water_exemptCount') // exemptCount를 제외
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
                checked         :this.formData.checked,
                name            :this.formData.name,
                affiliation     :this.formData.affiliation,
                otherAffiliation:this.formData.otherAffiliation,
                paid              :false,
                ok              :this.formData.ok,
                liabilityAgreement: this.formData.liabilityAgreement // 면책 동의 추가
            };

            this.$axios.post(this.apiUrl, bearData).then(() => {
                this.result = '신청완료!';
                alert(this.result)
                this.getData(); // 신청자 목록 갱신
                this.formData = {
                    checked: '',
                    name : '',
                    affiliation     :'',
                    otherAffiliation:'',
                    paid              :'',
                    ok           :'',
                    liabilityAgreement: '' // 초기화
                };
            }).catch(error => {
                console.error('데이터 저장 오류:', error);
                this.result = '데이터 저장 오류가 발생했습니다.';
                alert(this.result)
            });
        },
        togglePayment(key) {
            const applicant = this.apiData.find(item => item.key === key);
            if (applicant) {
                const updatedData = { ...applicant, paid: !applicant.paid };
                // Firebase에 변경 사항 저장
                this.$axios.put(`${this.apiUrl.replace('.json', '')}/${key}.json`, updatedData)
                .then(() => {
                    applicant.paid = updatedData.paid; // 로컬에서도 즉시 반영
                })
                     .catch(error => {
                    console.error('입금 상태 업데이트 오류:', error);
                });
            } else {
                console.error('해당 키에 대한 신청자를 찾을 수 없습니다:', key);
            }
        },
        copyAccountNumber(event) {
            event.preventDefault(); // 기본 동작 방지
            // 참조된 계좌번호 텍스트 가져오기


            // 클립보드에 텍스트 복사
            navigator.clipboard.writeText(this.accountText)
            .then(() => {
                alert("계좌번호가 복사되었습니다: ");
            })
                      .catch(error => {
                console.error("계좌번호 복사 실패:", error);
            });
        },
        deleteApplicant(key) {
            if (!confirm("신청자를 삭제하시겠습니까?")) return;
            // Firebase에서 데이터 삭제
            this.$axios.delete(`${this.apiUrl.replace('.json', '')}/${key}.json`)
            .then(() => {
                this.apiData = this.apiData.filter(item => item.key !== key);
            }).catch(error => {
                console.error('삭제 오류:', error);
            });
        },
        // deleteApplicant(key) {
        //     // Firebase에서 데이터 삭제
        //     this.$axios.delete(`${this.apiUrl.replace('.json', '')}/${key}.json`).then(() => {
        //         this.getData(); // 신청자 목록 갱신
        //     }).catch(error => {
        //         console.error('삭제 오류:', error);
        //     });
        // },
    }
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
