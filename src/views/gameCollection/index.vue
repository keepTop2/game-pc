<template>
    <div class="game_title">
        <div class="input_box">
            <n-input type="text" clearable :placeholder="t('home_page_seachGame')" v-model:value="queryGame"
                size="large" @keyup.enter="onClickSearch">
                <template #prefix>
                    <iconpark-icon icon-id="gliconshous" color="#8e82c2" size="1rem"
                        style="cursor:pointer"></iconpark-icon>
                </template>
            </n-input>
            <n-button class="login_btn" :bordered="false" block @click="onClickSearch">{{ t('game_page_seach')
                }}</n-button>
        </div>

        <div class="tab_box">
            <n-tabs v-model:value="state.lableActive" @update:value="changeLableTab">
                <n-tab-pane :name="item.kindId" v-for="(item, i) in kindList" :key="i">
                    <template #tab>
                        <div class="tab_div">
                            <img :src="state.lableActive === item.kindId ? item.icon_after : item.icon_before" alt=""
                                srcset="">
                            <span :class="state.lableActive == item.kindId && 'n-tabs-tab--active'">

                                {{
                                    unserialize(item.kind_name, true) }}
                            </span>
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
            <n-infinite-scroll style="height: 75vh" :distance="10" @load="onLoad" v-else>
                <n-grid :x-gap="7" :y-gap="12" :cols="8">
                    <n-grid-item v-for="(v, i) in result.list" :key="i" @click="onPlayGame(v)">
                        <div class="game_box">
                            <n-image width="100%" :src="settings.backend_upload + v.gamePicturePC"
                                fallback-src="/logo.png" />
                            <!-- <img :src="imgPrefix + v.gamePicturePC"> -->
                            <div class="game_name">
                                <n-tooltip trigger="hover">
                                    <template #trigger>
                                        <span class="text_hidden">{{ unserialize(v.name, true) }}</span>
                                    </template>
                                    {{ unserialize(v.name, true) }}
                                </n-tooltip>

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

</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { Net } from '@/net/Net';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetPacket } from '@/netBase/NetPacket';
import { NetMsgType } from '@/netBase/NetMsgType';
import { useI18n } from 'vue-i18n';
import { Local } from '@/utils/storage';
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { User } from '@/store/user';
import { Message } from '@/utils/discreteApi';
import { Page } from '@/store/page';
import Loading from '@/components/Loading.vue'

const { lang, settings } = storeToRefs(Page(pinia));
const { allCollected } = storeToRefs(User(pinia));

const { t } = useI18n();
const queryGame = ref("")
const props = defineProps({
    // 游戏平台id  -1为查看全部的游戏

    agentId: {
        type: Number,
        default: -1
    },
    // 是否属于自定义标签
    //为0时 则kindId取右侧tab的值  -1为全部  -2为收藏，-3为最近
    //为1时  则kindId 为场馆id或  火热 1
    lableId: {
        type: Number,
        default: 0
    },
    // 右侧标签id  // -1为查找当前平台所有的游戏 //也表示场馆id

    kindId: {
        type: Number,
        default: -2
    },
    // 右侧标签点击样式

    lableActive: {
        type: Number,
    },
    kindList: {
        type: Array<any>,
        default: [
            {
                kind_name: "{\"zh-CN\":\"最近\",\"vi-VN\":\"gần đây\",\"en-US\":\"Recent\"}",
                kindId: -3,
                key: 2,
                icon_after: '/img/game/zuijin_un.webp',
                icon_before: '/img/game/zuijin.webp'
            },
            {
                kind_name: "{\"zh-CN\":\"收藏\",\"vi-VN\":\"Yêu thích\",\"en-US\":\"Favorites\"}",
                kindId: -2,
                key: 3,
                icon_after: '/img/game/shoucang_un.webp',
                icon_before: '/img/game/shoucang.webp'
            },
        ]
    },

})
// 加载更多
const loading = ref(false)
const isLoading = ref(false)
const gameId = ref(null)
// const agentId = ref<any>(-1)
// const lableId = ref(1)
// const kindId = ref(-2)
// let lableActive = ref(-1)
const state = reactive({
    agentId: -1,
    lableId: 1,
    kindId: -2,
    lableActive: -2
})
const params: any = reactive({ // 参数
    isLoad: false,
    isEnd: false,
    pageSize: 32,
    page: 1,
})
const kindList: any = ref([])

