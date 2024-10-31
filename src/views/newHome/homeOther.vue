<template>
  <div>
    <!-- 近期大奖 -->
    <div class="game_detail da_jiang">
      <div class="game_list">
        <div class="game_type">
          <div class="text">
            <span class="text_title">
              <Imgt class="title_img" :src="`/img/home/reward.webp`" />
              近期大奖
            </span>
            <div class="tab_wrap">
              <div v-for="item in tabList" :key="item.id" @click="tabClick(item)"
                :class="{ tab_active: tab_id == item.id }">
                <iconpark-icon :icon-id="tab_id == item.id ? item.active_icon : item.icon" size="1rem"></iconpark-icon>
                <span>{{ item.label }}</span>
              </div>
            </div>
          </div>
          <span class="more" @click="router.push('/recentAwards')">{{
            t('home_page_more')
          }}</span>
        </div>
        <n-carousel style="position: static" :slides-per-view="8" :space-between="10" :loop="false" draggable
          show-arrow>
          <div v-for="i in 10" :key="i" class="da_jiang_list">
            <Imgt class="reward_img" :src="`/img/home/dajiang.png`" />
            <span class="text1">恭喜发财</span>
            <span class="text2">hsj***263</span>
            <span class="text3">476.376.000 VDN</span>
          </div>

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

    <!-- 最新赛事排行 -->
    <div class="game_detail match">
      <div class="game_list">
        <div class="game_type">
          <div class="text">
            <span class="text_title">
              <Imgt class="title_img" :src="`/img/home/king.webp`" />
              最新赛事排行
            </span>
          </div>
          <span class="more" @click="router.push('/ranking')">{{
            t('home_page_more')
          }}</span>
        </div>
        <div class="match_wrap">
          <Imgt class="match_img" :src="`/img/home/new_match.webp`" />
          <n-carousel style="position: static; margin-left: 35px; width: 97.5%" :slides-per-view="7.2" :loop="false"
            draggable show-arrow>
            <div v-for="(i, index) in tournm_list" :key="i.game_type"
              :class="['match_list', { active_match: match_id == index + 1 }]" @click="matchClick(i, index)">
              <span>{{ i.tournm_name }}</span>
              <!-- <span>年度锦标赛</span> -->
            </div>
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
    </div>
    <div class="to_match">
      <matchDes :infoData="infoData"></matchDes>
      <n-button>前往</n-button>
    </div>

    <!-- 名次 -->

    <div class="table_box">
      <div class="table_head_wrap">
        <div v-for="(item, i) in tableHead" class="table_head" :key="i">
          <span>{{ item }}</span>
        </div>
        <span class="more">{{ t('home_page_more') }}</span>
      </div>
      <div class="table_body_wrap">
        <div v-for="(item, i) in tableData" class="table_head" :key="i">
          <span class="ranking" v-if="item.ranking <= 3">
            <Imgt :src="`/img/home/ranking${item.ranking}.webp`" />
          </span>
          <span class="ranking" v-else>{{ item.ranking }}</span>
          <span class="table_user">
            <Imgt class="user_img" :src="`/img/home/dajiang.png`" />
            {{ item.user }}
          </span>
          <span style="font-size: 16px">{{ item.score }}</span>
          <span style="font-size: 20px">{{ item.reward }}</span>
        </div>
      </div>
    </div>

    <!-- 收藏 -->
    <div class="game_detail collect">
      <div class="game_list">
        <div class="game_type">
          <div class="text">
            <span class="text_title"> 收藏推荐 </span>
          </div>
          <span class="more" @click="router.push({
            path: '/gameDetail',
            query: {
              venue_id: 1,
              agent_id: 9999
            }
          })">{{ t('home_page_more') }}</span>
        </div>
        <n-carousel style="position: static; margin-left: 0px" :slides-per-view="1" :loop="false" draggable show-arrow>
          <div v-for="i in 2" class="colect_wrap" :key="i">
            <div v-for="j in 16" :key="j" class="colect_wrap_item">
              <div v-if="j <= 5" class="colect_wrap_item_des">
                <Imgt :src="`/img/home/colect_${j}.png`" />
                <div>
                  <span>黑帮风云</span>
                  <iconpark-icon icon-id="iconyiwen" size=".8rem"></iconpark-icon>
                </div>
              </div>
              <div v-else class="colect_wrap_item_des">
                <Imgt :src="`/img/home/colect_2.png`" />
                <div>
                  <span>黑帮风云</span>
                  <iconpark-icon icon-id="iconyiwen" size=".8rem"></iconpark-icon>
                </div>
              </div>
            </div>
          </div>

          <!-- <div v-for="i in 10" :key="i" :class="['match_list', { active_match: match_id == i }]"
              @click="matchClick(i)">
              <span>德州扑克</span>
              <span>年度锦标赛</span>
            </div> -->
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
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Imgt from '@/components/Imgt.vue';
import matchDes from './components/matchDes.vue';
const { t } = useI18n();
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { Page } from '@/store/page';
import { NetMsgType } from '@/netBase/NetMsgType';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { Net } from '@/net/Net';
import { NetPacket } from '@/netBase/NetPacket';
const tab_id = ref(1);
const match_id = ref(1);
const router = useRouter();
const { tournm_list } = storeToRefs(Page(pinia));

