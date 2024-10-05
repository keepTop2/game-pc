<template>
    <div class="game_title">
        <span class="input_box">
            <n-input :placeholder="t('home_page_seachGame')">
                <template #suffix>
                    <iconpark-icon icon-id="Group39336" color="#8e82c2" size="1em"></iconpark-icon>
                </template>

            </n-input>
        </span>
        <div class="game_list">
            <div :class="state.gameActive == i ? 'game_active' : ''" v-for="(item, i) in state.tabs" :key="i"
                @click="gameClick(i)">
                <iconpark-icon :icon-id="item.icon" :color="state.gameActive == i ? '#fff' : ''"
                    size="1rem"></iconpark-icon>
                <span>{{ t(item.name) }}</span>
            </div>
        </div>
    </div>
    <Games></Games>

</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, reactive } from 'vue';
// import { NetMsgType } from "@/netBase2/NetMsgType";
// import { MessageEvent2 } from "@/net/MessageEvent2";
import Games from "@/components/Games.vue";
// import pinia from '@/store/index';
// import { storeToRefs } from 'pinia';
// import { Page } from '@/store/page';
// const page = Page(pinia);
// const isVisible = ref(0);
// const { bannerArr, textAnnouncement } = storeToRefs(page);
// import { useRouter } from 'vue-router';
// const router = useRouter()
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
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
const gameClick = (index: any) => {
    state.gameActive = index;
}
onMounted(() => {


    // MessageEvent2.addMsgEvent(
    //   NetMsgType.msgType.msg_notify_platform_gametype_list,
    //   getGameList
    // );


});
onUnmounted(() => {
    // MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_platform_gametype_list, null);
});
</script>

<style lang='less' scoped>
@timestamp: `new Date().getTime()`;

.game_title {
    width: 1200px;
    // height: 72px;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 22px;
    color: #8d81c1;
    font-size: 18px;
    box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.25);

    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%), radial-gradient(circle at 50% 50%, #361e79, #22203e 100%);
    margin-top: 30px;

    >.input_box {
        display: flex;
        width: 100%;
        margin-bottom: 20px;
        align-items: center;

        :deep(.n-input .n-input__input-el) {
            height: 40px;
        }
    }

    .game_list {
        width: 100%;
        display: flex;
        justify-content: space-between;

        >div {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: center;
            width: 169px;
            height: 52px;
            cursor: pointer;

            >span {
                margin-left: 6px;
            }
        }
    }


    .game_active {
        color: #fff;
        background: url('/img/home/btnBG.webp?t=@{timestamp}') no-repeat;
        background-size: 100% 100%;
    }
}
</style>