<template>
    <div>
        <div id="container"></div>
        <div class="mb-3 text-center">{{today}} 몸무게</div>
        <!-- 돼빵 입력란 -->
        <div class="d-flex gap-2 p-1">
            <div class="mb-3 d-flex align-items-center">
                <label for="bread" class="form-label fw-bold me-2" style="white-space: nowrap;">돼빵</label>
                <input type="text" class="form-control me-2" v-model="toDayApiData['돼빵']" ref="nameInput">
                <button @click="saveWeight('돼빵', toDayApiData['돼빵'])" class="btn btn-primary" style="white-space: nowrap;">저장</button>
            </div>
            <div class="mb-3 d-flex align-items-center">
                <label for="rose" class="form-label fw-bold me-2" style="white-space: nowrap;">영은</label>
                <input type="text" class="form-control me-2" v-model="toDayApiData['영은']" ref="nameInput">
                <button @click="saveWeight('영은', toDayApiData['영은'])" class="btn btn-primary" style="white-space: nowrap;">저장</button>
            </div>
        </div>

        <!-- 시리 입력란 -->
        <div class="d-flex gap-2 p-1">
            <div class="mb-3 d-flex align-items-center">
                <label for="siri" class="form-label fw-bold me-2" style="white-space: nowrap;">시리</label>
                <input type="text" class="form-control me-2" v-model="toDayApiData['시리']" ref="nameInput">
                <button @click="saveWeight('시리', toDayApiData['시리'])" class="btn btn-primary" style="white-space: nowrap;">저장</button>
            </div>
            <div class="mb-3 d-flex align-items-center">
                <label for="juns" class="form-label fw-bold me-2" style="white-space: nowrap;">장미</label>
                <input type="text" class="form-control me-2" v-model="toDayApiData['장미']" ref="nameInput">
                <button @click="saveWeight('장미', toDayApiData['장미'])" class="btn btn-primary" style="white-space: nowrap;">저장</button>
            </div>
        </div>

        <!-- 준스기 입력란 -->
        <div class="d-flex gap-2 p-1">
            <div class="mb-3 d-flex align-items-center">
                <label for="juns" class="form-label fw-bold me-2" style="white-space: nowrap;">준슥</label>
                <input type="text" class="form-control me-2" v-model="toDayApiData['준스기']" ref="nameInput">
                <button @click="saveWeight('준스기', toDayApiData['준스기'])" class="btn btn-primary" style="white-space: nowrap;">저장</button>
            </div>
            <div class="mb-3 d-flex align-items-center">
                <label for="juns" class="form-label fw-bold me-2" style="white-space: nowrap;">승언</label>
                <input type="text" class="form-control me-2" v-model="toDayApiData['승언']" ref="nameInput">
                <button @click="saveWeight('승언', toDayApiData['승언'])" class="btn btn-primary" style="white-space: nowrap;">저장</button>
            </div>
        </div>
        <!-- 준스기 입력란 -->
        <div class="d-flex gap-2 p-1  w-50">
            <div class="mb-3 d-flex align-items-center">
                <label for="juns" class="form-label fw-bold me-2" style="white-space: nowrap;">나미</label>
                <input type="text" class="form-control me-2" v-model="toDayApiData['나미']" ref="nameInput">
                <button @click="saveWeight('나미', toDayApiData['나미'])" class="btn btn-primary" style="white-space: nowrap;">저장</button>
            </div>
        </div>


    </div>
</template>

<script>
import Highcharts from 'highcharts';
import 'highcharts/modules/series-label';
import { getDatabase, ref, child, onValue, set, get } from "firebase/database"; // Firebase SDK에서 필요한 모듈을 임포트합니다.


