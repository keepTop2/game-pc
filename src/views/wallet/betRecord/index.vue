<template>
    <n-flex vertical class="record_page wallet_recharge_record">
        <!-- 切换 -->
        <!-- <n-flex class="tabs">
            <div class="tab"> {{ t('betRecord_page_club') }}</div>
            <div class="tab active_tab">{{ t('betRecord_page_casino') }}</div>
        </n-flex> -->
        <!-- 搜索 -->
        <n-flex vertical class="search_box">
            <n-flex class="search_row">
                <n-flex :wrap="false" :align="'center'">
                    <div>{{ t('betRecord_page_platform') }}</div>
                    <n-select class="search_select" @update:value="statusChange" v-model:value="params.platform_id"
                        :options="optionsPlat" />
                </n-flex>
                <n-flex style="margin-left:80px" :wrap="false" :align="'center'">
                    <div>{{ t('betRecord_page_game') }}</div>
                    <n-select class="search_select" @update:value="currencyChange" v-model:value="params.game_type"
                        :options="optionsGame" />
                </n-flex>
            </n-flex>

            <n-flex class="search_row" :align="'center'">
                <div>{{ t('auditRecord_page_time') }}</div>
                <DateSelect @submit="changeDate" />
                <div class="btn search_btn" @click="pageChange(1)">{{ t('proxy_page_search') }}</div>
                <span style="flex:1;text-align:right">{{ t('auditRecord_page_timeTips') }}</span>
            </n-flex>
        </n-flex>
        <!-- 表格 -->
        <div class="table">
            <n-flex class="tr th">
                <div class="td" v-for="(item, i) in tableHeader" :key="i">{{ item.title }}</div>
            </n-flex>

            <n-flex class="tr" v-for="(row, index) in result.list" :key="index">
                <div class="td" v-for="(item, i) in tableHeader" :key="i" v-html="rowHandle(row, item.key)"></div>
            </n-flex>

            <div class="nodata" v-if="!result.list.length && !loading">
                <img src="/img/wallet/nodata.webp" alt="nodata">
                <div>{{ t('home_page_nomore_data') }}</div>
            </div>
            <div class="t_loading">
                <n-spin v-show="loading" />
            </div>
        </div>

        <!-- 分页 -->
        <n-pagination :default-page-size="20" class="pagination" @update:page="pageChange" v-model:page="params.page"
            :item-count="result.total_page" v-show="result.total_page" />
    </n-flex>
</template>

<script setup lang='ts'>
import { reactive, computed, onUnmounted, ref } from 'vue';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import DateSelect from "@/components/DateSelect.vue"
import { Net } from "@/net/Net";
import { NetPacket } from "@/netBase/NetPacket";
import { PlatformValueMap } from "@/enums/walletEnum"
import { convertObjectToDateString } from "@/utils/dateTime"
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const tableHeader = computed(() => {
    return [ // 表头
        { title: t('betRecord_page_platform'), key: 'platform_id' },
        { title: t('betRecord_page_game'), key: 'game_type' },
        { title: t('betRecord_page_betAmount'), key: 'bet_total' },
        { title: t('betRecord_page_winLose'), key: 'net_value' },
        { title: t('betRecord_page_settlement'), key: 'balance_time' },
    ]
})

type OptionListType = { value: number, label: string }[];
const platformList = ref<OptionListType>([]);
const optionsPlat = computed(() => { // 平台
    const options = platformList.value
    options.unshift({ value: 0, label: t('promo_page_all') })
    return options
})
const gameList = ref<OptionListType>([]);
const optionsGame = computed(() => { // 游戏
    const options = gameList.value
    options.unshift({ value: 0, label: t('promo_page_all') })
    return options
})

const params: any = reactive({ // 参数
    page: 1,
    platform_id: 0,
    game_type: 0,
    play_type: 0,
})
const result: any = reactive({ // 结果
    total_page: 0,
    list: []
})

const loading = ref(false)
const resultHandle = (rs: any) => { // 数据处理
    setTimeout(() => {
        loading.value = false
    }, 300)
    result.total_page = rs.total_pages || 0
    result.list = rs.bet_record_list || []
}
const platformHandle = (rs: any) => { // 平台数据处理
    platformList.value = rs.plat_rec_list.map((item: any) => {
        return { value: Number(item), label: PlatformValueMap[item] }
    })
    gameList.value = rs.gtype_rec_list.map((item: string) => {
        let key = item
        try {
            key = PlatformValueMap[item.split('_')[0]] + '_' + item.split('_')[1]
        } catch {

        }
        return { value: item, label: t(key) }
    })
}
const rowHandle = (row: any, key: string) => { // 格子数据处理
    let rs = ''
    let str = row.game_type.split('_')
    let val = row[key]

    switch (key) {
        case "platform_id":
            rs = str[0]
            break
        case "bet_total":
            rs = Math.abs(val).toLocaleString()
            break
        case "net_value":
            rs = `<span style="color:${Number(val) > 0 ? '#80FF44' : '#FF2424'}">${Number(val).toLocaleString()}</span>`
            break
        case "balance_time":
            rs = convertObjectToDateString(val)
            break
        default:
            rs = t(row.platform_id + '_' + str[1])
    }
    return rs


}


const changeDate = (date: any) => { // 切换时间
    Object.assign(params, date)
    params.page = 1
    loading.value = true
    setTimeout(() => {
        pageChange(1)
    }, 500)
}
const pageChange = (page: number) => { // 切换页码
    params.page = page
    queryData()
}
const statusChange = (value: string) => { // 切换平台
    params.platform_id = value
    queryData()
}
const currencyChange = (value: string) => { // 切换游戏
    params.game_type = value
    queryData()
}
const queryData = () => { // 查询
    result.total_page = 0
    result.list = []
    const query = NetPacket.req_get_bet_record_list()
    Object.assign(query.start_time, params.start_time)
    Object.assign(query.end_time, params.end_time)
    query.page_num = params.page
    query.platform_id = params.platform_id
    query.game_type = params.game_type.toString()
    query.play_type = params.play_type
    loading.value = true
    Net.instance.sendRequest(query);
    setTimeout(() => {
        getPlatformData()
    }, 300)
}
const getPlatformData = () => { // 获取平台数据
    const query = NetPacket.req_platform_gametype_list()
    Object.assign(query.start_time, params.start_time)
    Object.assign(query.end_time, params.end_time)
    Net.instance.sendRequest(query);
}
setTimeout(() => {
    getPlatformData()
}, 500)

// 回执监听
MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_get_bet_record_list,
    resultHandle,
);
MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_platform_gametype_list,
    platformHandle,
);
onUnmounted(() => {
    // 取消监听
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_bet_record_list, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_platform_gametype_list, null);
});
</script>

<style lang='less' scoped>
@import '@/assets/recordPage.less';

.wallet_recharge_record {
    font-size: 14px;
    user-select: none;

    .tabs {
        margin-bottom: 20px;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 14px;
        background: linear-gradient(0deg, #1D0E4A, #1D0E4A),
            radial-gradient(50% 50% at 50% 50%, rgba(126, 126, 126, 0.1) 0%, rgba(21, 21, 21, 0.1) 100%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.1) 100%);

        .tab {
            flex: 1;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #8D84C5;
        }

        .active_tab {
            background: url(/img/wallet/tabBtnBG.webp) no-repeat;
            background-size: 100% 112%;
            color: #fff;
        }
    }
}
</style>
