<template>
  <n-flex vertical class="promo_info record_page">
    <!-- 导航 -->
    <navTab :title="t('deposit_page_discount')" />

    <n-flex align="center" class="tab_top">
      <a :class="`tab_item tab_item_${item.key} ${curTab === item.key ? 'active' : ''}`" v-for="(item, index) in tabArr"
        :key="index" @click="clickTab(item.key)">
        <n-badge v-show="item.hasCount && needShowCount.includes(item.key)" :value="item.hasCount" dot />
        {{ t(item.title) }}
      </a>
    </n-flex>
    <n-spin :show="loading">
      <div class="promo_list">
        <div :class="`list_item ${(item.volume || item.award) ? 'list_item_b' : ''}`"
          v-for="(item, index) in listData.list" :key="index">
          <n-flex justify="space-between" class="item_top">
            <div class="item_l">
              <!--              <span v-if="('1,2,3,4,5').includes(item.have_save)" class="item_name"> {{ t('promo_page_fuHuo') }} </span>-->
              <span class="item_name"> {{ tabArr.find((item_1: any) => item_1.key == item.tag) ?
                t(tabArr.find((item_1: any) => item_1.key == item.tag)?.title) : '-' }} </span>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <span class="item_title"> {{ item.name ? t(item.name) : '-' }} </span>
                </template>
                {{ t(item.name) }}
              </n-tooltip>

            </div>
            <div class="item_r">
              <!--              <n-button v-if="('1,2,3,4,5').includes(item.have_save)" :disabled="('1,2').includes(item.have_save)"
                :bordered="false" class="lq-btn" @click="applyBouns(item)">
                {{ item.have_save === '1' ? t('promo_page_fuHuoNot') : t('promo_page_receive') }}
              </n-button>-->
              <n-button :bordered="false" class="lq-btn" @click="applyBouns(item)">
                {{ t('promo_page_apply') }}
              </n-button>
              <!--              <n-button v-else :bordered="false" class="lq-btn" @click="applyBouns(item)"> {{ item.tag === '0' ?
        t('promo_page_apply') : t('promo_page_receive') }} </n-button>-->
            </div>
          </n-flex>
          <div v-if="item.volume || item.award" class="item_bottom">
            <n-flex align="center" class="item_jd">
              <span> {{ t('promo_page_pro') }}： </span>
              <div class="item_pro"><span class="pro_inner" :style="`width: ${item.schedule}%`"> </span></div>
            </n-flex>
            <n-flex justify="space-between">
              <div class="item_bottom_l">
                <span> {{ t('promo_page_betAmount') }}： </span>
                <span> {{ item.volume }} </span>
              </div>
              <div class="item_bottom_r">
                <span> {{ t('promo_page_prize') }}： </span>
                <span> {{ item.award }} </span>
              </div>
            </n-flex>
          </div>
        </div>
      </div>
      <div class="nodata" v-if="!listData.list.length && !loading">
        <Imgt src="/img/wallet/nodata.webp" alt="nodata" />
        <div>{{ t('home_page_nomore_data') }}</div>
      </div>
    </n-spin>
    <!-- 分页 -->
    <n-pagination :default-page-size="20" class="pagination" @update:page="pageChange" v-model:page="params.page"
      :item-count="listData.total_page" v-show="listData.total_page" />

  </n-flex>

</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import { useI18n } from 'vue-i18n';
import { Message } from '@/utils/discreteApi';
import { useRouter } from 'vue-router';
import { Local } from '@/utils/storage';
import Imgt from '@/components/Imgt.vue';
import navTab from '../components/navTab.vue';

const router = useRouter();
const { t } = useI18n();
const loading = ref(false);
const params: any = reactive({ // 参数
  page: 1,
});
const curTab: any = ref('0');
// tag: 所在标签, 0：无限制, 1:by专属, 2：体育, 3：真人, 4：老虎机, 5：俱乐部专属，6 系统优惠，如果有多个，用_连接
const tabArr: any = ref(
  [
    { title: 'promo_page_all', key: '0' },
    { title: 'promo_page_guDing', key: 'constant' }, // 固定赠送
    { title: 'promo_page_depositZen', key: 'deposit' }, // 存款赠送
    { title: 'promo_page_system', key: 'System' }, // 系统优惠
    { title: 'promo_page_vipZen', key: 'VIP_related' }, // vip奖励
  ],
);
// 应有未读提示标识的活动
const needShowCount = ['System', 'VIP_related'];
const listData: any = ref(
  {
    total_page: 0,
    list: [
      // { name: '俱乐部专属', content: '每日首存送10%彩金', schedule: '', volume: '', award: '' },
      // { name: '真人视讯', content: '注册领彩金', schedule: '', volume: '', award: '' },
      // { name: '真人视讯', content: '每日首存送10%彩金', schedule: '', volume: '', award: '' },
      // { name: '系统优惠', content: '新人送999越南盾', schedule: '', volume: '', award: '' },
      // { name: '真人视讯', content: '投注有好礼，最高送888', schedule: '70', volume: '8000', award: '90' },
    ],
  },
);
const originListData: any = ref([]);

