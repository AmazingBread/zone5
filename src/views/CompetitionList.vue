<template>
    <div>
        <img src="@/assets/image/bear.png" class="img-fluid" alt="썸네일" />
        <div class="col-12">
            <div class="col-12 p-1" >
                <div
                    class="boxstyle3 diary"
                    style="font-size: 30px; height: 250px;"
                    @click="$router.push('/swimming_competition')"
                >
                    <p>📢 11월 사직대회 📢</p>
                    <p>
                        2025.11.30<br>
                        사직수영장
                    </p>
                </div>
            </div>
        </div>
        <!--<div class="col-12">-->
        <!--    <div class="col-12 p-1" >-->
        <!--        <div-->
        <!--            class="boxstyle2 diary"-->
        <!--            style="font-size: 30px; height: 250px;"-->
        <!--            @click="$router.push('/swimming_competition2')"-->
        <!--        >-->
        <!--            <p>📢 양산대회 📢</p>-->
        <!--            <p>-->
        <!--                2025.11.02<br>-->
        <!--                양산중앙국민체육센터-->
        <!--            </p>-->
        <!--        </div>-->
        <!--    </div>-->
        <!--</div>-->
    </div>
</template>

<style lang="scss">
</style>
<script setup lang="ts">
</script>