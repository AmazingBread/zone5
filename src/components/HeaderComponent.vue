<template>
    <div class="header">
        <router-link to="/">
            <h1>
                <img src="@/assets/image/n_logo.jpg" style="height: 50px;" alt="로고">
            </h1>
        </router-link>
    </div>
</template>
<script>
export default {
    name: "HeaderComponent", // 컴포넌트 이름 변경
    data(){
        return {
        };
    },
    mounted(){
        this.getTidalBuTemp()
    },
    methods:{
        getTidalBuTemp() {
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
            today.setDate(today.getDate() - 1); // 하루 전으로 설정
            let formatted = today.toISOString().slice(0, 10).replace(/-/g, '');

            let params = {
                params: {
                    ServiceKey: 'f2IQxtgNdBXnC59gCgwFQ==',
                    ObsCode: 'TW_0062',
                    Date: formatted,
                    ResultType: 'json'
                }
            };


            this.$axios.get(url, params)
            .then(response => {
                if (response.data && response.data.result && response.data.result.data.length > 0) {
                    let latestData = response.data.result.data[response.data.result.data.length - 1];
                    this.$store.state.waterTempData = latestData.water_temp;
                    this.$store.state.waterRecordTime = latestData.record_time.slice(0, 16);
                } else {
                    console.warn("수온 데이터가 없습니다.");
                }
            })
                 .catch(error => {
                console.error("API 요청 오류:", error);
            });
        }

    }
}
</script>