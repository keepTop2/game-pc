<template>
    <div class="bg-color">
        <div class="box">
            <p class="text">
                {{ t('home_page_footerTips') }}
            </p>
            <n-divider />
            <div class="imgs">
                <Imgt src="/img/footer/f-1.webp" alt="f-1" />
                <Imgt src="/img/footer/f-2.webp" alt="f-2" />
                <Imgt src="/img/footer/f-3.webp" alt="f-3" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts" name="footer">
import { useI18n } from "vue-i18n";
import Imgt from '@/components/Imgt.vue';

const { t } = useI18n();
</script>
<style lang='less' scoped>
.bg-color {
    width: 100%;
    margin: 0 auto;
    padding: 35px 0 50px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), #2D1769;
    box-shadow: inset 0px 0px 4px #455069;
    font-size: 16px;

    >.box {
        width: 1200px;
        margin: 0 auto;

        >.text {
            text-align: center;
            color: #fff;
        }
    }

    .imgs {
        display: flex;
        justify-content: space-between;

        >img {
            width: 336px;
            height: 108px;
        }

    }
}
</style>
