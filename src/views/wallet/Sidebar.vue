<template>
    <div class="sidebar">
        <p class="pointer" :class="menuActive == i ? 'active' : ''" v-for="(list, i) in state.sideList" :key="i"
            @click="itemClick(list, i)">
            <iconpark-icon :icon-id="list.icon" :color="menuActive == i ? '#fff' : '#8e82c2'"
                size="1rem"></iconpark-icon>
            <span>{{ t(list.name) }}</span>
        </p>
    </div>
</template>
<script lang="ts" setup name="sider">
import { reactive } from "vue";
import { useRouter } from 'vue-router';
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { Page } from '@/store/page';
import { handleOpenLink } from "@/utils/others";
import { useI18n } from "vue-i18n";
import { User } from '@/store/user';
const { t } = useI18n()
const page = Page(pinia);
const userInfo = User(pinia);
const { menuActive, settings } = storeToRefs(page);
const { kefuVisible } = storeToRefs(userInfo);
const router = useRouter();

const state: any = reactive({

    sideList: [
        {
            icon: 'qianbao1',
            name: 'home_page_myWallet',
            url: 'walletInfo',
        },
        {
            icon: 'Group39341',
            name: 'home_page_rechargeRecord',
            url: 'rechargeRecord',
        },
        {
            icon: 'Group39342',
            name: 'home_page_withdrawRecord',
            url: 'withdrawRecord',
        },
        {
            icon: 'Group39343',
            name: 'home_page_accountsRecord',
            url: 'accountsRecord',
        },
        {
            icon: 'Group39344',
            name: 'home_page_betRecord',
            url: 'betRecord',
        },
        {
            icon: 'Group39345',
            name: 'home_page_auditRecord',
            url: 'auditRecord',
        },
        // {
        //     icon: 'diannaodenglujilu1',
        //     name: 'home_page_loginRecord',
        //     url: 'loginRecord',
        // },
        {
            icon: 'diannaodenglujilu1',
            name: 'home_page_waterRecord',
            url: 'waterRecord',
        },
        {
            icon: 'Group39346',
            name: 'home_page_paymentManagement',
            url: 'paymentManagement',
        },
        {
            icon: 'Group39347',
            name: 'home_page_myPromo',
            url: 'myPromo',
        },
        {
            icon: 'youxiang-jihuo',
            name: 'home_page_myEmail',
            url: 'myEmail',
        },
        {
            icon: 'Group39348',
            name: 'home_page_onlineService',
            url: settings.value.serviceTelegram,
        },
        {
            icon: 'Group39349',
            name: 'home_page_securitySettings',
            url: 'securitySettings',
        }
    ],
})

const itemClick = async (item: any, i: number) => {
    await page.setMenuActive(i, item.name)
    let str = item.url.substring(0, 4);
    if (item.name == 'home_page_onlineService') {
        kefuVisible.value = true
        return
    }
    if (str === "http" || str === "www.") {
        handleOpenLink(item.url)
    }
    else {
        router.push(item.url)
    }

}


</script>
<style lang='less' scoped>
.sidebar {
    width: 270px;
    box-sizing: border-box;
    box-shadow: 0 -1px 10px 0 rgba(0, 0, 0, 0.4);
    background-color: var(--c-bg-1);
    padding: 33px 0 0;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    font-size: var(--t-md);
    color: var(--c-inactive);

    >p {
        display: flex;
        position: relative;
        align-items: center;
        transform-style: preserve-3d;
        margin: 0;
        padding: 14px 0 14px 30px;
        cursor: pointer;

        >span {
            margin-left: 5px;
        }
    }

    .active {
        color: #fff;
        background: linear-gradient(to right, #1154ff 0%, #2a7cff 100%) no-repeat;
    }

    .active::after {
        display: block;
        content: '';
        position: absolute;
        width: 6px;
        height: 100%;
        right: -6px;
        background: linear-gradient(to bottom, #fbd03b, #fa7800 67%), no-repeat;
        border-radius: 0 3px 3px 0;
    }
}
</style>
