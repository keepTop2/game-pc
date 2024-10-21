<template>
    <div class="game_detail">
        <Imgt class="game_img" :src="`/img/game/${kindId}.webp`" />
        <div class="game_plat_list">
            <scroll-view>
                <span class="game_plat" :class="{ game_active: agentId == v.id }" v-for="(v, i) in threeGameKinds"
                    :key="i" @click="onClickTab(v)">{{ unserialize(v.name, false) }}</span>

            </scroll-view>
        </div>
        <div class="game-title">
            <div class="input_box">
                <n-input type="text" clearable :placeholder="t('home_page_seachGame')" v-model:value="queryGame"
                    size="large" @keyup.enter="onClickSearch">
                    <template #prefix>
                        <iconpark-icon icon-id="gliconshous" color="#8e82c2" size="1rem"
                            style="cursor:pointer"></iconpark-icon>
                    </template>
                </n-input>
                <n-button class="login_btn" :bordered="false" block @click="onClickSearch">搜索</n-button>
            </div>
            <div class="tab_box">
                <n-tabs :default-value="lableActive" @update:value="changeLableTab">
                    <n-tab-pane :name="item.id" v-for="(item, i) in state.kindList" :key="i">
                        <template #tab>
                            <div class="tab_div">
                                <iconpark-icon class="right"
                                    :icon-id="lableActive == Number(item.key) ? item.activeIcon : item.icon"
                                    size="1.2rem"></iconpark-icon>
                                <span :class="lableActive == Number(item.key) && 'n-tabs-tab--active'">{{ item.name
                                    }}</span>
                            </div>
                        </template>

                    </n-tab-pane>


                </n-tabs>
            </div>
        </div>


        <div class="games">
            <div>

                <div class="nodata" v-if="!result.list.length && !loading">
                    <img src="/img/wallet/nodata.webp" alt="nodata">
                    <div>{{ t('home_page_nomore_data') }}</div>
                </div>
                <n-infinite-scroll style="height: 85vh" :distance="10" @load="onLoad" v-else>
                    <n-grid :x-gap="7" :y-gap="12" :cols="8">
                        <n-grid-item v-for="(v, i) in result.list" :key="i" @click="onPlayGame(v)">
                            <div class="game_box">

                                <img :src="imgPrefix + v.gamePicturePC">
                                <div>
                                    <span>{{ unserialize(v.name, true) }}</span>
                                    <iconpark-icon v-if="Local.get('user')"
                                        :name="allCollected.includes(v.gameId) ? 'dianzanun' : 'dianzan'" size="1rem"
                                        @click.stop="reqCollect(v)"></iconpark-icon>
                                </div>
                            </div>
                        </n-grid-item>
                    </n-grid>

                </n-infinite-scroll>
            </div>


        </div>
        <Loading v-model:visible="isLoading"></Loading>
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
import { Message } from '@/utils/discreteApi';
import { User } from '@/store/user';
import Loading from '@/components/Loading.vue'
import ScrollView from "@/components/ScrollView.vue";

const { t } = useI18n();
const route = useRoute()
const router = useRouter()
const { lang, homeGameData } = storeToRefs(Page(pinia));
const { allCollected } = storeToRefs(User(pinia));


const queryGame = ref("")
const isLoading = ref(false)
// 加载更多
const loading = ref(false)
const params: any = reactive({ // 参数
    isLoad: false,
    isEnd: false,
    pageSize: 32,
    page: 1,
})
const result: any = reactive({ // 结果
    total_page: 0,
    list: []
})
const state = reactive({
    kindList: [
        {
            name: '全部',
            icon: 'all',
            activeIcon: 'allun',
            id: -1,
            key: 0
        },
        {
            name: '热门',
            icon: 'hot',
            activeIcon: 'hotun',
            id: 1, // 获取热门需将 is_lable 设置为1  其他为0,
            key: 1
        },
        {
            name: '最近',
            icon: 'zuijin',
            activeIcon: 'zuijinun',
            id: -3,
            key: 2
        },
        {
            name: '收藏',
            icon: 'shoucang',
            activeIcon: 'shoucangun',
            id: -2,
            key: 3
        },

    ]
})

