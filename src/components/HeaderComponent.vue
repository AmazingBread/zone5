<template>
    <div>
        <div class="header">
            <router-link to="/">
                <h1>
                    <img src="@/assets/image/logo.png" style="height: 30px;" alt="로고">
                </h1>
            </router-link>
        </div>
        <!--<div class="menu">-->
        <!--    <ul>-->
        <!--        <li @click="$router.push('/about')">뭐하는덴고?</li>-->
        <!--        <li @click="$router.push('/offline')">정기모임</li>-->
        <!--        <li @click="$router.push('/lightning')">번개모임</li>-->
        <!--        <li @click="$router.push('/competition')">대회</li>-->
        <!--        <li @click="$router.push('/buy')">공동구매</li>-->
        <!--    </ul>-->
        <!--</div>-->
        <!--<div class="container mobile-fixed" style="margin: 10px auto 0 auto;">-->
        <!--    <a href="https://link.coupang.com/a/cSPWrq" target="_blank">-->
        <!--        <img src="@/assets/image/안티포그.jpg" style="width: 100%" class="img-fluid" alt="썸네일" />-->
        <!--    </a>-->
        <!--    <banner />-->
        <!--</div>-->
    </div>
</template>
<script>
// import banner from "@/components/Banner.vue"
import Footer from "@/components/FooterComponent.vue";
export default {
    name: "HeaderComponent", // 컴포넌트 이름 변경
    components: {
        // banner
    },
    data(){
        return {
            url: 'https://www.khoa.go.kr/api/oceangrid/tidalBuTemp/search.do', // 실제 API 주소로 교체
            // url: 'https://www.khoa.go.kr/api/oceangrid/tideObsTemp/search.do', // 실제 API 주소로 교체
            ServiceKey: 'f2IQxtgNdBXnC59gCgwFQ==',
            ObsCode: 'TW_0062', //해운대
            //ObsCode: 'HB_0002', //고리
            // ObsCode: 'DT_0005', //부산
        };
    },
    mounted(){
        this.getTidalBuTemp()
    },
    methods:{
        formatDate(date) {
            // 2025-05-28 -> 20250528 형식
            return date.toISOString().slice(0, 10).replace(/-/g, '');
        },
        getTidalBuTemp(){

            let url = 'https://www.khoa.go.kr/api/oceangrid/tidalBuTemp/search.do';

            // 현재 날짜를 YYYYMMDD 형식으로 변환
            // let today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
            //
            // let params = {
            //     params: {
            //         ServiceKey: 'f2IQxtgNdBXnC59gCgwFQ==',
            //         ObsCode: 'TW_0062',
            //         Date: today,
            //         ResultType: 'json'
            //     }
            // };

            let today = new Date();
            let yesterday = new Date();
            let dayBefore = new Date(); // 또는 let twoDaysAgo = new Date();

            today.setDate(today.getDate());
            yesterday.setDate(today.getDate() - 1);
            dayBefore.setDate(today.getDate() - 2);

            let todayStr = this.formatDate(today);
            let yesterdayStr = this.formatDate(yesterday);
            let dayBeforeStr = this.formatDate(dayBefore); // 또는 twoDaysAgoStr

            let axiosCalls = [todayStr, yesterdayStr, dayBeforeStr].map(dateStr => {
                return this.$axios.get(this.url, {
                    params:{
                        ServiceKey:this.ServiceKey,
                        ObsCode   :this.ObsCode,
                        Date      :dateStr,
                        ResultType:'json'
                    }
                });
            });
            let targetHours = ['01', '03', '05', '07', '09', '11', '13', '15', '17', '19', '21', '23'];
            this.$axios.all(axiosCalls).then(
                this.$axios.spread((res1, res2, res3) => {
                    const responses = [res3, res2, res1]; // 순서: 그저께, 어제, 오늘
                    const suonDataSet = this.$store.state.suonDataSet;

                    responses.forEach((res, idx) => {
                        let values = [];
                        if(res.data && res.data.result && res.data.result.data.length > 0){
                            targetHours.forEach(hour => {
                                /// 해당 시간대 데이터 필터링 (분은 00분만 체크)
                                let entry = res.data.result.data.find(entry => {
                                    let entryHour = entry.record_time.slice(11, 13);
                                    return entryHour === hour;  // 분 체크 없이 시간만 비교
                                });
                                if(entry){
                                    values.push(parseFloat(entry.water_temp));
                                }
                            });
                            // 오늘 데이터 (idx === 2)인 경우 마지막 데이터 별도 저장
                            if(idx === 2){
                                const latestData = res.data.result.data[res.data.result.data.length - 1];
                                this.$store.state.waterTempData = parseFloat(latestData.water_temp);
                                this.$store.state.waterRecordTime = latestData.record_time.slice(0, 16);
                            }
                        }
                        suonDataSet[idx].values = values;
                    });
                console.log(this.$store.state.suonDataSet)
                })
            )
            .catch((error) => {
                console.error("API 요청 실패:", error);
            });
        }
    }
}
</script>
<style lang="scss">
.menu {
    text-align: center; // ul 자체를 중앙 정렬
    border-bottom: 1px solid #ccc;
    ul {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 5px; // 항목 간 간격

        li {
            cursor: pointer;
            font-weight: 600;
            border-radius: 5px;
            transition: all 0.3s ease;
            padding:10px 0;
            &:hover {
                transform: translateY(-2px);
            }
        }
    }
}

</style>