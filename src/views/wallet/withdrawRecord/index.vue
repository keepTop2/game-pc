<template>
    <n-flex vertical class="record_page wallet_recharge_record">
        <!-- 搜索 -->
        <n-flex vertical class="search_box">
            <n-flex class="search_row">
                <n-flex :wrap="false" :align="'center'">
                    <div> {{ t('auditRecord_page_state') }}</div>
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
import { MessageEvent2 } from '@/utils/net/MessageEvent2';
import { NetMsgType } from '@/utils/netBase/NetMsgType';
import { WithdrawStatusMap, CurrencyMap, WithdrawStatusColorMap } from "@/enums/walletEnum"
import DateSelect from "@/components/DateSelect.vue"
import { Net } from "@/utils/net/Net";
import { NetPacket } from "@/utils/netBase/NetPacket";
import { convertObjectToDateString } from "@/utils/dateTime"
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const tableHeader = computed(() => {
    return [ // 表头
        { title: t('withdrawRecord_page_wMethod'), key: 'way_id' },
        { title: t('accountsRecord_page_hb'), key: 'currency' },
        { title: t('withdrawRecord_page_wAmount'), key: 'pay_money' },
        { title: t('auditRecord_page_state'), key: 'order_status' },
        { title: t('auditRecord_page_startTime'), key: 'pay_time' },
    ]
})

const optionsStatus = computed(() => { // 状态
    const options = Object.keys(WithdrawStatusMap).map((key: string) => {
        return {
            label: WithdrawStatusMap[key],
            value: Number(key)
        }
    })
    options.unshift({ value: 0, label: t('rechargeRecord_page_allState') })
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
    status: 0,
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
    result.list = rs.withdraw_record_list || []
}
const rowHandle = (row: any, key: string) => { // 格子数据处理
    let rs = ''
    let val = row[key]
    switch (key) {
        // way_id是2，那就是usdt, 其他都是银行卡
        case "way_id":
            rs = val == 2 ? 'USDT' : t('api_bankcard')
            break
        // way_id来判断，2就是usdt,其他暂时是越南盾
        case "currency":
            rs = row['way_id'] == 2 ? 'USDT' : t('accountsRecord_page_dong')
            break
        case "pay_money":
            rs = Number(val).toLocaleString()
            break
        case "order_status":
            rs = `<span style="color:${WithdrawStatusColorMap[val]}">${WithdrawStatusMap[val]}</span>`
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
    const query = NetPacket.req_get_withdraw_record_list()
    Object.assign(query.start_time, params.start_time)
    Object.assign(query.end_time, params.end_time)
    query.page = params.page
    query.status = params.status
    query.currency = params.currency
    loading.value = true
    Net.instance.sendRequest(query);
}

// 回执监听
MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_get_withdraw_record_list,
    resultHandle,
);
onUnmounted(() => {
    // 取消监听
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_withdraw_record_list, null);

});
</script>

<style lang='less' scoped>
@import '@/assets/recordPage.less';

.wallet_recharge_record {
    font-size: 14px;
    user-select: none;
}
</style>
