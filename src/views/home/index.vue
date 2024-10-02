<template>
  <div class="home">
    <Sidebar />
    <div class="content">
      <div class="announcement">
        <n-carousel draggable v-if="bannerArr">
          <Imgt class="carousel" v-for="(v, i) in bannerArr" :key="i" :src="t(v)" />
        </n-carousel>
        <p style="height: 40px;">
          <iconpark-icon icon-id="Group39360" size="1rem"></iconpark-icon>
          <n-carousel :show-dots="false" autoplay draggable direction="vertical" v-if="textAnnouncement">
            <span v-for="(v, i) in textAnnouncement" :key="i" style="height: 40px;" class="carousel_span">{{ t(v)
              }}</span>
          </n-carousel>
        </p>
      </div>
      <div class="game_detail" v-for="(item, idx) in state.tabs" :key="idx">
        <div class="game_list">
          <p class="game_type">
            <span class="text">
              <b :class="item.color">
                <iconpark-icon :icon-id="item.icon" color="#fff" size="1rem"></iconpark-icon>
              </b>
              <span>{{ t(item.name) }}</span>
            </span>
            <span class="more" @click="onClickGame(item, idx)">{{ t('home_page_more') }}</span>
          </p>
          <n-carousel style="position: static;" :slides-per-view="5" :space-between="20" :loop="false" draggable
            :show-arrow="true" :show-dots="false">
            <div class="game-img" v-for="(v, j) in item.value?.three_platform" :key="j"
              @click="platformItemClick(v, idx)">
              <img :src="imgPrefix + v.picture_pc" :alt="v.name[langs[lang]]" />
            </div>
            <template #arrow="{ prev, next }">
              <div class="game_seach">
                <span>
                  <iconpark-icon class="left" icon-id="Vector2" size=".8rem" @click="prev"></iconpark-icon>
                  <iconpark-icon class="right" icon-id="Vector" size=".8rem" @click="next"></iconpark-icon>
                </span>
              </div>
            </template>
          </n-carousel>
        </div>
      </div>
    </div>
    <OverLoading v-model:visible="isLoading" ></OverLoading>
  </div>
</template>
<script setup lang="ts" name="home">
import Sidebar from '@/components/Sidebar.vue';
import { onBeforeMount, onMounted, onUnmounted, reactive, ref } from 'vue';
import Imgt from '@/components/Imgt.vue';
// import { NetMsgType } from "@/netBase/NetMsgType";
// import { MessageEvent2 } from "@/net/MessageEvent2";

import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { Page } from '@/store/page';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Message } from '@/utils/discreteApi';
import { Local } from '@/utils/storage';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
import { User } from '@/store/user';
import OverLoading from '@/components/Loading.vue'
const { t } = useI18n();
const router = useRouter()
const page = Page(pinia);
const { bannerArr, textAnnouncement, homeGameData, lang } = storeToRefs(page);
const imgPrefix = 'http://18.162.112.52:8033/uploads/'
const isLoading = ref(false)
let newTab = ref()
const langs: any = {
  zh: 'zh-CN',
  vn: 'vi-VN',
  en: 'en-US',
};
const state: any = reactive({
  tabs: <{}>[
    {
      icon: 'Group39324',
      name: 'home_page_hot',
      color: 'lottery',
      value: '',
    },
    {
      icon: 'Group39096',
      name: 'home_page_slot',
      color: 'slot_machine',
      value: '',
    },
    {
      icon: 'Group39095',
      name: 'home_page_live',
      color: 'live',
      value: '',
    },
    {
      icon: 'Group39098',
      name: 'home_page_fishing',
      color: 'fish',
      value: '',
    },
    {
      icon: 'Group39099',
      name: 'home_page_sportsGame',
      color: 'sports',
      value: '',
    },
    {
      icon: 'Group1556235261',
      name: 'home_page_pokerGame',
      color: 'gaming',
      value: '',
    },
    {
      icon: 'Group1556235309',
      name: 'home_page_lotteryGame',
      color: 'lottery',
      value: '',
    },
  ],
})



const getHomeData = () => {
  for (let i in state.tabs) {
    const item = state.tabs[i]
    const name = t(item.name, 1, { locale: 'zh' })
    const data = homeGameData.value.find((e: any) => e.name['zh-CN'] == name)
    state.tabs[i].value = data
  }
}

const platformItemClick = async (item: any, i: number) => {
  if (item.has_next == 1) {
    router.push({
      path: '/gameMain/gameDetail',
      query: {
        id: i,
        platform_id: item.id,
        venue_id: item.three_game_kind[0].id,
        name: item.name[langs[lang.value]].toUpperCase(),
      }
    })
  } else {
    let langObj: any = {
      'en-US': 3,
      'vi-VN': 2,
      'zh-CN': 1
    }
    if (!Local.get('user')) {
        await User(pinia).setLogin(true)
        return
    }
    isLoading.value = true
    let tb = NetPacket.req_3rd_game_login();
    tb.agentId = item.id;
    tb.kindId = item.three_game_kind_id;
    tb.lang = langObj[lang.value];
    Net.instance.sendRequest(tb);
  }
}
const onClickGame = (item: any, idx: any) => {
  router.push({
    path: '/gameMain/gamingPlatform',
    query: {
      id: idx,
      name: item.name
    }
  })
}

const gameUrlResult = (message: any) => {
    isLoading.value = false
    Local.set('gameUrl', message.url)
    if (message.code != 0) {
        Message.error(message.msg)
        return
    }

    if (newTab.value) {
        newTab.value.close()
    }

    if (message.url.indexOf('<!doctype html>') != -1) {
        newTab.value = window.open('', '_blank');
        newTab.value.document.open();
        newTab.value.document.write(message.url);
    } else {
        newTab.value = window.open(message.url, '_blank')
    }
}

onBeforeMount(() => {
  getHomeData()
})
onMounted(() => {
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_3rd_game_login_result,gameUrlResult);
})
onUnmounted(() => {
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_3rd_game_login_result, null);
})
</script>

<style lang="less" scoped>
@timestamp: `new Date().getTime()`;

.home {
  display: flex;

}

.content {
  margin: 32px 0 30px 90px;
  width: 1200px;

  .announcement {
    position: relative;

    height: 320px;

    >p {
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 1171px;
      height: 40px;
      padding: 0 14.5px;
      background-color: rgba(0, 0, 0, .3);
      margin: 0;
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 16px;
    }
  }


}

.game_detail {
  position: relative;

  .game_list {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    // align-items: center;


    box-sizing: border-box;

    >p {
      display: flex;
      align-items: center;
    }

    .game-img {
      height: 12.39583rem;
      width: 100%;
      cursor: pointer;
      img {
        height: 100%;
        width: 100%;
      }
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
      height: 36px;
      display: flex;
      font-size: 16px;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      border: solid 1.4px #5a47b2;
      background-color: #372771;
      cursor: pointer;
      color: #8d81c1;

      &:hover {
        color: #fff;
        background: url('/img/dialog/click.webp?t=@{timestamp}') no-repeat;
        background-size: 100% 100%;
      }
    }
  }



}

.game_seach {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 100px;
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
      width: 37px;
      height: 37px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #372771;
      border-radius: 10px;
      border: solid 1.4px #5a47b2;
      margin-left: 10px;

    }

    .left:hover,
    .right:hover {
      color: #fff;
      background: url('/img/home/sbtnBG.webp?t=@{timestamp}') no-repeat;
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
  width: 1200px;
  height: 320px;
  object-fit: cover;
}
</style>
