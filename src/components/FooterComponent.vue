<template>
    <div class="footer mobile-fixed">
        <!--<Banner v-if="this.$route.path !== '/0330'"/>-->
        <!--<div style="margin:10px 0; padding: 10px 0;">-->
        <!--    <a href="https://www.instagram.com/bonobono_moolbono" target="_blank" class="instagram-link" style="text-decoration-line: none; ">-->
        <!--        <img src="@/assets/image/insta.png" alt="Instagram Icon" style="width:20px" />-->
        <!--    </a>-->
        <!--</div>-->
        <div class="footer-links" style="margin-bottom: 5px;">
            <a href="/privacy.html" target="_blank" style="text-decoration: none; color: #0066cc;">개인정보 처리방침</a>
        </div>
        <div class="copyright">
            © 2025 ZONE5. All rights reserved.
        </div>
    </div>
</template>

<script>
import Banner from "@/components/Banner.vue";

export default {
    name: "FooterComponent",
    components: {
        // Banner
    },
    data() {
        return {
        };
    },
};
</script>