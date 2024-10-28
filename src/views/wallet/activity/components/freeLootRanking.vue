<template>
  <div class="freeLootRanking">
    <div class="theFirst">
      <div class="info">
        <div class="avatar">
          <Imgt
            :src="`/img/head_icons/${roleInfo.head_photo}.webp`"
            alt="/img/home/avatar.webp"
          />
        </div>
        <div class="accountNumber">
          <p>账号：{{ info.full_name }}</p>
          <p>
            今日排名：{{ props.freeTreasureInfo.rank === -1 ? '--' : props.freeTreasureInfo.rank === -1 }}</p>
        </div>
      </div>
      <div class="gold">
        <p>试玩金币</p>
        <div class="goldNumber">
          <Imgt src="/img/wallet/gold.svg" />
          <!--          <p>{{ freeLootRankingData.gold }}</p>-->
          <p>{{ props.freeTreasureInfo.score || 0 }}</p>
        </div>
      </div>
    </div>
    <div class="goldTab">
      <div class="header">
        <Imgt src="/img/wallet/goldRanking.svg" class="pointer" />
      </div>

      <div class="table">
        <div class="goldTableSelect">
          <n-select
            @update:value="selectRoundid"
            v-model:value="freeLootRankingData.roundid"
            :options="freeLootRankingData.roundidOptions"
          />
        </div>
        <n-data-table
          striped
          :bordered="false"
          virtual-scroll
          :max-height="500"
          :columns="freeLootRankingData.tableHeader"
          :data="freeLootRankingData.list"
        >
          <template #empty>
            <div class="nodata">
              <Imgt src="/img/wallet/nodata.webp" alt="nodata" />
              <div>{{ t('home_page_nomore_data') }}</div>
            </div>
          </template>
        </n-data-table>
        <n-button
          v-if="freeLootRankingData.list.length >= 50"
          @click="pushTableData"
          tertiary
          class="planButton"
        >
          点击加载更多
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { reactive, h, onMounted, onUnmounted } from 'vue';
import Imgt from '@/components/Imgt.vue';
import { User } from '@/store/user.ts';
import pinia from '@/store';
import { storeToRefs } from 'pinia';
import { NetPacket } from '@/netBase/NetPacket.ts';
import { Net } from '@/net/Net.ts';
import { MessageEvent2 } from '@/net/MessageEvent2.ts';
import { NetMsgType } from '@/netBase/NetMsgType.ts';

const { t } = useI18n();
const userInfo = User(pinia);
const { info } = storeToRefs(userInfo);

const UserStore = User(pinia);
const { roleInfo } = storeToRefs(UserStore);

const props = defineProps<{ freeTreasureInfo: any }>();

const freeLootRankingData: any = reactive({
  list: [],
  roundid: 0,
  roundidOptions: [],
  page: 1,
  pageSize: 50,
  tableHeader: [
    {
      title: '排名',
      width: 50,
      key: 'rank',
      render(row: any) {
        let hRender = h('span', { class: `rankingText`, innerHTML: row.rank });
        switch (row.rank) {
          case 1:
            hRender = h(Imgt, {
              src: '/img/wallet/gameTop1.png',
              class: `rankingImg`,
            });
            break;
          case 2:
            hRender = h(Imgt, {
              src: '/img/wallet/gameTop2.png',
              class: `rankingImg`,
            });
            break;
          case 3:
            hRender = h(Imgt, {
              src: '/img/wallet/gameTop3.png',
              class: `rankingImg`,
            });
            break;
          default:
            hRender = h('span', { class: `rankingText`, innerHTML: row.rank });
        }
        return hRender;
      },
    },
    {
      title: '头像',
      // width: 50,
      key: 'head_icon',
      render(row: any) {
        // /img/head_icons/${roleInfo.head_photo}.webp
        return h(Imgt, {
          src: `/img/head_icons/${row.head_icon}.webp`,
          class: `avatarImg avatarImg-${row.avatar}`,
        });
      },
    },
    { title: '昵称', key: 'username' },
    {
      title: '试玩金币',
      key: 'score',
      render(row: any) {
        return h('span', {
          class: 'yellowText',
          innerHTML: `试玩金币：<i>${row.score}</i>`,
        });
      },
    },
    {
      title: '本期奖励',
      key: 'reward',
      render(row: any) {
        return h('span', {
          class: 'yellowText',
          innerHTML: `奖励：<i>${row.reward}</i>`,
        });
      },
    },
  ],
});

const selectRoundid = (val: number) => {
  freeLootRankingData.page = 1;
  freeLootRankingData.roundid = val;
  freeTreasureHis();
};

const pushTableData = () => {
  freeLootRankingData.page = freeLootRankingData.page++;
  freeTreasureHis();
};

const handleGoldTable = (res: any) => {
  let data = res.info.splice(1, res.info.length);
  if (data.length === 1) return (freeLootRankingData.list = []);
  if (freeLootRankingData.page !== 1)
    return freeLootRankingData.list.push([...data]);
  freeLootRankingData.list = data;
};

// 30日
function getLast30Days(): { value: number; label: string }[] {
  const result: { value: number; label: string }[] = [];
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以加1
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}${month}${day}`; // 格式化为 YYYYMMDD
    result.push({ value: Number(formattedDate), label: `${formattedDate}期` });
  }

  return result;
}

const freeTreasureHis = () => {
  const req = NetPacket.req_free_treasure_his();
  req.page = freeLootRankingData.page;
  req.pageSize = freeLootRankingData.pageSize;
  req.roundid = freeLootRankingData.roundid;
  Net.instance.sendRequest(req);
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_free_treasure_his,
    handleGoldTable,
  );
};

onMounted(() => {
  freeLootRankingData.roundidOptions = [...getLast30Days()] as any;
  freeLootRankingData.roundid = getLast30Days()[0].value;
  freeTreasureHis();
});
onUnmounted(() => {
  MessageEvent2.removeMsgEvent(
    NetMsgType.msgType.msg_notify_free_treasure_his,
    null,
  );
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
    background: linear-gradient(94.51deg, #fa397e 0%, #ff852d 99.32%);
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

            .n-base-selection__border,
            .n-base-selection__state-border,
            .n-base-selection-label {
              border: none !important;
            }
          }
        }
      }

      :deep(.n-data-table-table) {
        background-color: rgba(27, 31, 75, 1);
        margin-bottom: 16px;
        .n-data-table-thead {
          background-color: rgba(27, 31, 75, 1);
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
        border-bottom:1px solid rgba(38, 41, 76, 1);
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
            //white-space: nowrap;
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

      :deep(.n-data-table .n-data-table-tr.n-data-table-tr--striped.n-data-table-td ) {
        background-color: rgba(13, 14, 46, 1) !important;
      }

      .planButton {
        width: 100%;
        background-image: none;
        //background-color: rgba(51, 56, 107, 1);
        border: 1px solid rgba(51, 56, 107, 1);
        margin: 0 0 30px;
        color: rgba(51, 56, 107, 1);
        font-size: 12px;
      }
    }
  }
}
</style>
