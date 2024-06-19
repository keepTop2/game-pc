<template>
    <div class="activity">

        <div class="activity_img">
            <img @click="popDetail" :src="t(state.link)" alt="">
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
    link: '',
    showModal: false,
    detailImg: null,
})
const popDetail = () => {
    state.showModal = true
}

onMounted(() => {
    state.link = route.query.link
    state.name = route.query.name
    state.detailImg = route.query.content

});

watch(
    () => route.query,
    (n) => {
        state.link = n.link
        state.detailImg = n.content
        state.name = n.name
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