const clickTab = (e: any) => {
  curTab.value = e;
  filterData();
};
// 过滤数据
const filterData = () => {
  listData.value.list = curTab.value === '0' ? [...originListData.value] : originListData.value.filter((item: any) => item.tag === curTab.value);
  listData.value.total_page = listData.value.list.length || 0;
};
// 切换页码
const pageChange = (page: number) => {
  params.page = page;
  queryData();
};
// 获取数据
const queryData = () => {
  loading.value = true;
  const query = NetPacket.req_activites();
  // {int, show} % 0所有活动，1自己可以参与的
  query.show = 1;
  query.page = params.page;
  // console.log('=======', query)
  Net.instance.sendRequest(query);
};
// 数据处理
const resultHandle = (rs: any) => {

  setTimeout(() => {
    loading.value = false;
  }, 300);
  // 添加未读标识--开始
  tabArr.value.forEach((item: any) => {
    item.hasCount = 0;
    rs.promo.map((item_1: any) => {
      if (item.key === item_1.tag) {
        item.hasCount++;
      }
    });
  });
  console.log('--tabArr', tabArr);
  // 添加未读标识--结束
  originListData.value = rs.promo || [];
  filterData();
  console.log(listData.value.list.length, 'promo-data--------', listData.value.list);
};

const applyBouns = (data: any) => {
  // 全部
  if (['System', 'VIP_related'].includes(data.tag)) {
    loading.value = true;
    const query = NetPacket.req_get_email_attachments();
    query.email_id = data.details; // 这个 details 才是领取的 id
    Net.instance.sendRequest(query);
  } else {
    Local.set('curDiscountData', data); // 当前选择的优惠，需要带到充值页面
    router.push('/wallet/walletInfo?openDialogType=deposit');
  }
};

const applyBounsHandle = (res: any) => {
  setTimeout(() => {
    loading.value = false;
  }, 300);
  console.log('==领取优惠==', res);
  if (res.email_id.includes('#') || res.email_id === '-0') {
    Message.error(t('promo_page_applyFail'));
  } else { // 成功
    queryData(); // 刷新数据
    Message.success(t('promo_page_applySuc'));
  }
};

onUnmounted(() => {
  // 取消监听
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_activites, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_email_attachments, null);
});

onMounted(() => {
  setTimeout(() => {
    queryData();
    // 回执监听
    MessageEvent2.addMsgEvent(
      NetMsgType.msgType.msg_notify_activites, // msg_activity_info
      resultHandle,
    );
    MessageEvent2.addMsgEvent(
      NetMsgType.msgType.msg_notify_get_email_attachments,
      applyBounsHandle,
    );
  }, 500);

});

</script>

<style lang='less' scoped>
@import '@/assets/recordPage.less';
@timestamp: `new Date().getTime()`;

.promo_info {
  font-size: 16px;
  font-family: PingFangSC;

  .tab_top {
    gap: 8px 10px !important;

    .tab_item {
      position: relative;
      height: 36px;
      min-width: 75px;
      text-align: center;
      line-height: 20px;
      color: #8d81c1;
      padding: 7px 21px;
      border-radius: 10px;
      border: solid 1.4px #5a47b2;
      background-color: #372771;

      :deep(.n-badge) {
        position: absolute;
        top: 1px;
        right: 1px;
      }

      &.active {
        height: 46px;
        line-height: 30px;
        border: 0;
        color: #ebefff;
        border-image: url('/img/promo/tabBtn.webp?t=@{timestamp}') 0 30 0 30 fill / 0 20px stretch stretch !important;


        :deep(.n-badge) {
          top: 2px;
          right: 12px;
        }
      }

      &.tab_item_0 {
        min-width: 90px;

        &.active {
          background-size: 100%;
        }
      }

      &.tab_item_3,
      &.tab_item_6 {
        min-width: 95px;

        &.active {
          //, &:hover
          background-size: 84%;
        }
      }
    }
  }

  .promo_list {
    .list_item {
      margin: 20px 0;
      padding: 27px 27px 27px 26px;
      border-radius: 14px;
      background: url('/img/promo/listBg.webp?t=@{timestamp}') center no-repeat;
      background-size: cover;

      &.list_item_b {
        background-image: url('/img/promo/listBg2.webp?t=@{timestamp}');
      }

      .item_l {
        flex: 1;
        max-width: 90%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        .item_name {
          display: inline-block;
          min-width: 126px;
          padding: 0 8px;
          height: 46px;
          padding-top: 6px;
          text-align: center;
          background: url('/img/promo/nameBg.webp?t=@{timestamp}') no-repeat;
          background-size: cover;
          box-sizing: border-box
        }

        .item_title {
          padding-left: 28px;
          color: #8d81c1;
        }
      }

      .item_r {
        .lq-btn {
          color: #fff;
          display: inline-block;
          font-size: 12px;
          font-weight: 500;
          border-radius: 8px;
          text-align: center;
          width: 90px;
          height: 31px;
          line-height: 31px;
          background: url('/img/promo/applyBtn.webp?t=@{timestamp}') no-repeat;
          background-size: cover;
          transition: .3s;

          ::v-deep(.n-button__content) {
            display: block;
          }
        }
      }

      .item_bottom {
        font-size: 14px;

        .item_jd {
          margin: 11px 0;

          .item_pro {
            position: relative;
            flex: auto;
            height: 12px;
            border-radius: 7px;
            box-shadow: inset 0 0 4px 0 #000;
            background-blend-mode: color-burn, overlay, normal;
            background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), radial-gradient(circle at 50% 50%, #7e7e7e, #151515 100%), linear-gradient(to bottom, #27155c, #27155c);

            .pro_inner {
              display: inline-block;
              height: 7.2px;
              position: absolute;
              left: 3px;
              top: 2.5px;
              border-radius: 7px;
              background-image: linear-gradient(to right, #fa7800, #fbcb38 100%);
            }
          }
        }
      }

    }
  }
}
</style>
