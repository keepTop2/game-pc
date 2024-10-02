<template>
    <div class="sidebar">
        <!-- <div class="game_records">
            <div
                @click="router.push({ path: '/gameMain/gameRecords', query: { name: 'home_page_recentGameHistory' } })">
                <iconpark-icon icon-id="Group39319" color="#fff" size="1.5em"></iconpark-icon>
                <span>{{ t('home_page_recentGameHistory') }}</span>
            </div>

            <span class=""> 0</span>
        </div>
         <div class="sidebar_public" v-for="(item, i) in state.clubList" :key="i">
            <p> {{ t(item.title) }} </p>
            <div :class="`club_box${g}`" v-for="(game, g) in item.list" :key="g" @click="itemClick(game)">
                <p>
                    <Imgt :src="game.icon" alt="" class="float_img" />
                    <span>{{ t(game.name) }}</span>
                </p>
            </div>
        </div>-->
        <!-- 游戏 -->
        <div class="sidebar_public">
            <p> {{ t(state.gameList.title) }} </p>
            <div>
                <p :class="state.active == game.name ? 'hover' : ''" v-for="(game, g) in state.gameList.list" :key="g"
                    @click="onClickGame(game, g)">
                    <Imgt :src="game.icon" alt="" class="float_img" v-if="game.float" />
                    <iconpark-icon v-else :icon-id="game.icon" :color="game.color" size="1rem"></iconpark-icon>
                    <span>{{ t(game.name) }}</span>
                </p>
            </div>
        </div>
        <!-- 活动 -->
        <div class="sidebar_public">
            <p> {{ t(state.activityList.title) }} </p>

            <div>

                <p :class="state.active == g ? 'hover' : ''" v-for="(_v, g) of activityTitleList" :key="g"
                    @click="activityItemClick(g)">


                    <Imgt :src="t(String(setIconLink(String(g))))" alt="" class="icon_img" />
                    <!-- <iconpark-icon v-else :icon-id="game.icon" :color="game.color" size="1rem"></iconpark-icon> -->
                    <span>{{ t(g) }}</span>
                </p>
            </div>
        </div>
        <div class="sidebar_public" v-for="(item, i) in state.sideList" :key="i">
            <p> {{ t(item.title) }} </p>
            <div>
                <p :class="state.active == game.name ? 'hover' : ''" v-for="(game, g) in item.list" :key="g"
                    @click="itemClick(game)">
                    <Imgt :src="game.icon" alt="" class="float_img" v-if="game.float" />
                    <iconpark-icon v-else :icon-id="game.icon" :color="game.color" size="1rem"></iconpark-icon>
                    <span>{{ t(game.name) }}</span>
                </p>
            </div>
        </div>

        <!-- 俱乐部 -->
<!--        <club ref="clubModal" :openType="openType" />-->
    </div>
