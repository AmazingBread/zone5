<template>
    <div>
        <h2 class="page_title mb-4">보노보노 울산 남구 대회 4월 13일 일요일</h2>
        <img src="@/assets/image/ulsan_00.png" class="img-fluid" alt="ulsan" style="width: 100%" />
        <img src="@/assets/image/ulsan_02.jpg" class="img-fluid" alt="ulsan" />
        <img src="@/assets/image/ulsan_03.jpg" class="img-fluid" alt="ulsan" />
        <img src="@/assets/image/ulsan_04.jpg" class="img-fluid" alt="ulsan" />

        <p class="text-center text-bg-info p-2">📢📢📢  팀 보노보노 신청서 🏅🏅🏅🏅</p>
        <h2 class="page_title mb-4 text-bg-warning p-2">신청마감 3월 18일까지</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="name" class="form-label fw-bold">1. 이름적어주쏘</label>
                <input type="text" class="form-control" id="name" v-model="formData.name" ref="name">
                <p class="text-danger mt-2" v-if="errorMessage[1] === 1">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label for="sex" class="form-label fw-bold">2. 성별(남,여)로 입력</label>
                <input type="text" class="form-control" id="sex" v-model="formData.sex" ref="sex">
                <p class="text-danger mt-2" v-if="errorMessage[1] === 2">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label for="age" class="form-label fw-bold">3. 생년월일(910102) 이런형식</label>
                <input type="text" class="form-control" id="age" v-model="formData.age" ref="age">
                <p class="text-danger mt-2" v-if="errorMessage[1] === 3">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label fw-bold">4. 저나보노(010-3637-1234)이런형식</label>
                <input type="text" class="form-control" id="phone" v-model="formData.phone" ref="phone">
                <p class="text-danger mt-2" v-if="errorMessage[1] === 4">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label class="form-label fw-bold">5. 나이에 맞는 본인 그룹 선택(공고위에 이찌예)</label>
                <div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="group" id="group1" value="1그룹" v-model="formData.group" ref="group">
                        <label class="form-check-label" for="group1">1그룹</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="group" id="group2" value="2그룹" v-model="formData.group" ref="group">
                        <label class="form-check-label" for="group2">2그룹</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="group" id="group3" value="3그룹" v-model="formData.group" ref="group">
                        <label class="form-check-label" for="group3">3그룹</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="group" id="group4" value="4그룹" v-model="formData.group" ref="group">
                        <label class="form-check-label" for="events1">4그룹</label>
                    </div>
                </div>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 5">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label class="form-label fw-bold">6. 종목 1</label>
                <div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="events1" id="fr25_1" value="자유형25" v-model="formData.events1" ref="events1">
                        <label class="form-check-label" for="fr25_1">자유형25</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="events1" id="fr100_1" value="자유형100" v-model="formData.events1" ref="events1">
                        <label class="form-check-label" for="fr100_1">자유형100</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="events1" id="bk25_1" value="배영25" v-model="formData.events1" ref="events1">
                        <label class="form-check-label" for="bk25_1">배영25</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="events1" id="br25_1" value="평영25" v-model="formData.events1" ref="events1">
                        <label class="form-check-label" for="br25_1">평영25</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="events1" id="fl25_1" value="접영25" v-model="formData.events1" ref="events1">
                        <label class="form-check-label" for="fl25_1">접영25</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="events1" id="im100_1" value="개인혼영100" v-model="formData.events1" ref="events1">
                        <label class="form-check-label" for="im100_1">개인혼영100</label>
                    </div>
                </div>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 6">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label class="form-label fw-bold">7. 종목 2</label>
                <div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="events2" id="fr25_2" value="자유형25" v-model="formData.events2" ref="events2">
                        <label class="form-check-label" for="fr25_2">자유형25</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="events2" id="fr100_2" value="자유형100" v-model="formData.events2" ref="events2">
                        <label class="form-check-label" for="fr100_2">자유형100</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="events2" id="bk25_2" value="배영25" v-model="formData.events2" ref="events2">
                        <label class="form-check-label" for="bk25_2">배영25</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="events2" id="br25_2" value="평영25" v-model="formData.events2" ref="events2">
                        <label class="form-check-label" for="br25_2">평영25</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="events2" id="fl25_2" value="접영25" v-model="formData.events2" ref="events2">
                        <label class="form-check-label" for="fl25_2">접영25</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="events2" id="im100_2" value="개인혼영100" v-model="formData.events2" ref="events2">
                        <label class="form-check-label" for="im100_2">개인혼영100</label>
                    </div>
                </div>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 7">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label class="form-label fw-bold">8. 티샤스 사이즈</label>
                <div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="tsize" id="tsize" value="S" v-model="formData.tsize" ref="tsize">
                        <label class="form-check-label" for="tsize">S</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="tsize" id="tsize" value="M" v-model="formData.tsize" ref="tsize">
                        <label class="form-check-label" for="tsize">M</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="tsize" id="tsize" value="L" v-model="formData.tsize" ref="tsize">
                        <label class="form-check-label" for="tsize">L</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="tsize" id="tsize" value="XL" v-model="formData.tsize" ref="tsize">
                        <label class="form-check-label" for="tsize">XL</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="tsize" id="tsize" value="XXL" v-model="formData.tsize" ref="tsize">
                        <label class="form-check-label" for="tsize">XXL</label>
                    </div>
                </div>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 8">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label for="size" class="form-label fw-bold">9. 돈낼거</label>
                <select class="form-select" id="size" v-model="formData.ok" ref="sizeSelect">
                    <option value="" disabled>돈낼거 확인</option>
                    <option value="장소, 시간 확인함">대회비 2.5만 + 먹을거 1만 = 3.5만</option>
                </select>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 9">{{errorMessage[0]}}</p>
            </div>
            <div style="background:#f6faff; border:1px solid #eee; border-radius: 2px; padding:10px; margin: 30px 0">
                <label class="form-label fw-bold">보노보노 대회 안내</label>
                <p style="font-size:12px;">
                    1. 대회 신청서 제출후 대회비 환불안됨<br>
                    2. 자차 가져가시는분들 카풀 합시다<br>
                    3. 먹는거는 김밥+컵라면 하고 주전부리 챙기께에<br>
                    4. 돗자리(폭신한거)나 아이스박스 있으신분들 들고오세요<br>
                    5. 수경수모 혹시모른다 2개씩 챙기소<br>
                    6. 수정은 안되니 다시 작성하면 뒤에껀 지우께요<br><br>
                    ! 문의사항은 인스타그램 댓글/DM 으로 남겨주세요.<br>
                </p>
            </div>
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
                <p class="text-danger mt-2" v-if="errorMessage[1] === 10">{{errorMessage[0]}}</p>
            </div>
            <button type="submit" class="btn btn-primary w-100">대회신청</button>
            <div style="background:#f6faff; border:1px solid #eee; border-radius: 2px; padding:10px; margin: 30px 0">
                <label class="form-label fw-bold">입금 계좌번호 안내</label> <button type="button" class="btn btn-sm btn-outline-secondary" @click="copyAccountNumber" style="font-size:10px">계좌번호 복사</button>
                <p class="highlighted-text" ref="accountText">{{accountText}}</p>
                <div class="refund-policy">
                    <p>※ 환불규정</p>
                    <ul>
                        <li>대회 신청마감후 환불 불가</li>
                        <li>입금 후 미참석자는 환불 불가</li>
                    </ul>
                </div>

            </div>
        </form>
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
                    <!-- 오른쪽: 대회비 버튼 -->
                    <button
                        class="btn"
                        :class="{ 'btn-success': item.paid, 'btn-warning': !item.paid }"
                        style="padding: 0.2rem 0.5rem; font-size:10px"
                    >
                        {{ item.paid ? '대회비 입완' : '대회비 미입금' }}
                    </button>
                </div>

                <!-- 하단 사용자 정보 -->
                <div class="font-weight-bold mt-1">
                    {{ item.name }}, {{ item.sex }}, {{ item.age }}, {{ formatPhone(item.phone) }}, {{ item.tsize }}
                </div>
                <div class="font-weight-bold">
                    {{ item.group }}, {{ item.events1 }}, {{ item.events2 }}
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
                tsize      :'',
                paid   :"",
                ok:'',
                liabilityAgreement: ''
            },
            apiData:[],
            result   :'',
            applicantCount: 0, // 전역 변수 초기화
            errorMessage:'',
            db: null, // 데이터베이스 참조 추가
            accountText: '79420390777 카카오뱅크 35,0000원'
        };
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
            const { name, sex, age, phone, group, events1, events2, tsize, ok, liabilityAgreement } = this.formData;

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
            if (!tsize) {
                this.showMessage("티샤스 골라야지" , 8); // 사용자에게 메시지 표시
                this.$refs.tsize.focus(); // 이름 입력 필드에 포커스
                this.$refs.tsize.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!ok) {
                this.showMessage("돈 확인!!!", 9);
                this.$refs.sizeSelect.focus(); // 수업 선택 드롭다운에 포커스
                this.$refs.sizeSelect.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!liabilityAgreement) {
                this.showMessage("면책 동의좀 해주이소..", 10);
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
                events1           :this.formData.events1,
                events2           :this.formData.events2,
                tsize             :this.formData.tsize,

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
                    tsize              :'',
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
        formatJumin(jumin) {
            if (!jumin || jumin.length < 8) return jumin; // 예외 처리
            return jumin.slice(0, 6) + '-' + jumin.charAt(7) + '*******';
        },
        // 전화번호 포맷 (맨 뒤 4자리 가리기)
        formatPhone(phone) {
            if (!phone || phone.length < 4) return phone; // 예외 처리
            return phone.slice(0, -4) + '****';
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
        }
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
/* 스타일 추가 (예: form 스타일링) */
</style>
