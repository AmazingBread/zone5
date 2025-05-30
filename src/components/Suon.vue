<template>
    <div>
        <h5 style="text-align: center; font-weight: bold;">
            해운대 바다수온
        </h5>
        <div ref="chart" class="chart-container"></div>
    </div>
</template>

<script>
import * as d3 from 'd3'
export default {
    name: "SuonComponent",
    components: {
    },
    data() {
        return {
        };
    },
    watch: {
        '$store.state.suonDataSet': {
            handler(newVal) {
                if (this.isDataReady(newVal)) {
                    this.drawChart();
                }
            },
            immediate: true,
            deep: true,
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.isDataReady(this.$store.state.suonDataSet)) {
                this.drawChart();
            }
        });
    },
    methods:{
        formatDate(date) {
            const yyyy = date.getFullYear();
            const yy = String(yyyy).slice(2); // 연도 뒤 두 자리
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            //return `${yyyy}-${mm}-${dd}`;
            return `${yy}.${mm}.${dd}`;
        },
        isDataReady(suonDataSet) {
            if (!suonDataSet || !suonDataSet.length) return false;
            return suonDataSet.every(item => Array.isArray(item.values) && item.values.length > 0);
        },
        getInsta(){
            const user_id = '17841467473584821'
            const token = 'IGAAOgPBtMxydBZAFBEd3F6XzdGSkhJMTMyOHFyVWNkOVZAlb2gyeVgyYmt3dXpfcnhoVmZAQa3RCNXZAyMlByRmlfUmtwYzN3MHo3MzB6dXpsQnJZAd296ZAHRtQmcweEs1WkNUbFFtOG9GRFRXZAjJsVVMwQnZAsV2xVQ0lkV1QtOW5KOAZDZD'
            this.$axios.get('https://graph.instagram.com/v21.0/'+user_id+'/media', {
                params: {
                    fields: 'id,caption,media_type,media_url,permalink,timestamp, thumbnail_url',
                    access_token: token
                }
            })
             .then(res => {
                this.posts = res.data.data;
            })
             .catch(err => {
                console.error('게시물 불러오기 실패했심더:', err);
            });
        },
        drawChart () {
            const margin = { top: 20, right: 30, bottom: 60, left: 40 };
            const container = this.$refs.chart;
            const width = container.clientWidth - margin.left - margin.right;
            const height = 300 - margin.top - margin.bottom;  // 높이는 고정해도 되고, 비율로 바꿔도 됨

            const svg = d3.select(container)
                           .append('svg')
                           .attr('width', '100%')
                           .attr('height', height + margin.top + margin.bottom)
                           .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
                           .attr('preserveAspectRatio', 'xMidYMid meet')
                           .append('g')
                           .attr('transform', `translate(${margin.left},${margin.top})`);

            // 3일치 바다 수온 샘플 데이터 (3시간 간격)
            const hours = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23];
            const suonDataSet = [
                {
                    name: '그저깨',
                    color: '#d2d2d2',
                    values: [19.8, 20.3, 20.7, 21.4, 21.9, 22.8, 23.1, 23.7, 23.9, 23.5, 23.0, 22.5]
                },
                {
                    name: '어저깨',
                    color: '#f49674',
                    values: [20.1, 20.5, 21.0, 21.8, 22.3, 23.0, 23.5, 24.1, 24.3, 24.0, 23.5, 23.0]
                },
                {
                    name: '오늘',
                    color: '#334372',
                    values: [20.4, 20.9, 21.2, 22.1, 22.8, 23.5]
                },
            ];


            // x축
            const x = d3.scalePoint()
                         .domain(hours)
                         .range([0, width]);

            const xAxis = svg.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(
                d3.axisBottom(x)
                   .tickFormat(d => `${d}시`)
            );

            // x축 스타일 바꾸기
            xAxis.select('path')    // 축 선(도메인 라인)
                  .attr('stroke', '#e9e9ec');  // 원하는 색으로 변경 (예: 주황)

            xAxis.selectAll('line')  // 눈금선
                  .attr('stroke', 'none'); // 연한 주황

            xAxis.selectAll('text')  // 눈금 텍스트
                  .attr('fill', '#999');  // 토마토 색


            // y축
            const allValues = this.$store.state.suonDataSet.flatMap(d => d.values);
            const y = d3.scaleLinear()
                         .domain([Math.floor(d3.min(allValues)) - 1, Math.ceil(d3.max(allValues)) + 1])
                         .range([height, 0]);

            const yAxis = svg.append('g').call(d3.axisLeft(y));

            // y축 스타일 바꾸기
            yAxis.select('path')
                  .attr('stroke', 'none');  // 도메인 라인 파란색

            yAxis.selectAll('line')
                  .attr('stroke', 'none');  // 연한 파란색 눈금선

            yAxis.selectAll('text')
                  .attr('fill', '#999');    // 텍스트 색


            // 라인 생성기
            const line = d3.line()
                            .defined(d => d !== null)  // null 값은 무시
                            .x((d, i) => x(hours[i]))
                            .y(d => y(d));

            // 선 + 점
            this.$store.state.suonDataSet.forEach(series => {
                svg.append('path')
                    .datum(series.values)
                    .attr('fill', 'none')
                    .attr('stroke', series.color)
                    .attr('stroke-width', series.name === '오늘' ? 3 : 2)
                    .attr('d', line);

                svg.selectAll(`.dot-${series.name}`)
                    .data(series.values)
                    .enter()
                    .append('circle')
                    .attr('cx', (d, i) => x(hours[i]))
                    .attr('cy', d => y(d))
                    .attr('r', 4)
                    .attr('r', d => {
                        return series.name === '오늘' && series.values.indexOf(d) === series.values.length - 1 ? 3 : 4 ;
                    })
                    .attr('fill', series.color)
                    // .attr('stroke', series.name === '오늘' ? series.color : 'none') // 오늘만 테두리 보이게
                    // .attr('fill', series.name === '오늘' ? 'white' : series.color)
                    .attr('stroke-width', d => {
                        if (series.name === '오늘' && series.values.indexOf(d) === series.values.length - 1) {
                            return 1;
                        }
                        return series.name === '오늘' ? 2 : 'none' ;
                    })
                    .attr('stroke', d => {
                        if (series.name === '오늘' && series.values.indexOf(d) === series.values.length - 1) {
                            return '#fff';
                        }
                        return series.name === '오늘' ? series.color : 'none' ;
                    })
                    .attr('fill', d => {
                        if (series.name === '오늘' && series.values.indexOf(d) === series.values.length - 1) {
                            return '#334372';  // 마지막 포인트만 골드색 (원하는 색으로 변경 가능)
                        }
                        return series.name === '오늘' ? 'white' : series.color;
                    });
                // 오늘 마지막 3개 데이터 텍스트 표시
                if (series.name === '오늘') {
                    const last3Indices = [series.values.length - 3, series.values.length - 2, series.values.length - 1];
                    last3Indices.forEach(i => {
                        const text = svg.append('text')
                            .attr('x', x(hours[i]))
                            .attr('y', y(series.values[i]) - (i === series.values.length - 1 ? 20 : 12))  // 마지막은 5 더 올림
                            .attr('text-anchor', 'middle')
                            .attr('font-size', i === series.values.length - 1 ? '16px' : '14px') // 마지막만 크게
                            .attr('font-weight', i === series.values.length - 1 ? '700' : '600')
                            .attr('fill', series.color)
                            .text(series.values[i]);  // 소수점 1자리까지
                        // 마지막 포인트(i가 마지막 인덱스일 경우)에만 박스 추가
                        if (i === series.values.length - 1) {
                            const bbox = text.node().getBBox(); // 텍스트 크기 측정

                            const rect = svg.append('rect') // 텍스트 뒤에 삽입
                                .attr('x', bbox.x - 10) // 여백 살짝
                                .attr('y', bbox.y - 2)
                                .attr('width', bbox.width + 20)
                                .attr('height', bbox.height + 4)
                                .attr('stroke', series.color)
                                .attr('stroke-width', 1)
                                .attr('fill', '#fff')
                                .attr('rx', 10)
                                .attr('ry', 10);
                            rect.lower();
                            // 선 추가 (포인트 → 텍스트)
                            svg.append('line')
                                .attr('x1', x(hours[i]))
                                .attr('y1', y(series.values[i])) // 포인트 위치
                                .attr('x2', x(hours[i]))
                                .attr('y2', bbox.y + bbox.height + 2) // 텍스트 아래 중앙
                                .attr('stroke', series.color)
                                .attr('stroke-width', 1);
                            // 포인트 → x축까지 점선
                            svg.append('line')
                                .attr('x1', x(hours[i]))
                                .attr('y1', y(series.values[i]))
                                .attr('x2', x(hours[i]))
                                .attr('y2', height)
                                .attr('stroke', series.color)
                                .attr('stroke-width', 1)
                                .attr('opacity', 0.5)
                                .attr('stroke-dasharray', '4,2');  // <- 요게 포인트!

                            // 마지막 포인트에 동그라미 추가
                            const circle = svg.append('circle')
                                .attr('cx', x(hours[i]))
                                .attr('cy', y(series.values[i]))
                                .attr('r', 10)
                                .attr('fill', 'rgba(46,66,113, 0.2)')
                                .attr('stroke', 'rgba(46,66,113, 0.6)')
                                .attr('stroke-width', 1);

                            circle.lower();
                        }
                    });
                }
            });

            // 오늘 데이터의 마지막 인덱스
            const firstDay = this.$store.state.suonDataSet.find(d => d.name === '오늘');
            const lastIndex = firstDay.values.length - 1;

            // 해당 위치의 x 좌표 구하기
            const lastX = x(hours[lastIndex]);

            // x축 간격 계산
            const bandWidth = (x(hours[1]) - x(hours[0])) || 20;

            // 배경 사각형 추가
            svg.append('rect')
                .attr('x', lastX - bandWidth / 2)
                .attr('y', 0)
                .attr('width', bandWidth)
                .attr('height', height)
                .attr('fill', '#f8f8fc')  // 연한 회색
                .lower(); // 배경 뒤로



            // 범례 그룹 추가 (svg 바깥 아래쪽에 붙이기)
            const legend = svg.append('g')
                .attr('transform', `translate(0, ${height + margin.bottom - 30})`);  // 차트 아래 약간 여백 위치
            const legendItemWidths = [120, 80 , 80];  // 1번째는 넓게, 2·3번째는 작게
            let offsetX = 0;

            // '오늘'을 맨 앞으로 정렬한 새로운 배열 생성
            const order = { '오늘': 0, '어저깨': 1, '그저깨': 2 };

            const sortedData = this.$store.state.suonDataSet.slice().sort((a, b) => {
                return (order[a.name] ?? 99) - (order[b.name] ?? 99);
            });

            sortedData.forEach((series, i) => {
                const legendGroup = legend.append('g')
                .attr('transform', `translate(${offsetX}, 0)`);

                // 색상 동그라미로 변경
                legendGroup.append('circle')
                            .attr('cx', 7.5)       // 반지름 기준으로 중앙 맞춤 (15/2 = 7.5)
                            .attr('cy', 7.5)
                            .attr('r', 4)          // 반지름 7px
                            .attr('fill', series.color)
                            .attr('stroke-width', 1);

                let displayText = '';
                const today = new Date();
                if (series.name === '오늘') {
                    displayText = `오늘 (${this.formatDate(today)})`;
                } else if (series.name === '어저께') {
                    let yesterday = new Date(today);   // 여기서 new Date(today)로 복사
                    yesterday.setDate(today.getDate() - 1);
                    displayText = `어저께`;
                } else if (series.name === '그저께') {
                    let dayBeforeYesterday = new Date(today);  // 복사 필수!
                    dayBeforeYesterday.setDate(today.getDate() - 2);
                    displayText = `그저께`;
                } else {
                    displayText = series.name;
                }

                // 텍스트
                legendGroup.append('text')
                            .attr('x', 20)
                            .attr('y', 12)
                            .text(displayText)
                            .attr('font-size', '12px')
                            .attr('font-weight', series.name === '오늘' ? 'bold' : 'normal')
                            .attr('fill', series.name === '오늘' ? series.color : '#999')

                offsetX += legendItemWidths[i] || 120;  // 1번째만 넓게
            });
        }
    }
};
</script>
<style>
.chart-container {
    width: 100%;
    overflow-x: auto;

    svg {
        text {
            font-family: helvetica, 'Apple SD Gothic Neo', helvetica, '나눔바른고딕 옛한글', 'NanumBarunGothic YetHangul', sans-serif;
        }
    }
}
</style>