// 游戏平台id  -1为查看全部的游戏
let agentId = ref<any>(-1)
// 是否属于场馆或者火热的游戏 为0时 则kindId 为场馆id或火热  为1时  则kindId取右侧tab的值
let is_lable = ref(0)
// 右侧标签id  // -1为查找当前平台所有的游戏 //也表示场馆id
let kindId = ref(-1)
// 右侧标签点击样式
const lableActive = ref(0)


let threeGameKinds = ref<any[]>([])
let newTab = ref()

const imgPrefix = 'http://18.167.175.195:8032/uploads/'


// 获取场馆下所有平台
const getHomeData = () => {
    const data = homeGameData.value.find((e: any) => (e.id == Number(kindId.value)))
    // const item = data?.find((e: any) => e.name[lang.value].toUpperCase() == gameName.value)
    let a: any = {
        id: -1,
        name: { 'zh-CN': '全部', 'vi-VN': 'PG', 'en-US': 'All', },
        picture_pc: "game_icons/icon_pg.png"
    }
    threeGameKinds.value = [a, ...data.three_platform]

}
//切换右侧标签事件
const changeLableTab = (item: any) => {
    kindId.value = item
    lableActive.value = item
    if (item == 1) {
        is_lable.value = 1
    } else {
        is_lable.value = 0
    }
    queryData()
    console.log(item);

}


const handleGames = (res: any) => {
    isLoading.value = false
    if (res.info.length < params.pageSize) {
        params.isEnd = true
    }
    if (params.isLoad) {
        result.list = [...result.list, ...res.info]
    } else {
        result.list = res.info
    }

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
        'en': 3,
        'vi': 2,
        'zh': 1
    }
    isLoading.value = true
    let tb = NetPacket.req_3rd_game_login();
    tb.agentId = agentId.value;
    tb.kindId = kindId.value;
    tb.gameId = v.gameId;
    tb.lang = langObj[lang.value];
    Net.instance.sendRequest(tb);
}


const onClickTab = (v: any) => {
    agentId.value = v.id
    queryGame.value = ''
    resetData()
    queryData()
}

// 搜索游戏
const onClickSearch = () => {
    if (!queryGame.value) {
        Message.error(t('player_info_tip_1'))
        return
    }
    let tb = NetPacket.req_look_for_game_name()
    // 游戏平台id
    tb.agentId = agentId.value;
    // 标签id
    tb.kindId = kindId.value;
    tb.name = queryGame.value
    Net.instance.sendRequest(tb)
}

// 解析游戏名和平台名
const unserialize = (v: any, isPlatform: boolean) => {
    let obj: any = {
        en: 'en-US',
        zh: 'zh-CN',
        vn: 'vi-VN'
    }
    if (isPlatform) {
        v = JSON.parse(v)
    }
    return v[obj[lang.value]]
}

const resetData = () => {
    loading.value = false
    params.page = 1
    params.isLoad = false
    result.total_page = 0
    result.list = []
}

const queryData = () => { // 查询
    loading.value = true
    isLoading.value = true
    const query = NetPacket.req_get_games_in_platform()
    query.agentId = agentId.value
    query.kindId = kindId.value
    query.is_lable = is_lable.value
    query.page = params.page
    query.pageSize = params.pageSize
    Net.instance.sendRequest(query);
}

