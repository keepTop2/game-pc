

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
    path: '/customer',
    name: 'customer',
    meta: { title: '' },
    component: () => import('@/views/home/customer.vue'),
  },
  {
    path: '/gameMain',
    name: 'gameMain',
    meta: { title: 'gameMain' },
    component: () => import('@/views/gameMain/index.vue'),
    children: [
      {
        path: 'gameRecords',
        name: 'gameRecords',
        meta: { title: 'gameRecords' },
        component: () => import('@/views/gameMain/gameRecords/index.vue'),
      },
      {
        path: 'gamingPlatform',
        name: 'gamingPlatform',
        meta: { title: 'gamingPlatform' },
        component: () => import('@/views/gameMain/gamingPlatform/index.vue'),
      },
      {
        path: 'gameDetail',
        name: 'gameDetail',
        meta: { title: 'gameDetail' },
        component: () => import('@/views/gameMain/gameDetail/index.vue'),
      },
      {
        path: 'activity',
        name: 'activity',
        meta: { title: 'activity' },
        component: () => import('@/views/gameMain/activity/index.vue'),
      },
      {
        path: 'proxyCooperation',
        name: 'proxyCooperation',
        meta: { title: 'proxyCooperation' },
        component: () => import('@/views/gameMain/proxyCooperation/index.vue'),
      },
      {
        path: 'proxyIntroduction',
        name: 'proxyIntroduction',
        meta: { title: 'proxyIntroduction' },
        component: () => import('@/views/gameMain/proxyIntroduction/index.vue'),
      },
      {
        path: 'levelInfo',
        name: 'levelInfo',
        meta: { title: 'levelInfo' },
        component: () => import('@/views/level/levelInfo.vue'),
      },
      {
        path: 'levelRule',
        name: 'levelRule',
        meta: { title: 'levelRule' },
        component: () => import('@/views/level/rules.vue'),
      },
      {
        path: 'club/:openType',
        name: 'club',
        meta: { title: 'home_page_club' },
        component: () => import('@/views/club/newClub.vue'),
      },
      {
        path: 'club/next',
        name: 'clubNext',
        meta: { title: 'home_page_club' },
        component: () => import('@/views/club/clubNext.vue'),
      },
    ]
  },
  // {
  //   path: '/proxy',
  //   name: 'proxy',
  //   meta: { title: 'proxy' },
  //   component: () => import('@/views/proxy/index.vue'),
  //   children: [

  //   ]
  // },
  {
    path: '/wallet',
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
        meta: { title: 'securitySettings' },
        component: () => import('@/views/wallet/securitySettings/index.vue'),
      },
      {
        path: 'rechargeRecord',
        name: 'rechargeRecord',
        meta: { title: 'rechargeRecord' },
        component: () => import('@/views/wallet/rechargeRecord/index.vue'),
      },
      {
        path: 'withdrawRecord',
        name: 'withdrawRecord',
        meta: { title: 'withdrawRecord' },
        component: () => import('@/views/wallet/withdrawRecord/index.vue'),
      },
      {
        path: 'accountsRecord',
        name: 'accountsRecord',
        meta: { title: 'accountsRecord' },
        component: () => import('@/views/wallet/accountsRecord/index.vue'),
      },
      {
        path: 'proxyRecord',
        name: 'proxyRecord',
        meta: { title: 'proxyRecord' },
        component: () => import('@/views/wallet/proxyRecord/index.vue'),
      },
      {
        path: 'betRecord',
        name: 'betRecord',
        meta: { title: 'betRecord' },
        component: () => import('@/views/wallet/betRecord/index.vue'),
      },
      {
        path: 'auditRecord',
        name: 'auditRecord',
        meta: { title: 'auditRecord' },
        component: () => import('@/views/wallet/auditRecord/index.vue'),
      },
      {
        path: 'loginRecord',
        name: 'loginRecord',
        meta: { title: 'loginRecord' },
        component: () => import('@/views/wallet/loginRecord/index.vue'),
      },
      {
        path: 'waterRecord',
        name: 'waterRecord',
        meta: { title: 'waterRecord' },
        component: () => import('@/views/wallet/waterRecord/index.vue'),
      },
      {
        path: 'myPromo',
        name: 'myPromo',
        meta: { title: '我的优惠' },
        component: () => import('@/views/wallet/promo/index.vue'),
      },
      {
        path: 'paymentManagement',
        name: 'paymentManagement',
        meta: { title: '支付管理' },
        component: () => import('@/views/wallet/paymentManagement/index.vue'),
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
        component: () => import('@/views/wallet/withdrawFunds/withdrawMoney.vue'),
      },
    ]
  },

];
const router = createRouter({
  routes,
  history: createWebHistory(),
});

const waitForCondition = (condition: Function, next: any, isNext: boolean) => {
  return new Promise(async () => {
    let timer
    if (condition()) {
      clearTimeout(timer)
      timer = null
      if (isNext) {
        next(isNext)
      } else {
        await User(pinia).setLogin(true)
        next('/')
      }

    } else {
      timer = setTimeout(() => {
        console.log(55555);

        waitForCondition(condition, next, isNext);
      }, 200);
    }
  })
}

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



})
router.afterEach(() => {
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch {
    console.error('滚动到顶部失败')
  }
})
export default router;
