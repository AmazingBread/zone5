<template>
    <div>
        <p
            class="text-center"
            style="font-size: 22px; font-weight: bold;"
        >
            ZONE5/보노보노 마일리지 이벤트
        </p>

        <!-- 상품 안내 -->
        <div class="card mb-4">
            <div
                class="card-header bg-warning text-white font-weight-bold"
                style="color: #000 !important;"
            >
                🏆 상품 안내
            </div>

            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <strong>🥇 1등:</strong>
                    가민 포러너 165
                    <span class="badge badge-pill text-success">
                        250,000원
                    </span>
                </li>
                <li class="list-group-item">
                    <strong>🥈 2등:</strong>
                    상품권
                    <span class="badge badge-pill text-success">
                        100,000원
                    </span>
                </li>
                <li class="list-group-item">
                    <strong>🥉 3등:</strong>
                    상품권
                    <span class="badge badge-pill text-success">
                        80,000원
                    </span>
                </li>
                <li class="list-group-item">
                    <strong>4등:</strong>
                    코브라 아레나 수경
                    <span class="badge badge-pill text-success">
                        70,000원
                    </span>
                </li>
                <li class="list-group-item">
                    <strong>5등:</strong>
                    음파 노패킹 수경
                    <span class="badge badge-pill text-success">
                        30,000원
                    </span>
                </li>
                <li class="list-group-item">
                    <strong>럭키상</strong>
                    1~5등 제외 2명
                    <span class="badge badge-pill text-success">
                        미정
                    </span>
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
                    <li>참가비 2만원</li>
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
                    <li>
                        <strong>맨발 기준</strong>
                        (오리발 <mark>절반 인정</mark>)
                    </li>
                    <li>단톡방에 시계로 거리 인증 (예: 가민, 애플워치 등)</li>
                    <li>
                        피트니스 인증 시 시계가 없으면
                        시작시간과 끝나는 시간 사진 인증
                    </li>
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
                    <li>10포인트 당 응모권 1장</li>
                    <li>운동기록 첫 입력 시 응모권 1장 추가</li>
                    <li>
                        3일 연속 운동기록마다 응모권 1장 추가
                        (3일, 6일, 9일... 끊기면 리셋)
                    </li>
                    <li>럭키데이(7일, 17일, 27일) 운동 시 포인트 2배</li>
                </ul>
            </div>
        </div>

        <!-- 회원 목록 -->
        <h5
            style="
                font-weight: bold;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 30px;
            "
        >
            🔥 MEMBER LIST
            <span style="text-align: right; font-size: 14px;">
                {{ allRecords.length }}명 참가중
            </span>
        </h5>

        <p class="fit-rival-guide">
            🔴 위·아래 회원과 {{ rivalPointGap }}pt 이하 차이가 나면 라이벌 표시
        </p>

        <div>
            <div
                v-for="([userName, user], index) in totalRank"
                :key="userName"
                class="fit-user-box"
                :class="{ 'fit-rival': isRival(index) }"
            >
                <div class="fit-user-header">
                    <span>
                        {{ index + 1 }}. {{ userName }}

                        <span style="color: #e44; font-weight: bold;">
                            {{ getTotalPoints(user) }}pt
                        </span>

                        <span
                            style="
                                color: #f5a623;
                                font-weight: bold;
                                font-size: 12px;
                                margin-left: 4px;
                            "
                        >
                            🎟️ {{ getTickets(user) }}장
                        </span>
                    </span>

                    <button
                        class="fit-certify-button"
                        @click="goToEdit(userName)"
                    >
                        추가/수정
                    </button>
                </div>

                <div style="padding: 6px 4px; font-size: 14px;">
                    <span style="margin-right: 16px;">
                        수영
                        <strong>{{ getSwimPoints(user) }}pt</strong>
                    </span>

                    <span style="margin-right: 16px;">
                        러닝
                        <strong>{{ getRunPoints(user) }}pt</strong>
                    </span>

                    <span style="margin-right: 16px;">
                        피트니스
                        <strong>{{ getGymPoints(user) }}pt</strong>
                    </span>
                </div>
            </div>
        </div>

        <div class="fit-header-row">
            <button
                type="button"
                class="btn btn-outline-primary w-100"
                @click="showRegisterModal = true"
            >
                신규신청
            </button>
        </div>

        <!-- 이름 등록 모달 -->
        <div v-if="showRegisterModal" class="fit-register-backdrop">
            <div class="fit-register-box">
                <h2 class="fit-register-title">💪 인증 신청</h2>

                <input
                    v-model="userName"
                    type="text"
                    class="form-control mb-3"
                    placeholder="이름을 입력하세요"
                    :disabled="isRegistering"
                    @keyup.enter="submitName"
                />

                <div class="d-flex justify-content-end">
                    <button
                        class="btn btn-secondary mr-2"
                        :disabled="isRegistering"
                        @click="closeModal"
                    >
                        닫기
                    </button>

                    <button
                        class="btn btn-primary"
                        :disabled="isRegistering"
                        @click="submitName"
                    >
                        {{ isRegistering ? '신청 중...' : '신청' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getDatabase,
    ref,
    set,
    get,
    onValue,
    remove
} from 'firebase/database';

export default {
    data() {
        return {
            dbPath: 'fit_diary_zone_five_2610',

            showRegisterModal: false,
            isRegistering: false,
            userName: '',

            allRecords: [],
            records: {},
            daysInMonth: [],
            currentMonth: '',

            goals: {
                swim: 0,
                run: 0,
                gym: 0
            },

            luckyDays: [7, 17, 27],
            ticketPointUnit: 10,

            // 라이벌 포인트 차이 기준
            rivalPointGap: 5,

            unsubscribeRecords: null
        };
    },

    computed: {
        hasRankData() {
            return this.allRecords.length > 0;
        },

        // 합산 포인트 내림차순
        totalRank() {
            return [...this.allRecords].sort((a, b) => {
                return (
                    this.getTotalPoints(b[1]) -
                    this.getTotalPoints(a[1])
                );
            });
        },

        swimCount() {
            return this.allRecords.filter(([name, user]) => {
                return this.getSwimDays(user) > 0;
            }).length;
        }
    },

    mounted() {
        this.initMonth();
        this.loadUserData();
    },

    // Vue 2
    beforeDestroy() {
        this.stopListening();
    },

    // Vue 3
    beforeUnmount() {
        this.stopListening();
    },

    methods: {
        // 바로 위·아래 회원과 기준 포인트 이내이면 라이벌
        isRival(index) {
            const rank = this.totalRank;
            const current = rank[index];

            if (!current || !this.hasAnyRecord(current[1])) {
                return false;
            }

            const currentPoints = Math.round(
                this.getTotalPoints(current[1]) * 100
            );

            const maxGap = Math.round(this.rivalPointGap * 100);

            return [index - 1, index + 1].some(neighborIndex => {
                const neighbor = rank[neighborIndex];

                if (!neighbor || !this.hasAnyRecord(neighbor[1])) {
                    return false;
                }

                const neighborPoints = Math.round(
                    this.getTotalPoints(neighbor[1]) * 100
                );

                return Math.abs(currentPoints - neighborPoints) <= maxGap;
            });
        },

        // 럭키데이 여부
        isLuckyDay(day) {
            return this.luckyDays.includes(parseInt(day, 10));
        },

        // 종목별 포인트 합산
        getTypePoints(user, type, divisor) {
            let total = 0;

            Object.entries(user.records || {}).forEach(([day, record]) => {
                let points = Number((record && record[type]) || 0) / divisor;

                if (this.isLuckyDay(day)) {
                    points *= 2;
                }

                total += points;
            });

            return parseFloat(total.toFixed(2));
        },

        getSwimPoints(user) {
            return this.getTypePoints(user, 'swim', 100);
        },

        getRunPoints(user) {
            return this.getTypePoints(user, 'run', 400);
        },

        getGymPoints(user) {
            return this.getTypePoints(user, 'gym', 10);
        },

        getTotalPoints(user) {
            const total =
                      this.getSwimPoints(user) +
                      this.getRunPoints(user) +
                      this.getGymPoints(user);

            return parseFloat(total.toFixed(2));
        },

        // 운동 기록이 있는지 확인
        hasAnyRecord(user) {
            return Object.values(user.records || {}).some(record => {
                return this.hasExercise(record);
            });
        },

        hasExercise(record) {
            if (!record) return false;

            return (
                Number(record.swim || 0) > 0 ||
                Number(record.run || 0) > 0 ||
                Number(record.gym || 0) > 0
            );
        },

        // 달력상 3일 연속 운동마다 응모권 1장
        getStreakTickets(user) {
            const records = user.records || {};
            const days = Object.keys(records)
                                .map(day => parseInt(day, 10))
                                .filter(day => Number.isInteger(day) && day >= 1 && day <= 31)
                                .sort((a, b) => a - b);

            let streak = 0;
            let tickets = 0;
            let previousDay = null;

            days.forEach(day => {
                // 중간 날짜 기록이 없으면 연속 기록 초기화
                if (previousDay !== null && day !== previousDay + 1) {
                    streak = 0;
                }

                const record = records[day];

                if (this.hasExercise(record)) {
                    streak += 1;

                    if (streak % 3 === 0) {
                        tickets += 1;
                    }
                } else {
                    streak = 0;
                }

                previousDay = day;
            });

            return tickets;
        },

        getTickets(user) {
            let tickets = Math.floor(
                this.getTotalPoints(user) / this.ticketPointUnit
            );

            if (this.hasAnyRecord(user)) {
                tickets += 1;
            }

            tickets += this.getStreakTickets(user);

            return tickets;
        },

        getM(user, type) {
            const sum = Object.values(user.records || {}).reduce(
                (total, record) => {
                    return total + Number((record && record[type]) || 0);
                },
                0
            );

            return parseFloat(sum.toFixed(3));
        },

        getKm(user, type) {
            return this.getM(user, type) / 1000;
        },

        initMonth() {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const days = new Date(year, month, 0).getDate();

            this.currentMonth = month;
            this.daysInMonth = Array.from(
                { length: days },
                (_, index) => index + 1
            );

            const records = {};

            for (let day = 1; day <= days; day++) {
                records[day] = {
                    swim: '',
                    run: '',
                    gym: ''
                };
            }

            this.records = records;
        },

        loadUserData() {
            // 중복 구독 방지
            this.stopListening();

            const db = getDatabase();
            const dataRef = ref(db, this.dbPath);

            this.unsubscribeRecords = onValue(
                dataRef,
                snapshot => {
                    const data = snapshot.val();

                    if (!data) {
                        this.allRecords = [];
                        return;
                    }

                    this.allRecords = Object.entries(data).sort((a, b) => {
                        return (
                            Number(a[1].createdAt || 0) -
                            Number(b[1].createdAt || 0)
                        );
                    });
                },
                error => {
                    console.error('목록 조회 오류:', error);
                    alert('회원 목록을 불러오지 못했습니다.');
                }
            );
        },

        stopListening() {
            if (this.unsubscribeRecords) {
                this.unsubscribeRecords();
                this.unsubscribeRecords = null;
            }
        },

        submitName() {
            if (this.isRegistering) return;

            const trimmedName = this.userName.trim();

            if (!trimmedName) {
                alert('이름을 입력해주세요!');
                return;
            }

            // Firebase 경로에 사용할 수 없는 문자
            if (/[.#$\[\]\/\u0000-\u001F\u007F]/.test(trimmedName)) {
                alert('이름에 . # $ [ ] / 또는 제어문자를 사용할 수 없습니다.');
                return;
            }

            const db = getDatabase();
            const userRef = ref(
                db,
                this.dbPath + '/' + trimmedName
            );

            this.isRegistering = true;

            get(userRef)
            .then(snapshot => {
                if (snapshot.exists()) {
                    alert('이미 등록된 이름입니다! 다른 이름을 입력해주세요!');
                    return;
                }

                const records = {};

                this.daysInMonth.forEach(day => {
                    records[String(day)] = {
                        swim: 0,
                        run: 0,
                        gym: 0
                    };
                });

                const emptyData = {
                    createdAt:Date.now(),
                    goals    :{
                        swim:0,
                        run :0,
                        gym :0
                    },
                    records  :records
                };

                return set(userRef, emptyData).then(() => {
                    this.showRegisterModal = false;
                    this.userName = '';

                    // 목록은 onValue에서 자동 갱신
                    alert(`${trimmedName}님 등록 완료됐습니다!`);
                });
            }).catch(error => {
                console.error('등록 오류:', error);
                alert('등록 중 오류가 발생했습니다!');
            }).finally(() => {
                this.isRegistering = false;
            });
        },

        getSwimDays(user){
            return Object.values(user.records || {}).filter(record => {
                return record && Number(record.swim || 0) > 0;
            }).length;
        },

        getGoal(user, type){
            if(!user.goals || !user.goals[type]){
                return '목표없음';
            }

            if(type === 'gym'){
                return user.goals[type] + '회';
            }

            return user.goals[type] + 'k';
        },

        getCount(user, type){
            if(type === 'gym'){
                return Object.values(user.records || {}).reduce(
                    (sum, record) => {
                        return sum + Number((record && record.gym) || 0);
                    },
                    0
                );
            }

            return Object.values(user.records || {}).filter(record => {
                return record && Number(record[type] || 0) > 0;
            }).length;
        },

        getPercent(user, type){
            if(!user.goals || !Number(user.goals[type])){
                return 0;
            }

            const value = type === 'gym'
                ? this.getCount(user, type)
                : this.getKm(user, type);

            return Math.min(
                100,
                Math.round((value / Number(user.goals[type])) * 100)
            );
        },

        goToEdit(userName){
            this.$router.push({
                name  :'FitDiaryZoneFiveEdit',
                params:{userName}
            });
        },

        closeModal(){
            this.showRegisterModal = false;
            this.userName = '';
        },

        deleteAllUsers(){
            if(!confirm('모든 유저 데이터를 정말 삭제하시겠습니까?!')){
                return;
            }

            const db = getDatabase();
            const rootRef = ref(db, this.dbPath);

            remove(rootRef).then(() => {
                this.allRecords = [];
                alert('모든 유저 데이터가 삭제되었습니다!');
            }).catch(error => {
                console.error('전체 삭제 실패:', error);
                alert('전체 삭제 중 오류가 발생했습니다!');
            });
        }
    }
};
</script>

<style scoped>
.fit-user-box {
    box-sizing: border-box;
    margin-bottom: 12px;
    padding: 12px;
    border: 3px solid #e5e7eb;
    border-radius: 10px;
    background: #fff;
}

.fit-user-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
}

.fit-certify-button {
    flex-shrink: 0;
    padding: 5px 10px;
    border: 1px solid #007bff;
    border-radius: 5px;
    background: #fff;
    color: #007bff;
    font-size: 13px;
    cursor: pointer;
}

/* 라이벌 회원: 굵은 빨간 테두리 */
.fit-user-box.fit-rival {
    border: 3px solid #e53935 !important;
    box-shadow: 0 0 8px rgba(229, 57, 53, 0.2);
}

.fit-rival-guide {
    margin-bottom: 12px;
    color: #666;
    font-size: 12px;
}

.fit-header-row {
    margin-top: 16px;
}

.fit-register-title {
    padding-bottom: 12px;
    color: #333;
    font-size: 20px;
    font-weight: bold;
}

.fit-register-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.fit-register-box {
    box-sizing: border-box;
    width: 300px;
    max-width: calc(100vw - 32px);
    padding: 24px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>