import pinia, {User} from '@/store/index';
import { storeToRefs } from 'pinia';
import { Wallet } from '@/store';
import { ETransfer } from '@/enums/walletEnum';
import {ref, watch} from 'vue';
import {NetPacket} from "@/utils/netBase/NetPacket";
import {Net} from "@/utils/net/Net";
import {MessageEvent2} from "@/utils/net/MessageEvent2";
import {NetMsgType} from "@/utils/netBase/NetMsgType";
import {Message} from "@/utils/discreteApi";
import {useI18n} from "vue-i18n";

const useTransfer = () => {
  const { t } = useI18n();
  const formRef = ref();
  const wallet = Wallet(pinia);
  const { showDialogTransfer, showTransfer } = storeToRefs(wallet);
  const transferLoading = ref(false);
  const amount = ref<string>('');
  const UserStore = User(pinia);
  const { roleInfo } = storeToRefs(UserStore);
  const fromMoney = ref(roleInfo.value.bank_money || 0);
  const toMoney = ref(roleInfo.value.money || 0);

  const onClose = () => {
    wallet.setDialogShowTransfer(false)
  };
  const onSubmit = () => {
    if (!amount.value) {
      return  Message.error(t('transfer_page_inputAmount'))
    }
    if (Number(amount.value) > Number(fromMoney.value)) {
      return  Message.error(t('transfer_page_notEnough'))
    }
    handleSubmit();
  };
  const handleSubmit = () => {
    transferLoading.value = true;
    // 转入
    if (showTransfer.value.method === 'in') {
      centerToGame();
    } else { // 转出
      GameToCenter();
    }
  };

  const changeMethod = () => {
    const { method, from, to } = showTransfer.value;
    wallet.setShowTransfer(method === 'in' ? 'out' : 'in', to, from);
    if (method === 'out') {
      fromMoney.value = roleInfo.value.bank_money;
      toMoney.value = roleInfo.value.money;
    }
    if (method === 'in') {
      fromMoney.value = roleInfo.value.money;
      toMoney.value = roleInfo.value.bank_money;
    }
  };

  const selectTotal = () => {
    amount.value = fromMoney.value.toString()
  }
    // 中心钱包转账到游戏钱包
  const centerToGame = () => {
    const req = NetPacket.req_bank_take();
    req.money = amount.value;
    Net.instance.sendRequest(req);
  }
  const handleCenterToGame = (res: any) => {
    setTimeout(() => {
      transferLoading.value = false;
      onClose(); // 关闭窗口
    }, 300)
    if (res.is_success === 1) {
      Message.success(t('proxy_page_caoZuo'))
    } else {
      Message.error(t('proxy_page_caoZuoFail'))
    }
  }
  // 游戏钱包转账到中心钱包
  const GameToCenter = () => {
    const req = NetPacket.req_bank_save();
    req.money = amount.value;
    Net.instance.sendRequest(req);
  }
  const handleGameToCenter = (res: any) => {
    setTimeout(() => {
      transferLoading.value = false;
      onClose(); // 关闭窗口
    }, 300)
    if (res.is_success === 1) {
      Message.success(t('proxy_page_caoZuo'))
    } else {
      Message.error(t('proxy_page_caoZuoFail'))
    }
  }

  watch(() => roleInfo.value, (n) => {
    if (showTransfer.value.method === 'in') {
      fromMoney.value = n.bank_money
      toMoney.value = n.money
    } else {
      fromMoney.value = n.money
      toMoney.value = n.bank_money
    }

  });
  watch(() => showDialogTransfer.value, (n) => {
    if (n) {
      console.log('------监听')
      MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_bank_take_result, handleCenterToGame);
      MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_bank_save_result, handleGameToCenter);

      amount.value = ''; // 重置
      if (showTransfer.value.method === 'in') {
        fromMoney.value = roleInfo.value.bank_money
        toMoney.value = roleInfo.value.money
      } else {
        fromMoney.value = roleInfo.value.money
        toMoney.value = roleInfo.value.bank_money
      }
    } else {
      console.log('------取消监听')
      // 取消监听
      MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_bank_take_result, null);
      MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_bank_save_result, null);
    }
  });


  return {
    showDialogTransfer,
    showTransfer,
    transferLoading,
    ETransfer,
    amount,
    onClose,
    onSubmit,
    changeMethod,
    selectTotal,
    formRef,
    fromMoney,
    toMoney,
  };
};

export default useTransfer;
