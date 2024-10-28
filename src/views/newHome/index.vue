<template>
  <div class="home">
    <!-- <Sidebar /> -->
    <div class="content">
      <carouselWrap></carouselWrap>

      <div class="game_detail">
        <div class="game_list">
          <p class="game_type">
            <span class="text">
              <span>即将开赛</span>
            </span>
            <span class="more">{{ t("home_page_more") }}</span>
          </p>
          <n-carousel
            style="position: static"
            :slides-per-view="3.5"
            :space-between="10"
            :loop="false"
            draggable
            show-arrow
          >
            <div class="tournm_wrap" v-for="item in tournm_list" :key="item.room_id">
              <div class="tournm_name">{{ item.tournm_name }}</div>
              <div class="tournm_main">
                <div class="logo">
                  <img :src="uploadUrlInfo.pc_api_url + '/' + item.tournm_logo" alt="" />
                </div>
                <div class="tournm_info">
                  <div class="player">
                    <span class="player_l">{{ item.apply_count }} player</span>
                    <span class="player_r">online</span>
                  </div>
                  <div class="player_time mt-27">
                    <iconpark-icon
                      class="left"
                      icon-id="syiconshijian"
                      size="1rem"
                    ></iconpark-icon>
                    <span>{{ getTime(item.begin_time) }}</span>
                  </div>
                  <div class="player_time mt-19" style="color: #ffffff">
                    <iconpark-icon
                      class="left"
                      icon-id="syiconshijian"
                      size="1rem"
                    ></iconpark-icon>
                    <span>{{ getTime(item.end_time) }}</span>
                  </div>
                </div>
              </div>
            </div>
            <template #arrow="{ prev, next }">
              <div class="game_seach">
                <span>
                  <iconpark-icon
                    class="left"
                    icon-id="fangxiangicon04"
                    size=".8rem"
                    @click="prev"
                  ></iconpark-icon>
                  <iconpark-icon
                    class="right"
                    icon-id="fangxiangicon01"
                    size=".8rem"
                    @click="next"
                  ></iconpark-icon>
                </span>
              </div>
            </template>
          </n-carousel>
        </div>
      </div>

      <!-- 热门优惠 -->
      <div class="game_detail re_men">
        <div class="game_list">
          <p class="game_type">
            <span class="text">
              <span>热门优惠</span>
            </span>
            <span class="more" @click="router.push('/wallet/activity')">{{
              t("home_page_more")
            }}</span>
          </p>
          <n-carousel
            style="position: static"
            :slides-per-view="3"
            :space-between="10"
            :loop="false"
            draggable
            show-arrow
          >
            <div
              v-for="item in homeActivityList"
              :key="item.id"
              class="re_men_item"
              :style="{ 'background-image': `url(${item.pic_link})` }"
            >
              <div class="re_men_item_des">
                <div class="item_name">{{ item.name }}</div>
                <div class="item_info">{{ item.details }}</div>
                <div class="item_time">倒计时:</div>
                <div class="time_content">
                  <span class="time_num">2</span>
                  <span class="time_num">1</span>
                  <span>天</span>
                  <span class="time_num">0</span>
                  <span class="time_num">7</span>
                  <span>时</span>
                  <span class="time_num">4</span>
                  <span class="time_num">5</span>
                  <span>分</span>
                </div>
                <div class="all_total">
                  <span>总派发:</span>
                  <span style="color: #f2c004">2,155,471,276</span>
                  <span>CN</span>
                </div>
              </div>
            </div>

            <template #arrow="{ prev, next }">
              <div class="game_seach">
                <span>
                  <iconpark-icon
                    class="left"
                    icon-id="fangxiangicon04"
                    size=".8rem"
                    @click="prev"
                  ></iconpark-icon>
                  <iconpark-icon
                    class="right"
                    icon-id="fangxiangicon01"
                    size=".8rem"
                    @click="next"
                  ></iconpark-icon>
                </span>
              </div>
            </template>
          </n-carousel>
        </div>
      </div>

      <!-- 首页其他 -->
      <homeOther></homeOther>
    </div>
  </div>
</template>
<script setup lang="ts" name="home">
import { onMounted, onUnmounted, ref } from "vue";
// import Imgt from "@/components/Imgt.vue";
import { NetMsgType } from "@/netBase/NetMsgType";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetPacket } from "@/netBase/NetPacket";
import { Net } from "@/net/Net";
import homeOther from "./homeOther.vue";
import pinia from "@/store/index";
import { storeToRefs } from "pinia";
import { Page } from "@/store/page";
import { useI18n } from "vue-i18n";
import carouselWrap from "./components/carouselWrap.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const { t } = useI18n();

const tournm_list: any = ref([]);

const { homeActivityList, uploadUrlInfo } = storeToRefs(Page(pinia));

const handleActivetys = async (res: any) => {
  await Page(pinia).setActivityTitleList(res.promo);
};

// 获取即将开赛数据
function getEventList() {
  const req = NetPacket.req_tournament_events_list();
  req.page = 1;
  Net.instance.sendRequest(req);
}

// 时间处理
const getTime = (itemTime: any) => {
  return `${itemTime.month}-${itemTime.day} ${itemTime.hour}:${itemTime.second}:${itemTime.minute}`;
};

// 获取近期开赛赛事
const handleGetList = (rs: any) => {
  tournm_list.value = rs.tournm_list;
  console.log(77777755, rs.tournm_list);
};

