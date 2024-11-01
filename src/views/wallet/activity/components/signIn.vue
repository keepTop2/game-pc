<template>
    <n-modal class="tips_sm_modal" :show="showModal" :mask-closable="false">
      <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
        <div class="form_container vertical">
          <div class="header rel center">
            <span class="weight_5 t_md">{{ t('签到') }}</span>
            <span class="close abs center pointer t_sm">
              <iconpark-icon @click="onClose" icon-id="tanctongyguanb" color="#fff" size="1.5em"></iconpark-icon>
            </span>
          </div>
          <div class="body_list vertical">
            <n-flex class="tab_box">
              <a :class="`${curTab === item.value ? 'button_color active' : ''}`"
                 @click="clickTab(item)"
                 v-for="(item, index) in tabArr" :key="index">
                {{t(item.label)}}
              </a>
            </n-flex>
  
            <div class="s_content_box">
  
              <!-- 签到 -->
              <div class="sign_box" v-show="curTab === 'sign'">
                <div class="sign_top">
                  <Imgt src="/img/sign/sing_banner.webp" class="logo" />
                </div>
                 <Calendar class="calendar" :markDate="[]" :markDateMore="state.arr" @clickToday="clickToday" agoDayHide="1530115221"
                    @signInEvent="signInEvent" @choseDay="clickDay" :data="state.dataList" :sundayStart="false" :dayNum="state.dayNum">
                 </Calendar>
                <div class="sign_b_box">
                  <div class="sign_pro">
                    <div class="sign_txt">已连续签到 7天</div>
                    <div class="item_pro">
                      <span class="pro_inner" v-show="countProcss().rate > 0" :style="`width: ${countProcss().rateStr}`"> </span>
                    </div>
                    <n-flex class="sign_amount" justify="space-between">
                      <span>今日有效投注额 {{verifyNumberComma(String(signData.cur_bet))}} 元</span>
                      <span>¥ {{ verifyNumberComma(String(nextLevelData.bet)) }} 元</span>
                    </n-flex>
                  </div>
                  <n-flex class="sign_b_txt" justify="space-between">
                    <span> 当前可领取彩金：{{verifyNumberComma(String(signData.day_money))}}元 </span>
                    <span v-show="signData.day_money > 0"> 下级可领取彩金：{{ verifyNumberComma(String(nextLevelData.day)) }}元 </span>
                    <span> 最高可领取彩金：{{ verifyNumberComma(String(awardArr[awardArr.length - 1].day)) }}元 </span>
                  </n-flex>
                </div>
                <div class="sign_btn_box">
                  <n-flex justify="center" class="btn_box">
                    <a @click="router.push(`/`)">立即投注</a>
                    <a v-if="signData.day_status === 1" class="button_color" @click="getGiftMon">立即领取</a>
                    <a v-if="signData.day_status === 0" class="button_color" @click="signInAction">立即签到</a>
                    <a v-if="signData.day_status === 2" class="button_color">已签到</a>
                  </n-flex>
                  <div class="tip_box">
                    距今日有效投注额统计截止:
                    <n-countdown ref="countdownRef" :duration="dateobj.totalTime" :active="activeRef" />
                  </div>
                </div>
              </div>
              <!-- 奖励 -->
              <div v-show="curTab === 'award'">
                <div class="sign_table">
                  <n-flex class="sign_table_header">
                    <span class="sign_table_td"> {{t('每日有效投注额度')}} </span>
                    <span class="sign_table_td"> {{t('单日奖励')}} </span>
                    <span class="sign_table_td"> {{t('7日奖励')}} </span>
                    <span class="sign_table_td"> {{t('28日奖励')}} </span>
                  </n-flex>
                  <div class="sign_table_body">
                    <n-flex class="sign_table_tr" v-for="(item, index) in awardArr" :key="index">
                      <span class="sign_table_td">≥{{ item.bet }} </span>
                      <span class="sign_table_td"> {{ verifyNumberComma(String(item.day)) }} </span>
                      <span class="sign_table_td"> {{ verifyNumberComma(String(item.week)) }} </span>
                      <span class="sign_table_td"> {{ verifyNumberComma(String(item.month)) }} </span>
                    </n-flex>
                  </div>
  
                </div>
              </div>
  
              <!-- 说明 -->
              <div v-show="curTab === 'illustrate'" class="sm_txt">
                1.本活动以自然月单位为一个周期<br>
                2.在活动周期，按照日签到、7日连续签、28日连续签到进行统计，会员当日有效投注额达到≥2,000即可在活动页面手动签到，完成签到后系统将自动发放相应签到礼金至福利中心，自然月内达成7日连续签到即可获得周满签额外奖励，自然月内达成28日连续签到即可获得月满签额外奖励；<br>
                3.例：会员A自然月内连续7天单日有效投注额均≥50,000，即可获得128+128+128+128+128+128+128+388=1,284元签到礼金。<br>
                4.周满签及月满签奖励将按照最低档位奖励发放礼金；<br>
                5.签到礼金不限场馆，签到成功后，自动发放至我的优惠，福利中心领取彩金三日内有效，含发放当日，逾期领取将失效不予补偿，礼金仅需1倍流水即可提款；<br>
                6.已领取月满签奖励的会员，可以继续参与签到活动，领取单日签到奖励，直到自然月结束；<br>
                7.为避免数据延迟，建议在每日23:30之前完成签到，若数据延迟导致无法签到，将不予补发；<br>
                8.玩家忘记签到可以补签，必须先完成当日签到任务才能进行补签，补签需满足补签有效投注额；<br>
                9.活动仅对已结算并产生输赢结果的投注额进行计算，任何走水、串关、提前结算的投注、取消的赛事将不计算在有效投注。<br>
                10.参与本优惠前需完善个人信息，绑定银行卡等信息，且每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑使用者在活动期间每天仅可享受一次签到礼金优惠，如会员使用一切不正常投注、套利等违规行为，我们将保留无限期审核扣回礼金及所产生的利润权利；<br>
                11.为避免文字理解差异，PKbet保留本活动最终解释权。
              </div>
            </div>
  
          </div>
        </div>
      </n-card>
    </n-modal>
  </template>
  
  <script setup lang="ts">
  import { onMounted, onUnmounted, reactive, ref } from 'vue';
  import { Message } from '@/utils/discreteApi.ts';
  import Calendar from '@/components/Calendar.vue'
  import Imgt from '@/components/Imgt.vue';
  import { useI18n } from 'vue-i18n';
  import { NetPacket } from '@/netBase/NetPacket.ts';
  import { Net } from '@/net/Net.ts';
  import { MessageEvent2 } from '@/net/MessageEvent2.ts';
  import { NetMsgType } from '@/netBase/NetMsgType.ts';
  import { verifyNumberComma } from '@/utils/others';
  import { useRouter } from 'vue-router';
  import type { CountdownInst } from 'naive-ui'

  const router = useRouter();
  const { t } = useI18n();
  const showModal = ref(false);
  const signData: any = ref({
    cur_bet: 0, // 当前投注
    day_money: 0, // 当前可领取彩金
    day_status: 0, // 是否已签到, 0未签到，1 已签到，2 已领取签到彩金
  }); // 签到配置信息
  const nextLevelData = ref(); // 投注达到下一等级的数据
  const state: any = reactive({
    showModal: false,
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
    dayNum: {
      TodayIsSignIn: 'true', // 今天是否已签到
    }
  });
  const curTab = ref('sign')
  const tabArr = [
    {label: '签到', value: 'sign'},
    {label: '奖励', value: 'award'},
    {label: '说明', value: 'illustrate'},
  ]
  const awardArr: any = ref(
    [
      // {bet: '2000', day: '8', week: '28', month: '108'},
    ]
  )
  // 倒计时相关
  const activeRef = ref(true)
  const countdownRef = ref<CountdownInst | null>()
  const dateobj = ref({ // 用于倒计时
    curTime: '2024-10-01 01:00:00',
    endTime: '2024-10-01 23:59:59',
    totalTime: 0, // 倒计时时间
  })
  
  const onClose = () => {
    showModal.value = !showModal.value
  }
  const clickTab = (e: any) => {
    curTab.value = e.value
  }

  // 获取签到配置信息
  const getSignInfo = () => {
    const req = NetPacket.req_sign_in_config();
    Net.instance.sendRequest(req);
  }
  const handleSignInfo = (res: any) => {
    signData.value = res
    console.log('-----99', signData.value)
    countTimer(res);
    awardArr.value = res.sign_in_cfgs_0.reverse(); // 反转
    // 下一等级的数据
    for (let i = 0; i < awardArr.value.length; i++) {
      // console.log('&&&&&', awardArr.value[i].bet, res.cur_bet)
      if (awardArr.value[i].bet > res.cur_bet) {
        nextLevelData.value = awardArr.value[i];
        break;
      }
    }
  }
  // 计算倒计时
  const countTimer = (res: any) => {
    dateobj.value.curTime = `${res.cur_time.year}-${res.cur_time.month}-${res.cur_time.day} ${res.cur_time.hour}:${res.cur_time.minute}:${res.cur_time.second}`;
    dateobj.value.endTime = `${res.cur_time.year}-${res.cur_time.month}-${res.cur_time.day} 23:59:59`;
    // 将日期字符串转换为 Date 对象
    const startDate = new Date(dateobj.value.curTime.replace(/-/g, '/')); // 替换 - 为 / 以兼容某些浏览器
    const endDate = new Date(dateobj.value.endTime.replace(/-/g, '/'));
    // 计算时间差（毫秒）
    const timeDifference = endDate.getTime() - startDate.getTime();
    dateobj.value.totalTime = timeDifference;
    console.log('####', dateobj.value, timeDifference)
  }
  // 签到
  const signInAction = () => {

  }
  // 领取签到礼金, 回应 msg_notify_money_update2
  const getGiftMon = () => {
    const req = NetPacket.req_get_signin_extra_reward();
    Net.instance.sendRequest(req);
    setTimeout(() => {
      getSignInfo();
    }, 100)
  }
  // 计算等级进度
  const countProcss = () => {
    if (awardArr.value.length) {
      const rate = (Number(signData.value.cur_bet) / nextLevelData.value.bet) * 100;
      const obj = {
        rate: rate,
        rateStr: `${rate}%`,
      };
      return obj;
    } else {
      return {
        rate: 0,
        rateStr: `0%`,
      };
    }
  };

  const signInEvent = async () => {
    if (state.activeDate.IsSignIn === 'true') {
      return Message.error('今日已签到')
    }
    let str = state.activeDate.date.split('-') // 点击的时间
    let today = new Date()
    let year = today.getFullYear() // 今天哪一年
    let tadayDate = today.getDate() // 今天几号
    let tadayMonth = today.getMonth() + 1 // 今天属于几月
    if (Number(str[0]) > year) {
      return Message.error('未到活动时间')
    } else if (Number(str[0]) < year && Number(str[1]) !== 12) {
      return Message.error('选择时间有误')
    } else if (Number(str[0]) < year && Number(str[1]) === 12) {
      // sign()
    } else {
      if (Number(str[1]) > tadayMonth || Number(str[2]) > tadayDate) {
        return Message.error('未到活动时间')
      } else {
        //   sign()
      }
    }
  }
  const clickToday = (data: any) => {
    if (!state.flag) {
      state.activeDate = data
      state.flag = true
      // console.log('跳到了本月今天', data) // 跳到了本月
    }
  }
  const clickDay = (data: any) => {
    console.log('点击了日期---', data)
    state.activeDate = data
  }

  onMounted(() => {
    getSignInfo();
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_sign_in_list, handleSignInfo);
  })
  onUnmounted(() => {
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_sign_in_list, null);
  })

  defineExpose({
    onClose
  });
  </script>
  <style scoped lang="less">
  // 弹窗提示
  .tips_sm_modal {
    &.form_card {
      width: 960px !important;
      min-height: 544px !important;
  
      :deep(.n-card__content) {
        padding: 0 !important;
  
        .header {
          position: relative;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 2px solid rgba(38, 41, 76, 1);
  
          .close {
            right: 20px;
          }
        }
      }
    }
  }
  
  .body_list {
    font-size: 16px;
    padding: 22px 42px 26px;
    .tab_box {
      margin-bottom: 20px;
      height: 44px;
      line-height: 44px;
      border-radius: 10px;
      background: rgba(13, 14, 46, 1);
      gap: 0 !important;
      a {
        flex: 1;
        color: #AFB6BD;
        text-align: center;
        &.active {
          height: 100%;
          border-radius: 10px;
          color: #fff;
        }
      }
  
    }
  
    .s_content_box {
      .sign_table {
        width: 100%;
        border: 1px solid #26294C;
        border-radius: 16px;
        .sign_table_header {
          background: #1B1F4B;
          border-radius: 16px 16px 0 0;
        }
        .sign_table_td {
          flex: 1;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #26294C;
          &:nth-child(n+2) {
            border-left: 1px solid #26294C;
          }
        }
        .sign_table_tr {
          color: #AFBABD;
          &:nth-child(2n+1) {
            background: #121336;
          }
          &:nth-child(2n) {
            background: #0D0E2E;
          }
        }
        .sign_table_tr, .sign_table_header {
          gap: 0 !important;
          &:last-child {
            .sign_table_td {
              border-bottom: 0;
            }
          }
        }
      }
  
      .sign_box {
        .sign_top {
          margin-bottom: 20px;
          img {
            height: 150px;
          }
        }
        .sign_b_box {
          background: #0D0E2E;
          margin: 24px 0;
          .sign_pro {
            padding: 16px 20px 20px;
            border-radius: 10px;
            background: #171B44;
            border: 1px solid #26294C;
  
            .sign_txt {
              font-size: 18px;
              text-align: center;
            }
            .sign_amount {
              font-size: 14px;
            }
            .item_pro {
              width: 100%;
              margin: 4px 0;
              position: relative;
              flex: auto;
              height: 6px;
              border-radius: 20px;
              box-shadow: inset 0 0 4px 0 #000;
              border: 1px solid #26294C;
              background: #635F55;
  
              .pro_inner {
                display: inline-block !important;
                height: 4px;
                position: absolute;
                left: 0;
                top: 0;
                border-radius: 10px;
                background: linear-gradient(180deg, #F7DC82 0%, #CA8528 100%);
              }
            }
          }
          .sign_b_txt {
            padding: 20px;
          }
  
        }
        .sign_btn_box {
          .btn_box {
            a {
              width: 240px;
              height: 46px;
              line-height: 46px;
              text-align: center;
              background: linear-gradient(180deg, #3246FF 0%, #3110FF 100%);
              border-radius: 12px !important;
            }
          }
          .tip_box {
            margin-top: 8px;
            font-size: 14px;
            line-height: 20px;
            color: #EB808C;
            text-align: center;
          }
        }
      }
    }
  
  }
  </style>
