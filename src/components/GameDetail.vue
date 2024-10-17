<template>
    <div class="game-detail-container">
        <div class="game-title">
            <span class="input-box">
                <n-input :placeholder="t('home_page_seachGame')" v-model:value="queryGame" @keyup.enter="onClickSearch" :disabled="activeTab == TabType.FAV">
                    <template #prefix>
                        <img class="search-icon" src="/img/game/search.webp" alt="search" />
                    </template>
                </n-input>
                <span class="button">搜索</span>
            </span>
            <div class="game_list">
                <div v-for="(item, idx) in state.tabs" :class="{ game_active: activeTab == item.type }" @click="onClickTab(item)" :key="idx">
                    <span>
                        <img :src="`/img/game/label_${item.name}_a.webp`" alt="" v-if="activeTab == item.type">
                        <img :src="`/img/game/label_${item.name}.webp`" alt="" v-else>
                    </span>
                    <span>{{ t(item.icon) }}</span>
                    <!-- <span>{{ unserialize(v.kind_name) }}</span> -->
                </div> 
            </div>
        </div>
        <div class="game-content">
            <div class="game-detail">
                <div class="game-detail-data" style="min-height: 500px">
                    <div class="nodata" v-if="!result.list.length && !loading" >
                        <img src="/img/wallet/nodata.webp" alt="nodata">
                        <div>{{ t('home_page_nomore_data') }}</div>
                    </div>
                    <n-infinite-scroll :distance="10" v-else>
                        <div class="game-list">
                            <div class="item" v-for="(v, i) in result.list" :key="i" >
                                <div class="game-img" @click.stop="onPlayGame(v)">
                                    <img :src="imgPrefix + v.gamePicturePC" :alt="v.name[langs[lang]]">
                                </div>
                                <div class="game-info">
                                    <span class="title">{{ unserialize(v.name) }}</span>
                                    <img class="heart" src="/img/game/heart_on.webp" alt="heart_on" @click.stop="onClickFav(v)">
                                </div>
                            </div>
                        </div>
                    </n-infinite-scroll>
                </div>
            </div>
        </div>
        <n-pagination :default-page-size="pageSize" class="pagination" @update:page="pageChange"
            v-model:page="params.page" :item-count="result.total_page" v-show="result.total_page" />
        <Loading v-model:visible="isLoading" ></Loading>
    </div>
</template>

<script setup lang='ts'>
import { onBeforeMount, onMounted, onUnmounted, reactive, ref, watch, defineProps } from 'vue';
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
import { Message } from '@/utils/discreteApi';
import { User } from '@/store/user';
import Loading from '@/components/Loading.vue'

const { t } = useI18n();
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
let newTab = ref()
const langs: any = {
    zh: 'zh-CN',
    vn: 'vi-VN',
    en: 'en-US',
};
const imgPrefix = 'http://18.167.175.195:8033/uploads/'
const TabType = {
    ALL: 0,
    HOT: 1,
    RECENT: 2,
    FAV: 3
}
const state: any = reactive({
    tabs: <{}>[
        {
            type: -1,
            name: 'all',
            icon: 'label_all',
            value: '',
        },
        {
            type: 0,
            name: 'hot',
            icon: 'label_hot',
            value: '',
        },
        {
            type: -3,
            name: 'recent',
            icon: 'label_recent',
            value: '',
        },
        {
            type: -2,
            name: 'fav',
            icon: 'label_fav',
            value: '',
        },
    ],
})

const props = defineProps({
  platform_id: null,
  venue_id: null,
  name: null,
  active: null,
});


