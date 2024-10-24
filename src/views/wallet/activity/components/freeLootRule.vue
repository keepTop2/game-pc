

<template>
  <div class="freeLootRule">
    <div class="activity intro">
      <p>活动简介</p>
      <p>免费夺宝活动只在试玩场中进行，所有游戏均可开启试玩场，试玩场入口在活动内页中。运营团队将定期举办免费夺宝活动，根据排名给予相应奖励。 </p>
    </div>
    <div class="ranking intro">
      <p>排行榜规则</p>
      <p>玩家每日必须进行一次试玩游戏，产生账户资金变动方可上榜；榜单实时刷新，前X名有奖；</p>
    </div>
    <div class="award intro">
      <p>获奖及领奖流程</p>
      <p>获奖通知：如果玩家获奖，系统会自动发送获奖邮件，请注意查收； 领奖要求：玩家收到获奖邮件后，需要联系客服完成领奖，奖励将以邮件形式发放。</p>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">

.freeLootRule {
  padding-top: 20px;
  .intro {
    margin-bottom: 20px;
    p:nth-of-type(1) {
      text-align: center;
      font-size: 16px;
      font-weight: 400;
    }
    p:nth-of-type(2) {
      font-size: 16px;
      color: rgba(175, 186, 189, 1);
    }
  }
}

</style>
