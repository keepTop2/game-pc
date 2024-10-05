<template>
  <div class="sidebar">
    <div class="top_av">
      <Imgt @click="showAvSetting" :src="`/img/head_icons/${roleInfo.head_photo}.webp` || '/img/home/avatar.webp'" class="avatar"
            alt="" title="点击设置"/>
      <n-flex justify="center" class="userName">
        <span :title="userInfo.full_name || userInfo.real_name || roleInfo.nickname">{{ userInfo.full_name || userInfo.real_name || roleInfo.nickname }}</span>
        <span class="txt_vip" :style="{ 'background-image': `url(/img/level/new/v${Number(VIPinfo.current_vip_level)}.webp)` }"></span>
      </n-flex>
    </div>
    <div class="top_wallet">
      <n-flex align="center" justify="space-between" @click="router.push(`/wallet/walletInfo`)">
        <div>
          <div>{{t('home_page_myWallet')}}</div>
          <div class="txt_m">{{ verifyNumberComma(String(roleInfo.money)) }}</div>
        </div>
        <span class="right_arrow"></span>
      </n-flex>
    </div>
    <div class="nav_item">
      <p class="pointer" :class="menuActive == i ? 'active' : ''" v-for="(list, i) in state.sideList" :key="i"
         @click="itemClick(list, i)">
        <iconpark-icon :icon-id="list.icon" :color="menuActive == i ? '#fff' : '#8e82c2'"
                       size="1rem"></iconpark-icon>
        <span>{{ t(list.name) }}</span>
      </p>
    </div>

    <!-- 头像设置 -->
    <avatarSettings v-model:visible="visibleSetting" />
  </div>
</template>
<script lang="ts" setup name="sider">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { Page } from '@/store/page';
import { handleOpenLink } from "@/utils/others";
import { useI18n } from "vue-i18n";
import { User } from '@/store/user';
import { Message } from "@/utils/discreteApi.ts";
import avatarSettings from './components/avatarSettings.vue';
import { verifyNumberComma } from '@/utils/others.ts';

const { t } = useI18n()
const page = Page(pinia);
const userInfo = User(pinia);
const UserStore = User(pinia);
const { menuActive, settings } = storeToRefs(page);
const { kefuVisible, agentInfo } = storeToRefs(userInfo);
const { VIPinfo, roleInfo } = storeToRefs(UserStore);
const router = useRouter();
const visibleSetting = ref(false);

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
        //     url: '/wallet/loginRecord',
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
        // 1 => '禁言中',
        //     2 => '封锁中',
        //     3 => '禁言IP',
        //     4 => '封锁IP',
        //     0 => '正常',
        if ([2, 4].includes(agentInfo.value.mutetype.type_id)) {
            Message.error('用户被封禁')
        } else {
            kefuVisible.value = true
            return
        }
    }
    if (str === "http" || str === "www.") {
        handleOpenLink(item.url)
    }
    else {
        router.push(item.url)
    }

}
// 打开头像设置
const showAvSetting = () => {
  visibleSetting.value = true
}

</script>
<style lang='less' scoped>
@timestamp: `new Date().getTime()`;
.sidebar {

    width: 280px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    color: #fff;

  .top_av {
    text-align: center;
    width: 280px;
    height: 176px;
    background: url('/img/wallet/bg1.webp?t=@{timestamp}') center no-repeat;
    background-size: 100%;
    .avatar {
      margin-top: 28px;
      width: 80px;
      height: 80px;
      border: 1px solid;
      border-image-source: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%);
    }
    .userName {
      gap: 7px !important;
      color: #fff;
      width: 100%;
      font-size: 20px;
      font-weight: 600;
      span {
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .txt_vip {
        width: 66px;
        height: 24px;
        line-height: 28px;
        background-size: 100%;
        font-size: 12px;
        font-weight: normal;
        text-align: right;
        padding-right: 10px;
        color: rgba(172, 198, 255, 1);
        font-style:italic
      }
    }
  }
  .top_wallet {
    cursor: pointer;
    margin: 20px 0;
    padding: 22px 20px;
    width: 280px;
    height: 106px;
    background: url('/img/wallet/bg2.webp?t=@{timestamp}') center no-repeat;
    background-size: 100%;

    .txt_m {
      font-size: 26px;
      font-weight: 700;
      color: #fac904;
    }
  }
  .nav_item {
    background: rgba(20, 23, 58, 1);
    border: 1px solid rgba(38, 41, 76, 1);
    border-radius: 16px;
    padding: 20px;

    >p {
      position: relative;
      transform-style: preserve-3d;
      margin: 0;
      cursor: pointer;

      >span {
        display: block;
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

}
</style>
