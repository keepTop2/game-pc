<template>
    <n-modal v-model:show="regPopShow" :mask-closable="false">
        <div class="reg_pop">
            <img src="/img/login/regPop.webp" alt="regPop">
            <div>
                <n-button :bordered="false" block class="leave" @click="leave">{{
                    t('home_page_leave')
                    }}</n-button>
                <n-button :bordered="false" block class="login_btn" @click="experience">{{
                    t('home_page_experience')
                    }}</n-button>
            </div>

        </div>
    </n-modal>
</template>

<script setup lang='ts'>
// import { onMounted, reactive } from 'vue';
import { useI18n } from "vue-i18n";
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { User } from '@/store/user';
const userInfo = User(pinia);
const { regPopShow } = storeToRefs(userInfo);
const { t } = useI18n();
const leave = async () => {
    await User(pinia).setRegPopShow(false)
}
const experience = async () => {
    await User(pinia).setRegPopShow(false)
}
</script>

<style lang='less' scoped>
.reg_pop {
    width: 1124px;

    >img {
        width: 100%;
        height: 472px;
    }

    >div {
        width: 360px;
        margin: 50px auto 0;
        display: flex;
        justify-content: space-between;

        >button {
            width: 160px;
            height: 40px;
        }

        .leave {
            background: #212443;
        }
    }
}
</style>