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
        <div class="goldTableSelect">
          <n-select v-model:value="goldData" :options="goldOptions" />
        </div>
        <n-data-table striped :bordered="false" virtual-scroll :max-height="500" :columns="freeLootRankingData.tableHeader"
                      :data="freeLootRankingData.list">
          <template #empty>
            <div class="nodata">
              <Imgt src="/img/wallet/nodata.webp" alt="nodata" />
              <div>{{ t('home_page_nomore_data') }}</div>
            </div>
          </template>
        </n-data-table>
        <n-button @click="pushTableData" tertiary class="planButton">
          点击加载更多
        </n-button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import { useI18n } from 'vue-i18n';

const { t } = useI18n();
import { reactive, ref, h } from 'vue';
import Imgt from '@/components/Imgt.vue';

const freeLootRankingData = reactive({
  avatar: '/img/header/avatar.webp',
  accountNumber: 'Kkktey09120',
  ranking: '1000+',
  gold: '991,000.00',
  list: [
    {
      avatar: '1',
      img: '/img/head_icons/1003.webp',
      name: '六字昵称星星',
      gold: '100W',
      award: '3,000',
    },
    {
      avatar: '2',
      img: '/img/head_icons/1003.webp',
      name: '六字昵称星星',
      gold: '100W',
      award: '3,000',
    },
    {
      avatar: '3',
      img: '/img/head_icons/1003.webp',
      name: '六字昵称星星',
      gold: '100W',
      award: '3,000',
    },
    {
      avatar: '4',
      img: '/img/head_icons/1003.webp',
      name: '六字昵称星星',
      gold: '100W',
      award: '3,000',
    },
    {
      avatar: '5',
      img: '/img/head_icons/1003.webp',
      name: '六字昵称星星',
      gold: '100W',
      award: '3,000',
    },
    {
      avatar: '6',
      img: '/img/head_icons/1003.webp',
      name: '六字昵称星星',
      gold: '100W',
      award: '3,000',
    },
    {
      avatar: '7',
      img: '/img/head_icons/1003.webp',
      name: '六字昵称星星',
      gold: '100W',
      award: '3,000',
    },
    {
      avatar: '8',
      img: '/img/head_icons/1003.webp',
      name: '六字昵称星星',
      gold: '100W',
      award: '3,000',
    },
    {
      avatar: '9',
      img: '/img/head_icons/1003.webp',
      name: '六字昵称星星',
      gold: '100W',
      award: '3,000',
    },
    {
      avatar: '10',
      img: '/img/head_icons/1003.webp',
      name: '六字昵称星星',
      gold: '100W',
      award: '3,000',
    },
  ],
  tableHeader: [
    {
      title: '排名', key: 'avatar',
      render(row: any) {
        let hRender = h('span', { class: `rankingText`, innerHTML: row.avatar });
        switch (row.avatar) {
          case '1' :
            hRender = h(Imgt, { src: '/img/wallet/gameTop1.png', class: `rankingImg` });
            break;
          case '2' :
            hRender = h(Imgt, { src: '/img/wallet/gameTop2.png', class: `rankingImg` });
            break;
          case '3' :
            hRender = h(Imgt, { src: '/img/wallet/gameTop3.png', class: `rankingImg` });
            break;
          default:
            hRender = h('span', { class: `rankingText`, innerHTML: row.avatar });
        }
        return hRender;
      },
    },
    {
      title: '头像', key: 'img',
      render(row: any) {
        return h(Imgt, { src: row.img, class: `avatarImg avatarImg-${row.avatar}` });
      },
    },
    { title: '昵称', key: 'name' },
    {
      title: '试玩金币', key: 'gold',
      render(row: any) {
        return h('span', { class: 'yellowText', innerHTML: `试玩金币：<i>${row.gold}</i>` });
      },
    },
    {
      title: '本期奖励', key: 'award',
      render(row: any) {
        return h('span', { class: 'yellowText', innerHTML: `奖励：<i>${row.award}</i>` });
      },
    },
  ],
});

const goldData = ref('20240101第1期');
const goldOptions = ref([
  {
    label: '20240101第1期',
    value: '20240101第1期',
  },
  {
    label: '20240101第2期',
    value: '20240101第2期',
  },
  {
    label: '20240101第3期',
    value: '20240101第3期',
  },
]);


const pushTableData = () => {
  let data = [{
    avatar: '6',
    img: '/img/head_icons/1003.webp',
    name: '六字昵称星星',
    gold: '100W',
    award: '3,000',
  },
    {
      avatar: '7',
      img: '/img/head_icons/1003.webp',
      name: '六字昵称星星',
      gold: '100W',
      award: '3,000',
    },
    {
      avatar: '8',
      img: '/img/head_icons/1003.webp',
      name: '六字昵称星星',
      gold: '100W',
      award: '3,000',
    }];
  freeLootRankingData.list.push(...data);
};

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

      .goldTableSelect {
        display: flex;
        justify-content: end;
        margin-bottom: 10px;

        .n-select {
          width: 200px;
          .n-data-table-base-table {
            background-color: transparent;
          }
          :deep(.n-base-selection) {
            border: 1px solid rgba(23, 27, 68, 1) !important;
            .n-base-selection__border, .n-base-selection__state-border, .n-base-selection-label {
              border: none !important;
            }
          }

        }

      }

      :deep(.n-data-table-thead > tr > th) {
        text-align: center;
        color: rgba(175, 186, 189, 1);
        border-bottom: rgba(38, 41, 76, 1);
        background-color: rgba(27, 31, 75, 1) !important;
        //border: 1px solid rgba(38, 41, 76, 1) !important;
      }

      :deep(.n-data-table .n-data-table-td) {
        color: rgba(175, 186, 189, 1) !important;
        border-bottom: rgba(38, 41, 76, 1);
        background-color: rgba(18, 19, 54, 1) !important;
        text-align: center;
        text-align: -webkit-center;

        .rankingImg {
          display: block;
          text-align: center;
          width: 38px;
          height: 24px;
        }

        .rankingText {
          display: block;
          text-align: center;
        }

        .yellowText {
          //display: flex;
          //flex-wrap: nowrap;
          white-space: nowrap;
          i {
            white-space: nowrap;
            font-style: normal;
            color: rgba(250, 201, 4, 1);
          }
        }

        .avatarImg {
          width: 24px;
          height: 24px;
          vertical-align: middle;
        }

        .avatarImg-1 {
          border: 2px solid rgba(250, 188, 85, 1);
          border-radius: 50%;
        }

        .avatarImg-2 {
          border: 2px solid rgba(211, 231, 236, 1);
          border-radius: 50%;
        }

        .avatarImg-3 {
          border: 2px solid rgba(239, 153, 98, 1);
          border-radius: 50%;
        }
      }

      :deep(.n-data-table .n-data-table-tr.n-data-table-tr--striped .n-data-table-td) {
        background-color: rgba(13, 14, 46, 1) !important;
      }

      .planButton {
        width: 100%;
        background-image: none;
        //background-color: rgba(51, 56, 107, 1);
        border: 1px solid rgba(51, 56, 107, 1);
        margin: 16px 0 30px;
        color: rgba(51, 56, 107, 1);
        font-size: 12px;
      }
    }
  }
}
</style>
