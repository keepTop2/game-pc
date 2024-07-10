<template>
    <div class="activity">
        <div class="activity_img">
            <img @click="popDetail(item)" v-for="(item, i) in activityTitleList[state.name]" :key="i"
                :src="t(String(activityDetail(String(item.name))))" alt="">
        </div>
        <n-modal v-model:show="state.showModal">
            <n-card :title="t('activity_page_detail')" closable @close="state.showModal = false" :bordered="false"
                size="huge" role="dialog" aria-modal="true">
                <img v-if="state.detailImg" :src="t(state.detailImg)" alt="">
            </n-card>
        </n-modal>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, watch } from 'vue';

import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Page } from '@/store/page';
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
const { activityTitleList } = storeToRefs(Page(pinia));
const { t } = useI18n();
// const router = useRouter();
const route = useRoute();
const activityDetail = (item: string) => {
    let str1 = item.split('_')
    let str2
    if (str1.length > 0) {
        str2 = str1[0] + '_pc_' + str1[1] + '_' + str1[2]
    }
    return str2
}

const state: any = reactive({
    name: '',
    link: '',
    showModal: false,
    detailImg: null,
})
const popDetail = (item: any) => {
    state.detailImg = null
    state.showModal = true
    state.detailImg = activityDetail(item.content)
}

onMounted(() => {
    state.name = route.query.typeName
});

watch(
    () => route.query,
    (n) => {

        state.name = n.typeName
    }
)
</script>

<style lang='less' scoped>
.activity {

    width: 1200px;

    .activity_img {
        margin-top: 20px;

        >img {
            width: 1200px;
            height: 200px;
            margin-bottom: 20px;
        }

    }
}
</style>