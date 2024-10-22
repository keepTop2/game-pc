<!-- 记录 -->
<template>
    <div class="record_page coop_table">
        <!-- Tabs -->
        <div class="tabs">
            <span class="tabs_item" :class="{ 'active_tab': activeTab == index }" @click="changeTab(index)"
                v-for="(item, index) in titleArr" :key="index">{{ t(item.title) }}</span>
        </div>
        <TabForm :formParams="state.formParams" :form-params-list="state.formParamsList" :loading="state.loading"
            :columns="state.columns" :data="state.data" @send-seach="queryData"></TabForm>
        <!-- <router-view></router-view> -->
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, onUnmounted, onMounted } from 'vue';
import { useI18n } from "vue-i18n";
import TabForm from '@/components/TabForm.vue'
import { RechagreStatusMap, WithdrawStatusMap } from '@/enums/walletEnum';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
import { NetMsgType } from '@/netBase/NetMsgType';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { convertObjectToDateString } from '@/utils/dateTime';
const withdrawOptionsStatus = computed(() => { // 状态
    const options = Object.keys(WithdrawStatusMap()).map((key: string) => {
        return {
            label: WithdrawStatusMap()[key],
            value: Number(key)
        }
    })
    options.unshift({ value: 9, label: t('rechargeRecord_page_allState') })
    return options
})
const rechargeOptionsStatus = computed(() => { // 状态
    const options = Object.keys(RechagreStatusMap()).map((key: string) => {
        return {
            label: RechagreStatusMap()[key],
            value: Number(key)
        }
    })
    options.unshift({ value: 9, label: t('rechargeRecord_page_allState') })
    return options
})

const recharTableHeader = computed(() => {
    return [ // 表头
        { title: t('rechargeRecord_page_method'), key: 'way_id', align: 'center' },
        { title: t('accountsRecord_page_hb'), key: 'currency', align: 'center' },
        { title: t('rechargeRecord_page_amount'), key: 'pay_money', align: 'center' },
        { title: t('auditRecord_page_state'), key: 'order_status', align: 'center' },
        { title: t('auditRecord_page_startTime'), key: 'pay_time', align: 'center' },
    ]
})
const withdrawTableHeader = computed(() => {
    return [ // 表头
        { title: t('withdrawRecord_page_wMethod'), key: 'way_id', align: 'center' },
        { title: t('accountsRecord_page_hb'), key: 'currency', align: 'center' },
        { title: t('withdrawRecord_page_wAmount'), key: 'pay_money', align: 'center' },
        { title: t('auditRecord_page_state'), key: 'order_status', align: 'center' },
        { title: t('auditRecord_page_startTime'), key: 'pay_time', align: 'center' },
    ]
})
const { t } = useI18n()
const state = reactive({
    loading: false,
    pageData: {
        itemCount: 1,
        defaultPageSize: 20
    },
    formParams: {
        page: 1,
        status: 9,
        currency: 0,
        start_time: '',
        end_time: ''
    },
    // 各类输入框集合
    formParamsList: [],
    // 表格表头
    columns: [],
    // 表格数据
    data: [],
})
const titleArr: any = reactive([
    {
        title: 'mine_myload',
        id: 1,
        url: 'records',
        type: 'recharge',
        netType: NetPacket.req_get_recharge_record_list,
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
                label: 'auditRecord_page_state',
                path: 'status',
                placeholder: '请选择状态',
                options: rechargeOptionsStatus
            },
            {
                span: 10,
                type: 'daterange',
                label: 'auditRecord_page_time',
                path: 'path',
                placeholder: '请选择',
            }
        ],
        // 表格表头
        columns: recharTableHeader,
        // 表格数据
        data: [],
    },
    {
        title: 'mine_mywithdraw',
        id: 2,
        url: 'withdrawRecord',
        type: 'withdraw',
        netType: NetPacket.req_get_withdraw_record_list,
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
                label: 'auditRecord_page_state',
                path: 'status',
                placeholder: '请选择状态',
                options: withdrawOptionsStatus
            },
            {
                span: 8,
                type: 'daterange',
                label: 'auditRecord_page_time',
                path: 'path',
                placeholder: '请选择',
            }
        ],
        // 表格表头
        columns: withdrawTableHeader,
        //  [
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
        // ],

        // 表格数据
        data: [],
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

const activeTab = ref(0)
const changeTab = (index: number) => {
    activeTab.value = index
    state.formParams = {
        page: 1,
        status: 9,
        currency: 0,
        start_time: '',
        end_time: ''
    }
    state.columns = titleArr[activeTab.value].columns
    state.data = []
    state.formParamsList = titleArr[activeTab.value].formParamsList
    queryData()
    // router.push(item.url);
}
const queryData = () => { // 查询
    console.log(state.formParams);
    // let type: NetPacket = NetPacket[`req_get_${titleArr[activeTab.value].netType}_record_list`]
    const query = titleArr[activeTab.value].netType()
    if (state.formParams.start_time) {
        Object.assign(query.start_time, state.formParams.start_time)
        Object.assign(query.end_time, state.formParams.end_time)
    }

    query.page = state.formParams.page
    query.status = state.formParams.status
    query.currency = state.formParams.currency
    state.loading = true
    Net.instance.sendRequest(query);
}
const resultHandle = (rs: any) => { // 数据处理
    setTimeout(() => {
        state.loading = false
    }, 300)
    state.formParams.page = rs.total_page || 0
    let type = `${titleArr[activeTab.value].type}_record_list`
    state.data = (rs[type] || []).sort((a: any, b: any) => {
        return Date.parse(convertObjectToDateString(b.pay_time)) - Date.parse(convertObjectToDateString(a.pay_time))
    })
}
onMounted(() => {
    state.columns = titleArr[activeTab.value].columns
    state.formParamsList = titleArr[activeTab.value].formParamsList
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
        height: 40px;
        padding: 2px;
        background: #0D0E2E;
        display: flex;
        align-items: center;

        .tabs_item {
            // min-width: 106px;
            padding: 9px 18px;
            color: #AEAEB0;
            height: 38px;
            box-sizing: border-box;
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
        }

        .active_tab {
            color: #fff;
            width: auto;
            border-radius: 8px;
            background: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%);
            box-shadow: 0.5px 0.5px 1px 0px #9B9EFF inset;

        }


    }

}
</style>
