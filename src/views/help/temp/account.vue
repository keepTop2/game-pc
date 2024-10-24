<template>
  <div class="help_content_box">
    <div class="he_title">{{t('help_page_howOpen')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{ t('help_page_clickReg') }}
      </div>
      <div class="he_txt_list">
        {{ t('help_page_accountRule') }}
      </div>
    </div>

    <div class="he_title">{{t('help_page_forgotName')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_online') }}
      </div>
    </div>

    <div class="he_title">{{t('help_page_forgotPwd')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{ t('help_page_clickPwd') }}
      </div>
    </div>

    <div class="he_title">{{t('help_page_chgInfo')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{ t('help_page_forgotInfo') }}
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
