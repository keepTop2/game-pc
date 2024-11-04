<template>
  <!-- 导航 -->

  <div class="vip_detail_header" v-if="isDetail">
    <navTab :title="t('level_page_details')" />
    <Imgt class="return" src="/img/payment/return.webp" alt="" @click="goDetail()" />
  </div>
  <navTab :title="t('level_page_vipPrivileges')" :secTitle="t('level_page_sever')" v-else />
  <div class="level_content">
    <div class="level_info">

      <div class="level_info_vip_all">

        <scroll-view class="level_info_vip_l" :el="activeRef">

          <div class="level_info_vip_l_container">
            <div :class="`vip_item ${curTab === item.key ? 'active' : ''}`" v-for="(item, index) in levelListData"
              :ref="curTab === item.key ? 'activeRef' : ''" :key="index" @click.stop="clickTab(item.key)">

              <Imgt :src="`/img/level/newicon/level_${item.key}.webp`" alt="vip" />
              <div class="l">
                <Imgt :src="`/img/level/icon_rewards.webp`" alt="rewards" class="icon_rewards" />
                <div class="txt"> {{ t('level_page_rebate') }} <span>{{ levelDataAll.daily_rebate || 0 }}</span></div>
              </div>
              <div class="m" @click.stop="goRecords">{{ t('home_page_waterRecord') }}</div>
              <div class="r" @click.stop="getRebate">{{ t('level_page_lq') }}</div>
              <div v-if="levelDataAll.current_vip_level != item.key" class="vip_top_disabled">
                <span>{{ t('level_page_unlock') }}</span>
              </div>
            </div>

          </div>
        </scroll-view>

      </div>

      <Rules v-if="isDetail" />
      <n-spin :show="loading" v-else>
        <div class="level_info_pross">
          <n-flex class="level_info_vip" justify="space-between">

            <div class="l_info_pro" :class="{ active: curTab === item.key }" v-for="(item, index) in levelListData"
              :key="index">{{ item.level }}</div>
          </n-flex>
          <div class="item_pro"> <span v-show="vipProcss().rate > 0" class="pro_inner"
              :style="`width: ${vipProcss().rateStr}`"> </span></div>
          <div class="vip_detail" v-if="VIPinfo.current_vip_level < 10">
            <div class="l">
              <div class="t"> <span>{{ t('level_page_next_level') }}</span>VIP {{ VIPinfo.current_vip_level + 1 }}
              </div>
              <div class="b">
                <span>流水</span>
                <span class="item_pro"> <span v-show="vipProcss().rate > 0" class="pro_inner"
                    :style="`width: ${vipProcss().rateStr}`"> </span></span>
                <span>{{ t('level_page_needBet') }} {{ verifyNumberComma(String(countNeedBet())) }}</span>
              </div>
            </div>
            <div class="button" @click="goDetail(1)">{{ t('level_page_details') }}</div>
          </div>
        </div>

        <div class="level_list_sec">
          <n-flex class="level_info_txt" justify="space-between">
            <span> VIP{{ curTab }}特权</span>
            <span @click="openLevelRule"> {{ t('level_page_paiTitle') }} </span>
          </n-flex>
          <div v-if="levelDataAll.current_vip_level != curTab" class="vip_top_disabled">
            <span>{{ t('level_page_unlock') }}</span>
          </div>

          <div class="list_item" v-for="(item, index) in levelDyData" :key="index">
            <div class="list_item_l" v-if="item.child[0].levelArr.includes(curTab + 1)">
              <div class="title_big"> {{ t(item.title) }}</div>
            </div>
            <n-flex class="list_item_r">
              <div class="list_item_r_item" v-for="(item_1, index_1) in item.child" :key="index + index_1">

                <div class="list_item_bg">
                  <div class="item_txt">
                    <div>{{ t(item_1.name) }}</div>

                    <div v-if="state.currentData" class="amount">

                      <span v-if="item_1.icon === 'level_js'">
                        {{ state.currentData.promotional_reward_status.money }}</span>
                      <span v-else-if="item_1.icon === 'level_lj'">
                        {{ state.currentData.gift_money_amount }} </span>
                      <span v-else-if="item.key == 'chip'">
                        <template v-if="hasLogin">

                          {{ toFixedNumber(Number(state.currentData.ratio.split(',')[index_1]) * 100) + '%' }}
                        </template>
                        <template v-else>
                          {{ '--' }}
                        </template>
                      </span>
                      <span v-else>

                      </span>
                    </div>
                  </div>


                  <div class="item_img">
                    <Imgt :src="`/img/level/${item_1.icon}.webp`" />
                  </div>
                </div>
              </div>
            </n-flex>
          </div>
        </div>
      </n-spin>
    </div>

  </div>

  <!-- 奖励派发说明 -->
  <ModalDialog v-model:visible="ruleModal" title="level_page_paiTitle">
    <template #content>
      <div class="content_box">
        <div class="list_tip">
          <p> {{ t('level_page_paiRule_11') }}</p>
          <p> {{ t('level_page_paiRule_1') }}</p>
        </div>
        <div class="list_tip">
          <p> {{ t('level_page_paiRule_22') }}</p>
          <p> {{ t('level_page_paiRule_2') }}</p>
        </div>
        <div class="list_tip">
          <p>{{ t('level_page_paiRule_33') }}</p>
          <p>{{ t('level_page_paiRule_3') }}</p>
        </div>
      </div>
    </template>
  </ModalDialog>

