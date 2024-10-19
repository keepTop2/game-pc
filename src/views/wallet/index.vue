<template>
    <div class="payment">
        <Sidebar />
        <n-flex vertical class="main">
            <!-- 导航 -->
            <navTab v-if="!['/wallet/walletInfo', '/wallet/levelInfo', '/wallet/activity'].includes(route.path)"
                :title="t(`${route.meta.title}`)" />
            <!--            <div class="head">
                <Imgt src="/img/home/back.webp" alt="" @click="router.go(-1)" />
                <span>{{ t('wallet_page_home') }}>{{ t(menuName) }}</span>
            </div>-->
            <router-view></router-view>
        </n-flex>
    </div>
</template>

<script setup lang='ts'>
// import pinia from '@/store/index';
// import { storeToRefs } from 'pinia';
// import { Page } from '@/store/page';
import Sidebar from '@/views/wallet/Sidebar.vue'
import navTab from './components/navTab.vue';
// const page = Page(pinia);
// const { menuName } = storeToRefs(page);
import { useI18n } from "vue-i18n";
import { useRoute } from 'vue-router';
const { t } = useI18n()
const route = useRoute()

</script>

<style lang='less' scoped>
.payment {
    width: 1400px;
    margin: 0 auto;
    padding: 40px 0 40px;
    display: flex;
    flex: 1;
}

.main {
    gap: 0 !important;
    width: 1100px;
    margin-left: 20px;
    color: #fff;

    >.head {
        height: 45px;
        line-height: 45px;
        position: relative;
        text-align: center;
        color: #fff;
        border-radius: 12px;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.39), 0 2px 2px 0 rgba(0, 0, 0, 0.34), 0 5px 3px 0 rgba(0, 0, 0, 0.2), 0 8px 3px 0 rgba(0, 0, 0, 0.06), 0 13px 3px 0 rgba(0, 0, 0, 0.01);
        background-image: radial-gradient(#4c36b3 0%, #3a2786 5%, #3c279a 7%);
        margin-bottom: 30px;
        font-size: 20px;

        >img {
            width: 32px;
            height: 32px;
            position: absolute;
            top: 7px;
            left: 8px;
            cursor: pointer;
        }
    }
}

.title {
    display: flex;
    align-items: center;
    gap: 7.4px;
    padding-top: 19px;
    padding-bottom: 12px;

}

.back_button {
    cursor: pointer;
    width: 19.2px;
    height: 19.2px;
}
</style>
