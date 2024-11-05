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
            <button type="submit" class="btn btn-dark w-100 mb-1" style="font-size: 12px;" @click="$router.push('/bear')" >
                북극곰 축제 갈사람 요요 다붙으라
            </button>
            <button type="submit" class="btn btn-dark w-100 mb-1" style="font-size: 12px;" @click="$router.push('/cheering')" >
                통영 트라이에슬론 응원게시판
            </button>
            <button type="submit" class="btn btn-dark w-100 mb-1" style="font-size: 12px;" @click="$router.push('/cheering_changwon')" >
                창원클럽대항전 응원게시판
            </button>
            <!--<a-->
            <!--    href="/chang.xls"-->
            <!--    target="_blank"-->
            <!--    class="btn btn-danger w-100 mb-1"-->
            <!--    style="font-size: 12px; display: block; text-align: center;"-->
            <!--    download="창원대회_대진표.xls"-->
            <!--&gt;창원대회 대진표 확인바람 [다운로드]</a>-->
            <a
                href="/kim.xlsx"
                target="_blank"
                class="btn btn-dark w-100 mb-1"
                style="font-size: 12px; display: block; text-align: center;"
                download="김해대회_대진표.xlsx"
            >김해대회 대진표 확인바람 [다운로드]</a>
            <button type="submit" class="btn btn-primary w-100 mb-3" style="font-size: 12px;" @click="$router.push('/open_water')" >
                바수 갈사람 요요 다붙으라
            </button>
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
