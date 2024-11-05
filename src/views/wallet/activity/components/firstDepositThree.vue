<template>
  <div class="first-deposit-three">
    <!-- 顶部banner -->
    <div class="banner">
      <img src="/img/wallet/first-deposit-three_bg.webp" alt="">
    </div>

    <!-- 首存奖金模块 -->
    <div class="amount-container">
      <div class="amount-box">
        <div class="amount-info">
          <div class="avatar">
            <img src="/img/wallet/first-deposit-three_1.webp" alt="">
          </div>
          <div class="info">
            <div class="amount-info">
              <span style="margin-right: 4px;">首存奖金: </span>
              <span class="amount">{{ firstAmount }}</span>
            </div>
<!--            <div class="tip">{{textTips}}</div>-->
            <div class="amount-info">
              <span style="margin-right: 4px;">昨日返点: </span>
              <span class="amount">{{ firstAmount }}</span>
            </div>
          </div>
        </div>
        <div class="amount-options">
          <p class="get-details">领取详情</p>
          <n-button class="start-btn recommend-btn" :bordered="false" @click="signInButton">前往推荐</n-button>
          <n-button class="start-btn" :bordered="false" @click="signInButton">开启奖金</n-button>
        </div>
      </div>
    </div>

    <!-- 活动内容 -->
    <div class="activity-content">
      <div class="title">Activity content</div>
      <div class="content-list">
        <div class="day" v-for="(item, index) in signIn_7.data" :key="index">
          <div class="now_get">
            <p>{{ item.name }}</p>
            <Imgt class="question" src="/img/home/question_icon.webp" alt="" />
          </div>
          <div class="day_content">
            <div class="information">
              <div>
                <p class="percent">{{ item.percent }}%</p>
                <Imgt class="gift" :src="item.src" alt="" />
                <div class="water_money" v-if="item.waterNum !== undefined">
                  <n-progress type="circle" :percentage="item.waterNum" color="rgba(53, 208, 60, 1)" />
                </div>
              </div>
              <!--              <n-button :bordered="false" class="weal" @click="signInButton">{{t('first_deposit_receive')}}</n-button>-->
              <n-button :bordered="false" class="weal" @click="signInButton">
                <img src="/img/home/lock.webp" alt="">
              </n-button>
            </div>
          </div>
        </div>
      </div>
    </div>

<!--    代理活动-操作规则-->
    <div class="operating-rule">
      <div class="title">Quy tắc hoạt động</div>
      <div class="content">
        <div class="item">Bước 1 : vào trang PKBET đăng nhập tài khoản hội viên</div>
        <div class="item">Bước 1 : vào trang PKBET đăng nhập tài khoản hội viên</div>
        <div class="item">Bước 1 : vào trang PKBET đăng nhập tài khoản hội viên</div>
        <div class="item">Bước 1 : vào trang PKBET đăng nhập tài khoản hội viên</div>
      </div>
    </div>

    <!--    保险金-->
    <div class="insurance">
      <div class="title">Quy tắc hoạt động</div>
      <div class="content">
        <p>Bảo hiểm nạp đầu</p>
        <p>5%</p>
      </div>
    </div>



<!--  活动Table  -->
    <div class="table">
      <n-data-table
        :bordered="false"
        :single-line="false"
        :max-height="500"
        :columns="table.columns"
        :data="table.data"
        border
      >
<!--        <template #empty>-->
<!--          <div class="nodata">-->
<!--            <Imgt src="/img/wallet/nodata.webp" alt="nodata" />-->
<!--            <div>{{ t('home_page_nomore_data') }}</div>-->
<!--          </div>-->
<!--        </template>-->
      </n-data-table>
    </div>



    <!-- 活动规则 -->
    <div class="rules">
      <div class="title">Quy tắc hoạt động</div>
      <div class="rules-list">
        <div class="rule-item" v-for="(rule, index) in rulesList" :key="index">
          {{ index + 1 }}. {{ rule }}
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="footer">
      <n-button :bordered="false" class="bottom-btn" @click="signInButton">
        立即参与
      </n-button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed, h, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import Imgt from '@/components/Imgt.vue';
