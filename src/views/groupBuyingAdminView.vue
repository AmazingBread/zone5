<template>
    <div>
        <!--<p class="text-center">13시 ~ 14시 데크에 다른팀 같이 사용</p>-->
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
                    @click="togglePayment(item.key)"
                >
                    {{ item.paid ? '입금' : '미입금' }}
                </button>
                <button
                    @click="deleteApplicant(item.key)" class="btn btn-danger btn-sm" style="font-size:10px; margin-left:1rem; text-align: right;">삭제</button>
                <div class="order_list">
                    <div class="order-item" v-if="item.waterGrapesCount > 0"><span>워터 - 청포도</span> <strong>{{ item.waterGrapesCount }} 개</strong> <strong class="order-price">{{item.waterGrapesCount * 6900}} 원</strong></div>
                    <div class="order-item" v-if="item.waterLemonCount > 0"><span>워터 - 레몬</span> <strong>{{ item.waterLemonCount }} 개</strong> <strong class="order-price">{{item.waterLemonCount * 6900}} 원</strong></div>
                    <div class="order-item" v-if="item.waterPitchCount > 0"><span>워터 - 피치</span> <strong>{{ item.waterPitchCount }} 개</strong> <strong class="order-price">{{item.waterPitchCount * 6900}} 원</strong></div>
                    <div class="order-item" v-if="item.waterOriginalCount > 0"><span>워터 - 오리지날</span> <strong>{{ item.waterOriginalCount }} 개</strong> <strong class="order-price">{{item.waterOriginalCount * 6900}} 원</strong></div>
                </div>
                <div style="border-top:1px solid #ddd; padding-top:5px; margin-top:5px;" class="order-item"><span>총 워터</span> <strong>{{ item.waterCount}} 개</strong> <strong class="order-price">{{item.totalWater}} 원</strong></div>
                <div style="border-top:1px solid #ddd; padding-top:5px; margin-top:5px;" class="order-item"><span>총 젤</span> <strong>{{ item.gelCount }} 개</strong> <strong class="order-price">{{item.totalGel}} 원</strong></div>
                <div style="border-top:1px solid #ddd; padding-top:5px; margin-top:5px;" class="order-item"><span>총 단백질</span> <strong>{{ item.danCount }} 개</strong> <strong class="order-price">{{item.totalDan}} 원</strong></div>
                <div style="border-top:1px solid #ddd; padding-top:5px; margin-top:5px;" class="order-item"><span>총 합계</span> <strong>{{  Number(item.waterCount) +  Number(item.gelCount) }} 개</strong> <strong class="order-price">{{item.totalSum}} 원</strong></div>
            </div>
        </div>
        <div class="paidTable">
            <dl style="margin-right: 20px;">
                <dt>신청자 / 입금자</dt>
                <dd>{{ apiData.length }}명 /&nbsp;<strong>{{ paidGoodsCapCount }}명</strong></dd>
            </dl>
            <hr/>
            <dl style="margin-right: 20px;">
                <dt>청포도</dt>
                <dd>{{ waterGrapesSum.toLocaleString() }}개 /&nbsp; <strong>{{ paidWaterGrapesSum.toLocaleString() }}개</strong></dd>
            </dl>
            <dl style="margin-right: 20px;">
                <dt>레몬</dt>
                <dd>{{ waterLemonSum.toLocaleString() }}개 /&nbsp; <strong>{{ paidWaterLemonSum.toLocaleString() }}개</strong></dd>
            </dl>
            <dl style="margin-right: 20px;">
                <dt>피치</dt>
                <dd>{{ waterPitchSum.toLocaleString() }}개 /&nbsp; <strong>{{ paidWaterPitchSum.toLocaleString() }}개</strong></dd>
            </dl>
            <dl style="margin-right: 20px;">
                <dt>오리지널</dt>
                <dd>{{ waterOriginalSum.toLocaleString() }}개 /&nbsp; <strong>{{ paidWaterOriginalSum.toLocaleString() }}개</strong></dd>
            </dl>
            <hr/>
            <dl style="margin-right: 20px;">
                <dt>워터 수량</dt>
                <dd>{{ (goodsCount).toLocaleString() }}개 /&nbsp; <strong>{{ (paidGoodsCount).toLocaleString() }}개</strong></dd>
            </dl>
            <dl style="margin-right: 20px;">
                <dt>젤 수량</dt>
                <dd>{{ (goodsGelCount).toLocaleString() }}개 /&nbsp; <strong>{{ (paidGoodsGelCount).toLocaleString() }}개</strong></dd>
            </dl>
            <dl style="margin-right: 20px;">
                <dt>단백질 수량</dt>
                <dd>{{ (goodsDanCount).toLocaleString() }}개 /&nbsp; <strong>{{ (paidGoodsDanCount).toLocaleString() }}개</strong></dd>
            </dl>
            <hr/>
            <dl style="margin-right: 20px;">
                <dt>워터 금액</dt>
                <dd>{{ (goodsSum).toLocaleString() }}원 /&nbsp; <strong>{{ (paidGoodsSum).toLocaleString() }}원</strong></dd>
            </dl>
            <dl style="margin-right: 20px;">
                <dt>젤 금액</dt>
                <dd>{{ (goodsGelSum).toLocaleString() }}원 /&nbsp; <strong>{{ (paidGoodsGelSum).toLocaleString() }}원</strong></dd>
            </dl>
            <dl style="margin-right: 20px;">
                <dt>단백질 금액</dt>
                <dd>{{ (goodsDanSum).toLocaleString() }}원 /&nbsp; <strong>{{ (paidGoodsDanSum).toLocaleString() }}원</strong></dd>
            </dl>
            <hr/>
            <hr/>
            워터 카운터 100 돌파시 개당 6600원 / 차액
            <hr/>
            <dl style="margin-right: 20px;">
                <dt>워터100</dt>
                <dd>{{ goodsCount }}개 /&nbsp; <strong>{{ (goodsCount * 6600).toLocaleString() }}원</strong>&nbsp; / &nbsp; <strong>{{ ((goodsCount * 6900)-(goodsCount * 6600)).toLocaleString() }}원</strong></dd>
            </dl>
            <hr/>
            워터 카운터 200 돌파시 개당 6200원 / 차액
            <hr/>
            <dl style="margin-right: 20px;">
                <dt>워터200</dt>
                <dd>{{ goodsCount }}개 /&nbsp; <strong>{{ (goodsCount * 6200).toLocaleString() }}원</strong>&nbsp; / &nbsp; <strong>{{ ((goodsCount * 6900)-(goodsCount * 6200)).toLocaleString() }}원</strong></dd>
            </dl>
            <!--<dl style="margin-right: 20px;">-->
            <!--    <dt>실제차액</dt>-->
            <!--</dl>-->
        </div>
        <div class="pb-5"></div>
    </div>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database"; // Firebase SDK에서 필요한 모듈을 임포트합니다.

