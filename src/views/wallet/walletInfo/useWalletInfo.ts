import { onMounted, onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeVars } from "naive-ui";

import pinia from "@/store";
import { User } from '@/store/user';
import { Wallet } from '@/store/wallet';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
import { TVIPLevelReward } from '@/utils/types';
import { watch } from 'vue';
import { Local } from '@/utils/storage';
import { getCurrencyValue } from '@/utils/others';
import { Message } from "@/utils/discreteApi";
import { useI18n } from "vue-i18n";
// import { useRoute } from 'vue-router';
// import { useRoute, useRouter } from 'vue-router';
// import { useRoute } from 'vue-router';
// import { ReadableStreamBYOBRequest } from 'node:stream/web';

const useWalletInfo = () => {

  const calibrationRef = ref() // 提款校验-
  const withdrawMoneyRef = ref() // 提款

  const { t } = useI18n();
  // const router = useRouter();
  // const route = useRoute();
  const themeVars = useThemeVars();
  const wallet = Wallet(pinia);
  const { showDeposit, showWithdraw, showRedeemCode, showTransfer } = storeToRefs(wallet);
  const UserStore = User(pinia);
  const { info: userInfo, roleInfo, VIPinfo } = storeToRefs(UserStore);
  const loading = ref<boolean>(false);
  const updateAuto = ref<boolean>(false);
  const timerRe = ref();
  const refreshFlag = ref(false);
  const eyeOpen = ref(true);
  const currencyList: Array<{ label: string, key: number }> = [
    { label: 'VND', key: 1 },
    { label: 'USDT', key: 2 }
  ];
  const currencyUnit = ref<number>(Local.get('currency') || 1);
  const gameMoney = ref<number>(Number(roleInfo.value.money)); // 我的钱包余额
  const bankMoney = ref<number>(Number(roleInfo.value.bank_money)); // 保险柜余额
  const totalMoney = ref<number>(gameMoney.value + bankMoney.value);
  const totalMoneyTxt = ref<any>(totalMoney.value);
  const target_bet_money = ref(0);
  const target: any = ref({ bet_money: 0 })
  const tranType = ref('out'); // 转账类型 out, in
  const tranMoney: any = ref<any>(); // 转账金额
  const chooseMoneyArr = [
    { label: '100,000', value: 100000 },
    { label: '200,000', value: 200000 },
    { label: '500,000', value: 500000 },
    { label: '1,000,000', value: 1000000 },
    { label: '10,000,000', value: 10000000 },
  ];
  const slideStr = ref<any>('0%');
  const myBankList = ref(); // 已绑定的银行列表

  // 获取已绑定的银行账号
  const getMyBankList = () => {
    const req = NetPacket.req_bank_card_info_list();
    Net.instance.sendRequest(req);
  }

  const handleMyBankList = (res: any) => {
    console.log('bankList--------', res)
    console.log('userInfo--------', userInfo.value)
    console.log('roleInfo--------', roleInfo.value)
    myBankList.value = res;
    // // 未绑定银行卡跳转到绑定银行卡
    if (!myBankList.value.bank_card_info_list || myBankList.value.bank_card_info_list.length == 0) {
      console.log('没有绑定银行===')
      // router.push('/wallet/paymentManagement')
      calibrationRef.value.openModal();
      return
    }
    // 未绑定手机号码
    if (!userInfo.value.mobile) {
      console.log('没有手机号码===')
      // router.push('/wallet/securitySettings?openDialogType=bindPhone')
      calibrationRef.value.openModal();
      return
    }
    // 未绑定资金密码
    if (!roleInfo.value.withdraw_pwd) {
      console.log('没有资金密码===')
      // router.push('/wallet/securitySettings?openDialogType=bindPayPwd')
      calibrationRef.value.openModal();
      return
    }
    withdrawMoneyRef.value.openModal();
    // showWithdrawModal(true)
  }

  // 取款需要判断是否绑定银行卡，绑定手机号码，提现密码
  const goToWithdraw = () => {
    getMyBankList();
  }

  const handleSubmit = () => {
    if (!tranMoney.value) {
      return Message.error(t('transfer_page_inputAmount'))
    }
    // 转入
    if (tranType.value === 'in') {
      if (tranMoney.value > gameMoney.value) {
        return Message.error(t('transfer_page_notEnough'))
      }
    } else {
      if (tranMoney.value > bankMoney.value) {
        return Message.error(t('transfer_page_notEnough'))
      }
    }

    loading.value = true;
    // 转入
    if (tranType.value === 'in') {
      GameToCenter();
    } else { // 转出
      centerToGame();
    }
  };
  // 中心钱包转账到游戏钱包
  const centerToGame = () => {
    const req = NetPacket.req_bank_take();
    req.money = tranMoney.value;
    Net.instance.sendRequest(req);
  }
  const handleCenterToGame = (res: any) => {
    setTimeout(() => {
      loading.value = false;
    }, 300)
    if (res.is_success === 1) {
      tranMoney.value = 0 // 清空金额
      Message.success(t('proxy_page_caoZuo'))
    } else {
      Message.error(t('proxy_page_caoZuoFail'))
    }
  }
  // 游戏钱包转账到中心钱包
  const GameToCenter = () => {
    const req = NetPacket.req_bank_save();
    req.money = tranMoney.value;
    Net.instance.sendRequest(req);
  }
  const handleGameToCenter = (res: any) => {
    setTimeout(() => {
      loading.value = false;
    }, 300)
    if (res.is_success === 1) {
      tranMoney.value = 0 // 清空金额
      Message.success(t('proxy_page_caoZuo'))
    } else {
      Message.error(t('proxy_page_caoZuoFail'))
    }
  }
  // 一件回收至中心钱包
  // const getAllMoney = () => {
  //   if (gameMoney.value == 0) {
  //     return Message.error(t('walletInfo_page_notMoney'))
  //   }
  //   loading.value = true;
  //
  //   const req = NetPacket.req_bank_save();
  //   req.money = gameMoney.value;
  //   Net.instance.sendRequest(req);
  // }
  // const handleGetAllMoney = (res: any) => {
  //   setTimeout(() => {
  //     loading.value = false;
  //   }, 300)
  //   if (res.is_success === 1) {
  //     Message.success(t('proxy_page_caoZuo'))
  //   } else {
  //     Message.error(t('proxy_page_caoZuoFail'))
  //   }
  // }
  // 自动跟随 1打开，0关闭，默认打开
  const handleAutoTrans = (res: any) => {
    console.log('-----是否自动跟随', res)
    updateAuto.value = res.auto_trans === 1
    loading.value = false;
  };

  // vip 信息设置
  const setVipInfo = () => {

    if (VIPinfo.value?.vip_level_reward_config && VIPinfo.value?.vip_level_reward_config.length) {
      // const targetLevel: TVIPLevelReward = VIPinfo.value.vip_level_reward_config?.filter((item: TVIPLevelReward) => item.level == (Number(VIPinfo.value.current_vip_level) + 1))[0]

      const targetLevel: TVIPLevelReward = VIPinfo.value?.vip_level_reward_config[Number(VIPinfo.value.current_vip_level)]

      const { level, gift_money_amount } = targetLevel || { target_bet_money: 0, level: 1, gift_money_amount: 0 };
      console.log('-----===&&&', targetLevel)
      if (targetLevel?.target_bet_money != null) {
        target_bet_money.value = targetLevel?.target_bet_money
      }
      target.value = {
        progress: (Number(VIPinfo.value.total_bet_money) / Number(target_bet_money.value)) * 100,
        level,
        gift_money_amount,
        // bet_money: target_bet_money.value - Number(VIPinfo.value.total_bet_money) // 所需投注， aa=vip等级的投注额-当前投注
        bet_money: target_bet_money.value || '-'  // 所需投注， aa=vip等级的投注额
      }
    }
  }

  const handleCurrencyChange = (key: number) => {
    Local.set('currency', key);
    currencyUnit.value = key;
    gameMoney.value = getCurrencyValue(Number(roleInfo.value.money));
    bankMoney.value = getCurrencyValue(Number(roleInfo.value.bank_money));
    totalMoney.value = gameMoney.value + bankMoney.value;
    // totalMoneyTxt.value = totalMoney.value;
    if (eyeOpen.value) {
      totalMoneyTxt.value = totalMoney.value
    } else {
      totalMoneyTxt.value = '******'
    }
    // target.value.bet_money = getCurrencyValue(target_bet_money.value);
  };


  // const showDepositModal = (v: boolean) => wallet.setShowDeposit(v);
  const showWithdrawModal = (v: boolean) => wallet.setShowWithdraw(v);
  const showRedeemCodeModal = (v: boolean) => wallet.setShowRedeemCode(v);
  const showTransferModal = (v: string, obj: string) => {
    wallet.setDialogShowTransfer(true); // 显示窗口
    if (v === 'in') {
      wallet.setShowTransfer(v, 'center', obj);
    } else {
      wallet.setShowTransfer(v, obj, 'center');
    }
  };

  const refreshWallet = () => {
    if (!refreshFlag.value) {
      console.log('----', eyeOpen.value)
      clearTimeout(timerRe.value);
      refreshFlag.value = true;
      getNewMon();
      timerRe.value = setTimeout(() => {
        refreshFlag.value = false
      }, 1 * 1000)
    }
  }
  // 金额显示隐藏
  const moneyShow = () => {
    if (eyeOpen.value) {
      totalMoneyTxt.value = '******'
    } else {
      totalMoneyTxt.value = totalMoney.value
    }
    eyeOpen.value = !eyeOpen.value
  }

  const getNewMon = () => {
    const req = NetPacket.req_roleinfo_with_id();
    req.id = roleInfo.value.id;
    Net.instance.sendRequest(req);
  }

  const initReq = () => {
    const transReq = NetPacket.req_auto_trans();
    const roleInfoReq = NetPacket.req_roleinfo_with_id();
    Net.instance.sendRequest(transReq);
    Net.instance.sendRequest(roleInfoReq);
  };

  // 转账类型切换
  const changeTranType = (type: any) => {
    tranMoney.value = 0; // 重置为 0
    tranType.value = type;
  }
  // 选择全部金额
  const allTranferMon = () => {
    if (tranType.value === 'in') {
      tranMoney.value = gameMoney.value
    } else {
      tranMoney.value = bankMoney.value
    }
  }
  // 选择快捷金额
  const chooseFastMon = (e: any) => {
    tranMoney.value = e
  }
  // 金额拖动
  const formatTooltip = (value: any) => {
    if (tranType.value === 'in') {
      tranMoney.value = parseInt(String((gameMoney.value * value) / 100))
    } else {
      tranMoney.value = parseInt(String((bankMoney.value * value) / 100))
    }
    slideStr.value = `${value}%`
    return slideStr.value
  }

  watch(
    () => updateAuto.value,
    () => Net.instance.sendRequest(NetPacket.req_update_auto())
  );
  watch(
    () => VIPinfo.value,
    (n) => {
      if (n) {
        console.log('-----**', n)
        setVipInfo()
      }
    }
  );
  // 更新余额等
  watch(
    () => roleInfo.value,
    (n) => {
      if (n) {
        console.log('最新的roleInfo-----', n)
        handleCurrencyChange(1); // 默认越南盾
      }
    }
  );
  // watch (() => wallet.showDialogTransfer, (n) => {
  //   if (n) {
  //     // 取消监听
  //     MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_bank_save_result, null);
  //   } else {
  //    // 避免子组件先取消监听影响了，因为子组件也有监听相同的事件
  //    setTimeout(() => {
  //      MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_bank_save_result, handleGetAllMoney);
  //    }, 100)
  //   }
  // })
  onMounted(() => {
    // 打开充值页面
    // if (route.query.openDialogType === 'deposit') {
    //   wallet.setShowDeposit(true)
    // }
    setVipInfo();
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_auto_trans, handleAutoTrans);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_bank_card_info_list, handleMyBankList);
    // MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_bank_save_result, handleGetAllMoney);

    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_bank_take_result, handleCenterToGame);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_bank_save_result, handleGameToCenter);

    setTimeout(() => initReq(), 500);
  });
  onUnmounted(() => {
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_auto_trans, null);
    // 取消监听
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_bank_card_info_list, null);

    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_bank_take_result, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_bank_save_result, null);
  });
  return {
    loading,
    themeVars,
    currencyUnit,
    currencyList,
    gameMoney,
    bankMoney,
    totalMoney,
    handleCurrencyChange,
    // showDepositModal,
    showWithdrawModal,
    showRedeemCodeModal,
    showTransferModal,
    showDeposit,
    showWithdraw,
    showRedeemCode,
    showTransfer,
    userInfo,
    roleInfo,
    VIPinfo,
    updateAuto,
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
    chooseFastMon,
    calibrationRef,
    withdrawMoneyRef,
    getNewMon,
    getMyBankList,
  };
}

export default useWalletInfo;
