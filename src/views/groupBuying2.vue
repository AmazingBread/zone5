<template>
    <div>
        <h2 class="page_title">보노보노 요헤미티 공동구매</h2>
        <h2 class="page_title">4월 10일 마감 11일 주문</h2>
        <img src="@/assets/image/yohea.jpg" class="img-fluid" alt="썸네일" />
        <h2 class="page_title">보노보노 요헤미티 공동구매</h2>
        <h2 class="page_title">4월 10일 마감 11일 주문</h2>
        <!--<p class="text-center">13시 ~ 14시 데크에 다른팀 같이 사용</p>-->
        <form @submit.prevent="submitForm">
            <div class="mb-3" style="padding:10px; border-radius: 5px; border:1px solid #dee2e6;">
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
                        <div class="form-check d-inline-block me-3 mt-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                            <input class="form-check-input" type="radio" name="affiliation" id="shoulder" value="어깨이" v-model="formData.affiliation">
                            <label class="form-check-label" for="shoulder">어깨이</label>
                        </div>
                        <div class="form-check d-inline-block me-3 mt-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                            <input class="form-check-input" type="radio" name="affiliation" id="swimmy" value="스위미" v-model="formData.affiliation">
                            <label class="form-check-label" for="swimmy">스위미</label>
                        </div>
                        <div class="form-check d-inline-block me-3 mt-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                            <input class="form-check-input" type="radio" name="affiliation" id="gosu" value="고수정" v-model="formData.affiliation">
                            <label class="form-check-label" for="gosu">고수정</label>
                        </div>
                        <div class="form-check d-inline-block me-3 mt-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                            <input class="form-check-input" type="radio" name="affiliation" id="zoo" value="ZOO" v-model="formData.affiliation">
                            <label class="form-check-label" for="zoo">ZOO</label>
                        </div>
                        <div class="form-check d-inline-block me-3 mt-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                            <input class="form-check-input" type="radio" name="affiliation" id="umpa" value="음파핫" v-model="formData.affiliation">
                            <label class="form-check-label" for="umpa">음파핫</label>
                        </div>
                        <div class="form-check d-inline-block me-3 mt-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                            <input class="form-check-input" type="radio" name="affiliation" id="kimboss" value="KIMBOSS" v-model="formData.affiliation">
                            <label class="form-check-label" for="kimboss">KIMBOSS</label>
                        </div>

                        <!-- 기타 옵션 -->
                        <div class="form-check mt-3 d-flex align-items-center"> <!-- d-flex 클래스를 사용하여 flexbox로 정렬 -->
                            <input class="form-check-input" type="radio" name="affiliation" id="other" value="기타" v-model="formData.affiliation">
                            <label class="form-check-label me-2" for="other">기타</label> <!-- 오른쪽 마진 추가 -->
                            <input
                                type="text"
                                class="form-control"
                                v-model="formData.otherAffiliation"
                                placeholder="ex) 배하정 지인"
                                :disabled="formData.affiliation !== '기타'"
                                style="width: auto; flex-grow: 1;"
                            >
                        </div>
                    </div>
                    <p class="text-danger mt-2" v-if="errorMessage[1] === 2">{{errorMessage[0]}}</p>
                </div>
                <div class="parent-container">
                    <div v-for="(type, index) in waterTypes" :key="index" class="item-container">
                        <div class="counter-section">
                            <label :for="type.id" class="form-label fw-bold">{{ type.label }}</label>
                            <div class="counter-container">
                                <button type="button" @click="decrement(type.model)">-</button>
                                <input
                                    type="number"
                                    class="form-control"
                                    v-model="formData[type.model]"
                                    min="0"
                                    :ref="type.model"
                                />
                                <button type="button" @click="increment(type.model)">+</button>
                            </div>
                        </div>
                        <div class="price-section">
                            <p>{{ (formData[type.model] * 6900).toLocaleString() }} 원</p>
                        </div>
                    </div>
                    <div class="item-container">
                        <div class="counter-section">
                            <label for="gelCount" class="form-label fw-bold">요해미티-에너지젤</label>
                            <div class="counter-container">
                                <button type="button" @click="decrement('gelCount')">-</button>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="gelCount"
                                    v-model="formData.gelCount"
                                    min="0"
                                >
                                <button type="button" @click="increment('gelCount')">+</button>
                            </div>
                        </div>
                        <div class="price-section">
                            <p>{{ (formData.gelCount * 15500).toLocaleString() }} 원</p>
                        </div>
                    </div>
                    <div class="sum-section">
                        <strong>총합계</strong>
                        <span class="price">{{ (totalPrice).toLocaleString() }} 원</span>
                    </div>
                </div>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 3">{{errorMessage[0]}}</p>
            </div>
            <div style="background:#f6faff; border:1px solid #eee; border-radius: 2px; padding:10px; margin: 30px 0">
                <label class="form-label fw-bold">구매방법 안내</label>
                <p style="font-size:12px;">
                    1. 워터 (1통 10알) 6,900원 입니다.(50통 이하시 공구취소)<br>
                    2. 젤 (1팩 10개) 15,500원 (30팩 이하시 공구취소)<br>
                    3. 제품수령은 보노보노 오프라인 모임으로 수령가능 (택배x)<br>
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
                <p class="text-danger mt-2" v-if="errorMessage[1] === 4">{{errorMessage[0]}}</p>
            </div>
            <button type="submit" class="btn btn-primary w-100">신청</button>
            <div style="background:#f6faff; border:1px solid #eee; border-radius: 2px; padding:10px; margin: 30px 0">
                <label class="form-label fw-bold">입금 계좌번호 안내</label> <button type="button" class="btn btn-sm btn-outline-secondary" @click="copyAccountNumber" style="font-size:10px">계좌번호 복사</button>
                <p class="highlighted-text" ref="accountText">3333320918579 카카오뱅크 황영균</p>
                <p style="font-size: 12px">EX) 요헤미티 배하정</p>
                <div class="refund-policy">
                    <p>※ 환불규정</p>
                    <ul>
                        <li>마감일 이후 환불불가</li>
                        <li>주문전에는 100쁘로 환불</li>
                        <!--<li>입장 최소 인원 결정 및 환불은 스탓벙 진행 후 확정하며 진행 당일 환불 예정입니다. 진행 후에 최종 환불됩니다.</li>-->
                    </ul>
                </div>
            </div>
        </form>
        <div class="mt-3">
            <p style="font-size: 12px; padding: 0 0 0 10px; text-align: right; margin-top:20px;">주문서 {{apiData.length}}명</p>
            <div v-for="(item, index) in apiData.slice().reverse()" :key="item.key" class="mb-2" style="padding:10px; border:1px solid #dee2e6; border-radius: 5px; font-size: 12px">
                <input class="form-check-input" type="checkbox" v-model="item.checked" @change="updateChecked(item)" style="font-size:16px">
                {{ apiData.length - index  }}. {{ item.name }}
                <span v-if="item.affiliation === '기타'">{{ item.otherAffiliation }}</span>
                <span v-else>{{ item.affiliation }}</span>
                <button
                    class="btn"
                    :class="{
                            'btn-success': item.paid,
                            'btn-warning': !item.paid,
                        }"
                    style="padding: 0.2rem 0.5rem; font-size:10px; margin-left:1rem;"
                >
                    {{ item.paid ? '입금' : '미입금' }}
                </button>
                <div class="order_list">
                    <div class="order-item" v-if="item.waterGrapesCount > 0"><span>워터 - 청포도</span> <strong>{{ item.waterGrapesCount }} 개</strong> <strong class="order-price">{{(item.waterGrapesCount * 6900).toLocaleString()}} 원</strong></div>
                    <div class="order-item" v-if="item.waterLemonCount > 0"><span>워터 - 레몬</span> <strong>{{ item.waterLemonCount }} 개</strong> <strong class="order-price">{{(item.waterLemonCount * 6900).toLocaleString()}} 원</strong></div>
                    <div class="order-item" v-if="item.waterPitchCount > 0"><span>워터 - 피치</span> <strong>{{ item.waterPitchCount }} 개</strong> <strong class="order-price">{{(item.waterPitchCount * 6900).toLocaleString()}} 원</strong></div>
                    <div class="order-item" v-if="item.waterOriginalCount > 0"><span>워터 - 오리지날</span> <strong>{{ item.waterOriginalCount }} 개</strong> <strong class="order-price">{{(item.waterOriginalCount * 6900).toLocaleString()}} 원</strong></div>
                </div>
                <div style="border-top:1px solid #ddd; padding-top:5px; margin-top:5px;" class="order-item"><span>총 워터</span> <strong>{{ item.waterCount}} 개</strong> <strong class="order-price">{{(item.totalWater).toLocaleString()}} 원</strong></div>
                <div style="border-top:1px solid #ddd; padding-top:5px; margin-top:5px;" class="order-item"><span>총 젤</span> <strong>{{ item.gelCount }} 개</strong> <strong class="order-price">{{(item.totalGel).toLocaleString()}} 원</strong></div>
                <div style="border-top:1px solid #ddd; padding-top:5px; margin-top:5px;" class="order-item"><span>총 합계</span> <strong>{{  Number(item.waterCount) +  Number(item.gelCount) }} 개</strong> <strong class="order-price">{{(item.totalSum).toLocaleString()}} 원</strong></div>
            </div>
        </div>
    </div>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database"; // Firebase SDK에서 필요한 모듈을 임포트합니다.

