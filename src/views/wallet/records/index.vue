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
import { RechagreStatusMap, WithdrawStatusMap, CurrencyMap } from '@/enums/walletEnum';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
import { NetMsgType } from '@/netBase/NetMsgType';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { convertObjectToDateString } from '@/utils/dateTime';
import { WashTypeMap, ProxyAccountTypeMap, PlatformValueMap } from "@/enums/walletEnum"

// 提现
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
const optionsCurrency = computed(() => { // 法币
    const options = Object.keys(CurrencyMap()).map((key: string) => {
        return {
            label: CurrencyMap()[key],
            value: Number(key)
        }
    })
    options.unshift({ value: 0, label: t('rechargeRecord_page_allHb') })
    return options
})
// 投注记录
type OptionListType = { value: number, label: string }[];
const platformList = ref<OptionListType>([]);
const gameList = ref<OptionListType>([]);
const optionsPlat = computed(() => { // 平台
    const options = JSON.parse(JSON.stringify(platformList.value))
    options.unshift({ value: 0, label: t('promo_page_all') })
    return options
})
const platformHandle = (rs: any) => { // 平台数据处理
    platformList.value = rs.plat_rec_list.map((item: any) => {
        return { value: Number(item), label: PlatformValueMap[item] }
    })
    gameList.value = rs.gtype_rec_list.map((item: string) => {
        let key = item
        try {
            key = PlatformValueMap[item.split('_')[0]] + '_' + item.split('_')[1]
            if (item.split('_')[2]) {
                key = key + '_' + item.split('_')[2]
            }
        } catch {

        }
        return { value: item, key: key }
    })
}
const optionsGame = computed(() => { // 游戏
    const options = JSON.parse(JSON.stringify(gameList.value.map((item: any) => {
        item.label = t(item.key)
        return item
    })))
    console.error('游戏', options)
    options.unshift({ value: 0, label: t('promo_page_all') })
    return options
})
// 账变
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
// 洗码-筛选
const selfListIds: any = ref([])
const waterRecordOptionsStatus = computed(() => { // 类型
    const options = Object.keys(WashTypeMap()).map((key: string) => {
        return {
            label: WashTypeMap()[key],
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
// 代理账变-筛选
const proxyRecordOptionsStatus = computed(() => { // 类型
    const options = Object.keys(ProxyAccountTypeMap()).map((key: string) => {
        return {
            label: ProxyAccountTypeMap()[key],
            value: Number(key)
        }
    })
    options.unshift({ value: 0, label: t('accountsRecord_page_allType') })
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
const betTableHeader = computed(() => {
    return [ // 表头
        { title: t('betRecord_page_platform'), key: 'platform_id', align: 'center' },
        { title: t('betRecord_page_game'), key: 'game_type', align: 'center' },
        { title: t('betRecord_page_betAmount'), key: 'bet_total', align: 'center' },
        { title: t('betRecord_page_winLose'), key: 'net_value', align: 'center' },
        { title: t('betRecord_page_settlement'), key: 'balance_time', align: 'center' },
    ]
})
const accountingChangeTableHeader = computed(() => {
    return [ // 表头
        { title: t('accountsRecord_page_type'), key: 'b_type', align: 'center' },
        { title: t('accountsRecord_page_hb'), key: 'currency', align: 'center' },
        { title: t('accountsRecord_page_amount'), key: 'pay_money', align: 'center' },
        { title: t('accountsRecord_page_content'), key: 'item', align: 'center' },
        { title: t('accountsRecord_page_time'), key: 'create_time', align: 'center' },
    ]
})
const auditTableHeader = computed(() => {
    return [ // 表头
        { title: t('auditRecord_page_audit'), key: 'title', align: 'center' },
        { title: t('auditRecord_page_auditMon'), key: 'amount', align: 'center' },
        { title: t('auditRecord_page_auditProgress'), key: 'progess', align: 'center' },
        { title: t('auditRecord_page_state'), key: 'type', align: 'center' },
        { title: t('auditRecord_page_startTime'), key: 'create_time', align: 'center' },
    ]
})
const waterRecordTableHeader = computed(() => {
    return [ // 表头
        { title: t('washRecord_page_plat'), key: 'type' },
        { title: t('rechargeRecord_page_currency'), key: 'currency' },
        { title: t('washRecord_page_amount'), key: 'rebate' },
        { title: t('washRecord_page_money'), key: 'bet_money' },
        { title: t('washRecord_page_time'), key: 'create_time' },
    ]
})
const proxyRecordTableHeader = computed(() => {
    return [ // 表头
        { title: t('accountsRecord_page_type'), key: 'type' },
        { title: t('accountsRecord_page_hb'), key: 'currency' },
        { title: t('accountsRecord_page_amount'), key: 'pay_money' },
        { title: t('accountsRecord_page_content'), key: 'item' },
        { title: t('accountsRecord_page_time'), key: 'create_time' },
    ]
})
const loginRecordTableHeader = computed(() => {
    return [ // 表头
        { title: t('loginRecord_page_device'), key: 'title' },
        { title: t('loginRecord_page_date'), key: 'create_time' },
        { title: t('loginRecord_page_address'), key: 'progess' },
        { title: t('loginRecord_page_way'), key: 'type' },
    ]
})
const { t } = useI18n()
interface FormParams {
    [key: string]: any; // 允许任意属性
}
const state = reactive({
    loading: false,
    pageData: {
        itemCount: 1,
        defaultPageSize: 20
    },
    formParams: <FormParams>{
        page: 1,
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
                options: rechargeOptionsStatus
            },
            {
                span: 8,
                type: 'select',
                label: 'rechargeRecord_page_currency',
                path: 'currency',
                placeholder: '请选择',
                options: optionsCurrency
            },
            {
                span: 16,
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
                span: 16,
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
        url: 'betRecord',
        type: 'bet',
        loading: false,
        formParams: {
            page: 1,
            platform_id: 0,
            game_type: 0,
        },
        // 各类输入框集合
        formParamsList: [
            {
                span: 8,
                type: 'select',
                label: 'betRecord_page_platform',
                path: 'platform_id',
                placeholder: '请选择',
                options: optionsPlat
            },
            {
                span: 8,
                type: 'select',
                label: 'betRecord_page_game',
                path: 'game_type',
                placeholder: '请选择',
                options: optionsGame
            },
            {
                span: 16,
                type: 'daterange',
                label: 'auditRecord_page_time',
                path: 'path',
                placeholder: '请选择',
            }
        ],
        // 表格表头
        columns: betTableHeader,
        // 表格数据
        data: [],
    },
    {
        title: t('mine_myaudit'),
        id: 4,
        url: 'accountsRecord',
        type: 'accounting_change',
        loading: false,
        formParams: {
            page: 1,
            type: 0,
        },
        // 各类输入框集合
        formParamsList: [
            {
                span: 8,
                type: 'select',
                label: 'accountsRecord_page_type',
                path: 'type',
                placeholder: '请选择',
                options: optionsStatus
            },
            {
                span: 16,
                type: 'daterange',
                label: 'auditRecord_page_time',
                path: 'path',
                placeholder: '请选择',
            }
        ],
        // 表格表头
        columns: accountingChangeTableHeader,
        // 表格数据
        data: [],
    },
    {
        title: t('recharge_inspect_record'),
        id: 5,
        url: 'auditRecord',
        type: 'audit',
        loading: false,
        formParams: {
            page: 1,
        },
        // 各类输入框集合
        formParamsList: [
            {
                span: 16,
                type: 'daterange',
                label: 'auditRecord_page_time',
                fasters: ['1', '2', '3', '4'],
                path: 'path',
                placeholder: '请选择',
            }
        ],
        // 表格表头
        columns: auditTableHeader,
        // 表格数据
        data: [],
    },
    {
        title: t('home_page_waterRecord'),
        id: 6,
        url: 'waterRecord',
        type: 'vip_rebate',
        loading: false,
        formParams: {
            page: 1,
            type: 0,
        },
        // 各类输入框集合
        formParamsList: [
            {
                span: 8,
                type: 'select',
                label: 'accountsRecord_page_type',
                path: 'type',
                placeholder: '请选择',
                options: waterRecordOptionsStatus
            },
            {
                span: 16,
                type: 'daterange',
                label: 'auditRecord_page_time',
                path: 'path',
                placeholder: '请选择',
            }
        ],
        // 表格表头
        columns: waterRecordTableHeader,
        // 表格数据
        data: [],
    },
    {
        title: t('proxyRecord'),
        id: 7,
        url: 'proxyRecord',
        type: 'agent_accounting_change',
        loading: false,
        formParams: {
            page: 1,
            type: 0,
        },
        // 各类输入框集合
        formParamsList: [
            {
                span: 8,
                type: 'select',
                label: 'accountsRecord_page_type',
                path: 'type',
                placeholder: '请选择',
                options: proxyRecordOptionsStatus
            },
            {
                span: 16,
                type: 'daterange',
                label: 'auditRecord_page_time',
                path: 'path',
                placeholder: '请选择',
            }
        ],
        // 表格表头
        columns: proxyRecordTableHeader,
        // 表格数据
        data: [],
    },
    {
        title: t('home_page_loginRecord'),
        id: 8,
        url: 'loginRecord',
        type: 'audit',
        loading: false,
        formParams: {
            page: 1,
        },
        // 各类输入框集合
        formParamsList: [
            {
                span: 16,
                type: 'daterange',
                label: 'Time',
                fasters: ['1', '2', '3', '4'],
                path: 'path',
                placeholder: '请选择',
            }
        ],
        // 表格表头
        columns: loginRecordTableHeader,
        // 表格数据
        data: [],
    },

])

const activeTab = ref(0)
const changeTab = (index: number) => {
    activeTab.value = index
    state.formParams = {
        ...state.formParams,
        ...titleArr[activeTab.value].formParams,
    }
    state.columns = titleArr[activeTab.value].columns
    state.data = []
    state.formParamsList = titleArr[activeTab.value].formParamsList
    queryData()
    // router.push(item.url);
    // 
}
// const queryData = () => { // 查询
//     console.log(state.formParams);

// const query = titleArr[activeTab.value].netType()
const queryData = (page?: any) => { // 查询
    if (page) {
        state.formParams.page = page
    }
    console.log('查询参数', state.formParams);
    let type = ''
    if (activeTab.value == 4 || activeTab.value == 7) {//稽核记录登录记录api
        type = `req_get_${titleArr[activeTab.value].type}_record`
    } else if (activeTab.value == 5 || activeTab.value == 6) {//洗码记录api、代理账变记录api
        type = `req_get_${titleArr[activeTab.value].type}`
    } else {
        type = `req_get_${titleArr[activeTab.value].type}_record_list`
    }
    const query = (NetPacket as any)[type]()
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
    // console.log('type11', type)
    state.data = (rs[type] || []).sort((a: any, b: any) => {
        return Date.parse(convertObjectToDateString(b.pay_time)) - Date.parse(convertObjectToDateString(a.pay_time))
    })
    if (type === 'accounting_change_record_list') {
        if (state.formParams?.type == 0) {
            allList.value = state.data
        }
    }
    if (type === 'vip_rebate_record_list') {
        // 把id放到平台id里
        rs.record_list.forEach((item: any) => {
            if (!selfListIds.value.includes(item.type)) {
                selfListIds.value.push(item.type)
            }
        })
    }

}
onMounted(() => {
    state.columns = titleArr[activeTab.value].columns
    state.formParamsList = titleArr[activeTab.value].formParamsList
    // 充值
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_get_recharge_record_list,
        resultHandle,
    );
    // todo  行操作数据
    // setTimeout(() => {
    //     MessageEvent2.addMsgEvent(
    //         NetMsgType.msgType.msg_notify_req_get_shop_info,
    //         waysHandle,
    //     );
    //     getPays()
    // }, 300)
    // 提现
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_get_withdraw_record_list,
        resultHandle,
    );
    // 投注
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_get_bet_record_list,
        resultHandle,
    );
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_platform_gametype_list,
        platformHandle,
    );
    // 账变
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_get_accounting_change_record_list,
        resultHandle,
    );
    // 稽核
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_get_audit_record,
        resultHandle,
    );
    // 洗码
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_get_vip_rebate,
        resultHandle,
    );
    // 代理账变
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_get_agent_accounting_change,
        resultHandle,
    );
    queryData()
})
onUnmounted(() => {
    // 充值
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_recharge_record_list, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_req_get_shop_info, null);
    // 提现
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_withdraw_record_list, null);
    // 投注
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_bet_record_list, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_platform_gametype_list, null);
    // 账变
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_accounting_change_record_list, null);
    // 稽核
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_audit_record, null);
    // 洗码
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_vip_rebate, null);
    // 代理账变
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_agent_accounting_change, null);

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
