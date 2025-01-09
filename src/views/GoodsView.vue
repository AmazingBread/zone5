<template>
    <div>
        <!--<div class="mb-3" @click="$router.push('/cheering_changwon')" style="cursor: pointer;">-->
        <!--    <img src="@/assets/image/cheering_changwon.jpg" class="img-fluid" alt="bear" />-->
        <!--    &lt;!&ndash;<img src="@/assets/image/cheering.png" class="img-fluid" alt="cheering" />&ndash;&gt;-->
        <!--    &lt;!&ndash;<img src="@/assets/image/main.gif" class="img-fluid" alt="메인" />&ndash;&gt;-->
        <!--</div>-->
        <div class="row justify-content-center">
            <div class="col-6 mb-3" @click="$router.push('/goods_cap')">
                <div class="thumbnail-box">
                    <img src="@/assets/image/goods_cap.jpg" class="img-fluid" alt="썸네일" />
                    <p class="text-center mt-2 ">보노보노 수모(준비중)</p>
                </div>
            </div>
            <div class="col-6 mb-3" >
                <div class="thumbnail-box">
                    <img src="@/assets/image/goods_socks.jpg" class="img-fluid" alt="썸네일" />
                    <p class="text-center mt-2 ">보노보노 양마루(준비중)</p>
                </div>
            </div>
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
