<template>
  <ModalDialog v-model:visible="showBankListModal" title="walletInfo_page_selectBank">
    <template #content>
      <div class="vertical center t_md bank_sec_list">
        <n-flex justify="space-between" align="center" class="w_full" vertical>
          <div :class="`bank_list ${item.isUse ? 'bank_used' : ''}`" v-for="(item, index) in bankList" :key="index">
            <n-flex align="center" class=" bank_item">
              <div class="bank_l_icon">
                <Imgt :src="`/img/bankIcon/bank_logo_${item.bank_id}.webp`" :alt="item.bankName" />
              </div>
              <div class="bank_l_name">
                <div class="info-text">
                  <p>
                    <span>{{ item.bankName }}</span>
                    <span>{{ item.name }}</span>
                  </p>
                  <p class="p_account">{{`${t('addBank_page_bankCard')}: ${item.bankCode}`}}</p>
                </div>
                <div class="utilization-bank">
                  <div class="btn_cs" v-if="item.isDefault">
                    {{t('usdt_default')}}
                  </div>
                  <div v-else>
                    <n-button v-if="!item.isUse" @click="removeBank(item)" :class="['btn-bank', item.isUse ? '' : 'btn-bank-use']">
                      {{ t('paymentManagement_page_delete') }}
                    </n-button>
                    <n-button @click="bankCheck(index, 'isDefault')"
                              :class="['btn-bank', item.isDefault ? '' : 'btn-bank-default']">
                      {{t('paymentManagement_page_set_default') }}
                    </n-button>
                  </div>
                </div>
              </div>
            </n-flex>
          </div>

          <div v-if="!(bankList.length >= 6)">
            <div class="bank_list_add" v-show="!addBankFlag">
              <div class="center" @click="flagBank(true)">
                <iconpark-icon icon-id="gerentianjiaicon" size="1.5rem"></iconpark-icon>
                <span>{{ t('paymentManagement_page_new_bank') }}</span>
              </div>
            </div>
          </div>

          <n-form ref="formRef" v-show="addBankFlag" :model="form" class="w_full bank-add-form">
            <div class="add-bank-text">
              <p>{{ t('paymentManagement_page_add_one_bank') }}</p>
              <Imgt src="/img/wallet/addBankClose.webp" alt="nodata" @click="flagBank(false)" />
            </div>

            <n-form-item :label="t('addBank_page_pChooseBank')">
              <n-flex class="choose-bank">
                <n-flex align="center" class="choose-bank-l">
                    <span v-show="chooseBank.value" class="bank_cicon">
                      <Imgt :src="`/img/bankIcon/bank_logo_${chooseBank.value}.webp`" :alt="chooseBank.label" />
                    </span>
                  <span class="bank_cname"> {{ chooseBank.label }} </span>
                </n-flex>
                <a class="change-btn" @click="showChangeBank"> {{ t('deposit_page_changeWay') }} </a>
              </n-flex>
            </n-form-item>

            <n-form-item :label="t('addBank_page_bankCard')" path="bankCode">
              <n-input size="large" type="number" v-model:value="form.bankCode"
                       :placeholder="t('paymentManagement_page_chCardNo')">
                <template #suffix>
                  <a class="refresh_icon"></a>
                </template>
              </n-input>
            </n-form-item>

            <n-form-item :label="t('addBank_page_name')" path="accountName">
              <n-input size="large" :disabled="!!props.myBankName" v-model:value="form.accountName"
                       :placeholder="t('paymentManagement_page_enterBank')">
                <template #suffix>
                  <a class="refresh_icon"></a>
                </template>
              </n-input>
            </n-form-item>

            <div class="cz_btn with_sec_btn">
              <a @click="submit"> {{ t('paymentManagement_page_confirm') }} </a>
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

  <!-- 选择银行弹窗 -->
  <n-modal class="deposit_sm_modal" :show="showBankModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container vertical">
        <div class="header rel center">
          <span class="weight_5 t_md">{{ t('paymentManagement_page_chBank') }}</span>
          <span class="close abs center pointer t_sm">
            <iconpark-icon @click="onCloseBank" icon-id="tanctongyguanb" color="#fff" size="1.5em"></iconpark-icon>
          </span>
        </div>
        <div class="body vertical center t_md body_sec">
          <n-input size="large" @input="handleInput" :placeholder="t('deposit_page_inputBank')">
            <template #suffix>
              <a class="refresh_icon search_icon"></a>
            </template>
          </n-input>
          <n-flex class="bank_list">
            <n-flex align="center" class="bank_item" v-for="(item, index) in bkList" @click="selectBank(item)"
              :key="index">
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