export default {
    name: "DietPage",  // 다단어로 컴포넌트 이름 변경
    data(){
        return {
            apiUrl : "https://bonobono-e6ed4-default-rtdb.asia-southeast1.firebasedatabase.app/diet.json",
            today :'',
            yesterday :'',
            apiData: [],
            yesterDayApiData: {},
            toDayApiData: {},
            // apiData: {
            //     '돼빵': 0,
            //     '영은': 0,
            //     '시리': 0,
            //     '장미': 0,
            //     '준스기': 0,
            //     '승언':0,
            // },
            chartData: []

        };
    },
    mounted(){
        this.db = getDatabase();
        this.getToday()
        this.getYesterday()
        this.getData()
        // 데이터 변경 감지를 위해 리스너 추가
        // const dataRef = child(ref(this.db), `diet/${this.today}`); // cheering 경로에 대한 참조
        // onValue(dataRef, (snapshot) => {
        //     const getData = snapshot.val() || {};
        //     this.toDayApiData = Object.keys(getData).map(key => ({
        //         key: key, // Firebase에서의 고유 키
        //         ...getData[key] // 나머지 데이터
        //     }));
        // });
    },
    computed: {
    },
    methods:{
        saveWeight(name, weight){
            // this.yesterDayApiData

            const weightRef = ref(this.db, 'diet/' + this.today + '/' + name);
            set(weightRef, weight)
            .then(() => {
                console.log(`${name}의 몸무게 저장 성공`);
                // 어제 데이터와 비교하여 오늘 없는 데이터도 함께 저장
                if (this.yesterDayApiData) {
                    Object.keys(this.yesterDayApiData).forEach(yesterdayName => {
                        if (this.yesterDayApiData[yesterdayName] && !this.toDayApiData[yesterdayName]) {
                            const missingWeightRef = ref(this.db, 'diet/' + this.today + '/' + yesterdayName);
                            set(missingWeightRef, this.yesterDayApiData[yesterdayName])
                            .then(() => {
                                console.log(`${yesterdayName}의 몸무게 ${this.yesterDayApiData[yesterdayName]} 저장 완료`);
                            })
                             .catch(error => {
                                console.error(`${yesterdayName} 저장 오류:`, error);
                            });
                        }
                    });
                }

                this.getData()
            })
             .catch(error => {
                console.error('데이터 저장 오류:', error);
                this.result = '데이터 저장 오류가 발생했습니다.';
                alert(this.result);
            });
        },
        getData(){
            const dataRef = ref(this.db, 'diet'); // diet 경로에 대한 참조

            // Firebase에서 데이터 가져오기
            get(dataRef)
            .then((snapshot) => {
                const apiData = snapshot.val() || {};
                this.chartData = Object.keys(apiData).map(key => ({
                    date: key, // Firebase에서의 고유 키
                    ...apiData[key] // 나머지 데이터
                }));
                console.log('this.chartData',this.chartData)

                let todayData = apiData[this.today] || {}; // 오늘의 데이터 (없으면 빈 객체)
                this.yesterDayApiData = apiData[this.yesterday] || {};

                console.log('this.today', this.today);
                console.log('this.yesterday', this.yesterday);


                // apiData 변수에 오늘(또는 전날) 데이터 할당
                this.toDayApiData = todayData;
                this.createChart()
            })
             .catch(error => {
                console.error("신청자 목록 가져오기 오류:", error);
            });
        },
        createChart(){
            Highcharts.setOptions({
                lang: {
                    numericSymbols: ['k', 'M', 'B', 'T'],
                    thousandsSep: ',',
                    decimalPoint: '.',
                }
            });

            // 날짜와 사람의 이름을 저장할 배열
            const dates = [];
            const bread = [];
            const rose = [];
            const siri = [];
            const juns = [];
            const silver = [];
            const pool = [];
            const nami = [];

            // Firebase에서 가져온 데이터를 기반으로 날짜별로 몸무게 데이터 추출
            this.chartData.forEach(entry => {
                const date = entry.date; // Firebase에서의 날짜
                const formattedDate = date.slice(5); // 앞의 "2025-" 제거 → "04-01"
                dates.push(formattedDate); // 날짜 배열에 추가

                // 사람별 몸무게 데이터를 시리즈로 추가
                bread.push(parseFloat(entry.돼빵 || null));
                silver.push(parseFloat(entry.영은 || null));
                rose.push(parseFloat(entry.장미 || null));
                siri.push(parseFloat(entry.시리 || null));
                juns.push(parseFloat(entry.준스기 || null));
                pool.push(parseFloat(entry.승언 || null));
                nami.push(parseFloat(entry.나미 || null));
            });


            Highcharts.chart('container', {
                chart: {
                    type: "line",
                    zoomType: 'x',
                    height:500,
                    marginTop: 60,
                    marginBottom: 50, // 범례 공간을 위해 여유 추가
                    // scrollablePlotArea: {
                    //     minWidth: 700
                    // }
                },
                title: {
                    text: '',
                    align: 'left'
                },

                subtitle: {
                    text: '',
                    align: 'left'
                },

                xAxis: {
                    categories: dates, // 날짜
                    // tickInterval:7,
                    tickInterval: Math.ceil(dates.length / 7), // 전체 개수를 3등분하여 간격 설정
                    // tickInterval: 1 * 24 * 3600 * 1000, // one week
                    // tickWidth: 7,
                    minRange: 1, // 너무 크면 줌 제한됨
                    gridLineWidth: 1,
                    labels: {
                        enabled: true,
                        align: 'center',
                        x: 3,
                        y: 20
                    }
                },

                yAxis: [{ // left y axis
                    title: {
                        text: null
                    },
                    labels: {
                        align: 'left',
                        x: 3,
                        y: 16,
                        format: '{value:.,0f}'
                    },
                    showFirstLabel: false
                }, { // right y axis
                    linkedTo: 0,
                    gridLineWidth: 0,
                    opposite: true,
                    title: {
                        text: null
                    },
                    labels: {
                        align: 'right',
                        x: -3,
                        y: 16,
                        format: '{value:.,0f}'
                    },
                    showFirstLabel: false
                }],

                legend: {
                    enabled: true,
                    align: 'left',
                    verticalAlign: 'top',
                    borderWidth: 0
                },

                tooltip: {
                    shared: true,
                    crosshairs: true
                },

                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        className: 'popup-on-click',
                        marker: {
                            lineWidth: 1
                        },
                        // 데이터 라인 위에 이름을 띄우는 부분
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}', // 데이터 포인트의 이름을 표시
                            style: {
                                fontWeight: 'bold',
                                fontSize: '14px',
                                color: '#333'
                            },
                            verticalAlign: 'bottom', // 데이터 포인트 아래에 표시
                            align: 'center' // 데이터 포인트 중앙에 맞춤
                        }
                    }
                },

                series: [{
                        name: '돼빵',
                        data: bread
                    }, {
                        name: '영은',
                        data: silver
                    }, {
                        name: '시리',
                        data: siri
                    }, {
                        name: '준슥',
                        data: juns
                    }, {
                        name: '장미',
                        data: rose
                    }, {
                        name: '승언',
                        data: pool
                    }, {
                        name: '나미',
                        data: nami
                    }],
                credits: {
                    enabled: false  // Highcharts 로고 제거
                },
            });
        },
        getToday() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
            const day = String(today.getDate()).padStart(2, '0');
            this.today = `${year}-${month}-${day}`;
        },
        getYesterday() {
            const today = new Date();
            today.setDate(today.getDate() - 1); // 하루 전으로 설정

            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // 월 보정
            const day = String(today.getDate()).padStart(2, '0');

            this.yesterday = `${year}-${month}-${day}`;
        }
    }
};
</script>

<style>
/* 스타일 추가 (예: form 스타일링) */
</style>
