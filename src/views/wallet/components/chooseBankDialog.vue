<template>
  <!-- 选择银行弹窗 -->
  <n-modal class="tips_sm_modal" :show="showBankModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container vertical">
        <div class="header rel center">
          <span class="weight_5 t_md">{{ t('paymentManagement_page_chBank') }}</span>
          <span class="close abs center pointer t_sm">
            <iconpark-icon @click="onCloseBank" icon-id="tanctongyguanb" color="#fff" size="1.5em"></iconpark-icon>
          </span>
        </div>
        <div class="body_bank_list vertical">
          <n-input size="large" @input="handleInput" :placeholder="t('deposit_page_inputBank')">
            <template #suffix>
              <a class="refresh_icon search_icon"></a>
            </template>
          </n-input>
          <n-flex class="bank_list">
            <n-flex align="center" :class="`bank_item ${item.status === 0 ? 'wh_item' : ''}`"
              v-for="(item, index) in bkList" @click="clickBank(item)" :key="index">
              <div v-if="item.status === 0" class="bank_wh">
                <iconpark-icon icon-id="weihuz" size="1rem"></iconpark-icon>
                <span>{{ t('addBank_page_bank_wh') }}</span>
              </div>
              <span class="bank_l_icon">
                <Imgt :src="`/img/bankIcon/bank_logo_${item.value}.webp`" :alt="item.label" />
              </span>
              <span class="bank_l_name"> {{ item.label }} </span>
            </n-flex>
          </n-flex>
        </div>
      </div>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import { useI18n } from "vue-i18n";
import { TTabList } from "@/utils/types";
// import { storeToRefs } from "pinia";
// import pinia from "@/store";
// import { Page } from '@/store/page';
import Imgt from '@/components/Imgt.vue';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';

const props = defineProps({
  isDepositBank: {
    type: Boolean,
    default: () => false
  },
  bankAllList: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['selectBank']);
const { t } = useI18n();
// const page = Page(pinia);
// const { bankListInfo } = storeToRefs(page);
const showBankModal = ref(false);
// 银行列表
const bkList = ref<any>([]);
const originBkList = ref<TTabList>([]);

const onCloseBank = () => {
  showBankModal.value = !showBankModal.value
}

// const handleBankList = () => {
//   console.log('-----====', bankListInfo.value)
//   console.log('&&&&&&&&===', props.bankAllList)
//   if (props.isDepositBank) { // 充值
//     bkList.value = [...props.bankAllList];
//     const curBankArr: any = [];
//     props.bankAllList.map((item: any) => {
//       bankListInfo.value.map((ite: any) => {
//         if (ite.value === item.value) {
//           curBankArr.push({
//             ...ite,
//             label: item.label
//           })
//         }
//       })
//     });
//     bkList.value = curBankArr.sort((a: any, b: any) => {
//       return b.status - a.status
//     });
//   } else { // 其他 绑定银行，提现等
//     bkList.value = [...bankListInfo.value];
//   }
//   originBkList.value = [...bkList.value];
// }
const getBankList = () => {
  const req = NetPacket.req_bank_name_list();
  Net.instance.sendRequest(req);
};
const handleBankList = (res: any) => {
  console.log('------aaaa', res)
  // 添加银行维护状态，0 维护，1 开启
  const newArr = res.bank_name_list.map((item: any, index: number) => {
    return {
      value: item.bank_id,
      label: item.bank_name,
      status: res.status_list[index]
    }
  });
  bkList.value = newArr.sort((a: any, b: any) => {
    return b.status - a.status
  });
  originBkList.value = [...bkList.value];
}
// 充值单独用的银行列表
const getDepositBankList = () => {
  const req = NetPacket.req_pay_name_list();
  Net.instance.sendRequest(req);
}
// 充值获取的银行列表
const handleBankAllList = (res: any) => {
  console.log('------bbb', res)
  const curBankArr: any = [];
  res.pay_name_list.map((item: any) => {
    bkList.value.map((ite: any) => {
      if (ite.value === item.pay_id) {
        curBankArr.push({
          ...ite,
          label: item.pay_name
        })
      }
    })
    // return {
    //   value: item.pay_id,
    //   label: item.pay_name
    // }
  });
  bkList.value = curBankArr.sort((a: any, b: any) => {
    return b.status - a.status
  });
  originBkList.value = [...bkList.value];
}
// 输入字符串匹配银行
const handleInput = (v: string) => {
  if (v) {
    const newArr: any = [];
    originBkList.value.map((item: any) => {
      const str = item.label
      const reg = new RegExp(v, 'i')
      const isHas = str.match(reg)
      if (isHas) {
        newArr.push(item)
      }
    })
    bkList.value = newArr
  } else {
    bkList.value = [...originBkList.value]
  }
}
// 选择银行
const clickBank = (e: any) => {
  // if (e.status === 0) return;
  onCloseBank();
  emit('selectBank', e)
}

// watch(
//   () => bankListInfo.value,
//   (n) => {
//     console.log('999999--', n)
//     handleBankList();
//   },
//   {
//     deep: true,
//   }
// )
// watch(
//   () => showBankModal.value,
//   (n) => {
//     if (n) {
//       bkList.value = [...originBkList.value]
//     }
//   }
// )

onMounted(() => {
  getBankList();
  if (props.isDepositBank) {
    getDepositBankList();
  } else {
    // getBankList();
  }

  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_bank_name_list, handleBankList);
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_pay_name_list, handleBankAllList);
})
onUnmounted(() => {
  // 取消监听
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_req_bank_name_list, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_req_pay_name_list, null);
});

defineExpose({
  onCloseBank
});

</script>

<style lang="less" scoped>
@import '@/assets/CommonForm.less';
@timestamp: `new Date().getTime()`;
// 弹窗提示
.tips_sm_modal {
  &.form_card {
    width: 504px !important;

    :deep(.n-card__content) {
      padding: 0 !important;

      .header {
        position: relative;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 2px solid rgba(38, 41, 76, 1);

        .close {
          right: 20px;
        }
      }
    }
  }
}

// 选择银行
.body_bank_list {
  padding: 30px 60px;

  .bank_list {
    width: 100%;
    min-width: 492px;
    margin: 20px auto 0;
    gap: 20px 18px !important;
    max-height: 310px;
    overflow-y: auto;

    .bank_item {
      position: relative;
      cursor: pointer;
      font-size: 14px;
      width: 182px;
      height: 48px;
      background: rgba(33, 36, 67, 1);
      border: 1px solid rgba(38, 41, 76, 1);
      border-radius: 8px;

      &:active {
        transform: scale(.95);
      }

      &.wh_item {
        pointer-events: none;
      }

      .bank_wh {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        background: rgba(0, 0, 0, .7);
        width: 100%;
        height: 100%;
        border-radius: 8px;

        span {
          margin-left: 5px;
        }
      }

      .bank_l_icon {
        position: relative;
        display: flex;
        width: 28px;
        height: 28px;
        margin-left: 8px;
        border-radius: 50%;
        background: #fff;
        border: 1px solid rgba(229, 229, 255, 1);

        &::after {
          content: '';
          position: absolute;
          top: -5px;
          left: 37px;
          width: 1px;
          height: 34px;
          background: url("/img/payment/line.webp?t=@{timestamp}") no-repeat;
          background-size: 100%;
        }

        img {
          width: 100%;
          border-radius: 50%;
        }
      }

      .bank_l_name {
        max-width: 120px;
      }
    }
  }
}

</style>
