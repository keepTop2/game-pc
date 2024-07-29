<template>
    <n-modal v-model:show="showModa" preset="card" style="width: 40%;" :mask-closable="false" @close="openDialog">
        <template #header>
            <div class="forget_title">{{ t('home_page_smsTitle') }}</div>
        </template>
        <div class="tips">
            <p>{{ t('home_page_smsContent') }}<b>{{ t('home_page_smsPrice') }}</b>{{ t('home_page_smsContent1') }}</p>
            <p>{{ t('home_page_smsContent2') }} <span @click="router.push('/wallet/walletInfo')">{{
        t('home_page_smsGoWallet')
    }}</span> {{ t('home_page_smsContent3') }}</p>
            <n-button class="btn_block" :bordered="false" block @click="submitEvent"> {{ t('home_page_confirm')
                }}</n-button>
        </div>

    </n-modal>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
const emit = defineEmits(['submitEvent',]);
const { t } = useI18n();
const router = useRouter();
const showModa = ref(false)
const openDialog = () => {
    showModa.value = true
}
const closeDialog = () => {
    showModa.value = false
}
const submitEvent = () => {
    emit('submitEvent');
}
defineExpose({
    openDialog,
    closeDialog,
});
</script>

<style lang='less' scoped>
.tips {
    p {
        >b {
            color: yellow;
        }

        >span {
            color: red;
            cursor: pointer;
        }
    }
}
</style>