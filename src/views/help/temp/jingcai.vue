<template>
  <div class="help_content_box">
    <div class="he_title">{{t('竞猜责任')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        本站是一个提供专业体育竞猜、在线网上娱乐城、在线彩票的正规网站。然则我们强烈建议所有玩家都保持一个娱乐的心态来面对所有游戏。
        将会通过极致的用户体验、颠覆性竞猜产品、超本土化的个性服务来为所有玩家提供一个舒适健康的竞猜环境。我们希望所有玩家在游戏的
        同时能及时调整好自己的心态，切勿由于过度沉迷游戏而造成个人经济、事业、家庭等各个方面受到影响。对此，我们强烈建议阁下重新审视自己的行为，
        明确和调整自己的娱乐心态，重新投入正常的生活和工作中来。
      </div>
    </div>

    <div class="he_title">{{t('超过18岁')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        阁下必须超过18岁（或在阁下居住的管辖范围内不被视为未成年人）才可进入此网站。任何未满18岁的人不得在我们网站开户和投注，我们将以严谨的态度看待和处理此问题。
      </div>
    </div>

    <div class="he_title">{{t('娱乐问题防护')}}</div>
    <div class="he_txt">
      <div class="he_txt_list he_txt_list_sec">
        我们强烈建议阁下定期审视您的竞猜行为，检验自己是否投入过度。如果您遇到相关问题请进入以下测试（匿名竞猜行为测试）。
      </div>
      <div class="he_txt_list">1.有否曾因游戏而耽误工作时间?</div>
      <div class="he_txt_list">2.游戏有否影响您的声望?</div>
      <div class="he_txt_list">3.游戏之后，您是否感到自责?</div>
      <div class="he_txt_list">4.阁下有否曾经用游戏所赢得的钱来还债，或者解决财政因难?</div>
      <div class="he_txt_list">5.游戏有否导致您的抱负及效率减低?</div>
      <div class="he_txt_list">6.输钱后，你是否感觉您一定要尽快回来赚回您所失去的?</div>
      <div class="he_txt_list">7.赢钱后，您是否有一种强烈的欲望，回来赢得更多?</div>
      <div class="he_txt_list">8.您是否时常游戏至分文都用尽?</div>
      <div class="he_txt_list">9.你是否借钱，作游戏之用?</div>
      <div class="he_txt_list">10.你是否出卖任何物件，作游戏之用?</div>
      <div class="he_txt_list">11.你是否不愿意用 "游戏金" 来付正常的开支?</div>
      <div class="he_txt_list">12.游戏是否令您疏忽您自己及您家人的健康快乐?</div>
      <div class="he_txt_list">13.您是否花比预计更多的时间在游戏上?</div>
      <div class="he_txt_list">14.您是否以游戏来逃避忧虑及困难?</div>
      <div class="he_txt_list">15.您是否犯罪或考虑犯罪，为游戏筹备资金?</div>
      <div class="he_txt_list">16.游戏有否令您有睡眠的困难?</div>
      <div class="he_txt_list">17.围绕您的争执、失望或挫败有否造成游戏的推动力?</div>
      <div class="he_txt_list">18.您是否为数小时的游戏而有冲动去庆祝好运?</div>
      <div class="he_txt_list">19.您是否因游戏的结果而自毁或自杀?</div>
      <div class="he_txt_list">20.若您对至少7个以上的问题的回答是‘是’，您可能在游戏上存在风险。</div>
    </div>
    
  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style lang='less' scoped>
@import './index.less';
</style>
