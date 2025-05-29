<template>
    <div>
        <h2 class="page_title mb-4">수영복 구매 관리자 화면</h2>
        <table class="pay_table table mt-3" v-for="(item, index) in apiData.slice().reverse()" :key="item.key">
            <tbody>
                <tr :key="item.key + '-main'" >
                    <td style="width:20px;">
                        <input class="form-check-input" type="checkbox" v-model="item.checked" @change="updateChecked(item)" style="font-size:16px">
                    </td> <!-- 번호를 1부터 시작하도록 설정 -->
                    <td style="width:20px;font-size:12px; ">{{ apiData.length - index  }}</td> <!-- 번호를 1부터 시작하도록 설정 -->
                    <td style="font-size:12px; ">{{ item.name }}</td>
                    <td style="font-size:12px; ">
                        <span v-if="item.affiliation === '기타'">{{ item.otherAffiliation }}</span>
                        <span v-else>{{ item.affiliation }}</span>
                    </td>
                    <td style="font-size:12px; ">{{ item.sex }}</td>
                    <td style="font-size:12px; ">{{ item.size }}</td>
                    <td style="width: 60px; font-size:12px; " class="text-center">
                        <button
                            class="btn"
                            :class="{
                                'btn-success': item.paid,
                                'btn-warning': !item.paid,
                            }"
                            style="padding: 0.2rem 0.5rem; font-size:10px;"
                            @click="togglePayment(item.key)"
                        >
                            {{ item.paid ? '입금' : '미입금' }}
                        </button>
                    </td>
                    <td style="width:50px; ">
                        <button @click="deleteApplicant(item.key)" class="btn btn-danger btn-sm" style="font-size:10px">삭제</button>
                    </td>
                </tr>
                <!--<tr :key="item.key + '-pay'">-->
                <!--    <td colspan="6"><input class="form-control text-end" type="number" v-model="item.pay" @input="updatePay(item)" /></td>-->
                <!--</tr>-->
            </tbody>
        </table>
        <div class="paidTable">
            <dl style="margin-right: 20px;">
                <dt>전체입금수 / 전체신청수</dt>
                <dd>{{ paidGoodsCapCount }}장 / {{ apiData.length }}장</dd>
            </dl>
            <dl style="margin-right: 20px;">
                <dt>전체입금액 / 전체신청액</dt>
                <dd>{{ (paidGoodsCapCountWoman * pay_woman) + (paidGoodsCapCountMan * pay_man) }}원 / {{ (womanCount * pay_woman) + (manCount * pay_man) }}원</dd>
            </dl>
            <hr/>
            <dl style="margin-right: 20px;">
                <dt>여성입금수 / 여성신청수</dt>
                <dd>{{ paidGoodsCapCountWoman }}장 / {{ womanCount }}장</dd>
            </dl>
            <dl style="margin-right: 20px;">
                <dt>여성입금액 / 여성신청액</dt>
                <dd>{{ paidGoodsCapCountWoman * pay_woman }}원 / {{ womanCount * pay_woman }}원</dd>
            </dl>
            <hr/>
            <dl style="margin-right: 20px;">
                <dt>남성입금수 / 남성신청수</dt>
                <dd>{{ paidGoodsCapCountMan }}장 / {{ manCount }}장</dd>
            </dl>
            <dl style="margin-right: 20px;">
                <dt>여성입금액 / 여성신청액</dt>
                <dd>{{ paidGoodsCapCountWoman * pay_man }}원 / {{ womanCount * pay_man }}원</dd>
            </dl>
            <div>
                <h2 class="page_title mb-4">신청 옵션 갯수</h2>
                <dl style="margin-right: 20px;">
                    <dt><span class="black">woman</span> S 사이즈</dt>
                    <dd><strong>{{ getCount('woman', 'S') }}</strong> 장</dd>
                </dl>
                <dl style="margin-right: 20px;">
                    <dt><span class="black">woman</span> M 사이즈</dt>
                    <dd><strong>{{ getCount('woman', 'M') }}</strong> 장</dd>
                </dl>
                <dl style="margin-right: 20px;">
                    <dt><span class="black">woman</span> L 사이즈</dt>
                    <dd>{{ getCount('woman', 'L') }} 장</dd>
                </dl>
                <hr/>
                <dl style="margin-right: 20px;">
                    <dt><span class="black">woman</span> 총 합계</dt>
                    <dd>{{ getSexCount('woman') }} 장</dd>
                </dl>
                <hr/>
                <dl style="margin-right: 20px;">
                    <dt><span class="white">man</span> S 사이즈</dt>
                    <dd><strong>{{ getCount('man', 'S') }}</strong> 장</dd>
                </dl>
                <dl style="margin-right: 20px;">
                    <dt><span class="white">man</span> M 사이즈</dt>
                    <dd><strong>{{ getCount('man', 'M') }}</strong> 장</dd>
                </dl>
                <dl style="margin-right: 20px;">
                    <dt><span class="white">man</span> L 사이즈</dt>
                    <dd>{{ getCount('man', 'L') }} 장</dd>
                </dl>
                <hr/>
                <dl style="margin-right: 20px;">
                    <dt><span class="white">man</span> 총 합계</dt>
                    <dd>{{ getSexCount('man') }} 장</dd>
                </dl>
            </div>
            <div style="margin-top:50px; padding:10px; border:1px solid #333;">
                메모 -
            </div>
            <!--<dl style="margin-right: 20px;">-->
            <!--    <dt>실제차액</dt>-->
            <!--</dl>-->
        </div>
        <div class="pb-5"></div>
    </div>
