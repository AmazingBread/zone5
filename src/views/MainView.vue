<template>
<main class="mobile-home">
<section class="intro"><span class="eyebrow">ZONE5 SWIM TEAM</span><h1>함께 훈련하고,<br>더 멀리 나아가요.</h1><p>우리의 다음 훈련을 확인해 보세요.</p><router-link to="/zone5" class="cta">훈련 신청하기 <span aria-hidden="true">↗</span></router-link><div class="home-links intro-event"><router-link to="/fit_diary_zone_five" class="event"><span><small>ZONE5 × 보노보노</small><strong>마일리지 이벤트</strong><span class="description">꾸준한 운동을 기록해 보세요</span></span><span aria-hidden="true">↗</span></router-link></div></section>
<MyCalendar />
<nav class="home-links" aria-label="회원신청"><router-link to="/signup"><span><small>JOIN THE TEAM</small><strong>ZONE5 회원신청</strong></span><span aria-hidden="true">↗</span></router-link></nav>
</main>
</template>
<script>
import MyCalendar from '@/components/MyCalendar.vue';
export default { components: { MyCalendar } };
</script>
<style scoped>
.mobile-home { max-width:560px; margin:0 auto; padding:8px 10px 24px; color:#18201c; text-align:left; }
.intro { padding:12px 0 26px; } .eyebrow { font-size:11px; font-weight:800; letter-spacing:2px; color:#657065; }
.intro h1 { margin:12px 0; font-size:clamp(28px,7.5vw,36px); font-weight:800; letter-spacing:-1.5px; line-height:1.3; }
.intro p { color:#697269; font-size:14px; margin-bottom:22px; }
.cta { display:flex; justify-content:space-between; align-items:center; min-height:56px; padding:0 20px; background:#c6f431; border-radius:14px; color:#18201c; font-size:16px; font-weight:800; text-decoration:none; }
.cta span { font-size:24px; } .home-links { display:grid; gap:12px; margin-top:24px; }
.intro-event { margin-top:12px; }
.home-links a { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:20px; border:1px solid #e2e7de; border-radius:16px; text-decoration:none; color:#18201c; }
.home-links a > span:first-child { display:grid; gap:6px; } .home-links small { font-size:10px; letter-spacing:1.2px; color:#687268; font-weight:700; }
.home-links strong { font-size:17px; } .home-links .event { background:#202b24; color:white; border-color:#202b24; } .home-links .event small { color:#c6f431; }
.description { font-size:12px; color:#c2ccc4; } a:focus-visible { outline:3px solid #537513; outline-offset:4px; }
</style>
