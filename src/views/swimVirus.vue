<template>
    <div class="comfy-page">
        <!-- 로고 -->
        <div class="logo">
            <img src="@/assets/sv/sv_transparent3.png" alt="Logo" />
        </div>
        <banner />
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-3070394175069308"
             data-ad-slot="3143108709"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>

        <!-- 제목/부제목 -->
        <!--<h1 class="title">-->
        <!--    수영의 즐거움이 <span class="highlight">바이러스</span>처럼 퍼진다, 스윔바이러스-->
        <!--</h1>-->
        <!--<p class="subtitle">-->
        <!--    한 번 접하면 멈출 수 없는 수영 열정과 정보!-->
        <!--</p>-->
        <a href="https://link.coupang.com/a/cSPWrq" target="_blank" class="mb-3" style="border:1px solid #fff;">
            <img src="@/assets/image/안티포그.jpg" style="width: 100%" class="img-fluid" alt="썸네일" />
        </a>
        <a href="https://smartstore.naver.com/pobas/products/8079602587" target="_blank" class="mb-3" style="border:1px solid #fff;">
            <img src="@/assets/image/링부이.jpg" style="width: 100%" class="img-fluid" alt="썸네일" />
        </a>

        <!--<iframe-->
        <!--    src="https://ads-partners.coupang.com/widgets.html?id=914234&template=carousel&trackingCode=AF5244456&subId=&width=680&height=140&tsource="-->
        <!--    style="margin-bottom: 15px; width: 100%; max-width: 680px; height: auto; aspect-ratio: 680 / 140; border: 0; display: block;"-->
        <!--    scrolling="no"-->
        <!--    referrerpolicy="unsafe-url"-->
        <!--    browsingtopics>-->
        <!--</iframe>-->

        <!-- 링크 카드 리스트 -->
        <div class="link-list">
            <!--<a href="https://link.coupang.com/a/cOWlLx" class="link-card"  target="_blank" >-->
            <!--    <div class="link-info">-->
            <!--        <span class="link-title">컴피백 쿠팡 바로가기</span>-->
            <!--    </div>-->
            <!--</a>-->
            <!--<a href="https://link.coupang.com/a/cPXRLF" class="link-card"  target="_blank" >-->
            <!--    <div class="link-info">-->
            <!--        <span class="link-title">스피도 습식타올 바로가기</span>-->
            <!--    </div>-->
            <!--</a>-->
            <a href="https://youtube.com/@swimvirus?si=OxZIATmfMWDDUd3L" class="link-card"  target="_blank" >
                <div class="link-info">
                    <span class="link-title">스윔바이러스 유튜브 바로가기</span>
                </div>
            </a>
            <a href="https://www.instagram.com/swimvirus_/" class="link-card"  target="_blank" >
                <div class="link-info">
                    <span class="link-title">스윔바이러스 인스타그램 바로가기</span>
                </div>
            </a>
        </div>
        <p class="contact-note">
            문의는 <a href="https://www.instagram.com/swimvirus_/" target="_blank">인스타그램 DM</a>으로 해주세요.
        </p>
    </div>
</template>
<script>
import banner from "@/components/Banner.vue"
export default {
    name: "SwimVirus",
    data(){
        return {

        };
    },
    components: {
        banner
    },
    mounted() {
        document.body.style.backgroundColor = "#000000"; // 특정 페이지 body black
        this.$nextTick(() => {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.warn('AdSense error:', e);
            }
        });
    },
    beforeDestroy() {
        document.body.style.backgroundColor = ""; // 복원
    },
    computed: {
    },
    methods:{
    }
};
</script>
<style lang="scss" scoped>
.comfy-page {
    min-height: 100vh;
    background-color: #000000; // 보라색
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;

    .logo {
        margin-bottom: 5.5rem;
        img {
            width: 10rem;
        }
    }

    .title {
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 0.5rem;

        .highlight {
            color: #f6e05e; // 노란색
        }
    }

    .subtitle {
        font-size: 0.875rem;
        text-align: center;
        margin-bottom: 1.5rem;
    }

    .link-list {
        width: 100%;
        max-width: 24rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 0 auto;

        .link-card {
            display: flex;
            align-items: center;
            text-decoration: none;
            background-color: #fff;
            color: #000;
            border-radius: 2rem;
            padding: 1rem 2rem;
            transition: transform 0.2s, box-shadow 0.2s;
            &:hover {
                transform: translateY(-3px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            }
            .link-info {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                color: #000 !important;
                img {
                    width: 5rem;
                }

                .link-title {
                    font-weight: 500;
                    font-size: 1rem;
                }
            }

            .link-menu {
                background: none;
                border: none;
                color: #718096;
                font-size: 1.25rem;
                cursor: pointer;
            }
        }
    }
    .contact-note {
        margin-top: 2rem;
        font-size: 0.875rem;
        color: #f6e05e; // 노란색 포인트
        text-align: center;

        a {
            color: #f6e05e;
            text-decoration: underline;
            font-weight: 600;

            &:hover {
                color: #fff;
            }
        }
    }
}
</style>