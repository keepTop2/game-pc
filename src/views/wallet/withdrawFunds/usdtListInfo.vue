<template>
  <ModalDialog v-model:visible="showBankListModal" title="选择USDT">
    <template #content>
      <div class="vertical center t_md bank_sec_list">
        <n-flex justify="space-between" align="center" class="w_full" vertical>
          <div :class="`bank_list ${item.isUse ? 'bank_used' : ''}`" v-for="(item, index) in bankList" :key="index">
            <n-flex align="center" class=" bank_item">
              <div class="bank_l_name">
                <div class="info-text">
                  <div>
                    <span>{{ `${t('deposit_page_netWork')}:${item.bankName}` }}</span>
                  </div>
                  <div class="p_account">
                    <span class="txt_label">{{ t('paymentManagement_page_address') }}:</span>
                    <span class="txt_ac">{{ item.bankCode }}</span>
                  </div>
                  <div class="txt_bz">
                    {{ `${t('paymentManagement_page_remark')}:${item.name}` }}
                  </div>
                </div>
                <div class="utilization-bank">
                  <div class="btn_cs" v-if="item.isDefault">
                    {{ t('usdt_default') }}
                  </div>
                  <div v-else>
                    <n-button v-if="!item.isUse" @click="removeBank(item)"
                      :class="['btn-bank', item.isUse ? '' : 'btn-bank-use']">
                      {{ t('paymentManagement_page_delete') }}
                    </n-button>
                    <n-button @click="bankCheck(index, 'isDefault')"
                      :class="['btn-bank', item.isDefault ? '' : 'btn-bank-default']">
                      {{ t('paymentManagement_page_set_default') }}
                    </n-button>
                  </div>
                </div>
              </div>
            </n-flex>
          </div>

          <div v-if="!(bankList.length >= 6) && !addBankFlag">
            <div class="bank_list_add">
              <div class="center" @click="flagBank(true)">
                <iconpark-icon icon-id="gerentianjiaicon" size="1.5rem"></iconpark-icon>
                <span>{{ t('paymentManagement_page_new_usdt') }}</span>
              </div>
            </div>
          </div>

          <n-form ref="formRef" v-show="addBankFlag" :model="form" class="w_full bank-add-form">
            <div class="add-bank-text">
              <div class="txt_tip">{{ t('paymentManagement_page_oneUsdt') }}</div>
              <iconpark-icon @click="flagBank(false)" icon-id="tanctongyguanb" size="0.8rem"></iconpark-icon>
            </div>
            <n-form-item :label="t('deposit_page_chooseNetWork')">
              <n-select :placeholder="t('deposit_page_chooseNetWork')" v-model:value="form.network_type"
                :options="[{ label: t('deposit_page_chooseNetWork'), value: '' }, ...netWorkArr]" />
            </n-form-item>
            <n-form-item :label="t('withdraw_page_usdtAdd')" path="bankCode">
              <n-input size="large" v-model:value="form.bankCode" :placeholder="t('paymentManagement_page_usdt_tips')">
                <template #suffix>
                  <a class="refresh_icon"></a>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item :label="t('paymentManagement_page_remark')" path="accountName">
              <n-input size="large" v-model:value="form.desc" :placeholder="t('描述（选填）')">
              </n-input>
            </n-form-item>
            <div class="cz_btn with_sec_btn">
              <a class="button_color" @click="submit"> {{ t('paymentManagement_page_confirm') }} </a>
            </div>
          </n-form>

        </n-flex>

        <!--        <div class="tips">
          <Imgt src="/img/wallet/bankTips.webp" />
          <span>{{ t('paymentManagement_page_max_bank', { num: bankList.length || 0 }) }}</span>
        </div>-->
      </div>
    </template>
  </ModalDialog>

</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { NetPacket } from '@/netBase/NetPacket.ts';
import { Net } from '@/net/Net.ts';
import { MessageEvent2 } from '@/net/MessageEvent2.ts';
import { NetMsgType } from '@/netBase/NetMsgType.ts';
import { useI18n } from "vue-i18n";
import { Dialog, Message } from "@/utils/discreteApi.ts";
import ModalDialog from '@/components/ModalDialog.vue';

const netWorkArr = [
  { label: 'TRC20', value: 1 },
  { label: 'ERC20', value: 2 },
];
const emit = defineEmits(["bindBankCheck"]);
const props = defineProps({
  myBankList: {
    type: Object,
    default: () => { }
  },
  myBankName: {
    type: String,
    default: ''
  }
})

