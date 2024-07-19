<template>
    <n-flex vertical class="record_page wallet_recharge_record">
        <!-- 搜索 -->
        <n-flex vertical class="search_box">
            <n-flex class="search_row">
                <n-flex :wrap="false" :align="'center'">
                    <div> {{ t('auditRecord_page_state') }} </div>
                    <n-select class="search_select" @update:value="statusChange" v-model:value="params.status"
                        :options="optionsStatus" />
                </n-flex>
                <n-flex style="margin-left:80px" :wrap="false" :align="'center'">
                    <div>{{ t('rechargeRecord_page_currency') }}</div>
                    <n-select class="search_select" @update:value="currencyChange" v-model:value="params.currency"
                        :options="optionsCurrency" />
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
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import { RechagreStatusMap, CurrencyMap } from "@/enums/walletEnum"
import DateSelect from "@/components/DateSelect.vue"
import { Net } from "@/net/Net";
import { NetPacket } from "@/netBase/NetPacket";
import { convertObjectToDateString } from "@/utils/dateTime"
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const tableHeader = computed(() => {
    return [ // 表头
        { title: t('rechargeRecord_page_method'), key: 'way_id' },
        { title: t('accountsRecord_page_hb'), key: 'currency' },
        { title: t('rechargeRecord_page_amount'), key: 'pay_money' },
        { title: t('auditRecord_page_state'), key: 'order_status' },
        { title: t('auditRecord_page_startTime'), key: 'pay_time' },
    ]
})

const optionsStatus = computed(() => { // 状态
    const options = Object.keys(RechagreStatusMap).map((key: string) => {
        return {
            label: RechagreStatusMap[key],
            value: Number(key)
        }
    })
    options.unshift({ value: 9, label: t('rechargeRecord_page_allState') })
    return options
})
const optionsCurrency = computed(() => { // 法币
    const options = Object.keys(CurrencyMap).map((key: string) => {
        return {
            label: CurrencyMap[key],
            value: Number(key)
        }
    })
    options.unshift({ value: 0, label: t('rechargeRecord_page_allHb') })
    return options
})

const params: any = reactive({ // 参数
    page: 1,
    status: 9,
    currency: 0,
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
    result.list = rs.recharge_record_list || []
}
const wayMap: any = ref({})
const rowHandle = (row: any, key: string) => { // 格子数据处理
    let rs = ''
    let val = row[key]
    switch (key) {
        case "way_id":
            rs = (val && wayMap[val]) ? t(wayMap[val]) : val
            break
        case "order_status":
            rs = RechagreStatusMap[val]
            break
        case "currency":
            rs = CurrencyMap[1]
            break
        case "pay_money":
            rs = Number(val).toLocaleString()
            break
        case "pay_time":
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
const statusChange = (value: string) => { // 切换状态
    params.status = value
    queryData()
}
const currencyChange = (value: string) => { // 切换货币
    params.currency = value
    queryData()
}
const queryData = () => { // 查询
    result.total_page = 0
    result.list = []
    const query = NetPacket.req_get_recharge_record_list()
    Object.assign(query.start_time, params.start_time)
    Object.assign(query.end_time, params.end_time)
    query.page = params.page
    query.status = params.status
    query.currency = params.currency
    loading.value = true
    Net.instance.sendRequest(query);
}
const getPays = () => {
    const query = NetPacket.req_get_shop_info()
    Net.instance.sendRequest(query);
}
const waysHandle = (rs: any) => {
    rs.rechargelist_by_paymenttype.forEach((item: any) => {
        wayMap[item.paymenttype] = item.payname
    })
}

// 回执监听
MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_get_recharge_record_list,
    resultHandle,
);

setTimeout(() => {
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_req_get_shop_info,
        waysHandle,
    );
    getPays()
}, 300)
onUnmounted(() => {
    // 取消监听
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_recharge_record_list, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_req_get_shop_info, null);
});
</script>

<style lang='less' scoped>
@import '@/assets/recordPage.less';

.wallet_recharge_record {
    font-size: 14px;
    user-select: none;
}
</style>