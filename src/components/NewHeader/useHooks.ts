




const useHeaderHooks = () =>{


  const menu = [
    {
      icon: 'qianbao1',
      name: '钱包',
      url: '/wallet/walletInfo',
    },
    {
      icon: 'Group39341',
      name: '充值',
      url: '/wallet/rechargeRecord',
    },
    {
      icon: 'Group39342',
      name: '提款',
      url: '/wallet/withdrawRecord',
    },
    {
      icon: 'Group39345',
      name: 'VIP',
      url: '/wallet/accountsRecord',
    },
    {
      icon: 'Group39343',
      name: '代理',
      url: '/wallet/betRecord',
    },
    {
      icon: 'Group39344',
      name: '支付',
      url: '/wallet/auditRecord',
    },
  
    {
      icon: 'diannaodenglujilu1',
      name: '活动',
      url: '/wallet/waterRecord',
    },
    {
      icon: 'Group39347',
      name: '优惠',
      url: '/wallet/myPromo',
    },
    {
      icon: 'youxiang2',
      name: '奖励',
      url: '/wallet/myEmail',
    },
    {
      icon: 'Group39348',
      name: '兑换码',
      url: 'kf',
    },
    {
      icon: 'Group39349',
      name: '邮件',
      url: '/wallet/securitySettings',
    },
    {
      icon: 'tuichu1',
      name: '安全',
      url: '444',
      value: 444,
    },
    {
      icon: 'tuichu1',
      name: '反馈',
      url: '444',
      value: 444,
    },
    {
      icon: 'tuichu1',
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