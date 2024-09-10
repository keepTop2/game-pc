<!-- 代理合作-表格 -->
<template>
    <div class="record_page coop_table">

        <!-- Tabs -->
        <n-flex class="tabs" justify="space-between" align="center">
            <div class="tab" :class="{ 'active_tab': activeTab == 1 }" @click="changeTab(1)">{{ t('proxy_page_report')
                }}
            </div>
            <div class="tab" :class="{ 'active_tab': activeTab == 2 }" @click="changeTab(2)">
                {{ t('proxy_page_directly') }}</div>
            <div class="tab" :class="{ 'active_tab': activeTab == 3 }" @click="changeTab(3)">
                {{ t('proxy_page_teamReport') }}</div>
        </n-flex>

        <!-- 搜索 -->
        <n-flex class="search_box" justify="flex-start" align="center">
            <DateSelect style="flex:1" :styleMode="2" @submit="changeDate" />
            <n-select class="level" v-model:value="params.search_lev" :options="levels" />
            <div class="search_btn" @click="search">{{ t('proxy_page_search') }}</div>
        </n-flex>

        <!-- 表格 -->
        <div class="table white_table">
            <n-flex class="tr th">
                <div class="td" v-for="(item, i) in tableHeader" :key="i">{{ item.title }}</div>
            </n-flex>

            <n-flex class="tr" v-for="(row, index) in resultList" :key="index">
                <div class="td" :class="{ 'td_money': item.isMoney }" v-for="(item, i) in tableHeader" :key="i"
                  @click="clickTd(row)" v-html="rowHandle(row, item.key)"></div>
            </n-flex>
            <!-- total -->
            <n-flex class="tr tt" v-if="resultList.length">
                <div class="td" :class="{ 'td_money': item.isMoney }" v-for="(item, i) in tableHeader" :key="i">
                    <template v-if="i == 0">
                        <span>{{ t('proxy_page_total') }}</span>
                    </template>
                    <template v-else-if="item.isNumber">
                        <span>{{ getTotal(item.key) }}</span>
                    </template>
                    <template v-else>
                        <span>-</span>
                    </template>
                </div>
            </n-flex>

            <div class="nodata" v-if="!resultList.length && !loading">
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


        <!-- 等级管理 -->
        <levelManage @success="queryData" :proxyInfo="proxyInfo" ref="levelM" />
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onUnmounted, computed } from 'vue';
import DateSelect from "@/components/DateSelect.vue"
import { Net } from "@/net/Net";
import { NetPacket } from "@/netBase/NetPacket";
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import { IdentityMap } from "@/enums/proxyEnum";
import levelManage from "./levelManage.vue"
import { useI18n } from "vue-i18n";
import { storeToRefs } from 'pinia';
import pinia from "@/store";
import { User } from '@/store/user';

const { t } = useI18n()
const UserStore = User(pinia);
const { info: userInfo, roleInfo } = storeToRefs(UserStore);
const props = defineProps({
    proxyInfo: { // 当前代理详情
        type: Object,
        default: () => { }
    }
})

const levelM = ref()
const activeTab = ref(1)
const changeTab = (key: number) => {
    activeTab.value = key
}

const params: any = reactive({ // 搜索参数
    page: 1,
    search_name: "",
    search_lev: "-1",
})
const levels = computed(() => {
    const arr = []
    Object.keys(IdentityMap).map((key: string) => {
        if ((props.proxyInfo.level || 0) > Number(key)) {
            arr.push({ label: IdentityMap[key], value: key })
        }
    })
    arr.unshift({ label: t('proxy_page_all'), value: '-1' })
    return arr
})


const tableHeader = computed(() => { // 表头
    return {
        1: [
            { title: t('proxy_page_account'), key: 'username' },
            { title: t('proxy_page_tag'), key: 'level' },
            { title: t('proxy_page_teamYj'), key: 'team_return', isNumber: true, isMoney: true },
            { title: t('proxy_page_zsCommission'), key: 'personal_return', isNumber: true, isMoney: true },
        ],
        2: [
            { title: t('proxy_page_account'), key: 'username' },
            { title: t('proxy_page_tag'), key: 'level' },
            { title: t('proxy_page_yxBet'), key: 'personal_bet', isNumber: true, isMoney: true },
            { title: t('proxy_page_zsCommission'), key: 'personal_return', isNumber: true, isMoney: true },
        ],
        3: [
            { title: t('proxy_page_account'), key: 'username' },
            { title: t('proxy_page_tag'), key: 'level' },
            { title: t('proxy_page_teamBet'), key: 'team_bet', isNumber: true, isMoney: true },
            { title: t('proxy_page_teamYj'), key: 'team_return', isNumber: true, isMoney: true },
            { title: t('proxy_page_numBer'), key: 'team_num', isNumber: true },
            { title: t('proxy_page_caoZ'), key: 'operate' },
        ],
    }[activeTab.value]
})