// 获取俱乐部logo上传url地址
const handleUploadUrl = async (rs: any) => {
  await Page(pinia).setUploadUrl(JSON.parse(rs.upload_url));
};

onMounted(() => {
  const req = NetPacket.req_activites();
  const req1 = NetPacket.req_resource_upload_url();
  req.show = 0;
  Net.instance.sendRequest(req);
  Net.instance.sendRequest(req1);
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_activites, handleActivetys);
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_resource_upload_url,
    handleUploadUrl
  );

  getEventList();

  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_tournament_events_list,
    handleGetList
  );
});
onUnmounted(() => {
  // MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_platform_gametype_list, null);
});
</script>

<style lang="less" scoped>
@timestamp: `new Date() .getTime() `;

.home {
  display: flex;
  width: 100%;
}

.content {
  margin: 32px 0;
  width: 100%;
}

:deep(.game_detail) {
  position: relative;
  .n-carousel__dots {
    display: none;
  }

  .game_list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    // align-items: center;

    box-sizing: border-box;

    > p {
      display: flex;
      align-items: center;
    }

    .game_img {
      width: 395px;
      height: 215px;
      object-fit: cover;
    }
  }

  .game_type {
    color: #fff;
    font-size: 22px;
    display: flex;
    justify-content: space-between;

    > .text {
      display: flex;

      > b {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 36px;
        height: 36px;
        box-sizing: border-box;
        margin-right: 10px;
        border-radius: 12px;
        background-image: linear-gradient(to right, #f5519d 30%, #ff6ad5 100%);
      }

      .live {
        background-image: linear-gradient(to right, #f5519d 30%, #ff6ad5 100%);
      }

      .slot_machine {
        background-image: linear-gradient(to right, #ef5b35 21%, #ff784e 100%);
      }

      .gaming {
        background-image: linear-gradient(to right, #8931d5 21%, #c255e8 100%);
      }

      .fish {
        background-image: linear-gradient(to right, #2bc36d 21%, #33caa9 100%);
      }

      .sports {
        background-image: linear-gradient(to right, #1256ff 21%, #2879ff 100%);
      }
    }

    > .more {
      width: 90px;
      height: 40px;
      display: flex;
      font-size: 16px;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      border: solid 1.4px #282747;
      background-color: #282747;
      cursor: pointer;
      color: #c6c4f5;
      margin-right: 110px;

      &:hover {
        color: #fff;
        background: url("/img/dialog/click.webp?t=@{timestamp}") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}

.re_men {
  .re_men_item {
    width: 453px;
    height: 263px;
    background-size: 100% 100%;
    padding: 20px 30px;
    .item_name {
      font-size: 32px;
      color: #ffffff;
      font-weight: 600;
    }
    .item_info {
      font-size: 20px;
      color: #ffffff;
    }
    .item_time {
      font-size: 16px;
      color: #ffffff;
      margin-top: 20px;
    }
    .time_content {
      span {
        font-size: 20px;
        color: #ffffff;
      }
      .time_num {
        width: 26px;
        height: 44px;
        display: inline-block;
        line-height: 44px;
        text-align: center;
        font-size: 30px;
        color: #ffffff;
        border-radius: 3px;
        margin-right: 3px;
        background: linear-gradient(
          180deg,
          rgba(29, 30, 37, 0.7) 0%,
          rgba(20, 21, 27, 0.7) 100%
        );
      }
    }
    .all_total {
      margin-top: 11px;
      width: 202px;
      height: 44px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      background: #000000b2;
      font-size: 16px;
      color: #ffffff;
      padding-left: 8px;
    }
  }
  // .game_img {
  //   width: 453px !important;
  //   height: 262px !important;
  //   object-fit: cover;
  // }
}

:deep(.game_seach) {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0px;
  top: 20px;
  z-index: 1;
  // >b {
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;

  // }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #8d81c1;

    > .left,
    .right {
      display: inline-block;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #282747;
      border-radius: 10px;
      border: solid 1.4px #282747;
      margin-left: 10px;
    }

    .left:hover,
    .right:hover {
      color: #fff;
      background: url("/img/home/sbtnBG.webp?t=@{timestamp}") no-repeat;
      background-size: cover;
    }
  }
}

.carousel_span {
  margin-left: 8.5px;
  display: flex;
  align-items: center;
}

.carousel {
  width: 100%;
  height: 424px;
  object-fit: cover;
  border-radius: 16px;
}
.tournm_wrap {
  width: 396px;
  height: 215px;
  background: linear-gradient(180deg, #0a0b22 0%, #000000 100%);
  border: 1px solid #000000;
  border-radius: 16px;
  padding: 20px 25px;
  .tournm_name {
    font-size: 24px;
    color: #ffffff;
  }
}
.tournm_main {
  display: flex;
  gap: 10px;
  .logo {
    width: 162px;
    height: 132px;
  }
  .tournm_info {
    flex: 1;
    .player {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      .player_l {
        color: #d8d8d8;
        font-size: 16px;
      }
      .player_r {
        color: #21fe6d;
        font-size: 16px;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: #21fe6d;
          left: -12px;
          top: 10px;
          border-radius: 50%;
        }
      }
    }
    .player_time {
      gap: 8px;
      display: flex;
      align-items: center;
      color: #f2c004;
      font-size: 20px;
    }
  }
}
.mt-27 {
  margin-top: 27px;
}
.mt-19 {
  margin-top: 19px;
}
</style>
