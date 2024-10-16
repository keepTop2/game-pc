<template>
    <div class="home">
        <!-- <Sidebar /> -->
        <div class="content">
            <!-- <div class="head">
                <Imgt src="/img/home/back.webp" alt="" @click="router.push('/')" />
                <span v-if="state.name">{{ t(state.name) }}</span>
                <span v-else>{{ getTitle }}</span>
            </div> -->
            <router-view></router-view>

        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, watch } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import { useRoute } from 'vue-router';
// import { useI18n } from 'vue-i18n';
// import { storeToRefs } from 'pinia';
// import { Page } from '@/store/page';
// import pinia from '@/store';
// import Imgt from '@/components/Imgt.vue';

// const { t } = useI18n();
// const { lang } = storeToRefs(Page(pinia));
// const router = useRouter();
const route = useRoute();
const state: any = reactive({
    titles: {},
    name: ''
})

watch(
    () => route.query.name,
    () => {
        queryTitle()
    }
)

onMounted(() => {
    queryTitle()
});

// const getTitle = computed(() => {
//     const langs: any = {
//         zh: 'zh-CN',
//         vn: 'vi-VN',
//         en: 'en-US',
//     };
//     const title = state.titles[langs[lang.value]]
//     return title
// })

const queryTitle = () => {
    const { name } = route.query
    state.name = name
}
</script>

<style lang='less' scoped>
.home {
    display: flex;
    background: url('/img/game/bg.webp');
    background: cover;
}

.content {
    // margin: 32px 0 30px 20px;
    // width: 1400px;

    // >.head {
    //     height: 45px;
    //     line-height: 45px;
    //     position: relative;
    //     text-align: center;
    //     color: #fff;
    //     border-radius: 12px;
    //     box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.39), 0 2px 2px 0 rgba(0, 0, 0, 0.34), 0 5px 3px 0 rgba(0, 0, 0, 0.2), 0 8px 3px 0 rgba(0, 0, 0, 0.06), 0 13px 3px 0 rgba(0, 0, 0, 0.01);
    //     background-image: radial-gradient(#4c36b3 0%, #3a2786 5%, #3c279a 7%);
    //     font-size: 20px;

    //     >img {
    //         width: 32px;
    //         height: 32px;
    //         position: absolute;
    //         top: 7px;
    //         left: 8px;
    //         cursor: pointer;
    //     }
    // }

}
</style>
