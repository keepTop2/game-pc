

<template>

  <n-card
    class="avatar_set"
    :bordered="false"
    size="huge"
    role="dialog"
    aria-modal="true"
  >
    <div class="freeLoot main_setting">
      <h4 class="top_title">
        <span>{{ t('免费夺宝') }}</span>
        <i>
          <iconpark-icon
            @click="pageStore.closeFreeModal"
            icon-id="tanctongyguanb"
            color="#fff"
            size="1.2rem"
          ></iconpark-icon>
        </i>
      </h4>

      <div class="main_body">
        <div class="tab">
              <span
                :class="state.freeLootActive == i ? 'active' : ''"
                v-for="(item, i) in state.freeLootTab"
                :key="i"
                @click="changeFreeLootTab(item, i)"
              >{{ t(item.name) }}</span
              >
        </div>
        <div class="freeComponent">
          <component

            :is="state.freeLootComponent"
          ></component>
        </div>
      </div>
    </div>
  </n-card>

</template>

<script setup lang="ts">
import { Page } from '@/store/page.ts';
import { Wallet } from '@/store/wallet.ts';
import pinia from "@/store/index";




import { defineAsyncComponent, markRaw, onMounted, onUnmounted, reactive, ref } from 'vue';

import { useI18n } from 'vue-i18n';
import { NetPacket } from '@/netBase/NetPacket.ts';
import { Net } from '@/net/Net.ts';
import { MessageEvent2 } from '@/net/MessageEvent2.ts';
import { NetMsgType } from '@/netBase/NetMsgType.ts';

const pageStore = Page()
const walletInfo = Wallet(pinia);
const { t } = useI18n();
const FreeLoot = defineAsyncComponent(() => import('@/components/FreeTreasureGrab/freeLoot.vue'),);

const FreeLootRanking = defineAsyncComponent(() => import('./freeLootRanking.vue'),);
const FreeLootRule = defineAsyncComponent(() => import('./freeLootRule.vue'),);


const state: any = reactive({
  active: 0,
  freeLootActive: 0,
  freeLootComponent: markRaw(FreeLoot),
  freeLootTab: [
    { name: t('free_loot'), component: markRaw(FreeLoot) },
    { name: t('free_loot_ranking'), component: markRaw(FreeLootRanking) },
    { name: t('free_loot_rule'), component: markRaw(FreeLootRule) },
  ],
});




const changeFreeLootTab = (item: any, tabId: number) => {
  state.freeLootActive = tabId;
  state.freeLootComponent = item.component;
};




onUnmounted(() => {
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_free_treasure_info, null);
});
</script>

<style scoped lang="less">
.avatar_set {
  background: linear-gradient(350deg, #090b32 7.62%, #0d1042 92.38%);

  :deep(.n-card__content) {
    padding: 0;
  }
  p,span {
    color: #ffffff !important;
  }

  .main_setting {
    width: 852px;
    border-radius: 14px;
    border: solid 1.4px #322c59;
    overflow: hidden;

    .top_title {
      margin: 0;
      width: 100%;
      position: relative;
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      color: #fff;
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;
      text-align: center;
      border-bottom: 1px solid #26294c;
      background-color: #14173a;

      > i {
        position: absolute;
        top: 5px;
        right: 15px;
        cursor: pointer;
      }
    }

    .main_body {
      //min-height: 900px;
      padding: 40px 40px;
      > .tab {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 44px;
        > span {
          display: block;
          width: 33%;
          font-size: 16px;
        }
      }
      > .freeComponent {
        height: 100%;
      }
    }
  }
}
</style>