const getHomeData = () => {
  const data  = homeGameData.value[activeKind.value]?.three_platform
  const item = data?.find((e: any) => e.name[langs[lang.value]].toUpperCase() == gameName.value)
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
            // activeTab.value = venueId.value
            isVenudId.value = true
        }
    } else {
        const kinds = threeGameKinds.value?.map((e: any) => { return { 'kindId': e.id, 'kind_name': JSON.stringify(e.name) } })
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

const onPlayGame = async (v: any) => {
    if (!Local.get('user')) {
        await User(pinia).setLogin(true)
        return
    }
    let langObj: any = {
        'en-US': 3,
        'vi-VN': 2,
        'zh-CN': 1
    }
    isLoading.value = true
    let tb = NetPacket.req_3rd_game_login();
    tb.agentId = platformId.value;
    tb.kindId = venueId.value;
    tb.gameId = v.gameId;
    tb.lang = langObj[lang.value];
    Net.instance.sendRequest(tb);
}

const handleFav = (v: any) => {
    if (v.rlt == 0) {
        Message.success(t('success'))
    } else {
        Message.error(t('fail'))
    }
}

// const onPlayGameFav = async (v: any) => {
//   if (!Local.get('user')) {
//       await User(pinia).setLogin(true)
//       return
//   }
//   let langObj: any = {
//     'en-US': 3,
//     'vi-VN': 2,
//     'zh-CN': 1
//   }
//   const favorites = Local.get('favorites') || []
//   const data = favorites.map((e:any) => {return {'gameId': e.split('__')[0], 'agentId': e.split('__')[1], 'kindId': e.split('__')[2], 'img': e.split('__')[3]}})
//   const item = data.find((e:any) => e.gameId == v.gameId)
//   isLoading.value = true
//   let tb = NetPacket.req_3rd_game_login();
//   tb.agentId = item.agentId;
//   tb.kindId = item.kindId;
//   tb.gameId = item.gameId;
//   tb.lang = langObj[lang.value];
//   Net.instance.sendRequest(tb);
// }

const onClickTab = (v: any) => {
    activeTab.value = v.type
    queryGame.value = ''
    resetData()
    queryData()
}

const onClickFav = async (v: any) => {
    if (!Local.get('user')) {
        await User(pinia).setLogin(true)
        return
    }

    let tb = NetPacket.req_modify_collect();
    tb.agentId = platformId.value;
    tb.gameId = v.gameId;
    Net.instance.sendRequest(tb);
}

// const onClickFavorite = (i: number) => {
//     queryGame.value = ''
//     activeTab.value = i
//     resetData()
//     getFavs()
// }

const onClickSearch = () => {
    if (!queryGame.value) {
        Message.error(t('player_info_tip_1'))
        return
    }
    let tb = NetPacket.req_look_for_game_name()
    tb.agentId = platformId.value;
    tb.kindId = activeTab.value;
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

// const onAddFavorite = (v: any) => {
//   let favorites = Local.get('favorites') || []
//   const gameIds = favorites.map((e:any) => e.split('__')[0])
//   if (gameIds.includes(v.gameId)) {
//     favorites = favorites.filter((e: any) => e.split('__')[0] != v.gameId)
//   } else {
//     const item = v.gameId + '__' +  platformId.value + '__' + activeTab.value + '__' + imgPrefix + v.gamePicturePC
//     favorites.push(item)
//   }
//   Local.set('favorites', favorites)
//   getFavs()
// }

const unserialize = (v: string) => {
    const data = JSON.parse(v)
    return data[langs[lang.value]]
}

const getInitData = (agentId: any, kindId: any) => {
    const req = NetPacket.req_get_kind_in_platform();
    req.agentId = agentId
    req.kindId = kindId
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
    query.kindId = venueId.value
    query.page = params.page
    query.pageSize = pageSize.value
    query.is_lable = activeTab.value == 0 ? 1 : 0
    Net.instance.sendRequest(query);
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

onBeforeMount(() => {
    activeTab.value = state.tabs[0].type
    const { platform_id, venue_id, name, active } = props
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
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_3rd_game_login_result,gameUrlResult);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_modify_collect, handleFav);
    getFavs()
})
onUnmounted(() => {
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_kind_in_platform, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_games_in_platform, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_look_for_game_name, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_3rd_game_login_result,null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_req_modify_collect,null);
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

.game-detail-container {
    position: relative;
    min-height: 65vh;
    .game-title {
        margin: 25px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        font-size: 18px;
        position: relative;

        >.input-box {
            display: flex;
            align-items: center;

            :deep(.n-input) {
                height: 56px;
                width: 395px;
                border-radius: 8px;
                color: #fff;
                background: #030309;

                &.n-input--focus {
                    background-color: #030309 !important;
                }
                
                .n-input_wrapper {
                    padding: 0 20px;
                }

                .n-input__input-el {
                    caret-color: #fff;
                    height: 100%;
                    font-size: 16px;
                    padding: 0 5px;
                }

                .n-input__textarea-el {
                    caret-color: #fff;
                    height: 100%;
                    font-size: 16px;
                    padding: 0 5px;
                }
                
                .n-input__placeholder {
                    height: 100%;
                    span {
                        color: #9497A1;
                        font-size: 16px;
                        letter-spacing: 2px;
                        margin-left: 2px;
                    }        
                }
                
                .n-input__border {
                    border: none;
                }
                
                .n-input__state-border {
                    border: none;
                    box-shadow: none;
                }
                
                .search-icon {
                    z-index: 6;
                    width: 22px;
                    height: 22px;
                    margin-left: 10px;
                }
            }


        }

        .button {
            width: 111px;
            height: 48px;
            border-radius: 8px;
            background: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%);
            text-align: center;
            line-height: 48px;
            margin-left: 15px;
        }

        .game_list {
            height: 85.885px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            position: absolute;
            top: 0px;
            right: 0px;
            background-color: #0B0B0B;
            padding-left: 35px;

            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 35px;
                height: 100%;
                clip-path: polygon(0 0, 100% 0, 0 100%);
                background: url('/img/home/bg.webp') no-repeat;
                background-size: 100% 100%;
                background-position: center center;
            }

            >div {
                display: flex;
                align-items: center;
                flex-direction: row;
                justify-content: center;
                width: 169px;
                height: 52px;
                cursor: pointer;
                color: #AFB6BD;
                font-weight: 500;
                font-size: 20px;
                gap: 5px;

                &.game_active {
                    // color: #fff;
                    // background: url('/img/home/btnBG.webp?t=@{timestamp}') no-repeat;
                    // background-size: 100% 100%;
                    color: #B5A4FF;
                    &::after {
                        position: absolute;
                        bottom: 10px;
                        content: '';
                        height: 5px;
                        width: 70px;
                        border-radius: 100px;
                        border-bottom: 1px solid #000;
                        background: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%);
                    }
                }
                img {
                    width: 24px;
                    height: 24px;
                }
                >span {
                    line-height: 16px;
                }
            }

            .fade-enter-active, .fade-leave-active {
                transition: opacity 0.5s ease;
            }

            .fade-enter, .fade-leave-to {
                opacity: 0;
            }
        }
    }

    .game-content {
        position: relative;
        .game-detail {
            background: #0B0B0B;
            width: 100%;
            margin-top: 30px;

            .game-detail-data {
                position: relative;
                padding: 10px 8px 10px 12px;
                .game-list {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 12px 9px;
                    flex-wrap: wrap;
                    
                    .item {
                        width: 164px;
                        height: 205px;
                        position: relative;
                        background: transparent;

                        .game-img {
                            background: transparent;
                            width: 164px;
                            height: 164px;
                            cursor: pointer;
                            img {
                                border-top-left-radius: 10px;
                                border-top-right-radius: 10px;
                                width: 164px;
                                height: 164px;
                                object-fit: none;
                            }
                        }

                        .game-info {
                            border-bottom-left-radius: 10px;
                            border-bottom-right-radius: 10px;
                            background: #222222;
                            color: #FFFFFF;
                            font-size: 16px;
                            font-weight: 500;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            height: 41px;
                            padding: 0 10px;
                            .title {
                                overflow-x: scroll;
                                white-space: nowrap;
                            }
                            .heart {
                                width: 20px;
                                height: 20px;
                                margin-top: 3px;
                                cursor: pointer
                            } 
                        }

                        .fav {
                            position: absolute;
                            top: 10px;
                            right: 15px;
                        }
                    }

                }

                .nodata {
                    color: #AFB6BD;
                    padding: 0;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        }
    }

    .pagination {
        padding: 40px 0 50px 0;
        justify-content: center;
        justify-content: center;
        background: #0B0B0B;

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
}
</style>
<style lang='less'>

.content {
    max-width: 100%;
}

</style>