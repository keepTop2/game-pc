<template>
 <!-- <n-modal class="level_modal" v-model:show="showModal" preset="card">
    <template #header>
      <div class="level_title">{{ t('level_page_rule') }}</div>
    </template>-->
    <div class="level_content">
      <div class="level_rules">
        <div class="level_tip"> {{ t('level_page_pRule') }} </div>

        <div class="level_list">
          <n-flex justify="space-around" class="le_l_header">
            <span> {{ t('level_page_member') }} </span>
            <span> {{ t('level_page_pBet') }} </span>
            <span> {{ t('level_page_bonus') }} </span>
            <span> {{ t('level_page_monGift') }} </span>
            <span> {{ t('level_page_method') }} </span>
          </n-flex>
          <n-flex align="center" class="le_l_content">
            <div class="le_l_l le_l_l_sec">
              <n-flex justify="space-around" class="le_l_l_tr" v-for="(item, index) in ruleListData" :key="index">
                <span> {{ item.level }} </span>
                <span> {{ item.jsValidBet }} </span>
                <span> {{ item.jsGift || t('level_page_wu') }} </span>
                <span> {{ item.monthGift || t('level_page_wu') }} </span>
                <span> {{ item.type || t('level_page_wu') }} </span>
              </n-flex>
            </div>
          </n-flex>

        </div>

        <div class="level_tip_content">
          {{ t('level_page_rule_1') }}<br>
          {{ t('level_page_rule_2') }}<br>
          {{ t('level_page_rule_3') }}<br>
          {{ t('level_page_rule_4') }}<br>
          {{ t('level_page_rule_5') }}<br>
          {{ t('level_page_rule_6') }}
        </div>

        <div class="level_tip level_tip_sec"> {{ t('level_page_mAward') }} </div>
        <div class="level_list level_list_sec">
          <n-flex justify="space-around" class="le_l_header">
            <span> {{ t('level_page_member') }} </span>
            <span> {{ t('level_page_live') }} </span>
            <span> {{ t('home_page_slot') }} </span>
            <span> {{ t('home_page_sportsGame') }} </span>
            <span> {{ t('home_page_lotteryGame') }} </span>
            <span> {{ t('home_page_pokerGame') }} </span>
          </n-flex>
          <n-flex align="center" class="le_l_content">
            <div class="le_l_l le_l_l_sec">
              <n-flex justify="space-around" class="le_l_l_tr" v-for="(item, index) in ruleListData" :key="index">
                <span> {{ item.level }} </span>
                <span> {{ item.live }} </span>
                <span> {{ item.game }} </span>
                <span> {{ item.sport }} </span>
                <span> {{ item.lottery }} </span>
                <span> {{ item.chess }} </span>
              </n-flex>
            </div>
          </n-flex>

        </div>
        <div class="level_tip_content">
          {{ t('level_page_rule_sec_1') }}<br>
          {{ t('level_page_rule_sec_2') }}<br>
          {{ t('level_page_rule_sec_3') }}<br>
          {{ t('level_page_rule_sec_4') }}<br>
          {{ t('level_page_rule_sec_5') }}<br>
          {{ t('level_page_rule_sec_6') }}<br>
          {{ t('level_page_rule_sec_7') }}<br>
          {{ t('level_page_rule_sec_8') }}<br>
          {{ t('level_page_rule_sec_9') }}<br>
          {{ t('level_page_rule_sec_10') }}
        </div>



      </div>
    </div>
<!--  </n-modal>-->


</template>

<script setup lang='ts' name="levelRule">
import {ref} from 'vue';
import {useI18n} from "vue-i18n";

const { t } = useI18n();
// const showModal =  ref(false);

// const openModal = () => {
//   showModal.value = !showModal.value
// }

