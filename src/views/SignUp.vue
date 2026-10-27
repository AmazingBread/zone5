<template>
    <div class="mobile-detail signup-page training-page">
        <header class="detail-hero"><router-link to="/" class="back-link">‹ 홈으로</router-link><span class="detail-eyebrow">JOIN THE ZONE5 TEAM</span><h1>함께할수록,<br>더 즐거운 수영.</h1><p>회원 정보를 입력하고 ZONE5와 함께 시작해 보세요.</p></header>
        <div class="signup-membership-summary"><span>ZONE5 연회원</span><strong>60,000<small>원 / 1년</small></strong><p>중간 가입 시: 12월까지 남은 개월 수 × 5,000원<br>훈련 참가비는 별도입니다.</p></div>
        <form @submit.prevent="submitForm">
            <section class="form-section"><h2 class="section-title">01. 계정 정보</h2><p class="field-help">아이디와 비밀번호는 향후 로그인에 사용됩니다.</p>
            <div class="mb-3">
                <label for="userId" class="form-label fw-bold">아이디</label>
                <input type="text" class="form-control" id="userId" autocomplete="username" placeholder="사용할 아이디" v-model="formData.userId" ref="userId">
                <p class="text-danger mt-2" v-if="errorMessage[1] === 1">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label fw-bold">비밀번호</label>
                <input type="password" class="form-control" id="password" autocomplete="new-password" placeholder="비밀번호 입력" v-model="formData.password" ref="password">
                <p class="text-danger mt-2" v-if="errorMessage[1] === 2">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label for="confirmPassword" class="form-label fw-bold">비밀번호 확인</label>
                <input type="password" class="form-control" id="confirmPassword" autocomplete="new-password" placeholder="비밀번호 다시 입력" v-model="formData.confirmPassword" ref="confirmPassword">
                <p class="text-danger mt-2" v-if="errorMessage[1] === 2">{{errorMessage[0]}}</p>
            </div>
            </section>
            <section class="form-section"><h2 class="section-title">02. 기본 정보</h2>
            <div class="mb-3">
                <label for="userName" class="form-label fw-bold">이름</label>
                <input type="text" class="form-control" id="userName" autocomplete="name" placeholder="실명을 입력해 주세요" v-model="formData.userName" ref="userName">
                <p class="text-danger mt-2" v-if="errorMessage[1] === 3">{{errorMessage[0]}}</p>
            </div>
            <!--<div class="mb-3">-->
            <!--    <label for="nickName" class="form-label fw-bold">4. 닉네임 (가명)</label>-->
            <!--    <input type="text" class="form-control" id="nickName" v-model="formData.nickName" ref="nickName">-->
            <!--    <p class="text-danger mt-2" v-if="errorMessage[1] === 4">{{errorMessage[0]}}</p>-->
            <!--</div>-->
            <div class="mb-3">
                <label for="sex" class="form-label fw-bold">성별</label>
                <input type="text" class="form-control" id="sex" placeholder="남 또는 여" v-model="formData.sex" ref="sex">
                <p class="text-danger mt-2" v-if="errorMessage[1] === 5">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label for="age" class="form-label fw-bold">생년월일</label>
                <input type="text" class="form-control" id="age" inputmode="numeric" maxlength="6" placeholder="예: 910102 (6자리)" v-model="formData.age" ref="age">
                <p class="text-danger mt-2" v-if="errorMessage[1] === 6">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label fw-bold">전화번호</label>
                <input type="text" class="form-control" id="phone" autocomplete="tel" inputmode="tel" placeholder="010-0000-0000" v-model="formData.phone" ref="phone">
                <p class="text-danger mt-2" v-if="errorMessage[1] === 7">{{errorMessage[0]}}</p>
            </div>
            <!--<div class="mb-3">-->
            <!--    <label for="area" class="form-label fw-bold">8. 사는지역 (부산, 울산 등)</label>-->
            <!--    <input type="text" class="form-control" id="area" v-model="formData.area" ref="area">-->
            <!--    <p class="text-danger mt-2" v-if="errorMessage[1] === 8">{{errorMessage[0]}}</p>-->
            <!--</div>-->
            </section>
            <section class="form-section membership-section"><h2 class="section-title">03. 회원 유형</h2>
            <div class="mb-3">
                <label class="form-label fw-bold">회비 형식 선택</label>
                <div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="membershipType" id="yearType" value="연회원" v-model="formData.membershipType" ref="membershipType">
                        <label class="form-check-label" for="yearType">연회원 (1년 6만원)</label>
                    </div>
                    <!--<div class="form-check d-inline-block me-3"> &lt;!&ndash; d-inline-block을 사용하여 인라인 블록으로 설정 &ndash;&gt;-->
                    <!--    <input class="form-check-input" type="radio" name="membershipType" id="monthType" value="월회원" v-model="formData.membershipType" ref="monthType">-->
                    <!--    <label class="form-check-label" for="monthType">월회원 (매월 5천원)</label>-->
                    <!--</div>-->
                </div>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 9">{{errorMessage[0]}}</p>
            </div>
            </section>
            <details class="info-disclosure"><summary>훈련 장소 및 운영비 안내</summary>        <section class="training-info guide-card">
            <h2>훈련 안내</h2><p class="guide-lead">일요일 오전 7:00–9:00 · 2시간</p>
            <div class="guide-block"><h3>훈련 장소</h3><div class="venue"><strong>만덕 카멜리아</strong><span>덕천로 257 지하 2층</span><small>무료 주차 2시간 · 차량 등록 필수</small></div><div class="venue"><strong>동래 클래스윔</strong><span>명장로20번길 98</span><small>무료 주차 3시간 · 차량 등록 필수</small></div></div>
            <div class="guide-block"><h3>회비 및 운영비</h3><dl class="fee-list"><div><dt>연회비</dt><dd>60,000원 <small>/ 연</small></dd></div></dl><p class="guide-note membership-proration">중간 가입 시: 12월까지 남은 개월 수 × 5,000원</p><dl class="fee-list"><div><dt>훈련반</dt><dd>15,000원 <small>/ 회</small></dd></div><div><dt>특강반</dt><dd>20,000원 <small>/ 회</small></dd></div><div><dt>게스트</dt><dd>25,000원 <small>/ 회</small></dd></div><div><dt>단체</dt><dd>별도 문의</dd></div></dl><p class="guide-note">참가 전일까지 입금해 주세요.</p></div>
            <div class="guide-block"><h3>프로그램</h3><div class="program-description"><strong>훈련반</strong><p>드릴 + 인터벌 2,500–3,000m 후 스타트 연습<br>핀 사용 가능</p></div><div class="program-description"><strong>특강반</strong><p>드릴 + 교정 1,000–1,500m 후 스타트 연습<br>매회 강사 교대 강습 · 훈련 스케줄 참조</p></div></div>
            <a class="contact-link" href="tel:01058228122">문의 <strong>010-5822-8122</strong><span>노원기 ↗</span></a>
        </section>
