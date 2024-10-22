<template>
  <div class="activity">
    <div class="tab">
      <span
        :class="state.active == i ? 'active' : ''"
        v-for="(game, g, i) in activityTitleList"
        :key="i"
        @click="changeTab(i)"
        >{{ t(g) }}</span
      >
    </div>
    <div class="img_box">
      <div v-for="item in homeActivityList" :key="item.id">
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
        :title="t('activity_page_detail')"
        closable
        @close="state.showModal = false"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <Imgt v-if="state.detailImg" :src="t(state.detailImg)" />
      </n-card>
    </n-modal>
  </div>
  <!-- <Calendar class="calendar" :markDate="[]" :markDateMore="state.arr" @clickToday="clickToday" agoDayHide="1530115221"
      @signInEvent="signInEvent" @choseDay="clickDay" :data="state.dataList" :sundayStart="false" :dayNum="state.dayNum">
    </Calendar> -->
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, watch } from "vue";
import Imgt from "@/components/Imgt.vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { Page } from "@/store/page";
import pinia from "@/store/index";
import { storeToRefs } from "pinia";
import { NetPacket } from "@/netBase/NetPacket";
import { Net } from "@/net/Net";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";
// import Calendar from '@/components/Calendar.vue'

const { activityTitleList, homeActivityList } = storeToRefs(Page(pinia));

const { t } = useI18n();
// const router = useRouter();
const route = useRoute();
const changeTab = (tabId: number) => {
  state.active = tabId;
  if (state.active == 1) {
    state.loginList.account.show = false;
    state.loginList.email.show = true;
  } else {
    state.loginList.account.show = true;
    state.loginList.email.show = false;
  }
};
const activityDetail = (item: string) => {
  console.log(item);

  let str1 = item.split("_");
  let str2 = "";
  if (str1.length > 0) {
    str2 = str1[0] + "_pc_" + str1[1] + "_" + str1[2];
  }
  if (t(str2).indexOf("http") != -1) {
    return t(str2);
  } else {
    return "";
  }
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
});
const popDetail = (item: any) => {
  state.detailImg = null;
  state.showModal = true;
  state.detailImg = activityDetail(item.content);
};
// const closeToast = (header: string, img: string, msg: string) => {
//   state.toastText = {
//     header: header,
//     isShow: true,
//     img: img,
//     msg: msg
//   }
//   setTimeout(() => {
//     state.toastText = {
//       header: '',
//       isShow: false, // toast 控制
//       img: '', // toast 显示图片
//       msg: '' // toast 提示语
//     }
//   }, 3000)
// }
// const signInEvent = async () => {
//   if (state.activeDate.IsSignIn === 'true') {
//     return closeToast('签到失败', '', '今日已签到')
//   }
//   let str = state.activeDate.date.split('-') // 点击的时间
//   let today = new Date()
//   let year = today.getFullYear() // 今天哪一年
//   let tadayDate = today.getDate() // 今天几号
//   let tadayMonth = today.getMonth() + 1 // 今天属于几月
//   if (Number(str[0]) > year) {
//     return closeToast('签到失败', '', '未到活动时间')
//   } else if (Number(str[0]) < year && Number(str[1]) !== 12) {
//     return closeToast('签到失败', '', '选择时间有误')
//   } else if (Number(str[0]) < year && Number(str[1]) === 12) {
//     // sign()
//   } else {
//     if (Number(str[1]) > tadayMonth || Number(str[2]) > tadayDate) {
//       return closeToast('签到失败', '', '未到活动时间')
//     } else {
//     //   sign()
//     }
//   }
// }
// const clickToday = (data: any) => {
//   if (!state.flag) {
//     state.activeDate = data
//     state.flag = true
//     // console.log('跳到了本月今天', data) // 跳到了本月
//   }
// }
// const clickDay = (data: any) => {
//   state.activeDate = data
// }
const handleActivetys = async (res: any) => {
  await Page(pinia).setActivityTitleList(res.promo);
};
onMounted(() => {
  // state.name = route.query.typeName
  // 获取所有活动  activities_category_icon_
  const req = NetPacket.req_activites();
  req.show = 0;
  Net.instance.sendRequest(req);
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_activites, handleActivetys);
});
onUnmounted(() => {
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_activites, null);
});
</script>

<style lang="less" scoped>
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
