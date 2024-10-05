<template>
  <!--<n-modal class="level_modal" v-model:show="showModal" preset="card">
    <template #header>
      <div class="level_title level_title_sec">{{ t('level_page_member') }}</div>
    </template>-->
  <div class="level_content">
    <div class="level_info">
      <div class="level_info_top">
      </div>
      <n-spin :show="loading">
        <div class="level_info_pross">
          <n-flex class="level_info_vip" justify="space-between">
            <div class="l_info_pro_l"> VIP{{ levelDataAll.current_vip_level || 0 }}</div>
            <div class="l_info_pro_r"> VIP{{ Number(levelDataAll.current_vip_level) + 1 || 1 }}
            </div>
          </n-flex>
          <div class="item_pro"> <span v-show="vipProcss().rate > 0" class="pro_inner"
              :style="`width: ${vipProcss().rateStr}`"> </span></div>
          <n-flex class="level_info_txt" justify="space-between">
            <div> {{ t('level_page_needBet') }} {{ verifyNumberComma(String(countNeedBet())) }}</div>
            <a @click="openLevelRule"> {{ t('level_page_paiTitle') }} </a>
          </n-flex>
        </div>

        <n-flex justify="space-between" align="center" class="level_info_jl">
          <n-flex align="center" class="level_info_jl_l">
            <span class="jl_amount"> <span> {{ t('level_page_rebate')
                }} </span> {{ levelDataAll.daily_rebate || 0 }}
            </span>
            <span :class="`re_icon ${refreshFlag ? 'active' : ''}`" @click="refreshMon"> </span>
          </n-flex>
          <n-flex align="center" class="level_info_jl_r">
            <span class="line_icon"></span>
            <n-flex class="lq_btn" justify="center" align="center">
              <span class="lq_icon"></span>
              <span @click="getRebate"> {{ t('level_page_lq') }} </span>
            </n-flex>
          </n-flex>
        </n-flex>

        <div class="level_info_vip_all">
          <n-flex id="scroll_box" class="level_info_vip_l">
            <div :class="`vip_item ${curTab === item.key ? 'active' : ''}`" v-for="(item, index) in levelListData"
              :key="index" @click="(e: any) => { clickTab(e, item.key) }">
              <!--   <Imgt v-if="curTab === item.key" :src="`/img/level/level_${item.key}.webp`" alt="vip" />
                   <Imgt v-else :src="`/img/level/level_${item.key}_not.webp`" alt="vip" />-->
              <Imgt :src="`/img/level/newicon/level_${item.key}.webp`" alt="vip" />


            </div>
          </n-flex>
        </div>
        <div class="level_list_sec">
          <div v-if="levelDataAll.current_vip_level < curTab" class="vip_top_disabled">
            <span>{{ t('level_page_unlock') }}</span>
          </div>
          <n-flex class="list_item" align="center" v-for="(item, index) in levelDyData" :key="index">
            <div class="list_item_l">
              <div class="title_big"> {{ t(item.title) }}</div>
              <div> {{ item.titleSec }}</div>
            </div>
            <n-flex class="list_item_r">
              <div class="list_item_r_item" v-for="(item_1, index_1) in item.child" :key="index + index_1">
                <div :class="`list_item_bg ${item_1?.levelArr.includes(curTab) ? '' : 'not'}`">
                  <div class="item_img">
                    <Imgt :src="`/img/level/${item_1.icon}.webp`" />
                  </div>
                  <div> {{ t(item_1.name) }}</div>
                </div>
              </div>
            </n-flex>
          </n-flex>
        </div>
      </n-spin>

    </div>

  </div>
  <!--  </n-modal>-->

  <!-- 奖励派发说明 -->
  <n-modal :show="ruleModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container vertical">
        <div class="header rel center">
          <span class="weight_5 t_md">{{ t('level_page_paiTitle') }}</span>
          <span class="close abs center pointer t_sm">
            <iconpark-icon @click="ruleModal = false" icon-id="Group39368" color="#fff" size="1rem"></iconpark-icon>
          </span>
        </div>
        <div class="body vertical center">
          <div class="list-tip"> {{ t('level_page_paiRule_1') }}</div>
          <div class="list-tip"> {{ t('level_page_paiRule_2') }}</div>
          <div class="list-tip"> {{ t('level_page_paiRule_3') }}</div>
        </div>
      </div>
    </n-card>
  </n-modal>

</template>

<script setup lang='ts' name="levelInfo">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { NetPacket } from '@/netBase2/NetPacket';
import { Net } from '@/net/Net';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase2/NetMsgType';
import { Message } from '@/utils/discreteApi.ts';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import pinia from '@/store';
import { User } from '@/store/user';
import { verifyNumberComma } from '@/utils/others.ts';
import Imgt from '@/components/Imgt.vue';

