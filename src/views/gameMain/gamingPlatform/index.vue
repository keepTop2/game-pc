<template>
    <div class="game-content">
        <!-- <div class="game_platform">
            <Imgt src="/img/home/banner1.webp" alt="" />
        </div> -->
        <div class="announcement">
            <n-carousel autoplay draggable v-if="bannerArr">
                <Imgt class="carousel" v-for="(v, i) in bannerArr" :key="i" :src="t(v)" />
            </n-carousel>
            <p style="height: 40px;">
                <iconpark-icon icon-id="Group39360" size="1rem"></iconpark-icon>
                <n-carousel :show-dots="false" autoplay draggable direction="vertical" v-if="textAnnouncement">
                    <p v-for="(v, i) in textAnnouncement" :key="i" style="margin-left: 5px;" class="carousel_span">{{
                        t(v)
                    }}</p>
                </n-carousel>
            </p>
        </div>
        <div class="games">
            <div class="game-detail">
                <div>
                    <div class="nodata" v-if="!result.list.length">
                        <Imgt src="/img/wallet/nodata.webp" alt="nodata" />
                        <div>{{ t('home_page_nomore_data') }}</div>
                    </div>
                    <n-infinite-scroll style="height: 100vh" :distance="10" v-else>
                        <div class="game-list">
                            <div class="game-img" v-for="(v, i) in result.list" :key="i" @click="platformItemClick(v, i)">
                                <img :src="imgPrefix + v.picture_pc" :alt="v.name[langs[lang]]">
                                <!-- <div class="title">{{ unserialize(v.name) }}</div> -->
                            </div>
                        </div>
                    </n-infinite-scroll>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, reactive, watch } from 'vue';
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

const {
    lang,
    homeGameData,
    bannerArr,
    textAnnouncement,
} = storeToRefs(Page(pinia));
const imgPrefix = 'http://18.162.112.52:8033/uploads/'
const router = useRouter()
const result: any = reactive({
    list: []
})
const langs: any = {
    zh: 'zh-CN',
    vn: 'vi-VN',
    en: 'en-US',
};

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

watch(
    () => route.query.id,
    () => {
        getHomeData()
    }
)

onMounted(() => {
    getHomeData()
})
onMounted(() => {
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_3rd_game_login_result,
        gameUrlResult,
    );
})
onUnmounted(() => {
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_3rd_game_login_result,
        null,);
})


const getHomeData = () => {
    const id = route.query.id as string
    const item = state.tabs[id]
    const name = t(item.name, 1, { locale: 'zh' })
    const data = homeGameData.value.find((e: any) => e.name['zh-CN'] == name)
    result.list = data.three_platform
}

const gameUrlResult = (message: any) => {
    if (message.code != 0) {
        Message.error(message.msg)
        return
    }
    if (message.url.indexOf('<!doctype html>') != -1) {
        message.url = `data:text/html;charset=utf-8,${encodeURIComponent(
            String(message.url)
        )}`
    }
    Local.set('gameUrl', message.url)
    router.push({
        path: "/openGame",
    });
}

const platformItemClick = async (item: any, i: number) => {
    if (item.has_next == 1) {
        const langs: any = {
            zh: 'zh-CN',
            vn: 'vi-VN',
            en: 'en-US',
        };
        router.push({
        path: '/gameMain/gameDetail',
        query: {
            id: i,
            platform_id:item.id,
            venue_id:item.three_game_kind[0].id,
            name: item.name[langs[lang.value]].toUpperCase(),
        }
        })
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
        // isLoading.value = true
        let tb = NetPacket.req_3rd_game_login();
        tb.agentId = item.id;
        tb.kindId = item.three_game_kind_id;
        tb.lang = langObj[lang.value];
        Net.instance.sendRequest(tb);
    }
}

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

    >div {
        margin-top: 30px;

        .game-list {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;

            .game-img {
                height: 238px;
                position: relative;
                width: 100%;
                cursor: pointer;
                img {
                    height: 100%;
                    width: 100%;
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
</style>