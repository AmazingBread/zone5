<template>
    <div>
        <!--<div class="mb-3">-->
        <!--    <img src="@/assets/image/review.jpg" class="img-fluid" alt="review" />-->
        <!--</div>-->
        <div class="row justify-content-center m-0">
            <div class="col-12 mb-3">
                <div class="thumbnail-box">
                    <img src="@/assets/image/class_park0.jpg" class="img-fluid" alt="썸네일" @click="$router.push('/start')"/>
                    <p class="text-center mt-2 text-primary">📣📣박대한쌤 자유형특강 + 훈련📣📣<br>4월 6일 일요일 2시<br>인원제한없음</p>
                </div>
            </div>
            <div class="mb-3" @click="$router.push('/group_buying')" style="cursor: pointer;">
                <img src="@/assets/image/yohemite.png" class="img-fluid" alt="buying" />
            </div>
            <p style="text-align: center; padding: 10px;">
                요헤미티 공동구매
                <!--📣📣요헤미티 할인코드📣📣<br>-->
                <!--1. 개인구매 10프로 할인코드 - DM 문의바람<br>-->
                <!--2. 단채구매 40프로 이상 할인 - 12월 5일 마감<br>-->
            </p>
            <div class="col-12 mb-3">
                <div class="thumbnail-box">
                    <img src="@/assets/image/ulsan_00.png" style="width: 100%" class="img-fluid" alt="썸네일" @click="$router.push('/swimming_competition')"/>
                    <p class="text-center mt-2 text-primary">📣📣보노보노 울산 남구 대회 신청📣📣<br>3월 18일 신청마감</p>
                </div>
            </div>
            <!--<div class="col-12 mb-3">-->
            <!--    <div class="thumbnail-box">-->
            <!--        <img src="@/assets/image/cls03.jpg" class="img-fluid" alt="썸네일" @click="$router.push('/bread')"/>-->
            <!--        <p class="text-center mt-2 text-primary">📣📣빵쌤 평영MSG특강 + 훈련📣📣<br>3월 16일 일요일 11시<br>선착순 30명</p>-->
            <!--    </div>-->
            <!--</div>-->
        </div>
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
        <div class="row justify-content-center m-0">
            <!--<div class="col-6 mb-3" @click="$router.push('/start')">-->
            <!--    <div class="thumbnail-box">-->
            <!--        <img src="@/assets/image/cls01.jpg" class="img-fluid" alt="썸네일" />-->
            <!--        <p class="text-center mt-2 ">START CLASS (종료)<br>10. 27 SUN 08시 - 10시</p>-->
            <!--    </div>-->
            <!--</div>-->
            <div class="col-6 mb-3" @click="$router.push('/goods_swimwear')">
                <div class="thumbnail-box">
                    <img src="@/assets/image/goods_swimwear.jpg" class="img-fluid" alt="썸네일" />
                    <p class="text-center mt-2 ">보노보노 수영복 오픈<br>
                        <span class="highlighted-text">(마감)</span>
                    </p>
                </div>
            </div>
            <div class="col-6 mb-3" @click="$router.push('/goods_cap')">
                <div class="thumbnail-box">
                    <img src="@/assets/image/goods_cap.jpg" class="img-fluid" alt="썸네일" />
                    <p class="text-center mt-2 ">보노보노 수모 오픈<br>
                        <span class="highlighted-text">(마감)</span>
                        </p>
                </div>
            </div>
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
        </div>
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