const { t } = useI18n();
const baseObj = {
  network_type: '',
  bankCode: '',
  desc: '',
}
const form = ref({ ...baseObj })
const curOperate = ref({}); // 当前操作的数据
const formRef = ref()
const submit = () => {
  if (!form.value.network_type) {
    return Message.error(t('deposit_page_chooseNetWork'))
  }
  if (!form.value.bankCode) {
    return Message.error(t('paymentManagement_page_usdt_tips'))
  }

  const req = NetPacket.req_add_usdt_info();
  req.usdt_type = form.value.network_type;
  req.usdt_addr = form.value.bankCode;
  req.desc = form.value.desc;
  Net.instance.sendRequest(req);
}

// result: 2 // 1 成功，2 失败
const handleAddBankRef = (res: any) => {
  const tips: any = {
    1: 'paymentManagement_page_addBankSuc',
    2: 'paymentManagement_page_errorAdd',
    3: 'paymentManagement_page_addBankFail',
    4: 'paymentManagement_page_hasAdd',
  }
  if (res.result === 1) {
    Message.success(t(tips[res.result]))
    getMyBankList(); // 更新银行列表
    // bankList.value.push({ ...form.value, name: '******' })
    chooseBank.value = { ...baseChObj }; // 重置
    form.value = { ...baseObj }; // 重置
    flagBank(false)
  } else {
    Message.error(t(tips[res.result]))
  }
}
// 获取已绑定的银行账号
const getMyBankList = () => {
  const req = NetPacket.req_usdt_info_list();
  Net.instance.sendRequest(req);
}

const bankList = ref<any[]>([]);
const setBankList = (res: any) => {
  console.log('------33333', res)
  let data = res.map((item: any, index: number) => {
    item.bankCode = item.usdt_addr
    item.bankName = netWorkArr.find((it) => it.value == item.usdt_type)?.label || '-' // 协议
    item.name = item.desc // 备注
    if (index === 0) {
      item.isDefault = true
      item.isUse = true
    } else {
      item.isDefault = false
      item.isUse = false
    }
    return item
  })
  bankList.value = [...data]

}

const bankCheck = (index: number, key: string) => {
  let data: any = bankList.value;
  if (!data[index][key]) {
    data.forEach((item: any, i: number) => {
      item[key] = index === i;
      return item;
    });
  }

  if (key === 'isDefault') {
    emit('bindBankCheck', data[index])
    openModal()
    handleBankId(data[index])
  }
  // console.log(data[index], '--data[index][key]-');
};

const handleBankId = (item: any) => {
  const req = NetPacket.req_set_default_usdt();
  req.usdtaddr = `${item.usdt_addr}`;
  Net.instance.sendRequest(req);
}

// 设置默认银行
const handleDefaultUsdt = (res: any) => {
  if (res.result === 0) {
    Message.success(t('proxy_page_caoZuo'))
    getMyBankList();
    onClose(); // 关闭窗口
  } else {
    Message.error(t('proxy_page_caoZuoFail'))
  }
}

const showBankListModal = ref(false);
const openModal = () => {
  showBankListModal.value = !showBankListModal.value;
};
const onClose = () => {
  showBankListModal.value = false;
};

const addBankFlag = ref<Boolean>(false)
const flagBank = (flag: Boolean) => {
  addBankFlag.value = flag
};

const baseChObj = { label: '', value: '' }
const chooseBank = ref({ ...baseChObj }); // 选择的银行卡


// 删除银行
const removeBank = (item: any) => {
  curOperate.value = item;
  // console.log(item);
  Dialog.warning({
    showIcon: false,
    title: t('paymentManagement_page_tips'),
    content: t('paymentManagement_page_tipContent'),
    positiveText: t('home_page_confirm'),
    negativeText: t('home_page_cancel'),
    onPositiveClick: () => {
      operateBank(item)
    },
    onNegativeClick: () => {

    },
  })
};

const operateBank = (item: any) => {
  item = curOperate.value;
  let req;
  req = NetPacket.req_del_usdt_info();
  req.usdtaddr = `${item.usdt_addr}`;
  Net.instance.sendRequest(req);
}
const handleDelUsdtList = (res: any) => {
  if (res.result === 0) {
    Message.success(t('proxy_page_caoZuo'))
    getMyBankList();
  } else {
    Message.error(t('proxy_page_caoZuoFail'))
  }
}

