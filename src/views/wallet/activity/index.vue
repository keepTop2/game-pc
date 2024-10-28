<template>
  <div class="activity">
    <div class="tab">
      <span
        :class="state.active == i ? 'active' : ''"
        v-for="(_game, g, i) in activityTitleList"
        :key="i"
        @click="changeTab(_game, i)"
        >{{ t(g) }}</span
      >
    </div>

    <div class="img_box">
      <div v-for="item in allactivityList" :key="item.id" @click="defineModel(item)">
        <img :src="item.pic_link" alt="" />
        <p>
          <i>{{ item.name }}</i>
          <span
            >活动详情
            <iconpark-icon
              class="icon"
              icon-id="huodiconjinr"
              size=".7rem"
            ></iconpark-icon>
          </span>
        </p>
      </div>
    </div>
    <!--    <n-modal v-model:show="state.showModal">-->
    <!--      <n-card :title="t('activity_page_detail')" closable class="avatar_set" @close="state.showModal = false" :bordered="false" size="huge"-->
    <!--        role="dialog" aria-modal="true">-->
    <!--&lt;!&ndash;        <Imgt v-if="state.detailImg" :src="t(state.detailImg)" />&ndash;&gt;-->
    <!--        <FreeLoot/>-->
    <!--      </n-card>-->
    <!--    </n-modal>-->
    <n-modal v-model:show="pageStore.isFreeModalVisible">
      <n-card
        class="avatar_set"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <!--        <Imgt v-if="state.detailImg" :src="t(state.detailImg)" />-->
        <!--        <FreeLoot v-model="state.showModal"/>-->
        <div class="freeLoot main_setting">
          <h4 class="top_title">
            <span>{{ t("免费夺宝") }}</span>
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
                v-if="freeTreasureInfo"
                :is="state.freeLootComponent"
                :freeTreasureInfo="freeTreasureInfo"
              ></component>
            </div>
          </div>
        </div>
      </n-card>
    </n-modal>
  </div>
  <!-- <Calendar class="calendar" :markDate="[]" :markDateMore="state.arr" @clickToday="clickToday" agoDayHide="1530115221"
      @signInEvent="signInEvent" @choseDay="clickDay" :data="state.dataList" :sundayStart="false" :dayNum="state.dayNum">
    </Calendar> -->
</template>

<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  reactive,
  markRaw,
  ref,
  defineAsyncComponent,
} from "vue";
// import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { Page } from "@/store/page";
import pinia from "@/store/index";
import { storeToRefs } from "pinia";
import { NetPacket } from "@/netBase/NetPacket";
import { Net } from "@/net/Net";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";

// import FreeLoot from '@/views/wallet/activity/components/freeLoot.vue';
// import FreeLootRanking from '@/views/wallet/activity/components/freeLootRanking.vue';
// import FreeLootRule from '@/views/wallet/activity/components/freeLootRule.vue';
// import Calendar from '@/components/Calendar.vue'

const FreeLoot = defineAsyncComponent(
  () => import("@/views/wallet/activity/components/freeLoot.vue")
);
const FreeLootRanking = defineAsyncComponent(
  () => import("@/views/wallet/activity/components/freeLootRanking.vue")
);
const FreeLootRule = defineAsyncComponent(
  () => import("@/views/wallet/activity/components/freeLootRule.vue")
);

const pageStore = Page();

const { activityTitleList } = storeToRefs(Page(pinia));

const { t } = useI18n();
// const router = useRouter();
// const route = useRoute();
const allactivityList: any = ref([]);
const changeTab = (_game: any, i: any) => {
  state.active = i;
  allactivityList.value = _game;
};

const state: any = reactive({
  active: 0,
  name: "home_page_all",
  link: "",
  showModal: false,
  detailImg: null,
  arr: [
    {
      date: "2018/8/1",
      className: "mark1",
    },
    {
      date: "2018/8/13",
      className: "mark2",
    },
  ],
  freeLootActive: 0,
  freeLootComponent: markRaw(FreeLoot),
  freeLootTab: [
    { name: t("free_loot"), component: markRaw(FreeLoot) },
    { name: t("free_loot_ranking"), component: markRaw(FreeLootRanking) },
    { name: t("free_loot_rule"), component: markRaw(FreeLootRule) },
    // { name: '夺宝排行榜', component: 'freeLootRanking' },
    // { name: '规则说明', component: 'freeLootRule' }
  ],
});
const handleActivetys = async (res: any) => {
  await Page(pinia).setActivityTitleList(res.promo);
  allactivityList.value = activityTitleList.value.home_page_all;
};

// 点击按钮弹窗
const defineModel = (item: any) => {
  // 免费夺宝活动弹窗显示
  if (item.id === 10000) {
    state.showModal = true;
    pageStore.openFreeModal();
  }
};

const changeFreeLootTab = (item: any, tabId: number) => {
  state.freeLootActive = tabId;
  state.freeLootComponent = item.component;
};

const freeTreasureInfo = ref(null);
const handleFreeTreasureInfo = (res: any) => {
  freeTreasureInfo.value = res;
};

onMounted(() => {
  // state.name = route.query.typeName
  // 获取所有活动  activities_category_icon_
  const req = NetPacket.req_activites();
  req.show = 0;
  Net.instance.sendRequest(req);
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_activites, handleActivetys);

  //msg reg free_treasure_info
  const req_free_treasure_info = NetPacket.req_free_treasure_info();
  // req = {}
  Net.instance.sendRequest(req_free_treasure_info);
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_free_treasure_info,
    handleFreeTreasureInfo
  );
});
onUnmounted(() => {
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_free_treasure_info, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_activites, null);
});
</script>

<style lang="less" scoped>
.avatar_set {
  :deep(.n-card__content) {
    padding: 0;
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

.activity {
  border-radius: 16px;
  background: linear-gradient(350deg, #090b32 7.62%, #0d1042 92.38%);
  padding: 40px;
  min-height: 766px;
  box-sizing: border-box;

  .activity_img {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;

    img {
      width: 500px;
      height: 160px;
    }
  }

  .img_box {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    justify-content: space-between;

    > div {
      width: 500px;
      height: 202px;
      border-radius: 12px;
      background: #0c0e2f;
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;

      > img {
        height: 160px;
      }

      > p {
        padding: 10px 16px;
        display: flex;
        justify-content: space-between;
        margin: 0;
        font-size: 16px;
        align-items: center;

        > i {
          font-style: normal;
          color: #afb6bd;
        }

        > span {
          cursor: pointer;
          color: #fff;
          height: 26px;
          line-height: 1;
          border-radius: 6px;
          padding: 4px 10px;
          display: flex;
          align-items: center;
          background: linear-gradient(180deg, #f7dc82 0%, #ca8528 100%),
            linear-gradient(180deg, #f7dc82 0%, #a76712 100%);
          box-shadow: 0.5px 0.5px 1px 0px #ffeab2 inset;

          > .icon {
            margin-left: 2px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
