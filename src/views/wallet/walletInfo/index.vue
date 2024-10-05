<template>
  <depositFirst ref="depositFirModal" @haveBankList="haveBankList" />
  <!--  <Deposit v-if="showDeposit" />-->
  <Withdraw v-if="showWithdraw" :myBankList="myBankList" />
  <!--<Transfer v-if="showTransfer" />-->
  <RedeemCode v-if="showRedeemCode" />
  <!--   <levelRule ref="levelModal" />-->

  <!--  提款校验-->
  <Calibration v-if="withdrawMoneyShow" ref="calibrationRef" :myBankList="myBankList" />

  <!-- 提款 -->
  <WithdrawMoney v-if="withdrawMoneyShow" ref="withdrawMoneyRef" :myBankList="myBankList" />
  <!-- 头像设置 -->
  <avatarSettings v-model:visible="visibleSetting" />


  <n-spin :show="loading">
    <n-flex vertical>
      <div class="process">
        <div class="userInfo">
          <div class="usrProfile">
            <Imgt @click="showAvSetting" :src="`/img/head_icons/${roleInfo.head_photo}.webp` || '/img/home/avatar.webp'" class="avatar"
              alt="" title="点击设置"/>
            <div class="userName">
              <p class="size1">{{ userInfo.full_name || userInfo.real_name || roleInfo.nickname }}</p>
              <div class="mount">
                <div class="flex">
                  <p class="size2">{{ totalMoneyTxt }}</p>
                  <Imgt :class="`pointer ${refreshFlag ? 'active' : ''}`" src="/img/payment/refresh.webp" alt=""
                    @click="refreshWallet" />
                  <Imgt v-if="!eyeOpen" :class="`pointer`" src="/img/payment/eyes_close.webp" alt=""
                    @click="moneyShow" />
                  <Imgt v-else :class="`pointer`" src="/img/payment/eyes_open.webp" alt="" @click="moneyShow" />
                </div>
                <!-- <n-dropdown trigger="click" :options="currencyList" @select="handleCurrencyChange">
                                    <n-button>
                                        <div class="usdBtn" block>
                                            <Imgt src="/img/payment/T.webp" class="T" />
                                            <p class="size4">{{ currencyList.filter((cur) => cur.key ===
                                                currencyUnit)[0].label }}</p>
                                            <Imgt src="/img/payment/down.webp" class="down" />
                                        </div>
                                    </n-button>
                                </n-dropdown>-->
              </div>
            </div>
          </div>
          <n-flex justify="space-around" class="transaction">
            <div class="button" block @click="openDepositFir">
              <p class="size2"> {{ t('deposit_page_deposit') }} </p>
            </div>
            <!--            <div class="button" block @click="goToWithdraw">-->
            <!--              <p class="size2"> {{ t('walletInfo_page_withdraw') }} </p>-->
            <!--            </div>-->
            <div class="button" block @click="goCalibration">
              <p class="size2"> {{ t('walletInfo_page_withdraw') }} </p>
            </div>

            <div class="button" block @click="() => showRedeemCodeModal(true)">
              <p class="size2"> {{ t('walletInfo_page_code') }} </p>
            </div>
          </n-flex>
        </div>
        <div class="vip">
          <div class="vip1">
            <p class="size3">VIP{{ Number(VIPinfo.current_vip_level) }}</p>
            <Imgt src="/img/payment/king.webp" class="king" />
          </div>
          <div class="vip1">
            <p class="size3">VIP{{ Number(VIPinfo.current_vip_level) + 1 || 1 }}</p>
            <Imgt src="/img/payment/king.webp" class="king" />
          </div>
        </div>
        <n-progress class="processBar" type="line" :color="themeVars.warningColor" :percentage="target.progress"
          :show-indicator="false" :indicator-text-color="themeVars.warningColor" />
        <div class="processFooter">
          <p class="size3">{{ t('level_page_needBet') + ': ' + verifyNumberComma(String(target.bet_money)) }}</p>
          <!--<p class="size3"><a @click="openLevelRule"><u>{{ t('walletInfo_page_rule') }}</u></a></p>-->
        </div>
      </div>
    </n-flex>
    <!--        <n-flex vertical>
            <span class="title size1">{{ t('walletInfo_page_wallet') }}</span>
            <n-flex justify="space-between" class="info_data">
                <n-flex vertical justify="space-around">
                    <div class="total_account">
                        <span class="size2 gray">{{ t('walletInfo_page_totalA') }}</span>
                        <span class="size2">{{ gameMoney }}</span>
                    </div>
                    <div class="central_wallet">
                        <span class="size2 gray">{{ t(EAllWallets.center) }}</span>
                        <span class="size2">{{ bankMoney }}</span>
                    </div>
                </n-flex>

            </n-flex>
        </n-flex>-->
    <n-flex vertical class="venue_wallet">
      <n-flex vertical class="game_wallet">
        <n-flex justify="space-between" align="center" class="game_wallet_top">
          <div class="top_left">
            <div class="title"> {{ t('walletInfo_page_wallet') }} </div>
            <n-flex justify="space-between" class="top_mon_box">
              <n-flex class="top_mon_box_l">
                <span class="icon"></span>
                <span class="m-txt"> {{ verifyNumberComma(String(gameMoney)) }} </span>
              </n-flex>
              <!--              <n-flex class="top_mon_box_r">
                <div class="automatic">
                  <span class="size2 gray">{{ t('walletInfo_page_follow') }}</span>
                  <n-switch class="switch" v-model:value="updateAuto">
                  </n-switch>
                </div>
              </n-flex>-->
            </n-flex>
          </div>
          <div class="top_center">
            <n-flex :class="`zz-btn button ${tranType === 'out' ? 'active' : ''}`" justify="center"
              @click="changeTranType('out')"> <span class="icon"></span> <span> {{ t('walletInfo_page_out') }} </span>
            </n-flex>
            <n-flex :class="`zz-btn button  ${tranType === 'in' ? 'active' : ''}`" justify="center"
              @click="changeTranType('in')"> <span class="icon icon-1"></span> <span> {{ t('walletInfo_page_in') }}
              </span> </n-flex>
          </div>
          <div class="top_right">
            <div class="title"> {{ t('walletInfo_page_venue') }} </div>
            <n-flex justify="space-between" class="top_mon_box">
              <n-flex class="top_mon_box_l">
                <span class="icon icon_bxg"></span>
                <span class="m-txt"> {{ verifyNumberComma(String(bankMoney)) }} </span>
              </n-flex>
              <n-flex class="top_mon_box_r">

              </n-flex>
            </n-flex>
          </div>
        </n-flex>

        <!-- 金额区域 -->
        <div class="money-all-div">
          <n-flex justify="space-between" class="money_input">
            <n-input @blur="inputBlur" @input="countMonRate" v-model:value="tranMoney"
              :placeholder="t('walletInfo_page_tranferTxt')" clearable />
            <a class="btn-ch" @click="allTranferMon"> {{ t('promo_page_all') }} </a>
          </n-flex>
          <div class="slider-div">
            <n-slider :default-value="0" v-model:value="slideValue" :step="1" :tooltip="false"
              :on-dragend="formatTooltip">
              <template #thumb>
                <n-icon-wrapper class="n-slider-handle">
                  {{ slideStr }}
                </n-icon-wrapper>
              </template>
            </n-slider>
          </div>
          <n-flex class="kjje_div">
            <a :class="`kj_item ${tranMoney === item.value ? 'active' : ''}`" v-for="(item, index) in chooseMoneyArr"
              @click="chooseFastMon(item.value)" :key="index">
              {{ item.label }}
            </a>
          </n-flex>
          <n-flex class="bot-tips">
            <span class="icon-tip"></span>
            {{ t('walletInfo_page_tranferTips') }}
          </n-flex>
          <a class="sub-btn" @click="handleSubmit"> {{ t('home_page_confirm') }} </a>
        </div>

        <!--<n-flex justify="space-between" align="end">
                    <n-flex>
                        <div class="game">
                            <span class="size2 gray">{{ t('walletInfo_page_game') }}</span>
                            <span class="size2">{{ gameMoney }}</span>
                        </div>

                    </n-flex>
                    <div class="middleBtn" @click="getAllMoney"><span>{{ t('walletInfo_page_recovery') }}</span></div>
                </n-flex>
                <n-grid :x-gap="20" :y-gap="20" :cols="3" class="wallet_tabs">
                    <n-grid-item v-for="(v, k) in EWallets" :key="k">
                        <div class="item">
                            <span class="size0">{{ t(v) }}</span>
                            <span class="size2 item_mount">{{ gameMoney }}</span>
                            <div class="item_buttons">
                                <div class="button" @click="showTransferModal('in', `${k}`)">
                                    <span class="size2">{{ t('walletInfo_page_in') }}</span>
                                </div>
                                <div class="button" @click="showTransferModal('out', `${k}`)">
                                    <span class="size2">{{ t('walletInfo_page_out') }}</span>
                                </div>
                            </div>
                        </div>
                    </n-grid-item>
                </n-grid>
              -->
      </n-flex>
    </n-flex>
  </n-spin>
