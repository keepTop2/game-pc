import { Local } from '@/utils/storage';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { storeToRefs } from 'pinia';
import pinia from '@/store/index';
import { User } from '@/store/user';
const userinfo = User(pinia);

const { loadingEnd, wsOpen } = storeToRefs(userinfo);
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: { title: 'home' },
    component: () => import('@/views/newHome/index.vue'),
  },
  {
    path: '/customer', // 聊天室
    name: 'customer',
    meta: { title: '' },
    component: () => import('@/views/home/customer.vue'),

  },
  {
    path: '/gameDetail',
    name: 'gameDetail',
    meta: { title: 'gameDetail' },
    component: () => import('@/views/gameDetail/index.vue'),
  },
  {
    path: '/gameCollection',
    name: 'gameCollection',
    meta: { title: 'gameCollection' },
    component: () => import('@/views/gameCollection/index.vue'),
  },
  {
    path: '/help/:type',
    name: 'helpCenter',
    meta: { title: '帮助中心' },
    component: () => import('@/views/help/index.vue'),
  },
  {
    path: '/club',
    name: 'club',
    meta: { title: 'home_page_club' },
    component: () => import('@/views/club/newClub.vue'),
  },
  {
    path: '/clubNext',
    name: 'clubNext',
    meta: { title: 'home_page_club' },
    component: () => import('@/views/club/clubNext.vue'),
  },
  {
    path: '/ranking',  //赛事排行
    name: 'ranking',
    meta: { title: 'ranking' },
    component: () => import('@/views/ranking/index.vue'),
  },
  {
    path: '/recentAwards',  //近期大奖
    name: 'recentAwards',
    meta: { title: 'recentAwards' },
    component: () => import('@/views/recentAwards/index.vue'),
  },

  {
    path: '/wallet',  //钱包
    name: 'wallet',
    redirect: { name: 'walletInfo' },
    meta: { title: 'wallet' },
    component: () => import('@/views/wallet/index.vue'),
    children: [
      {
        path: 'walletInfo',
        name: 'walletInfo',
        meta: { title: 'walletInfo' },
        component: () => import('@/views/wallet/walletInfo/index.vue'),
      },
      {
        path: 'securitySettings',
        name: 'securitySettings',
        meta: { title: 'home_page_securitySettings' },
        component: () => import('@/views/wallet/securitySettings/index.vue'),
      },
      {
        path: 'myPromo',
        name: 'myPromo',
        meta: { title: 'deposit_page_discount' },
        component: () => import('@/views/wallet/promo/index.vue'),
      },
      {
        path: 'paymentManagement',
        name: 'paymentManagement',
        meta: { title: '支付管理' },
        component: () => import('@/views/wallet/paymentManagement/index.vue'),
      },
      {
        path: 'activity',
        name: 'activity',
        meta: { title: 'home_page_activity' },
        component: () => import('@/views/wallet/activity/index.vue'),
      },
      {
        path: 'myEmail',
        name: 'myEmail',
        meta: { title: '我的邮箱' },
        component: () => import('@/views/wallet/myEmail/index.vue'),
      },
      {
        path: 'deposit',
        name: 'deposit',
        meta: { title: 'deposit_page_deposit' },
        component: () => import('@/views/wallet/deposit/depositFirst.vue'),
      },
      {
        path: 'withdraw',
        name: 'withdraw',
        meta: { title: 'proxy_page_withDraw' },
        component: () =>
          import('@/views/wallet/withdrawFunds/withdrawMoney.vue'),
      },
      {
        path: 'levelInfo',
        name: 'levelInfo',
        meta: { title: 'VIP特权' },
        component: () => import('@/views/wallet/level/levelInfo.vue'),
      },
      {
        path: 'feedback',
        name: 'feedback',
        meta: { title: '有奖反馈' },
        component: () => import('@/views/wallet/feedback.vue'),
      },
      {
        path: 'levelRule',
        name: 'levelRule',
        meta: { title: 'levelRule' },
        component: () => import('@/views/wallet/level/rules.vue'),
      },
      {
        path: 'records',
        name: 'records',
        meta: { title: 'records' },
        component: () => import('@/views/wallet/records/index.vue'),
        // children: [
        //   {
        //     path: 'rechargeRecord',
        //     name: 'rechargeRecord',
        //     meta: { title: 'mine_myload' },
        //     component: () => import('@/views/wallet/records/rechargeRecord/index.vue'),
        //   },
        //   {
        //     path: 'withdrawRecord',
        //     name: 'withdrawRecord',
        //     meta: { title: 'mine_mywithdraw' },
        //     component: () => import('@/views/wallet/records/withdrawRecord/index.vue'),
        //   },
        //   {
        //     path: 'betRecord',
        //     name: 'betRecord',
        //     meta: { title: 'mine_mybet' },
        //     component: () => import('@/views/wallet/records/betRecord/index.vue'),
        //   },
        //   {
        //     path: 'accountsRecord',
        //     name: 'accountsRecord',
        //     meta: { title: 'mine_myaudit' },
        //     component: () => import('@/views/wallet/records/accountsRecord/index.vue'),
        //   },
        //   {
        //     path: 'auditRecord',
        //     name: 'auditRecord',
        //     meta: { title: 'recharge_inspect_record' },
        //     component: () => import('@/views/wallet/records/auditRecord/index.vue'),
        //   },
        //   {
        //     path: 'waterRecord',
        //     name: 'waterRecord',
        //     meta: { title: 'home_page_waterRecord' },
        //     component: () => import('@/views/wallet/records/waterRecord/index.vue'),
        //   },
        //   {
        //     path: 'proxyRecord',
        //     name: 'proxyRecord',
        //     meta: { title: 'proxyRecord' },
        //     component: () => import('@/views/wallet/records/proxyRecord/index.vue'),
        //   },
        //   {
        //     path: 'loginRecord',
        //     name: 'loginRecord',
        //     meta: { title: 'home_page_loginRecord' },
        //     component: () => import('@/views/wallet/records/loginRecord/index.vue'),
        //   },
        // ]
      },
      {
        path: 'proxyCooperation',
        name: 'proxyCooperation',
        meta: { title: 'proxy_page_agent' },
        component: () => import('@/views/wallet/proxyCooperation/index.vue'),
      },
      {
        path: 'proxyIntroduction',
        name: 'proxyIntroduction',
        meta: { title: 'proxy_page_agentRule' },
        component: () => import('@/views/wallet/proxyIntroduction/index.vue'),
      },
      {
        path: 'records',
        name: 'records',
        meta: { title: 'records' },
        component: () => import('@/views/wallet/records/index.vue'),
        // children: [
        //   {
        //     path: 'rechargeRecord',
        //     name: 'rechargeRecord',
        //     meta: { title: 'mine_myload' },
        //     component: () => import('@/views/wallet/records/rechargeRecord/index.vue'),
        //   },
        //   {
        //     path: 'withdrawRecord',
        //     name: 'withdrawRecord',
        //     meta: { title: 'mine_mywithdraw' },
        //     component: () => import('@/views/wallet/records/withdrawRecord/index.vue'),
        //   },
        //   {
        //     path: 'betRecord',
        //     name: 'betRecord',
        //     meta: { title: 'mine_mybet' },
        //     component: () => import('@/views/wallet/records/betRecord/index.vue'),
        //   },
        //   {
        //     path: 'accountsRecord',
        //     name: 'accountsRecord',
        //     meta: { title: 'mine_myaudit' },
        //     component: () => import('@/views/wallet/records/accountsRecord/index.vue'),
        //   },
        //   {
        //     path: 'auditRecord',
        //     name: 'auditRecord',
        //     meta: { title: 'recharge_inspect_record' },
        //     component: () => import('@/views/wallet/records/auditRecord/index.vue'),
        //   },
        //   {
        //     path: 'waterRecord',
        //     name: 'waterRecord',
        //     meta: { title: 'home_page_waterRecord' },
        //     component: () => import('@/views/wallet/records/waterRecord/index.vue'),
        //   },
        //   {
        //     path: 'proxyRecord',
        //     name: 'proxyRecord',
        //     meta: { title: 'proxyRecord' },
        //     component: () => import('@/views/wallet/records/proxyRecord/index.vue'),
        //   },
        //   {
        //     path: 'loginRecord',
        //     name: 'loginRecord',
        //     meta: { title: 'home_page_loginRecord' },
        //     component: () => import('@/views/wallet/records/loginRecord/index.vue'),
        //   },
        // ]
      },
    ],
  },
];
const router = createRouter({
  routes,
  history: createWebHistory(),
});

const waitForCondition = (condition: Function, next: any, isNext: boolean) => {
  return new Promise(async () => {
    let timer;
    if (condition()) {
      clearTimeout(timer);
      timer = null;
      if (isNext) {
        next(isNext);
      } else {
        await User(pinia).setLogin(true);
        next('/');
      }
    } else {
      timer = setTimeout(() => {
        console.log(55555);

        waitForCondition(condition, next, isNext);
      }, 200);
    }
  });
};

router.beforeEach(async (to: any, _from: any, next: any) => {
  if (Local.get('user')) {
    await waitForCondition(
      () => (wsOpen.value && loadingEnd.value), next, true
    )
  } else {
    if (['home', 'gameMain', 'proxyIntroduction', 'gamingPlatform', 'gameRecords', 'gameDetail', 'activity', 'customer'].includes(to.name)) {
      await waitForCondition(
        () => wsOpen.value, next, true
      )
    } else {

      await waitForCondition(
        () => wsOpen.value, next, false
      )
    }
  }
  next()


})
router.afterEach(() => {
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch {
    console.error('滚动到顶部失败');
  }
});
export default router;