const infoData: any = ref({})  // 赛事简介数据
const tabList = [
  { label: '全部', icon: 'jqdjiconun01', active_icon: 'jqdjiconnn01', id: 1 },
  { label: '棋牌', icon: 'jqdjiconun02', active_icon: 'jqdjiconnn02', id: 2 },
  { label: '电子', icon: 'jqdjiconun03', active_icon: 'jqdjiconnn03', id: 3 },
  { label: '真人', icon: 'jqdjiconun04', active_icon: 'jqdjiconnn04', id: 4 },
  { label: '捕鱼', icon: 'jqdjiconun05', active_icon: 'jqdjiconnn05', id: 5 },
  { label: '彩票', icon: 'jqdjiconun06', active_icon: 'jqdjiconnn06', id: 6 },
  { label: '电竞', icon: 'jqdjiconun07', active_icon: 'jqdjiconnn07', id: 7 },
];

const tableHead = ['名次', '参赛用户', '赛事积分', '赛事奖金'];
const tableData = [
  {
    ranking: 1,
    user: 'ABC***001',
    icon: '/img/home/reward.webp',
    score: '30000',
    reward: '30,000 VND',
  },
  {
    ranking: 2,
    user: 'ABC***001',
    icon: '/img/home/reward.webp',
    score: '30000',
    reward: '30,000 VND',
  },
  {
    ranking: 3,
    user: 'ABC***001',
    icon: '/img/home/reward.webp',
    score: '30000',
    reward: '30,000 VND',
  },
  {
    ranking: 4,
    user: 'ABC***001',
    icon: '/img/home/reward.webp',
    score: '30000',
    reward: '30,000 VND',
  },
  {
    ranking: 5,
    user: 'ABC***001',
    icon: '/img/home/reward.webp',
    score: '30000',
    reward: '30,000 VND',
  },
  {
    ranking: 6,
    user: 'ABC***001',
    icon: '/img/home/reward.webp',
    score: '30000',
    reward: '30,000 VND',
  },
  {
    ranking: 7,
    user: 'ABC***001',
    icon: '/img/home/reward.webp',
    score: '30000',
    reward: '30,000 VND',
  },
  {
    ranking: 8,
    user: 'ABC***001',
    icon: '/img/home/reward.webp',
    score: '30000',
    reward: '30,000 VND',
  },
  {
    ranking: 9,
    user: 'ABC***001',
    icon: '/img/home/reward.webp',
    score: '30000',
    reward: '30,000 VND',
  },
  {
    ranking: 10,
    user: 'ABC***001',
    icon: '/img/home/reward.webp',
    score: '30000',
    reward: '30,000 VND',
  },
];

// const remarkList = [
// { label: '全部', icon: 'jqdjiconun01', active_icon: 'jqdjiconnn01', id: 1 },
// ]

const tabClick = (item: any) => {
  tab_id.value = item.id;
};

const matchClick = (i: any, index: any) => {
  match_id.value = index + 1;
  req_event_des(i)
};


