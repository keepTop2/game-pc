<template>
  <n-modal class="deposit_modal" :show="showBankListModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container vertical">
        <div class="header rel center">
          <span class="weight-5 t-md">{{ '选择银行卡' }}</span>
          <span class="close abs center pointer t-sm">
            <iconpark-icon @click="onClose" icon-id="Group39368" color="#fff" size="1.5em"></iconpark-icon>
          </span>
        </div>


        <div class="body vertical center t-md">
          <n-flex justify="space-between" align="center" class="w-full" vertical>
            <div class="bank-list" v-for="(item, index) in bankList" :key="index">
              <n-flex align="center" class=" bank-item">
                <div class="bank-l-icon">
                  <img :src="`/img/bankIcon/bank_logo_${item.bank_id}.webp`" :alt="item.bankName" />
                </div>
                <div class="bank-l-name">
                  <div class="info-text">
                    <p>
                      <span>{{ item.bankName }}</span>
                      <span>{{ item.name }}</span>
                    </p>
                    <p>{{ item.bankCode }}</p>
                  </div>
                  <div class="utilization-bank">
                    <n-button @click="bankCheck(index, 'isUse')"
                      :class="['btn-bank', item.isUse ? '' : 'btn-bank-use']">
                      {{ item.isUse ? '使用中' : '选择' }}
                    </n-button>
                    <n-button @click="bankCheck(index, 'isDefault')"
                      :class="['btn-bank', item.isDefault ? '' : 'btn-bank-default']">
                      {{ item.isDefault ? '默认卡片' : '设为默认' }}
                    </n-button>
                  </div>
                </div>
              </n-flex>
            </div>

            <div v-if="!(bankList.length >= 6)">
              <div class="bank-list-add" v-show="!addBankFlag">
                <div class="center" @click="flagBank(true)">
                  <img src="/img/wallet/bankAdd.webp" alt="nodata">
                  <span>添加新银行卡</span>
                </div>
              </div>
            </div>


            <n-form ref="formRef" v-show="addBankFlag" :model="form" class="w-full bank-add-form">

              <div class="add-bank-text">
                <p>添加一张银行卡</p>
                <img src="/img/wallet/addBankClose.webp" alt="nodata" @click="flagBank(false)">
              </div>

              <n-form-item :label="'选择银行'">
                <n-flex class="choose-bank">
                  <n-flex align="center" class="choose-bank-l">
                    <span class="bank-cicon">
                      <img :src="`/img/bankIcon/bank_logo_${chooseBank.value}.webp`" :alt="chooseBank.label" />
                    </span>
                    <span class="bank-cname"> {{ chooseBank.label }} </span>
                  </n-flex>
                  <a class="change-btn" @click="showChangeBank"> 更换 </a>
                </n-flex>
              </n-form-item>

              <n-form-item :label="'银行卡号'" path="bankCode">
                <n-input size="large" v-model:value="form.bankCode" :placeholder="'请输入银行卡号'">
                  <template #suffix>
                    <a class="refresh-icon"></a>
                  </template>
                </n-input>
              </n-form-item>


              <n-form-item :label="'银行账户名'" path="accountName">
                <n-input size="large" :disabled="!!props.myBankName" v-model:value="form.accountName"
                  :placeholder="'请输入银行账户名'">
                  <template #suffix>
                    <a class="refresh-icon"></a>
                  </template>
                </n-input>
              </n-form-item>


              <!--              <n-form-item label="手机号" path="phone">-->
              <!--                <n-input clearable size="large" v-model:value="form.phone"-->
              <!--                         :placeholder="'请输入手机号'"></n-input>-->
              <!--              </n-form-item>-->


              <!--              <n-form-item :label="'验证码'">-->
              <!--                <n-input clearable size="large" v-model:value="form.phoneCode"-->
              <!--                         :placeholder="'请输入6位数验证码'"></n-input>-->
              <!--                <n-button :bordered="false" :loading="phoneCodeLoading"-->
              <!--                          @click="submitSendPhoneCode" class="btn"-->
              <!--                          :disabled="phoneCodeDisabled">发送-->
              <!--                </n-button>-->
              <!--              </n-form-item>-->


              <div class="cz-btn">
                <a @click="submit"> 确认 </a>
                <!--                <a @click="goToDeposit"> 确认 </a>-->
              </div>
              <!--              <div class="error">-->
              <!--                <img src="/img/wallet/tipsWarning.webp" alt="nodata">-->
              <!--                <span>输入信息错误</span>-->
              <!--                </div>-->

            </n-form>

          </n-flex>
          <!-- 充值列表选择 -->

          <div class="tips">
            <img src="/img/wallet/bankTips.webp" alt="">
            <!--            bankList-->
            <span>{{ t('paymentManagement_page_max_bank', { num: bankList.length || 0 }) }}</span>
          </div>
        </div>

      </div>

    </n-card>
  </n-modal>

  <!-- 选择银行弹窗 -->
  <n-modal class="deposit_sm_modal" :show="showBankModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container vertical">
        <div class="header rel center">
          <span class="weight-5 t-md">{{ '请选择银行' }}</span>
          <span class="close abs center pointer t-sm">
            <iconpark-icon @click="onCloseBank" icon-id="Group39368" color="#fff" size="1.5em"></iconpark-icon>
          </span>
        </div>
        <div class="body vertical center t-md body-sec">
          <n-input size="large" @input="handleInput" :placeholder="'输入银行名称查找'">
            <template #suffix>
              <a class="refresh-icon search-icon"></a>
            </template>
          </n-input>
          <n-flex class="bank-list">
            <n-flex align="center" class="bank-item" v-for="(item, index) in bkList" @click="selectBank(item)"
              :key="index">
              <span class="bank-l-icon">
                <img :src="`/img/bankIcon/bank_logo_${item.value}.webp`" :alt="item.label" />
              </span>
              <span class="bank-l-name"> {{ item.label }} </span>
            </n-flex>
          </n-flex>
        </div>
      </div>
    </n-card>
  </n-modal>