const ruleListData = ref(
  [
    { level: 'VIP1', jsValidBet: '-', bjValidBet: '', jsGift: '-', monthGift: '-', type: '', live: '0.4', game: '0.4', sport: '0.4', lottery: '0.4', chess: '0.4' },
    { level: 'VIP2', jsValidBet: '1,000.00', bjValidBet: '500.00', jsGift: '0.60', monthGift: '0.10', type: t('level_page_promo'), live: '0.5', game: '0.5', sport: '0.45', lottery: '0.5', chess: '0.45' },
    { level: 'VIP3', jsValidBet: '4,000.00', bjValidBet: '2,000.00', jsGift: '2.50', monthGift: '0.60', type: t('level_page_promo'), live: '0.55', game: '0.6', sport: '0.5', lottery: '0.6', chess: '0.5' },
    { level: 'VIP4', jsValidBet: '20,000.00', bjValidBet: '10,000.00', jsGift: '12.00', monthGift: '2.50', type: t('level_page_promo'), live: '0.6', game: '0.65', sport: '0.55', lottery: '0.65', chess: '0.55' },
    { level: 'VIP5', jsValidBet: '60,000.00', bjValidBet: '30,000.00', jsGift: '36.00', monthGift: '12.00', type: t('level_page_promo'), live: '0.65', game: '0.7', sport: '0.6', lottery: '0.7', chess: '0.6' },
    { level: 'VIP6', jsValidBet: '200,000.00', bjValidBet: '100,000.00', jsGift: '120.00', monthGift: '38.00', type: t('level_page_promo'), live: '0.7', game: '0.75', sport: '0.65', lottery: '0.75', chess: '0.7' },
    { level: 'VIP7', jsValidBet: '800,000.00', bjValidBet: '400,000.00', jsGift: '480.00', monthGift: '118.00', type: t('level_page_promo'), live: '0.75', game: '0.8', sport: '0.7', lottery: '0.8', chess: '0.8' },
    { level: 'VIP8', jsValidBet: '1,600,000.00', bjValidBet: '800,000.00', jsGift: '960.00', monthGift: '328.00', type: t('level_page_promo'), live: '0.8', game: '0.85', sport: '0.8', lottery: '0.85', chess: '0.85' },
    { level: 'VIP9', jsValidBet: '3,600,000.00', bjValidBet: '1,500,000.00', jsGift: '1800.00', monthGift: '688.00', type: t('level_page_promo'), live: '0.9', game: '0.9', sport: '0.9', lottery: '0.9', chess: '0.9' },
    { level: 'VIP10', jsValidBet: '12,600,000.00', bjValidBet: '6,500,000.00', jsGift: '7200.00', monthGift: '1688.00', type: t('level_page_promo'), live: '1', game: '1', sport: '1', lottery: '1', chess: '1' },
  ]
);

// defineExpose({
//   openModal
// });

</script>

<style lang='less' scoped>
.level_rules {
  color: #fff;
  font-size: 16px;
  padding: 0 6px;
  margin-top: 20px;

  .level_tip {
    margin-bottom: 5px;
    color: #A2A5DE;

    &.level_tip_sec {
      margin-top: 20px;
    }
  }

  .level_list {
    font-size: 14px;
    margin-bottom: 20px;

    .le_l_header {
      gap: 0 !important;
      position: relative;
      height: 65px;
      background: url(/img/level/headerBg.webp) center no-repeat;
      background-size: 100%;
      background-position-y: 15px;

      span {
        height: 50px;
        line-height: 80px;
        width: 20%;
        text-align: center;
      }
    }
    &.level_list_sec {
      .le_l_header {
        span {
          width: 16.66%;
        }
      }
    }

    .le_l_content {
      width: 99.5%;
      margin: 0 auto;
      border-radius: 0 0 8px 8px;
      background-color: #2f1d7d;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.39), 0 2px 2px 0 rgba(0, 0, 0, 0.34), 0 5px 3px 0 rgba(0, 0, 0, 0.2), 0 8px 3px 0 rgba(0, 0, 0, 0.06), 0 13px 3px 0 rgba(0, 0, 0, 0.01);

      .le_l_l {
        width: 75%;

        &.le_l_l_sec {
          width: 100%;
        }

        span {
          flex: 1;
          text-align: center;
        }

        .le_l_l_tr {

          &:nth-child(2n+1) {
            background: #27155c;
            color: #8e82c2;
          }

          &:nth-child(2n) {
            background: #2f1d7d;
          }

          span {
            height: 40px;
            line-height: 40px;
          }
        }

      }
    }

  }

  .level_tip_content {
    font-size: 16px;
    line-height: 30px;
  }

}
</style>
