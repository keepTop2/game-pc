<template>
    <n-flex vertical class="record_page wallet_recharge_record">
        <!-- 搜索 -->
        <n-flex vertical class="search_box">
            <n-flex class="search_row" :align="'center'">
                <div>{{ t('auditRecord_page_time') }}</div>
                <DateSelect :fasters="['1', '2', '3', '4']" @submit="changeDate" />
                <div class="btn search_btn" @click="pageChange(1)">{{ t('proxy_page_search') }}</div>
                <span style="flex:1;text-align: right">{{ t('auditRecord_page_timeTips') }}</span>
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
                <Imgt src="/img/wallet/nodata.webp" alt="nodata" />
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
import { reactive, onUnmounted, ref, computed } from 'vue';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import DateSelect from "@/components/DateSelect.vue"
import { Net } from "@/net/Net";
import { NetPacket } from "@/netBase/NetPacket";
import { convertObjectToDateString } from "@/utils/dateTime"
import { AuditStatusMap } from '@/enums/walletEnum'
import { useI18n } from "vue-i18n";
import Imgt from '@/components/Imgt.vue';

const { t } = useI18n();

const tableHeader = computed(() => {
    return [ // 表头
        { title: t('auditRecord_page_audit'), key: 'title' },
        { title: t('auditRecord_page_auditMon'), key: 'amount' },
        { title: t('auditRecord_page_auditProgress'), key: 'progess' },
        { title: t('auditRecord_page_state'), key: 'type' },
        { title: t('auditRecord_page_startTime'), key: 'create_time' },
    ]
})

const params: any = reactive({ // 参数
    page: 1,
    type: '9',
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
}
const rowHandle = (row: any, key: string) => { // 格子数据处理
    let rs = ''
    let val = row[key]
    switch (key) {
        case "title":
            rs = t(val)
            break
        case "type":
            rs = AuditStatusMap()[val]
            break
        case "amount":
        case "progess":
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
const queryData = () => { // 查询
    result.total_page = 0
    result.list = []
    const query = NetPacket.req_get_audit_record()
    Object.assign(query.start_time, params.start_time)
    Object.assign(query.end_time, params.end_time)
    query.page = params.page
    query.type = 0
    loading.value = true
    Net.instance.sendRequest(query);
}

// 回执监听
MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_get_audit_record,
    resultHandle,
);
onUnmounted(() => {
    // 取消监听
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_audit_record, null);

});
</script>

<style lang='less' scoped>
@import '@/assets/recordPage.less';

.wallet_recharge_record {
    font-size: 14px;
    user-select: none;
}
</style>
