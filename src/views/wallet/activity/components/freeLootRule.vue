<template>
  <div class="freeLootRule">
    <div class="activity intro">
      <p>{{t('free_loot_rule_events')}}</p>
      <p>{{t('free_loot_rule_events_text')}}</p>
    </div>
    <div class="ranking intro">
      <p>{{t('free_loot_rule_ranking')}}</p>
      <p>{{t('free_loot_rule_ranking_text')}}</p>
    </div>
    <div class="award intro">
      <p>{{t('free_loot_rule_flow')}}</p>
      <p>{{t('free_loot_rule_flow_text')}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">


import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped lang="less">
.freeLootRule {
  padding-top: 20px;
  .intro {
    margin-bottom: 20px;
    p:nth-of-type(1) {
      text-align: center;
      font-size: 16px;
      font-weight: 400;
    }
    p:nth-of-type(2) {
      font-size: 16px;
      color: rgba(175, 186, 189, 1);
    }
  }
}
</style>
