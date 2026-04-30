<template>
    <div class="calendar">
        <div class="calendar-header">
            <button @click="prevMonth" class="nav-btn">&lt;</button>
            <div class="month-year">{{ currentYear }}년 {{ currentMonth + 1 }}월</div>
            <button @click="nextMonth" class="nav-btn">&gt;</button>
        </div>

        <div class="weekdays">
            <div class="weekday sun">일</div>
            <div class="weekday sat">토</div>
        </div>

        <div class="days">
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
export default {
    name: "MyWeekendCalendar",
    data() {
        return {
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth(),
            events: {
                '2026-1-11': ['훈련+허남강습'],
                '2026-1-25': ['훈련+수영균강습'],
                '2026-2-8': ['선수반+성장반 박정현'],
                '2026-2-22': ['선수반+성장반 이건희'],
                '2026-3-15': ['선수반-노원기', '성장반-허남'],
                '2026-3-22': ['선수반-허남', '성장반-박정현'],
                '2026-3-29': ['창원대회'],
                '2026-4-4': ['경주마라톤'],
                '2026-4-5': ['선수반-노원기', '성장반-허남'],
                '2026-4-12': ['선수반-노원기', '성장반-이건희', '생체특강-박정현'],
                '2026-4-26': ['김세희 특강'],
                '2026-5-17': ['성장반 허남'],
                '2026-5-24': ['생체훈련 박정현, 스바'],
                '2026-5-31': ['성장반 이건희'],
            },
        };
    },
    computed: {
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