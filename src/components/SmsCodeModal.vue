<template>
    <ModalDialog v-model:visible="showModa" title="home_page_smsTitle">
        <template #content>
            <div class="model_box level_manage">
                <div class="model_box_content content">
                    <div class="tips">
                        <p>{{ t('home_page_smsContent') }}<b>{{ t('home_page_smsPrice') }}</b>{{ t('home_page_smsContent1')
                            }}</p>
                    </div>
                    <div class="btns">
                        <div class="btn n-button" @click="submitEvent">{{ t('home_page_confirm') }}</div>
                    </div>
                    <div class="tips2">
                        <p>
                            {{ t('home_page_smsContent2') }}
                            <span @click="router.push('/wallet/walletInfo')"><b>{{
                                t('home_page_smsGoWallet') }}</b></span>
                            {{ t('home_page_smsContent3') }}
                        </p>
                    </div>
                </div>
            </div>
        </template>
    </ModalDialog>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import ModalDialog from '@/components/ModalDialog.vue';
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

b {
    color: yellow;
}

.model_box_content {
    padding: 0 20px 30px 20px;

    .btns {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .btn {
            width: 80%;
            height: 40px;
            text-align: center;
            font-size: 18px;
            color: #EBEFFF;
            cursor: pointer;
            margin-left: 0;
        }

    }

    .tips2 {
        width: 80%;
        font-size: 14px;
        margin: auto;
    }
}
</style>