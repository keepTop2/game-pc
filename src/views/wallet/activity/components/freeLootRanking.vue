<template>
  <div class="freeLootRanking">
    <div class="theFirst">
      <div class="info">
        <div class="avatar">
          <Imgt :src="freeLootRankingData.avatar" />
        </div>
        <div class="accountNumber">
          <p>账号：{{ freeLootRankingData.accountNumber }}</p>
          <p>今日排名：{{ freeLootRankingData.ranking }}</p>
        </div>

      </div>
      <div class="gold">
        <p>试玩金币</p>
        <div class="goldNumber">
          <Imgt src="/img/wallet/gold.svg" />
          <p>{{ freeLootRankingData.gold }}</p>
        </div>
      </div>
    </div>
    <div class="goldTab">
      <div class="header">
        <Imgt src="/img/wallet/goldRanking.svg" class="pointer" />
      </div>

      <div class="table">
        <n-data-table striped :bordered="false"  :columns="freeLootRankingData.tableHeader" :data="freeLootRankingData.list">
          <template #empty>
            <div class="nodata">
              <Imgt src="/img/wallet/nodata.webp" alt="nodata" />
              <div>{{ t('home_page_nomore_data') }}</div>
            </div>
          </template>
        </n-data-table>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import { useI18n } from 'vue-i18n';

const { t } = useI18n();
import { reactive, ref, h } from 'vue';
import Imgt from '@/components/Imgt.vue';
import { PlatformValueMap } from '@/enums/walletEnum.ts';
import { convertObjectToDateString } from '@/utils/dateTime.ts';


const loading = ref(false);

const freeLootRankingData = reactive({
  avatar: '/img/header/avatar.webp',
  accountNumber: 'Kkktey09120',
  ranking: '1000+',
  gold: '991,000.00',
  list: [
    { avatar: '1', img: '', name: '六字昵称星星', gold: '试玩金币：100W', award: '奖励：3,000' },
    { avatar: '2', img: '', name: '六字昵称星星', gold: '试玩金币：100W', award: '奖励：3,000' },
    { avatar: '3', img: '', name: '六字昵称星星', gold: '试玩金币：100W', award: '奖励：3,000' },
    { avatar: '4', img: '', name: '六字昵称星星', gold: '试玩金币：100W', award: '奖励：3,000' },
    { avatar: '5', img: '', name: '六字昵称星星', gold: '试玩金币：100W', award: '奖励：3,000' },
    { avatar: '6', img: '', name: '六字昵称星星', gold: '试玩金币：100W', award: '奖励：3,000' },
    { avatar: '7', img: '', name: '六字昵称星星', gold: '试玩金币：100W', award: '奖励：3,000' },
    { avatar: '8', img: '', name: '六字昵称星星', gold: '试玩金币：100W', award: '奖励：3,000' },
    { avatar: '9', img: '', name: '六字昵称星星', gold: '试玩金币：100W', award: '奖励：3,000' },
    { avatar: '10', img: '', name: '六字昵称星星', gold: '试玩金币：100W', award: '奖励：3,000' },
  ],
  tableHeader: [
    { title: '排名', key: 'avatar' },
    { title: '头像', key: 'img' },
    { title: '昵称', key: 'name' },
    { title: '试玩金币', key: 'gold' },
    { title: '本期奖励', key: 'award' },
  ],
});


</script>

<style scoped lang="less">
.freeLootRanking {
  padding-top: 20px;

  .theFirst {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 96px;
    padding: 0 30px;
    background: linear-gradient(94.51deg, #FA397E 0%, #FF852D 99.32%);
    border-radius: 12px;

    p {
      margin: 0;
    }

    .info {
      display: flex;
      align-items: center;

      .avatar {
        margin-right: 10px;

        > img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
      }

      .accountNumber {
        font-size: 18px;

        > p:nth-of-type(2) {
          font-size: 14px;
        }
      }
    }

    .gold {
      display: flex;
      flex-direction: column;
      align-items: center;

      > p {
        font-size: 18px;
        font-family: PingFangSC;
        margin-bottom: 4px;
      }

      .goldNumber {
        display: flex;
        align-items: center;
        border-radius: 12px;
        padding-right: 6px;
        background-color: rgba(0, 0, 0, 0.3);

        img {
          width: 18px;
          height: 18px;
        }

        p {
          font-size: 14px;
          font-family: PingFangSC;
        }
      }
    }


  }

  .goldTab {
    margin-top: 25px;
    background-color: rgba(23, 27, 68, 1);
    border: 1px solid rgba(38, 41, 76, 1);
    border-radius: 8px;

    .header {
      display: flex;
      justify-content: center;

      > img {
        width: 214px;
        height: 32px;
        margin-top: -6px;
      }
    }

    .table {
      padding: 25px 20px 0;
      :deep .n-data-table-thead > tr > th {
        color: rgba(175, 186, 189, 1);
        border-bottom: rgba(38, 41, 76, 1);
        background-color: rgba(27, 31, 75, 1) !important;
        //border: 1px solid rgba(38, 41, 76, 1) !important;
      }
      :deep .n-data-table .n-data-table-td{
        color: rgba(175, 186, 189, 1) !important;
        border-bottom: rgba(38, 41, 76, 1);
        background-color: rgba(18, 19, 54, 1) !important;
      }
      :deep .n-data-table .n-data-table-tr.n-data-table-tr--striped .n-data-table-td{
        background-color: rgba(13, 14, 46, 1) !important;
      }

    }
  }
}
</style>