import { onMounted, onUnmounted, ref, watch } from 'vue';
import { NetPacket } from '@/netBase/NetPacket.ts';
import { Net } from '@/net/Net.ts';
import { MessageEvent2 } from '@/net/MessageEvent2.ts';
import { NetMsgType } from '@/netBase/NetMsgType.ts';
import { useI18n } from "vue-i18n";
import { TTabList } from "@/utils/types";
import { Dialog, Message } from "@/utils/discreteApi.ts";
import pinia from '@/store';
import { storeToRefs } from 'pinia';
// import { MessageMap } from '@/net/MessageMap.ts';
import { Page } from '@/store/page';
import { testBankCard } from '@/utils/is.ts';
import Imgt from '@/components/Imgt.vue';
import ModalDialog from '@/components/ModalDialog.vue';

const { bankListInfo } = storeToRefs(Page(pinia));

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
  bank_id: '',
  bankCode: '',
  bankName: '',
  accountName: props.myBankName,
}
const form = ref({ ...baseObj })
const curOperate = ref({}); // 当前操作的数据
const formRef = ref()
const submit = () => {
  if (!form.value.bank_id) {
    return Message.error(t('paymentManagement_page_chBank'))
  }

  if (!form.value.bankCode) {
    return Message.error(t('paymentManagement_page_chCardNo'))
  }
  if (!testBankCard(form.value.bankCode)) {
    return Message.error(t('paymentManagement_page_tip1'))
  }
  if (!form.value.accountName) {
    return Message.error(t('paymentManagement_page_chName'))
  }
  const req = NetPacket.req_new_bank_card_info();
  req.bank_id = form.value.bank_id;
  req.account_number = form.value.bankCode;
  req.cardholder_name = props.myBankName ? props.myBankName : form.value.accountName?.replace(/\s+/g, '').toUpperCase(); // 保存需要去除空格和转大写
  Net.instance.sendRequest(req);
}

// result: 2 // 1 成功，2 失败
const handleAddBankRef = (res: any) => {
  const tips: any = {
    1: 'paymentManagement_page_addBankSuc',
    2: 'paymentManagement_page_addBankFail',
    3: 'paymentManagement_page_acc_already',
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
  const req = NetPacket.req_bank_card_info_list();
  Net.instance.sendRequest(req);
}

const bankList = ref<any[]>([]);
const setBankList = (res: any) => {
  let data = res.bank_card_info_list.map((item: any, index: number) => {
    item.bankCode = item.account_number
    item.bankName = item.bank_name
    item.name = '******'
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
  const req = NetPacket.req_set_default_bankcard();
  req.bankcard = `${item.bank_id}_${item.account_number}`;
  Net.instance.sendRequest(req);
}

const defaultBankId = (res: any) => {
  if (res.rlt === 1) {
    Message.error(t('paymentManagement_page_setDefaulted'))
  } else {
    Message.success(t('paymentManagement_page_setError'))
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

// 测试一下
const showBankModal = ref(false);
// 银行列表
const bkList = ref<TTabList>([...bankListInfo.value]);
const originBkList = ref<TTabList>([...bankListInfo.value]);

const onCloseBank = () => {
  showBankModal.value = !showBankModal.value;
};

// 输入字符串匹配银行
const handleInput = (v: string) => {
  if (v) {
    const newArr: any = [];
    originBkList.value.map((item: any) => {
      const str = item.label;
      const reg = new RegExp(v, 'i');
      const isHas = str.match(reg);
      if (isHas) {
        newArr.push(item);
      }
    });
    bkList.value = [...newArr];
  } else {
    bkList.value = [...originBkList.value];
  }
};

// 更换银行弹窗
const showChangeBank = () => {
  onCloseBank()
}
const baseChObj = { label: '', value: '' }
const chooseBank = ref({ ...baseChObj }); // 选择的银行卡
// 选择银行
const selectBank = (e: any) => {
  form.value.bank_id = e.value;
  chooseBank.value = e;
  form.value.bankName = e.label;
  onCloseBank()
}
// 设置默认银行
const handleDefaultBank = (res: any) => {
  if (res.rlt === 0) {
    Message.success(t('proxy_page_caoZuo'))
    getMyBankList();
    onClose(); // 关闭窗口
  } else {
    Message.error(t('proxy_page_caoZuoFail'))
  }
}

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
  req = NetPacket.req_del_bank_card_info();
  req.bankcard = `${item.bank_id}_${item.account_number}`;
  Net.instance.sendRequest(req);
}
const handleDelBankList = (res: any) => {
  if (res.result === 0) {
    Message.success(t('proxy_page_caoZuo'))
    getMyBankList();
  } else {
    Message.error(t('proxy_page_caoZuoFail'))
  }
}

const handleDelUsdtList = (res: any) => {
  // showDelBankRef.value = false
  if (res.result === 0) {
    Message.success(t('proxy_page_caoZuo'))
    // getMyUsdtList();
  } else {
    Message.error(t('proxy_page_caoZuoFail'))
  }
}

watch(() => showBankListModal.value, (n) => {
  // 打开
  if (n) {
    // 绑定银行卡
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_new_bank_card_info, handleAddBankRef);
  } else {
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_new_bank_card_info, null);
  }
})
watch(() => props.myBankList, (n) => {
  console.log('需要更新当前银行列表---', n)
  setBankList(n);
})

onMounted(() => {
  setBankList(props.myBankList)
  // 绑定银行卡
  // MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_new_bank_card_info, handleAddBankRef);
  // 设置默认
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_req_set_default_bankcard, defaultBankId)
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_set_default_bankcard, handleDefaultBank);
  // 删除
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_del_bank_card_info, handleDelBankList);
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_del_usdt_info, handleDelUsdtList);
})

