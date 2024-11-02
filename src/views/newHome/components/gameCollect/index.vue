<template>
  <!-- 收藏 -->
  <div class="game_detail collect">
    <div class="game_list">
      <div class="game_type">
        <div class="text">
          <span class="text_title"> 收藏推荐 </span>
        </div>
        <span class="more">{{ t('home_page_more') }}</span>
      </div>
      <n-carousel style="position: static; margin-left: 0px" :slides-per-view="1" :loop="false" draggable show-arrow>
        <div v-for="i in page" class="colect_wrap" :key="i">
          <div v-for="item in gameList" :key="item.gameId" @click.stop="onPlayGame(item)" class="colect_wrap_item">
            <div class="colect_wrap_item_des">
              <Imgt :src="getImg(item.gamePicturePC)" />
              <div>
                <span>{{ unserialize(item.name, true) }}</span>
                <iconpark-icon v-if="Local.get('user')" :name="allCollected.includes(item.gameId) ? 'dianzanun' : 'dianzan'
                  " size="1rem" @click.stop="reqCollect(item)"></iconpark-icon>
              </div>
            </div>
          </div>
        </div>
        <template #arrow="{}">
          <div class="game_seach">
            <span>
              <iconpark-icon class="left" icon-id="fangxiangicon04" size=".8rem" @click="gamePrev"></iconpark-icon>
              <iconpark-icon class="right" icon-id="fangxiangicon01" size=".8rem" @click="gameNext"></iconpark-icon>
            </span>
          </div>
        </template>
      </n-carousel>
    </div>
    <Loading v-model:visible="isLoading"></Loading>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Imgt from '@/components/Imgt.vue';

const { t } = useI18n();
import { ref, onMounted } from 'vue';
// import { useRouter } from 'vue-router';
import pinia from '@/store/index';
import { Local } from '@/utils/storage';
import { storeToRefs } from 'pinia';
import { Page } from '@/store/page';
import { User } from '@/store/user';
import { NetMsgType } from '@/netBase/NetMsgType';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { Net } from '@/net/Net';
import { NetPacket } from '@/netBase/NetPacket';
import { Message } from '@/utils/discreteApi';
import Loading from '@/components/Loading.vue'
const { settings, lang } = storeToRefs(Page(pinia));
const { allCollected } = storeToRefs(User(pinia));

// 游戏平台id  -1为查看全部的游戏
let agentId = ref<any>(0);
const page = ref(1);
const gameId = ref(null);
const gameList: any = ref([]);
const isLoading = ref(false)
// 解析图片地址
const getImg = (name: any) => {
  if (!name) return '';
  return settings.value.backend_upload + name;
};
// 解析名称
const unserialize = (v: any, isPlatform: boolean) => {
  if (!v) return '';
  let obj: any = {
    en: 'en-US',
    zh: 'zh-CN',
    vn: 'vi-VN',
  };
  if (isPlatform) {
    v = JSON.parse(v);
  }
  return v[obj[lang.value]];
};

// 获得游戏数据
const req_get_games = () => {
  const req = NetPacket.req_get_games_in_platform();
  req.agentId = -1;
  req.kindId = 1;
  req.lableId = 0;
  req.page = page.value;
  req.pageSize = 16;
  Net.instance.sendRequest(req);
};
// 获得收藏游戏
const handlegetGames = (rs: any) => {
  gameList.value = rs.info;
};
// 收藏点击下一页
const gameNext = () => {
  page.value++;
  req_get_games();
};
// 收藏点击上一页
const gamePrev = () => {
  if (page.value > 1) {
    page.value--;
    req_get_games();
  }
};
// 添加取消收藏
const reqCollect = async (game: any) => {
  gameId.value = game.gameId;
  const query = NetPacket.req_modify_collect();
  query.agent_id = agentId.value;
  query.gameId = game.gameId;

  query.type = allCollected.value.includes(gameId.value) ? 1 : 0;

  Net.instance.sendRequest(query);
};
// 收藏确认
const resCollect = async (data: any) => {
  if (data.rlt == 0) {
    if (allCollected.value.includes(gameId.value)) {
      let arr = allCollected.value.filter((e: Number) => e != gameId.value);
      await User(pinia).getCollected(arr);
      Message.success('取消收藏成功');
    } else {
      let arr = [...allCollected.value, gameId.value];
      await User(pinia).getCollected(arr);
      Message.success('收藏成功');
    }
  } else if (data.rlt == 1) {
    Message.warning('收藏达到上限');
  } else {
    Message.error('未知错误');
  }
};
//  打开游戏
const onPlayGame = async (v: any) => {
  if (!Local.get('user')) {
    await User(pinia).setLogin(true);
    return;
  }
  let langObj: any = {
    en: 3,
    vi: 2,
    zh: 1,
  };
  isLoading.value = true;
  let tb = NetPacket.req_3rd_game_login();
  tb.agentId = -1;
  tb.kindId = 1;
  tb.gameId = v.gameId;
  tb.lang = langObj[lang.value];
  Net.instance.sendRequest(tb);
  setTimeout(() => {
    isLoading.value = false
  }, 10000);
};
//  打开游戏
let newTab = ref()
const gameUrlResult = (message: any) => {
  isLoading.value = false
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

req_get_games();

onMounted(() => {
  // 获取收藏游戏数据
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_get_games_in_platform,
    handlegetGames,
  );
  // 获取收藏结果
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_modify_collect,
    resCollect,
  );
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_3rd_game_login_result, gameUrlResult);
});
</script>

<style lang="less" scoped>
@timestamp: `new Date() .getTime() `;

.game_detail {
  margin-top: 40px;
}

.text_title {
  display: flex;

  .title_img {
    width: 35px !important;
    height: 35px !important;
    margin-right: 3px;
  }
}

.to_match {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.colect_wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: #0b0b0b;
  border-radius: 16px;
  padding: 16px 30px;
  margin-top: 15px;

  .colect_wrap_item_des {
    margin-bottom: 15px;
    cursor: pointer;

    div {
      display: flex;
      justify-content: space-between;
      color: #ffffff;
      font-size: 16px;
      margin-top: -10px;
      padding: 0 3px;
    }

    img {
      width: 158px;
      height: 158px;
      border-radius: 8px;
    }
  }
}

.collect {
  .game_seach {
    top: 0px;
  }
}
</style>
