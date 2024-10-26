<template>
  <div class="help_content_box">
    <div class="he_title">{{t('help_page_promo_1')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_promo_2')}}
      </div>
    </div>

    <div class="he_title">{{t('help_page_promo_3')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_promo_4')}}
      </div>
    </div>

    <div class="he_title">{{t('help_page_promo_5')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_promo_6')}}
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
