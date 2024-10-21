<template>
    <div id="app">
        <Header /> <!-- 헤더 컴포넌트 추가 -->
        <div class="container mobile-fixed">
            <button type="submit" class="btn btn-dark w-100 mb-1" style="font-size: 12px;" @click="$router.push('/start')" >10월 27일 8-10시 START CLASS 오픈</button>
            <a
                href="https://www.instagram.com/bonobono_moolbono/"
                target="_blank"
                class="btn btn-dark w-100 mb-3"
                style="font-size: 12px; display: block; text-align: center;"
            >10월 20일 촬영분은 인스타 댓글/DM으로 신청해주세요</a>
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
