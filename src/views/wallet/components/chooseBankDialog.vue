<template>
  <!-- 选择银行弹窗 -->
  <n-modal class="deposit_sm_modal" :show="showBankModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container vertical">
        <div class="header rel center">
          <span class="weight_5 t_md">{{ t('paymentManagement_page_chBank') }}</span>
          <span class="close abs center pointer t_sm">
            <iconpark-icon @click="onCloseBank" icon-id="Group39368" color="#fff" size="1.5em"></iconpark-icon>
          </span>
        </div>
        <div class="body vertical center t_md body_sec">
          <n-input size="large" @input="handleInput" :placeholder="t('deposit_page_inputBank')">
            <template #suffix>
              <a class="refresh_icon search_icon"></a>
            </template>
          </n-input>
          <n-flex class="bank_list">
            <n-flex align="center" class="bank_item" v-for="(item, index) in bkList" @click="clickBank(item)"
              :key="index">
              <span class="bank_l_icon">
                <img :src="`/img/bankIcon/bank_logo_${item.value}.webp`" :alt="item.label" />
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
import { onMounted, ref, watch } from 'vue';
import { useI18n } from "vue-i18n";
import { TTabList } from "@/utils/types";
import { storeToRefs } from "pinia";
import pinia from "@/store";
import { Page } from '@/store/page';

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
const page = Page(pinia);
const { bankListInfo } = storeToRefs(page);
const showBankModal = ref(false);
// 银行列表
const bkList = ref<any>([]);
const originBkList = ref<TTabList>([]);

const onCloseBank = () => {
  showBankModal.value = !showBankModal.value
}

const handleBankList = () => {
  if (props.isDepositBank) { // 充值
    bkList.value = [...props.bankAllList];
  } else { // 其他 绑定银行，提现等
    bkList.value = [...bankListInfo.value];
  }
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

watch(
  () => bankListInfo.value,
  (n) => {
    console.log('999999', n)
    handleBankList();
  },
  {
    deep: true,
  }
)
watch(
  () => showBankModal.value,
  (n) => {
   if (n) {
     bkList.value = [...originBkList.value]
   }
  }
)


onMounted(() => {
  handleBankList();
})

defineExpose({
  onCloseBank
});

</script>

<style lang="less" scoped>
@import '@/assets/CommonForm.less';

// 选择银行
.bank_list {
  width: 100%;
  min-width: 492px;
  margin: 0 auto;
  gap: 20px 18px !important;
  max-height: 310px;
  overflow-y: auto;

  .bank_item {
    cursor: pointer;
    font-size: 14px;
    width: 176px;
    height: 46px;
    background: url(/img/payment/bankBg.webp) center no-repeat;
    background-size: 100%;

    &:active {
      transform: scale(.95);
    }

    .bank_l_icon {
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

    .bank_l_name {
      max-width: 120px;
    }
  }
}
</style>
