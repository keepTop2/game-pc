<template>
  <div class="help_content_box">
    <div class="he_txt">
      <div class="he_txt_list" v-for="(item) in Array.from({ length: 5 }, (_, index) => index + 1)" :key="item">
        {{ t(`help_page_policy_${item}`) }}
      </div>

      <div class="he_txt_list_1" v-for="(item) in Array.from({ length: 5 }, (_, index) => index + 1)" :key="item">
        {{ t(`help_page_policy_5_${item}`) }}
      </div>

      <div class="he_txt_list">{{ t('help_page_policy_6') }}</div>

      <div class="he_txt_list_1">{{ t('help_page_policy_6_1') }}</div>

      <div class="he_txt_list_1">{{ t('help_page_policy_6_2') }}</div>

      <div class="he_txt_list_1">{{ t('help_page_policy_6_3') }}</div>

      <div class="he_txt_list_1">{{ t('help_page_policy_7') }}</div>

      <div class="he_txt_list_1" v-for="(item) in Array.from({ length: 7 }, (_, index) => index + 1)" :key="item">
        {{ t(`help_page_policy_7_${item}`) }}
      </div>

      <div class="he_txt_list">{{t('help_page_policy_8')}}</div>

      <div class="he_txt_list">{{t('help_page_policy_9')}}</div>

      <div class="he_txt_list">{{t('help_page_policy_10')}}</div>

      <div class="he_txt_list">{{t('help_page_policy_11')}}</div>

      <div class="he_txt_list">{{t('help_page_policy_12')}}</div>

      <div class="he_txt_list_1" v-for="(item) in Array.from({ length: 5 }, (_, index) => index + 1)" :key="item">
        {{ t(`help_page_policy_12_${item}`) }}
      </div>



      <div class="he_txt_list">{{ t('help_page_policy_13') }}</div>

      <div class="he_txt_list">{{ t('help_page_policy_14') }}</div>

      <div class="he_txt_list">{{ t('help_page_policy_15') }}</div>

    </div>

  </div>
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style lang='less' scoped>
@import './index.less';
.he_txt_list, .he_txt_list_1 {
  margin-bottom: 15px;
}
</style>
