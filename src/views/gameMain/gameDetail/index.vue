<template>
    <div class="game-title">
        <span class="input_box">
            <n-input clearable :placeholder="t('home_page_seachGame')" v-model:value="queryGame"
                @keyup.enter="onClickSearch" :disabled="activeTab == TabType.FAVORITE">
                <template #suffix>
                    <iconpark-icon icon-id="Group39336" color="#8e82c2" size="1rem" style="cursor:pointer"
                        @click="onClickSearch"></iconpark-icon>
                </template>
            </n-input>
        </span>
        <div class="game_list">
            <div :class="{ game_active: activeTab == i }" v-for="(v, i) in gameKinds" :key="i"
                @click="onClickTab(v, i)">
                <!-- <iconpark-icon :icon-id="v.icon" :color="{'#fff': activeTab == i}"
                    size="1rem"></iconpark-icon> -->
                <span>{{ unserialize(v.kind_name) }}</span>
            </div>
            <div :class="{ game_active: activeTab == TabType.FAVORITE }" @click="onClickFavorite(TabType.FAVORITE)">
                <p>{{ t("common_favorite") }}</p>
            </div>
        </div>
    </div>
    <div class="games">
        <div class="game-detail">
            <div v-if="activeTab == TabType.FAVORITE">
                <n-infinite-scroll style="height: 100vh" :distance="10" @load="" v-if="favoriteData.length">
                    <div class="game-list">
                        <div class="item" v-for="(v, i) in favoriteData" :key="i" @click="onPlayGame(v)">
                            <img class="game-img" :src="`/img/cards/${'1'}.png`" alt="">
                            <iconpark-icon name="xx2" class="fav" size="25" @click.stop="onAddFavorite(v)"
                                v-if="isFav(v)"></iconpark-icon>
                            <iconpark-icon name="xx1" class="fav" size="25" @click.stop="onAddFavorite(v)"
                                v-else></iconpark-icon>
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
                <div class="nodata" v-if="!result.list.length && !loading">
                    <img src="/img/wallet/nodata.webp" alt="nodata">
                    <div>{{ t('home_page_nomore_data') }}</div>
                </div>
                <n-infinite-scroll style="height: 100vh" :distance="10" v-else>
                    <div class="game-list">
                        <div class="item" v-for="(v, i) in result.list" :key="i" @click="onPlayGame(v)">
                            <img class="game-img" :src="`/img/cards/${'1'}.png`" alt="">
                            <iconpark-icon name="xx2" class="fav" size="25" @click.stop="onAddFavorite(v)"
                                v-if="isFav(v)"></iconpark-icon>
                            <iconpark-icon name="xx1" class="fav" size="25" @click.stop="onAddFavorite(v)"
                                v-else></iconpark-icon>
                            <!-- <div class="title">{{ unserialize(v.name) }}</div> -->
                        </div>
                    </div>
                </n-infinite-scroll>
            </div>
        </div>
        <n-pagination :default-page-size="pageSize" class="pagination" @update:page="pageChange"
            v-model:page="params.page" :item-count="result.total_page" v-show="result.total_page" />
    </div>

</template>

