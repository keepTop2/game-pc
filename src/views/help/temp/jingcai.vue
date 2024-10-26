<template>
  <div class="help_content_box">
    <div class="he_title">{{t('help_page_jc_responsibility')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_jc_title_1') }}
      </div>
    </div>

    <div class="he_title">{{t('help_page_jc_title_2')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_jc_title_3')}}
      </div>
    </div>

    <div class="he_title">{{t('help_page_jc_title_4')}}</div>
    <div class="he_txt">
      <div class="he_txt_list he_txt_list_sec">
       {{t('help_page_jc_title_5')}}
      </div>
      <div class="he_txt_list" v-for="(item) in Array.from({ length: 20 }, (_, index) => index + 1)" :key="item">
        {{ t(`help_page_jc_tips_${item}`) }}
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