export default {
    data(){
        return {
            apiUrl : "https://bonobono-e6ed4-default-rtdb.asia-southeast1.firebasedatabase.app/group_buying2.json",
            formData  :{
                checked      :'',
                name      :'',
                affiliation     :'',
                otherAffiliation:'',
                paid   :"",
                waterGrapesCount: 0,
                waterLemonCount: 0,
                waterPitchCount: 0,
                waterOriginalCount: 0,
                waterCount:0,
                gelCount:0,
                totalWater:0,
                totalGel:0,
                totalSum:0,
                liabilityAgreement: '',
                pay:'',
            },
            waterTypes: [
                { id: "waterGrapes", label: "워터 (청포도)", model: "waterGrapesCount" },
                { id: "waterLemon", label: "워터 (레몬)", model: "waterLemonCount" },
                { id: "waterPitch", label: "워터 (피치)", model: "waterPitchCount" },
                { id: "waterOriginal", label: "워터 (오리지날)", model: "waterOriginalCount" },
            ],
            apiData:[],
            result   :'',
            errorMessage:'',
            db: null, // 데이터베이스 참조 추가
        };
    },
    mounted(){
        this.db = getDatabase(); // Firebase 데이터베이스 초기화
        this.getData();
        // 데이터 변경 감지를 위해 리스너 추가
        const dataRef = ref(this.db, 'group_buying2'); // cheering 경로에 대한 참조
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
    computed: {
        totalPrice() {
            let gelPrice = this.formData.gelCount * 15500;
            let waterPrice = 0;

            this.waterTypes.forEach(type => {
                waterPrice += this.formData[type.model] * 6900;
            });

            return gelPrice + waterPrice;
        },
    },
    methods:{
        increment(field) {
            this.formData[field]++;
        },
        decrement(field) {
            if (this.formData[field] > 0) this.formData[field]--;
        },
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
        validateForm() {
            const { name, affiliation, waterGrapesCount, waterLemonCount, waterPitchCount, waterOriginalCount, gelCount, liabilityAgreement } = this.formData;

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
            if (waterGrapesCount === 0 && waterLemonCount === 0 && waterPitchCount === 0 && waterOriginalCount === 0 && gelCount === 0) {
                this.showMessage("안삽니꺼??", 3);
                this.$refs.waterGrapesCount.focus();
                this.$refs.waterGrapesCount.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
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
            let waterCount =
                    Number(this.formData.waterGrapesCount) +
                    Number(this.formData.waterLemonCount) +
                    Number(this.formData.waterPitchCount) +
                    Number(this.formData.waterOriginalCount);
            let yohemite = {
                checked         :this.formData.checked,
                name            :this.formData.name,
                affiliation     :this.formData.affiliation,
                otherAffiliation:this.formData.otherAffiliation,
                paid            :false,
                waterGrapesCount         :this.formData.waterGrapesCount,
                waterLemonCount         :this.formData.waterLemonCount,
                waterPitchCount         :this.formData.waterPitchCount,
                waterOriginalCount         :this.formData.waterOriginalCount,
                waterCount : waterCount,
                gelCount                     :this.formData.gelCount,
                totalWater: (waterCount) * 6900,
                totalGel: this.formData.gelCount * 15500,
                totalSum: ((waterCount) * 6900) + this.formData.gelCount * 15500,
                liabilityAgreement: this.formData.liabilityAgreement, // 면책 동의 추가

            };

            this.$axios.post(this.apiUrl, yohemite).then(() => {
                this.result = '지갑 잘 털고 갑니데이!';
                alert(this.result)
                this.getData(); // 신청자 목록 갱신
                this.formData = {
                    checked: '',
                    name : '',
                    affiliation     :'',
                    otherAffiliation:'',
                    paid   :'',
                    waterGrapesCount: 0,
                    waterLemonCount: 0,
                    waterPitchCount: 0,
                    waterOriginalCount: 0,
                    waterCount:0,
                    gelCount:0,
                    totalWater:0,
                    totalGel:0,
                    totalSum:0,
                    liabilityAgreement: '' // 초기화
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
        },
        copyAccountNumber(event) {
            event.preventDefault(); // 기본 동작 방지
            // 참조된 계좌번호 텍스트 가져오기
            const accountText = '3333320918579 카카오뱅크'

            // 클립보드에 텍스트 복사
            navigator.clipboard.writeText(accountText)
            .then(() => {
                alert("계좌번호가 복사되었습니다: ");
            })
                      .catch(error => {
                console.error("계좌번호 복사 실패:", error);
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
        deleteApplicant(key) {
            // 삭제 확인 창 띄우기
            const confirmDelete = confirm("진짜로 삭제하냐?");
            if (confirmDelete) {
                // Firebase에서 데이터 삭제
                this.$axios.delete(`${this.apiUrl.replace('.json', '')}/${key}.json`).then(() => {
                    this.getData(); // 신청자 목록 갱신
                }).catch(error => {
                    console.error('삭제 오류:', error);
                });
            }
        },
    }
};
</script>

<style>
.liability-text {
    font-size: 11px;
    height: 100px;
    overflow-y: auto;
    border: 1px solid #ced4da;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    white-space: pre-wrap;
}
.parent-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.item-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 1rem 0;
}

.counter-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.counter-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}


.counter-container button {
    width: 35px;
    height: 35px;
    background-color: #f0f0f0;
    border: none;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.counter-container button:hover {
    background-color: #ddd;
}

.counter-container button:active {
    background-color: #ccc;
}

.counter-container input {
    width: 4rem;
    text-align: center;
}

.price-section {
    text-align: right;
    display: flex;
    align-items: center; /* 카운터와 금액을 같은 높이에 배치 */
    justify-content: flex-end;
}
.sum-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    margin-top: 20px;
}

.sum-section .price {
    font-weight: bold;
    color: #000;
}
.order-item {
    display: flex;
    justify-content: flex-end;
    padding: 5px 0;
    > strong {
        text-align: right; /* 카운트 오른쪽 정렬 */
        margin-right: 10px; /* 금액과의 간격을 추가 */
    }
    >span {
        text-align: left;
        flex-grow: 1;
    }
}

.order-price {
    width: 80px; /* 가격 넓이 고정 */
    text-align: right;
    font-weight: bold;
    margin-left: 10px; /* 가격과 내용 간격 조정 */
}
</style>
