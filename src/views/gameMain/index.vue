<template>
    <div class="home">
        <Sidebar />
        <div class="content">
            <div class="head">
                <img src="/img/home/back.webp" alt="" @click="router.push('/')">
                <span>{{ getTitle }}</span>
            </div>
            <router-view></router-view>

        </div>
    </div>
</template>

<script setup lang='ts'>
import { computed, onMounted, reactive, watch } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { Page } from '@/store/page';
import pinia from '@/store';

const { t } = useI18n();
const { lang } = storeToRefs(Page(pinia));
const router = useRouter();
const route = useRoute();
const state: any = reactive({
    titles: {},
})
onMounted(async () => {
    const { data } = route.query
    const query = JSON.parse(decodeURIComponent(data as string))
    if (Object.keys(query.name).length) {
        state.titles = query.name
    }
});
watch(
    () => route.query.name,
    async (n: any) => {
        if (n) {
            state.title = route.query.name
        }
    }
)

const getTitle = computed(() => {
    const langs: any = {
        zh: 'zh-CN',
        vn: 'vi-VN',
        en: 'en-US',
    };
    return state.titles[langs[lang.value]]
})
</script>

<style lang='less' scoped>
.home {
    display: flex;
}

.content {
    margin: 32px 0 30px 90px;
    width: 1200px;

    >.head {
        height: 45px;
        line-height: 45px;
        position: relative;
        text-align: center;
        color: #fff;
        border-radius: 12px;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.39), 0 2px 2px 0 rgba(0, 0, 0, 0.34), 0 5px 3px 0 rgba(0, 0, 0, 0.2), 0 8px 3px 0 rgba(0, 0, 0, 0.06), 0 13px 3px 0 rgba(0, 0, 0, 0.01);
        background-image: radial-gradient(#4c36b3 0%, #3a2786 5%, #3c279a 7%);
        font-size: 20px;

        >img {
            width: 32px;
            height: 32px;
            position: absolute;
            top: 7px;
            left: 8px;
            cursor: pointer;
        }
    }

}
</style>