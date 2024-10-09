<template>
    <div class="game-content">
        <div class="game_platform">
            <Imgt :src="`/img/game/${route.query.name}.webp`" alt="" />
        </div>
        <div class="games">
            <div class="game-detail">
                <div class="game-list-container">
                    <div class="nodata" v-if="!result.list.length">
                        <Imgt src="/img/wallet/nodata.webp" alt="nodata" />
                        <div>{{ t('home_page_nomore_data') }}</div>
                    </div>
                    <n-scrollbar ref="scrollRef" content-class="game-list-scroll" x-scrollable @wheel.prevent="handleScroll" :size="2" x-placement="bottom"  v-else>
                        <div class="game-list">
                            <div class="game-img all">
                                <Imgt src="/img/game/all_icon.webp" />
                                <span>全部</span>
                            </div>
                            <div class="game-img" v-for="(v, i) in result.list" :key="i" @click="platformItemClick(v, i)">
                                <img :src="imgPrefix + v.picture_pc" :alt="v.name[langs[lang]]">
                                <!-- <div class="title">{{ unserialize(v.name) }}</div> -->
                            </div>
                        </div>
                    </n-scrollbar>
                </div>
            </div>
        </div>
        <GameDetail :platform_id="params.platform_id" :venue_id="params.venue_id" :name="params.name"  :key="params.platform_id + params.venue_id + params.name" v-if="params.platform_id"/>
        <OverLoading v-model:visible="isLoading" ></OverLoading>
    </div>
</template>

<script setup lang='ts'>
import { onBeforeMount, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { Page } from '@/store/page';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
const { t } = useI18n();
const route = useRoute()
import Imgt from '@/components/Imgt.vue';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import { Message } from '@/utils/discreteApi';
import { Local } from '@/utils/storage';
import { User } from '@/store/user';
import OverLoading from '@/components/Loading.vue'
import GameDetail from '@/components/GameDetail.vue'

const {
    lang,
    homeGameData,
} = storeToRefs(Page(pinia));
const imgPrefix = 'http://18.167.175.195:8033/uploads/'
const router = useRouter()
const result: any = reactive({
    list: []
})
const isLoading = ref(false)
let newTab = ref()
const scrollRef = ref<HTMLElement>()
const langs: any = {
    zh: 'zh-CN',
    vn: 'vi-VN',
    en: 'en-US',
};
const params:any = reactive({
  platform_id: null,
  venue_id: null,
  name: null,
  active: null,
})

const state: any = reactive({
    tabs: <{}>[
        {
            icon: 'Group39324',
            name: 'home_page_hot',
            color: 'lottery',
            value: '',
        },
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
            icon: 'Group1556235261',
            name: 'home_page_pokerGame',
            color: 'gaming',
            value: '',
        },
        {
            icon: 'Group1556235309',
            name: 'home_page_lotteryGame',
            color: 'lottery',
            value: '',
        },
    ],
})

const getHomeData = () => {
    const id = route.query.id as string
    const item = state.tabs[id]
    const name = t(item.name, 1, { locale: 'zh' })
    const data = homeGameData.value.find((e: any) => e.name['zh-CN'] == name)
    result.list = data.three_platform
    platformItemClick(result.list[0], 0)
}

const gameUrlResult = (message: any) => {
    isLoading.value = false
    Local.set('gameUrl', message.url)
    if (message.code != 0) {
        Message.error(message.msg)
        return
    }

    if (newTab.value) {
        newTab.value.close()
    }

    if (message.url.indexOf('<!doctype html>') != -1) {
        newTab.value = window.open('', '_blank');
        newTab.value.document.open();
        newTab.value.document.write(message.url);
    } else {
        newTab.value = window.open(message.url, '_blank')
    }
}

const platformItemClick = async (item: any, _: number) => {
    
    if (item.has_next == 1) {
        const langs: any = {
            zh: 'zh-CN',
            vn: 'vi-VN',
            en: 'en-US',
        };
        params.platform_id = item.id
        params.venue_id = item.three_game_kind[0].id
        params.name = item.name[langs[lang.value]].toUpperCase()
        // router.push({
        // path: '/gameMain/gameDetail',
        // query: {
        //     id: i,
        //     platform_id:item.id,
        //     venue_id:item.three_game_kind[0].id,
        //     name: item.name[langs[lang.value]].toUpperCase(),
        // }
        // })
    } else {
        let langObj: any = {
        'en-US': 3,
        'vi-VN': 2,
        'zh-CN': 1
        }
        if (!Local.get('user')) {
            await User(pinia).setLogin(true)
            return
        }
        isLoading.value = true
        let tb = NetPacket.req_3rd_game_login();
        tb.agentId = item.id;
        tb.kindId = item.three_game_kind_id;
        tb.lang = langObj[lang.value];
        Net.instance.sendRequest(tb);
    }
}

const handleScroll = (e: WheelEvent): void => {
    if (scrollRef.value) {
        scrollRef.value.scrollBy({left: e.deltaY})
    }
};

watch(
    () => route.query.id,
    () => {
        getHomeData()
    }
)
onMounted(() => {
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_3rd_game_login_result,gameUrlResult);
    getHomeData()
})
onUnmounted(() => {
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_3rd_game_login_result, null);

})

</script>

<style lang='less' scoped>
@timestamp: `new Date().getTime()`;

.game_platform {
    max-width: 1400px;
    margin: 20px 0;
    
    >img {
        width: 100%;
    }
}

.announcement {
    position: relative;
    height: 320px;

    >p {
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 1171px;
        padding: 0 14.5px;
        background-color: rgba(0, 0, 0, .3);
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 16px;
        line-height: 16px;
    }

    img {
        width: 100%;
        object-fit: cover;
        transform: translate(-50%, -50%);
        position: absolute;
        top: 50%;
        left: 50%;
    }
}

.game-detail {
    display: flex;
    flex-direction: column;

    .game-list-container {
        height: 96px;
        overflow-y: hidden;
        border-radius: 16px;
        border: 1px solid #181C25;
        background: linear-gradient(180deg, #0A0B22 0%, #000 100%);

        .game-list-scroll {
            overflow: hidden;
            .game-list {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin: 12px 0;
                position: relative;
                
                .game-img {
                    width: 146px;
                    min-width: 146px;
                    height: 72px;
                    cursor: pointer;
                    background: #22283A;
                    border-radius: 8px;
                    font-size: 10px;
                    margin-left: 10px;
                    
                    &::first-child {
                        margin-left: 0;
                    }
                    img {
                        height: 100%;
                        width: 100%;
                        pointer-events: none;
                    }
                    
                    &.all {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-image: url('/img/game/btn_bg.webp');
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        img {
                            width: 42px;
                            height: 42px;
                        }
                        span {
                            color: #FFF;
                            text-align: center;
                            font-size: 32px;
                            font-weight: 500;
                            margin-left: 3px;
                        }
                    }
                }
    
                .fav {
                    position: absolute;
                    top: 10px;
                    right: 15px;
                }
    
            }

        }
    }
}
</style>