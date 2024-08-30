<template>
    <n-flex vertical class="record_page wallet_recharge_record">
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
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import { WalletTypeMap } from "@/enums/walletEnum"
import DateSelect from "@/components/DateSelect.vue"
import { Net } from "@/net/Net";
import { NetPacket } from "@/netBase/NetPacket";
import { convertObjectToDateString } from "@/utils/dateTime"
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const tableHeader = computed(() => {
    return [ // 表头
        { title: t('accountsRecord_page_type'), key: 'b_type' },
        { title: t('accountsRecord_page_hb'), key: 'currency' },
        { title: t('accountsRecord_page_amount'), key: 'pay_money' },
        { title: t('accountsRecord_page_content'), key: 'item' },
        { title: t('accountsRecord_page_time'), key: 'create_time' },
    ]
})

const allList: any = ref([])
const optionsStatus = computed(() => { // 状态
    const options: any = []
    allList.value.map((item: any) => {
        if (!options.find((a: any) => a.value == item.b_type)) {
            options.push({
                label: t('bType' + (item.b_type > 100 ? 101 : item.b_type)),
                value: Number(item.b_type)
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
    result.list = (rs.record_list || []).sort((a: any, b: any) => {
        return Date.parse(convertObjectToDateString(b.create_time)) - Date.parse(convertObjectToDateString(a.create_time))
    })
    // 保存类型
    if (params.type == 0) {
        allList.value = result.list
    }
}
const rowHandle = (row: any, key: string) => { // 格子数据处理
    let rs = ''
    let val = row[key]
    switch (key) {
        case "b_type":
            rs = t('bType' + (val > 100 ? 101 : val))
            break
        case "item":
            if (val == 3) {
                if (row['pay_money'] > 0) {
                    rs = WalletTypeMap['3_0']
                } else {
                    rs = WalletTypeMap['3_1']
                }
            } else {
                rs = WalletTypeMap[val]
            }
            break
        // 2就是usdt,其他暂时是越南盾
        case "currency":
            rs = t('accountsRecord_page_dong')
            break
        case "pay_money":
            rs = (row.type == 1 ? '+' : '-') + Number(val).toLocaleString()
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
    const query = NetPacket.req_get_accounting_change_record_list()
    Object.assign(query.start_time, params.start_time)
    Object.assign(query.end_time, params.end_time)
    query.page = params.page
    query.type = params.type
    loading.value = true
    Net.instance.sendRequest(query);
}

// 回执监听
MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_get_accounting_change_record_list,
    resultHandle,
);
onUnmounted(() => {
    // 取消监听
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_accounting_change_record_list, null);

});
</script>

<style lang='less' scoped>
@import '@/assets/recordPage.less';

.wallet_recharge_record {
    font-size: 14px;
    user-select: none;
}
</style>
