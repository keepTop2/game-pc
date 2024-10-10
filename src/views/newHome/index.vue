<template>
  <div class="home">
    <!-- <Sidebar /> -->
    <div class="content">
      <div class="announcement">
        <div class="carousel_wrap">
          <n-carousel draggable>
            <Imgt class="carousel" src="/img/header/carousel1.webp" />
          </n-carousel>
          <p style="height: 40px">
            <iconpark-icon icon-id="Group39360" size="1rem"></iconpark-icon>
            <n-carousel :show-dots="false" autoplay draggable direction="vertical" v-if="textAnnouncement">
              <span v-for="(v, i) in textAnnouncement" :key="i" style="height: 40px" class="carousel_span">{{ t(v)
                }}</span>
            </n-carousel>
          </p>
        </div>
        <div class="carousel_wrap_des">
          <Imgt class="carousel" src="/img/header/carousel2.webp" />
        </div>
      </div>

      <div class="game_detail">
        <div class="game_list">
          <p class="game_type">
            <span class="text">
              <span>即将开赛</span>
            </span>
            <span class="more">{{ t("home_page_more") }}</span>
          </p>
          <n-carousel style="position: static" :slides-per-view="3.5" :space-between="10" :loop="false" draggable
            show-arrow>
            <Imgt class="game_img" :src="`/img/home/kaisai.png`" v-for="i in 8" :key="i" />
            <template #arrow="{ prev, next }">
              <div class="game_seach">
                <span>
                  <iconpark-icon class="left" icon-id="fangxiangicon04" size=".8rem" @click="prev"></iconpark-icon>
                  <iconpark-icon class="right" icon-id="fangxiangicon01" size=".8rem" @click="next"></iconpark-icon>
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
            <span class="more">{{ t("home_page_more") }}</span>
          </p>
          <n-carousel style="position: static" :slides-per-view="3" :space-between="10" :loop="false" draggable
            show-arrow>
            <Imgt class="game_img" :src="`/img/home/remen.png`" v-for="i in 8" :key="i" />
            <template #arrow="{ prev, next }">
              <div class="game_seach">
                <span>
                  <iconpark-icon class="left" icon-id="fangxiangicon04" size=".8rem" @click="prev"></iconpark-icon>
                  <iconpark-icon class="right" icon-id="fangxiangicon01" size=".8rem" @click="next"></iconpark-icon>
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
// import Sidebar from '@/components/Sidebar.vue';
import { onMounted, onUnmounted, reactive } from "vue";
import Imgt from "@/components/Imgt.vue";
// import { NetMsgType } from "@/netBase/NetMsgType";
// import { MessageEvent2 } from "@/net/MessageEvent2";
import homeOther from "./homeOther.vue";
import pinia from "@/store/index";
import { storeToRefs } from "pinia";
import { Page } from "@/store/page";
import { useI18n } from "vue-i18n";
// import { useRouter } from "vue-router";
const { t } = useI18n();
// const router = useRouter();
const page = Page(pinia);
// const isVisible = ref(0);
const { bannerArr, textAnnouncement } = storeToRefs(page);

// const state: any = reactive({
//   // gameActive: 0,
//   tabs: [
//     {
//       icon: "Group39096",
//       name: "home_page_slot",
//       color: "slot_machine",
//       value: "",
//     },
//     {
//       icon: "Group39095",
//       name: "home_page_live",
//       color: "live",
//       value: "",
//     },

//     {
//       icon: "Group39097",
//       name: "home_page_eSports",
//       color: "gaming",
//       value: "",
//     },
//     {
//       icon: "Group39098",
//       name: "home_page_fishing",
//       color: "fish",
//       value: "",
//     },
//     {
//       icon: "Group39099",
//       name: "home_page_sportsGame",
//       color: "sports",
//       value: "",
//     },
//     {
//       icon: "Group1556235309",
//       name: "home_page_lotteryGame",
//       color: "lottery",
//       value: "",
//     },
//   ],
// });
// const platformItemClick = (item: any) => {
//   console.log(item);
//   router.push({
//     path: "/gameMain/gameDetail",
//     query: {
//       id: 1,
//       name: "首页跳转",
//     },
//   });
// };
// const allPlatForm = (item: any) => {
//   console.log(item);
//   router.push({
//     path: "/gameMain/gamingPlatform",
//     query: {
//       id: 1,
//       name: item.name,
//     },
//   });
// };
// const getGameList = (res: any) => {
//   debugger
//   console.log(res);

// }
onMounted(() => {
  // MessageEvent2.addMsgEvent(
  //   NetMsgType.msgType.msg_notify_platform_gametype_list,
  //   getGameList
  // );
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

:deep(.n-carousel__dots) {
  display: none;
}

.content {
  margin: 32px 0 30px 10px;
  width: 100%;

  .announcement {
    position: relative;
    display: flex;

    img {
      object-fit: cover;
    }

    height: 424px;

    .carousel_wrap {
      width: 941px;
      height: 100%;
      margin-right: 15px;
    }

    .carousel_wrap_des {
      width: 444px;
      height: 100%;
    }

    >p {
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      height: 40px;
      padding: 0 14.5px;
      background-color: rgba(0, 0, 0, 0.3);
      margin: 0;
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 16px;
      // border-bottom-left-radius: 15px;
      // border-bottom-right-radius: 15px;
    }
  }
}

:deep(.game_detail) {
  position: relative;

  .game_list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    // align-items: center;

    box-sizing: border-box;

    >p {
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

    >.text {
      display: flex;

      >b {
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

    >.more {
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
  .game_img {
    width: 453px !important;
    height: 262px !important;
    object-fit: cover;
  }
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

    >.left,
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
</style>
