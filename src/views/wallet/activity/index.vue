<template>
  <div class="activity">
    <div class="tab">
      <span
        :class="state.active == i ? 'active' : ''"
        v-for="(_game, g, i) in activityTitleList"
        :key="i"
        @click="changeTab(i, g)"
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


    <n-modal v-model:show="state.showModal">
      <n-card
        class="avatar_set"
        @close="state.showModal = false"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <!--        <Imgt v-if="state.detailImg" :src="t(state.detailImg)" />-->
        <!--        <FreeLoot v-model="state.showModal"/>-->
        <div class="freeLoot main_setting">
          <h4 class="top_title">
            <span>{{ '首充X3' }}</span>
            <i>
              <iconpark-icon
                @click="state.showModal = false"
                icon-id="tanctongyguanb"
                color="#fff"
                size="1.2rem"
              ></iconpark-icon>
            </i>
          </h4>

          <div class="main_body">

            <FirstDepositThree typeInfo="defineModelInfo"/>
          </div>
        </div>
      </n-card>
    </n-modal>
  </div>
  <!-- <Calendar class="calendar" :markDate="[]" :markDateMore="state.arr" @clickToday="clickToday" agoDayHide="1530115221"
      @signInEvent="signInEvent" @choseDay="clickDay" :data="state.dataList" :sundayStart="false" :dayNum="state.dayNum">
    </Calendar> -->
  <SignIn ref="signModal"/>
</template>

<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  reactive,
  ref,
  defineAsyncComponent,
  computed,
} from "vue";
// import { useRoute } from "vue-router";
import { useI18n } from 'vue-i18n';
import { Page } from '@/store/page';
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import { User } from '@/store/user';
import FirstDepositThree from '@/views/wallet/activity/components/firstDepositThree.vue';


const userInfo = User(pinia);
// import Calendar from '@/components/Calendar.vue'

const SignIn = defineAsyncComponent(
  () => import("@/views/wallet/activity/components/signIn.vue")
);
const pageStore = Page();

const { activityTitleList } = storeToRefs(Page(pinia));

const signModal = ref();
const { t } = useI18n();
const seleteType: any = ref("home_page_all");
const changeTab = (i: any, g: any) => {
  state.active = i;
  seleteType.value = g;
};

const allactivityList = computed(() => {
  return activityTitleList.value && activityTitleList.value[seleteType.value];
});

const state: any = reactive({
  active: 0,
  name: "home_page_all",
  link: "",
  showModal: true,
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
});
const handleActivetys = async (res: any) => {
  await Page(pinia).setActivityTitleList(res.promo);
};


const defineModelInfo: any = ref(10000)

// 点击按钮弹窗
const defineModel = (item: any) => {
  // 免费夺宝活动弹窗显示
  defineModelInfo.value = item.id

  if (item.id === 10000) {
    // state.showModal = true;
    pageStore.openFreeModal();
  }
  if (item.id === 9020) {
    openSignModal()
  }
  // 首充X3
  if (item.id === 8001) {
    state.showModal = true;
    // userInfo.setFirstDeposit(true)
  }
};

// 打开签到
const openSignModal = () => {
  signModal.value.onClose();
}

onMounted(() => {
  // state.name = route.query.typeName
  const req = NetPacket.req_activites();
  req.show = 0;
  Net.instance.sendRequest(req);
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_activites, handleActivetys);

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
    min-width: 852px;
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
