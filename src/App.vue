<template>
    <div id="app">
        <Header v-if="$route.path !== '/swimvirus'" /> <!-- 헤더 컴포넌트 추가 -->
        <div class="container mobile-fixed" style="margin-top:10px;">
            <!--<ins class="kakao_ad_area"-->
            <!--     data-ad-unit = "DAN-96KlXSg1Q3cbC0R1"-->
            <!--     data-ad-width = "320"-->
            <!--     data-ad-height = "50"></ins>-->
            <!--<div class="d-flex gap-2 p-1">-->
            <!--        <button-->
            <!--            type="submit" class="btn btn-dark w-100 mb-1" style="font-size: 12px;"-->
            <!--            @click="$router.push({ path: '/basu', query: { spotid: '42897' } })"-->
            <!--        >-->
            <!--            송정날씨-->
            <!--        </button>-->
            <!--        <button-->
            <!--            type="submit" class="btn btn-dark w-100 mb-1" style="font-size: 12px;"-->
            <!--            @click="$router.push({ path: '/basu', query: { spotid: '218644' } })"-->
            <!--        >-->
            <!--            광안리날씨-->
            <!--        </button>-->
            <!--        <button-->
            <!--            type="submit" class="btn btn-dark w-100 mb-1" style="font-size: 12px;"-->
            <!--            @click="$router.push({ path: '/basu', query: { spotid: '5752427' } })"-->
            <!--        >-->
            <!--            해운대날씨-->
            <!--        </button>-->
            <!--    </div>-->

            <!--<button type="submit" class="btn btn-dark w-100 mb-1" style="font-size: 12px;" @click="$router.push('/bear')" >-->
            <!--    북극곰 축제 성공적 완료 (영상은 DB으로 영상 주소전달드림)-->
            <!--</button>-->

            <!--<button type="submit" class="btn btn-dark w-100 mb-1" style="font-size: 12px;" @click="$router.push('/cheering')" >-->
            <!--    통영 트라이에슬론 응원게시판-->
            <!--</button>-->
            <!--<button type="submit" class="btn btn-dark w-100 mb-1" style="font-size: 12px;" @click="$router.push('/cheering_changwon')" >-->
            <!--    창원클럽대항전 응원게시판-->
            <!--</button>-->
            <!--<button type="submit" class="btn btn-primary w-100 mb-1" style="font-size: 12px;" @click="$router.push('/open_water')" >
                11월 24일 송정 바수 갈사람
            </button>
            -->
            <!--<button type="submit" class="btn btn-danger w-100 mb-1" style="font-size: 12px;" @click="$router.push('/event')" >-->
            <!--    12월 21일 토요일 오후 5시 동래 (장소 DM문의)-->
            <!--</button>-->

            <!--<button type="submit" class="btn btn-warning w-100 mb-1" style="font-size: 12px;" @click="$router.push('/training')" >-->
            <!--    보노보노 김해대회 밥값 걷으께예-->
            <!--</button>-->
            <!--<button type="submit" class="btn btn-info w-100 mb-3" style="font-size: 12px;" @click="$router.push('/goods_swimwear')" >-->
            <!--    보노보노 수영복 11월 14일 신청마감-->
            <!--</button>-->
            <router-view />
        </div>
        <Footer v-if="$route.path !== '/swimvirus'" /> <!-- 헤더 컴포넌트 추가 -->
    </div>
</template>

<script>
import Header from "@/components/HeaderComponent.vue"; // 헤더 컴포넌트 import
import Footer from "@/components/FooterComponent.vue"; // 헤더 컴포넌트 import

export default {
  name: "App",
  components: {
      Header, Footer
  },
  data() {
    return {
      nav: false,
    };
  },
    mounted(){
        this.$nextTick(() => {
            if(window.KakaoAdFit){
                window.KakaoAdFit.reload(); // 광고 다시 로딩
            }
        });
    },
};
</script>

<style src="./styles/default.scss" lang="scss" />
