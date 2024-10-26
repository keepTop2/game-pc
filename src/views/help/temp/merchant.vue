<template>
  <div class="help_content_box">
    <div class="he_title">{{t('help_page_merchant')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">{{ t('help_page_merchant_1') }}</div>
      <div class="he_img">
        <n-flex class="he_img_list">
          <Imgt :src="`/img/help/merchant_1.webp`" />
          <Imgt :src="`/img/help/merchant_2.webp`" />
          <Imgt :src="`/img/help/merchant_3.webp`" />
          <Imgt :src="`/img/help/merchant_4.webp`" />
          <Imgt :src="`/img/help/merchant_5.webp`" />
        </n-flex>
      </div>
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
