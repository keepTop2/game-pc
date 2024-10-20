

import { ref } from "vue";
import pinia from "@/store";
import { storeToRefs } from 'pinia';
import { Wallet } from '@/store/wallet';


const isSearch = ref(false)
const useHeaderHooks = () => {
  const wallet = Wallet(pinia);
  const { showRedeemCode } = storeToRefs(wallet);

  const menu = [
    {
      icon: 'txxlicon01',
      name: '钱包',
      url: '/wallet/walletInfo',
    },
    {
      icon: 'txxlicon02',
      name: '充值',
      url: '/wallet/records',
    },
    {
      icon: 'txxlicon03',
      name: '提款',
      url: '/wallet/withdrawRecord',
    },
    {
      icon: 'txxlicon04',
      name: 'VIP',
      url: '/wallet/levelInfo',
    },
    {
      icon: 'txxlicon05',
      name: '代理',
      url: '/wallet/proxyCooperation',
    },
    {
      icon: 'txxlicon06',
      name: '支付',
      url: '/wallet/auditRecord',
    },

    {
      icon: 'txxlicon07',
      name: '活动',
      url: '/wallet/waterRecord',
    },
    {
      icon: 'txxlicon08',
      name: '优惠',
      url: '/wallet/myPromo',
    },
    {
      icon: 'txxlicon15',
      name: '记录',
      url: '/wallet/records',
    },
    // {
    //   icon: 'txxlicon09',
    //   name: '奖励',
    //   url: '/wallet/myEmail',
    // },
    {
      icon: 'txxlicon10',
      name: '兑换码',
      url: 'redeemCode',
    },
    {
      icon: 'txxlicon11',
      name: '邮件',
      url: '/wallet/myEmail',
    },
    {
      icon: 'txxlicon12',
      name: '安全',
      url: '444',
      value: 444,
    },
    {
      icon: 'txxlicon13',
      name: '反馈',
      url: '444',
      value: 444,
    },
    {
      icon: 'txxlicon14',
      name: '退出登录',
      url: '444',
      value: 444,
    },
  ]

  const search = () => {
    isSearch.value = true
  }
  const showRedeemCodeModal = (v: boolean) => wallet.setShowRedeemCode(v);






  return {
    showRedeemCodeModal,
    showRedeemCode,
    menu,
    search,
    isSearch
  }

}

export default useHeaderHooks;