</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import { Message } from '@/utils/discreteApi.ts';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import pinia from '@/store';
import { User } from '@/store/user';
import { toFixedNumber, verifyNumberComma } from '@/utils/others.ts';
import Imgt from '@/components/Imgt.vue';
import navTab from '@/views/wallet/components/navTab.vue';
import ModalDialog from '@/components/ModalDialog.vue';
import Rules from './rules.vue';
import ScrollView from "@/components/ScrollView.vue";
import { useRouter } from "vue-router";
const router = useRouter();
// 从 store 获取 vipinfo 数据
const UserStore = User(pinia);
const { VIPinfo, hasLogin } = storeToRefs(UserStore);
const activeRef = ref()
console.log(activeRef);

const { t } = useI18n();
const ruleModal = ref(false);
// const timerRe = ref();
// const refreshFlag = ref(false);
const levelDataAll: any = ref({
  current_vip_level: 0,
  daily_rebate: 0,
  total_bet_money: 0,
  vip_level_reward_config: [],
});

const goRecords = () => {
  router.push({
    path: '/wallet/records',
    query: {
      active: 5
    },
  })
}
// const scrollRef = ref<HTMLElement>()
const loading = ref(false);
const curTab = ref(0);
const isDetail = ref(false);
const levelListData = ref(
  [
    { level: 'VIP1', key: 1 },
    { level: 'VIP2', key: 2 },
    { level: 'VIP3', key: 3 },
    { level: 'VIP4', key: 4 },
    { level: 'VIP5', key: 5 },
    { level: 'VIP6', key: 6 },
    { level: 'VIP7', key: 7 },
    { level: 'VIP8', key: 8 },
    { level: 'VIP9', key: 9 },
    { level: 'VIP10', key: 10 },
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
        { name: 'level_page_secretary', icon: 'level_vip', levelArr: [8, 9, 10] },
        { name: 'level_page_reception', icon: 'level_game', levelArr: [8, 9, 10] },
        // { name: 'level_page_month_gift', icon: 'level_lj', levelArr: [8, 9, 10] },
      ],
    },

  ],
);

// 获取等级数据
const queryData = () => {
  loading.value = true;
  const query = NetPacket.req_vip_info();
  Net.instance.sendRequest(query);
};

