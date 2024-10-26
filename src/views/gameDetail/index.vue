<template>
    <div class="game_detail">
        <Imgt class="game_img" :src="`/img/game/${kindId}.webp`" />
        <div class="game_plat_list">
            <scroll-view>
                <span class="game_plat" :class="{ game_active: agentId == v.id }" v-for="(v, i) in threeGameKinds"
                    :key="i" @click="onClickTab(v)">
                    <!-- <img :src="settings.backend_upload + v.picture_pc" alt="" /> -->
                    {{ unserialize(v.name, false) }}
                </span>

            </scroll-view>
        </div>

        <Games :kindList="kindList" :agentId="agentId" :is_lable="is_lable" :kindId="kindId" :lableActive="lableActive">
        </Games>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';

import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { Page } from '@/store/page';
import { useRoute } from 'vue-router';
// import { useI18n } from 'vue-i18n';

import Games from '../gameCollection/index.vue';
import ScrollView from "@/components/ScrollView.vue";
const { settings } = storeToRefs(Page(pinia));
// const { t } = useI18n();
const route = useRoute()
// const router = useRouter()
const { lang, homeGameData } = storeToRefs(Page(pinia));



const kindList = [
    {
        name: 'game_page_all',
        icon: 'all',
        activeIcon: 'allun',
        id: -1,
        key: 0
    },
    {
        name: 'game_page_hot',
        icon: 'hot',
        activeIcon: 'hotun',
        id: 1, // 获取热门需将 is_lable 设置为1  其他为0,
        key: 1
    },
    {
        name: 'game_page_recent',
        icon: 'zuijin',
        activeIcon: 'zuijinun',
        id: -3,
        key: 2
    },
    {
        name: 'game_page_fav',
        icon: 'shoucang',
        activeIcon: 'shoucangun',
        id: -2,
        key: 3
    },

]


// 游戏平台id  -1为查看全部的游戏
let agentId = ref<any>(-1)
// 是否属于场馆或者火热的游戏 为0时 则kindId 为场馆id或火热  为1时  则kindId取右侧tab的值
let is_lable = ref(0)
// 右侧标签id  // -1为查找当前平台所有的游戏 //也表示场馆id
let kindId = ref(-1)
// 右侧标签点击样式
const lableActive = ref(-1)
let threeGameKinds = ref<any[]>([])

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

const onClickTab = (v: any) => {
    agentId.value = v.id
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

onMounted(() => {
    const { venue_id } = route.query
    kindId.value = Number(venue_id)
    getHomeData()

})

watch(
    () => route.query.venue_id,
    (a) => {
        if (![3, 4].includes(Number(a))) {
            kindId.value = Number(a)
            getHomeData()
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

    :deep(.game_title) {
        flex-direction: row !important;
    }

    :deep(.tab_box) {
        padding: 14px 24px 23.88px 50px !important;
        clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%) !important;
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
            font-size: 32px;
            position: relative;

            >img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
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
}
</style>