</template>


<script setup lang="ts">

import { onMounted, onUnmounted, ref } from 'vue';
import { NetPacket } from '@/netBase/NetPacket.ts';
import { Net } from '@/net/Net.ts';
import { MessageEvent2 } from '@/net/MessageEvent2.ts';
import { NetMsgType } from '@/netBase/NetMsgType.ts';
import { useI18n } from "vue-i18n";
import { TTabList } from "@/utils/types";
import { Message } from "@/utils/discreteApi.ts";
import pinia from '@/store';
import { BankListInfo } from '@/store/bankListInfo';
import { storeToRefs } from 'pinia';
// import { MessageMap } from '@/net/MessageMap.ts';

const BankListInfoStore = BankListInfo(pinia);
const bankListData = storeToRefs(BankListInfoStore);

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


const form = ref({
  bank: '',
  bankCode: '',
  bankName: '',
  accountName: props.myBankName,

})



const formRef = ref()
const submit = () => {
  if (!form.value.bank) {
    return Message.error(t('paymentManagement_page_chBank'))
  }

  if (!form.value.bankCode) {
    return Message.error(t('paymentManagement_page_chCardNo'))
  }

  if (!form.value.accountName) {
    return Message.error('请输入银行卡账户')
  }
  const req = NetPacket.req_new_bank_card_info();
  req.bank_id = form.value.bank;
  req.account_number = form.value.bankCode;
  req.cardholder_name = form.value.accountName;
  Net.instance.sendRequest(req);
}

// result: 2 // 1 成功，2 失败
const handleAddBankRef = (res: any) => {
  if (res.result === 1) {
    Message.success(t('paymentManagement_page_addBankSuc'))
    bankList.value.push({ ...form.value, name: '******' })
    flagBank(false)
  } else {
    Message.error(t('paymentManagement_page_addBankFail'))
  }
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

  if (key === 'isUse') {
    emit('bindBankCheck', data[index])
    openModal()
  } else {
    handleBankId(data[index])
  }

  // console.log(data[index], '--data[index][key]-');
};

const handleBankId = (params: any) => {
  const req = NetPacket.req_set_default_bankcard();
  req.bankcard = params.bank_id
  Net.instance.sendRequest(req);
}

const defaultBankId = (res: any) => {
  if (res.rlt === 1) {
    Message.error(t('已设为默认'))
  } else {
    Message.success(t('设置失败'))

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




const showBankModal = ref(false);

// 银行列表
const bkList = ref<TTabList>([...bankListData.bankList.value]);
const originBkList = ref<TTabList>([...bankListData.bankList.value]);

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





const chooseBank = ref({ label: '', value: '' }); // 选择的银行卡
// 选择银行
const selectBank = (e: any) => {
  form.value.bank = e.value;
  chooseBank.value = e;
  form.value.bankName = e.label;
  onCloseBank()
}



onMounted(() => {

  setBankList(props.myBankList)


  // 绑定银行卡
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_new_bank_card_info, handleAddBankRef);

  // 设置默认
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_req_set_default_bankcard, defaultBankId)
})

onUnmounted(() => {

  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_new_bank_card_info, null);

  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_req_set_default_bankcard, null)


})


defineExpose({
  openModal,
});

</script>

<style scoped lang="less">
@import '@/assets/CommonForm.less';