const result: any = reactive({ // 结果
    total_page: 0,
    list: []
})
// const router = useRouter();
// const userInfo = User(pinia);
// const { isLogin } = storeToRefs(userInfo);
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
// 搜索游戏
const onClickSearch = () => {
    if (!queryGame.value) {
        Message.error(t('player_info_tip_1'))
        return
    }
    let tb = NetPacket.req_look_for_game_name()
    // 游戏平台id
    tb.agentId = state.agentId;
    // 标签id
    tb.kindId = state.kindId;
    tb.name = queryGame.value
    Net.instance.sendRequest(tb)
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
    tb.agentId = state.agentId;
    tb.kindId = state.kindId;
    tb.gameId = v.gameId;
    tb.lang = langObj[lang.value];
    Net.instance.sendRequest(tb);
}
const queryData = () => { // 查询
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_get_games_in_platform, handleGames);

    setTimeout(() => {
        loading.value = true
        isLoading.value = true
        const query = NetPacket.req_get_games_in_platform()
        console.log('二级页请求=》》》》》');

        query.agentId = state.agentId
        query.kindId = state.kindId
        query.lableId = state.lableId
        query.page = params.page
        query.pageSize = params.pageSize
        Net.instance.sendRequest(query);
    }, 0)
}
//切换右侧标签事件
const changeLableTab = (item: any) => {
    state.lableId = item
    state.lableActive = item
    resetData()
    queryData()
}
const onLoad = async () => {
    if (params.isEnd) return
    if (!loading.value) {
        params.isLoad = true
        params.page++
        queryData()
    }

};
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

    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_games_in_platform, null);
}
const handleQuery = (res: any) => {
    result.list = res.info
}
// 添加取消收藏
const reqCollect = async (game: any) => {
    gameId.value = game.gameId
    const query = NetPacket.req_modify_collect()
    query.agent_id = state.agentId
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
//  打开游戏
let newTab = ref()
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
const resetData = () => {
    loading.value = false
    params.page = 1
    params.isLoad = false
    params.isEnd = false
    result.total_page = 0
    result.list = []
}

onMounted(() => {

    state.agentId = props.agentId
    state.lableId = props.lableId
    state.kindId = props.kindId
    if (props.lableActive) {
        state.lableActive = Number(props.lableActive)
    }


    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_get_games_in_platform, handleGames);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_look_for_game_name, handleQuery);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_3rd_game_login_result, gameUrlResult);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_modify_collect, resCollect);
    if (props.kindList.length > 0) {
        kindList.value = props.kindList
        queryData()
    }

})
onUnmounted(() => {
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_kind_in_platform, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_games_in_platform, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_look_for_game_name, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_3rd_game_login_result, null);
})
watch(
    () => props.kindId,
    (a) => {
        if (a.length > 0) {
            resetData()
            queryData()
        }
    }
)
watch(
    () => props.kindList,
    (a) => {
        if (a.length > 0) {
            kindList.value = a
            state.lableActive = -1
            state.lableId = 0
            resetData()
            queryData()
        }
    }
)
watch(
    () => props.agentId,
    (a) => {
        if (a) {
            state.agentId = a
            console.log('agentId变了');
            resetData()
            queryData()
            // queryData()
        }
    }
)

</script>

<style lang='less' scoped>
.game_title {
    height: 85.88px;
    border-radius: 14px;
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    color: #8d81c1;
    font-size: 18px;
    flex-direction: row-reverse;

    >.input_box {
        display: flex;

        width: 522px;


        height: 56px;

        align-items: center;

        .login_btn {
            width: 111px;
            height: 48px;
            margin-left: 18px;
        }

        :deep(.n-input) {

            border-radius: 8px;
            background: #030309;
            //     .n-input__input {
            //         display: flex;
            //         align-items: center;
            //     }

            .n-input__input-el {
                font-size: 18px;
            }

            .n-input__border {
                border: none;
            }

            .n-input__placeholder {
                color: #9497A1;



                >span {

                    font-size: 16px;
                }
            }
        }


    }

    .tab_box {
        background-color: #0B0B0B;
        padding: 14px 50px 23.88px 24px;
        clip-path: polygon(0 0, 90% 0%, 100% 100%, 0% 100%);

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

            >img {
                width: 24px;
                height: 24px;
            }
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
        height: 190px;
        position: relative;
        background-color: #222;
        cursor: pointer;
        line-height: 1;
        border-radius: 15px;

        >.game_img {
            width: 164px;
            height: 164px;

        }

        >.game_name {
            width: 100%;

            display: flex;
            justify-content: space-between;
            padding: 5px 8px;
            position: absolute;
            bottom: 0;
            left: 0;

            >.text_hidden {
                width: 80%;
                color: #fff;
                font-size: 16px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
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
</style>
