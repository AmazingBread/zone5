<template>
    <div>
        <h2 class="page_title mb-4">관리자 화면</h2>
        <table class="table mt-3">
            <tbody>
            <tr v-for="(item, index) in apiData.slice().reverse()" :key="item.key"> <!-- key를 index로 사용 -->
                <td style="width:20px;">
                    <input class="form-check-input" type="checkbox" v-model="item.checked" @change="updateChecked(item)" style="font-size:16px">
                </td> <!-- 번호를 1부터 시작하도록 설정 -->
                <td style="width:20px;font-size:12px;">{{ apiData.length - index  }}</td> <!-- 번호를 1부터 시작하도록 설정 -->
                <td style="width:50px;font-size:12px;">{{ item.name }}</td>
                <td style="font-size:12px;">
                    <span v-if="item.affiliation === '기타'">{{ item.otherAffiliation }}</span>
                    <span v-else>{{ item.affiliation }}</span>
                </td>
                <!--<td style="width: 75px; font-size:12px;">{{ item.openClass }}</td>-->
                <td style="width: 60px; font-size:12px;" class="text-center">
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
                <td style="width:50px;">
                    <button @click="deleteApplicant(item.key)" class="btn btn-danger btn-sm" style="font-size:10px">삭제</button>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="paidTable">
            <dl style="margin-right: 20px;">
                <dt>입금자 / 신청자</dt>
                <dd>{{ paidApplicantsCount }}명 / {{ apiData.length }}명</dd>
            </dl>

            <dl style="margin-right: 20px;">
                <dt>입금 총계</dt>
                <dd>{{ (paidApplicantsCount * 8000).toLocaleString() }}원 / 8,000원 x{{ paidApplicantsCount }}명</dd>
            </dl>

            <!--<dl style="margin-right: 20px;">-->
            <!--    <dt>레대비 낼돈</dt>-->
            <!--    <dd>{{ (((paidApplicantsCount - nonAttendeeCount) * 15000) + 100000).toLocaleString() }}원 ({{paidApplicantsCount - nonAttendeeCount}}명)</dd>-->
            <!--</dl>-->
            <dl style="margin-right: 20px;">
                <dt>레대비 낼돈</dt>
                <dd>150,000원 (1레인 50,000원)</dd>
            </dl>

            <!--<dl style="margin-right: 20px; display: flex; align-items: center;">-->
            <!--    <dt>입장 면제</dt>-->
            <!--    <dd>-->
            <!--        <button class="btn btn-outline-secondary" @click="updateExemptCount(exemptCount > 0 ? exemptCount&#45;&#45; : 0)">-</button>-->
            <!--        <input-->
            <!--            type="number"-->
            <!--            class="form-control"-->
            <!--            v-model.number="exemptCount"-->
            <!--            @input="updateExemptCount"-->
            <!--            placeholder="ex) 1"-->
            <!--            style="width: 50px; text-align: center; margin: 0 2px;"-->
            <!--        >-->
            <!--        <button class="btn btn-outline-secondary" @click="updateExemptCount(exemptCount++)">+</button>-->
            <!--    </dd>-->
            <!--</dl>-->

            <!--<dl style="margin-right: 20px; display: flex; align-items: center;">-->
            <!--    <dt>돈내고 안온사람</dt>-->
            <!--    <dd>-->
            <!--        <button class="btn btn-outline-secondary" @click="updateNonAttendeeCount(nonAttendeeCount > 0 ? nonAttendeeCount&#45;&#45; : 0)">-</button>-->
            <!--        <input-->
            <!--            type="number"-->
            <!--            class="form-control"-->
            <!--            v-model.number="nonAttendeeCount"-->
            <!--            @input="updateNonAttendeeCount"-->
            <!--            placeholder="ex) 1"-->
            <!--            style="width: 50px; text-align: center; margin: 0 2px;"-->
            <!--        >-->
            <!--        <button class="btn btn-outline-secondary" @click="updateNonAttendeeCount(nonAttendeeCount++)" style="margin-right:5px;">+</button>-->
            <!--        (환불 : {{ ((nonAttendeeCount * 10000)).toLocaleString() }}원)-->
            <!--    </dd>-->
            <!--</dl>-->
            <!--<dl style="margin-right: 20px;">-->
            <!--    <dt>실제차액</dt>-->
            <!--    &lt;!&ndash;<dd>{{ (((paidApplicantsCount - nonAttendeeCount) * 10000) - (( (paidApplicantsCount - nonAttendeeCount) * 15000) + 100000) - (exemptCount * 25000)).toLocaleString() }} 원</dd>&ndash;&gt;-->
            <!--    <dd>{{ (((paidApplicantsCount - nonAttendeeCount) * 10000) - (( (paidApplicantsCount - nonAttendeeCount) * 15000) + 100000) - (exemptCount * 25000)).toLocaleString() }} 원</dd>-->
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
            apiUrl : "https://bonobono-e6ed4-default-rtdb.asia-southeast1.firebasedatabase.app/bread.json",
            exemptCountApiUrl : "https://bonobono-e6ed4-default-rtdb.asia-southeast1.firebasedatabase.app/bread_exemptCount.json",
            nonAttendeeCountApiUrl : "https://bonobono-e6ed4-default-rtdb.asia-southeast1.firebasedatabase.app/bread_nonAttendeeCount.json",
            apiData:[],
            result   :'',
            applicantCount: 0,
            exemptCount: 0,
            nonAttendeeCount: 0,
            db: null, // 데이터베이스 참조 추가
        };
    },
    mounted(){
        this.db = getDatabase(); // Firebase 데이터베이스 초기화
        this.getData();
        // 데이터 변경 감지를 위해 리스너 추가
        const dataRef = ref(this.db, 'bread'); // cheering 경로에 대한 참조
        onValue(dataRef, (snapshot) => {
            const getData = snapshot.val() || {};
            this.apiData = Object.keys(getData)
                .filter(key => key !== 'bread_exemptCount') // exemptCount를 제외
                .map(key => ({
                    key: key, // Firebase에서의 고유 키
                    ...getData[key] // 나머지 데이터
                }));
        });
    },
    beforeUnmount() {
    },
    computed: {
        paidApplicantsCount() {
            return this.apiData.filter(applicant => applicant.paid).length;
        }
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

                console.log('apiData', apiData);
            })
                 .catch(error => {
                console.error("신청자 목록 가져오기 오류:", error);
            });

            // 면제 인원 수 가져오기
            this.fetchExemptCount();

            // 미참석자 수 가져오기
            this.fetchNonAttendeeCount();
        },

        fetchExemptCount() {
            this.$axios.get(this.exemptCountApiUrl)
            .then(response => {
                const exemptCount = response.data || {};
                console.log('exemptCount', exemptCount);
                this.exemptCount = exemptCount.count || 0; // 면제 인원 수 초기화
            })
                 .catch(error => {
                console.error("면제자 목록 가져오기 오류:", error);
            });
        },

        fetchNonAttendeeCount() {
            this.$axios.get(this.nonAttendeeCountApiUrl)
            .then(response => {
                const nonAttendeeCount = response.data || {};
                console.log('nonAttendeeCount', nonAttendeeCount);
                this.nonAttendeeCount = nonAttendeeCount.count || 0; // 미참석자 수 초기화
            })
                 .catch(error => {
                console.error("미참석자 목록 가져오기 오류:", error);
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
        updateExemptCount() {
            // 여기에 데이터베이스 업데이트 로직 추가
            // 예: Firebase에 업데이트
            this.addExemptCountDatabase(this.exemptCount);
        },
        addExemptCountDatabase(count) {
            // 여기에 Firebase DB 업데이트 코드
            this.$axios.put(this.exemptCountApiUrl,{ count })
            .then(() => {
                console.log('면제 인원 수가 업데이트되었습니다:', count);
            })
                 .catch(error => {
                console.error('업데이트 오류:', error);
            });
        },
        updateNonAttendeeCount() {
            // 여기에 데이터베이스 업데이트 로직 추가
            // 예: Firebase에 업데이트
            this.addNonAttendeeCountDatabase(this.nonAttendeeCount);
        },
        addNonAttendeeCountDatabase(count) {
            // 여기에 Firebase DB 업데이트 코드
            this.$axios.put(this.nonAttendeeCountApiUrl, { count })
            .then(() => {
                console.log('미참석자 수가 업데이트되었습니다:', count);
            })
                 .catch(error => {
                console.error('업데이트 오류:', error);
            });
        },
    }
};
</script>

<style>
/* 스타일 추가 (예: form 스타일링) */
</style>