.deposit_modal {
  font-size: 16px;
  width: 650px !important;

  .body {
    gap: 15px !important;

    .bank-list {
      min-width: 492px;
      margin: 0 auto 30px;
      flex-wrap: nowrap !important;

      .bank-item {
        cursor: pointer;
        font-size: 14px;
        width: 403px;
        padding: 0 18px 0 18px;
        height: 90px;
        background: url(/img/payment/bankBg.webp) center no-repeat;
        background-size: 100%;
        flex-wrap: nowrap !important;

        .bank-l-icon {
          width: 54px;
          height: 54px;

          img {
            width: 54px;
            height: 54px;
          }

          //background-color: #ef1111;
          //margin-left: 18px;
        }

        .bank-l-name {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-left: 45px;

          .utilization-bank {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin-left: 8px;

            .btn-bank {
              width: 75px;
              height: 22px;
              border: none !important;
              font-size: 12px;
              color: rgba(192, 194, 219, 1);
              background-color: rgba(33, 16, 81, 1);

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
              margin-right: 10px;
            }

            p:nth-child(1) {
              span:nth-child(2) {
                margin-left: 10px;

                font-size: 14px;
              }
            }

            p:nth-child(2) {
              text-align: right;
              font-size: 18px;
              font-weight: 600;
            }
          }

          //max-width: 120px;
        }
      }
    }

    .bank-list-add {
      cursor: pointer;
      font-size: 14px;
      width: 403px;
      padding: 0 18px 0 18px;
      gap: 8px 12px;
      height: 90px;
      background-color: rgba(29, 14, 74, 1);
      box-shadow: 0 4.47px 4.47px 0 rgba(0, 0, 0, 0.25) inset;
      border: 3px solid rgba(78, 59, 153, 1);
      border-radius: 10px;

      .center {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        flex-direction: column;

        img {
          width: 30px;
          height: 30px;
        }

        span {
          margin-top: 6px;
          color: rgba(142, 130, 194, 1);
          font-size: 13px;
        }
      }
    }

    .bank-add-form {
      width: 403px;
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
          width: 250px;
          height: 38px;
          background: url(/img/payment/inputBg.webp) center no-repeat;
          background-size: 100%;

          .bank-cicon {
            width: 24px;
            height: 24px;
          }

          .bank-cname {
            width: 220px;
            line-height: 16px;
          }
        }

        .change-btn {
          display: inline-block;
          text-align: center;
          width: 90px;
          height: 36px;
          line-height: 36px;
          background: url(/img/payment/go-btn.webp) center no-repeat;
          background-size: 100%;
        }
      }

      .btn {
        color: #fff;
        height: 40px !important;
        width: 90px;
        font-size: 14px;
        background: url(/img/login/sendBtn.webp) no-repeat;
        background-size: contain;
      }

      .error {
        margin-top: 20px;
        text-align: center;

        img {
          width: 14px;
          height: 14px;
          margin-right: 4px;
          vertical-align: middle;
        }

        color: rgba(209, 99, 99, 1);
      }
    }

    .tips {
      margin-top: 20px;
      min-width: 374px;
      gap: 8px 12px;

      img {
        width: 12px;
        height: 12px;
        margin-right: 4px;
        vertical-align: middle;
      }

      span {
        color: rgba(142, 130, 194, 1);
        font-size: 11px;
      }

      //padding: 0 18px 0 18px;
    }

    .cz-btn {
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
        background: url(/img/payment/sub_btn.webp) center no-repeat;
        background-size: 100%;
      }
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

    .bank-list-item {
      width: 100%;

      a {
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  .body-sec {
    .refresh-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url(/img/payment/Vector.webp) center no-repeat;
      background-size: 100%;

      &.search-icon {
        background-image: url(/img/payment/search_icon.webp);
      }
    }

    .kjje-div {
      gap: 20px !important;

      .kj-item {
        width: 110px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: url(/img/payment/monBg.webp) center no-repeat;
        background-size: 100%;
      }
    }

    .btn_zone {
      margin: 10px auto;
    }

    .cz-tips {
      font-size: 12px;
      text-align: center;
      color: #D16363;

      .txt {
        color: #60D580;
        margin-bottom: 10px;
      }

      .tip {
        gap: 4px !important;

        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          background: url(/img/payment/error_icon.webp) center no-repeat;
          background-size: 100%;
        }
      }
    }

    .choose-bank {
      gap: 10px !important;

      .choose-bank-l {
        width: 270px;
        height: 38px;
        background: url(/img/payment/inputBg.webp) center no-repeat;
        background-size: 100%;

        .bank-cicon {
          width: 24px;
          height: 24px;
        }

        .bank-cname {
          width: 220px;
          line-height: 16px;
        }
      }

      .change-btn {
        display: inline-block;
        text-align: center;
        width: 90px;
        height: 36px;
        line-height: 36px;
        background: url(/img/payment/go-btn.webp) center no-repeat;
        background-size: 100%;
      }
    }

    // 选择银行
    .bank-list {
      width: 100%;
      gap: 20px 18px !important;
      max-height: 310px;
      overflow-y: auto;

      .bank-item {
        cursor: pointer;
        font-size: 14px;
        width: 176px;
        height: 46px;
        background: url(/img/payment/bankBg.webp) center no-repeat;
        background-size: 100%;

        &:active {
          transform: scale(.95);
        }

        .bank-l-icon {
          width: 28px;
          height: 28px;
          margin-left: 8px;

          img {
            width: 28px;
            height: 28px;
          }
        }

        .bank-l-name {
          //max-width: 120px;
        }
      }
    }

  }

}
</style>
@/netBase/NetPacket@/netBase/NetMsgType