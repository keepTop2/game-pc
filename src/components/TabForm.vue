<template>
    <div class="login_form">

        <n-form ref="formRef" :loading="props.loading" :model="props.formParams" label-placement="left">
            <n-grid :cols="24" :x-gap="24">
                <template v-for="(item, _i) in props.formParamsList" :key="_i">
                    <n-form-item-gi :span="item.span" :label="t(item.label)" :path="item.path">
                        <n-select v-if="item.type == 'select'" v-model:value="props.formParams[item.path]"
                          :placeholder="item.placeholder" :options="item.options" />
                        <DateSelect v-if="item.type == 'daterange'" :fasters="item.fasters" @submit="changeDate" />
                    </n-form-item-gi>
                </template>
            </n-grid>
        </n-form>
        <div class="seach_btn">
            <n-button round type="primary" @click="seach(1)">
                {{ t('proxy_page_search') }}
            </n-button>
        </div>

    </div>
    <div class="table">
        <n-data-table striped :bordered="false" :single-line="false" :columns="props.columns" :data="props.data"
          :pagination="state.pageData">
            <template #empty>
                <div class="nodata">
                    <Imgt src="/img/wallet/nodata.webp" alt="nodata" />
                    <div>{{ t('home_page_nomore_data') }}</div>
                </div>
            </template>
        </n-data-table>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useI18n } from 'vue-i18n';
import { NButton } from "naive-ui";
import DateSelect from "@/components/DateSelect.vue"
const { t } = useI18n();
const emit = defineEmits(['pageChange', 'sendSeach', 'nextChange']);
const props = defineProps({

    formParams: {
        type: Object as any,
    },
    formParamsList: {
        type: Array<any>,
    },
    columns: {
        type: Array<any>,
    },
    data: {
        type: Array<any>,
    },
    loading: {
        type: Boolean,
    },

    rules: {
        // 参数验证示例  如果是模糊搜索 则不传该参数
        type: Object,
    },
})
const formRef = ref();

const state: any = reactive({
    pageData: {
        itemCount: 1,
        defaultPageSize: 20,
        onChange: (page: number) => {//切换第几页时
            emit('pageChange', page)
        }


    },
    loading: false,



})
const changeDate = (date: any) => { // 切换时间
    Object.assign(props.formParams, date)
    props.formParams.page = 1
    state.loading = true
    setTimeout(() => {
        seach(1)
    }, 500)
}
const seach = (v: any) => {

    emit('sendSeach', v);
}



// const changeTab = (tabId: number) => {
//     resetInputHide()
//     emit('changeTab', tabId);
// };
// const resetInputHide = () => {
//     for (const key in state.formData.list) {
//         state.formData.list[key].show = false
//     }
// }







// const resetFormValue = () => { state.formData.formParams = state.formInitValue }




</script>
<style lang="less" scoped>
@timestamp: `new Date().getTime()`;

.login_form {
    display: flex;
    justify-content: space-between;


    >.seach_btn {
        display: flex;
        align-items: flex-end;
        margin-bottom: 12px;

        >button {
            width: 100px;
            height: 40px;

        }
    }
}

// 表格区域
.table {
    border-radius: 10px;
    overflow: hidden;
    font-weight: 400;

    :deep(.n-flex) {
        gap: unset !important;
    }

    .tr {
        font-size: 16px;
        color: #AEAEB0;
        min-height: 40px;
    }

    .tr:nth-child(odd) {
        background-color: #0D0E2E !important;
    }

    .tr:nth-child(even) {
        background-color: #14173A !important;
    }

    .th {
        min-height: 50px;
        font-size: 18px;
        color: #fff;
    }

    .tt {
        height: 50px;
        background: radial-gradient(87.04% 93.77% at 50% 13.97%, #4C36B3 0.17%, #3A2786 74.42%, #3C279A 100%) !important;
    }

    .td {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: all;
        padding: 10px;
        // border: .1px solid gray;
        box-shadow: inset 0 0 1px 0 gray;
    }

    .td_25 {
        flex: 2.5;
    }

    .td_money {
        color: #FABB2D;
    }

    .t_loading {
        padding-top: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .tr.th {
        background: #1B1F4B;
    }

    // 表格
    :deep(.n-data-table .n-data-table-tr:hover) {
        background-color: transparent;
        background: unset;
    }

    // 分页区域
    :deep(.n-data-table__pagination) {
        justify-content: center;
    }

    :deep(.n-pagination-item) {
        font-size: 16px;
        background: #14173A;
        border: 1.4px solid #AEAEB0 !important;
        color: #AEAEB0;
        border-radius: 10px !important;
    }

    :deep(.n-pagination-item--button) {
        width: 32px;
        height: 32px;
        color: #fff !important;
        font-weight: bold;
        background-color: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%) !important;
        border: unset !important;

        &:hover {
            color: #fff !important;
            background-color: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%) !important;

        }

        &.n-pagination-item--disabled {
            color: #AEAEB0 !important;
            background-color: #14173A !important;
            border: 1.4px solid #AEAEB0 !important;

            &:hover {
                color: #AEAEB0 !important;
            }
        }
    }

    :deep(.n-pagination-item--active) {
        margin-right: 5px;
        width: 32px;
        height: 32px;
        font-size: 16px;
        color: #fff !important;
        background: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%) !important;
        border: 0 !important;

        &:hover {
            color: #fff !important;
            background: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%) !important;
        }

        :deep(.n-button__border) {
            border: 0 !important;
        }
    }
}
</style>