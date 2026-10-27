<template>
<main class="zone-admin">
<header class="admin-hero"><router-link to="/" class="admin-back">‹ 홈으로</router-link><span class="admin-eyebrow">ZONE5 ADMIN</span><div class="admin-title"><h1>훈련 관리</h1><router-link to="/zone5">신청 화면 ↗</router-link></div><p>훈련 날짜와 강사 이름, 달력 일정을 관리하세요.</p></header>
<nav class="admin-tabs" aria-label="관리 메뉴"><button type="button" :class="{ active: activeTab === 'training' }" :aria-pressed="activeTab === 'training'" @click="activeTab = 'training'">훈련일자 관리</button><button type="button" :class="{ active: activeTab === 'calendar' }" :aria-pressed="activeTab === 'calendar'" @click="activeTab = 'calendar'">달력 관리</button></nav>
<div v-show="activeTab === 'training'">

<section class="admin-panel"><div class="panel-heading"><h2>특강반 정원</h2><span>날짜별 공통 적용</span></div><div class="limit-setting"><label for="growth-limit">최대 신청 인원</label><div><input id="growth-limit" type="number" min="1" step="1" :value="growthLimit" @change="updateLimit($event)"><span>명</span></div></div><p class="admin-hint">수정 후 입력칸을 벗어나면 저장됩니다.</p><p v-if="limitMessage" class="save-message" role="status">{{ limitMessage }}</p></section>
<section class="admin-panel schedule-settings"><div class="panel-heading"><h2>날짜 및 이름 입력</h2><span>{{ apiData.length }}개 일정</span></div><p class="admin-hint">날짜·장소·강사를 입력하세요. 수정 후 입력칸을 벗어나면 저장됩니다.</p><div v-for="(dateObj,index) in apiData" :key="index" class="schedule-field"><label :for="'admin-date-'+index">일정 {{ index+1 }}</label><input :id="'admin-date-'+index" type="text" v-model="dateObj.date" @change="updateDate(index)"></div></section>
<details class="admin-panel reset-panel"><summary>전체 초기화</summary><p>모든 훈련 일정과 신청자 정보를 초기화합니다.</p><button type="button" @click="deleteAllUsers">전체 초기화</button></details>
</div>
<section v-show="activeTab === 'calendar'" class="calendar-admin">
<div class="admin-panel"><div class="panel-heading"><h2>달력 일정 작성</h2><router-link to="/">홈페이지 보기 ↗</router-link></div><p class="admin-hint">홈페이지의 달력과 일정 목록에 표시됩니다. 훈련 신청 날짜는 ‘훈련일자 관리’에서 별도로 수정하세요.</p><p class="admin-hint">평일 일정은 일정 목록에 표시되며, 주말 달력에는 토·일 일정만 표시됩니다.</p>
<form @submit.prevent="saveCalendarDate"><div class="schedule-field"><label for="calendar-date">날짜</label><input id="calendar-date" type="date" v-model="calendarDate" :readonly="!!editingDate" :disabled="calendarBusy" required></div><div class="schedule-field"><label for="calendar-titles">일정 내용</label><textarea id="calendar-titles" v-model="calendarTitles" rows="3" :disabled="calendarBusy" placeholder="예: 사직대회 우승목표&#10;같은 날 일정은 줄을 나눠 입력하세요" required></textarea></div><div class="calendar-form-actions"><button type="submit" class="admin-primary" :disabled="calendarBusy || !calendarReady">{{ calendarBusy ? '저장 중…' : editingDate ? '수정 저장' : '일정 저장' }}</button><button type="button" class="admin-secondary" @click="clearCalendarForm" :disabled="calendarBusy">{{ editingDate ? '수정 취소' : '입력 지우기' }}</button></div><p v-if="editingDate" class="admin-hint">날짜를 바꾸려면 기존 일정을 삭제한 뒤 새 날짜로 등록하세요.</p></form><p class="save-message" role="status">{{ calendarMessage }}</p></div>
<div class="panel-heading"><h2>등록된 달력 일정</h2><span>{{ calendarRows.length }}개 날짜</span></div><article v-for="row in calendarRows" :key="row.key" class="admin-panel calendar-row"><div><strong>{{ row.label }}</strong><p v-for="(title,index) in row.titles" :key="index">{{ title }}</p></div><div class="calendar-row-actions"><button type="button" class="admin-secondary" @click="editCalendarDate(row)" :disabled="calendarBusy || !calendarReady">수정</button><button type="button" class="calendar-delete" @click="deleteCalendarDate(row)" :disabled="calendarBusy || !calendarReady">삭제</button></div></article><p v-if="calendarReady && !calendarRows.length" class="admin-empty">등록된 일정이 없습니다. 첫 일정을 추가해 주세요.</p>
</section>
</main>
</template>
<script>
import { getDatabase, ref, set, get, onValue, runTransaction } from "firebase/database";

