<template>
    <div class="header">
        <router-link to="/">
            <h1>
                <img src="@/assets/image/n_logo.jpg" style="height: 50px;" alt="로고">
            </h1>
        </router-link>
    </div>
</template>
<script>
export default {
    name: "HeaderComponent", // 컴포넌트 이름 변경
    data(){
        return {
        };
    },
    mounted(){
    },
    methods:{

    }
}
</script>