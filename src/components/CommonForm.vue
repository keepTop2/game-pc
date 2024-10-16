<template>
    <n-modal class="tips_sm_modal" :show="showForm" :mask-closable="false">
        <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <div class="form_container vertical">
                <div class="header rel center">
                    <span class="weight_5 t_md">{{ title }}</span>
                    <span class="close abs center pointer t-sm">
                        <iconpark-icon @click="emits('onClose')" icon-id="tanctongyguanb" color="#fff"
                            size="1rem"></iconpark-icon>
                    </span>
                </div>
                <div class="body_box vertical center t_md">
                    <div v-if="tabList?.length && curShowTab" class="tab center">
                        <span :class="activeTab === value ? 'pointer active' : 'pointer'"
                            v-for="({ label, value }) in tabList" :key="value" @click="emits('changeTab', value)">
                            {{ label }}
                        </span>
                    </div>
                    <n-form :model="form.data" :rules="form.rules" :show-label="true" ref="formRef" class="w_full">
                        <template v-for="item in form.fields">
                            <n-form-item v-if="(!item.view || activeTab === item.view) && item.otherCond !== false"
                                :label="t(`${item.label}`)" :path="item.name">

                                <n-select v-if="item.hasPop && item.inputFilter"
                                    :placeholder="item.placeholder && t(`${item.placeholder}`)"
                                    v-model:value="form.data[item.name]" :options="item.opts" filterable
                                    @click="emits('selectAction', item.name)" />
                                <n-select v-if="item.hasPop && !item.inputFilter"
                                    :placeholder="item.placeholder && t(`${item.placeholder}`)"
                                    v-model:value="form.data[item.name]" :options="item.opts"
                                    @click="emits('selectAction', item.name)" />

                                <n-flex v-if="!item.hasPop && item.name === 'bank'" align="center"
                                    class="choose-bank-l">
                                  <n-input
                                           :type="item.type || 'text'" size="large" v-model:value="item.chooseBank.label"
                                           :disabled="item?.disabled"
                                           :placeholder="item.placeholder ? t(`${item.placeholder}`) : ''" >
                                    <template #suffix>
                                      <iconpark-icon icon-id="fangxiangicon02" color="#fff" size="1.5rem"></iconpark-icon>
                                    </template>
                                  </n-input>
                                </n-flex>

                                <n-input v-if="!item.hasPop && item.name !== 'bank'" clearable
                                    :type="item.type || 'text'" size="large" v-model:value="form.data[item.name]"
                                    :disabled="item?.disabled"
                                    :placeholder="item.placeholder ? t(`${item.placeholder}`) : ''" />

                                <n-button v-if="item?.showRight" :bordered="false" :loading="item?.loading"
                                    :disabled="item.disabledBtn" class="change-btn" @click="emits('onSubmitSec', item)">
                                    {{ t(item?.btnText) }}
                                </n-button>

                            </n-form-item>
                        </template>
                    </n-form>
                    <div class="btn_zone flex w_full">
                        <n-flex align="center" justify="center" v-if="cancel" class="button cancel_btn weight_5 pointer" block
                            @click="emits('onCancel')">{{ cancel }}</n-flex>
                        <n-flex align="center" justify="center" :class="!!cancel && 'fixed_bg'" class="button_color button submit_btn weight_5 pointer"
                            block @click="emits('onSubmit')">
                            {{ submitText }}
                        </n-flex>
                    </div>

<!--                    <n-flex v-if="showMyBank?.show" align="center" class="bottom-tip">
                        <span class="gth-icon"></span>
                        {{ t('paymentManagement_page_max_bank', { num: showMyBank.length || 0 }) }}
                    </n-flex>-->

                </div>
            </div>
        </n-card>
    </n-modal>
</template>

<script setup lang="ts">
import { TForm, TTabList } from '@/utils/types/formTypes';
import { onMounted, ref } from 'vue';
import { useI18n } from "vue-i18n";
// import Imgt from '@/components/Imgt.vue';

const props = defineProps<{
    title: string;
    submitText: string;
    formRef: string;
    tabList?: TTabList;
    activeTab?: number;
    form: TForm;
    showForm: boolean;
    cancel?: string;
    showTab?: boolean;
    showMyBank?: any;
}>();
const { t } = useI18n();
const curShowTab = ref(true); // 是否显示切换标签
const emits = defineEmits(["changeTab", "onClose", "onSubmit", "onSubmitSec", "onCancel", 'selectAction', 'updateFormRef']);
const formRef = ref(null);
onMounted(() => {
    if (props.showTab === false) {
        curShowTab.value = false
    }
    emits('updateFormRef', formRef.value);
});
</script>

<style lang="less" scoped>
@import '@/assets/CommonForm.less';
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
</style>
