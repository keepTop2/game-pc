<template>
  <!-- <Deposit v-if="showDeposit" />-->
  <n-modal class="deposit_modal" :show="showModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container vertical">
        <div class="header rel center">
          <span class="weight_5 t_md">{{ t('paymentManagement_page_information') }}</span>
          <span class="close abs center pointer t_sm">
            <iconpark-icon @click="onClose" icon-id="Group39368" color="#fff" size="1.5em"></iconpark-icon>
          </span>
        </div>

        <div class="body vertical center t_md">
          <n-flex justify="space-between" align="center" class="w_full" vertical>


            <div class="calibration-box">
              <n-flex class="submit-step" align="center" justify="center">
                <div v-for="(item) in stepTuple.stepUi" :key="item"
                  :class="['step-list', stepTuple.step >= item ? 'step-list-active' : '']">
                  <div class="step-indicator"><span>{{ item }}</span></div>
                  <div v-if="item !== 3" class="step-content">
                    <img
                      :src="stepTuple.step > item ? '/img/wallet/calibration_step_active.webp' : '/img/wallet/calibration_step.webp'"
                      alt="">
                  </div>
                </div>
              </n-flex>

              <div v-if="stepTuple.step === 1" class="item-list bank">
                <n-flex class="item-list-tips" justify="space-between" align="center">
                  <p>{{ t('paymentManagement_page_oneBank') }}</p>
                  <div class="tips-icon">
                    <img :src="!bankError ? '/img/wallet/addBankClose.webp' : '/img/wallet/fulfillment.webp'" alt="">
                  </div>
                </n-flex>

                <div class="bankForm" v-if="!bankError">
                  <n-form ref="formBankRef" :model="formBank" :rules="rules.bankRules" class="w_full choose-bank">
                    <n-form-item :label="t('addBank_page_pChooseBank')">
                      <n-flex class="choose-bank">
                        <n-flex align="center" class="choose-bank-l">
                          <span class="bank_cicon">
                            <img :src="`/img/bankIcon/bank_logo_${chooseBank.value}.webp`" :alt="chooseBank.label" />
                          </span>
                          <span class="bank_cname"> {{ chooseBank.label }} </span>
                        </n-flex>
                        <a class="change-btn" @click="showChangeBank"> {{ t('deposit_page_changeWay') }} </a>
                      </n-flex>
                    </n-form-item>

                    <n-form-item :label="t('addBank_page_bankCard')" path="cardNo">
                      <n-input size="large" v-model:value="formBank.cardNo" :placeholder="t('paymentManagement_page_chCardNo')">
                        <template #suffix>
                          <a class="refresh_icon"></a>
                        </template>
                      </n-input>
                    </n-form-item>
                    <n-form-item :label="t('addBank_page_name')" path="accountName">
                      <n-input size="large" :disabled="!!props.myBankList.cardholder_name"
                        v-model:value="formBank.accountName" :placeholder="t('paymentManagement_page_enterBank')">
                        <template #suffix>
                          <a class="refresh_icon"></a>
                        </template>
                      </n-input>
                    </n-form-item>
                  </n-form>

                  <!--                  <div class="cz_btn">-->
                  <!--                    <a @click="submitBank"> 确认 </a>-->
                  <!--                  </div>-->
                </div>

                <div class="cardItem bankCard" v-if="bankError">
                  <n-flex class="bank_list" justify="center">
                    <n-flex align="center" class="bank_item" justify="space-between">
                      <div class="bank_l_icon">
                        <img :src="`/img/bankIcon/bank_logo_${formBank.bank}.webp`" alt="nodata">
                      </div>
                      <div class="bank_l_name">
                        <p>
                          <span>{{ formBank.bankName }}</span>
                          <span>*******</span>
                        </p>
                        <p>{{ formatNumberString(formBank.cardNo + '') }}</p>
                      </div>
                    </n-flex>
                  </n-flex>
                </div>

              </div>


              <div v-if="stepTuple.step === 2" class="item-list info">
                <n-flex class="item-list-tips" justify="space-between" align="center">
                  <p>{{ t('paymentManagement_page_bindMobile') }}</p>
                  <div class="tips-icon">
                    <img :src="!phoneError ? '/img/wallet/addBankClose.webp' : '/img/wallet/fulfillment.webp'" alt="">
                  </div>
                </n-flex>

                <div class="phoneForm" v-if="!phoneError">

                  <n-form ref="formInfoRef" :model="formInfo" :rules="rules.infoRules">
                    <n-form-item :label="t('paymentManagement_page_phoneNum')" path="phone">
                      <n-popselect v-model:value="formInfo.codeValue" :options="codeOptions" @update:value="valueChange"
                        trigger="click">
                        <span class="code_box">
                          <span>+{{ formInfo.codeValue }}</span>
                          <iconpark-icon icon-id="Group39369" color="#8e82c2" size="1rem"></iconpark-icon>
                        </span>
                      </n-popselect>
                      <n-input clearable size="large" v-model:value="formInfo.phone" :placeholder="t('home_page_enterPhoneNumber')"></n-input>
                    </n-form-item>


                    <n-form-item :label="t('home_page_smsCode')" path="phoneCode">
                      <n-input clearable size="large" v-model:value="formInfo.phoneCode"
                        :placeholder="t('home_page_enterVerificationCode')"></n-input>
                      <n-button :bordered="false" :loading="phoneCodeLoading" @click="submitSendPhoneCode" class="btn"
                        :disabled="phoneCodeDisabled">{{ phoneCodeText }}
                      </n-button>
                    </n-form-item>
                  </n-form>
                  <!--                  <div class="cz_btn">-->
                  <!--                    <a @click="submitPhone"> 确认 </a>-->
                  <!--                  </div>-->
                </div>
                <div class="cardItem phoneCard" v-if="phoneError">
                  <n-flex class="bank_list">
                    <n-flex align="center" class="bank_item">
                      <div class="bank_l_icon">
                        <img src="/img/wallet/phone.webp" alt="nodata">
                      </div>
                      <div class="bank_l_name">
                        <p>
                          <span>+84</span>
                        </p>
                        <p>{{ maskNumberPhone(formInfo.phone) }}</p>
                      </div>
                    </n-flex>
                  </n-flex>
                </div>
              </div>


              <div v-if="stepTuple.step === 3" class="item-list capital">
                <n-flex class="item-list-tips" justify="space-between" align="center">
                  <p>{{ t('paymentManagement_page_setPayPwd') }}</p>
                  <div class="tips-icon">
                    <img :src="!capitalError ? '/img/wallet/addBankClose.webp' : '/img/wallet/fulfillment.webp'" alt="">
                  </div>
                </n-flex>

                <div class="capitalForm" v-if="!capitalError">
                  <n-form ref="formCapitalRef" :model="formCapital" :rules="rules.capital" class="w_full choose-bank">
                    <!-- 银行卡充值独有 -->
                    <n-form-item :label="t('paymentManagement_page_setPwd')" path="capitalPin">
                      <n-input size="large" v-model:value="formCapital.capitalPin" :placeholder="t('paymentManagement_page_plSetPayPwd')">
                        <template #suffix>
                          <a class="refresh_icon"></a>
                        </template>
                      </n-input>
                    </n-form-item>


                    <n-form-item :label="t('paymentManagement_page_repPwd')" path="capitalPinAgain">
                      <n-input size="large" v-model:value="formCapital.capitalPinAgain" :placeholder="t('home_page_secPwd')">
                        <template #suffix>
                          <a class="refresh_icon"></a>
                        </template>
                      </n-input>
                    </n-form-item>
                  </n-form>

                  <!--                  <div class="cz_btn">-->
                  <!--                    <a @click="submitCapital"> 确认 </a>-->
                  <!--                  </div>-->
                </div>


                <div class="cardItem" v-if="capitalError">
                  <p>
                    {{ t('paymentManagement_page_setFinish') }}
                  </p>
                </div>

              </div>


              <div class="cz_btn">
                <a @click="submitContent"> {{ stepTuple.step === 3 && capitalError ? t('paymentManagement_page_finish') : t('home_page_next') }} </a>
              </div>

            </div>


          </n-flex>

        </div>
      </div>
    </n-card>
  </n-modal>


  <!-- 选择银行弹窗 -->
  <ChooseBankDialog ref="chooseBankModal" @selectBank="selectBank" />

