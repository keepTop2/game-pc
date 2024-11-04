<template>
  <div>
    <div class="card_des_wrap">
      <div class="card_des">
        <span class="title">赛事简介</span>
        <div class="content">
          {{ infoData?.introduction }}
        </div>
      </div>
      <div class="card_des">
        <span class="title">比赛详情</span>
        <div class="card_des_date" v-if="infoData.detail&&infoData?.detail.length">
          <!-- {{ infoData?.detail.split() }} -->
          <span v-for="item in infoData?.detail" :key="item"> • {{ item }}</span>
        </div>
      </div>
      <div class="card_des">
        <span class="title">赛事规则</span>
        <div class="card_des_date" v-if="infoData.rule&&infoData?.rule.length">
          <span  v-for="item in infoData?.rule" :key="item"> 
          <span v-if="item">
            • {{ item }}
          </span>
         
          </span>
        </div>
      </div>
      <div class="card_des">
        <span class="title">奖品设置</span>
        <div class="card_des_date">
          <span> • 冠军：₱100,000现金奖励 + 奖杯</span>
          <span> • 亚军：₱50,000现金奖励</span>
          <span> • 季军：₱25,000现金奖励</span>
        </div>
      </div>
      <div class="card_des">
        <span class="title">报名方式</span>
        <div class="content">
          {{ infoData?.applyway }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// defineProps({
//   infoData: {
//     type: Object,
//     default: () => ({}),
//   },
// });

const infoData = {
  introduction:'欢迎参加本年度最激动人心的德州扑克锦标赛！无论您是经验丰富的扑克高手，还是刚刚入门的新手，这场比赛都将为您提供一个展示技巧和策略的绝佳平台。',
  detail:['日期：2024年7月20日','时间：下午2:00开始','报名费：₱5,000'],
  rule:['比赛采用德州扑克无限注规则','每位参赛者将获得相同数量的筹码。','比赛将持续到最后一名选手被淘汰，冠军     将获得丰厚奖金和奖杯'],
  applyway:'请访问我们的网站或亲临俱乐部前台报名。名额有限，先到先得！准备好迎接挑战了吗？快来展示您的扑克技巧，赢取丰厚奖品吧！'
}


</script>

<style lang="less" scoped>
@timestamp: `new Date() .getTime() `;
.card_des_wrap {
  display: flex;
  margin-top: 46px;
  margin-bottom: 30px;
}

.card_des {
  width: 286px;
  height: 172px;
  color: #fff;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  .title {
    position: absolute;
    top: 20px;
    left: 30px;
  }

  .content {
    margin-top: 60px;
    width: 100%;
    padding: 0 25px 0 10px;
    word-break: break-all;
    font-size: 12px;
    line-height: 22px;
    margin-left: 5px;
  }

  .card_des_date {
    margin-top: 60px;
    width: 88%;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    line-height: 22px;
    margin-left: 15px;
    overflow: hidden;
  }

  &:nth-child(1) {
    background: url('/img/home/match_card1.webp?t=@{timestamp}') no-repeat;
    background-size: 100% 100%;
  }

  &:nth-child(2) {
    background: url('/img/home/match_card2.webp?t=@{timestamp}') no-repeat;
    background-size: 100% 100%;
  }

  &:nth-child(3) {
    background: url('/img/home/match_card3.webp?t=@{timestamp}') no-repeat;
    background-size: 100% 100%;
  }

  &:nth-child(4) {
    background: url('/img/home/match_card4.webp?t=@{timestamp}') no-repeat;
    background-size: 100% 100%;
  }

  &:nth-child(5) {
    background: url('/img/home/match_card5.webp?t=@{timestamp}') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
