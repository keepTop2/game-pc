<template>
    <div class="games">

        <div class="game_detail">
            <div>
                <n-infinite-scroll style="height: 100vh" :distance="10" @load="handleLoad">
                    <div v-for="i in state.count" :key="i" class="item">
                        <img class="game_img" :src="`/img/cards/${v}.png`" v-for="(v, j) in [0, 1, 2, 3, 4]" :key="j">
                    </div>
                </n-infinite-scroll>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue';
// import { Net } from '@/utils/net/Net';
// import { MessageEvent2 } from '@/utils/net/MessageEvent2';
// import { NetPacket } from '@/utils/net/NetPacket';
// import { NetMsgType } from '@/utils/net/NetMsgType';
// import { getRandomSign, md5, getDeviceId } from '@/utils/net/Utils';

// import { useI18n } from 'vue-i18n';
// const { t } = useI18n();
const state: any = reactive({
    gameActive: 0,
    count: 6,
    tabs: [

        {
            icon: 'Group39096',
            name: 'home_page_slot',
            color: 'slot_machine',
            value: '',
        },
        {
            icon: 'Group39095',
            name: 'home_page_live',
            color: 'live',
            value: '',
        },

        {
            icon: 'Group39097',
            name: 'home_page_eSports',
            color: 'gaming',
            value: '',
        },
        {
            icon: 'Group39098',
            name: 'home_page_fishing',
            color: 'fish',
            value: '',
        },
        {
            icon: 'Group39099',
            name: 'home_page_sportsGame',
            color: 'sports',
            value: '',
        },
        {
            icon: 'shoucang11',
            name: 'home_page_collect',
            color: 'collect',
            value: '',
        },
    ],

})

const handleLoad = () => {
    state.count.value += 1
}
</script>

<style lang='less' scoped>
.game_detail {
    display: flex;
    flex-direction: column;

    >div {
        margin-top: 30px;

        .item {
            display: flex;
            flex-wrap: wrap;

            .game_img {
                width: 240px;
                height: 238px;
                object-fit: cover;
            }
        }
    }
}
</style>