import { Dialog } from '@/utils/discreteApi.ts';
import { Local } from '@/utils/storage.ts';
import { User } from '@/store/user.ts';
import pinia from '@/store';

const { t } = useI18n()
const firstAmount = ref('0.00')

const props = defineProps<{
  defineModelInfo: number
}>()

// 活动内容数组
// const activityList = [
//   {
//     rate: '5%',
//     title: '立即领取',
//     locked: true,
//     progress: 0
//   },
//   {
//     rate: '10%',
//     title: '关注我们',
//     locked: true,
//     progress: 0
//   },
//   {
//     rate: '15%',
//     title: '邀请好友',
//     locked: true,
//     progress: 0
//   },
//   {
//     rate: '30%',
//     title: '10倍流水',
//     locked: true,
//     progress: 100
//   },
//   {
//     rate: '60%',
//     title: '25倍流水',
//     locked: true,
//     progress: 60
//   },
//   {
//     rate: '80%',
//     title: '50倍流水',
//     locked: true,
//     progress: 8
//   }
// ]

const signIn_7 = reactive({
  data: [
    { name: t('first_deposit_sign_in_1'), percent: 5, src: '/img/home/firstDeposit_1.webp' },
    { name: t('first_deposit_sign_in_2'), percent: 10, src: '/img/home/firstDeposit_2.webp' },
    { name: t('first_deposit_sign_in_3'), percent: 15, src: '/img/home/firstDeposit_3.webp' },
    { name: t('first_deposit_sign_in_4'), percent: 30, src: '/img/home/firstDeposit_last.webp', water: true, waterNum: 100 },
    { name: t('first_deposit_sign_in_5'), percent: 60, src: '/img/home/firstDeposit_last.webp', water: true, waterNum: 40 },
    { name: t('first_deposit_sign_in_6'), percent: 80, src: '/img/home/firstDeposit_last.webp', water: true, waterNum: 0 },
  ]
})

// 活动规则数组
const rulesList = [
  'First Deposit × 3 events maximum can get 15.000.000',
  'Event content',
  'After top up can get the amount of top up and directly unlock the 5% of top up amount',
  'Join Facebook and Telegram can unlock 10% of top up amount',
  'Invite 1 friend to complete the first deposit event can unlock 15% of top up amount',
  'Achieve 10 times turnover can unlock 30% of top up amount',
  'Achieve 25 times turnover can unlock 60% of top up amount',
  'Achieve 50 times turnover can unlock 80% of top up amount',
  'The above content event must completed in 15 days after first deposit',
  'Withdraw the unlock amount must reach 3 times turnover',
  'This activity can be combined with cashback, but cannot be combined with other site deposit promotions.',
  'No game limit, as long as the bet game has a valid result and meets the conditions, it will be withdrawn.',
  'Cross betting, Hong Kong 0.75/Europe 1.75 sports bets are not valid',
  'Members with the same IP, PC, device, and phone number can only enjoy the offer once.',
  'If we detect any violations, fraud, or abuse of loopholes for personal gain, our company has the right to suspend and cancel all bonuses generated by the violating member without notifying the member',
  'To avoid textual confusion, PKBET reserves the right to interpret the final activity.'
]


// 提示文字
const textTips = computed(() => {
  return '领取奖金立即来到账，可立即前往获得！'
})





