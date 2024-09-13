<template>

    <div class="game_platform">
        <Imgt src="/img/home/banner1.webp" />
        <Games></Games>
    </div>


</template>

<script setup lang='ts'>
import Imgt from '@/components/Imgt.vue';
// import { onMounted, ref } from 'vue';
// import { Net } from '@/net/Net';
// import { MessageEvent2 } from '@/net/MessageEvent2';
// import { NetPacket } from '@/net/NetPacket';
// import { NetMsgType } from '@/net/NetMsgType';
// import { getRandomSign, md5, getDeviceId } from '@/net/Utils';
// import { useRouter } from 'vue-router';

// import pinia from '@/store/index';
// import { storeToRefs } from 'pinia';
// import { User } from '@/store/user';
import Games from "@/components/Games.vue";

// const router = useRouter();
// const userInfo = User(pinia);
// const { isLogin } = storeToRefs(userInfo);

</script>

<style lang='less' scoped>
.game_platform {
    width: 1200px;
    display: flex;
    flex-direction: column;

    >img {
        margin-top: 20px
    }
}
</style>