</template>

<script setup lang="ts">
import { defineAsyncComponent, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import { TTabList } from '@/utils/types';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
import { verifyMobile, verifyPhoneCaptcha, verifyWithdrawPwd } from '@/utils/is.ts';
import { Message } from '@/utils/discreteApi.ts';
import { storeToRefs } from 'pinia';
import pinia from '@/store';
import { User } from '@/store/user';

import { aaa, bbb, getDeviceId, getRandomSign } from '@/net/Utils.ts';
import { needLoginApi } from '@/utils/storage.ts';
import { IP } from '@/utils/others.ts';

const ChooseBankDialog = defineAsyncComponent(() => import('../components/chooseBankDialog.vue'));

const UserStore = User(pinia);
const { info: userInfo, roleInfo } = storeToRefs(UserStore);
import { Page } from '@/store/page';
const { bankListInfo } = storeToRefs(Page(pinia));

const chooseBankModal = ref();

const props = defineProps({
  myBankList: {
    type: Object,
    default: () => {
    },
  },
});

const { t } = useI18n();
const showModal = ref(false);

const stepTuple = ref({
  step: 1,
  stepUi: [1, 2, 3],

}); // 步骤


// 银行列表
const bkList = ref<TTabList>([...bankListInfo.value]);
const chooseBank = ref({ label: '', value: '' }); // 选择的银行卡


const openModal = () => {
  showModal.value = !showModal.value;
  nextTick(() => {
    getInfo();
  });
};
const onClose = () => {
  showModal.value = false;
};


const formBank = ref( // 存款表单提交
  {
    bank: '',
    bankName: '',
    cardNo: '',
    accountName: '',
  },
);

const formInfo = ref({
  codeValue: '84',
  phone: '',
  phoneCode: '',
});

const formCapital = ref({
  capitalPin: '',
  capitalPinAgain: '',
});


const codeOptions = [
  {
    label: '84',
    value: '84',
  },
];
const valueChange = (item: any) => {
  console.log(item);

};


const phoneCodeLoading = ref(false);
const phoneCodeDisabled = ref(true);
const phoneCodeText = ref<string | number>(t('home_page_send'));
const submitSendPhoneCode = () => {
  phoneCodeLoading.value = true;
  const req = NetPacket.req_get_mobile_sms_code();
  req.mobile = formInfo.value.codeValue + formInfo.value.phone;
  req.operate_type = 1;
  Net.instance.sendRequest(req);
};

// // 返回手机验证码是否发送
const handleSMSback = (res: any) => {
  phoneCodeLoading.value = false;
  if (res.code == 1) {
    if (res.message) {
      Message.success(t(res.message));
    }
    let timer = 60;
    phoneCodeDisabled.value = true;
    phoneCodeText.value = timer;
    let timeInterval = setInterval(() => {
      phoneCodeText.value = timer--;
      if (timer <= 0) {
        clearInterval(timeInterval);
        phoneCodeDisabled.value = false;
        phoneCodeText.value = t('home_page_send');
      }
    }, 1000);
  } else {
    phoneCodeDisabled.value = false;
  }
};


// 下一步按钮
const submitContent = () => {

  // 判断是否绑定银行卡

  if (stepTuple.value.step === 3 && capitalError.value) {
    Message.success(t('paymentManagement_page_withCompleted'));
  }

  if (bankError.value) {
    stepTuple.value.step = 2;
  } else {
    return submitBank();
  }

  if (phoneError.value) {
    stepTuple.value.step = 3;
  } else {
    return submitPhone();
  }


  if (capitalError.value) {
    openModal();
  } else {
    return submitCapital();
  }


};

const bankError = ref(false);

// 添加银行信息
const formBankRef = ref();
const submitBank = () => {
  if (!formBank.value.bank) return Message.error(t('paymentManagement_page_chBank'));
  formBankRef.value?.validate((errors: any) => {
    if (!errors) {
      const req = NetPacket.req_new_bank_card_info();
      req.bank_id = formBank.value.bank;
      req.account_number = formBank.value.cardNo;
      req.cardholder_name = formBank.value.accountName;
      Net.instance.sendRequest(req);
    } else {
      console.log(errors);
    }
  });
};

// result: 2 // 1 成功，2 失败
const handleAddBank = (res: any) => {
  if (res.result === 1) {
    bankError.value = true;
    stepTuple.value.step = 2;
    Message.success(t('paymentManagement_page_addBankSuc'));
  } else {
    Message.error(t('paymentManagement_page_addBankFail'));
  }
};


// 字符串判断
const formatNumberString = (input: string): string => {
  // 空字符串判断
  if (!input || input.length <= 4) {
    return '**** **** **** ****';
  }

  // 移除所有非数字字符
  const digitsOnly = input.replace(/\D/g, '');

  // 计算星号的数量，确保至少有4组
  const starsCount = 4 - Math.ceil(digitsOnly.length / 4);

  // 生成星号字符串
  const stars = '****'.repeat(starsCount);

  // 将数字字符串分割成四部分
  let parts = [];
  for (let i = 0; i < digitsOnly.length; i += 4) {
    parts.push(digitsOnly.substring(i, i + 4));
  }

  // 如果数字不足16位，补齐前面的星号
  if (digitsOnly.length < 16) {
    parts.unshift(stars);
  }

  // 确保最后一部分是原始字符串的最后四位
  if (digitsOnly.length > 4) {
    parts[parts.length - 1] = digitsOnly.substring(digitsOnly.length - 4);
  }

  // 将分割后的字符串和星号组合
  return parts.join(' ');
};

const phoneError = ref(false);

const formInfoRef = ref();
const submitPhone = () => {
  // phoneError.value = true;
  formInfoRef.value?.validate(async (errors: any) => {
    if (!errors) {
      let req = NetPacket.req_bind_modify_email();
      req.email = formInfo.value.codeValue + formInfo.value.phone;
      req.username = userInfo.value?.full_name;
      req.captcha = formInfo.value.phoneCode;
      req.operate_type = 3;
      req.agent_id = roleInfo.value.id; //Local.get('agentid')
      req.aaa = aaa;
      req.bbb = bbb;
      // req.ip = await IP();
      req.ip = await IP();
      let id = await getDeviceId();
      req.sign = getRandomSign(id);
      Net.instance.sendRequest(req);

      // phoneError.value = true;

    } else {
      console.log(errors);
    }
  });
};

const maskNumberPhone = (numStr: string): string => {
  // 首先，我们找到第一个非数字字符的位置，如果没有，则认为是字符串的末尾
  const firstNonDigitIndex = numStr.search(/\D/);

  // 如果没有非数字字符，我们只保留前三个数字，其余用星号替换
  if (firstNonDigitIndex === -1) {
    return numStr.substring(0, 3) + '****' + numStr.substring(numStr.length - 1);
  }

  // 如果有非数字字符，我们保留第一个数字和最后一个非数字字符之间的部分
  const firstPart = numStr.substring(0, firstNonDigitIndex);
  const lastPart = numStr.substring(firstNonDigitIndex);
  //
  // // 计算需要用星号替换的部分的长度
  // const maskLength = numStr.length - (firstPart.length + lastPart.length);

  // 返回格式化后的字符串
  return firstPart + '****' + lastPart;
};


// 返回是否绑定成功--手机号
const handleChangeEmail = (res: any) => {
  if (res.code == 1) {
    Message.success(t(res.message));
    needLoginApi();
    setTimeout(() => {
      phoneError.value = true;
      stepTuple.value.step = 2;
    }, 3000);
  }
};


const capitalError = ref(false);
const formCapitalRef = ref();
//  绑定资金Form
const submitCapital = () => {
  formCapitalRef.value?.validate(async (errors: any) => {
    if (!errors) {
      bindMoneyPassword();
    } else {
      console.log(errors);
    }
  });

};

// 绑定资金密码
const bindMoneyPassword = () => {
  let req = NetPacket.req_bind_or_modify_withdraw_password();
  req.operate_type = 1;
  req.old_password = '';
  req.new_password = formCapital.value.capitalPin;
  req.role_id = roleInfo.value?.id;
  req.new_password_confirm = formCapital.value.capitalPinAgain;
  Net.instance.sendRequest(req);
};

const handleBindOrModifyWithdrawPassword = (res: any) => {
  if (res.code == 1) {
    Message.success(t(res.message));
    capitalError.value = true;
    Message.success(t('paymentManagement_page_withCompleted'));
    stepTuple.value.step = 1;
    openModal();
    needLoginApi();
  }
};

const rules = {
  bankRules: {
    cardNo: {
      required: true,
      message: t('paymentManagement_page_chCardNo'),
      trigger: 'input',
    },
    accountName: {
      required: true,
      message: t('paymentManagement_page_enterBank'),
      trigger: 'input',
    },
  },
  infoRules: {
    phone: [
      {
        required: true,
        validator: () => {
          if (verifyMobile(formInfo.value.codeValue, formInfo.value.phone)) {
            phoneCodeDisabled.value = false;
            return true;
          } else {
            phoneCodeDisabled.value = true;
            return false;
          }
        },
        message: t('home_page_phoneNumberFormatIncorrect'),
        trigger: 'input',
      },
    ],

    phoneCode: [
      {
        required: !0,
        trigger: 'blur',
        validator: (rule: any, value: string) => {
          if (!value) {
            return new Error(t('home_page_enterSmsCode'));
          } else if (verifyPhoneCaptcha(rule, value)) {
            return true;
          } else {
            return new Error(t('home_page_smsCodeFormatIncorrect'));
          }
        },


      },
    ],
  },

  capital: {
    capitalPin: [
      {
        required: !0,
        trigger: 'blur',
        validator: (rule: any, value: string) => {
          if (!value) {
            return new Error(t('home_page_enterOldPassword'));
          } else if (verifyWithdrawPwd(rule, value)) {
            return true;
          } else {
            return new Error(t('home_page_passwordFormatIncorrect'));
          }
        },


      },
    ],

    capitalPinAgain: [
      {
        required: !0,
        trigger: 'blur',
        validator: (rule: any, value: string) => {
          if (!value) {
            return new Error(t('home_page_enterAgainNewPassword'));
          } else if (verifyWithdrawPwd(rule, value)) {
            return true;
          } else {
            return new Error(t('home_page_passwordFormatIncorrect'));
          }
        },

      },
    ],
  },
};


// 更换银行弹窗
const showChangeBank = () => {
  chooseBankModal.value.onCloseBank();
};

// 选择银行
const selectBank = (e: any) => {
  formBank.value.bank = e.value;
  formBank.value.bankName = e.label;
  // formBank.accountName
  chooseBank.value = e;
};


// 获取已绑定的银行账号
const getInfo = () => {

  console.log(props.myBankList.cardholder_name, '---props.myBankList--');
  formBank.value.accountName = props.myBankList.cardholder_name || '';

  // 未绑定银行卡跳转到绑定银行卡`
  if (props.myBankList.bank_card_info_list && props.myBankList.bank_card_info_list.length) {
    const { account_number, bank_id } = props.myBankList.bank_card_info_list[0];
    formBank.value.bank = bank_id;
    formBank.value.cardNo = account_number;
    // formBank.value.accountName = bank_name
    bankError.value = true;
    let bankInfoItem = (bkList.value || []).find(item => item.value === bank_id);
    formBank.value.bankName = bankInfoItem?.label || '';
  }

  formInfo.value.phone = userInfo.value.mobile || '';

  phoneError.value = Boolean(userInfo.value.mobile);


  capitalError.value = Boolean(roleInfo.value.withdraw_pwd);

};


onMounted(() => {


  // 绑定手机号
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_bind_modify_email, handleChangeEmail);

  // 发送验证码
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_get_mobile_sms_code, handleSMSback);

  // 绑定资金密码
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_bind_or_modify_withdraw_password, handleBindOrModifyWithdrawPassword);

  // 绑定银行卡
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_new_bank_card_info, handleAddBank);


});


