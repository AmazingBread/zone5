<template>
    <div class="bus-app">
        <div class="bus-wrap">
            <div class="live-clock">
                <span class="clock-label">현재 시간 </span>
                <span class="clock-time">{{ currentTime }}</span>
            </div>
            <div v-if="busInfo" class="bus-info">
                <div class="main-row">
                    <h1 class="bus-number">{{ busInfo.lineno }}</h1>
                </div>

                <div class="arrival-grid">
                    <p class="stop-name">{{ busInfo.nodenm }} 에서 정관중 가는 방향</p>
                    <div class="arrival-box primary">
                        <span class="label">첫 번째 버스</span>
                        <div class="time-value">
                            <span class="min">{{ busInfo.min1 }}</span>
                            <span class="unit">분 후</span>
                        </div>
                        <p class="station-count">{{ busInfo.station1 }}개 전 정류장</p>
                    </div>

                    <div v-if="busInfo.min2" class="arrival-box secondary">
                        <span class="label">두 번째 버스</span>
                        <div class="time-value">
                            <span class="min">{{ busInfo.min2 }}</span>
                            <span class="unit">분 후</span>
                        </div>
                        <p class="station-count">{{ busInfo.station2 }}개 전 정류장</p>
                    </div>
                </div>
            </div>
            <div v-if="busInfo2" class="bus-info">
                <div class="main-row">
                    <h1 class="bus-number">{{ busInfo2.lineno }}</h1>
                </div>

                <div class="arrival-grid">
                    <p class="stop-name">{{ busInfo2.nodenm }} 에서 집가는 방향</p>
                    <div class="arrival-box primary">
                        <span class="label">첫 번째 버스</span>
                        <div class="time-value">
                            <span class="min">{{ busInfo2.min1 }}</span>
                            <span class="unit">분 후</span>
                        </div>
                        <p class="station-count">{{ busInfo2.station1 }}개 전 정류장</p>
                    </div>

                    <div v-if="busInfo2.min2" class="arrival-box secondary">
                        <span class="label">두 번째 버스</span>
                        <div class="time-value">
                            <span class="min">{{ busInfo2.min2 }}</span>
                            <span class="unit">분 후</span>
                        </div>
                        <p class="station-count">{{ busInfo2.station2 }}개 전 정류장</p>
                    </div>
                </div>
            </div>

            <div class="footer">
                최근 업데이트: {{ lastUpdate || '-' }}
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'VillageBus',
    data() {
        return {
            currentTime: '', // 실시간 시계 변수
            busInfo: null,
            busInfo2: null,
            loading: false,
            lastUpdate: '',
            polling: null,
            polling2: null,
            // API 설정
            // 주의: 브라우저 환경에 따라 인코딩된 키/디코딩된 키 중 맞는 것을 선택해야 할 수 있습니다.
            serviceKey: 'z/qPRjcr86Kak1q4yHkE5EyErGmXJ7YmZH4vc5+EU/8v1/uVu/5zUUbdXdLhn3u+lpxhAw/WXlR8z00t4q+/LQ==',

        };
    },
    mounted() {
        // 1. 초기 실행
        this.updateClock();
        this.fetchBusData();
        this.fetchBusData2();

        // 2. 1초마다 시계 갱신
        this.clockTimer = setInterval(this.updateClock, 1000);

        // 3. 1분마다 버스 데이터 갱신
        this.polling = setInterval(this.fetchBusData, 10000);
        this.polling2 = setInterval(this.fetchBusData2, 10000);
    },
    beforeDestroy() {
        // 타이머 모두 해제
        if (this.polling) clearInterval(this.polling);
        if (this.clockTimer) clearInterval(this.clockTimer);
    },
    methods: {
        updateClock() {
            this.currentTime = new Date().toLocaleTimeString();
        },
        fetchBusData() {
            this.loading = true;
            const url = `https://apis.data.go.kr/6260000/BusanBIMS/stopArrByBstopid`;

            // axios를 사용한 데이터 호출
            this.$axios.get(url, {
                params: {
                    serviceKey: this.serviceKey,
                    bstopid: '500600000'
                }
            })
            .then(response => {
                // 1. XML 문자열을 DOM 객체로 변환
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, "text/xml");

                // 2. <item> 태그들 추출
                const items = xmlDoc.getElementsByTagName("item");

                let target = null;

                // 3. 루프를 돌며 '기장군8' 버스 찾기
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    const lineno = item.getElementsByTagName("lineno")[0]?.textContent;

                    if (lineno === "기장군8") {
                        target = {
                            lineno: lineno,
                            nodenm: item.getElementsByTagName("nodenm")[0]?.textContent,
                            min1: item.getElementsByTagName("min1")[0]?.textContent,
                            station1: item.getElementsByTagName("station1")[0]?.textContent,
                            min2: item.getElementsByTagName("min2")[0]?.textContent,
                            station2: item.getElementsByTagName("station2")[0]?.textContent
                        };
                        break;
                    }
                }

                if (target) {
                    this.busInfo = target;
                } else {
                    this.busInfo = null;
                }

                this.lastUpdate = new Date().toLocaleTimeString();
            })
            .catch(error => {
                console.error("API 호출 중 에러 발생:", error);
            });
        },
        fetchBusData2() {
            const url = `https://apis.data.go.kr/6260000/BusanBIMS/stopArrByBstopid`;

            // axios를 사용한 데이터 호출
            this.$axios.get(url, {
                params: {
                    serviceKey: this.serviceKey,
                    bstopid: '214170205'
                }
            })
            .then(response => {
                // 1. XML 문자열을 DOM 객체로 변환
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, "text/xml");

                // 2. <item> 태그들 추출
                const items = xmlDoc.getElementsByTagName("item");

                let target = null;

                // 3. 루프를 돌며 '기장군8' 버스 찾기
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    const lineno = item.getElementsByTagName("lineno")[0]?.textContent;

                    if (lineno === "기장군8") {
                        target = {
                            lineno: lineno,
                            nodenm: item.getElementsByTagName("nodenm")[0]?.textContent,
                            min1: item.getElementsByTagName("min1")[0]?.textContent,
                            station1: item.getElementsByTagName("station1")[0]?.textContent,
                            min2: item.getElementsByTagName("min2")[0]?.textContent,
                            station2: item.getElementsByTagName("station2")[0]?.textContent
                        };
                        break;
                    }
                }

                if (target) {
                    this.busInfo2 = target;
                } else {
                    this.busInfo2 = null;
                }

                this.lastUpdate = new Date().toLocaleTimeString();
            })
                 .catch(error => {
                console.error("API 호출 중 에러 발생:", error);
            });
        }
    }
};
</script>

<style scoped lang="scss">
.live-clock {
    margin-bottom:10px;
    font-size:20px;
    .clock-label {

    }
    .clock-time {
        font-weight:600;
    }
}

.bus-wrap {
    text-align: center;
    padding:10px;
}
.bus-info {
    margin-bottom:15px;
}
.bus-number {
    font-size:20px;
    font-weight:600;
}
.stop-name {
    font-size:20px;
}
.arrival-grid {
    border:1px solid #cbd7f1;
    padding:10px;
    background: #f8f8f8;
    border-radius: 5px;
}
.arrival-box {
    .label {
        font-size:20px;
    }
    .min {
        font-size:50px;
    }
}
.footer {padding:10px;}
</style>