<template>
    <div>
        <div class="col-12 mb-3">
            <div class="thumbnail-box">
                <img src="@/assets/image/요헤미티.png" class="img-fluid" alt="썸네일" @click="$router.push('/group_buying')"/>
            </div>
        </div>
        <div class="col-12 mb-3">
            <div class="thumbnail-box">
                <img src="@/assets/image/수영복_메인.jpg" class="img-fluid" alt="썸네일" @click="$router.push('/goods_swimwear2')"/>
                <!--<p class="text-center mt-2 text-primary">❤️❤️❤️ 물보노 2025 NEW 수영복 😎😎😎</p>-->
            </div>
        </div>
        <div class="col-12 mb-3">
            <div class="thumbnail-box">
                <img src="@/assets/image/tee_main.jpg" class="img-fluid" alt="썸네일" @click="$router.push('/goods_tee')"  style="border:1px solid #333"/>
                <!--<p class="text-center mt-2 text-danger">❤️❤️❤️잔여수량 판매 20,000원😎😎😎</p>-->
            </div>
        </div>
    </div>
</template>

<style lang="scss">
</style>
<script setup lang="ts">
</script>