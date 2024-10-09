<template>
    <n-modal :show="showDialogTransfer" :mask-closable="false">
        <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <n-spin :show="transferLoading">
                <div class="form_container vertical">
                    <div class="header rel center">
                        <span class="weight_5 t_md">{{ t(ETransfer[showTransfer.method]) }}</span>
                        <span class="close abs center pointer t_sm">
                            <iconpark-icon @click="onClose" icon-id="tanctongyguanb" color="#fff"
                                size="1rem"></iconpark-icon>
                        </span>
                    </div>
                    <div class="body vertical center t_md">
                        <div class="amount_info flex rel">
                            <div class="vertical tab between_center weight_5">
                                <div> {{ t('transfer_page_from') }}</div>
                                <div>{{ t('transfer_page_to') }}</div>
                            </div>
                            <div class="vertical info">
                                <div class="flex vertical center_start">
                                    <span class="wallet">{{ t(EAllWallets[showTransfer.from]) }}</span>
                                    <span class="amount">{{ t('transfer_page_existing') }} {{ fromMoney }}</span>
                                </div>
                                <div class="flex vertical center_start">
                                    <span class="wallet">{{ t(EAllWallets[showTransfer.to]) }}</span>
                                    <span class="amount">{{ t('transfer_page_existing') }} {{ toMoney }}</span>
                                </div>
                            </div>
                            <div class="center abs pointer change_method" @click="changeMethod">
                                <iconpark-icon icon-id="qiehuan11" size="1.5rem"></iconpark-icon>
                            </div>
                        </div>
                        <n-form :model="{ amount }" :show-label="true" ref="formRef" class="w_full">
                            <n-form-item :label="t('transfer_page_amount')" path="amount" class="rel">
                                <n-input type="text" size="large" v-model:value="amount"
                                    :placeholder="t('transfer_page_inputAmount')" />
                                <div class="abs pointer select_total" @click="selectTotal">{{
                                    t('transfer_page_allMoney') }}</div>
                            </n-form-item>
                        </n-form>
                        <div class="submit_btn  weight_5 center pointer" block @click="onSubmit">
                            {{ t('withdraw_page_withdrawNow') }}</div>
                    </div>
                </div>
            </n-spin>
        </n-card>
    </n-modal>
</template>

<script setup lang="ts">
import { EAllWallets } from '@/enums/walletEnum';
import useTransfer from './useTransfer';
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { transferLoading, showDialogTransfer, showTransfer, ETransfer, amount, onClose, onSubmit, changeMethod, selectTotal, fromMoney, toMoney } = useTransfer()

</script>

<style src="./style.less" lang="less" scoped></style>
