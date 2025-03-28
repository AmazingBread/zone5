<template>
    <div>
        <div id="container"></div>
        <div class="mb-3 text-center">{{today}} 몸무게</div>
        <!-- 돼빵 입력란 -->
        <div class="row">
            <div class="col-6">
                <div class="mb-3 d-flex align-items-center">
                    <label for="bread" class="form-label fw-bold me-2" style="white-space: nowrap;">돼빵</label>
                    <input type="text" class="form-control me-2" v-model="apiData['돼빵']" ref="nameInput">
                    <button @click="saveWeight('돼빵', apiData['돼빵'])" class="btn btn-primary" style="white-space: nowrap;">저장</button>
                </div>
            </div>
            <!-- 영은 입력란 -->
            <div class="col-6">
                <div class="mb-3 d-flex align-items-center">
                    <label for="rose" class="form-label fw-bold me-2" style="white-space: nowrap;">영은</label>
                    <input type="text" class="form-control me-2" v-model="apiData['영은']" ref="nameInput">
                    <button @click="saveWeight('영은', apiData['영은'])" class="btn btn-primary" style="white-space: nowrap;">저장</button>
                </div>
            </div>
        </div>

        <!-- 시리 입력란 -->
        <div class="row">
            <div class="col-6">
                <div class="mb-3 d-flex align-items-center">
                    <label for="siri" class="form-label fw-bold me-2" style="white-space: nowrap;">시리</label>
                    <input type="text" class="form-control me-2" v-model="apiData['시리']" ref="nameInput">
                    <button @click="saveWeight('시리', apiData['시리'])" class="btn btn-primary" style="white-space: nowrap;">저장</button>
                </div>
            </div>
            <!-- 장미 입력란 -->
            <div class="col-6">
                <div class="mb-3 d-flex align-items-center">
                    <label for="juns" class="form-label fw-bold me-2" style="white-space: nowrap;">장미</label>
                    <input type="text" class="form-control me-2" v-model="apiData['장미']" ref="nameInput">
                    <button @click="saveWeight('장미', apiData['장미'])" class="btn btn-primary" style="white-space: nowrap;">저장</button>
                </div>
            </div>
        </div>

        <!-- 준스기 입력란 -->
        <div class="row">
            <div class="col-6">
                <div class="mb-3 d-flex align-items-center">
                    <label for="juns" class="form-label fw-bold me-2" style="white-space: nowrap;">준스기</label>
                    <input type="text" class="form-control me-2" v-model="apiData['준스기']" ref="nameInput">
                    <button @click="saveWeight('준스기', apiData['준스기'])" class="btn btn-primary" style="white-space: nowrap;">저장</button>
                </div>
            </div>
            <div class="col-6">
                <div class="mb-3 d-flex align-items-center">
                    <label for="juns" class="form-label fw-bold me-2" style="white-space: nowrap;">승언</label>
                    <input type="text" class="form-control me-2" v-model="apiData['승언']" ref="nameInput">
                    <button @click="saveWeight('승언', apiData['승언'])" class="btn btn-primary" style="white-space: nowrap;">저장</button>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import Highcharts from 'highcharts';
import 'highcharts/modules/series-label';
import { getDatabase, ref, onValue, set, get } from "firebase/database"; // Firebase SDK에서 필요한 모듈을 임포트합니다.


export default {
    name: "DietPage",  // 다단어로 컴포넌트 이름 변경
    data(){
        return {
            apiUrl : "https://bonobono-e6ed4-default-rtdb.asia-southeast1.firebasedatabase.app/diet.json",
            today :'',
            apiData: {
                '돼빵': 0,
                '영은': 0,
                '시리': 0,
                '장미': 0,
                '준스기': 0,
                '승언':0,
            },
            chartData: []

        };
    },
    mounted(){
        this.db = getDatabase();
        this.getToday()
        this.getData()
        // 데이터 변경 감지를 위해 리스너 추가
        const dataRef = ref(this.db, 'diet'); // cheering 경로에 대한 참조
        onValue(dataRef, (snapshot) => {
            const getData = snapshot.val() || {};
            this.apiData = Object.keys(getData)
                                  .map(key => ({
                key: key, // Firebase에서의 고유 키
                ...getData[key] // 나머지 데이터
            }));
        });
    },
    computed: {
    },
    methods:{
        saveWeight(name, weight){
            // Firebase의 diet 경로에 이름을 key로 하여 데이터를 저장
            const weightRef = ref(this.db, 'diet/' + this.today + '/' + name);
            set(weightRef, weight)
            .then(() => {
                console.log(`${name}의 몸무게 저장 성공`);
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
                console.log('this.chartData', this.chartData)
                // 오늘 날짜 (this.today 사용)
                const today = this.today; // 예: '2025-03-28'
                let todayData = apiData[today] || {}; // 오늘의 데이터 (없으면 빈 객체)

                // 오늘 데이터가 없다면 전날 데이터 찾기
                if (Object.keys(todayData).length === 0) {
                    let yesterday = new Date(this.today); // today를 기반으로 전날 계산
                    yesterday.setDate(yesterday.getDate() - 1); // 하루 전으로 설정
                    const yesterdayDate = yesterday.toISOString().split('T')[0]; // 전날 날짜

                    todayData = apiData[yesterdayDate] || {}; // 전날 데이터 (없으면 빈 객체)
                }

                // apiData 변수에 오늘(또는 전날) 데이터 할당
                this.apiData = todayData;
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

            // Firebase에서 가져온 데이터를 기반으로 날짜별로 몸무게 데이터 추출
            this.chartData.forEach(entry => {
                const date = entry.date; // Firebase에서의 날짜
                dates.push(date); // 날짜 배열에 추가

                // 사람별 몸무게 데이터를 시리즈로 추가
                bread.push(parseFloat(entry.돼빵 || 0));
                silver.push(parseFloat(entry.영은 || 0));
                rose.push(parseFloat(entry.장미 || 0));
                siri.push(parseFloat(entry.시리 || 0));
                juns.push(parseFloat(entry.준스기 || 0));
                pool.push(parseFloat(entry.승언 || 0));

            });


            Highcharts.chart('container', {
                chart: {
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
                    tickInterval: 1, // * 24 * 3600 * 1000, // one week
                    tickWidth: 0,
                    gridLineWidth: 1,
                    labels: {
                        align: 'left',
                        x: 3,
                        y: -3
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
                    enabled: false,
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
                }]
            });
        },
        getToday() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
            const day = String(today.getDate()).padStart(2, '0');
            this.today = `${year}-${month}-${day}`;
        }
    }
};
</script>

<style>
/* 스타일 추가 (예: form 스타일링) */
</style>