</details>
            <section class="form-section"><h2 class="section-title">04. 면책 동의</h2>
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
                <div class="waiver-text mt-3" tabindex="0" aria-label="면책 동의 내용">
                    ZONE5 훈련팀(이하 "ZONE5")는 개인의 개별가입과 동시에 "ZONE5"에서 개최하는 모든 행사 및 모임관련 일체(온.오프라인) 행사에 . 본인의  개인정보를 수집 · 이용함을 설명 · 안내 받았으며, "ZONE5"에서 정보를 제공하는 일체의 활동에 대해 면책 동의가 적용된다 것에 동의한다. (게스트: ZONE5회원이 동반한 회원의 지인 포함)<br>
                    <br>
                    이 면책 동의서는 "ZONE5" 모임 시작과 동시에 효력이 발생하며 "ZONE5"에서 주최하는 모든 모임의 안전사고와 재해사고 및 재해 사망사고 시 일체의 책임(민,형사상)을 본 동호회 운영진과 회원 및 모든 참가자에게 그 책임을 전가하지 못하며 또한 본인 이외에 법적 대리인(직계존속 등)도 그 책임을 본 훈련팀에 전가하지 아니한다. 사고자는 본인의 자발적인 행사에 참가하였으며, 모든 책임은 본인의 과실로 인정한다.(게스트: 회원이 동반한 회원의 지인에게도 동일하게 적용됨)<br>
                    <br>
                    비록 자필서명이 없더라도 면책동의 후 행사신청 또는 참석 시 본 훈련팀에 면책동의를 한것으로 간주한다.<br>
                    이에 각 개인은 면책동의에 대한  설명 · 안내 받았으며, 상기의 면책동의서 사항에 다시 한번 동의함을 확인한다.<br>
                </div>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 10" role="alert">{{errorMessage[0]}}</p>
            </section>

            <button
                type="submit"
                class="primary-action signup-submit"
                :class="apiData.length === firstComeLimit ? 'btn-danger' : 'btn-primary'"
                :disabled="apiData.length === firstComeLimit"
            >
                {{apiData.length === firstComeLimit ? '회원신청마감' : '회원신청'}}
                <span style="font-weight: bold; padding-left:10px;" v-if="apiData.length < firstComeLimit">{{ remainingTime }}</span>
            </button>
            <section class="account-info guide-card"><div class="account-heading"><h2>연회비 입금 안내</h2><button type="button" class="copy-account" @click="copyAccountNumber">계좌 복사</button></div><div class="account-number" ref="accountText"><small>카카오뱅크 · 노원기</small><strong>3333-20-4133950</strong></div><p class="field-help">연회비 60,000원<br>중간 가입 시: 12월까지 남은 개월 수 × 5,000원<br>입금 시 신청자 이름을 적어 주세요.</p><p class="signup-refund">연회비는 환불되지 않습니다.</p></section>
        </form>
        <a class="signup-chat" href="https://open.kakao.com/o/gR5X0kdi" target="_blank" rel="noopener noreferrer"><span><strong>ZONE5 카카오톡 채팅방</strong><small>이름으로 참여해 주세요</small></span><span aria-hidden="true">↗</span></a>
        <div class="mt-3" v-if="apiData.length === 0">
            <p style="font-size: 12px; padding: 0 0 0 10px; text-align: right; margin-top:20px;">회원 {{apiData.length}}명</p>
            <div
                v-for="(item) in apiData.slice().reverse()"
                :key="item.key"
                class="mb-2"
                style="padding:10px; border:1px solid #dee2e6; border-radius: 5px; font-size: 15px"
            >
                <!-- 상단 버튼 영역 -->
                <div class="d-flex justify-content-between">
                    <!-- 오른쪽: 대회비 버튼 -->
                    <button
                        class="btn"
                        :class="{ 'btn-success': item.paid, 'btn-warning': !item.paid }"
                        style="padding: 0.2rem 0.5rem; font-size:10px"
                    >
                        {{ item.paid ? '회비 입완' : '회비 미입금' }}
                    </button>
                </div>

                <!-- 하단 사용자 정보 -->
                <div class="font-weight-bold mt-1">
                    {{ item.userName }}, {{ item.membershipType }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getDatabase, ref, onValue, update, push} from "firebase/database"; // Firebase SDK에서 필요한 모듈을 임포트합니다.

