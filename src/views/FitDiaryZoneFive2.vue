<template>
    <div>
        <!--<div class="fit-header-row mt-3">-->
        <!--    <button class="btn btn-danger w-100" @click="deleteAllUsers">🔥 전체 삭제</button>-->
        <!--</div>-->
        <p class="text-center" style="font-size: 22px; font-weight: bold">{{currentMonth}}월 ZONE5 운동인증 이벤트</p>
        <!-- 종목별 TOP3 순위 -->
        <div style="margin: 24px 0" v-if="hasRankData">
            <h5 style="font-weight: bold">🔥 TOP 5</h5>
            <table class="table table-sm table-bordered text-center">
                <thead>
                <!--<tr>-->
                <!--    <th>순위</th>-->
                <!--    <th>수영</th>-->
                <!--    <th>러닝</th>-->
                <!--    <th>헬스</th>-->
                <!--</tr>-->
                </thead>
                <tbody>
                <tr v-for="rank in 5" :key="'rank-' + rank">
                    <td style="vertical-align: middle;">
                        <strong>
                            <span v-if="rank === 1">🥇</span>
                            <span v-else-if="rank === 2">🥈</span>
                            <span v-else-if="rank === 3">🥉</span>
                            <span v-else>{{ rank }} 위</span>
                        </strong>
                    </td>
                    <td
                    >
                        <div v-if="swimRank[rank - 1]">
                            <div style="display:inline-block; font-weight: bold; border-bottom: 1px solid #aaa;" @click="goToEdit(swimRank[rank - 1][0])">
                                {{ swimRank[rank - 1][0] }}
                            </div>
                            <div>({{ getKm(swimRank[rank - 1][1], 'swim') }}k / {{getSwimDays(swimRank[rank - 1][1]) + 'day'}})</div>
                        </div>
                        <div v-else>-</div>
                    </td>
                    <!--<td>{{ runRank[rank - 1] ? runRank[rank - 1][0] + ' ' + getKm(runRank[rank - 1][1], 'run') + 'k' : '-' }}</td>-->
                    <!--<td>{{ gymRank[rank - 1] ? gymRank[rank - 1][0] + ' ' + getCount(gymRank[rank - 1][1], 'gym') + '회' : '-' }}</td>-->
                </tr>
                </tbody>
            </table>
        </div>

        <!-- 상품 안내 -->
        <div class="card mb-4">
            <div class="card-header bg-warning text-white font-weight-bold" style="color: #000 !important;">
                🏆 상품 안내
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <strong>🥇 1등:</strong> 에스디몰 <span class="badge badge-pill text-success">10만원치</span>
                </li>
                <li class="list-group-item">
                    <strong>🥈 2등:</strong> 아레나 울트라스와이프 <span class="badge badge-pill text-success">골드</span>
                </li>
                <li class="list-group-item">
                    <strong>🥉 3등:</strong> 스타벅스 <span class="badge badge-pill text-success">3만원 쿠폰</span>
                </li>
                <li class="list-group-item">
                    <strong>4등 & 5등:</strong> 나이키 방수팩 <span class="badge badge-pill text-success">5리터</span>
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
                    <li>8월 1번 이상 참석자</li>
                    <li>또는 6월, 7월 정기모임 참석자</li>
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
                    <li>1일 최대 <strong>5키로</strong>까지 인정</li>
                    <li>단톡방에 시계로 거리 인증 (예: 가민, 애플워치 등)</li>
                </ul>
            </div>
        </div>

        <h5 style="font-weight: bold;  display: flex; justify-content: space-between; align-items: center; padding-top:30px;">
            🔥 MEMBER LIST
            <span style="text-align: right; font-size: 14px;">{{allRecords.length}}명 참가중</span>
        </h5>
        <div>
            <div class="fit-user-box" v-for="([userName, user], index) in allRecords" :key="userName">
                <div class="fit-user-header">
                    <span>{{ index + 1 }}. {{ userName  }}</span>
                    <button class="fit-certify-button" @click="goToEdit(userName)">추가/수정</button>
                </div>
                <div class="fit-progress-bar">
                    <div class="fit-progress-fill fit-swim" :style="{ width: getPercent(user, 'swim') + '%' }">
                        수영 {{ getPercent(user, 'swim') }}% ({{ getCount(user, 'swim') }}day {{  getKm(user, 'swim') }}k)
                    </div>
                    <div class="progress-label" :style="{ color: getGoal(user, 'swim') === '목표없음' ? 'red' : 'inherit' }">
                        {{ getGoal(user, 'swim') }}
                    </div>
                </div>
                <!--<div class="fit-progress-bar">-->
                <!--    <div class="fit-progress-fill fit-run" :style="{ width: getPercent(user, 'run') + '%' }">-->
                <!--        러닝 {{ getPercent(user, 'run') }}% ({{ getCount(user, 'run') }}day {{  getKm(user, 'run') }}k)-->
                <!--    </div>-->
                <!--</div>-->
                <!--<div class="fit-progress-bar">-->
                <!--    <div class="fit-progress-fill fit-gym" :style="{ width: getPercent(user, 'gym') + '%' }">-->
                <!--        헬스 {{ getPercent(user, 'gym') }}% ({{ getCount(user, 'gym') }}회)-->
                <!--    </div>-->
                <!--</div>-->
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
        };
    },
    computed: {
        hasRankData() {
            return (
                (this.swimRank && this.swimRank.length > 0) ||
                (this.runRank && this.runRank.length > 0) ||
                (this.gymRank && this.gymRank.length > 0)
            );
        },
        swimRank() {
            return [...this.allRecords].sort((a, b) => {
                return this.getKm(b[1], 'swim') - this.getKm(a[1], 'swim');
            });
        },
        swimCount() {
            return this.allRecords.filter(r => r[1] && r[1].swim).length;
        },
        runRank() {
            return [...this.allRecords].sort((a, b) => {
                return this.getKm(b[1], 'run') - this.getKm(a[1], 'run');
            });
        },
        gymRank() {
            return [...this.allRecords].sort((a, b) => {
                return this.getCount(b[1], 'gym') - this.getCount(a[1], 'gym');
            });
        }
    },
    mounted(){
        this.initMonth();
        this.loadUserData()
    },
    beforeUnmount() {
        // clearInterval(this.interval); // 컴포넌트가 파괴될 때 인터벌 해제
    },
    methods:{
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
                    const month = String(today.getMonth() + 1).padStart(2, '0');
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
        getKm(user, type) {
            const sum = Object.values(user.records || {}).reduce((total, r) => {
                return total + Number(r[type] || 0);
            }, 0);

            // 소수점 오차 제거 + 불필요한 0 제거
            return parseFloat(sum.toFixed(3));
        },
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
