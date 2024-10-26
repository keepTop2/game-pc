<template>
  <div class="help_content_box">
    <div class="he_title">{{t('help_page_privacy')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_privacy_1')}}
      </div>
    </div>

    <div class="he_title">{{t('help_page_privacy_2')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
       {{t('help_page_privacy_3')}}
      </div>
    </div>

    <div class="he_title">{{t('help_page_privacy_4')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{ t('help_page_privacy_5') }}
      </div>
    </div>

    <div class="he_title">{{t('help_page_privacy_6')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_privacy_7')}}
      </div>
    </div>

    <div class="he_title">{{t('help_page_privacy_8')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_privacy_9')}}
      </div>
    </div>

    <div class="he_title">{{t('help_page_privacy_10')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_privacy_11')}}
      </div>
    </div>

    <div class="he_title">{{t('help_page_privacy_12')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_privacy_13')}}
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