<script setup lang='ts'>
import { onBeforeMount, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { NetMsgType } from "@/netBase/NetMsgType";
import { MessageEvent2 } from "@/net/MessageEvent2";
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { Page } from '@/store/page';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
import { Local } from '@/utils/storage';
import { needLogin } from '@/net/Utils';
import { Message } from '@/utils/discreteApi';

const { t } = useI18n();
const route = useRoute()
const router = useRouter()
const {
    lang,
    homeGameData
} = storeToRefs(Page(pinia));

const activeTab = ref(0)
const queryGame = ref("")
const isLoading = ref(false)
// 加载更多
const loading = ref(false)
const params: any = reactive({ // 参数
    page: 1,
})
const result: any = reactive({ // 结果
    total_page: 0,
    list: []
})
let gameName = ref('')
let gameKinds = ref<any>([])
let favoriteData = ref<any[]>([])
let resultList: any = reactive([])
let pageSize = ref<number>(20)
let platformId = ref<any>(0)
let venueId = ref<any>(0)
let isVenudId = ref<boolean>(false)
let activeKind = ref<any>(0)
let threeGameKinds = ref<any[]>([])
const langs: any = {
    zh: 'zh-CN',
    vn: 'vi-VN',
    en: 'en-US',
};
const imgPrefix = 'http://18.162.112.52:8033/uploads/'
const TabType = {
    FAVORITE: 88
}


const getHomeData = () => {
  const data  = homeGameData.value[activeKind.value]?.three_platform
  const item = data?.find((e: any) => e.name[lang.value].toUpperCase() == gameName.value)
  threeGameKinds.value = item?.three_game_kind
}

const isFav = (v: any) => {
    return favoriteData.value.some((e: any) => e.gameId == v.gameId)
}

const handlePlatform = (res: any) => {
    resetData()
    if (res.kind && res.kind.length) {
    gameKinds.value = res.kind
    if (!isVenudId.value) {
        activeTab.value = res.kind.findIndex((e: any) => e.kindId == venueId.value)
        isVenudId.value = true
        }
    } else {
        const kinds = threeGameKinds.value.map((e: any) => { return { 'kindId': e.three_game_kind_id, 'kind_name': JSON.stringify(e.name) } })
        gameKinds.value = kinds
    }
    result.list = res.info
}

const handleGames = (res: any) => {
    result.list = res.info
    result.total_page = res.total
    loading.value = false
}

const handleQuery = (res: any) => {
    result.list = res.info
}

const onPlayGame = (v: any) => {
    needLogin()
    let langObj: any = {
        'en-US': 3,
        'vi-VN': 2,
        'zh-CN': 1
    }
    const currentParams = threeGameKinds.value[activeTab.value]
    const currentType = gameKinds.value[activeTab.value]
    isLoading.value = true
    let tb = NetPacket.req_3rd_game_login();
    tb.agentId = currentParams.three_platform_id;
    tb.kindId = currentType.kindId;
    tb.gameId = v.gameId;
    tb.lang = langObj[lang.value];
    Net.instance.sendRequest(tb);
}

const onClickTab = (_: any, i: any) => {
    activeTab.value = i
    queryGame.value = ''
    resetData()
    queryData()
}

const onClickFavorite = (i: number) => {
    queryGame.value = ''
    activeTab.value = i
    resetData()
    getFavs()
}

const onClickSearch = () => {
    let tb = NetPacket.req_look_for_game_name()
    const currentParams = threeGameKinds.value[activeTab.value]
    const currentType = gameKinds.value[activeTab.value]
    tb.agentId = currentParams.three_platform_id;
    tb.kindId = currentType.kindId;
    tb.name = queryGame.value
    Net.instance.sendRequest(tb)
}

const pageChange = (page: number) => { // 切换页码
    params.page = page
    queryData()
}

const getFavs = () => {
  const gameId = Local.get('favorites') || []
  const gameIds = gameId.map((e:any) => e.split('__')[0])
  favoriteData.value = resultList.filter((e: any) => gameIds.includes(e.gameId))
}

const onAddFavorite = (v: any) => {
  let favorites = Local.get('favorites') || []
  const gameIds = favorites.map((e:any) => e.split('__')[0])
  if (gameIds.includes(v.gameId)) {
    favorites = favorites.filter((e: any) => e.split('__')[0] != v.gameId)
  } else {
    const item = v.gameId + '__' +  platformId.value + '__' + activeTab.value + '__' + imgPrefix + v.gamePictureH5
    favorites.push(item)
  }
  Local.set('favorites', favorites)
  getFavs()
}

const unserialize = (v: string) => {
    const data = JSON.parse(v)
    return data[langs[lang.value]]
}

const getInitData = (agentId: any, kindId: any) => {
    const req = NetPacket.req_get_kind_in_platform();
    req.agentId = agentId
    req.kindId = kindId
    debugger
    req.pageSize = pageSize.value
    Net.instance.sendRequest(req);
}

const resetData = () => {
    loading.value = false
    params.page = 1
    result.total_page = 0
    result.list = []
}

const queryData = () => { // 查询
    loading.value = true
    const query = NetPacket.req_get_games_in_platform()
    query.agentId = platformId.value
    query.kindId = activeTab.value
    query.page = params.page
    query.pageSize = pageSize.value
    Net.instance.sendRequest(query);
}

const gameUrlResult = (message: any) => {
    isLoading.value = false
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

onBeforeMount(() => {
    const { platform_id, venue_id, name, active } = route.query
    getInitData(platform_id, venue_id)
    gameName.value = name as string
    platformId.value = platform_id
    venueId.value = venue_id
    activeKind.value = active
    getHomeData()
})
onMounted(() => {
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_get_kind_in_platform, handlePlatform);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_get_games_in_platform, handleGames);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_look_for_game_name, handleQuery);
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_3rd_game_login_result,
        gameUrlResult,
    );
    getFavs()
})
onUnmounted(() => {
    setTimeout(() => {
        MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_kind_in_platform, null);
        MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_games_in_platform, null);
        MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_look_for_game_name, null);
        MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_3rd_game_login_result,
        null,
    );
    }, 500);
})

watch(
    () => result.list,
    (a: any) => {
        const res = resultList?.map((e: any) => e.gameId)
        for (let e of a) {
            if (e && !res.includes(e.gameId)) {
                resultList.push(e)
            }
        }
        getFavs()
    },
    { deep: true, }
)
</script>

<style lang='less' scoped>
@timestamp: `new Date().getTime()`;

.game-title {
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

        :deep(.n-input) {
            .n-input__border {
                border: 1px solid #322c59;
            }

            .n-input__placeholder {
                color: #8e82c2;
            }
        }

        :deep(.n-input .n-input__input-el) {
            height: 40px;

        }
    }

    .game_list {
        width: 100%;
        display: flex;
        justify-content: flex-start;

        >div {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: center;
            width: 169px;
            height: 52px;
            cursor: pointer;

            // >span {
                // margin-left: 6px;
            // }
        }
    }


    .game_active {
        color: #fff;
        background: url('/img/home/btnBG.webp?t=@{timestamp}') no-repeat;
        background-size: 100% 100%;
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

.pagination {
    margin: 30px 0 40px 0;
    justify-content: center;

    :deep(.n-pagination-item) {
        font-size: 16px;
        background: #372771;
        border: 1.4px solid #5A47B2;
        color: #8D81C1;
        border-radius: 10px;
    }

    :deep(.n-pagination-item--active) {
        background: url(/img/home/sbtnBG.webp) no-repeat;
        background-size: 100% 100%;
        color: #fff;
    }
}
</style>