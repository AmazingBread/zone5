<template>
    <div>
        <p class="text-center text-bg-light" style="padding:10px;">📢📢📢  보노보노 회원 관리 🏅🏅🏅🏅</p>
        <div class="mt-3 text-right">
            <button class="btn btn-primary btn-sm" @click="downloadExcel">
                📥 회원 엑셀 다운로드
            </button>
        </div>
        <div class="mt-3">
            <p style="font-size: 12px; padding: 0 0 0 10px; text-align: right; margin-top:20px;">회원 {{apiData.length}}명</p>
            <h5 class="mt-3">연회원</h5>
            <div
                v-for="item in apiData.filter(a => a.membershipType === '연회원').slice().reverse()"
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
                        {{ item.paid ? '회비 입완' : '회비 미입금' }}
                    </button>
                </div>

                <!-- 하단 사용자 정보 -->
                <div class="font-weight-bold">
                    가입일  : {{ item.regDt }} / {{ item.membershipType }}
                </div>
                <div class="font-weight-bold mt-1">
                    {{ item.userName }}({{ item.nickName }}) / {{ item.age }} / {{ item.sex }} / {{ item.phone }}
                </div>
            </div>
            <!-- 월회원 -->
            <h5 class="mt-3">월회원</h5>
            <div
                v-for="item in apiData.filter(a => a.membershipType === '월회원').slice().reverse()"
                :key="item.key"
                class="mb-2"
                style="padding:10px; border:1px solid #dee2e6; border-radius: 5px; font-size: 15px"
            >
                <div class="d-flex justify-content-between">
                    <button @click="deleteApplicant(item.key)" class="btn btn-danger btn-sm" style="font-size:10px">
                        삭제
                    </button>
                    <button
                        class="btn"
                        :class="{ 'btn-success': item.paid, 'btn-warning': !item.paid }"
                        style="padding: 0.2rem 0.5rem; font-size:10px"
                        @click="togglePayment(item.key)"
                    >
                        {{ item.paid ? '회비 입완' : '회비 미입금' }}
                    </button>
                </div>
                <div class="font-weight-bold">
                    가입일  : {{ item.regDt }} / {{ item.membershipType }}
                </div>
                <div class="font-weight-bold mt-1">
                    {{ item.userName }}({{ item.nickName }}) / {{ item.age }} / {{ item.sex }} / {{ item.phone }}
                </div>
            </div>
        </div>
        <div class="paidTable d-flex flex-column">
            <!-- 연회원 -->
            <dl style="margin-bottom: 10px;">
                <dt>연회원 입금자 / 신청자</dt>
                <dd>{{ paidYearCount }}명 / {{ yearApplicantsCount }}명</dd>
            </dl>

            <!-- 월회원 -->
            <dl style="margin-bottom: 10px;">
                <dt>월회원 입금자 / 신청자</dt>
                <dd>{{ paidMonthCount }}명 / {{ monthApplicantsCount }}명</dd>
            </dl>

            <!-- 총계 -->
            <dl>
                <dt>입금 총계</dt>
                <dd>{{ totalPaidAmount.toLocaleString() }}원</dd>
            </dl>
        </div>
    </div>
</template>

<script>
import * as XLSX from "xlsx"; // 추가

import { getDatabase, ref, onValue } from "firebase/database"; // Firebase SDK에서 필요한 모듈을 임포트합니다.

export default {
    data(){
        return {
            apiUrl : "https://bonobono-e6ed4-default-rtdb.asia-southeast1.firebasedatabase.app/signUp.json",
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
        },
        yearApplicantsCount() {
            return this.apiData.filter(a => a.membershipType === '연회원').length;
        },
        monthApplicantsCount() {
            return this.apiData.filter(a => a.membershipType === '월회원').length;
        },
        paidYearCount() {
            return this.apiData.filter(a => a.membershipType === '연회원' && a.paid).length;
        },
        paidMonthCount() {
            return this.apiData.filter(a => a.membershipType === '월회원' && a.paid).length;
        },
        totalPaidAmount() {
            // 연회원 40,000원 + 월회원 5,000원
            return (this.paidYearCount * 40000) + (this.paidMonthCount * 5000);
        }
    },
    mounted(){
        this.db = getDatabase(); // Firebase 데이터베이스 초기화
        this.getData();
        // 데이터 변경 감지를 위해 리스너 추가
        const dataRef = ref(this.db, 'signUp'); // cheering 경로에 대한 참조
        onValue(dataRef, (snapshot) => {
            const getData = snapshot.val() || {};
            this.apiData = Object.keys(getData)
                .filter(key => key !== 'signUp_exemptCount') // exemptCount를 제외
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

        getData(){
            this.$axios.get(this.apiUrl).then(response => {
                const apiData = response.data || {};
                this.apiData = Object.keys(apiData)
                    .filter(key => key !== 'signUp_exemptCount') // exemptCount를 제외
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
        deleteApplicant(key) {
            if (!confirm("정말 삭제하시겠습니까?")) {
                return; // 취소 누르면 종료
            }

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
        downloadExcel() {
            if (!this.apiData.length) {
                alert("다운로드할 신청자가 없습니다.");
                return;
            }

            // 엑셀용 데이터 변환
            const excelData = this.apiData.map((item, index) => ({
                번호: index + 1,
                가입일 : item.regDt,
                아이디 : item.userId,
                이름: item.userName,
                닉네임: item.nickName,
                성별: item.sex,
                나이: item.age,
                전화번호: item.phone,
                회원타입: item.membershipType,
                회비: item.paid ? "입금완료" : "미입금"
            }));

            // 워크시트 생성
            const worksheet = XLSX.utils.json_to_sheet(excelData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "회원신청자_명단");

            // 파일 다운로드
            XLSX.writeFile(workbook, "보노보노_회원신청자_명단.xlsx");
        }
    }
};
</script>

<style>
/* 스타일 추가 (예: form 스타일링) */
</style>