const result: any = reactive({ // 结果
    total_page: 0,
    list: []
})
const resultList = computed(() => {
    let arr: any = []
    // 自己是不是直属
    if (props.proxyInfo.level == 0) return arr
    result.list.map((item: any) => {
        if (item.role_id == roleInfo.value?.id && activeTab.value != 3) {
            arr.push(item)
        } else if (activeTab.value == 1) {
            arr.push(item)
        } else if (activeTab.value == 2 && item.level === 0) {
            arr.push(item)
        } else if (activeTab.value == 3 && item.level !== 0 && item.role_id !== roleInfo.value?.id) {
            arr.push(item)
        }
    })
    return arr
})

const getTotal = (key: string) => { // 获取总数
    let total = 0
    resultList.value.forEach((item: any) => {
        if (userInfo.value.full_name != item.username) {
            total += Number(item[key])
        }
    })
    if (isNaN(total)) return '-'
    return Number(total).toLocaleString()
}

const loading = ref(false)
const resultHandle = (rs: any) => { // 数据处理
    setTimeout(() => {
        loading.value = false
    }, 300)
    result.total_page = rs.total || 0
    result.list = rs.records || []
}
const rowHandle = (row: any, key: string) => { // 格子数据处理
    let rs: any = ''
    let val = row[key]
    switch (key) {
        case "level":
            rs = IdentityMap[val] || t('proxy_page_player')
            break
        case "team_num":
        case "team_bet":
        case "personal_bet":
        case "personal_return":
        case "team_return":
            rs = Number(val).toLocaleString()
            break
        case "operate":
            rs = (userInfo.value.full_name == row.username) ? '-' : `<span  class="td_btn" style="color: #80FF44;cursor: pointer;user-select: none;">${t('proxy_page_manage')}</span>`
            break
        default:
            rs = val
    }
    return rs
}

const clickTd = (row: any) => { // td点击事件
    if (activeTab.value == 1 || userInfo.value.full_name == row.username) return
    levelM.value.openModal(row)
}
const changeDate = (date: any) => { // 切换时间
    Object.assign(params, date)
    params.page = 1
    pageChange(1)
}
const pageChange = (page: number) => { // 切换页码
    params.page = page
    queryData()
}
const search = () => { // 点击搜索
    params.page = 1
    queryData()
}
const queryData = () => { // 查询
    result.total_page = 0
    result.list = []
    const query = NetPacket.req_daily_return_his()
    Object.assign(query.start_time, params.start_time)
    Object.assign(query.end_time, params.end_time)
    query.page = params.page
    query.search_name = params.search_name
    query.search_lev = params.search_lev
    loading.value = true
    Net.instance.sendRequest(query);
}

// 回执监听
MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_daily_return_his,
    resultHandle,
);
onUnmounted(() => {
    // 取消监听
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_daily_return_his, null);

});
</script>

<style lang='less' scoped>
@import '@/assets/recordPage.less';

.coop_table {
    .tabs {
        margin-bottom: 20px;
        padding: 10px;
        box-shadow: 0px 4px 4px 0px #00000040 inset;
        border-radius: 14px;
        border: 1.4px solid #322C59;
        background: linear-gradient(0deg, #1D0E4A, #1D0E4A),
            radial-gradient(50% 50% at 50% 50%, rgba(126, 126, 126, 0.1) 0%, rgba(21, 21, 21, 0.1) 100%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.1) 100%);

        .tab {
            height: 51px;
            width: 362px;
            border-radius: 10px;
            padding: 0 10px;
            display: flex;
            align-items: center;
            color: #8D81C1;
            justify-content: center;
            cursor: pointer;
            box-sizing: border-box;
            font-size: 16px;
        }

        .active_tab {
            background: url(/img/home/btnBG2.webp) no-repeat;
            background-size: 100% 125%;
            background-position-y: 20%;
            border: 1.4px solid rgba(90, 71, 178, 0);
            color: #fff;
        }
    }

    .search_box {
        margin: 20px 0;

        .level {
            width: 150px;
            height: 36px;
            margin-left: 10px;

            :deep(.n-base-selection) {
                border-radius: 10px;

            }

            :deep(.n-base-selection-label) {
                background: #372771;
                height: 36px;
            }
        }

        .search_btn {
            width: 150px;
            margin-left: 6px;
            background: url(/img/home/btnBG.webp) no-repeat;
            background-size: 100% 112%;
            color: #fff;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
    }

}
</style>