onUnmounted(() => {

  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_get_mobile_sms_code, null);

  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_bind_modify_email, null);
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_bind_or_modify_withdraw_password, null);

});

defineExpose({
  openModal,
});

</script>

<style lang="less" scoped>
@import '@/assets/CommonForm.less';

.deposit_modal {
  font-size: 16px;
  width: 650px !important;

  .body {
    gap: 15px !important;

    .calibration-box {
      .submit-step {
        margin-bottom: 20px;

        .step-list {
          display: flex;
          align-items: center;

          .step-indicator {
            width: 70px;
            height: 70px;
            line-height: 70px;
            text-align: center;
            font-size: 24px;
            font-weight: 400;
            color: rgba(142, 130, 194, 1);
            background: url("/img/wallet/calibration_decide.webp") no-repeat;
            background-size: cover;
          }

          .step-content {
            margin: 0 30px;
          }
        }

        .step-list-active {
          .step-indicator {
            background: url("/img/wallet/calibration_decide_active.webp") no-repeat;
            background-size: cover;
            color: #ffffff;
          }
        }
      }
    }

    .item-list {
      min-width: 414px;
      //width: 100% !important;
      padding: 17px 20px;
      border-radius: 15px;
      background-color: rgba(0, 0, 0, 0.25);

      .choose-bank {
        gap: 10px !important;

        .choose-bank-l {
          width: 270px;
          height: 38px;
          background: url(/img/payment/inputBg.webp) center no-repeat;
          background-size: 100%;

          .bank_cicon {
            width: 24px;
            height: 24px;
          }

          .bank_cname {
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

      .error {
        margin-top: 20px;
        text-align: center;
        color: rgba(209, 99, 99, 1);
      }

      .cardItem {
        margin: 0 auto;

        .bank_list {
          width: 100%;
          gap: 20px 18px !important;
          max-height: 310px;
          overflow-y: auto;

          .bank_item {
            //cursor: pointer;
            font-size: 14px;
            width: 374px;
            height: 80px;
            background: url(/img/payment/bankBg.webp) center no-repeat;
            background-size: 100%;

            //&:active {
            //  transform: scale(.95);
            //}
            .bank_l_icon {
              width: 48px;
              height: 48px;
              margin-left: 14px;
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                width: 100%;
                height: 100%;
                //margin-left: 18px;
              }
            }

            .bank_l_name {
              p {
                margin-right: 17px;
              }

              p:nth-child(1) {
                span:nth-child(2) {
                  margin-left: 60px;
                  font-size: 14px;
                }
              }

              p:nth-child(2) {
                text-align: right;
                font-size: 16px;
                font-weight: 600;
              }

              //max-width: 120px;
            }
          }
        }
      }

    }


    .info {
      .code_box {
        width: 94px;
      }

      .btn {
        color: #fff;
        height: 40px !important;
        width: 90px;
        font-size: 14px;
        background: url(/img/login/sendBtn.webp) no-repeat;
        background-size: contain;
      }

      .phoneCard {
        .bank_l_name {
          margin-left: 29px;
        }
      }
    }

    .capital {
      .cardItem {
        width: 374px;
        height: 39px;
        line-height: 39px;
        border-radius: 8px;
        background: radial-gradient(87.04% 93.77% at 50% 13.97%, #4C36B3 0.17%, #3A2786 74.42%, #3C279A 100%);

        p {
          text-align: center;
          color: rgba(13, 210, 122, 1);
          font-size: 16px;
        }
      }

    }


    .cz_btn {
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
</style>