const gameUrlResult = (message: any) => {
    isLoading.value = false
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
const onLoad = async () => {
    if (params.isEnd) return
    if (!loading.value) {
        params.isLoad = true
        params.page++
        queryData()
    }

};


const gameId = ref(null)
// 添加取消收藏
const reqCollect = async (game: any) => {
    gameId.value = game.gameId
    const query = NetPacket.req_modify_collect()
    query.agent_id = agentId.value
    query.gameId = game.gameId

    query.type = allCollected.value.includes(gameId.value) ? 1 : 0

    Net.instance.sendRequest(query);
}
const resCollect = async (data: any) => {
    if (data.rlt == 0) {
        if (allCollected.value.includes(gameId.value)) {
            let arr = allCollected.value.filter((e: Number) => e != gameId.value)
            await User(pinia).getCollected(arr);
            Message.success('取消收藏成功')
        } else {
            let arr = [...allCollected.value, gameId.value]
            await User(pinia).getCollected(arr);
            Message.success('收藏成功')
        }


    } else if (data.rlt == 1) {
        Message.warning('收藏达到上限')
    } else {
        Message.error('未知错误')
    }

}


onMounted(() => {
    const { venue_id } = route.query
    kindId.value = Number(venue_id)

    // MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_get_kind_in_platform, handlePlatform);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_get_games_in_platform, handleGames);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_look_for_game_name, handleQuery);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_3rd_game_login_result, gameUrlResult);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_modify_collect, resCollect);
    getHomeData()
    queryData()
})
onUnmounted(() => {
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_kind_in_platform, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_games_in_platform, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_look_for_game_name, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_3rd_game_login_result, null);
})
watch(
    () => route.query.venue_id,
    (a) => {
        if (a) {
            kindId.value = Number(a)
            resetData()
            getHomeData()
            queryData()
        }
    }
)

</script>

<style lang='less' scoped>
@timestamp: `new Date().getTime()`;

.game_detail {
    .game_img {
        width: 100%;
        height: 320px;
    }

    :deep(.n-carousel) {
        padding-right: 10px;

        .n-carousel__slides .n-carousel__slide {
            overflow: visible;
        }

    }

    .game_plat_list {
        width: 1400px;
        height: 96px;
        overflow: hidden;
        border-radius: 16px;
        border: 1px solid #181C25;
        background: linear-gradient(180deg, #0A0B22 0%, #000 100%);
        color: #fff;
        padding: 12px;


        .game_plat {
            width: 146px;
            height: 70px;
            text-align: center;
            line-height: 72px;
            border-radius: 8px;
            background: #22283A;
            display: inline-block;
            margin-right: 10px;
            cursor: pointer;
        }

        :last-child {
            margin: 0;
        }


        .game_active {
            color: #fff;
            background: url('/img/game/btn_bg.webp?t=@{timestamp}') no-repeat;
            background-size: contain;
        }
    }

    .tab_box {
        // width: 386px;
        // height: 85.885px;
        background-color: #0B0B0B;
        padding: 14px 24px 23.88px 50px;
        clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);

        &:before {
            width: 120px;
            height: 0;
            margin: 100px auto;
            border-left: 80px solid transparent;
            border-top: 150px solid #00C1AE;
        }

        .tab_div {
            display: flex;
            align-items: center;
        }

        :deep(.n-tabs) {
            .n-tabs-tab {
                font-size: 20px;
                color: #AFB6BD;
                margin-left: 3px;
                padding-bottom: 10px;
            }

            .n-tabs-tab--active {
                color: #B5A4FF;
            }
        }


    }


}



.games {
    background-color: #0B0B0B;
    padding: 10px;

    .game_box {
        width: 164px;
        // height: 205px;
        position: relative;
        background-color: #222;
        cursor: pointer;
        line-height: 1;
        border-radius: 8px;

        >img {
            width: 164px;
            height: 164px;

        }

        >div {
            display: flex;
            justify-content: space-between;
            padding: 11px 8px;

            >span {
                color: #fff;
                font-size: 16px;
            }
        }
    }

    .game_list {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;


        .item {
            width: 164px;
            height: 205px;
            position: relative;
            background-color: #222;



            .fav {
                position: absolute;
                top: 10px;
                right: 15px;
            }
        }
    }
}

.game_title {
    flex-direction: row-reverse;
}

.tab_box {
    padding: 14px 24px 23.88px 50px;
    clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
}
</style>