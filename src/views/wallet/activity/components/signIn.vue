<template>
    <n-modal class="tips_sm_modal" :show="showModal" :mask-closable="false">
      <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
        <div class="form_container vertical">
          <div class="header rel center">
            <span class="weight_5 t_md">{{ t('activity_page_signIn') }}</span>
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
              <!-- 签到提示 -->
              <ModalDialog v-model:visible="showTipModal" :title="t('activity_page_tip')">
                <template #content>
                  <div class="tip_content_box">
                    <div class="cont_txt" v-html="tipsTxt"></div>
                    <n-flex justify="center" class="cont_btn">
                      <!-- 签到成功的按钮-->
                      <template v-if="isSingInSuc">
                        <n-flex justify="center" align="center" class="button two_btn" @click="goToBet">
                          {{ t('activity_page_keepBet') }}
                        </n-flex>
                        <n-flex justify="center" align="center" class="button_color button two_btn" @click="getGiftMon">
                          {{ t('activity_page_confirmGet') }}
                        </n-flex>
                      </template>
                      <n-flex v-else justify="center" align="center" class="button_color button one_btn" @click="showTipModal = false">
                        {{ t(btnTxt) }}
                      </n-flex>
                    </n-flex>
                    <div class="cont_tip">
                      {{ t('activity_page_sevenDays') }}
                    </div>
                  </div>
                </template>
              </ModalDialog>
  
              <!-- 签到 -->
              <div class="sign_box" v-show="curTab === 'sign'">
                <div class="sign_top">
                  <Imgt src="/img/sign/sing_banner.webp" class="logo" />
                </div>
                 <Calendar class="calendar" :markDate="[]" :markDateMore="[]" agoDayHide="1530115221"
                           @choseDay="clickDay" :data="signData" :sundayStart="false" :dayNum="{}">
                 </Calendar>
                <div class="sign_b_box">
                  <div class="sign_pro">
                    <div class="sign_txt">{{ t('activity_page_conSignIn', {num: contineDays}) }}</div>
                    <div class="item_pro">
                      <span class="pro_inner" v-show="countProcss().rate > 0" :style="`width: ${countProcss().rateStr}`"> </span>
                    </div>
                    <n-flex class="sign_amount" justify="space-between">
                      <span>{{t('activity_page_todayBet')}} {{verifyNumberComma(String(signData.cur_bet))}}</span>
                      <span>{{ verifyNumberComma(String(nextLevelData.bet)) }}</span>
                    </n-flex>
                  </div>
                  <n-flex class="sign_b_txt" justify="space-between">
                    <span> {{ t('activity_page_canGet') }}：{{verifyNumberComma(String(signData.day_money))}} </span>
                    <span v-show="signData.day_money > 0"> {{ t('activity_page_nextCanGet') }}：{{ verifyNumberComma(String(nextLevelData.day)) }} </span>
                    <span> {{ t('activity_page_maxCanGet') }}：{{ verifyNumberComma(String(awardArr[awardArr.length - 1]?.day)) }} </span>
                  </n-flex>
                </div>
                <div class="sign_btn_box">
                  <n-flex justify="center" class="btn_box">
                    <a @click="goToBet">{{ t('activity_page_goBet') }}</a>
                    <a v-if="signData.day_status === 1" class="button_color" @click="getGiftMon">{{ t('promo_page_receive') }}</a>
                    <a v-if="signData.day_status === 0" class="button_color" @click="clickDay({isToday: true, isSignIn: !!signData.day_status})">{{ t('activity_page_goSign') }}</a>
                    <a v-if="signData.day_status === 2" class="button_color">{{t('activity_page_signIned')}}</a>
                  </n-flex>
                  <div class="tip_box">
                    {{ t('activity_page_stopTime') }}:
                    <n-countdown ref="countdownRef" :duration="dateobj.totalTime" :active="activeRef" />
                  </div>
                </div>
              </div>
              <!-- 奖励 -->
              <div v-show="curTab === 'award'">
                <div class="sign_table">
                  <n-flex class="sign_table_header">
                    <span class="sign_table_td"> {{t('activity_page_dayBet')}} </span>
                    <span class="sign_table_td"> {{t('activity_page_dayPrize')}} </span>
                    <span class="sign_table_td"> {{t('activity_page_weekPrize')}} </span>
                    <span class="sign_table_td"> {{t('activity_page_monthPrize')}} </span>
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
                <div class="he_txt_list" v-for="(item) in Array.from({ length: 11 }, (_, index) => index + 1)" :key="item">
                  {{ t(`activity_page_signTips_${item}`) }}
                </div>
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
  import { verifyNumberComma, returnDoTime } from '@/utils/others';
  import { convertDateToObject } from "@/utils/dateTime";
  import { useRouter } from 'vue-router';
  import type { CountdownInst } from 'naive-ui'
  import ModalDialog from '@/components/ModalDialog.vue';

  const router = useRouter();
  const { t } = useI18n();
  const showModal = ref(false);
  const showTipModal = ref(false);
  const isSingInSuc = ref(false); // 是否签到成功
  const isResign = ref(false); // 是否 是补签
  const contineDays = ref(0); // 连续签到天数
  const tipsTxt = ref();
  const btnTxt = ref('home_page_confirm');

  const signData: any = ref({
    add_sign_in: 1000, // 补签需要消耗的有效投注
    cur_bet: 0, // 当前投注
    day_money: 0, // 当前可领取彩金
    day_status: 0, // 是否已签到, 0未签到，1 已签到，2 已领取签到彩金
    sign_status: [],
  }); // 签到配置信息
  const nextLevelData = ref(
    {
      bet: 0,
      day: 0,
    }
  ); // 投注达到下一等级的数据
  const state: any = reactive({
    showModal: false,
  });
  const curTab = ref('sign')
  const tabArr = [
    {label: 'activity_page_signIn', value: 'sign'},
    {label: 'activity_page_award', value: 'award'},
    {label: 'activity_page_illustrate', value: 'illustrate'},
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
  // 去投注
  const goToBet = () => {
    router.push(`/`)
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
    contineDays.value = countSignInDays(signData.value.sign_status);
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
  // 计算连续签到天数
  const countSignInDays = (arr: any) => {
    // 对数组进行排序
    arr.sort((a: any, b: any) => a - b);
    let maxCount = 0;
    let currentCount = 1;
    for (let i = 1; i < arr.length; i++) {
      // 判断当前元素和前一个元素是否连续
      if (arr[i] === arr[i - 1] + 1) {
        currentCount++;
      } else {
        // 如果不连续，更新最大连续计数
        maxCount = Math.max(maxCount, currentCount);
        currentCount = 1; // 重置当前计数
      }
    }
    // 最后一次更新最大连续计数
    maxCount = Math.max(maxCount, currentCount);
    return maxCount > 1 ? maxCount : 0; // 如果有连续数字，返回数量；否则返回0
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
  // 签到动作
  const signInAction = () => {
    const req = NetPacket.req_sign_in();
    req.sign_date = {
      ...signData.value.cur_time
    }
    Net.instance.sendRequest(req);
  }
  // 签到结果 0:成功 1:参数错误 2:已签到 3 下注未达到签到要求 4 IP 或 设备已签到
  const handleSignInAc = (res: any) => {
    console.log('-----88', res)
    const tips: any = {
      0: 'activity_page_signSuc',
      1: 'activity_page_errorP',
      2: 'activity_page_signIned',
      3: 'activity_page_notEnoughBet',
      4: 'activity_page_errorIp',
    }
    if (res.result === 0) {
      if (isResign.value) {
        reSignInSuc();
      } else {
        signInSuccess();
      }
      getSignInfo();
      Message.success(t(tips[res.result]))
    } else {
      Message.error(t(tips[res.result]))
    }
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

  // 签到成功 --- 可签到状态，签到成功弹窗提示
  const signInSuccess = () => {
    const curBet = signData.value.cur_bet;
    showTipModal.value = true;
    isSingInSuc.value = true;
    tipsTxt.value = ` <div>${t('activity_page_todayAllBet')}：${verifyNumberComma(String(curBet))}</div>
                          <div>${t('activity_page_canGift')}：${verifyNumberComma(String(signData.value.day_money))}</div>
                          <div>${t('activity_page_maxCanGet')}：${verifyNumberComma(String(awardArr.value[awardArr.value.length - 1].day))}</div>`
  }
  // 补签成功
  const reSignInSuc = () => {
    const curBet = signData.value.cur_bet;
    const usedBet = signData.value.used_bet;
    // 可补签状态，补签成功弹窗提示
    console.log('补签成功----')
    showTipModal.value = true;
    btnTxt.value = 'home_page_confirm';
    tipsTxt.value = ` <div>${t('activity_page_useBet')}：${verifyNumberComma(String(signData.value.add_sign_in))}</div>
                          <div>${t('activity_page_avBet')}：${verifyNumberComma(String(curBet - usedBet))}</div>
                          <div>${t('activity_page_finishRe', {num: verifyNumberComma(String(signData.value.day_money))})}</div>`;
  }

  const clickDay = (data: any) => {
    console.log('点击了日期---', data)
    state.activeDate = data
    // 签到参数
    const curTime = convertDateToObject(returnDoTime())
    signData.value.cur_time = {
      ...signData.value.cur_time,
      day: data?.id,
      hour: curTime.hour,
      minute: curTime.minute,
      second: curTime.second
    }
    const needBet = awardArr.value[0].bet;
    const curBet = signData.value.cur_bet;
    const usedBet = signData.value.used_bet;
    // 当日签到 --- 点击的日期是今天
    if (data.isToday) {
      isResign.value = false
      // 未达到有效投注
      if (curBet < needBet) {
        console.log('未达到有效投注' )
        showTipModal.value = true;
        btnTxt.value = 'home_page_confirm';
        tipsTxt.value = ` <div>${t('activity_page_onlyBet')}：${verifyNumberComma(String(curBet - usedBet))}</div>
                          <div>${t('activity_page_needBet')}：${verifyNumberComma(String(needBet - curBet))}</div>
                          <div>${t('activity_page_failSign')}</div>`
      } else { // 达到条件，触发签到
        // 今日未签到
        if (!data.isSignIn) {
          signInAction();
        }
      }
    }
    // 补签 --- 点击今天之前的日期，没有签到过，点击补签
    if (data?.beforeNow && !data?.isSignIn) {
      isResign.value = true
      console.log('补签!!!!', data)
      // 未完成今日签到，点击补签提示
      if (!signData.value.day_status) {
        showTipModal.value = true;
        btnTxt.value = 'activity_page_knowed';
        tipsTxt.value = `<div>${t('activity_page_needSign')}</div> `;
        return;
      }
      // 未达到补签有效投注额，点击补签提示
      if (curBet - usedBet < signData.value.add_sign_in) {
        showTipModal.value = true;
        btnTxt.value = 'activity_page_keepBet';
        tipsTxt.value = ` <div>${t('activity_page_onlyBet')}：${verifyNumberComma(String(curBet - usedBet))}</div>
                          <div>${t('activity_page_needBet')}：${verifyNumberComma(String(needBet - curBet))}</div>
                          <div>${t('activity_page_failReSign')}</div>`;
        return;
      }
      signInAction();
    }

  }

  onMounted(() => {
    getSignInfo();
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_sign_in_list, handleSignInfo);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_sign_in, handleSignInAc);
  })
  onUnmounted(() => {
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_sign_in_list, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_sign_in, null);
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

  .tip_content_box {
    padding: 30px 30px 28px;
    font-size: 16px;
    text-align: center;
    .cont_txt {
      min-height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      :deep(div) {
        flex: none;
        width: 100%;
      }
    }
    .cont_btn {
      margin: 30px 0 8px;
      .one_btn {
        width: 240px;
        height: 40px;
      }
      .two_btn {
        border-radius: 8px;
        width: 197px;
        height: 40px;
        background: linear-gradient(180deg, #3246FF 0%, #3110FF 100%);
      }
    }
    .cont_tip {
      color: #EB808C;
    }
  }
  </style>