//tableData
const table = reactive({
  columns: [
    { title: '名字', key: 'name' },
    { title: 'activity_page_award', key: 'rewards' },
    { title: '最高', key: 'highest',
      render(row: any) {
        return h('span', {
          class: 'yellowText',
          style: {color:'#FAC904'},
          innerHTML: `${row.highest}`,
        });
      },},
    { title: '打赌', key: 'bet' },
  ],
  data: [
    {
      name: 'qqweqw',
      rewards: '50%',
      highest: 15000,
      bet: '8轮打赌',

    }
  ],
  // 首存100% & 二次存款-table
  first_hundred_percent: {
    columns: [
      { title: '名字', key: 'name' },
      { title: 'activity_page_award', key: 'rewards' },
      { title: '最高', key: 'highest',
        render(row: any) {
          return h('span', {
            class: 'yellowText',
            style: {color:'#FAC904'},
            innerHTML: `${row.highest}`,
          });
        },},
      { title: '打赌', key: 'bet' },
    ],
    data: [
      {
        name: 'qqweqw',
        rewards: '50%',
        highest: 15000,
        bet: '8轮打赌',

      }
    ],
  },

  // 代理活动
  agencyTable: {
    columns: [
      { title: '', key: 'name' },
      { title: 'NỔ HŨ', key: 'rewards' },
      { title: 'GAME BÀI', key: 'one'},
      { title: 'THỂ THAO', key: 'two'},
      { title: 'LIVE CASINO', key: 'three'},
      { title: 'XỔ SỐ', key: 'four'},
    ],
    data: [
      {
        name: 'qqweqw',
        'rewards': '50%',
        'one': 15000,
        'two': '8轮打赌',
        'three': '8轮打赌',
        'four': '8轮打赌',

      }
    ],
  },

  // 洗码活动
  codeWashingTable: {
    columns: [
      { title: 'vip', key: 'name' },
      { title: 'NỔ HŨ', key: 'rewards' },
      { title: 'GAME BÀI', key: 'one'},
      { title: 'THỂ THAO', key: 'two'},
      { title: 'LIVE CASINO', key: 'three'},
      { title: 'XỔ SỐ', key: 'four'},
    ],
    data: [
      {
        name: 'qqweqw',
        'rewards': '50%',
        'one': 15000,
        'two': '8轮打赌',
        'three': '8轮打赌',
        'four': '8轮打赌',

      }
    ],
  },
})

const signInButton = () => {
  console.log('signInButton');
  Dialog.warning({
    showIcon: false,
    title: t('activity_page_tip'),
    content: '关注Telegram和Facebook官方号，可获得丰厚奖励， 快去联系客服领取吧！',
    positiveText: t('home_page_confirm'),
    negativeText: t('home_page_cancel'),
    onPositiveClick: async () => {

    },
    onNegativeClick: () => {

    },
  })
}

