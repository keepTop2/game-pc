<template>
  <div class="freeLoot">
    <div class="banner">
      <img src="/img/activity/image.webp" alt="" />
      <span>活动时间：2024.1.1 ~ 2024.6.30</span>
    </div>

    <div class="plan">
      <div class="header">
        <Imgt src="/img/wallet/trialGame.svg" class="pointer" />
      </div>
      <div class="planListBox">
        <div class="planList">
          <div
            class="planListItem"
            v-for="(item, index) in planList.data"
            @click="gameStart(item)"
            :style="{ background: `url(/img/home/colect_${index % planList.data.length ||5}.png) no-repeat` }"
            :key="index"
          >
            <span>{{ t(item.gameId || 49) }}</span>
          </div>
        </div>
        <n-button @click="pushPlanListData" v-if="planList.data.length>= 50" tertiary class="planButton">
          点击加载更多
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useI18n } from 'vue-i18n';
import Imgt from '@/components/Imgt.vue';
import { onMounted, onUnmounted, reactive } from 'vue';

import { useI18n } from 'vue-i18n';
import { NetPacket } from '@/netBase/NetPacket.ts';
import { Net } from '@/net/Net.ts';
import { MessageEvent2 } from '@/net/MessageEvent2.ts';
import { NetMsgType } from '@/netBase/NetMsgType.ts';
import { Message } from '@/utils/discreteApi'
// import { useRoute, useRouter } from 'vue-router';
// import Imgt from '@/components/Imgt.vue';
const { t } = useI18n();
const props = defineProps<{ freeTreasureInfo: any }>();

const planList: any = reactive({
  page: 1,
  pageSize: 15,
  roundid: 0,
  data: [],
});

const pushPlanListData = () => {

};

const gameStart = (item: any) => {
  getGameUrl({agentId: 88888888,device_type: 0,gameId:item.roomId,kindId: 999  })
  // agentId
  //   :
  //   88888888
  // device_type
  //   :
  //   0
  // gameId
  //   :
  //   "400"
  // kindId
  //   :
  //   "999"
};

const getGameUrl = (item: any) =>{
  // req_3rd_game_login
  const req = NetPacket.req_3rd_game_login();
  req.agentId = item.agentId;
  req.device_type = item.device_type;
  req.gameId = item.gameId.toString();
  req.kindId = item.kindId.toString();
  req.lang = 1;
  Net.instance.sendRequest(req);
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_3rd_game_login_result,
    handleGameToUrl,
  );
}

const handleGameToUrl = (res: any) => {
  if (!res.url) return Message.success('打开失败，请刷新重试')
  window.open(res.url)
}

onMounted(() => {
  if (props.freeTreasureInfo) {
    planList.data = [...props.freeTreasureInfo.gameIds];
  }
});

onUnmounted(() => {
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_3rd_game_login_result, null);
});
</script>

<style scoped lang="less">
.freeLoot {
  width: 100%;
  height: 100%;
  padding: 20px 0 30px;
  .banner {
    border-radius: 0;
    > img {
      width: 100%;
      height: 150px;
      border-radius: 6px;
      margin-bottom: 12px;
    }
    > span {
      font-size: 14px;
    }
  }
  .plan {
    border: 1px solid rgba(38, 41, 76, 1);
    background-color: rgba(23, 27, 68, 1);
    //min-height: calc(100% - 230px);
    margin-top: 14px;
    border-radius: 12px;
    > .header {
      display: flex;
      justify-content: center;
      > img {
        width: 214px;
        height: 32px;
        margin-top: -6px;
      }
    }
    > .planListBox {
      height: 500px;
      overflow-y: auto;
      padding: 20px 40px 0;
      > .planList {
        display: flex;
        flex-wrap: wrap;
        //justify-content: space-between;
        gap: 21px;
        align-items: center;

        > .planListItem {
          position: relative;
          display: flex;
          align-items: end;
          justify-content: center;
          width: 120px;
          height: 120px;
          background-size: contain !important;
          span {
            display: block;
            width: 73px;
            //line-height: 18;
            text-align: center;
            font-size: 12px;
            white-space: nowrap; /* 保持文本在一行显示 */
            overflow: hidden; /* 隐藏溢出的文本 */
            text-overflow: ellipsis; /* 显示省略号 */
          }
        }
        > .planListItem:hover {
          cursor: pointer;
          &::after {
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            background-image: url('/img/wallet/gamePlan.webp');
            background-repeat: no-repeat;
            background-size: 70px;
            background-position: center;
            background-color: rgba(47, 19, 148, 0.7) !important;
          }
        }
      }
      > .planButton {
        width: 100%;
        background-image: none;
        border: 1px solid rgba(51, 56, 107, 1);
        margin: 16px 0 30px;
        color: rgba(51, 56, 107, 1);
        font-size: 12px;
      }
    }
  }
}
</style>
