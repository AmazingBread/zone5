<template>
    <div>
        <p class="text-center text-bg-light" style="padding:10px;">📢📢📢  ZONE5 회원 관리 🏅🏅🏅🏅</p>
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
                    {{ item.userName }} / {{ item.age }} / {{ item.sex }} / {{ item.phone }}
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
                    {{ item.userName }} / {{ item.age }} / {{ item.sex }} / {{ item.phone }}
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
import * as XLSX from 'xlsx-js-style';

import { getDatabase, ref, onValue, remove, update } from "firebase/database"; // Firebase SDK에서 필요한 모듈을 임포트합니다.

export default {
    data(){
        return {
            dbPath : 'signUp',
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
            // 연회원 50,000원 + 월회원 5,000원
            return (this.paidYearCount * 50000) + (this.paidMonthCount * 5000);
        }
    },
    mounted(){
        this.db = getDatabase(); // Firebase 데이터베이스 초기화
        // 데이터 변경 감지를 위해 리스너 추가
        this.dataRef = ref(this.db, this.dbPath);
        onValue(this.dataRef, (snapshot) => {
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

            // Firebase SDK를 이용한 직접 삭제
            const db = getDatabase();
            const itemRef = ref(db, `${this.dbPath}/${key}`);

            remove(itemRef)
            .then(() => {
                // 성공 시 별도의 조치 불필요 (onValue가 감지해서 화면 갱신)
                console.log("삭제 성공");
            })
             .catch((error) => {
                alert("삭제 중 오류가 발생했습니다.");
                console.error("삭제 오류:", error);
            });
        },
        togglePayment(key) {
            const applicant = this.apiData.find(item => item.key === key);
            if (!applicant) return;

            const db = getDatabase();
            // set 대신 update를 사용하면 해당 필드만 쏙 바꿀 수 있습니다.
            const itemRef = ref(db, `${this.dbPath}/${key}`);

            update(itemRef, {
                paid: !applicant.paid
            }).catch(error => {
                console.error('업데이트 실패:', error);
            });
        },
        downloadExcel() {
            if (!this.apiData.length) {
                alert("다운로드할 신청자가 없습니다.");
                return;
            }

            // 1. 데이터 생성 (기존 방식)
            const excelData = this.apiData.map((item, index) => ({
                번호: index + 1,
                가입일 : item.regDt,
                아이디 : item.userId,
                이름: item.userName,
                성별: item.sex,
                나이: item.age,
                전화번호: item.phone,
                회원타입: item.membershipType,
                회비: item.paid ? "입금완료" : "미입금"
            }));

            // 2. 워크시트 생성
            const worksheet = XLSX.utils.json_to_sheet(excelData);

            this.apiData.forEach((item, index) => {
                const rowIndex = index + 2; // 헤더가 1행이므로 데이터는 2행부터 시작

                // --- 조건 1: 미입금인 경우 (회비 열 - I열) ---
                if (!item.paid) {
                    const paidCellRef = `I${rowIndex}`; // I열
                    if (worksheet[paidCellRef]) {
                        worksheet[paidCellRef].s = {
                            fill: { fgColor: { rgb: "FFFF00" } }, // 노란색
                            font: { bold: true, color: { rgb: "FF0000" } },
                            alignment: { horizontal: "center" }
                        };
                    }
                }

                // --- 조건 2: 월회원인 경우 (회원타입 열 - H열) ---
                if (item.membershipType === '월회원') {
                    const typeCellRef = `H${rowIndex}`; // H열
                    if (worksheet[typeCellRef]) {
                        worksheet[typeCellRef].s = {
                            fill: { fgColor: { rgb: "CCFFCC" } }, // 연두색 (Light Green)
                            font: { bold: true },
                            alignment: { horizontal: "center" }
                        };
                    }
                }
            });

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "회원신청자_명단");

            // 4. 파일 다운로드
            XLSX.writeFile(workbook, "ZONE5_회원신청자_명단.xlsx");
        }
    }
};
</script>

<style>
/* 스타일 추가 (예: form 스타일링) */
</style>
