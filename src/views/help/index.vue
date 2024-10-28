<template>
  <n-flex class="help_box">
    <div class="help_nav">
      <div class="nav_item" v-for="(item, index) in navArr" :key="index">
        <n-flex class="nav_top pointer" align="center">
          <iconpark-icon :icon-id="item.icon" color="#fff" size="1.042rem"></iconpark-icon>
          <span>{{t(item.label)}}</span>
        </n-flex>
        <div class="nav_list">
          <div :class="`pointer ${curType === item1.value && 'active'}`"
               @click="goToPage(item1)"
               v-for="(item1, index1) in item.children"
               :key="index+'_'+index1">
            {{t(item1.label)}}
          </div>
        </div>
      </div>
    </div>

    <div class="help_con_box">
      <accountTemp v-if="curType === 'account'"/>
      <promoTemp v-if="curType === 'promo'"/>
      <jingcaiTemp v-if="curType === 'jingcai'"/>
      <privacyTemp v-if="curType === 'privacy'"/>
      <ruleTemp v-if="curType === 'rule'"/>
      <depositTemp v-if="curType === 'deposit'"/>
      <withdrawTemp v-if="curType === 'withdraw'"/>
      <merchantTemp v-if="curType === 'merchant'"/>
      <policyRuleTemp v-if="curType === 'policyRule'"/>
      <contactUsTemp v-if="curType === 'contactUs'"/>
      <justTemp v-if="curType === 'just'"/>
    </div>
  </n-flex>
</template>

<script setup lang='ts'>
import { defineAsyncComponent, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
const accountTemp = defineAsyncComponent(() => import('./temp/account.vue'));
const promoTemp = defineAsyncComponent(() => import('./temp/promo.vue'));
const jingcaiTemp = defineAsyncComponent(() => import('./temp/jingcai.vue'));
const privacyTemp = defineAsyncComponent(() => import('./temp/privacy.vue'));
const ruleTemp = defineAsyncComponent(() => import('./temp/rule.vue'));
const depositTemp = defineAsyncComponent(() => import('./temp/deposit.vue'));
const withdrawTemp = defineAsyncComponent(() => import('./temp/withdraw.vue'));
const merchantTemp = defineAsyncComponent(() => import('./temp/merchant.vue'));
const policyRuleTemp = defineAsyncComponent(() => import('./temp/policyRule.vue'));
const contactUsTemp = defineAsyncComponent(() => import('./temp/contactUs.vue'));
const justTemp = defineAsyncComponent(() => import('./temp/just.vue'));

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const curType = ref(route.params.type);

const navArr = [
  {
    label: 'help_page_help', value: 'helpCenter', icon: 'grzxiconbzzx01',
    children: [{label: 'help_page_open', value: 'account'},{label: 'help_page_deposit', value: 'deposit'},{label: 'proxy_page_withDraw', value: 'withdraw'},{label: 'help_page_promoRule', value: 'promo'},]
  },
  {
    label: 'help_page_company', value: 'company', icon: 'grzxiconbzzx02',
    children: [{label: 'help_page_jingcai', value: 'jingcai'},{label: 'help_page_termsRule', value: 'rule'},{label: 'help_page_merchant', value: 'merchant'},{label: 'help_page_privacy', value: 'privacy'},]
  },
  {
    label: 'help_page_fair', value: 'fair', icon: 'grzxiconbzzx03',
    children: [{label: 'help_page_just', value: 'just'},]
  },
  {
    label: 'help_page_policy', value: 'policy', icon: 'grzxiconbzzx04',
    children: [{label: 'help_page_policy', value: 'policyRule'},]
  },
  {
    label: 'help_page_contact', value: 'contact', icon: 'grzxiconbzzx05',
    children: [{label: 'help_page_contact', value: 'contactUs'},]
  },
]

const goToPage = (item: any) => {
  const url = item.value
  if (url) {
    router.push(`/help/${url}`)
  }
}

watch(
  () => route.params.type,
  (n) => {
    console.log('======1111', n)
    curType.value = n;
  },
  {
    deep: true,
  },
);
</script>

<style lang='less' scoped>
.help_box {
  width: 1400px;
  margin: 10px auto 60px;
  font-size: 16px;
  color: #fff;

  .help_nav {
    width: 280px;
    height: 1103px;
    border-radius: 16px;
    background: #14173A;
    border: 1px solid #26294C;
    padding: 24px;

    .nav_item {
      .nav_top {
        font-weight: 500;
        gap: 3px !important;
        margin-bottom: 24px;
        span {
          flex: 1;
        }
      }
      .nav_list {
        padding-left: 23px;
        >div {
          margin-bottom: 24px;
          color: #AFB6BD;
          &.active {
            color: #fff;
          }
        }
      }
    }
  }
  .help_con_box {
    width: 1096px;
    height: 1103px;
    border-radius: 16px;
    background: #14173A;
    border: 1px solid #26294C;
    overflow-y: auto;
  }
}
</style>
