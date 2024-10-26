<template>
  <div class="help_content_box">
    <div class="he_title">{{t('help_page_termsRule')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_rule_txt_1') }}
      </div>
    </div>

    <div class="he_title">{{t('help_page_rule_dy')}}</div>
    <div class="he_txt">
      <div class="he_txt_list" v-for="(item) in Array.from({ length: 8 }, (_, index) => index + 1)" :key="item">
        {{ t(`help_page_rule_${item}`) }}
      </div>
    </div>

    <div class="he_title">{{t('help_page_rule_tj')}}</div>
    <div class="he_txt">
      <div class="he_txt_list" v-for="(item) in Array.from({ length: 7 }, (_, index) => index + 1)" :key="item">
        {{ t(`help_page_rule_tj_${item}`) }}
      </div>
    </div>

    <div class="he_title">{{t('help_page_rule_js')}}</div>
    <div class="he_txt">
      <div class="he_txt_list" v-for="(item) in Array.from({ length: 5 }, (_, index) => index + 1)" :key="item">
        {{ t(`help_page_rule_js_${item}`) }}
      </div>
    </div>

    <div class="he_title">{{t('help_page_rule_lqcj')}}</div>
    <div class="he_txt">
      <div class="he_txt_list"> {{t('help_page_rule_lqcj_1')}}</div>
      <div class="he_txt_list">{{t('help_page_rule_lqcj_2')}} </div>
    </div>

    <div class="he_title">{{t('help_page_rule_cx')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_rule_cx_1')}}
      </div>
      <div class="he_txt_list">
        {{t('help_page_rule_cx_2')}}
      </div>
    </div>

    <div class="he_title">{{t('help_page_rule_pc')}}</div>
    <div class="he_txt">
      <div class="he_txt_list">
        {{t('help_page_rule_pc_1')}}
      </div>
    </div>

    <div class="he_title">{{t('help_page_rule_mz')}}</div>
    <div class="he_txt">
      <div class="he_txt_list" v-for="(item) in Array.from({ length: 9 }, (_, index) => index + 1)" :key="item">
        {{ t(`help_page_rule_mz_${item}`) }}
      </div>
    </div>

    <div class="he_title">{{t('help_page_rule_stop')}}</div>
    <div class="he_txt">
      <div class="he_txt_list"> {{t('help_page_rule_stop_1')}} </div>
      <div class="he_txt_list_1" v-for="(item) in Array.from({ length: 13 }, (_, index) => index + 1)" :key="item">
        {{ t(`help_page_rule_stop_1_${item}`) }}
      </div>

      <div class="he_txt_list">{{t('help_page_rule_stop_2')}}</div>
      <div class="he_txt_list">{{ t('help_page_rule_stop_3') }}</div>
      <div class="he_txt_list_1">{{t('help_page_rule_stop_3_1')}}</div>
      <div class="he_txt_list_1">{{t('help_page_rule_stop_3_2')}} </div>
      <div class="he_txt_list_1">{{t('help_page_rule_stop_3_3')}} </div>
      <div class="he_txt_list_1">{{t('help_page_rule_stop_3_4')}} </div>
      <div class="he_txt_list">{{t('help_page_rule_stop_ylj')}}</div>
      <div class="he_txt_list">{{t('help_page_rule_stop_bdylj')}}</div>
      <div class="he_txt_list">{{ t('help_page_rule_stop_zjzd') }}</div>
      <div class="he_txt_list">{{t('help_page_rule_stop_bl')}}</div>
      <div class="he_title_sec">{{ t('help_page_rule_stop_wf') }}</div>
      <div class="he_txt_list">{{t('help_page_rule_stop_wftl')}}</div>
      <div class="he_txt_list">{{ t('help_page_rule_stop_yxsx') }}</div>
      <div class="he_txt_list">{{t('help_page_rule_stop_yxgz')}}</div>
      <div class="he_txt_list">{{t('help_page_rule_stop_gzwz')}}</div>
      <div class="he_title_sec">{{t('help_page_rule_stop_bkkj')}}</div>
      <div class="he_txt_list">{{t('help_page_rule_stop_bkkj_tip')}}</div>
      <div class="he_title_sec">{{t('help_page_rule_stop_qq')}}</div>
      <div class="he_txt_list">{{t('help_page_rule_stop_qq_tip')}}</div>
      <div class="he_title_sec">{{t('help_page_rule_stop_fg')}}</div>
      <div class="he_txt_list">{{t('help_page_rule_stop_fg_tip')}}</div>
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
