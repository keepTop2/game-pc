<template>
    <n-flex vertical class="record_page water_record">
        <!-- 搜索 -->
        <n-flex vertical class="search_box">
            <n-flex class="search_row">
                <n-flex :wrap="false" :align="'center'">
                    <div> {{ t('accountsRecord_page_type') }} </div>
                    <n-select class="search_select" @update:value="statusChange" v-model:value="params.type"
                        :options="optionsStatus" />
                </n-flex>
            </n-flex>

            <n-flex class="search_row" :align="'center'">
                <div>{{ t('auditRecord_page_time') }}</div>
                <DateSelect @submit="changeDate" />
                <div class="btn search_btn" @click="pageChange(1)">{{ t('proxy_page_search') }}</div>
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
import { MessageEvent2 } from '@/utils/net/MessageEvent2';
import { NetMsgType } from '@/utils/netBase/NetMsgType';
import { WashTypeMap, PlatformValueMap } from "@/enums/walletEnum"
import DateSelect from "@/components/DateSelect.vue"
import { Net } from "@/utils/net/Net";
import { NetPacket } from "@/utils/netBase/NetPacket";
import { convertObjectToDateString } from "@/utils/dateTime"
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const tableHeader = computed(() => {
    return [ // 表头
        { title: t('washRecord_page_plat'), key: 'type' },
        { title: t('rechargeRecord_page_currency'), key: 'currency' },
        { title: t('washRecord_page_amount'), key: 'rebate' },
        { title: t('washRecord_page_money'), key: 'bet_money' },
        { title: t('washRecord_page_time'), key: 'create_time' },
    ]
})

const optionsStatus = computed(() => { // 类型
    const options = Object.keys(WashTypeMap).map((key: string) => {
        return {
            label: WashTypeMap[key],
            value: Number(key)
        }
    })
    selfListIds.value.forEach((item: any) => {
        if (item != 9999) {
            options.push({
                label: PlatformValueMap[item],
                value: Number(item)
            })
        }
    })
    options.unshift({ value: 0, label: t('accountsRecord_page_allType') })
    return options
})

const params: any = reactive({ // 参数
    page: 1,
    type: 0,
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
    result.total_page = rs.total_page || 0
    result.list = rs.record_list || []

    // 把id放到平台id里
    rs.record_list.forEach((item: any) => {
        if (!selfListIds.value.includes(item.type)) {
            selfListIds.value.push(item.type)
        }
    })
}
const rowHandle = (row: any, key: string) => { // 格子数据处理
    let rs = ''
    let val = row[key]
    switch (key) {
        case "type":
            if (val == 9999) {
                rs = t('washRecord_page_currPlat')
            } else {
                rs = PlatformValueMap[val]
            }
            break
        // 2就是usdt,其他暂时是越南盾
        case "currency":
            rs = t('accountsRecord_page_dong')
            break
        case "bet_money":
        case "rebate":
            rs = Number(val).toLocaleString()
            break
        case "create_time":
            rs = convertObjectToDateString(val)
            break
        default:
            rs = val
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
const statusChange = (value: string) => { // 切换类型
    params.type = value
    queryData()
}
const queryData = () => { // 查询
    result.total_page = 0
    result.list = []
    if (params.type == 0) { // 查询全部平台id
        queryPlatIds()
    }
    setTimeout(() => {
        const query = NetPacket.req_get_vip_rebate()
        Object.assign(query.start_time, params.start_time)
        Object.assign(query.end_time, params.end_time)
        query.page = params.page
        query.type = params.type
        loading.value = true
        Net.instance.sendRequest(query);
    }, 100)
}

// 有洗马记录的平台
const selfListIds: any = ref([])
const queryPlatIds = () => { // 查询
    const query = NetPacket.req_get_vip_rebate()
    Object.assign(query.start_time, params.start_time)
    Object.assign(query.end_time, params.end_time)
    query.page = params.page
    query.type = -2
    loading.value = true
    Net.instance.sendRequest(query);
}


// 回执监听
MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_get_vip_rebate,
    resultHandle,
);
onUnmounted(() => {
    // 取消监听
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_vip_rebate, null);

});
</script>

<style lang='less' scoped>
@import '@/assets/recordPage.less';

.water_record {
    font-size: 14px;
    user-select: none;
}
</style>