import { CALENDAR_PATH, defaultCalendarEvents, calendarEventsFrom, calendarDateKey } from "@/utils/calendar-events";

export default {
    data() {
        return {
            activeTab: 'training',
            calendarDate: '', calendarTitles: '', editingDate: '',
            calendarEvents: defaultCalendarEvents(), calendarReady: false,
            calendarBusy: false, calendarMessage: '달력 일정을 불러오는 중…',
            unsubscribeCalendar: null,
            searchName: "",
            limitMessage: "",
            dbPath: "zone5",
            apiData: [], // DB 데이터를 바로 사용
            userName: "",
            selectedDates: [],
            settingsPath: "zone5_settings", // 설정값 경로 추가
        };
    },
    computed: {
        calendarRows() {
            return Object.entries(this.calendarEvents).map(([key,titles]) => {
                const [year,month,day] = key.split('-').map(Number);
                return { key, titles, input: [year,String(month).padStart(2,'0'),String(day).padStart(2,'0')].join('-'), label: year + '년 ' + month + '월 ' + day + '일', time: new Date(year,month-1,day).getTime() };
            }).sort((a,b) => a.time-b.time);
        },
        registrationStats() {
            return this.apiData.reduce((stats,date) => {
                const users = date.user || [];
                stats.total += users.length;
                stats.paid += users.filter(user => user.paid).length;
                return stats;
            }, { total: 0, paid: 0 });
        },
        // Vuex에서 실시간으로 값 가져오기
        growthLimit() {
            return this.$store.state.growthLimit;
        }
    },
    mounted() {
        this.loadCalendar();
        this.loadUserData();
        this.loadSettings(); // 설정값 로드 추가
    },
    beforeDestroy() {
        if (this.unsubscribeCalendar) this.unsubscribeCalendar();
    },
    methods: {
        loadCalendar() {
            this.unsubscribeCalendar = onValue(ref(getDatabase(), CALENDAR_PATH), snapshot => {
                this.calendarEvents = calendarEventsFrom(snapshot.val());
                this.calendarReady = true;
                if (!this.calendarBusy) this.calendarMessage = '';
            }, () => {
                this.calendarReady = false;
                this.calendarMessage = '달력을 불러오지 못했습니다. 연결 상태와 데이터베이스 접근 권한을 확인해 주세요.';
            });
        },
        clearCalendarForm() { this.calendarDate = ''; this.calendarTitles = ''; this.editingDate = ''; },
        editCalendarDate(row) { this.calendarDate = row.input; this.calendarTitles = row.titles.join('\n'); this.editingDate = row.key; this.calendarMessage = ''; },
        async saveCalendarDate() {
            if (this.calendarBusy || !this.calendarReady) return;
            const key = calendarDateKey(this.calendarDate);
            const titles = this.calendarTitles.split(/\r?\n/).map(title => title.trim()).filter(Boolean);
            if (!key || !titles.length) { this.calendarMessage = '올바른 날짜와 일정 내용을 입력해 주세요.'; return; }
            if (!this.editingDate && this.calendarEvents[key]) { this.calendarMessage = '이미 일정이 있는 날짜입니다. 아래 목록에서 수정해 주세요.'; return; }
            await this.persistCalendarDate(key,titles);
        },
        async deleteCalendarDate(row) {
            if (this.calendarBusy || !this.calendarReady || !confirm(row.label + '의 달력 일정을 삭제할까요?')) return;
            await this.persistCalendarDate(row.key,null);
        },
        async persistCalendarDate(key,titles) {
            this.calendarBusy = true; this.calendarMessage = '저장 중…';
            const editing = this.editingDate;
            try {
                const result = await runTransaction(ref(getDatabase(), CALENDAR_PATH), current => {
                    const events = calendarEventsFrom(current);
                    if (titles && !editing && events[key]) return;
                    if (titles) events[key] = titles; else delete events[key];
                    return { initialized: true, events };
                }, { applyLocally: false });
                if (!result.committed) { this.calendarMessage = '이미 일정이 등록된 날짜입니다. 목록에서 수정해 주세요.'; return; }
                this.clearCalendarForm();
                this.calendarMessage = titles ? '일정을 저장했습니다.' : '일정을 삭제했습니다.';
            } catch (error) { this.calendarMessage = '저장하지 못했습니다. 연결 상태와 접근 권한을 확인한 뒤 다시 시도해 주세요.'; }
            finally { this.calendarBusy = false; }
        },
        matchingUsers(date) {
            const query = this.searchName.trim().toLowerCase();
            return (date.user || []).map((user,index) => ({user,index})).filter(entry => String(entry.user.name || '').toLowerCase().includes(query));
        },
        usersFor(date,className) {
            return this.matchingUsers(date).filter(entry => className === '기타' ? !['훈련반','특강반'].includes(entry.user.class) : entry.user.class === className);
        },
        loadUserData() {
            const db = getDatabase();
            const dbRef = ref(db, this.dbPath);

            onValue(dbRef, (snapshot) => {
                let data = snapshot.val() || [];
                // 최소 4개 슬롯 확보
                while (data.length < 4) {
                    data.push({ date: `날짜${data.length + 1}`, user: [] });
                }
                this.apiData = data;
            });
        },
        // 1. 설정값(인원 제한) 불러오기
        loadSettings() {
            const db = getDatabase();
            const limitRef = ref(db, `${this.settingsPath}/growthLimit`);

            // 실시간 리스너 연결
            onValue(limitRef, (snapshot) => {
                const val = snapshot.val();
                if (val !== null) {

                    // Vuex를 사용 중이라면 여기서 store에도 반영
                    this.$store.commit('SET_GROWTH_LIMIT', val);
                }
            });
        },
        updateDate(index) {
            const newDate = this.apiData[index].date.trim();
            if (!newDate) return;
            const db = getDatabase();
            set(ref(db, this.dbPath), this.apiData);
        },
        // 2. 인원 제한 수정 시 DB 저장
        updateLimit(event) {
            const limit = Number(event.target.value);
            if (!Number.isInteger(limit) || limit < 1) {
                this.limitMessage = '정원은 1명 이상의 정수로 입력해 주세요.';
                event.target.value = this.growthLimit;
                return;
            }
            this.limitMessage = '저장 중…';
            const db = getDatabase();
            set(ref(db, this.settingsPath + '/growthLimit'), limit)
            .then(() => {
                this.$store.commit('SET_GROWTH_LIMIT', limit);
                this.limitMessage = '정원이 저장되었습니다.';
            }).catch(() => {
                event.target.value = this.growthLimit;
                this.limitMessage = '저장하지 못했습니다. 다시 시도해 주세요.';
            });
        },
        submit() {
            const name = this.userName.trim();
            if (!name) return alert("이름을 입력해주세요 행님!");
            if (!this.selectedDates.length) return alert("날짜를 선택해주세요 행님!");

            const db = getDatabase();
            const dbRef = ref(db, this.dbPath);

            get(dbRef).then(snapshot => {
                let currentData = snapshot.val() || [];

                this.selectedDates.forEach(selDate => {
                    // 해당 날짜 객체 찾기
                    let dateObj = currentData.find(d => d.date === selDate);

                    if (!dateObj) {
                        // 사실 없어서는 안 되지만, 안전하게 처리
                        dateObj = { date: selDate, user: [] };
                        currentData.push(dateObj);
                    }

                    // user 배열 없으면 초기화
                    if (!Array.isArray(dateObj.user)) dateObj.user = [];

                    // 신청자 추가
                    dateObj.user.push({ name, paid: false });
                });

                set(dbRef, currentData).then(() => {
                    this.userName = '';
                    this.selectedDates = [];
                });
            });
        },
        togglePayment(dateIdx, userIdx) {
            const db = getDatabase();
            get(ref(db, this.dbPath)).then((snapshot) => {
                let data = snapshot.val() || [];
                if (data[dateIdx] && data[dateIdx].user[userIdx]) {
                    data[dateIdx].user[userIdx].paid = !data[dateIdx].user[userIdx].paid;
                    set(ref(db, this.dbPath), data);
                }
            });
        },
        deleteApplicant(dateIdx, userIdx) {
            if (!confirm("신청자를 삭제하시겠습니까?")) return;
            const db = getDatabase();
            get(ref(db, this.dbPath)).then((snapshot) => {
                let data = snapshot.val() || [];
                if (data[dateIdx]) {
                    data[dateIdx].user.splice(userIdx, 1);
                    set(ref(db, this.dbPath), data);
                }
            });
        },
        deleteAllUsers() {
            if (!confirm("완전 초기화 하시겠습니까?")) return;

            const db = getDatabase();
            const initialData = [
                { date: "날짜1", user: [] },
                { date: "날짜2", user: [] },
                { date: "날짜3", user: [] },
                { date: "날짜4", user: [] },
            ];
            set(ref(db, this.dbPath), initialData).then(() => {
                this.apiData = initialData; // Vue data도 바로 갱신
            });
        },
    },
};
</script>

