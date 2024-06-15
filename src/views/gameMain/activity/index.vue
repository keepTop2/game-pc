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
import { onMounted, onUnmounted, reactive, watch } from 'vue';
import { Net } from '@/utils/net/Net';
import { MessageEvent2 } from '@/utils/net/MessageEvent2';
import { NetPacket } from '@/utils/netBase/NetPacket';
import { NetMsgType } from '@/utils/netBase/NetMsgType';
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
const handleActivetys = (res: any) => {
    state.activitys = res.promo
}
// 请求获取所有活动
const getActivetys = () => {
    const req = NetPacket.req_activites();
    req.shoe = 0
    Net.instance.sendRequest(req);
};
onMounted(() => {
    state.name = route.query.name
    getActivetys()
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_activites,
        handleActivetys
    );
});
onUnmounted(() => {
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_activites, null);
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