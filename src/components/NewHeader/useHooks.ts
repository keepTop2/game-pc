




const useHeaderHooks = () =>{


  const menu = [
    {
      icon: 'txxlicon01',
      name: '钱包',
      url: '/wallet/walletInfo',
    },
    {
      icon: 'txxlicon02',
      name: '充值',
      url: '/wallet/rechargeRecord',
    },
    {
      icon: 'txxlicon03',
      name: '提款',
      url: '/wallet/withdrawRecord',
    },
    {
      icon: 'txxlicon04',
      name: 'VIP',
      url: '/wallet/accountsRecord',
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
      icon: 'txxlicon09',
      name: '奖励',
      url: '/wallet/myEmail',
    },
    {
      icon: 'txxlicon10',
      name: '兑换码',
      url: 'kf',
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







return {
  menu
}

}

export default useHeaderHooks;