</template>

<script setup lang='ts'>
import { useI18n } from "vue-i18n";
import { useRoute } from 'vue-router';
import { ref, nextTick, onMounted, onUnmounted } from 'vue';
// import { EAllWallets, EWallets } from '@/enums/walletEnum';
import useWalletInfo from './useWalletInfo';
import Withdraw from '@/views/wallet/components/Withdraw.vue';
import depositFirst from '@/views/wallet/deposit/depositFirst.vue';
// import Deposit from '@/views/wallet/deposit/Deposit.vue';
import RedeemCode from '@/views/wallet/components/RedeemCode.vue';
import Calibration from '@/views/wallet/withdrawFunds/calibration.vue';
import WithdrawMoney from '@/views/wallet/withdrawFunds/withdrawMoney.vue';
import avatarSettings from '../components/avatarSettings.vue';
import { Message } from "@/utils/discreteApi.ts";
import { MessageEvent2 } from '@/net/MessageEvent2.ts';
import { NetMsgType } from '@/netBase/NetMsgType.ts';
import { NetPacket } from '@/netBase/NetPacket.ts';
import { Net } from '@/net/Net.ts';
import pinia from '@/store';
import { Page } from '@/store/page';
import { verifyNumberComma } from '@/utils/others.ts';
import Imgt from '@/components/Imgt.vue';