</template>
<script lang="ts" setup name="sider">
import { onMounted, onUnmounted, reactive, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import pinia from '@/store/index';
import Imgt from '@/components/Imgt.vue';
// import { User } from '@/store/user';

import { Page } from '@/store/page';
import { NetPacket } from "@/netBase/NetPacket";
import { Net } from "@/net/Net";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";
const { activityTitleList } = storeToRefs(Page(pinia));

const { t } = useI18n();

// const club = defineAsyncComponent(() => import('@/views/club/index.vue'));
const router = useRouter();
const route = useRoute();

// const userinfo = User(pinia);
// const { hasLogin } = storeToRefs(userinfo);

// const route = useRoute();

// const clubModal = ref()
// const openType = ref('club')

const state: any = reactive({
    active: '',
    clubList: [
        {
            title: 'home_page_club',
            list: [
                {
                    icon: '/img/home/club1.webp',
                    name: 'home_page_club',
                    url: '/gameMain/club/club',
                    color: '',
                    value: 'club',
                },
                {
                    icon: '/img/home/club2.webp',
                    name: 'home_page_clubCreated',
                    url: '/gameMain/club/clubJoin',
                    color: '',
                    value: 'clubJoin',
                },
            ]
        },
    ],
    gameList: {
        title: 'home_page_game',
        list: [
            {
                icon: 'Group39324',
                name: 'home_page_hot',
                url: '/gameMain/gamingPlatform',
                color: '',
                value: '',
            },
            {
                icon: 'Group39096',
                name: 'home_page_slot',
                url: '/gameMain/gamingPlatform',
                color: '',
                value: '',
            },
            {
                icon: 'Group39095',
                name: 'home_page_live',
                url: '/gameMain/gamingPlatform',
                color: '',
                value: '',
            },
            {
                icon: 'Group39098',
                name: 'home_page_fishing',
                url: '/gameMain/gamingPlatform',
                color: '',
                value: '',
            },

            {
                icon: 'Group39099',
                name: 'home_page_sportsGame',
                url: '/gameMain/gamingPlatform',
                color: '',
                value: '',
            },
            {
                icon: 'Group1556235261',
                name: 'home_page_pokerGame',
                url: '/gameMain/gamingPlatform',
                color: '',
                value: '',
            },
            {
                icon: 'Group1556235309',
                name: 'home_page_lotteryGame',
                url: '/gameMain/gamingPlatform',
                color: '',
                value: '',
            },
        ],
    },
    activityList: {
        title: 'home_page_activity',
        list: null
    },
    sideList: [
        {
            title: 'home_page_agencyCenter',
            list: [
                {
                    icon: 'Group39329',
                    name: 'home_page_agencyCooperation',
                    url: '/gameMain/proxyCooperation',
                    color: '',
                    value: 'proxy_coop',
                },
                {
                    icon: 'Group39328',
                    name: 'home_page_agentIntroduction',
                    url: '/gameMain/proxyIntroduction',
                    color: '',
                    value: '',
                },
            ]
        },
        {
            title: 'home_page_vipLevel',
            list: [
                {
                    icon: 'Group39330',
                    name: 'home_page_vipLevel',
                    url: '/gameMain/levelInfo',
                    color: '',
                    value: 'level',
                },
                {
                    icon: 'huiyuandengji',
                    name: 'level_page_rule',
                    url: '/gameMain/levelRule',
                    color: '',
                    value: 'level',
                },
            ]
        },

    ],
})
const activityItemClick = (key: any) => {
    router.push(
        {
            path: '/gameMain/activity',
            query: {
                typeName: key,
                name: key,
            }
        }
    )
}
const onClickGame = (item: any, idx: any) => {
    router.push({
        path: '/gameMain/gamingPlatform',
        query: {
            id: idx,
            name: item.name
        }
    })
}
const itemClick = (item: any) => {
    if (item.url) {
        router.push(
            {
                path: item.url,
                query: {
                    name: item.name,
                    link: item.pic_link,
                    detail: item.content
                }
            }
        )
    }
    // 俱乐
    // if (['club', 'clubJoin'].includes(item.value)) {
    //     openType.value = item.value
    //     clubModal.value.openModal()
    // }

    state.active = item.name
}
const setIconLink = (str: string) => {
    let str1 = str.split('_')
    let str2
    if (str1.length > 0) {
        str2 = str1[0] + '_' + str1[1] + '_icon_' + str1[2]
    }
    return str2
}
const handleActivetys = async (res: any) => {
    await Page(pinia).setActivityTitleList(res.promo)
}
onMounted(async () => {
    if (route.query.name) {
        state.active = route.query.name
    }
    // 获取所有活动  activities_category_icon_
    const req = NetPacket.req_activites();
    req.show = 0
    Net.instance.sendRequest(req);
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_activites,
        handleActivetys
    );
});
onUnmounted(() => {
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_activites, null);

});
watch(
    () => route.query.name,
    async (n: any) => {
        if (n) {
            state.active = route.query.name
        }
    }
)
</script>
<style lang='less' scoped>
@timestamp: `new Date().getTime()`;

.sidebar {
    width: 270px;
    box-sizing: border-box;
    box-shadow: 0 -1px 10px 0 rgba(0, 0, 0, 0.4);
    background-color: var(--c-bg-1);
    padding: 33px 10px 0;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    color: var(--c-inactive);

    >.sidebar_public {
        >p {
            margin: 34px 0 6px;
        }

        .club_box0 {
            background: url('/img/home/club1Bg.webp?t=@{timestamp}') no-repeat;
            background-size: contain;
            padding: 0;
            margin: 20px 0 10px;

            >p>span {
                padding-left: 64px;
                color: var(--c-white);
            }
        }

        .club_box1 {
            background: url('/img/home/club2Bg.webp?t=@{timestamp}') no-repeat;
            background-size: contain;
            padding: 0;

            >p>span {
                padding-left: 64px;
                color: var(--c-white);
            }
        }

        .float_img {
            position: absolute;
            width: 58px;
            height: 58px;
            bottom: 5px;
            left: 5px;

        }

        .icon_img {
            width: 1rem;
            height: 1rem;
        }

        >div {
            padding-left: 26px;

            >p {
                display: flex;
                position: relative;
                align-items: center;
                transform-style: preserve-3d;
                margin: 0;
                padding: 14px 0;
                cursor: pointer;

                >span {
                    margin-left: 5px;
                }


            }

            .hover {
                color: var(--c-white);
            }

            .hover::after {
                display: block;
                content: '';
                position: absolute;
                width: 6px;
                height: 100%;
                right: -17px;
                background: linear-gradient(to bottom, #fbd03b, #fa7800 67%), no-repeat;
            }

            .hover::before {
                display: block;
                content: '';
                position: absolute;
                width: 270px;
                height: 100%;
                left: -35px;
                transform: translateZ(-10px);
                background: linear-gradient(to right, #1154ff 0%, #2a7cff 100%) no-repeat;
            }


        }
    }

    >.game_records {
        width: 250px;
        height: 50px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        border-radius: 14px;
        box-shadow: inset 0 0 6px 0 #1d92fa;
        background-color: #402c95;
        color: var(--c-white);
        cursor: pointer;

        >div {
            display: flex;
            align-items: center;

            >span {
                margin-left: 5px;

            }
        }

        >span {
            color: #1dd2fa;
            font-size: 18px;
        }
    }
}
</style>