<style scoped>
.zone-admin { max-width:620px; padding:12px 10px 32px; margin:0 auto; color:#172033; text-align:left; }
.admin-back { display:flex; align-items:center; width:fit-content; min-height:44px; color:#64748b; font-size:13px; text-decoration:none; margin-bottom:12px; }
.admin-eyebrow { display:block; font-size:11px; font-weight:800; color:#2563eb; letter-spacing:1.5px; }
.admin-title { display:flex; justify-content:space-between; align-items:center; gap:12px; margin:10px 0; }
.admin-title h1 { font-size:30px; font-weight:800; letter-spacing:-1px; margin:0; }
.admin-title a, .panel-heading a { font-size:12px; color:#2563eb; text-decoration:none; }
.admin-hero > p { font-size:13px; color:#64748b; line-height:1.7; margin-bottom:20px; }
.admin-tabs { display:flex; gap:4px; padding:4px; background:#f1f5f9; border-radius:12px; margin-bottom:20px; }
.admin-tabs button { flex:1; border:0; border-radius:9px; min-height:44px; background:transparent; color:#64748b; font-size:13px; font-weight:700; }
.admin-tabs button.active { color:#1d4ed8; background:#fff; box-shadow:0 2px 6px #0f172a08; }
.admin-stats { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); border:1px solid #e2e8f0; border-radius:16px; padding:18px 10px; margin-bottom:20px; }
.admin-stats > div { display:grid; gap:8px; padding-left:12px; border-right:1px solid #edf1f7; } .admin-stats > div:last-child { border:0; }
.admin-stats span { font-size:11px; color:#64748b; } .admin-stats strong { font-size:25px; line-height:1.2; } .admin-stats small { font-size:11px; font-weight:400; color:#64748b; margin-left:4px; } .blue { color:#2563eb; } .rose { color:#e11d48; }
.admin-panel, .admin-session { border:1px solid #e2e8f0; border-radius:16px; background:white; padding:18px; margin-bottom:18px; }
.panel-heading { display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:14px; } .panel-heading h2 { font-size:17px; font-weight:800; margin:0; } .panel-heading > span { color:#94a3b8; font-size:11px; }
.limit-setting { display:flex; align-items:center; justify-content:space-between; gap:12px; } .limit-setting label { font-size:13px; color:#475569; } .limit-setting > div { display:flex; align-items:center; gap:8px; font-size:12px; color:#64748b; } .limit-setting input { width:76px; text-align:center; }
.zone-admin input, .zone-admin textarea { min-height:44px; border:1px solid #dbe3ef; border-radius:10px; padding:10px 12px; background:#fff; color:#172033; font-size:14px; max-width:100%; }
.zone-admin input:focus, .zone-admin textarea:focus { outline:2px solid #bfdbfe; border-color:#60a5fa; }
.admin-hint { color:#64748b; font-size:12px; line-height:1.7; margin:12px 0 0; }
.save-message { font-size:12px; line-height:1.7; color:#1d4ed8; margin:10px 0 0; }
.zone-admin summary { cursor:pointer; font-size:15px; font-weight:700; } .schedule-settings summary span { float:right; font-size:11px; color:#94a3b8; font-weight:400; }
.schedule-field { margin-top:16px; } .schedule-field label, .search-label { display:block; font-size:12px; color:#475569; font-weight:700; margin-bottom:7px; } .schedule-field input, .schedule-field textarea { display:block; width:100%; }
.admin-roster { margin-top:26px; } .member-search { display:block; width:100%; margin-bottom:18px; background:#f8fafc !important; }
.session-heading { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; } .session-heading > div { min-width:0; } .session-heading span { color:#2563eb; font-size:11px; font-weight:700; } .session-heading h3 { font-size:14px; font-weight:700; line-height:1.7; margin:5px 0 0; overflow-wrap:anywhere; } .session-heading b { flex-shrink:0; font-size:11px; color:#2563eb; background:#eff6ff; border-radius:20px; padding:4px 8px; }
.session-summary { display:flex; gap:12px; font-size:11px; color:#64748b; margin-top:10px; padding-bottom:12px; border-bottom:1px solid #f1f5f9; }
.admin-class h4 { font-size:12px; font-weight:700; margin:15px 0 8px; } .admin-class h4 span { font-size:11px; color:#94a3b8; font-weight:400; margin-left:4px; }
.admin-member-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:7px; } .admin-member { display:flex; align-items:center; gap:3px; min-height:38px; border-radius:8px; background:#f8fafc; padding:6px 4px 6px 8px; min-width:0; } .admin-member > span { flex:1; min-width:0; font-size:12px; font-weight:600; overflow-wrap:anywhere; }
.admin-payment { border:0; border-radius:5px; background:#ffecef; color:#e0526d; min-height:24px; padding:3px 4px; font-size:9px; font-weight:700; white-space:nowrap; } .admin-payment.complete { background:#e8f0ff; color:#2563eb; }
.admin-remove { display:flex; align-items:center; justify-content:center; width:18px; height:26px; padding:0; flex-shrink:0; border:0; background:transparent; color:#94a3b8; font-size:18px; }
.admin-empty { font-size:12px; color:#94a3b8; margin:14px 0 0; }
.reset-panel { margin-top:28px; background:#fffafb; border-color:#ffe4e6; } .reset-panel summary { font-size:13px; color:#be123c; } .reset-panel p { font-size:12px; color:#64748b; line-height:1.7; margin-top:14px; } .reset-panel button, .calendar-delete { border:1px solid #fecdd3; border-radius:8px; background:white; color:#be123c; padding:8px 12px; font-size:12px; }
.calendar-form-actions { display:flex; gap:8px; margin-top:16px; } .admin-primary { border:0; border-radius:10px; background:#2563eb; color:white; min-height:44px; padding:10px 18px; font-size:13px; font-weight:700; }
.admin-secondary { border:1px solid #e2e8f0; border-radius:9px; background:#f8fafc; color:#475569; padding:8px 12px; font-size:12px; }
.calendar-row { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; } .calendar-row > div:first-child { min-width:0; } .calendar-row strong { font-size:13px; color:#2563eb; } .calendar-row p { font-size:13px; color:#475569; line-height:1.7; margin:6px 0 0; overflow-wrap:anywhere; } .calendar-row-actions { display:flex; gap:6px; flex-shrink:0; }
.zone-admin button { cursor:pointer; } .zone-admin button:disabled { opacity:.5; cursor:default; } .zone-admin button:focus-visible, .zone-admin summary:focus-visible, .zone-admin a:focus-visible { outline:3px solid #93c5fd; outline-offset:3px; }
@media (max-width:360px) { .calendar-row { flex-wrap:wrap; } }
</style>
