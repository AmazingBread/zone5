<template>
    <div>
        <ins class="kakao_ad_area"
             data-ad-unit = "DAN-96KlXSg1Q3cbC0R1"
             data-ad-width = "320"
             data-ad-height = "50"></ins>
    </div>
    <!--<div>-->
    <!--    <div class="post-grid">-->
    <!--        <div class="post-card" v-for="post in posts.slice(0, 10)" :key="post.id">-->
    <!--            <a :href="post.permalink" target="_blank">-->
    <!--                <img :src="post.thumbnail_url || post.media_url" alt="instagram post" />-->
    <!--                &lt;!&ndash;<video v-if="post.media_type === 'VIDEO'" controls>&ndash;&gt;-->
    <!--                &lt;!&ndash;    <source :src="post.media_url" type="video/mp4" />&ndash;&gt;-->
    <!--                &lt;!&ndash;</video>&ndash;&gt;-->
    <!--                &lt;!&ndash;<p class="caption">{{ post.caption }}</p>&ndash;&gt;-->
    <!--            </a>-->
    <!--        </div>-->
    <!--    </div>-->
    <!--    <a class="banner" href="https://www.daangn.com/kr/business-profiles/%EC%8A%A4%EC%9C%84%EB%B0%8D%EB%AA%B0-88f133168d8240cf95b5e44045289b9a/" target="_blank" style="display: block">-->
    <!--        <img src="@/assets/photo/bn00.jpg" alt="스위밍몰" class="ad-image" />-->
    <!--    </a>-->
    <!--    <div class="banner">-->
    <!--        <img src="@/assets/photo/banner1.jpg" alt="원이" class="ad-image" />-->
    <!--    </div>-->
    <!--    <div class="banner">-->
    <!--        <img src="@/assets/photo/banner2.jpg" alt="결혼" class="ad-image" />-->
    <!--    </div>-->
    <!--    <div class="banner">-->
    <!--        <img src="@/assets/photo/banner3.jpg" alt="덕산" class="ad-image" />-->
    <!--    </div>-->
    <!--    <div class="banner">-->
    <!--        <img src="@/assets/photo/banner4.jpg" alt="부찌" class="ad-image" />-->
    <!--    </div>-->
    <!--    &lt;!&ndash;<div class="banner">&ndash;&gt;-->
    <!--    &lt;!&ndash;    <img src="@/assets/photo/banner5.jpg" alt="순대" class="ad-image" />&ndash;&gt;-->
    <!--    &lt;!&ndash;</div>&ndash;&gt;-->
    <!--    <div class="banner">-->
    <!--        <img src="@/assets/photo/banner6.jpg" alt="부동산" class="ad-image" />-->
    <!--    </div>-->
    <!--    <a class="banner" href="https://www.instagram.com/m.i.k.a.makeup/" target="_blank" style="display: block">-->
    <!--        <img src="@/assets/photo/banner7.jpg" alt="메이크업" class="ad-image" />-->
    <!--    </a>-->
    <!--    <div class="banner">-->
    <!--        <img src="@/assets/photo/banner8.jpg" alt="레아" class="ad-image" />-->
    <!--    </div>-->
    <!--</div>-->
</template>

<script>

export default {
    name: "bannerComponent",
    components: {
    },
    data() {
        return {
            posts: []
        };
    },
    mounted() {
        this.$nextTick(() => {
            if (window.KakaoAdFit) {
                window.KakaoAdFit.reload(); // 광고 다시 로딩
            }
        });
        //
        // this.getInsta()
        // // SnapWidget 스크립트 동적으로 추가
        // const script = document.createElement("script");
        // script.src = "https://snapwidget.com/js/snapwidget.js";
        // script.async = true;
        // document.body.appendChild(script);
    },
    methods:{
        getInsta(){
            const user_id = '17841467473584821'
            const token = 'IGAAOgPBtMxydBZAE1wNjVfY3NqcHVVY0R5aEdyTV93UzVpMjFsSkJjTWFEaHdFZAEdFcl9mSC1PT0RzdFhOX2U0OHZAJbmlmZATAzb3I1bEhsWGh1ZA3RNck5UdDR4TDZAsX1JMYm8zcVBXc3hnU0ktWGk5WF8zak1fcHdjWDZADb3lwSQZDZD'
            this.$axios.get('https://graph.instagram.com/v21.0/'+user_id+'/media', {
                params: {
                    fields: 'id,caption,media_type,media_url,permalink,timestamp,thumbnail_url',
                    access_token: token
                }
            })
             .then(res => {
                this.posts = res.data.data;
            })
             .catch(err => {
                console.error('게시물 불러오기 실패했심더:', err);
            });
        }
    }
};
</script>
<style>
.post-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2칸 */
    gap: 5px;
    padding: 16px;
}

.post-card {
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.post-card a {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
}

.post-card img,
.post-card video {
    width: 100%;
    aspect-ratio: 3 / 4.5; /* 정사각형으로 만듬 */
    object-fit: cover;
    display: block;
}

.caption {
    padding: 8px;
    font-size: 14px;
    color: #333;
}

</style>