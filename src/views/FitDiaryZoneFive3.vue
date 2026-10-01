<template>
    <div>
        <!--<div class="fit-header-row mt-3">-->
        <!--    <button class="btn btn-danger w-100" @click="deleteAllUsers">🔥 전체 삭제</button>-->
        <!--</div>-->
        <!--<p class="text-center" style="font-size: 22px; font-weight: bold">{{currentMonth}}월 ZONE5, 보노보노 마일리지 이벤트</p>-->
        <p class="text-center" style="font-size: 22px; font-weight: bold">ZONE5/보노보노 마일리지 이벤트</p>

        <!-- 상품 안내 -->
        <div class="card mb-4">
            <div class="card-header bg-warning text-white font-weight-bold" style="color: #000 !important;">
                🏆 상품 안내
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <strong>🥇 1등:</strong> STM 트라이엄프 델타2 <span class="badge badge-pill text-success">299,000원</span>
                </li>
                <li class="list-group-item">
                    <strong>🥈 2등:</strong> SD몰 수영용품 <span class="badge badge-pill text-success">120,000원</span>
                </li>
                <li class="list-group-item">
                    <strong>🥉 3등:</strong> 카카오페이 상품권 <span class="badge badge-pill text-success">50,000원</span>
                </li>
                <li class="list-group-item">
                    <strong>4등:</strong> zone5 수경 <span class="badge badge-pill text-success"> 20,000원</span>
                </li>
                <li class="list-group-item">
                    <strong>5등:</strong> zone5 습식타올 <span class="badge badge-pill text-success"> 11,000원</span>
                </li>
            </ul>
        </div>

        <!-- 참여 조건 -->
        <div class="card mb-4">
            <div class="card-header bg-primary text-white font-weight-bold">
                ✅ 참여 조건
            </div>
            <div class="card-body">
                <ul class="mb-0">
                    <li>수영 100m = 1포인트</li>
                    <li>러닝 400m = 1포인트</li>
                    <li>피트니스 10분 = 1포인트</li>
                    <li>ZONE5, 보노보노 회원 대상</li>
                    <li>참가비 1만원</li>
                </ul>
            </div>
        </div>

        <!-- 인증 조건 -->
        <div class="card">
            <div class="card-header bg-secondary text-white font-weight-bold">
                🕵️ 인증 조건
            </div>
            <div class="card-body">
                <ul class="mb-0">
                    <li><strong>맨발 기준</strong> (오리발 <mark>절반 인정</mark>)</li>
                    <li>단톡방에 시계로 거리 인증 (예: 가민, 애플워치 등)</li>
                </ul>
            </div>
        </div>

        <!-- 응모권 안내 -->
        <div class="card mt-4">
            <div class="card-header bg-info text-white font-weight-bold">
                🎟️ 응모권 안내
            </div>
            <div class="card-body">
                <ul class="mb-0">
                    <li>5포인트 당 응모권 1장</li>
                    <li>운동기록 첫 입력 시 응모권 1장 추가</li>
                    <li>3일 연속 운동기록마다 응모권 1장 추가 (3일, 6일, 9일... 끊기면 리셋)</li>
                    <li>럭키데이(7일, 17일, 27일) 운동 시 포인트 2배</li>
                </ul>
            </div>
        </div>
        <!--<div class="col-12 p-1">-->
        <!--    <div-->
        <!--        class="boxstyle6"-->
        <!--        style="font-size: 20px; "-->
        <!--    >-->
        <!--        <a href="https://open.kakao.com/o/ggOCmOyi" target="_blank" style="text-decoration: none; color: inherit;">-->
        <!--            마일리지 이벤트 단톡방 입장-->
        <!--        </a>-->
        <!--    </div>-->
        <!--</div>-->

        <h5 style="font-weight: bold;  display: flex; justify-content: space-between; align-items: center; padding-top:30px;">
            🔥 MEMBER LIST
            <span style="text-align: right; font-size: 14px;">{{allRecords.length}}명 참가중</span>
        </h5>
        <div>
            <div class="fit-user-box" v-for="([userName, user], index) in totalRank" :key="userName">
                <div class="fit-user-header">
                    <span>
                        {{ index + 1 }}. {{ userName }}
                        <span style="color: #e44; font-weight: bold;">
                         {{ getTotalPoints(user) }}pt
                        </span>
                        <span style="color: #f5a623; font-weight: bold; font-size: 12px; margin-left: 4px;">
                         🎟️ {{ getTickets(user) }}장
                        </span>
                    </span>
                    <button class="fit-certify-button" @click="goToEdit(userName)">추가/수정</button>
                </div>
                <div style="padding: 6px 4px; font-size: 14px;">
                    <span style="margin-right: 16px;">
                        🏊 수영 <strong>{{ getSwimPoints(user) }}pt</strong>
                    </span>
                    <span style="margin-right: 16px;">
                        🏃 러닝 <strong>{{ getRunPoints(user) }}pt</strong>
                    </span>
                    <span style="margin-right: 16px;">
                        🏋️ 피트니스 <strong>{{ getGymPoints(user) }}pt</strong>
                    </span>
                </div>
            </div>
        </div>
        <div class="fit-header-row">
            <div class="btn btn-outline-primary w-100" @click="showRegisterModal = true">신규신청</div>
        </div>
        <!-- 이름 등록 모달 -->
        <div v-if="showRegisterModal" class="modal-backdrop">
            <div class="modal-box">
                <h2 class="modal-title">💪 인증 신청</h2>
                <input
                    type="text"
                    class="form-control mb-3"
                    placeholder="이름을 입력하세요"
                    v-model="userName"
                />
                <div class="d-flex justify-content-end gap-2">
                    <button class="btn btn-secondary" @click="closeModal">닫기</button>
                    <button class="btn btn-primary" @click="submitName">신청</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getDatabase, ref, set, get, child, onValue, remove} from "firebase/database";