// const formatter = (value: any) => {
//   setTimeout(() => {
//     tranMoney.value = value ? Number(value.toString().replace(/\D/g, '')) : ''
//   }, 0)
// };
const { t } = useI18n();
const route = useRoute();
// const levelRule = defineAsyncComponent(() => import('@/views/level/rules.vue'));
// const levelModal = ref();
const depositFirModal = ref();
const haveBank = ref(false);
const visibleSetting = ref(false);

// 打开头像设置
const showAvSetting = () => {
  visibleSetting.value = true
}
// 打开等级规则弹窗
// const openLevelRule = () => {
//     levelModal.value.openModal();
// }
// 打开充值第一个弹窗
const openDepositFir = () => {
  if (!haveBank.value) {
    return Message.error(t('deposit_page_notPayWay'))
  }
  depositFirModal.value.openModal();
}
const haveBankList = (e: any) => {
  haveBank.value = e
}

const withdrawMoneyShow = ref(false)

const goCalibration = () => {
  withdrawMoneyShow.value = true
  nextTick(() => {
    goToWithdraw()
  })
}

const getBankList = () => {
  const req = NetPacket.req_bank_name_list();
  Net.instance.sendRequest(req);
};

const handleBankList = async (res: any) => {
  await Page(pinia).setBankListInfo(res.bank_name_list, res.status_list)
};

onMounted(() => {
  getBankList();
  // 打开充值页面
  if (route.query.openDialogType === 'deposit') {
    setTimeout(() => {
      depositFirModal.value.openModal();
    }, 500)
  }
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_bank_name_list, handleBankList);
})
onUnmounted(() => {
  // 取消监听
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_req_bank_name_list, null);
});


const {
  loading,
  themeVars,
  // currencyUnit,
  // currencyList,
  gameMoney,
  bankMoney,
  // totalMoney,
  // handleCurrencyChange,
  // showDepositModal,
  showRedeemCodeModal,
  // showTransferModal,
  // showDeposit,
  showWithdraw,
  showRedeemCode,
  // showTransfer,
  roleInfo,
  userInfo,
  VIPinfo,
  // updateAuto,
  refreshWallet,
  target,
  refreshFlag,
  // getAllMoney,
  goToWithdraw,
  myBankList,
  eyeOpen,
  totalMoneyTxt,
  moneyShow,
  tranType,
  changeTranType,
  tranMoney,
  chooseMoneyArr,
  allTranferMon,
  formatTooltip,
  handleSubmit,
  slideStr,
  slideValue,
  chooseFastMon,
  calibrationRef,
  withdrawMoneyRef,
  countMonRate,
  inputBlur,
} = useWalletInfo()


</script>

<style src="./style.less" lang='less' scoped></style>
