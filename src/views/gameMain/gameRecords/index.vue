<template>


    <Games></Games>

</template>

<script setup lang='ts'>
import { onMounted, onUnmounted } from 'vue';
import { Net } from '@/utils/net/Net';
import { MessageEvent2 } from '@/utils/net/MessageEvent2';
import { NetPacket } from '@/utils/netBase/NetPacket';
import { NetMsgType } from '@/utils/netBase/NetMsgType';
// import { getRandomSign, md5, getDeviceId } from '@/utils/net/Utils';
// import { useRouter } from 'vue-router';

// import pinia from '@/store/index';
// import { storeToRefs } from 'pinia';
// import { User } from '@/store/user';
import Games from "@/components/Games.vue";

// const router = useRouter();
// const userInfo = User(pinia);
// const { isLogin } = storeToRefs(userInfo);
const reqGameRecords = () => {
    let req = NetPacket.req_pt888_get_self_record();
    // debugger
    Net.instance.sendRequest(req);
}
const resGameRecords = (res: any) => {
    console.log(res);

}
onMounted(() => {


    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_pt888_get_self_record,
        resGameRecords
    );
    reqGameRecords()

});
onUnmounted(() => {
    // MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_platform_gametype_list, null);
});
</script>

<style lang='less' scoped></style>