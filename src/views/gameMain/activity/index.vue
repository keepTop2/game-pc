<template>
    <div class="activity">

        <div class="activity_img">
            <img @click="popDetail(item)" :src="t(item.pic_link)" alt="" v-for="(item, i) in state.activitys" :key="i">
        </div>
        <n-modal v-model:show="state.showModal">
            <n-card style="width: 600px" title="活动详情" :bordered="false" size="huge" role="dialog" aria-modal="true">
                <img v-if="state.detailImg" :src="t(state.detailImg)" alt="">
            </n-card>
        </n-modal>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, watch } from 'vue';

import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
// const router = useRouter();
const route = useRoute();


const state: any = reactive({
    name: '',
    activitys: null,
    showModal: false,
    detailImg: null,
})
const popDetail = (item: any) => {
    state.detailImg = item.content
    state.showModal = true
}


onMounted(() => {
    state.name = route.query.name


});

watch(
    () => route.query.name,
    (n) => {
        state.name = n
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