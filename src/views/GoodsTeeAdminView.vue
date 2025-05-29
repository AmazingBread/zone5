<template>
    <div>
        <h2 class="page_title mb-4">티셔츠 구매 관리자 화면</h2>
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
                    <td style="font-size:12px; ">{{ item.color }}</td>
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
                <dt>입금수 / 신청수</dt>
                <dd>{{ paidGoodsCapCount }}장 / {{ apiData.length }}장</dd>
            </dl>

            <dl style="margin-right: 20px;">
                <dt>입금액 / 신청액</dt>
                <dd>{{ (paidGoodsCapCount*15000).toLocaleString() }}원 / {{(apiData.length*15000).toLocaleString()}}원</dd>
            </dl>
            <div>
                <h2 class="page_title mb-4">신청 옵션 갯수</h2>
                <dl style="margin-right: 20px;">
                    <dt><span class="black">BLACK</span> S 사이즈</dt>
                    <dd><strong>{{ getCount('BLACK', 'S') }}</strong> 장</dd>
                </dl>
                <dl style="margin-right: 20px;">
                    <dt><span class="black">BLACK</span> M 사이즈</dt>
                    <dd><strong>{{ getCount('BLACK', 'M') }}</strong> 장</dd>
                </dl>
                <dl style="margin-right: 20px;">
                    <dt><span class="black">BLACK</span> L 사이즈</dt>
                    <dd>{{ getCount('BLACK', 'L') }} 장 + (추가 5장) = <strong>{{ getCount('BLACK', 'L') +5 }}</strong> 장</dd>
                </dl>
                <dl style="margin-right: 20px;">
                    <dt><span class="black">BLACK</span> XL 사이즈</dt>
                    <dd>{{ getCount('BLACK', 'XL') }} 장 + (추가 5장) = <strong>{{ getCount('BLACK', 'XL') +5 }}</strong> 장</dd>
                </dl>
                <dl style="margin-right: 20px;">
                    <dt><span class="black">BLACK</span> 총 합계</dt>
                    <dd>{{ getColorCount('BLACK') }} 장 + (추가 10장) = <strong>{{ getColorCount('BLACK') +10 }}</strong> 장</dd>
                </dl>
                <hr/>
                <dl style="margin-right: 20px;">
                    <dt><span class="white">WHITE</span> S 사이즈</dt>
                    <dd><strong>{{ getCount('WHITE', 'S') }}</strong> 장</dd>
                </dl>
                <dl style="margin-right: 20px;">
                    <dt><span class="white">WHITE</span> M 사이즈</dt>
                    <dd><strong>{{ getCount('WHITE', 'M') }}</strong> 장</dd>
                </dl>
                <dl style="margin-right: 20px;">
                    <dt><span class="white">WHITE</span> L 사이즈</dt>
                    <dd>{{ getCount('WHITE', 'L') }} 장 + (추가 5장) = <strong>{{ getCount('WHITE', 'L') +5 }}</strong> 장</dd>
                </dl>
                <dl style="margin-right: 20px;">
                    <dt><span class="white">WHITE</span> XL 사이즈</dt>
                    <dd>{{ getCount('WHITE', 'XL') }} 장 + (추가 5장) = <strong>{{ getCount('WHITE', 'XL') +5 }}</strong> 장</dd>
                </dl>
                <dl style="margin-right: 20px;">
                    <dt><span class="white">WHITE</span> 총 합계</dt>
                    <dd>{{ getColorCount('WHITE') }} 장 + (추가 10장) = <strong>{{ getColorCount('WHITE') +10 }}</strong> 장</dd>
                </dl>
            </div>
            <div style="margin-top:50px; padding:10px; border:1px solid #333;">
                메모 - 눈두디 4장 (6매논) 미입금
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
            apiUrl : "https://bonobono-e6ed4-default-rtdb.asia-southeast1.firebasedatabase.app/goodsTee.json",
            apiData:[],
            result   :'',
            db: null, // 데이터베이스 참조 추가
            paidGoodsSum:0,
        };
    },
    mounted(){
        this.db = getDatabase(); // Firebase 데이터베이스 초기화
        this.getData();
        // 데이터 변경 감지를 위해 리스너 추가
        const dataRef = ref(this.db, 'goodsTee'); // cheering 경로에 대한 참조
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
        paidGoodsCapCount() {
            return this.apiData.filter(applicant => applicant.paid).length;
        }
    },
    methods:{
        getCount(color, size) {
            return this.apiData.filter(item =>
                item.color === color && item.size === size
            ).length
        },
        getColorCount(color) {
            return this.apiData.filter(item =>
                item.color === color
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
.black {
    background: #000000;
    color:#fff;
}
.white {
    border: 1px solid #000;
}
</style>
