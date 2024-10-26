<template>
  <div class="help_content_box">
    <div class="he_title">{{t('help_page_withdrawT1')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{ t('help_page_withdraw_txt_1') }}
      </div>
      <div class="he_img">
        <Imgt :src="`/img/help/helpWithdraw.webp`" />
      </div>
    </div>

    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_withdraw_txt_2') }}
      </div>
      <div class="he_txt_list"> {{t('help_page_withdraw_txt_3') }}</div>
      <div class="he_txt_list"> {{t('help_page_withdraw_txt_4') }}</div>
      <div class="he_txt_list"> {{t('help_page_withdraw_txt_5') }}</div>
    </div>

    <div class="he_title">{{t('help_page_withdraw_txt_6')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_withdraw_txt_7') }}
      </div>
    </div>

    <div class="he_title">{{t('help_page_withdraw_txt_8')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">{{t('help_page_withdraw_tip_1')}}</div>
      <div class="he_txt_list">{{t('help_page_withdraw_tip_2')}}</div>
      <div class="he_txt_list">{{t('help_page_withdraw_tip_3')}}</div>
    </div>

    <div class="he_title">{{t('help_page_withdraw_txt_9')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_withdraw_txt_10') }}
      </div>
    </div>

    <div class="he_title">{{t('help_page_withdraw_txt_11')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_withdraw_txt_12') }}
      </div>
    </div>

    <div class="he_title">{{t('help_page_withdraw_txt_13')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_withdraw_txt_14') }}
      </div>
      <div class="he_txt_list">
        {{t('help_page_withdraw_txt_15') }}
      </div>
    </div>

    <div class="he_title">{{t('help_page_withdraw_txt_16')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_withdraw_txt_17') }}
      </div>
    </div>

    <div class="he_title">{{t('help_page_withdraw_txt_18')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_withdraw_txt_19') }}
      </div>
    </div>

    <div class="he_title">{{t('help_page_withdraw_txt_20')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_withdraw_txt_21') }}
      </div>
      <div class="he_txt_list">
        {{t('help_page_withdraw_txt_22') }}
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
