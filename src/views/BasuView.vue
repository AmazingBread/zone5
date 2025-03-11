<template>
    <div>
        <h5 style="padding:20px; text-align: center; font-weight: bold;">
            {{ locationName }} 날씨
        </h5>
        <div ref="windyContainer">
            <div
                v-if="widgetVisible"
                key="windyWidget"
                style="padding:10px; border:1px solid #ccc;"
                data-windywidget="forecast"
                data-thememode="white"
                :data-spotid="spotid"
                data-spotname="false"
                data-appid="9464f5098bbf3ed2958248ab7be74b93"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BasuWeather",
    data() {
        return {
            spotid: this.$route.query.spotid || "42897",
            widgetVisible: true
        };
    },
    computed: {
        locationName() {
            return this.spotid === '42897' ? '송정' :
                this.spotid === '5752427' ? '해운대' :
                    this.spotid === '218644' ? '광안리' : '에러';
        }
    },
    watch: {
        "$route.query.spotid": {
            immediate: true,
            handler(newSpotId) {
                if (newSpotId) {
                    this.spotid = newSpotId;
                    this.reloadWidget();
                }
            }
        }
    },
    mounted() {
        this.loadWindyWidget();
    },
    methods: {
        loadWindyWidget() {
            const script = document.createElement("script");
            script.src = "https://windy.app/widgets-code/forecast/windy_forecast_async.js?v153";
            script.async = true;
            script.setAttribute("data-cfasync", "false");
            document.body.appendChild(script);
        },
        reloadWidget() {
            // 기존 위젯 삭제 후 다시 생성
            this.widgetVisible = false;
            this.$nextTick(() => {
                this.widgetVisible = true;
                this.loadWindyWidget();
            });
        }
    }
};
</script>

<style>
#windywidgetheader { display: none; }
</style>
