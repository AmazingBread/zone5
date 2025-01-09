<template>
    <div id="app">
        <Header /> <!-- 헤더 컴포넌트 추가 -->
        <div class="container mobile-fixed">
        <!--    <a-->
        <!--        href="https://www.instagram.com/bonobono_moolbono/"-->
        <!--        target="_blank"-->
        <!--        class="btn btn-dark w-100 mb-1"-->
        <!--        style="font-size: 12px; display: block; text-align: center;"-->
        <!--    >10월 27일 촬영분은 인스타 댓글/DM으로 신청해주세요</a>-->
            <button type="submit" class="btn btn-dark w-100 mb-1" style="font-size: 12px;" @click="$router.push('/group_buying')" >
                요헤미티 공동구매 마감 오프라인 수령중
            </button>
            <button type="submit" class="btn btn-primary w-100 mb-1" style="font-size: 12px;" >
                보노보노 레대 훈련 설쉬고 합시다
            </button>
            <!--<button type="submit" class="btn btn-dark w-100 mb-1" style="font-size: 12px;" @click="$router.push('/bear')" >-->
            <!--    북극곰 축제 성공적 완료 (영상은 DB으로 영상 주소전달드림)-->
            <!--</button>-->

            <!--<button type="submit" class="btn btn-dark w-100 mb-1" style="font-size: 12px;" @click="$router.push('/cheering')" >-->
            <!--    통영 트라이에슬론 응원게시판-->
            <!--</button>-->
            <!--<button type="submit" class="btn btn-dark w-100 mb-1" style="font-size: 12px;" @click="$router.push('/cheering_changwon')" >-->
            <!--    창원클럽대항전 응원게시판-->
            <!--</button>-->
            <!--<a-->
            <!--    href="/chang.xls"-->
            <!--    target="_blank"-->
            <!--    class="btn btn-danger w-100 mb-1"-->
            <!--    style="font-size: 12px; display: block; text-align: center;"-->
            <!--    download="창원대회_대진표.xls"-->
            <!--&gt;창원대회 대진표 확인바람 [다운로드]</a>-->
            <!--<a-->
            <!--    href="/창원기록.xlsx"-->
            <!--    target="_blank"-->
            <!--    class="btn btn-dark w-100 mb-1"-->
            <!--    style="font-size: 12px; display: block; text-align: center;"-->
            <!--    download="창원기록.xlsx"-->
            <!--&gt;창원대회 보노보노어깨이팀 기록지 [다운로드]</a>-->
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
        <Footer /> <!-- 헤더 컴포넌트 추가 -->
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
};
</script>

<style src="./styles/default.scss" lang="scss" />
<!-- <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style> -->
