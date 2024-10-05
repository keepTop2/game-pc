<template>


    <Games></Games>

</template>

<script setup lang='ts'>
import { onMounted, onUnmounted } from 'vue';
import { Net } from '@/net/Net';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetPacket } from '@/netBase2/NetPacket';
import { NetMsgType } from '@/netBase2/NetMsgType';
// import { getRandomSign, md5, getDeviceId } from '@/net/Utils';
// import { useRouter } from 'vue-router';

// import pinia from '@/store/index';
// import { storeToRefs } from 'pinia';
// import { User } from '@/store/user';
import Games from "@/components/Games.vue";

// const router = useRouter();
// const userInfo = User(pinia);
// const { isLogin } = storeToRefs(userInfo);
const reqGameRecords = () => {
    let req = NetPacket.req_recent_games();
    // debugger
    Net.instance.sendRequest(req);
}
const resGameRecords = (res: any) => {
    console.log(res);

}
onMounted(() => {
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_req_recent_games,
        resGameRecords
    );
    reqGameRecords()

});
onUnmounted(() => {
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_recent_games, null);
});
</script>

<style lang='less' scoped></style>
