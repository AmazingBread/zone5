<template>
    <div class="calendar">
        <!-- 헤더 -->
        <div class="calendar-header">
            <button @click="prevMonth">&lt;</button>
            <div class="month-year">{{ currentYear }}년 {{ currentMonth + 1 }}월</div>
            <button @click="nextMonth">&gt;</button>
        </div>

        <!-- 요일 -->
        <div class="weekdays">
            <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
        </div>

        <!-- 날짜 -->
        <div class="days">
            <div
                v-for="(date, index) in calendarDays"
                :key="index"
                :class="[
          'day',
          {
            'other-month': date.otherMonth,
            'event-day': events[`${date.year}-${date.month + 1}-${date.date}`]
          }
        ]"
            >
                <div class="date-number">{{ date.date }}</div>
                <div class="event-text">
                    <div v-for="(evt, idx) in events[`${date.year}-${date.month + 1}-${date.date}`] || []" :key="idx">
                        {{ evt }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MyCalendar", // ESLint 규칙 맞춤
    data() {
        return {
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth(),
            weekDays: ['일', '월', '화', '수', '목', '금', '토'],

            // JSON 이벤트 데이터
            events: {
                '2025-10-24': ['추억만들기 10시'],
                '2025-10-25': ['임랑 바수 6시'],
                '2025-10-26': ['정모 수영구 2시'],
                '2025-10-22': ['콩지콩주 1주년'],
                '2025-10-31': ['고은서 생일'],
                '2025-11-1': ['슥이농장벙'],
                '2025-11-2': ['양산대회'],
                '2025-11-8': ['위석히 B팀'],
                '2025-11-22': ['보노보노 정모 6시', '히오니 청모'],
                '2025-11-29': ['희오니 개론', '문실,눈두 생일'],
                '2025-11-30': ['사직대회'],
                '2025-12-6': ['좋다니까 원데이요가'],
                '2025-12-14': ['12월 정모 수영구'],
                '2025-12-20': ['송년회'],
                '2026-1-4': ['신년회'],
                '2026-1-5': ['안승언 생일'],
                '2026-1-10': ['스사라 생일'],
                '2026-1-14': ['이수정 생일'],
                '2026-1-18': ['북극곰(정모대체)'],
                '2026-2-7': ['정모 해교청 2시'],
                '2026-2-16': ['설날'],
                '2026-2-17': ['설날','준스기 생일'],
                '2026-2-18': ['설날'],
                '2026-2-23': ['배아증 생일'],
                '2026-3-3': ['김단 생일'],
                '2026-3-30': ['항앵군 생일'],
                '2026-4-9': ['짝귀 생일'],
                '2026-4-18': ['재후이 생일'],
                '2026-4-22': ['재가이 생일'],
                '2026-4-30': ['허남 생일'],
                '2026-5-1': ['둥둥 생일'],
                '2026-6-3': ['원스기 생일'],
                '2026-6-22': ['콩주 생일'],
                '2026-7-20': ['국구 생일'],
                '2026-7-21': ['서유정 생일'],
                '2026-8-18': ['김은갱 생일'],
                '2026-8-24': ['안소현 생일'],
                '2026-8-26': ['노원기 생일', '홍콩 생일'],
                '2026-9-17': ['안증원 생일'],
                '2026-9-21': ['도이 생일'],
                '2026-10-31': ['덕구 생일'],
                '2026-11-29': ['눈두디 생일'],
                '2026-12-07': ['히오니 생일'],
            },
        };
    },
    computed: {
        calendarDays() {
            const days = [];
            const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
            const lastDate = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
            const prevLastDate = new Date(this.currentYear, this.currentMonth, 0).getDate();

            // 이전 달 채우기
            for (let i = firstDay - 1; i >= 0; i--) {
                days.push({
                    date: prevLastDate - i,
                    otherMonth: true,
                    year: this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear,
                    month: this.currentMonth === 0 ? 11 : this.currentMonth - 1,
                });
            }

            // 이번 달
            for (let i = 1; i <= lastDate; i++) {
                days.push({ date: i, otherMonth: false, year: this.currentYear, month: this.currentMonth });
            }

            // 다음 달 채우기
            const nextDays = 7 - (days.length % 7);
            if (nextDays < 7) {
                for (let i = 1; i <= nextDays; i++) {
                    days.push({
                        date: i,
                        otherMonth: true,
                        year: this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear,
                        month: this.currentMonth === 11 ? 0 : this.currentMonth + 1,
                    });
                }
            }

            return days;
        },
    },
    methods: {
        prevMonth() {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.currentYear--;
            } else {
                this.currentMonth--;
            }
        },
        nextMonth() {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.currentYear++;
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

    .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        button {
            padding: 0px 8px;
            font-size: 16px;
            cursor: pointer;
            border:1px solid #666;
            background:#fff;
            border-radius:50%;
        }

        .month-year {
            font-size: 18px;
            font-weight: bold;
        }
    }

    .weekdays {
        display: flex;
        .weekday {
            flex: 1;
            text-align: center;
            font-weight: bold;
            font-size:12px;
            padding: 5px 0;
            background: #f5fcf9;
            border: 1px solid #ddd;
        }
    }

    .days {
        display: flex;
        flex-wrap: wrap;

        .day {
            width: 14.28%;
            border: 1px solid #ddd;
            box-sizing: border-box;
            padding: 2px;
            background-color: #fff; // 기본 흰색

            &.other-month {
                background: #fafafa;
                color: #bbb;
            }

            &.event-day {
                background-color: #e6edff; // 이벤트 있는 날 연한 핑크
            }

            .date-number {
                text-align: right;
                font-size: 12px;
                margin-bottom: 2px;
            }

            .event-text {
                font-size: 10px;
                min-height: 40px;
                padding: 2px;
            }
        }
    }
}
</style>
