<template>
  <div class="sidebar">
    <div class="top_av">
      <Imgt @click="showAvSetting" :src="`/img/head_icons/${roleInfo.head_photo}.webp` || '/img/home/avatar.webp'"
        class="avatar" alt="" title="点击设置" />
      <n-flex justify="center" class="userName">
        <span :title="info.full_name || info.real_name || roleInfo.nickname">{{ info.full_name || info.real_name ||
          roleInfo.nickname
          }}</span>
        <span class="txt_vip"
          :style="{ 'background-image': `url(/img/level/new/v${Number(VIPinfo.current_vip_level)}.webp)` }"></span>
      </n-flex>
    </div>
    <div class="top_wallet">
      <n-flex align="center" justify="space-between" @click="router.push(`/wallet/walletInfo`)">
        <div>
          <div>{{ t('home_page_myWallet') }}</div>
          <div class="txt_m">{{ verifyNumberComma(String(roleInfo.money)) }}</div>
        </div>
        <span class="right_arrow"></span>
      </n-flex>
    </div>
    <n-flex class="nav_item bg_color">
      <p class="pointer" :class="menuActive == i ? 'active' : ''" v-for="(list, i) in state.sideList" :key="i"
        @click="itemClick(list, i)">
        <iconpark-icon :icon-id="list.icon" :color="menuActive == i ? '#fff' : '#fff'" size="1.67rem"></iconpark-icon>
        <span>{{ t(list.name) }}</span>
      </p>
    </n-flex>

    <!-- 头像设置 -->
    <avatarSettings v-model:visible="visibleSetting" />
    <RedeemCode v-if="showRedeemCode" />
  </div>
</template>
<script lang="ts" setup name="sider">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { Page } from '@/store/page';
import { handleOpenLink } from '@/utils/others';
import { useI18n } from 'vue-i18n';
import { User } from '@/store/user';
import { Message } from '@/utils/discreteApi.ts';
import avatarSettings from './components/avatarSettings.vue';
import { verifyNumberComma } from '@/utils/others.ts';
import { Wallet } from '@/store/wallet';
import RedeemCode from '@/views/wallet/components/RedeemCode.vue';

const { t } = useI18n();
const page = Page(pinia);
const userInfo = User(pinia);
const UserStore = User(pinia);
const { menuActive, settings } = storeToRefs(page);
const { info, kefuVisible, agentInfo } = storeToRefs(userInfo);
const { VIPinfo, roleInfo } = storeToRefs(UserStore);
const router = useRouter();
const visibleSetting = ref(false);
const wallet = Wallet(pinia);
const showRedeemCodeModal = (v: boolean) => wallet.setShowRedeemCode(v);
const { showRedeemCode } = storeToRefs(wallet);

const state: any = reactive({
  sideList: [
    {
      icon: 'txxlicon01',
      name: 'page_route_wallet',
      url: 'walletInfo',
    },
    {
      icon: 'txxlicon02',
      name: 'page_route_recharge',
      url: 'deposit',
    },
    {
      icon: 'txxlicon03',
      name: 'page_route_withdraw',
      url: 'withdraw',
    },
    {
      icon: 'txxlicon04',
      name: 'page_route_VIP',
      url: 'levelInfo',
    },
    {
      icon: 'txxlicon05',
      name: 'page_route_proxy',
      url: 'proxyCooperation',
    },
    {
      icon: 'txxlicon06',
      name: 'page_route_payment',
      url: 'paymentManagement',
    },
    {
      icon: 'txxlicon07',
      name: 'page_route_activity',
      url: 'activity',
    },
    {
      icon: 'txxlicon08',
      name: 'page_route_discount',
      url: 'myPromo',
    },
    {
      icon: 'txxlicon15',
      name: 'page_route_record',
      url: 'records',
    },
    {
      icon: 'txxlicon10',
      name: 'page_route_redemptionCode',
      url: 'redeemCode',
    },
    {
      icon: 'txxlicon11',
      name: 'page_route_mail',
      url: 'myEmail',
    },
    {
      icon: 'txxlicon12',
      name: 'page_route_security',
      url: 'securitySettings',
    },
    {
      icon: 'txxlicon13',
      name: 'page_route_feedback',
      url: settings.value.serviceTelegram,
    },
    // {
    //   icon: 'Group39341',
    //   name: 'home_page_rechargeRecord',
    //   url: 'rechargeRecord',
    // },
    // {
    //   icon: 'Group39342',
    //   name: 'home_page_withdrawRecord',
    //   url: 'withdrawRecord',
    // },
    // {
    //   icon: 'Group39343',
    //   name: 'home_page_accountsRecord',
    //   url: 'accountsRecord',
    // },
    // {
    //   icon: 'Group39344',
    //   name: 'home_page_betRecord',
    //   url: 'betRecord',
    // },
    // {
    //   icon: 'Group39345',
    //   name: 'home_page_auditRecord',
    //   url: 'auditRecord',
    // },
    // {
    //   icon: 'diannaodenglujilu1',
    //   name: 'home_page_waterRecord',
    //   url: 'waterRecord',
    // },
  ],
});


const itemClick = async (item: any, i: number) => {

  let str = item.url.substring(0, 4);
  if (item.name == 'home_page_onlineService') {
    // 1 => '禁言中',
    //     2 => '封锁中',
    //     3 => '禁言IP',
    //     4 => '封锁IP',
    //     0 => '正常',
    if ([2, 4].includes(agentInfo.value.mutetype.type_id)) {
      Message.error('用户被封禁');
    } else {
      kefuVisible.value = true;
      return;
    }
  }
  if (item.url == "redeemCode") { // 兑换码
    showRedeemCodeModal(true)
    return
  }
  if (str === 'http' || str === 'www.') {
    handleOpenLink(item.url);
  } else {
    await page.setMenuActive(i);
    router.push((item.url));
  }

};
// 打开头像设置
const showAvSetting = () => {
  visibleSetting.value = true;
};

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
      cursor: pointer;
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
        font-style: italic
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
    text-align: center;
    gap: 10px !important;
    padding: 20px;

    >p {
      font-size: 14px;
      width: 72px;
      height: 72px;
      position: relative;
      transform-style: preserve-3d;
      margin: 0;
      cursor: pointer;
      border: 1px solid #14173a;

      >span {
        display: block;
        line-height: 14px;
      }
    }

    .active {
      border-radius: 12px;
      color: #fff;
      background: rgba(33, 36, 67, 1);
      border-color: rgba(38, 41, 76, 1)
    }
  }

}
</style>