export default {
    data(){
        return {
            dbPath : 'fit_diary_zone_five',
            showRegisterModal: false,  // 최초 인증 신청용
            selectedUser: '',          // 수정할 사용자 이름
            userName: '',
            allRecords: [],  // ← 전체 사용자 데이터 저장
            records: {},
            daysInMonth: [], // ← 일자 리스트
            currentMonth: '', // ← 월 정보
            goals: { swim: 0, run: 0, gym: 0 },
            luckyDays: [7, 17, 27], // 럭키 데이 (포인트 2배)
            ticketPointUnit: 5,     // 응모권 1장당 필요 포인트
        };
    },
    computed: {
        hasRankData() {
            return this.allRecords && this.allRecords.length > 0;
        },
        // 포인트 합산 기준 전체 랭킹
        totalRank() {
            return [...this.allRecords].sort((a, b) => {
                return this.getTotalPoints(b[1]) - this.getTotalPoints(a[1]);
            });
        },
        swimCount() {
            return this.allRecords.filter(r => r[1] && r[1].swim).length;
        },
    },
    mounted(){
        this.initMonth();
        this.loadUserData()
    },
    beforeUnmount() {
        // clearInterval(this.interval); // 컴포넌트가 파괴될 때 인터벌 해제
    },
    methods:{
        // 럭키 데이 여부 (7, 17, 27일 운동 시 포인트 2배)
        isLuckyDay(day) {
            return this.luckyDays.includes(parseInt(day));
        },
        // 특정 종목(type)의 포인트 합산 (럭키데이 2배 적용)
        getTypePoints(user, type, divisor) {
            let total = 0;
            Object.entries(user.records || {}).forEach(([day, r]) => {
                let pt = Number((r && r[type]) || 0) / divisor;
                if (this.isLuckyDay(day)) pt *= 2;
                total += pt;
            });
            return parseFloat(total.toFixed(2));
        },
        // 수영 포인트: 100m당 1pt
        getSwimPoints(user) {
            return this.getTypePoints(user, 'swim', 100);
        },
        // 러닝 포인트: 400m당 1pt
        getRunPoints(user) {
            return this.getTypePoints(user, 'run', 400);
        },
        // 피트니스 포인트: 10분당 1pt
        getGymPoints(user) {
            return this.getTypePoints(user, 'gym', 10);
        },
        // 합산 포인트
        getTotalPoints(user) {
            return parseFloat((this.getSwimPoints(user) + this.getRunPoints(user) + this.getGymPoints(user)).toFixed(2));
        },
        // 유저가 운동 기록을 하나라도 남겼는지
        hasAnyRecord(user) {
            return Object.values(user.records || {}).some(r => {
                return Number((r && r.swim) || 0) > 0 || Number((r && r.run) || 0) > 0 || Number((r && r.gym) || 0) > 0;
            });
        },
        // 연속 운동일수 3일마다 응모권 1장 (달력상 연속일 기준, 3일/6일/9일... 마다 매번 지급, 끊기면 리셋)
        getStreakTickets(user) {
            const recordsObj = user.records || {};
            const days = Object.keys(recordsObj).map(d => parseInt(d)).sort((a, b) => a - b);
            let streak = 0;
            let tickets = 0;
            days.forEach(day => {
                const r = recordsObj[day] ?? recordsObj[String(day)];
                const hasRecord = r && (Number(r.swim || 0) > 0 || Number(r.run || 0) > 0 || Number(r.gym || 0) > 0);
                if (hasRecord) {
                    streak += 1;
                    if (streak % 3 === 0) tickets += 1; // 3일 연속마다 매번 지급
                } else {
                    streak = 0;
                }
            });
            return tickets;
        },
        // 응모권 개수: 5pt당 1장 + 첫 기록 1장 + 3일 연속 기록마다 1장씩
        getTickets(user) {
            let tickets = Math.floor(this.getTotalPoints(user) / this.ticketPointUnit);
            if (this.hasAnyRecord(user)) tickets += 1;
            tickets += this.getStreakTickets(user);
            return tickets;
        },
        // 기존 getKm 유지 (swim/run 둘 다 사용)
        getM(user, type) {
            const sum = Object.values(user.records || {}).reduce((total, r) => {
                return total + Number(r[type] || 0);
            }, 0);
            return parseFloat(sum.toFixed(3));
        },
        initMonth() {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1; // 0부터 시작하므로 +1
            const days = new Date(year, month, 0).getDate();

            this.currentMonth = month;
            this.daysInMonth = Array.from({ length: days }, (_, i) => i + 1);

            this.records = {};  // 초기화 필수
            for (let i = 1; i <= days; i++) {
                this.records[i] = {
                    swim: '',
                    run: '',
                    gym: ''
                };
            }
        },
        loadUserData() {
            this.db = getDatabase();
            const dataRef = ref(this.db, this.dbPath);
            onValue(dataRef, (snapshot) => {
                const data = snapshot.val();
                if (!data) {
                    this.allRecords = [];
                    return; // data 없으면 바로 종료
                }
                console.log(Object.entries(data).map(([k, v]) => [k, v.createdAt]));
                this.allRecords = Object.entries(data).sort((a, b) => a[1].createdAt - b[1].createdAt);
            });
        },
        submitName() {
            const trimmedName = this.userName.trim();

            if (!trimmedName) {
                alert("이름을 입력해주세요!");
                return;
            }

            const db = getDatabase();
            const userRef = ref(db, this.dbPath + '/' + this.userName);
            const rootRef = ref(db);

            // 이름 중복 체크
            get(child(rootRef, this.dbPath + '/' + this.userName))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    alert(`이미 등록된 이름입니다! 다른 이름을 입력해주세요 행님!`);
                } else {
                    // 이름 없으면 → DB에 빈 기록 생성
                    const today = new Date();
                    const year = today.getFullYear();
                    const days = new Date(year, today.getMonth() + 1, 0).getDate();

                    // 날짜별 초기 기록 세팅
                    const records = {};
                    for (let i = 1; i <= days; i++) {
                        records[String(i)] = { swim: 0, run: 0, gym: 0 };
                    }

                    // 초기 목표도 0으로 세팅
                    const emptyData = {
                        createdAt: Date.now(),
                        goals: { swim: 0, run: 0, gym: 0 },
                        records: records
                    };

                    set(userRef, emptyData)
                    .then(() => {
                        this.showRegisterModal = false;
                        this.initMonth();
                        this.loadUserData();
                        alert(`${this.userName}님 등록 완료됐습니다 행님!`);
                    })
                     .catch((error) => {
                        console.error("저장 에러:", error);
                        alert("데이터 저장 중 오류가 발생했습니다!");
                    });
                }
            })
             .catch((error) => {
                console.error("중복 확인 에러:", error);
                alert("중복 확인 중 오류가 발생했어요!");
            });
        },
        getSwimDays(user) {
            // 수영 기록이 있는 날짜 수 (0 이상인 날짜만 카운트)
            return Object.values(user.records || {}).filter(r => r.swim > 0).length;
        },
        getGoal(user, type) {
            if (!user.goals || !user.goals[type]) return '목표없음';
            if (type === 'gym') {
                return user.goals[type] + '회';
            }
            return user.goals[type] + 'k';
        },
        getCount(user, type) {
            if (type === 'gym') {
                // 헬스는 records 각 날짜 gym 합계
                return Object.values(user.records || {}).reduce((sum, r) => sum + Number(r.gym || 0), 0);
            }
            return Object.values(user.records || {}).filter(r => r[type] > 0).length;
        },
        // 기록 중 총 거리(km) - 수영/러닝만 해당, 헬스는 0으로 처리
        // 목표 대비 퍼센트 (100% 초과 안 되게)
        getPercent(user, type) {
            if (!user.goals || user.goals[type] === 0) return 0;
            if (type === 'gym') {
                return Math.min(100, Math.round((this.getCount(user, type) / user.goals[type]) * 100));
            }
            return Math.min(100, Math.round((this.getKm(user, type) / user.goals[type]) * 100));
        },
        goToEdit(userName) {
            this.$router.push({ name: 'FitDiaryZoneFiveEdit', params: { userName } });
        },
        closeModal() {
            this.showRegisterModal = false
            this.showEditModal = false
            this.userName = '';
        },
        deleteAllUsers() {
            if (!confirm(`모든 유저 데이터를 정말 삭제하시겠습니까? 행님!`)) return;

            const db = getDatabase();
            const rootRef = ref(db, this.dbPath);

            remove(rootRef)
            .then(() => {
                alert("모든 유저 데이터가 삭제되었습니다 행님!");
                // 삭제 후 목록 갱신
                this.allRecords = [];
            })
             .catch(err => {
                console.error("전체 삭제 실패:", err);
                alert("전체 삭제 중 오류가 발생했습니다 행님!");
            });
        }
    }
};
</script>

<style>
.modal-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    padding-bottom: 12px;
}
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal-box {
    background: white;
    padding: 24px;
    border-radius: 8px;
    width: 300px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>