</template>

<script>
import {getDatabase, onValue, ref} from "firebase/database";

export default {
    data(){
        return {
            apiUrl : "https://bonobono-e6ed4-default-rtdb.asia-southeast1.firebasedatabase.app/goodsSwimWear2.json",
            apiData:[],
            result   :'',
            db: null, // 데이터베이스 참조 추가
            paidGoodsSum:0,
            pay_woman : 69000,
            pay_man : 59000
        };
    },
    mounted(){
        this.db = getDatabase(); // Firebase 데이터베이스 초기화
        this.getData();
        // 데이터 변경 감지를 위해 리스너 추가
        const dataRef = ref(this.db, 'goodsSwimWear2'); // cheering 경로에 대한 참조
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
    },
    computed: {
        womanCount() {
            return this.apiData.filter(item => item.sex === 'woman').length;
        },
        manCount() {
            return this.apiData.filter(item => item.sex === 'man').length;
        },
        paidGoodsCapCount() {
            return this.apiData.filter(applicant => applicant.paid).length;
        },
        paidGoodsCapCountWoman() {
            return this.apiData.filter(applicant => applicant.paid && applicant.sex === 'woman').length;
        },
        paidGoodsCapCountMan() {
            return this.apiData.filter(applicant => applicant.paid && applicant.sex === 'man').length;
        }
    },
    methods:{
        getCount(sex, size) {
            return this.apiData.filter(item =>
                item.sex === sex && item.size === size
            ).length
        },
        getSexCount(sex) {
            return this.apiData.filter(item =>
                item.sex === sex
            ).length
        },
        updatePay(item){
            if (item) {
                this.$axios.put(`${this.apiUrl.replace('.json', '')}/${item.key}.json`, {
                    ...item,
                    pay: item.pay
                })
                .then(() => {
                    // 데이터 업데이트 후 총합계를 다시 계산
                    this.getData(); // 신청자 목록 갱신
                })
                .catch(error => {
                    console.error('입금금액 업데이트 오류:', error);
                });
            } else {
                console.error('입금금액 오류:', item.key);
            }
        },
        updateChecked(item) {
            if (item) {
                this.$axios.put(`${this.apiUrl.replace('.json', '')}/${item.key}.json`, {
                    ...item, // 기존 데이터와 checked 상태 포함
                    checked: item.checked // checked 속성을 포함하여 업데이트
                })
                .catch(error => {
                    console.error('수령체크 업데이트 오류:', error);
                });
            } else {
                console.error('수령체크 오류:', item.key);
            }
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
        // validateForm(){
        //     return this.name && this.formData.affiliation;
        // },
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
                    return sum + (item.paid === true ? parseInt(item.pay, 10) : 0); // 입금한 금액만 합산
                }, 0);
                console.log('paidGoodsSum', this.paidGoodsSum);
                console.log('apiData', apiData);
            })
                 .catch(error => {
                console.error("신청자 목록 가져오기 오류:", error);
            });
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

<style lang="scss">
.pay_table {
    border-collapse: separate;
    border:1px solid #dee2e6;
    border-radius: 5px;
    td {border:0;}
}
</style>