// 数据处理
const resultHandle = (res: any) => {
  console.log('level-data--------', res, VIPinfo.value);
  loading.value = false;
  if (Object.keys(VIPinfo.value).length > 0) {
    levelDataAll.value = levelDataAll.value
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

  const targetArr = VIPinfo.value.vip_level_reward_config?.find((item: any) => item.level == (Number(VIPinfo.value.current_vip_level)))
  const targetMon = targetArr.length && (targetArr[0] as any).target_bet_money;
  return targetMon - Number(VIPinfo.value.total_bet_money) || 0;


};
// 计算vip 等级进度
const vipProcss = () => {

  if (levelDataAll.value.vip_level_reward_config.length) {
    // levelDataAll.value.total_bet_money = 2654000;
    const targetArr = levelDataAll.value.vip_level_reward_config?.find((item: any) => item.level == (Number(levelDataAll.value.current_vip_level)))
    const targetMon = targetArr.length && (targetArr[0] as any).target_bet_money;
    // const targetArr = levelDataAll.value.vip_level_reward_config[Number(levelDataAll.value.current_vip_level)];
    // const targetMon = targetArr.target_bet_money;
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
// const refreshMon = () => {
//   if (!refreshFlag.value) {
//     clearTimeout(timerRe.value);
//     refreshFlag.value = true;
//     queryData();
//     timerRe.value = setTimeout(() => {
//       refreshFlag.value = false;
//     }, 1 * 1000);
//   }
// };
// 领取返水奖励
const getRebate = () => {
  if (levelDataAll.value.daily_rebate === 0) {
    return Message.error(t('level_page_notAward'));
  }
  loading.value = true;
  const query = NetPacket.req_vip_daily_claim();
  Net.instance.sendRequest(query);

};
const clickTab = (key: any) => {

  curTab.value = key;
  state.currentData = VIPinfo.value.vip_level_reward_config?.find((item: any) => item.level == key)


};



const goDetail = (v?: number) => {
  if (v) {
    isDetail.value = true
  } else {
    isDetail.value = false
  }
}

// 设置 选中当前等级数据
// const setCurLevel = () => {



// }
// watch(
//   () => curTab.value,
//   (n) => {
//     if (n) {
//       console.log(n);

//       setCurLevel();
//     }
//   }
// );
watch(
  () => VIPinfo.value,
  (n) => {
    if (n) {
      levelDataAll.value = n;
    }
  },
);
const state: any = reactive({
  currentData: null
})
onMounted(() => {
  state.currentData = VIPinfo.value.vip_level_reward_config?.find((item: any) => item.level == (Number(VIPinfo.value.current_vip_level)))
  curTab.value = state.currentData.level
  openModal();
  isDetail.value = false;

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


  .level_info_top {
    height: 220px;
    background: url('/img/level/level_bg.webp?t=@{timestamp}') center no-repeat;
    background-size: 100%;
  }

  .level_info_pross {
    border-radius: 0;
    background: #14173A;
    padding: 10px 20px 40px;
    border-radius: 0 0 16px 16px;
    margin-bottom: 20px;

    .level_info_vip {
      width: 100%;

      >div {
        position: relative;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        border-radius: 14px;
        background-image: none;
        padding: 12px 4px;
        color: #fff;
        font-weight: 500;
        font-size: 14px;

        &.l_info_pro {
          &.active {
            color: #0A0A0A;
            background-image: url('/img/level/level_active.webp');
            background-size: 44px 44px;
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }
    }

    .item_pro {
      width: 100%;
      margin: 12px 0;
      position: relative;
      flex: auto;
      height: 12px;
      border-radius: 12px;
      box-shadow: inset 0 0 4px 0 #000;
      border: 1px solid #26294C;
      background: #121324;

      .pro_inner {
        display: inline-block !important;
        height: 10px;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 12px;
        border-radius: 7px;
        background: linear-gradient(90deg, #FF8000 0%, #FFD633 100%);
      }
    }

    .vip_detail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 16px;
      border: 1px solid #26294C;
      background: #212443;
      height: 124px;
      padding: 0 30px;

      .l {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        width: 80%;
        font-size: 16px;
        font-weight: 500;

        .t {
          margin-bottom: 15px;
        }

        .b {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 98%;

          span {
            white-space: nowrap;

            &.item_pro {
              margin: 0 12px;
            }
          }
        }
      }

      .button {
        width: 23%;
        height: 48px;
        border-radius: 8px;
        background: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%);
        text-align: center;
        line-height: 48px;
        margin-left: 15px;
        font-size: 16px;
        font-weight: 600;
      }
    }



  }

  .vip_top_disabled {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
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
    border-radius: 16px 16px 0 0;
    background: #14173A;

    .level_info_vip_l {
      overflow: hidden;
      flex-flow: nowrap !important;

      .level_info_vip_l_container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 12px 0;
        position: relative;
      }

      // &::-webkit-scrollbar {
      //   display: block;
      //   height: 5px
      // }

      // &::-webkit-scrollbar-thumb {
      //   background: #a7b7d7;
      //   border-radius: 8px
      // }

      .vip_item {
        cursor: pointer;
        transition: .3s;
        position: relative;
        opacity: .5;

        img {
          height: 200px;
          width: 345px;
          margin-right: 10px;
        }

        &:active {
          transform: scale(.95);
        }

        &.active {
          opacity: 1;

          img {}
        }

        .l {
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          height: 32px;
          border-radius: 6px;
          border: 1px solid #5973AC;
          background: #5A74AD;
          box-shadow: 0px 2px 3px 0px #324C85 inset, 0px 0.5px 1px 0px rgba(255, 255, 255, 0.50);
          position: absolute;
          bottom: 15px;
          left: 10px;
          width: 53%;
          line-height: 32px;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          img {
            height: 18px;
            width: 15.27px;
            margin: 0 3px 0 5px;
          }

          .txt {
            white-space: nowrap;
            overflow: scroll;

            span {
              font-weight: 600;
              text-shadow: 0px 0.972px 0px #995403;
              font-size: 14px;
              font-weight: 600;
              color: #FFD56D;
            }
          }
        }

        .m {
          position: absolute;
          bottom: 15px;
          right: 72px;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          height: 32px;
          border-radius: 6px;
          border: 1px solid #5973AC;
          background: #5A74AD;
          box-shadow: 0px 2px 3px 0px #324C85 inset, 0px 0.5px 1px 0px rgba(255, 255, 255, 0.50);
          line-height: 32px;
          padding: 0 10px;
        }

        .r {
          position: absolute;
          bottom: 15px;
          right: 16px;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          height: 32px;
          border-radius: 6px;
          border: 1px solid #5973AC;
          background: #5A74AD;
          box-shadow: 0px 2px 3px 0px #324C85 inset, 0px 0.5px 1px 0px rgba(255, 255, 255, 0.50);
          line-height: 32px;
          padding: 0 10px;
        }

      }
    }
  }


  .level_list_sec {
    position: relative;
    border-radius: 16px;
    border: 1px solid #26294C;
    background: #14173A;
    padding: 40px;

    .level_info_txt {
      position: relative;
      margin-bottom: 20px;

      span:first-child {
        color: #FFF;
        font-size: 20px;
        font-weight: 500;
      }

      span:last-child {
        cursor: pointer;
        text-align: right;
        font-size: 16px;
        font-weight: 500;
        text-decoration-line: underline;
        background: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        &::after {
          content: '';
          width: 95px;
          height: 2px;
          background: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%);
          position: absolute;
          top: 22px;
          right: 0;
        }
      }
    }



    .list_item {
      position: relative;
      margin-bottom: 30px;

      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;

      .list_item_l {
        text-align: center;
        margin-bottom: 10px;

        .title_big {
          font-size: 16px;
          font-weight: 500;
          text-align: left;
        }

      }

      .list_item_r {
        flex: auto;
        gap: 20px 2px !important;

        .list_item_r_item {
          text-align: center;
          margin-right: 15px;

          .list_item_bg {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 192px;
            height: 74px;
            background: url('/img/level/viptq_bj.webp') center no-repeat;
            background-size: 100%;
            padding: 0 15px;

            .item_txt {
              .amount {
                color: #FAC905;
                font-size: 14px;
                font-weight: 700;
              }
            }

            .item_img {
              height: 60px;

              img {
                height: 100%;
              }
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

.content_box {
  padding: 30px 35px;

  .list_tip {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;

    p {
      margin-bottom: 5px;
      margin-top: 5px;

      &:last-child {
        margin-left: 18px;
      }
    }
  }
}

.vip_detail_header {
  position: relative;

  .return {
    position: absolute;
    right: 20px;
    top: 16px;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
}
</style>
