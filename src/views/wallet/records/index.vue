<!-- 记录 -->
<template>
    <div class="record_page coop_table">
        <!-- Tabs -->
        <n-flex class="tabs" align="center">
            <n-flex align="center" justify="center" class="tabs_item"
                :class="{ 'button n-button active_tab': activeTab == item.id }" @click="changeTab(item)"
                v-for="(item, index) in titleArr" :key="index">{{ item.title }}
            </n-flex>
        </n-flex>
        <TabForm :form-params-list="titleArr[0].formParamsList"></TabForm>
        <router-view></router-view>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, onUnmounted, onMounted } from 'vue';
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router';
import TabForm from '@/components/TabForm.vue'
import { WithdrawStatusMap } from '@/enums/walletEnum';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
import { NetMsgType } from '@/netBase/NetMsgType';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { convertObjectToDateString } from '@/utils/dateTime';
const router = useRouter();
const optionsStatus = computed(() => { // 状态
    const options = Object.keys(WithdrawStatusMap()).map((key: string) => {
        return {
            label: WithdrawStatusMap()[key],
            value: Number(key)
        }
    })
    options.unshift({ value: 9, label: t('rechargeRecord_page_allState') })
    return options
})
const { t } = useI18n()
const titleArr: any = reactive([
    {
        title: t('mine_myload'),
        id: 1,
        url: 'rechargeRecord',
        loading: false,
        formParams: {
            page: 1,
            status: 9,
            currency: 0,
        },
        // 各类输入框集合
        formParamsList: [
            {
                span: 8,
                type: 'select',
                label: t('auditRecord_page_state'),
                path: 'status',
                placeholder: '请选择状态',
                options: optionsStatus
            },
            {
                span: 8,
                type: 'daterange',
                label: t('auditRecord_page_time'),
                path: 'path',
                placeholder: '请选择',


            }
        ],
        // 表格表头
        columns: [
            { title: t('withdrawRecord_page_wMethod'), key: 'way_id' },
            { title: t('accountsRecord_page_hb'), key: 'currency' },
            { title: t('withdrawRecord_page_wAmount'), key: 'pay_money' },
            { title: t('auditRecord_page_state'), key: 'order_status' },
            { title: t('auditRecord_page_startTime'), key: 'pay_time' },
            // {
            //     title: 'Action',
            //     key: 'actions',
            // render(row: any) {
            //     return h(
            //         NButton,
            //         {
            //             size: 'small',
            //             onClick: () => sendMail(row)
            //         },
            //         { default: () => 'Send Email' }
            //     )
            // }
            // }
        ],

        // 表格数据
        data: [
            {
                key: 0,
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer']
            },
            {
                key: 1,
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['wow']
            },
            {
                key: 2,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher']
            }
        ],
    },
    {
        title: t('mine_mywithdraw'),
        id: 2,
        url: 'withdrawRecord'
    },
    {
        title: t('mine_mybet'),
        id: 3,
        url: 'betRecord'
    },
    {
        title: t('mine_myaudit'),
        id: 4,
        url: 'accountsRecord'
    },
    {
        title: t('recharge_inspect_record'),
        id: 5,
        url: 'auditRecord'
    },
    {
        title: t('home_page_waterRecord'),
        id: 6,
        url: 'waterRecord'
    },
    {
        title: t('proxyRecord'),
        id: 7,
        url: 'proxyRecord'
    },
    {
        title: t('home_page_loginRecord'),
        id: 8,
        url: 'loginRecord'
    },

])

const activeTab = ref(1)
const changeTab = (item: any) => {
    activeTab.value = item.id
    router.push(item.url);
}
const queryData = () => { // 查询
    titleArr[0].total_page = 0
    titleArr[0].data = []
    const query = NetPacket.req_get_withdraw_record_list()
    Object.assign(query.start_time, titleArr[0].formParams.start_time)
    Object.assign(query.end_time, titleArr[0].formParams.end_time)
    query.page = titleArr[0].formParams.page
    query.status = titleArr[0].formParams.status
    query.currency = titleArr[0].formParams.currency
    titleArr[0].loading = true
    Net.instance.sendRequest(query);
}
const resultHandle = (rs: any) => { // 数据处理
    setTimeout(() => {
        titleArr[0].loading = false
    }, 300)
    titleArr[0].total_page = rs.total_page || 0
    titleArr[0].data = (rs.withdraw_record_list || []).sort((a: any, b: any) => {
        return Date.parse(convertObjectToDateString(b.pay_time)) - Date.parse(convertObjectToDateString(a.pay_time))
    })
}
onMounted(() => {
    // 回执监听
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_get_withdraw_record_list,
        resultHandle,
    );
    queryData()
})
onUnmounted(() => {
    // 取消监听
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_withdraw_record_list, null);

});
</script>

<style lang='less' scoped>
@import '@/assets/recordPage.less';

.coop_table {
    .tabs {
        margin-bottom: 40px;
        border-radius: 14px;
        padding: 4px;
        background: #0D0E2E;

        .tabs_item {
            min-width: 106px;
            color: #AEAEB0;
        }

        .active_tab {
            color: #fff;
        }

        .button {
            height: 40px;
            font-size: 18px;
        }
    }

}
</style>