export default {
    data(){
        return {
            dbPath : 'signUp',
            formData  :{
                regDt: '',
                checked      :'',
                userId: '',
                password: '',
                confirmPassword : '',
                userName      :'',
                // nickName      :'',
                age      :'',
                sex      :'',
                phone      :'',
                // area      :'',
                membershipType      : '',
                paid   :"",
                ok:'',
                liabilityAgreement: ''
            },
            firstComeLimit: 60,
            deadline: new Date('2025-09-20T23:59:59'),
            remainingTime: "계산 중...", // 남은 시간 초기값
            isDeadlinePassed: false, // 마감 여부를 체크하는 변수
            apiData:[],
            result   :'',
            applicantCount: 0, // 전역 변수 초기화
            errorMessage:'',
            db: null, // 데이터베이스 참조 추가
        };
    },
    mounted(){
        this.updateRemainingTime();
        this.intervalId = setInterval(() => {
            this.updateRemainingTime(); // 화살표 함수로 'this' 바인딩
        }, 1000); // 1초마다 갱신

        this.db = getDatabase(); // Firebase 데이터베이스 초기화
        // this.getData();
        // 데이터 변경 감지를 위해 리스너 추가
        this.dataRef = ref(this.db, this.dbPath);
        onValue(this.dataRef, (snapshot) => {
            const getData = snapshot.val() || {};
            this.apiData = Object.keys(getData)
                .map(key => ({
                key: key, // Firebase에서의 고유 키
                ...getData[key] // 나머지 데이터
            }));
        });
    },
    beforeDestroy() {
        clearInterval(this.intervalId); // 인터벌 중지
    },
    methods:{
        updateRemainingTime() {
            const now = new Date();
            const timeDiff = this.deadline - now; // 마감 시간과 현재 시간의 차이
            if (timeDiff <= 0) {
                this.isDeadlinePassed = true;  // 마감 시간이 지나면 true로 설정
                this.remainingTime = ""; // 마감되었을 때
            } else {
                const totalSeconds = Math.floor(timeDiff / 1000); // 전체 초
                const hours = Math.floor(totalSeconds / 3600); // 총 시간
                const minutes = Math.floor((totalSeconds % 3600) / 60); // 분
                const seconds = totalSeconds % 60; // 초

                this.isDeadlinePassed = false;  // 마감 시간이 지나지 않으면 false
                this.remainingTime = `${hours}시간 ${minutes}분 ${seconds}초`;  // 총 시간, 분, 초로 표시
            }
        },
        updateChecked(item) {
            if (item) {
                const itemRef = ref(this.db, `${this.dbPath}/${item.key}`);
                update(itemRef, { checked: item.checked })
                .then(() => {
                    console.log("출석 상태 업데이트 완료, 행님!");
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
        // 비밀번호 확인 함수
        checkPasswordMatch() {
            if (this.formData.password !== this.formData.confirmPassword) {
                this.showMessage("비밀번호가 서로 다릅니다!", 2);
                this.$refs.confirmPassword.focus();
                this.$refs.confirmPassword.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return false;
            }
            return true;
        },
        validateForm() {
            const { userId, password, confirmPassword, userName, sex, age, phone, membershipType, ok, liabilityAgreement } = this.formData;

            if (!userId) {
                this.showMessage("아이디를 입력해 주세요." , 1); // 사용자에게 메시지 표시
                this.$refs.userId.focus(); // 이름 입력 필드에 포커스
                this.$refs.userId.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!password) {
                this.showMessage("비밀번호를 입력해 주세요." , 2); // 사용자에게 메시지 표시
                this.$refs.password.focus(); // 이름 입력 필드에 포커스
                this.$refs.password.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!this.checkPasswordMatch()) {
                return false;
            }
            if (!userName) {
                this.showMessage("이름을 입력해 주세요." , 3); // 사용자에게 메시지 표시
                this.$refs.userName.focus(); // 이름 입력 필드에 포커스
                this.$refs.userName.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            // if (!nickName) {
            //     this.showMessage("가명 적어주이소.." , 4); // 사용자에게 메시지 표시
            //     this.$refs.nickName.focus(); // 이름 입력 필드에 포커스
            //     this.$refs.nickName.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
            //     return false;
            // }
            if (!sex) {
                this.showMessage("성별을 입력해 주세요." , 5); // 사용자에게 메시지 표시
                this.$refs.sex.focus(); // 이름 입력 필드에 포커스
                this.$refs.sex.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!age) {
                this.showMessage("생년월일을 입력해 주세요." , 6); // 사용자에게 메시지 표시
                this.$refs.age.focus(); // 이름 입력 필드에 포커스
                this.$refs.age.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!phone) {
                this.showMessage("전화번호를 입력해 주세요." , 7); // 사용자에게 메시지 표시
                this.$refs.phone.focus(); // 이름 입력 필드에 포커스
                this.$refs.phone.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            // if (!area) {
            //     this.showMessage("부산동호횝니데이.. 서울서오마안대.." , 8); // 사용자에게 메시지 표시
            //     this.$refs.area.focus(); // 이름 입력 필드에 포커스
            //     this.$refs.area.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
            //     return false;
            // }
            if (!membershipType) {
                this.showMessage("회원 유형을 선택해 주세요." , 9); // 사용자에게 메시지 표시
                this.$refs.membershipType.focus(); // 이름 입력 필드에 포커스
                this.$refs.membershipType.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!liabilityAgreement) {
                this.showMessage("면책 동의 여부를 선택해 주세요.", 10);
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

        // getData(){
        //     this.$axios.get(this.apiUrl).then(response => {
        //         const apiData = response.data || {};
        //         this.apiData = Object.keys(apiData)
        //             .filter(key => key !== 'swimming_competition_exemptCount') // exemptCount를 제외
        //             .map(key => ({
        //                 key: key, // Firebase에서의 고유 키
        //                 ...apiData[key] // 나머지 데이터
        //             })
        //         );
        //         console.log(' this.apiData',  this.apiData)
        //     }).catch(error => {
        //         console.error("신청자 목록 가져오기 오류:", error);
        //     });
        // },
        submitForm(){
            if(!this.validateForm()){
                return;
            }

            const now = new Date();
            const regDt = this.formatDate(now);

            const applicantData = {
                regDt: regDt,
                userId:this.formData.userId,
                password:this.formData.password,
                confirmPassword:this.formData.confirmPassword,
                userName:this.formData.userName,
                // nickName:this.formData.nickName,
                sex               :this.formData.sex,
                age               :this.formData.age,
                phone             :this.formData.phone,
                // area:this.formData.area,
                membershipType :this.formData.membershipType,
                paid              :false,
                liabilityAgreement: this.formData.liabilityAgreement // 면책 동의 추가
            };

            push(this.dataRef, applicantData)
            .then(() => {

                this.result = '너 나의 동료가 되라! 완료!';
                alert(this.result)
                // this.getData(); // 신청자 목록 갱신
                this.formData = {
                    regDt: '',
                    userId              :'',
                    password              :'',
                    confirmPassword              :'',
                    userName              :'',
                    // nickName              :'',
                    sex               :'',
                    age               :'',
                    phone             :'',
                    // area              :'',
                    membershipType              :'',
                    paid              :'',
                    liabilityAgreement: '' // 초기화
                };
            }).catch(error => {
                console.error('데이터 저장 오류:', error);
                this.result = '데이터 저장 오류가 발생했습니다.';
                alert(this.result)
            });
        },
        copyAccountNumber(event) {
            event.preventDefault(); // 기본 동작 방지
            // 참조된 계좌번호 텍스트 가져오기
            const accountText = '3333-20-4133950 카카오뱅크 노원기'

            navigator.clipboard.writeText(accountText)
            .then(() => {
                alert("계좌번호가 복사되었습니다: ");
            })
                      .catch(error => {
                console.error("계좌번호 복사 실패:", error);
            });
        },
        formatDate(date) {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            const hh = String(date.getHours()).padStart(2, '0');
            const min = String(date.getMinutes()).padStart(2, '0');
            const ss = String(date.getSeconds()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
        }
    }
};
</script>