onUnmounted(() => {
  // MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_new_bank_card_info, null);
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_req_set_default_bankcard, null)
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_set_default_bankcard, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_del_bank_card_info, null);
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
    padding: 16px;
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

      .bank_l_icon {
        position: relative;
        width: 48px;
        height: 48px;
        line-height: 48px;
        border-radius: 50%;
        background: #fff;
        border: 1px solid #D6CDFF;
        text-align: center;
        flex: none;

        &::after {
          content: '';
          position: absolute;
          top: -5px;
          left: 62px;
          width: 1px;
          height: 48px;
          background: url("/img/payment/line2.webp?t=@{timestamp}") no-repeat;
          background-size: 100%;
        }

        img {
          width: 42px;
          transform: translateY(7px);
        }

        //background-color: #ef1111;
        //margin-left: 18px;
      }

      .bank_l_name {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-left: 15px;

        .info-text {
          flex: 1;
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
    padding: 17px 19px;
    //gap: 8px 12px;
    background-color: rgba(29, 14, 74, 1);
    box-shadow: 0 4.47px 4.47px 0 rgba(0, 0, 0, 0.25) inset;
    border: 3px solid rgba(78, 59, 153, 1);
    border-radius: 10px;
    box-sizing: border-box;

    .add-bank-text {
      display: flex;
      align-items: center;
      justify-content: space-between;

      img {
        cursor: pointer;
      }
    }

    .choose-bank {
      flex-flow: nowrap !important;
      gap: 10px !important;

      .choose-bank-l {
        width: 235px !important;
        background-image: url('/img/payment/inputBgSmall.webp?t=@{timestamp}') !important;

        .bank_cicon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #D6CDFF;

          img {
            width: 22px;
          }
        }

        .bank_cname {
          line-height: 16px;
        }
      }

      .change-btn {
        display: inline-block;
        text-align: center;
        width: 90px;
        height: 36px;
        line-height: 36px;
        background: url('/img/payment/go-btn.webp?t=@{timestamp}') center no-repeat;
        background-size: 100%;
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
      height: 54px;
      line-height: 52px;
      text-align: center;
      margin: 20px auto 0;
      background: url('/img/payment/sub_btn.webp?t=@{timestamp}') center no-repeat;
      background-size: 100%;
    }
  }
}


.deposit_sm_modal {
  .body {
    .sm-txt {
      font-size: 24px;
      width: 375px;
      height: 250px;
      margin: 0 auto;
      background: #17a1fb;
    }
    .bank_list_item {
      width: 100%;
      a {
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  .body_sec {
    .refresh_icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url('/img/payment/Vector.webp?t=@{timestamp}') center no-repeat;
      background-size: 100%;

      &.search_icon {
        background-image: url('/img/payment/search_icon.webp?t=@{timestamp}');
      }
    }

    .choose-bank {
      gap: 10px !important;

      .choose-bank-l {
        width: 235px !important;
        background-image: url('/img/payment/inputBgSmall.webp?t=@{timestamp}') !important;

        .bank_cicon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #D6CDFF;

          img {
            width: 22px;
          }
        }

        .bank_cname {
          line-height: 16px;
        }
      }

      .change-btn {
        display: inline-block;
        text-align: center;
        width: 90px;
        height: 36px;
        line-height: 36px;
        background: url('/img/payment/go-btn.webp?t=@{timestamp}') center no-repeat;
        background-size: 100%;
      }
    }

    // 选择银行
    .bank_list {
      width: 100%;
      min-width: 492px;
      margin: 0 auto 30px;
      gap: 20px 18px !important;
      max-height: 310px;
      overflow-y: auto;

      .bank_item {
        cursor: pointer;
        font-size: 14px;
        width: 176px;
        height: 46px;
        background: url('/img/payment/bankBg.webp?t=@{timestamp}') center no-repeat;
        background-size: 100%;
        flex-flow: nowrap !important;

        &:active {
          transform: scale(.95);
        }

        .bank_l_icon {
          width: 28px;
          height: 28px;
          margin-left: 8px;

          img {
            width: 26px;
            transform: translateY(2px);
          }
        }
      }
    }

  }

}
</style>
