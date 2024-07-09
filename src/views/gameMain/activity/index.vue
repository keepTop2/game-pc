<template>
    <div class="activity">
        <div class="activity_img">
            <img @click="popDetail(item)" v-for="(item, i) in activityTitleList[state.name]" :key="i"
                :src="t(item.pic_link)" alt="">
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
const activityDetail = (item: any) => {
    let str = item.content.split('_')
    if (str.length > 0) {
        str = str[0] + '_pc_' + str[1] + '_' + str[2]
    }
    state.detailImg = str
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
    activityDetail(item)
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