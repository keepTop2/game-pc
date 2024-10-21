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

    <!-- <Games></Games> -->

</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { Net } from '@/net/Net';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetPacket } from '@/netBase/NetPacket';
import { NetMsgType } from '@/netBase/NetMsgType';
import { useI18n } from 'vue-i18n';
// import { getRandomSign, md5, getDeviceId } from '@/net/Utils';
// import { useRouter } from 'vue-router';
import { Local } from '@/utils/storage';
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { User } from '@/store/user';
import { Message } from '@/utils/discreteApi';
import { Page } from '@/store/page';
import Games from "@/components/Games.vue";
const { lang, homeGameData } = storeToRefs(Page(pinia));
const { allCollected } = storeToRefs(User(pinia));
const imgPrefix = 'http://18.167.175.195:8032/uploads/'
const { t } = useI18n();
const queryGame = ref("")
// 加载更多
const loading = ref(false)
const isLoading = ref(false)
const gameId = ref(null)
// 游戏平台id  -1为查看全部的游戏
let agentId = ref<any>(-1)
// 是否属于场馆或者火热的游戏 为0时 则kindId 为场馆id或火热  为1时  则kindId取右侧tab的值
let is_lable = ref(0)
// 右侧标签id  // -1为查找当前平台所有的游戏 //也表示场馆id
let kindId = ref(-1)
const params: any = reactive({ // 参数
    isLoad: false,
    isEnd: false,
    pageSize: 32,
    page: 1,
})
// 右侧标签点击样式
const lableActive = ref(0)
const state = reactive({
    kindList: [
        {
            name: '收藏',
            icon: 'shoucang',
            activeIcon: 'shoucangun',
            id: -2,
            key: 3
        },
        {
            name: '最近',
            icon: 'zuijin',
            activeIcon: 'zuijinun',
            id: -3,
            key: 2
        },


    ]
})
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
    tb.agentId = agentId.value;
    // 标签id
    tb.kindId = kindId.value;
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
    tb.agentId = agentId.value;
    tb.kindId = kindId.value;
    tb.gameId = v.gameId;
    tb.lang = langObj[lang.value];
    Net.instance.sendRequest(tb);
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
}
const handleQuery = (res: any) => {
    result.list = res.info
}
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
onMounted(() => {
    // MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_get_kind_in_platform, handlePlatform);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_get_games_in_platform, handleGames);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_look_for_game_name, handleQuery);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_3rd_game_login_result, gameUrlResult);
    MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_modify_collect, resCollect);

    queryData()
})
onUnmounted(() => {
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_kind_in_platform, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_games_in_platform, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_look_for_game_name, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_3rd_game_login_result, null);
})
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
</style>
