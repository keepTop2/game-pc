<template>
  <div class="help_content_box">
    <div class="he_title">{{t('优惠活动如何申请？')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        登录账号-个人中心-我的优惠，进入优惠活动页面，选择相应的优惠活动。
      </div>
    </div>

    <div class="he_title">{{t('返水何时派发？')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        返水次日系统自动派发至【VIP特权】手动领取，只需一倍流水即可取款（不限游戏平台）, 返水比例请点击VIP详情页查看。
      </div>
    </div>

    <div class="he_title">{{t('优惠申请成功后一直没有收到红利或礼品怎么办？')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        如果您的优惠申请成功后没有在指定时间收到红利或礼品，您可以联系在线客服查询。
      </div>
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