</script>
<style scoped lang="less">
.first-deposit-three {
  width: 960px;
  min-height: 1242px;
  //background: #26294C;
  padding-bottom: 20px;

  .banner {
    width: 100%;

    img {
      width: 100%;
      display: block;
    }
  }

  .amount-container {
    padding: 0 20px;
    margin-top: 20px;

    .amount-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(90deg, #FA397E, #FF852D);
      border-radius: 10px;
      padding: 12px 16px;
      position: relative;

      .amount-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 12px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .info {
          flex: 1;
          .amount-info {
            color: #fff;
            font-size: 14px;

            .amount {
              font-size: 18px;
              color: #FAC904;
            }
          }
          .tip {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            margin-top: 4px;
          }
        }
      }


      .amount-options {
        display: flex;
        align-items: center;
        .get-details {
          color: #FFF;
          font-size: 16px;
          font-style: normal;
          line-height: normal;
          text-decoration-line: underline;
          cursor: pointer;
          margin-right: 24px;

        }
        .recommend-btn {
          margin-right: 16px;
          background: #394EFF !important;
        }
        .start-btn {
          width: 100px;
          height: 40px;
          background: #FFB327;
          color: #ffffff;
          font-size: 14px;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
        }
      }


    }
  }

  .activity-content {
    padding: 20px;

    .title {
      color: #fff;
      font-size: 18px;
      margin-bottom: 15px;
      text-align: center;
    }

    .content-list {
      display: flex;
      gap: 20px;
      padding: 0 12px;

      .day {
        width: 192px;
        height: 150px;
        overflow: hidden;
        top: 546px;
        border-radius: 16px;
        background: linear-gradient(180deg, #FFFFFF 0%, #C8C4D8 100%);

        .now_get {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 32px;
          padding: 0 6px;

          //cursor: pointer;
          p {
            margin: 0 6px 0 0;

          }

          background: linear-gradient(91.03deg, #FFA451 0.29%, #FF6B18 99.39%);

          .question {
            width: 14px;
            height: 14px;
            flex-grow: 0;
          }
        }

        .day_content {
          display: flex;
          height: calc(100% - 32px);
          align-items: center;
          flex-direction: column;

          .information {
            width: 100%;
            height: 100%;
            padding: 0 10px 10px;
            background-image: url('/img/home/firstDeposit_purse.webp');
            background-repeat: no-repeat;
            background-position: center 0;
            background-size: 96px 96px;

            >div {
              position: relative;
              display: flex;
              height: calc(100% - 24px);
              align-items: center;
              padding: 35px 0 0 0;
              justify-content: space-between;

              .percent {
                width: 46px;
                height: 22px;
                line-height: 22px;
                text-align: center;
                border-radius: 20px;
                font-size: 16px;
                color: rgba(255, 111, 29, 1);
                border: 1px solid rgba(255, 111, 29, 1);

              }

              .gift {
                width: 36px;
                height: 43px;
                z-index: 2;
              }

              .water_money {
                position: absolute;
                top: 5px;
                right: -3px;

                :deep(.n-progress) {
                  width: 44px;
                  height: 44px;

                  .n-progress-text {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    text-align: center;
                    font-weight: 700;
                    color: #ffffff;
                    width: 36px;
                    height: 36px;
                    border-radius: 100%;
                    background: radial-gradient(121.98% 100% at 50% 0%, #3EF345 0%, #22B627 68.01%, #3EF345 97%);

                  }
                }

              }
            }

            .weal {
              width: 100%;
              height: 24px;
              line-height: 24px;
              margin-top: 6px;
              font-size: 14px;
              font-weight: 400;
              border-radius: 20px;
              //background: linear-gradient(180deg, #F7DC82 0%, #CA8528 100%);
              background: #7F7A94;
            }

          }

        }
      }
    }
  }

  .operating-rule {
    margin: 20px 0;
    .title {
      text-align: center;
      color: #fff;
      font-size: 18px;
      margin-bottom: 15px;
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item:last-child {
        margin: 0;
      }
      .item {
        //width: 210px;
        //height: 84px;
        margin-right: 13px;
        text-align: center;
        padding:26px 10px;
        border-radius: 10px;
        background: #1B1F4B;
      }
    }
  }

  .insurance {
    margin: 20px 0;
    .title {
      text-align: center;
      color: #fff;
      font-size: 18px;
      margin-bottom: 15px;
    }
    .content {
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
      background: #1B1F4B;
      border-radius: 8px;
      p:nth-of-type(1) {
        border-right: 1px solid #26294c;
      }
      p {
        flex: 1;
        margin: 0;
        text-align: center;
      }
    }

  }

  .table {
    padding: 25px 20px 0;
    :deep(.n-data-table-table) {
      background-color: rgba(27, 31, 75, 1);
      .n-data-table-thead {
        background-color: rgba(27, 31, 75, 1);
      }
    }

    // table的线
    :deep(.n-data-table:not(.n-data-table--single-line) .n-data-table-th), :deep(.n-data-table:not(.n-data-table--single-line) .n-data-table-td) {
      border-right: 1px solid #26294c !important;
    }
    // thead
    :deep(.n-data-table-thead > tr > th) {
      text-align: center;
      color: rgba(175, 186, 189, 1);
      border-bottom: rgba(38, 41, 76, 1);
      background: #1B1F4B;
    }
    // tbody
    :deep(.n-data-table-base-table-body .n-scrollbar-container tbody td) {
      color: rgba(175, 186, 189, 1) !important;
      border-bottom:1px solid #121336;
      background: #121336;
      text-align: center;
      text-align: -webkit-center;
      background: #121336;

    }

    .yellowText {
      color: #FAC904 !important;
    }
    //
    //:deep(.n-data-table .n-data-table-tr.n-data-table-tr--striped.n-data-table-td ) {
    //  background-color: rgba(13, 14, 46, 1) !important;
    //}

  }

  .rules {
    padding: 20px;

    .title {
      color: #fff;
      font-size: 18px;
      margin-bottom: 15px;
    }

    .rules-list {
      .rule-item {
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 10px;
      }
    }
  }

  .footer {
    width: 372px;
    height: 46px;
    margin: 30px auto 0;

    .bottom-btn {
      width: 372px;
      height: 46px;
      color: #fff;
      text-align: center;
      padding: 15px;
      border-radius: 8px;
    }
  }

}
</style>
