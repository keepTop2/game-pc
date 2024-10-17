<template>
  <!-- <n-modal class="level_modal" v-model:show="showModal" preset="card">
    <template #header>
      <div class="level_title">{{ t('level_page_rule') }}</div>
    </template>-->
  <div class="level_content">
    <div class="level_rules">
      <div class="level_tip"><span class="f">{{ t('level_page_rule') }}</span> <span class="b">| {{ t('level_page_pRule') }}</span></div>

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
            <n-flex justify="space-around" class="le_l_l_tr" v-for="(item, index) in vipLevelRewardConfig" :key="index">
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
            <n-flex justify="space-around" class="le_l_l_tr" v-for="(item, index) in vipLevelRewardConfig" :key="index">
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
        <span>{{ t('level_page_rule_sec_7') }}</span><br>
        <span>{{ t('level_page_rule_sec_8') }}</span><br>
        <span>{{ t('level_page_rule_sec_9') }}</span><br>
        <span>{{ t('level_page_rule_sec_10') }}</span>
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
@timestamp: `new Date().getTime()`;

.level_rules {
  color: #fff;
  font-size: 16px;
  padding: 0 6px;
  margin-top: 20px;

  .level_tip {
    margin-bottom: 5px;
    font-weight: 500;
    .f {
      color: #fff;
      font-size: 20px;
    }
    .b {
      color: #AEAEB0;
      font-size: 14px;
    }

    &.level_tip_sec {
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: 600;
    }
  }

  .level_list {
    font-size: 14px;
    margin-bottom: 20px;
    border-radius: 10px;

    .le_l_header {
      position: relative;
      height: 40px;
      border-radius: 10px 10px 0px 0px;
      border: 1px solid #26294C;
      background: #1B1F4B;

      span {
        height: 40px;
        line-height: 40px;
        flex: 1;
        text-align: center;
        border-right: 1px solid #26294C;
        border-bottom: 1px solid #26294C;
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
      width: 100%;
      margin: 0 auto;
      border-radius: 0 0 10px 10px;

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
            background: #14173A;
            color: #AEAEB0;
            border-bottom: 1px solid #26294C;
          }

          &:nth-child(2n) {
            background: #0D0E2E;
            color: #AEAEB0;
            border-bottom: 1px solid #26294C;
          }

          &:last-child {
            border-radius: 0 0 10px 10px;
          }

          span {
            height: 40px;
            line-height: 40px;
            border-right: 1px solid #26294C;
            border-bottom: 1px solid #26294C;
          }
        }

      }
    }

  }

  .level_tip_content {
    font-size: 16px;
    line-height: 35px;
    margin: 40px 0;

    span {
      display: inline-block;
      text-indent: 20px;
    }
  }

}
</style>
