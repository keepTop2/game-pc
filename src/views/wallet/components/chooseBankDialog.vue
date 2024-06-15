<template>
  <!-- 选择银行弹窗 -->
  <n-modal class="deposit_sm_modal" :show="showBankModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container vertical">
        <div class="header rel center">
          <span class="weight-5 t-md">{{ t('paymentManagement_page_chBank') }}</span>
          <span class="close abs center pointer t-sm">
              <iconpark-icon @click="onCloseBank" icon-id="Group39368" color="#fff" size="1.5em"></iconpark-icon>
          </span>
        </div>
        <div class="body vertical center t-md body-sec">
          <n-input size="large" @input="handleInput" :placeholder="t('deposit_page_inputBank')" >
            <template #suffix>
              <a class="refresh-icon search-icon"></a>
            </template>
          </n-input>
          <n-flex class="bank-list">
            <n-flex align="center" class="bank-item" v-for="(item, index) in bkList" @click="clickBank(item)" :key="index">
              <span class="bank-l-icon">
                 <img :src="`/img/bankIcon/bank_logo_${item.value}.webp`" :alt="item.label"/>
              </span>
              <span class="bank-l-name"> {{item.label}} </span>
            </n-flex>
          </n-flex>
        </div>
      </div>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
  import {onMounted, onUnmounted, ref} from 'vue';
  import {useI18n} from "vue-i18n";
  import {MessageEvent2} from "@/utils/net/MessageEvent2";
  import {NetMsgType} from "@/utils/netBase/NetMsgType";
  import {TTabList} from "@/utils/types";
  import {NetPacket} from "@/utils/netBase/NetPacket";
  import {Net} from "@/utils/net/Net";

  const emit = defineEmits(['selectBank']);
  const { t } = useI18n();
  const showBankModal = ref(false);
  // 银行列表
  const bkList = ref<TTabList>([]);
  const originBkList = ref<TTabList>([]);

  const onCloseBank = () => {
    showBankModal.value = !showBankModal.value
  }

  const getBankList = () => {
    const req = NetPacket.req_bank_name_list();
    Net.instance.sendRequest(req);
  }
  const handleBankList = (res: any) => {
    const resData = res.bank_name_list
    bkList.value = resData.map((bank: any) => ({ label: bank.bank_name, value: bank.bank_id }));
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
    onCloseBank();
    emit('selectBank', e)
  }

  onMounted(() => {
    getBankList();
    // 银行列表
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_req_bank_name_list, handleBankList);
  })
  onUnmounted(() => {
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_req_bank_name_list, null);
  })

  defineExpose({
    onCloseBank
  });

</script>

<style lang="less" scoped>
  @import '@/assets/CommonForm.less';

  // 选择银行
  .bank-list {
    width: 100%;
    gap: 20px 18px !important;
    max-height: 310px;
    overflow-y: auto;

    .bank-item {
      cursor: pointer;
      font-size: 14px;
      width: 177px;
      height: 46px;
      background: url(/img/payment/bankBg.webp) center no-repeat;
      background-size: 100%;

      &:active {
        transform: scale(.95);
      }
      .bank-l-icon {
        display: flex;
        width: 28px;
        height: 28px;
        margin-left: 8px;
        border-radius: 50%;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .bank-l-name {
        max-width: 120px;
      }
    }
  }

</style>