// 从 store 获取 vipinfo 数据
const UserStore = User(pinia);
const { VIPinfo } = storeToRefs(UserStore);

const { t } = useI18n();
const ruleModal = ref(false);
const timerRe = ref();
const refreshFlag = ref(false);
const levelDataAll: any = ref({
  current_vip_level: 0,
  daily_rebate: 0,
  total_bet_money: 0,
  vip_level_reward_config: [],
});


const loading = ref(false);
const curTab = ref(1);
const levelListData = ref(
  [
    { level: 'VIP1', key: 1 },
    { level: 'VIP2', key: 2 },
    { level: 'VIP3', key: 3 },
    { level: 'VIP4', key: 4 },
    { level: 'VIP5', key: 5 },
    { level: 'VIP6', key: 6 },
    { level: 'VIP6', key: 7 },
    { level: 'VIP6', key: 8 },
    { level: 'VIP6', key: 9 },
    { level: 'VIP6', key: 10 },
  ],
);
const levelDyData = ref(
  [
    {
      key: 'vip', title: 'level_page_vip', titleSec: 'VIP GIFT MONEY',
      child: [
        { name: 'level_page_bonus', icon: 'level_js', levelArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
        {
          name: 'level_page_month_gift',
          icon: 'level_lj',
          levelArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
      ],
    },
    {
      key: 'chip', title: 'level_page_code', titleSec: 'CHIP DISCOUNT',
      child: [
        {
          name: 'level_page_live_bet',
          icon: 'level_live',
          levelArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          name: 'level_page_slot_bet',
          icon: 'level_game',
          levelArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          name: 'level_page_sport_bet',
          icon: 'level_sport',
          levelArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        { name: 'level_page_zm_bet', icon: 'level_zm', levelArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
        {
          name: 'level_page_esport',
          icon: 'level_esport',
          levelArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
      ],
    },
    {
      key: 'enjoy', title: 'level_page_privileges', titleSec: 'ENJOY PRIVILEGES',
      child: [
        { name: 'level_page_domain', icon: 'level_ym', levelArr: [7, 8, 9, 10] },
        { name: 'level_page_manager', icon: 'level_vip', levelArr: [4, 5, 6, 7, 8, 9, 10] },
        { name: 'level_page_access', icon: 'level_deposit', levelArr: [4, 5, 6, 7, 8, 9, 10] },
        { name: 'level_page_activity', icon: 'level_promo', levelArr: [4, 5, 6, 7, 8, 9, 10] },
      ],
    },
    {
      key: 'tq', title: 'level_page_private', titleSec: 'PRIVATE PRIVILEGES',
      child: [
        { name: 'level_page_secretary', icon: 'level_sw', levelArr: [8, 9, 10] },
        { name: 'level_page_reception', icon: 'level_gb', levelArr: [8, 9, 10] },
        // { name: 'level_page_month_gift', icon: 'level_lj', levelArr: [8, 9, 10] },
      ],
    },

  ],
);

// 获取等级数据
const queryData = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 300);
  const query = NetPacket.req_vip_info();
  Net.instance.sendRequest(query);
};

// 数据处理
const resultHandle = (res: any) => {
  console.log('level-data--------', res, VIPinfo.value);
  setTimeout(() => {
    loading.value = false;
  }, 300);
  // levelDataAll.value = res;
  if (Object.keys(VIPinfo.value).length > 0) {
    levelDataAll.value = VIPinfo.value;
    curTab.value = levelDataAll.value.current_vip_level;
  }
};
// money: 0, result: 2 // 1 成功，2 失败
const resultHandleClaim = (res: any) => {
  setTimeout(() => {
    loading.value = false;
  }, 300);
  if (res.result === 1) {
    Message.success(`${t('level_page_getScu')} ${res.money}`);
    levelDataAll.value.daily_rebate = 0; // 领取成功重置奖励
  } else {
    Message.error(t('level_page_getFail'));
  }
};

const openModal = () => {
  // showModal.value = !showModal.value;
  queryData();
  resultHandle('');
  // // 回执监听
  // MessageEvent2.addMsgEvent(
  //   NetMsgType.msgType.msg_notify_vip_info,
  //   resultHandle,
  // );
  // 领取反水奖励
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_vip_claim_status,
    resultHandleClaim,
  );
};

// 打开等级规则弹窗
const openLevelRule = () => {
  ruleModal.value = true;
};
// 计算所需投注
const countNeedBet = () => {
  if (levelDataAll.value.vip_level_reward_config.length) {
    // const targetArr = levelDataAll.value.vip_level_reward_config?.filter((item: any) => item.level == (Number(levelDataAll.value.current_vip_level) + 1))
    // const targetMon = targetArr.length && (targetArr[0] as any).target_bet_money;
    const targetArr = levelDataAll.value.vip_level_reward_config[Number(levelDataAll.value.current_vip_level)];
    const targetMon = targetArr.target_bet_money;
    return targetMon - Number(levelDataAll.value.total_bet_money) || 0;
    // return targetMon || '-';
  } else {
    return '';
  }

};
// 计算vip 等级进度
const vipProcss = () => {
  if (levelDataAll.value.vip_level_reward_config.length) {
    // levelDataAll.value.total_bet_money = 2654000;
    // const targetArr = levelDataAll.value.vip_level_reward_config?.filter((item: any) => item.level == (Number(levelDataAll.value.current_vip_level) + 1))
    // const targetMon = targetArr.length && (targetArr[0] as any).target_bet_money;
    const targetArr = levelDataAll.value.vip_level_reward_config[Number(levelDataAll.value.current_vip_level)];
    const targetMon = targetArr.target_bet_money;
    const rate = (Number(levelDataAll.value.total_bet_money) / targetMon) * 100;
    const obj = {
      rate: rate,
      rateStr: `${rate}%`,
    };
    // console.log('-----', rate, levelDataAll.value.total_bet_money)
    return obj;
  } else {
    return {
      rate: 0,
      rateStr: `0%`,
    };
  }

};
// 刷新奖励额度
const refreshMon = () => {
  if (!refreshFlag.value) {
    clearTimeout(timerRe.value);
    refreshFlag.value = true;
    queryData();
    timerRe.value = setTimeout(() => {
      refreshFlag.value = false;
    }, 1 * 1000);
  }
};
// 领取返水奖励
const getRebate = () => {
  if (levelDataAll.value.daily_rebate === 0) {
    return Message.error(t('level_page_notAward'));
  }
  loading.value = true;
  const query = NetPacket.req_vip_daily_claim();
  Net.instance.sendRequest(query);

};
const clickTab = (e: any, key: any) => {
  curTab.value = key;
  // 添加点击滚动
  const winWidth = document.documentElement.clientWidth / 2; // 视窗宽度的一半
  const curBoxW = e.target.offsetWidth; // 当前容器宽度
  const curClientX = e.clientX;
  const targetBox: any = document.getElementById('scroll_box');
  let scrollLeft = -curBoxW; // 向右滚动
  // 需要向左滚动
  if (curClientX > winWidth - curBoxW / 2) {
    scrollLeft = curBoxW;
  }
  targetBox.scrollBy({
    top: 0,
    left: scrollLeft, // 向右滚动的距离
    behavior: 'smooth', // 平滑滚动
  });
};

// 已关闭窗口
// watch(
//   () => showModal.value,
//   (n) => {
//     if (!n) {
//       // MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_vip_info, null);
//       MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_vip_claim_status, null);
//     }
//   },
//   {
//     deep: true,
//   }
// )
watch(
  () => VIPinfo.value,
  (n) => {
    if (n) {
      levelDataAll.value = n;
    }
  },
);

onMounted(() => {
  openModal();
});
onUnmounted(() => {
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_vip_claim_status, null);
});
</script>

<style lang='less' scoped>
@import '@/assets/CommonForm.less';
@timestamp: `new Date().getTime()`;

.level_info {
  color: #fff;
  font-size: 16px;
  padding: 0 6px;
  margin-top: 20px;

  .level_info_top {
    height: 220px;
    background: url('/img/level/level_bg.webp?t=@{timestamp}') center no-repeat;
    background-size: 100%;
  }

  .level_info_pross {
    margin: 42px 0 20px;

    .level_info_vip {
      width: 98.5%;
      margin-left: 12px;

      >div {
        position: relative;
        font-size: 14px;
        width: 70px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border: solid 1px #fff;
        border-radius: 14px;
        background-image: linear-gradient(to right, #b58b22 6%, #ebac0d 28%, #f7c445 83%);

        &::before {
          content: '';
          position: absolute;
          display: inline-block;
          width: 30px;
          height: 26px;
          background: url('/img/level/level_icon_1.webp?t=@{timestamp}') center no-repeat;
          background-size: 100%;
          left: -12px;
          top: -3px;
        }

        &.l_info_pro_r {
          background-image: linear-gradient(to right, #2a146c 6%, #362192 28%, #432ea2 83%);
          color: #8d81c1;
          border-color: #322c59;

          &::before {
            background-image: url('/img/level/level_icon_2.webp?t=@{timestamp}');
          }

        }

      }
    }

    .item_pro {
      margin: 12px 0;
      position: relative;
      flex: auto;
      height: 38px;
      border-radius: 20px;
      box-shadow: inset 0 0 4px 0 #000;
      background-blend-mode: color-burn, overlay, normal;
      background: url('/img/level/level_pro_jd.webp?t=@{timestamp}') center no-repeat;

      .pro_inner {
        display: inline-block;
        height: 21px;
        position: absolute;
        left: 8px;
        top: 10px;
        border-radius: 12px;
        box-shadow: inset 0 0 8px 0 #fff;
        border-style: solid;
        border-width: 1px;
        border-image-source: linear-gradient(to bottom, #fff, #fff5de);
        border-image-slice: 1;
        background-image: linear-gradient(to bottom, #ffdb84, #f6c544 75%, #ffdb84 125%), linear-gradient(to bottom, #fff, #fff5de);
        background-origin: border-box;
        background-clip: content-box, border-box;
      }
    }

    .level_info_txt {
      a {
        cursor: pointer;
        text-decoration: underline;
      }
    }

  }

  .level_info_jl {
    height: 72px;
    background: url('/img/level/level_pro_bg.webp?t=@{timestamp}') center no-repeat;
    background-size: 100%;
    padding: 0 30px;

    .level_info_jl_l {
      .jl_amount {

        span {
          color: #8e82c2;
        }
      }

      .re_icon {
        cursor: pointer;
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url('/img/level/level_icon_re.webp?t=@{timestamp}') center no-repeat;
        background-size: 100%;

        &.active {
          transition: all 1s ease-in-out;
          transform: rotate(720deg);
        }

        /*&:hover {*/
        /*  transform: scale(1.03);*/
        /*}*/
      }
    }

    .level_info_jl_r {

      .line_icon {
        width: 1px;
        height: 36px;
        margin-right: 18px;
        background: url('/img/line.webp?t=@{timestamp}') center no-repeat;
        background-size: 100%;
      }

      .lq_btn {
        cursor: pointer;
        width: 128px;
        height: 44px;
        line-height: 40px;
        gap: 8px 5px !important;
        transition: .3s;
        background: url('/img/level/level_btn.webp?t=@{timestamp}') center no-repeat;
        background-size: 100%;
        transition: .3s;

        &:active {
          transform: scale(.95);
        }

        .lq_icon {
          width: 16px;
          height: 16px;
          background: url('/img/level/q_icon.webp?t=@{timestamp}') center no-repeat;
          background-size: 100%;

        }
      }
    }

  }

  .level_info_vip_all {
    width: 100%;

    .level_info_vip_l {
      margin: 40px 0 20px;
      overflow-y: hidden;
      overflow-x: scroll;
      padding-bottom: 8px;
      flex-flow: nowrap !important;
      gap: 0 !important;

      &::-webkit-scrollbar {
        display: block;
        height: 5px
      }

      &::-webkit-scrollbar-thumb {
        background: #a7b7d7;
        border-radius: 8px
      }

      .vip_item {
        flex-shrink: 0;
        cursor: pointer;
        width: 168px;
        height: 42px;
        transition: .3s;
        position: relative;


        img {
          width: 100%;
          opacity: .5;
        }

        &:nth-child(n+2) {
          margin-left: 10px;
        }

        &:active {
          transform: scale(.95);
        }

        &.active {
          img {
            opacity: 1;
          }
        }

      }
    }
  }


  .level_list_sec {
    position: relative;

    .vip_top_disabled {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }

    .list_item {
      position: relative;
      height: 120px;
      margin-bottom: 20px;
      background: url('/img/level/level_l_bg.webp?t=@{timestamp}') center no-repeat;
      background-size: 100%;

      &::before {
        content: '';
        position: absolute;
        display: inline-block;
        width: 421px;
        height: 42px;
        background: url('/img/level/level_1_bg.webp?t=@{timestamp}') no-repeat;
        background-size: contain;
        left: 240px;
        bottom: 10px;
      }

      &:nth-child(2) {
        &::before {
          background-image: url('/img/level/level_2_bg.webp?t=@{timestamp}')
        }
      }

      &:nth-child(3) {
        &::before {
          background-image: url('/img/level/level_3_bg.webp?t=@{timestamp}')
        }
      }

      &:nth-child(4) {
        &::before {
          background-image: url('/img/level/level_4_bg.webp?t=@{timestamp}')
        }
      }

      .list_item_l {
        width: 202px;
        text-align: center;

        .title_big {
          font-size: 20px;
        }

      }

      .list_item_r {
        margin-left: 80px;
        flex: auto;

        .list_item_r_item {
          //width: 16.67%;
          width: 160px;
          text-align: center;

          .item_img {
            height: 46px;

            img {
              width: 44px;
              height: 100%;
            }
          }

          .not {
            opacity: .5;
            /*.item_img {*/
            /*  img {*/
            /*    filter: grayscale(100%);*/
            /*    opacity: .6;*/
            /*  }*/
            /*}*/
          }

        }
      }

    }
  }

}

.form_card {
  .form_container {
    .body {
      gap: 10px !important;

      .list-tip {
        font-size: 16px;
      }
    }
  }
}
</style>
