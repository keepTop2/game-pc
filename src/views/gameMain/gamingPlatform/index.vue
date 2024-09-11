<template>
    <div class="game-content">
        <!-- <div class="game_platform">
            <img src="/img/home/banner1.webp" alt="">
        </div> -->
        <div class="announcement">
            <n-carousel autoplay draggable v-if="bannerArr">
                <img class="carousel" v-for="(v, i) in bannerArr" :key="i" :src="t(v)">
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
                <div v-if="activeTab == TabType.FAVORITE">
                    <n-infinite-scroll style="height: 100vh" :distance="10" @load="" v-if="favoriteData.length">
                        <div class="game-list">
                            <div class="item" v-for="(v, i) in favoriteData" :key="i" @click="onPlayGame(v)">
                                <img class="game-img" :src="`/img/cards/${'1'}.png`" alt="">
                                <!-- <div class="title">{{ unserialize(v.name) }}</div> -->
                            </div>
                        </div>
                    </n-infinite-scroll>
                    <div class="nodata" v-else>
                        <img src="/img/wallet/nodata.webp" alt="nodata">
                        <div>{{ t('home_page_nomore_data') }}</div>
                    </div>
                </div>
                <div v-else>
                    <div class="nodata" v-if="!result.list.length">
                        <img src="/img/wallet/nodata.webp" alt="nodata">
                        <div>{{ t('home_page_nomore_data') }}</div>
                    </div>
                    <n-infinite-scroll style="height: 100vh" :distance="10" v-else>
                        <div class="game-list">
                            <div class="item" v-for="(v, i) in result.list" :key="i" @click="onPlayGame(v)">
                                <img class="game-img" :src="`/img/cards/${'1'}.png`" alt="">
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
import { onMounted, reactive, ref, watch } from 'vue';
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { Page } from '@/store/page';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
import { needLogin } from '@/net/Utils';
const { t } = useI18n();
const route = useRoute()

const {
    lang,
    homeGameData,
    bannerArr,
    textAnnouncement,
} = storeToRefs(Page(pinia));

const activeTab = ref(0)

const result: any = reactive({
    list: []
})
let initData = reactive<any>({})
let gameKinds = ref<any>([])
let favoriteData = ref<any[]>([])
const langs: any = {
    zh: 'zh-CN',
    vn: 'vi-VN',
    en: 'en-US',
};

const TabType = {
    FAVORITE: 88
}

const state: any = reactive({
    tabs: <{}>[
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


const getHomeData = () => {
    const id = route.query.id as string
    const item = state.tabs[id]
    const name = t(item.name, 1, { locale: 'zh' })
    const data = homeGameData.value.find((e: any) => e.name['zh-CN'] == name)
    result.list = data.three_platform
}

const onPlayGame = (v: any) => {
    needLogin()
    let langObj: any = {
        'en-US': 3,
        'vi-VN': 2,
        'zh-CN': 1
    }
    const currentParams = initData.three_game_kind[activeTab.value]
    const currentType = gameKinds.value[activeTab.value]
    let tb = NetPacket.req_3rd_game_login();
    tb.agentId = currentParams.three_platform_id;
    tb.kindId = currentType.kindId;
    tb.gameId = v.gameId;
    tb.lang = langObj[langs[lang.value]]
    Net.instance.sendRequest(tb);
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

            .item {
                height: 238px;
                position: relative;

                .game-img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
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