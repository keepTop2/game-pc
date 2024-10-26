<template>
  <div class="help_content_box">
    <div class="he_title">{{t('help_page_depositT1')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">{{ t('help_page_deposit_txt_1') }}<span class="txt_link">{{ t('help_page_deposit_txt_2') }}</span>{{ t('help_page_deposit_txt_3') }}</div>
      <div class="he_txt_list">{{ t('help_page_deposit_txt_4') }}</div>
      <div class="he_txt_list">{{ t('help_page_deposit_txt_5') }}</div>
      <div class="he_img">
        <Imgt :src="`/img/help/helpDeposit.webp`" />
      </div>
    </div>

    <div class="he_txt">
      <div class="he_txt_list">{{ t('help_page_deposit_txt_6') }}</div>
    </div>

  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n';
import Imgt from '@/components/Imgt.vue';
const { t } = useI18n();
</script>

<style lang='less' scoped>
@import './index.less';
</style>