// 获得比赛赛况信息

const req_event_des = (item: any) => {
  const req = NetPacket.req_tournament_introduction();
  req.room_id = item.room_id
  Net.instance.sendRequest(req);
}
// 获得比赛赛况信息
const handleIntroduction = (rs: any) => {
  infoData.value = rs
  if (infoData.value?.detail) {
    infoData.value.detail = infoData.value?.detail.split('，')
  }
  if (infoData.value?.rule) {
    infoData.value.rule = infoData.value?.rule.split('。')
  }
}



onMounted(() => {

  setTimeout(() => {
    if (tournm_list.value && tournm_list.value.length) {
      matchClick(tournm_list.value[0], 0)
    }
  }, 500);

  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_tournament_introduction,
    handleIntroduction,
  );
})


</script>

<style lang="less" scoped>
@timestamp: `new Date() .getTime() `;

.game_detail {
  margin-top: 40px;
}

.da_jiang {
  .game_seach {
    top: 0px;
  }

  .game_type .text {
    display: flex;
    align-items: center;
  }

  .tab_wrap {
    display: flex;
    color: #afb6bd;
    font-size: 20px;
    padding-top: 3px;
    gap: 55px;
    margin-left: 32px;

    div {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;

      &:hover {
        color: #b5a5ff;
      }
    }

    .tab_active {
      color: #b5a5ff;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -5px;

        height: 3px;
        width: 100%;
        border-radius: 100px;
        background: linear-gradient(180deg, #5a6cff 0%, #7e1cff 100%);
      }
    }
  }

  .da_jiang_list {
    margin-top: 64px;
    width: 156px;
    height: 186px;
    background: linear-gradient(180deg, #0a0b22 0%, #000000 100%);
    border: 1px solid;
    border-image-source: linear-gradient(180deg, #181c25 0%, #000000 100%);
    border-radius: 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 65px;

    .text1 {
      color: #ffffff;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 11px;
    }

    .text2 {
      color: #6a709d;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .text3 {
      color: #f2c004;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .reward_img {
    position: absolute;
    left: 50%;
    top: -30px;
    transform: translate(-50%, 0);

    width: 80px !important;
    height: 80px !important;
  }
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

.remark_img {
  height: 159px;
  margin-top: 30px;
}

.match {
  .match_wrap {
    position: relative;
    margin-top: 30px;

    .match_img {
      width: 140px;
      height: 128px;
      position: absolute;
      left: -30px;
      top: -30px;
      z-index: 100;
    }
  }

  .match_list {
    background: url('/img/home/match_arrow.webp?t=@{timestamp}') center no-repeat;
    background-size: 100%;
    display: flex;
    height: 72px;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff80;
    cursor: pointer;
    margin-left: -2px;
  }

  .active_match {
    background: url('/img/home/match_arrow_ac.webp?t=@{timestamp}') center no-repeat;
    background-size: 100%;
  }

  .game_seach {
    top: -72px;
  }
}

.table_box {
  margin-top: 38px;

  .table_head_wrap {
    display: flex;
    position: relative;

    .table_head {
      flex: 1;
      display: flex;
      justify-content: center;
      color: #ffffff;
    }

    .more {
      position: absolute;
      right: 0;

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

      &:hover {
        color: #fff;
        background: url('/img/dialog/click.webp?t=@{timestamp}') no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .table_body_wrap {
    display: flex;
    flex-direction: column;
    color: #a7b5d0;
    width: 100%;
    background-color: #0b0b0b;
    border-radius: 8px;
    margin-top: 10px;

    .table_head {
      width: 100%;
      color: #ffffff;
      display: flex;
      height: 76px;
      align-items: center;

      span {
        flex: 1;
        text-align: center;
      }

      .ranking {
        font-size: 26px;
        font-weight: 600;
        color: #ffffff;
        height: 100%;

        img {
          height: 100%;
        }
      }

      .table_user {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        .user_img {
          height: 48px;
        }
      }
    }
  }
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

    div {
      display: flex;
      justify-content: space-between;
      color: #ffffff;
    }
  }
}

.collect {
  .game_seach {
    top: 0px;
  }
}
</style>
