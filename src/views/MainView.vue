<template>
    <div>
        <div class="col-12 mb-3">
            <div class="thumbnail-box">
                <img src="@/assets/image/엠티메인.jpg" class="img-fluid" alt="썸네일" @click="$router.push('/mt')" style="border:1px solid #333"/>
                <p class="text-center mt-2 text-primary">📣📣9월 13-14 ZOO,어깨탈골,보노보노 연합MT📣📣</p>
            </div>
        </div>
        <div class="col-12 mb-3">
            <div class="thumbnail-box">
                <img src="@/assets/image/바다보노.jpg" style="width: 100%" class="img-fluid" alt="썸네일" @click="$router.push('/open_water')"/>
                <!--<p class="text-center mt-2">📣📣7월 20일 일요일 송정 바수📣📣</p>-->
                <p class="text-center mt-2">📣📣7월 26일 토요일 임랑 바수📣📣</p>
                <p class="text-center mt-2">📣📣7월 27일 일요일 강알리 바수📣📣</p>
            </div>
        </div>
        <!--<div class="mb-3">-->
        <!--    <img src="@/assets/image/참잘했어요_대구.jpg" class="img-fluid" alt="review" />-->
        <!--</div>-->
        <!--<div class="col-12 mb-3">-->
        <!--    <div class="thumbnail-box">-->
        <!--        <img src="@/assets/image/superbono.jpg" class="img-fluid" alt="썸네일" @click="$router.push('/super_bono')"/>-->
        <!--        <p class="text-center mt-2 text-primary">📣📣슈퍼보노 7월 12일 7시 정관 아쿠아드림파크📣📣 </p>-->
        <!--    </div>-->
        <!--</div>-->


        <!--<div class="col-12 mb-3">-->
        <!--    <div class="thumbnail-box">-->
        <!--        <img src="@/assets/image/대구대회.jpg" style="width: 100%" class="img-fluid" alt="썸네일" @click="$router.push('/cheering_deagu')"/>-->
        <!--        <p class="text-center mt-2">📣📣대구 마스터즈 대회📣📣<br>응원 한마디 코너</p>-->
        <!--    </div>-->
        <!--</div>-->
        <!--<div class="col-12 mb-3">-->
        <!--    <div class="thumbnail-box">-->
        <!--        <img src="@/assets/image/이달의보노.jpg" class="img-fluid" alt="썸네일"/>-->
        <!--    </div>-->
        <!--</div>-->

        <div class="col-12 mb-3">
            <div class="thumbnail-box">
                <img src="@/assets/image/수영복_메인.jpg" class="img-fluid" alt="썸네일" @click="$router.push('/goods_swimwear2')"/>
                <p class="text-center mt-2 text-primary">❤️❤️❤️ 물보노 2025 NEW 수영복 😎😎😎</p>
            </div>
        </div>
        <div class="col-12 mb-3">
            <div class="thumbnail-box">
                <img src="@/assets/image/tee_main.jpg" class="img-fluid" alt="썸네일" @click="$router.push('/goods_tee')"  style="border:1px solid #333"/>
                <p class="text-center mt-2 text-danger">❤️❤️❤️물보노 티셔츠 단돈 15,000원!!![마감]😎😎😎</p>
            </div>
        </div>
        <!--<div class="col-12 mb-3">-->
        <!--    <div class="thumbnail-box">-->
        <!--        <img src="@/assets/image/대구장거리.jpg" style="width: 100%" class="img-fluid" alt="썸네일" @click="$router.push('/cheering')"/>-->
        <!--        <p class="text-center mt-2">📣📣대구 장거리 대회📣📣<br>응원 한마디 코너</p>-->
        <!--    </div>-->
        <!--</div>-->
        <!--<div class="col-12 mb-3">-->
        <!--    <div class="thumbnail-box">-->
        <!--        <img src="@/assets/image/gyeongju.png" style="width: 100%" class="img-fluid" alt="썸네일" @click="$router.push('/swimming_competition2')"/>-->
        <!--        <p class="text-center mt-2 text-primary">📣📣팀ZOO 경주 대회 6월 15일 일요일📣📣<br>신청마감 5월 17일 토요일 까지</p>-->
        <!--    </div>-->
        <!--</div>-->
        <!--<div class="col-12 mb-3">-->
        <!--    <div class="thumbnail-box">-->
        <!--        <img src="@/assets/image/daegu.jpg" style="width: 100%" class="img-fluid" alt="썸네일" @click="$router.push('/swimming_competition3')"/>-->
        <!--        <p class="text-center mt-2 text-primary">📣📣팀물보노 대구 대회 6월 21-22일📣📣<br>신청마감 5월 18일 일요일 까지</p>-->
        <!--    </div>-->
        <!--</div>-->
        <!--<div class="col-12 mb-3">-->
        <!--    <div class="thumbnail-box">-->
        <!--        <img src="@/assets/image/early_bono.png" class="img-fluid" alt="썸네일" @click="$router.push('/early_bono')" style="border:1px solid #333"/>-->
        <!--        <p class="text-center mt-2 text-primary">일찍 일어나는 보노들을 위한 훈련<br>📣📣일요일 새벽 훈련팀 모집📣📣</p>-->
        <!--    </div>-->
        <!--</div>-->
        <!--<div class="col-12 mb-3">-->
        <!--    <div class="thumbnail-box">-->
        <!--        <img src="@/assets/image/jinju.png" style="width: 100%" class="img-fluid" alt="썸네일" @click="$router.push('/swimming_competition')"/>-->
        <!--        <p class="text-center mt-2 text-primary">📣📣보노보노 진주시 시장배 수영대회 신청📣📣<br>신청마감 5월 3일 토요일 까지</p>-->
        <!--    </div>-->
        <!--</div>-->


        <!--<div class="mb-3" @click="$router.push('/group_buying2')" style="cursor: pointer;">-->
        <!--    <img src="@/assets/image/yohea.jpg" class="img-fluid" alt="썸네일" />-->
        <!--</div>-->
        <!--<p style="text-align: center; padding: 10px;">-->
        <!--    보노보노 요헤미티 공동구매 6일마감[마감]-->
        <!--    &lt;!&ndash;📣📣요헤미티 할인코드📣📣<br>&ndash;&gt;-->
        <!--    &lt;!&ndash;1. 개인구매 10프로 할인코드 - DM 문의바람<br>&ndash;&gt;-->
        <!--    &lt;!&ndash;2. 단채구매 40프로 이상 할인 - 12월 5일 마감<br>&ndash;&gt;-->
        <!--</p>-->

        <!--<div class="col-12 mb-3">-->
        <!--    <div class="thumbnail-box">-->
        <!--        <img src="@/assets/image/cls03.jpg" class="img-fluid" alt="썸네일" @click="$router.push('/bread')"/>-->
        <!--        <p class="text-center mt-2 text-primary">📣📣빵쌤 평영MSG특강 + 훈련📣📣<br>3월 16일 일요일 11시<br>선착순 30명</p>-->
        <!--    </div>-->
        <!--</div>-->
        <!--<img src="@/assets/image/goods_socks.jpg" class="img-fluid" alt="썸네일" />-->
        <!--<p style="text-align: center; padding: 10px;">-->
        <!--    📣📣보노보노 양마루 준비중📣📣<br>-->
        <!--</p>-->
        <!--<img src="@/assets/image/korea_masters.jpg" class="img-fluid" alt="썸네일" />-->
        <!--<video-->
        <!--    autoplay-->
        <!--    playsinline-->
        <!--    src="/bear.mp4"-->
        <!--    style="width: 100%;"-->
        <!--    controls-->
        <!--&gt;-->
        <!--</video>-->

        <!--<div class="mb-3" @click="$router.push('/bear')" style="cursor: pointer;">-->
        <!--    <img src="@/assets/image/bear_main.jpg" class="img-fluid" alt="썸네일" />-->
        <!--</div>-->
        <!--<div class="mb-3" @click="$router.push('/event')" style="cursor: pointer;">-->
        <!--    &lt;!&ndash;<img src="@/assets/image/cheering_changwon.jpg" class="img-fluid" alt="bear" />&ndash;&gt;-->
        <!--    &lt;!&ndash;<img src="@/assets/image/cheering.png" class="img-fluid" alt="cheering" />&ndash;&gt;-->
        <!--    <img src="@/assets/image/event_main.jpg" class="img-fluid" alt="썸네일" />-->
        <!--    &lt;!&ndash;<img src="@/assets/image/main.gif" class="img-fluid" alt="메인" />&ndash;&gt;-->
        <!--</div>-->
        <!--<br><br><br>-->
        <!--<p>　　＊　'　*　.★　＊　　'＊　　　*<br>＊　　.　'　　+:..:+ 　　　 ' 　＊<br>.　　　＊　　☆☆☆　＊　Merry '　　.<br>　　*　　'　+:...+....:+　　Christmas<br>'　　　　'　☆☆☆☆☆　　　＊　'　　<br>　＊　＊　+:...:+＠+:...:+ 　　　'　　*<br>＊　.　　.☆☆☆☆☆☆☆ ＊　'　*　.<br>　　.　　+:..:+&amp;+:...:+:...:+ <br>　*　.　☆☆☆☆☆☆☆☆☆　＊　'　　　*<br>'　.　　+:...:+♡+:...:+§+:..:+<br>.　*　☆☆☆☆☆☆☆☆☆☆☆　　'　*<br>　　.+:..:+♡+:..:+@+:..:+♡+:..:+<br>　.　　　　　.　▨ 　 '　' ＊　　　　　*<br>　　　.　*　　　　　　.　　　.　　' <br>　 ,·´ ¸,·´`) <br>　(¸,·´　(¸＊♥Merry Christmas &amp;<br>　　　　　　　　　　Happy New Year ♥〃´`)</p>-->
        <!--📣📣 보노보노 송년의밤 신청마감 📣📣<br>-->
        <!--<div style="background: linear-gradient(90deg, #ff9a9e, #fad0c4, #fbc2eb, #f6d365, #fdc830);-->
        <!--  background-size: 400% 400%;-->
        <!--  animation: gradientAnimation 6s ease infinite;-->
        <!--  margin: 10px 0;-->
        <!--  padding: 20px 10px;-->
        <!--  border-radius: 5px;-->
        <!--  color: #000;-->
        <!--  font-weight: bold;">-->
        <!--    1. 날자 : 앞으로 해도 1221 뒤로해도 1221<br>-->
        <!--    2. 장소 : 우리 집앞 동네 말고 동래구 동래<br>-->
        <!--    3. 최종 24인 한정판 굿즈 제공<br>-->
        <!--    4. 드레스코드 : 블랙, 그린, 레드 3종세트 <br>-->
        <!--    5. 파티용품 : 머리띠, 선글라스 개인지참 <br>-->
        <!--</div>-->
        <!--! 문의사항은 인스타그램 댓글/DM 으로 남겨주세요.<br>-->
        <!--<br><br><br><br><br>-->
        <!--<div class="row justify-content-center m-0">-->
        <!--    &lt;!&ndash;<div class="col-6 mb-3" @click="$router.push('/start')">&ndash;&gt;-->
        <!--    &lt;!&ndash;    <div class="thumbnail-box">&ndash;&gt;-->
        <!--    &lt;!&ndash;        <img src="@/assets/image/cls01.jpg" class="img-fluid" alt="썸네일" />&ndash;&gt;-->
        <!--    &lt;!&ndash;        <p class="text-center mt-2 ">START CLASS (종료)<br>10. 27 SUN 08시 - 10시</p>&ndash;&gt;-->
        <!--    &lt;!&ndash;    </div>&ndash;&gt;-->
        <!--    &lt;!&ndash;</div>&ndash;&gt;-->

        <!--    <div class="col-6 mb-3" @click="$router.push('/goods_swimwear')">-->
        <!--        <div class="thumbnail-box">-->
        <!--            <img src="@/assets/image/goods_swimwear.jpg" class="img-fluid" alt="썸네일" />-->
        <!--            <p class="text-center mt-2 ">보노보노 수영복 오픈<br>-->
        <!--                <span class="highlighted-text">(마감)</span>-->
        <!--            </p>-->
        <!--        </div>-->
        <!--    </div>-->
        <!--    <div class="col-6 mb-3" @click="$router.push('/goods_cap')">-->
        <!--        <div class="thumbnail-box">-->
        <!--            <img src="@/assets/image/goods_cap.jpg" class="img-fluid" alt="썸네일" />-->
        <!--            <p class="text-center mt-2 ">보노보노 수모 오픈<br>-->
        <!--                <span class="highlighted-text">(마감)</span>-->
        <!--                </p>-->
        <!--        </div>-->
        <!--    </div>-->
            <!--<div class="col-6 mb-3" >-->
            <!--    <div class="thumbnail-box">-->
            <!--        <img src="@/assets/image/goods_socks.jpg" class="img-fluid" alt="썸네일" />-->
            <!--        <p class="text-center mt-2 ">보노보노 양마루(준비중)</p>-->
            <!--    </div>-->
            <!--</div>-->
            <!--<div class="col-6 mb-3">-->
            <!--    <div class="thumbnail-box" @click="$router.push('/goods')">-->
            <!--        <img src="@/assets/image/goods.jpg" class="img-fluid" alt="굿즈" />-->
            <!--        <p class="text-center mt-2 text-secondary">보노보노 굿즈<br>(수모,키링,티셔츠,양말)</p>-->
            <!--    </div>-->
            <!--</div>-->
            <!--<div class="col-6 mb-3">-->
            <!--    <div class="thumbnail-box">-->
            <!--        <img src="@/assets/image/cls02.jpg" class="img-fluid" alt="장쌤" />-->
            <!--        <p class="text-center mt-2 text-secondary">(준비중)</p>-->
            <!--    </div>-->
            <!--</div>-->
            <!--<div class="col-6 mb-3">-->
            <!--    <div class="thumbnail-box">-->
            <!--        <img src="@/assets/image/cls03.jpg" class="img-fluid" alt="빵쌤" />-->
            <!--        <p class="text-center mt-2 text-secondary">(준비중)</p>-->
            <!--    </div>-->
            <!--</div>-->
            <!--<div class="col-6 mb-3">-->
            <!--    <div class="thumbnail-box">-->
            <!--        <img src="@/assets/image/cls04.jpg" class="img-fluid" alt="썸네일" />-->
            <!--        <p class="text-center mt-2 text-secondary">(준비중)</p>-->
            <!--    </div>-->
            <!--</div>-->
            <!--<div class="col-6 mb-3">-->
            <!--    <div class="thumbnail-box">-->
            <!--        <img src="@/assets/image/cls05.jpg" class="img-fluid" alt="한쌤" />-->
            <!--        <p class="text-center mt-2 text-secondary">(준비중)</p>-->
            <!--    </div>-->
            <!--</div>-->

            <!--<div class="col-6 mb-3">-->
            <!--    <div class="thumbnail-box">-->
            <!--        <img src="@/assets/image/cls07.jpg" class="img-fluid" alt="임쌤" />-->
            <!--        <p class="text-center mt-2 text-secondary">(준비중)</p>-->
            <!--    </div>-->
            <!--</div>-->
            <!--<div class="col-6 mb-3">-->
            <!--    <div class="thumbnail-box">-->
            <!--        <img src="@/assets/image/cls08.jpg" class="img-fluid" alt="썸네일" />-->
            <!--        <p class="text-center mt-2 text-secondary">(준비중)</p>-->
            <!--    </div>-->
            <!--</div>-->
            <!--<div class="col-6 mb-3">-->
            <!--    <div class="thumbnail-box">-->
            <!--        <img src="@/assets/image/cls_etc_01.jpg" class="img-fluid" alt="말쌤" />-->
            <!--        <p class="text-center mt-2 text-secondary">(준비중)</p>-->
            <!--    </div>-->
            <!--</div>-->
            <!--<div class="col-6 mb-3">-->
            <!--    <div class="thumbnail-box">-->
            <!--        <img src="@/assets/image/cls_etc_02.jpg" class="img-fluid" alt="배쌤" />-->
            <!--        <p class="text-center mt-2 text-secondary">(준비중)</p>-->
            <!--    </div>-->
            <!--</div>-->
            <!--<div class="col-6 mb-3">-->
            <!--    <div class="thumbnail-box">-->
            <!--        <img src="@/assets/image/cls_etc_03.jpg" class="img-fluid" alt="감쌤" />-->
            <!--        <p class="text-center mt-2 text-secondary">(준비중)</p>-->
            <!--    </div>-->
            <!--</div>-->
            <!--<div class="col-6 mb-3">-->
            <!--    <div class="thumbnail-box">-->
            <!--        <img src="@/assets/image/cls_etc_04.jpg" class="img-fluid" alt="슥쌤" />-->
            <!--        <p class="text-center mt-2 text-secondary">(준비중)</p>-->
            <!--    </div>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
export default {
    data(){
        return {

        };
    },
    mounted(){
    },
    computed: {
    },
    methods:{
    }
};
</script>

<style>
/* 스타일 추가 (예: form 스타일링) */
</style>