watch(() => showBankListModal.value, (n) => {
  // 打开
  if (n) {
    // 绑定银行卡
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_add_usdt_info, handleAddBankRef);
  } else {
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_add_usdt_info, null);
  }
})
watch(() => props.myBankList, (n) => {
  console.log('需要更新当前usdt列表---', n)
  setBankList(n);
})

onMounted(() => {
  setBankList(props.myBankList)

  // 设置默认
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_set_default_usdt, handleDefaultUsdt);
  // 删除
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_del_usdt_info, handleDelUsdtList);
})

onUnmounted(() => {
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_set_default_usdt, null)
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_del_usdt_info, null);
})


defineExpose({
  openModal,
});

</script>

<style scoped lang="less">
@import '@/assets/CommonForm.less';
@timestamp: `new Date().getTime()`;

.bank_sec_list {
  padding: 30px 35px;
  gap: 20px !important;

  .w_full {
    gap: 20px !important;
  }

  .bank_list {
    flex-wrap: nowrap !important;
    border-radius: 8px;
    border: 2px solid transparent;
    width: 434px;
    padding: 13px 16px;
    height: 102px;
    background: url('/img/payment/bankBg.webp?t=@{timestamp}') center no-repeat;
    background-size: 100%;

    &.bank_used {
      border-color: #1BCC58;
    }

    .bank_item {
      gap: 14px !important;
      cursor: pointer;
      font-size: 14px;
      flex-wrap: nowrap !important;

      .bank_l_name {
        display: flex;
        justify-content: space-between;
        width: 100%;

        .info-text {
          width: 78%;
          flex: 1;

          >div {
            font-size: 16px;
            margin-bottom: 5px;

            &:nth-child(n+2) {
              font-size: 14px;
            }
          }

          .p_account {
            display: flex;
            white-space: nowrap;

            .txt_ac {
              display: inline-block;
              max-width: 270px;
              word-wrap: break-word;
              white-space: wrap;
            }
          }

          .txt_bz {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .utilization-bank {
          width: 80px;
          //flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin-left: 8px;

          .btn_cs {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 80px;
            height: 28px;
            border-radius: 8px;
            background: #525566;
          }

          .btn-bank {
            width: auto;
            min-width: 80px;
            height: 28px;
            padding: 0 5px;
            border: none !important;
            font-size: 12px;

            &:first-child {
              background: #0CC41E;
            }
          }

          .btn-bank-use {
            color: rgba(255, 255, 255, 1);
            background-color: rgba(12, 196, 30, 1);
          }

          .btn-bank-default {
            color: rgba(255, 255, 255, 1);
            background-color: rgba(19, 130, 231, 1);
          }

          .btn-bank:nth-child(2) {
            margin-top: 10px;
          }
        }

        .info-text {
          p {
            font-size: 14px;
          }

          p:nth-child(1) {
            span:nth-child(2) {
              margin-left: 10px;
              font-size: 14px;
            }
          }

          p:nth-child(2) {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        //max-width: 120px;
      }
    }
  }

  .bank_list_add {
    cursor: pointer;
    font-size: 14px;
    width: 434px;
    height: 102px;
    border: 1px dashed #fff;
    border-radius: 8px;

    .center {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      gap: 10px;

      span {
        font-size: 16px;
      }
    }
  }

  .bank-add-form {
    padding: 16px;
    background-color: #0D0E2E;
    border-radius: 8px;
    box-sizing: border-box;

    :deep(.n-form-item) {
      grid-template-rows: 22px;

      .n-form-item-label {
        color: #fff;
        padding: 0;
        height: 22px;
        min-height: 0;
        line-height: 22px;
      }
    }

    .add-bank-text {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .txt_tip {
        color: #AEAEB0;
        margin-bottom: 10px;
      }

      img {
        cursor: pointer;
      }
    }

  }

  //.tips {
  //  margin-top: 20px;
  //  min-width: 374px;
  //  gap: 8px 12px;
  //
  //  img {
  //    width: 12px;
  //    height: 12px;
  //    margin-right: 4px;
  //    vertical-align: middle;
  //  }
  //
  //  span {
  //    color: rgba(142, 130, 194, 1);
  //    font-size: 11px;
  //  }
  //}

  .cz_btn {
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      font-size: 18px;
      display: block;
      width: 382px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin: 14px auto 14px;
    }
  }
}
</style>
