<template>
  <!-- <n-modal class="level_modal" v-model:show="showModal" preset="card">
    <template #header>
      <div class="level_title">{{ t('level_page_rule') }}</div>
    </template>-->
  <div class="level_content">
    <div class="level_rules">
      <div class="level_tip"> {{ t('level_page_pRule') }}</div>

      <div class="level_list">
        <n-flex justify="space-around" class="le_l_header">
          <span> {{ t('level_page_member') }} </span>
          <span> {{ t('level_page_pBet') }} </span>
          <span> {{ t('level_page_bonus') }} </span>
          <span> {{ t('level_page_monGift') }} </span>
          <!--          <span> {{ t('level_page_method') }} </span>-->
        </n-flex>
        <n-flex align="center" class="le_l_content">
          <div class="le_l_l le_l_l_sec">
            <n-flex justify="space-around" class="le_l_l_tr"
                    v-for="(item, index) in vipLevelRewardConfig" :key="index">
              <span> {{ item.level }} </span>
              <span> {{ verifyNumberComma(String(item.target_bet_money)) }} </span>
              <span> {{ verifyNumberComma(String(item.promotional_reward_status.money)) || '0' }} </span>
              <span> {{ verifyNumberComma(String(item.gift_money_amount)) || '0' }} </span>
              <!--              <span> {{ item.target_bet_money ? t('level_page_promo') : t('level_page_wu') }} </span>-->
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

      <div class="level_tip level_tip_sec"> {{ t('level_page_mAward') }}</div>
      <div class="level_list level_list_sec">
        <n-flex justify="space-around" class="le_l_header">
          <span> {{ t('level_page_member') }} </span>
          <span> {{ t('level_page_live') }} </span>
          <span> {{ t('home_page_slot') }} </span>
          <span> {{ t('home_page_sportsGame') }} </span>
          <span> {{ t('home_page_lotteryGame') }} </span>
          <span> {{ t('home_page_pokerGame') }} </span>
          <span> {{ t('home_page_eSports') }} </span>
        </n-flex>
        <n-flex align="center" class="le_l_content">
          <div class="le_l_l le_l_l_sec">
            <n-flex justify="space-around" class="le_l_l_tr"
                    v-for="(item, index) in vipLevelRewardConfig" :key="index">
              <span> VIP{{ item.level }} </span>
              <template v-for="(item_1) in item.ratio.split(',')">
                <span> {{ toFixedNumber(Number(item_1) * 100) + '%' }} </span>
              </template>
            </n-flex>
          </div>
        </n-flex>

      </div>
      <div class="level_tip_content">
        {{ t('level_page_rule_sec_1') }}<br>
        {{ t('level_page_rule_sec_2') }}<br>
        <span>{{ t('level_page_rule_sec_3') }}</span><br>
        <span>{{ t('level_page_rule_sec_4') }}</span><br>
        <span>{{ t('level_page_rule_sec_5') }}</span><br>
        {{ t('level_page_rule_sec_6') }}<br>
        {{ t('level_page_rule_sec_7') }}<br>
        <span>{{ t('level_page_rule_sec_8') }}</span><br>
        {{ t('level_page_rule_sec_9') }}<br>
        {{ t('level_page_rule_sec_10') }}
      </div>
    </div>
  </div>
  <!--  </n-modal>-->


</template>

<script setup lang='ts' name="levelRule">
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import pinia from '@/store';
import { User } from '@/store/user';
import { storeToRefs } from 'pinia';
import { toFixedNumber, verifyNumberComma } from '@/utils/others';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';

const { t } = useI18n();
// const showModal =  ref(false);
const UserStore = User(pinia);
const { VIPinfo } = storeToRefs(UserStore);
const baseVipLevelRewardConfig = [ // 基本数据
  {
    'level': 1,
    'target_bet_money': 0,
    'promotional_reward_status': {
      'status': 0,
      'money': 0,
    },
    'gift_money_amount': 0,
    'ratio': '0.004, 0.006, 0.004, 0.0005, 0.006, 0.004',
  },
];
const vipLevelRewardConfig = ref(VIPinfo.value?.vip_level_reward_config || [...baseVipLevelRewardConfig]);

// 获取等级数据
const queryData = () => {
  const query = NetPacket.req_vip_info();
  Net.instance.sendRequest(query);
};
onMounted(() => {
  queryData();
});
watch(
  () => VIPinfo.value,
  (n) => {
    if (n) {
      vipLevelRewardConfig.value = n.vip_level_reward_config;
    }
  },
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
        flex: 1;
        text-align: center;
      }
    }

    &.level_list_sec {
      .le_l_header {
        span {
          flex: 1;
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

    span {
      display: inline-block;
      text-indent: 20px;
    }
  }

}
</style>
