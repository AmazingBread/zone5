<template>
    <div class="calendar">
<section v-if="nextEvent" class="next-event"><span class="eyebrow">다가오는 일정</span><p>{{ nextEvent.month }}월 {{ nextEvent.day }}일 · {{ nextEvent.weekday }}</p><strong>{{ nextEvent.title }}</strong></section>
<div class="section-heading"><h2>우리의 일정</h2><span>훈련 · 대회</span></div>
        <div class="calendar-header">
            <button @click="prevMonth" class="nav-btn" aria-label="이전 달">‹</button>
            <div class="month-year" aria-live="polite">{{ currentYear }}년 {{ currentMonth + 1 }}월</div>
            <button @click="nextMonth" class="nav-btn" aria-label="다음 달">›</button>
        </div>

        <div class="view-switch"><button :class="{ active: viewMode === 'list' }" :aria-pressed="viewMode === 'list'" @click="viewMode = 'list'">일정 목록</button><button :class="{ active: viewMode === 'calendar' }" :aria-pressed="viewMode === 'calendar'" @click="viewMode = 'calendar'">주말 달력</button></div>
<div v-if="viewMode === 'list'" class="schedule-list" aria-live="polite"><div v-for="(event,index) in monthEvents" :key="index" class="schedule-row"><div class="schedule-date"><strong>{{ event.day }}</strong><span>{{ event.weekday }}</span></div><div class="schedule-info"><span>{{ event.title.includes('대회') ? '대회' : '훈련' }}</span><strong>{{ event.title }}</strong></div></div><div v-if="!monthEvents.length" class="empty-state"><strong>이번 달은 등록된 일정이 없어요</strong><p>다른 달의 훈련과 대회 일정을 확인해 보세요.</p><button @click="nextMonth">다음 달 보기 →</button></div></div>
<div v-if="viewMode === 'calendar'" class="weekdays">
            <div class="weekday sun">일</div>
            <div class="weekday sat">토</div>
        </div>

        <div v-if="viewMode === 'calendar'" class="days">
            <div
                v-for="(date, index) in weekendOnlyDays"
                :key="index"
                :class="[
                  'day',
                  {
                    'other-month': date.otherMonth,
                    'event-day': events[`${date.year}-${date.month + 1}-${date.date}`]
                  }
                ]"
            >
                <div class="date-number" :class="{ 'txt-sun': date.dayIndex === 0, 'txt-sat': date.dayIndex === 6 }">
                    {{ date.date }}
                </div>

                <div class="event-text">
                    <div v-for="(evt, idx) in events[`${date.year}-${date.month + 1}-${date.date}`] || []" :key="idx" class="evt-item">
                        {{ evt }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";
import { CALENDAR_PATH, defaultCalendarEvents, calendarEventsFrom } from "@/utils/calendar-events";
export default {
    name: "MyWeekendCalendar",
    data() {
        return {
            viewMode: 'list',
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth(),
            events: defaultCalendarEvents(),
            unsubscribeCalendar: null,
        };
    },
    mounted() {
        this.unsubscribeCalendar = onValue(ref(getDatabase(), CALENDAR_PATH), snapshot => {
            this.events = calendarEventsFrom(snapshot.val());
        }, () => { /* Keep the existing schedule visible if reading fails. */ });
    },
    beforeDestroy() {
        if (this.unsubscribeCalendar) this.unsubscribeCalendar();
    },
    computed: {
        allEvents() {
            return Object.keys(this.events).reduce((result,key) => {
                const [year,month,day] = key.split('-').map(Number);
                const date = new Date(year,month-1,day);
                this.events[key].forEach(title => result.push({year,month,day,date,title,weekday:['일요일','월요일','화요일','수요일','목요일','금요일','토요일'][date.getDay()]}));
                return result;
            },[]).sort((a,b) => a.date-b.date);
        },
        monthEvents() { return this.allEvents.filter(event => event.year === this.currentYear && event.month === this.currentMonth+1); },
        nextEvent() { const today=new Date(); today.setHours(0,0,0,0); return this.allEvents.find(event => event.date >= today); },
        weekendOnlyDays() {
            const days = [];
            const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
            const lastDate = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
            const prevLastDate = new Date(this.currentYear, this.currentMonth, 0).getDate();

            for (let i = firstDay - 1; i >= 0; i--) {
                const date = prevLastDate - i;
                const month = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
                const year = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
                const dayIndex = new Date(year, month, date).getDay();
                if (dayIndex === 0 || dayIndex === 6) {
                    days.push({ date, otherMonth: true, year, month, dayIndex });
                }
            }

            for (let i = 1; i <= lastDate; i++) {
                const dayIndex = new Date(this.currentYear, this.currentMonth, i).getDay();
                if (dayIndex === 0 || dayIndex === 6) {
                    days.push({ date: i, otherMonth: false, year: this.currentYear, month: this.currentMonth, dayIndex });
                }
            }

            for (let i = 1; i <= 14; i++) {
                const month = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
                const year = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
                const dayIndex = new Date(year, month, i).getDay();
                if (dayIndex === 0 || dayIndex === 6) {
                    days.push({ date: i, otherMonth: true, year, month, dayIndex });
                }
                if (days.length % 2 === 0 && days.length >= 4) break;
            }
            return days;
        },
    },
    methods: {
        prevMonth() {
            if (this.currentMonth === 0) {
                this.currentMonth = 11; this.currentYear--;
            } else {
                this.currentMonth--;
            }
        },
        nextMonth() {
            if (this.currentMonth === 11) {
                this.currentMonth = 0; this.currentYear++;
            } else {
                this.currentMonth++;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.calendar {
    max-width: 480px;
    margin: 0 auto;
    padding: 10px;
    font-family: Arial, sans-serif;
    color: #333;

    .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;

        .nav-btn {
            padding: 4px 10px;
            font-size: 14px;
            cursor: pointer;
            border: 1px solid #eee;
            background: #fff;
            border-radius: 4px;
        }

        .month-year { font-size: 18px; font-weight: bold; }
    }

    .weekdays {
        display: flex;
        border-top: 1px solid #333;
        .weekday {
            flex: 1;
            text-align: center;
            font-weight: bold;
            font-size: 12px;
            padding: 8px 0;
            background: #f8f9fa;
            border-bottom: 1px solid #eee;
            border-left: 1px solid #eee;
            &:last-child { border-right: 1px solid #eee; }
            &.sun { color: #ff5e5e; }
            &.sat { color: #4a90e2; }
        }
    }

    .days {
        display: flex;
        flex-wrap: wrap;
        border-left: 1px solid #eee;

        .day {
            position: relative;
            width: 50%;
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
            box-sizing: border-box;
            padding: 8px;
            background-color: #fff;

            &.other-month {
                background: #fafafa;
                /* 숫자의 색상과 텍스트 전체를 연하게 처리 */
                .date-number { opacity: 0.3; }
                .event-text { opacity: 0.3; }
            }

            &.event-day {
                background-color: #f4f7ff;
            }

            .date-number {
                position: absolute;
                top: 8px;
                right: 8px;
                font-size: 13px;
                font-weight: bold;
                &.txt-sun { color: #ff5e5e; }
                &.txt-sat { color: #4a90e2; }
            }

            .event-text {
                font-size: 11px;
                min-height: 45px;

                .evt-item {
                    margin-bottom: 4px;
                    padding-bottom: 4px;
                    word-break: break-all;
                    padding-right: 22px;
                    color: #000;
                    line-height: 1.4;
                    &:last-child { border-bottom: none; }
                }
            }
        }
    }
}
</style>
<style scoped>
.calendar { max-width:none; padding:0; color:#18201c; font-family:inherit; }
.next-event { padding:20px; background:#f2f6eb; border:1px solid #e4ebda; border-radius:18px; margin-bottom:28px; }
.eyebrow { font-size:12px; color:#536149; font-weight:700; } .next-event p { font-size:12px; color:#626f59; margin:14px 0 6px; } .next-event strong { font-size:18px; line-height:1.5; overflow-wrap:anywhere; }
.section-heading { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; } .section-heading h2 { font-size:21px; font-weight:800; margin:0; } .section-heading > span { font-size:12px; color:#778073; }
.calendar .calendar-header .nav-btn { width:44px; height:44px; padding:0; border:1px solid #e4e8df; border-radius:12px; font-size:25px; color:#18201c; }
.calendar .calendar-header .month-year { font-size:17px; }
.view-switch { display:flex; padding:4px; background:#f1f3ef; border-radius:12px; margin-bottom:16px; } .view-switch button { flex:1; min-height:44px; background:transparent; border:0; border-radius:9px; color:#687264; font-size:13px; font-weight:700; cursor:pointer; } .view-switch button.active { background:white; color:#18201c; box-shadow:0 2px 5px #18201c0a; }
.schedule-list { border:1px solid #e5e9e0; border-radius:16px; overflow:hidden; } .schedule-row { display:flex; align-items:center; gap:16px; padding:18px 16px; border-bottom:1px solid #edf0e8; } .schedule-row:last-child { border-bottom:0; }
.schedule-date { min-width:44px; display:grid; text-align:center; gap:2px; } .schedule-date strong { font-size:25px; line-height:1.2; } .schedule-date span { font-size:11px; color:#737d6d; }
.schedule-info { display:grid; gap:6px; } .schedule-info > span { font-size:11px; color:#647255; } .schedule-info strong { font-size:15px; line-height:1.5; overflow-wrap:anywhere; }
.empty-state { text-align:center; padding:26px 14px; } .empty-state strong { font-size:14px; } .empty-state p { font-size:12px; line-height:1.6; color:#727b6c; margin:8px 0 12px; } .empty-state button { min-height:44px; border:0; background:#f2f6eb; border-radius:9px; padding:0 16px; font-size:12px; color:#344b20; font-weight:700; cursor:pointer; }
.calendar .weekdays { border-top:0; border-radius:12px 12px 0 0; overflow:hidden; } .calendar .days .day { min-height:88px; } .calendar .days .day .date-number { position:static; margin-bottom:7px; font-size:14px; } .calendar .days .day .event-text { font-size:12px; min-height:34px; } .calendar .days .day .event-text .evt-item { padding-right:0; word-break:normal; overflow-wrap:anywhere; } .calendar .days .day.event-day { background:#f2f7e8; } .calendar .days .day.other-month .date-number, .calendar .days .day.other-month .event-text { opacity:1; color:#717b69; }
.calendar button:focus-visible { outline:3px solid #719b29; outline-offset:2px; }
</style>