export default {
    data(){
        return {
            apiUrl : "https://bonobono-e6ed4-default-rtdb.asia-southeast1.firebasedatabase.app/group_buying.json",
            apiData:[],
            result   :'',
            errorMessage:'',
            db: null, // 데이터베이스 참조 추가
            goodsCount:0,
            goodsGelCount:0,
            goodsDanCount:0,
            paidGoodsSum:0,
            paidGoodsGelSum:0,
            paidGoodsDanSum:0,
            goodsSum:0,
            goodsGelSum:0,
            goodsDanSum:0,
            paidGoodsCount:0,
            paidGoodsGelCount:0,
            paidGoodsDanCount:0,

            // 물 종류별 상품 관련 변수
            waterGrapesSum: 0, // 포도맛 물 총 개수
            waterLemonSum: 0, // 레몬맛 물 총 개수
            waterPitchSum: 0, // 복숭아맛 물 총 개수
            waterOriginalSum: 0, // 오리지널 물 총 개수

            // 입금된 물 종류별 상품 관련 변수
            paidWaterGrapesSum: 0, // 입금된 포도맛 물 총 개수
            paidWaterLemonSum: 0, // 입금된 레몬맛 물 총 개수
            paidWaterPitchSum: 0, // 입금된 복숭아맛 물 총 개수
            paidWaterOriginalSum: 0, // 입금된 오리지널 물 총 개수
        };
    },
    mounted(){
        this.db = getDatabase(); // Firebase 데이터베이스 초기화
        this.getData();
        // 데이터 변경 감지를 위해 리스너 추가
        const dataRef = ref(this.db, 'group_buying'); // cheering 경로에 대한 참조
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
        paidGoodsCapCount() {
            return this.apiData.filter(applicant => applicant.paid).length;
        }
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

        getData() {
            // 신청자 목록 가져오기
            this.$axios.get(this.apiUrl)
            .then(response => {
                const apiData = response.data || {};
                this.apiData = Object.keys(apiData)
                                      .map(key => ({
                    key: key, // Firebase에서의 고유 키
                    ...apiData[key] // 나머지 데이터
                }));
                this.paidGoodsSum = this.apiData.reduce((sum, item) => {
                    return sum + (item.paid === true ? parseInt(item.totalWater, 10) : 0); // 입금한 금액만 합산
                }, 0);

                this.paidGoodsGelSum = this.apiData.reduce((sum, item) => {
                    return sum + (item.paid === true ? parseInt(item.totalGel, 10) : 0); // 입금한 금액만 합산
                }, 0);

                this.paidGoodsDanSum = this.apiData.reduce((sum, item) => {
                    return sum + (item.paid === true ? parseInt(item.totalDan, 10) : 0); // 입금한 금액만 합산
                }, 0);

                //각 구매수량
                this.waterGrapesSum = this.apiData.reduce((sum, item) => {
                    return sum + (parseInt(item.waterGrapesCount, 10) || 0);
                }, 0);

                this.waterLemonSum = this.apiData.reduce((sum, item) => {
                    return sum + (parseInt(item.waterLemonCount, 10) || 0);
                }, 0);

                this.waterPitchSum = this.apiData.reduce((sum, item) => {
                    return sum + (parseInt(item.waterPitchCount, 10) || 0);
                }, 0);

                this.waterOriginalSum = this.apiData.reduce((sum, item) => {
                    return sum + (parseInt(item.waterOriginalCount, 10) || 0);
                }, 0);

                // 입금된 각 구매수량
                this.paidWaterGrapesSum = this.apiData.reduce((sum, item) => {
                    return sum + (item.paid === true ? parseInt(item.waterGrapesCount, 10) || 0 : 0);
                }, 0);

                this.paidWaterLemonSum = this.apiData.reduce((sum, item) => {
                    return sum + (item.paid === true ? parseInt(item.waterLemonCount, 10) || 0 : 0);
                }, 0);

                this.paidWaterPitchSum = this.apiData.reduce((sum, item) => {
                    return sum + (item.paid === true ? parseInt(item.waterPitchCount, 10) || 0 : 0);
                }, 0);

                this.paidWaterOriginalSum = this.apiData.reduce((sum, item) => {
                    return sum + (item.paid === true ? parseInt(item.waterOriginalCount, 10) || 0 : 0);
                }, 0);

                this.goodsSum = this.apiData.reduce((sum, item) => {
                    return sum + (parseInt(item.totalWater, 10) || 0); // waterCount 값을 숫자로 변환하여 합산
                }, 0);
                this.goodsGelSum = this.apiData.reduce((sum, item) => {
                    return sum + (parseInt(item.totalGel, 10) || 0); // waterCount 값을 숫자로 변환하여 합산
                }, 0);
                this.goodsDanSum = this.apiData.reduce((sum, item) => {
                    return sum + (parseInt(item.totalDan, 10) || 0); // waterCount 값을 숫자로 변환하여 합산
                }, 0);


                this.goodsCount = this.apiData.reduce((sum, item) => {
                    return sum + (parseInt(item.waterCount, 10) || 0); // waterCount 값을 숫자로 변환하여 합산
                }, 0);

                this.paidGoodsCount = this.apiData.reduce((sum, item) => {
                    return sum + (item.paid === true ? parseInt(item.waterCount, 10) : 0); // waterCount 값을 숫자로 변환하여 합산
                }, 0);
                this.goodsGelCount = this.apiData.reduce((sum, item) => {
                    return sum + (parseInt(item.gelCount, 10) || 0); // waterCount 값을 숫자로 변환하여 합산
                }, 0);
                this.goodsDanCount = this.apiData.reduce((sum, item) => {
                    return sum + (parseInt(item.danCount, 10) || 0); // waterCount 값을 숫자로 변환하여 합산
                }, 0);

                this.paidGoodsGelCount = this.apiData.reduce((sum, item) => {
                    return sum + (item.paid === true ? parseInt(item.gelCount, 10) : 0); // waterCount 값을 숫자로 변환하여 합산
                }, 0);
                this.paidGoodsDanCount = this.apiData.reduce((sum, item) => {
                    return sum + (item.paid === true ? parseInt(item.danCount, 10) : 0); // waterCount 값을 숫자로 변환하여 합산
                }, 0);
                // console.log('paidGoodsSum', this.paidGoodsSum);
                // console.log('apiData', apiData);
            })
                 .catch(error => {
                console.error("신청자 목록 가져오기 오류:", error);
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
