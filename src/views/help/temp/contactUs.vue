<template>
  <div class="help_content_box">
    <div class="he_title">{{t('help_page_contact7')}}<span class="txt_link">{{ t('home_page_onlineService') }}</span></div>
    <div class="he_txt">
      <div class="he_txt_list">{{ t('help_page_contactUs') }}</div>
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
