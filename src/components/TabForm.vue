<template>
    <div class="login_form">
        <n-form ref="formRef" :loading="props.loading" :model="props.formParams" label-placement="left">
            <n-grid :cols="24" :x-gap="24">
                <template v-for="(item, _i) in props.formParamsList" :key="_i">
                    <n-form-item-gi :span="item.span" :label="t(item.label)" :path="item.path">
                        <n-select v-if="item.type == 'select'" v-model:value="props.formParams[item.path]"
                          :placeholder="t(item.placeholder)" :options="item.options" />
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
        <n-data-table striped :bordered="false" remote :single-line="false" :columns="props.columns" :data="props.data"
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
    pageData: {
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
        pageCount: props.pageData.pageCount || 0,
        pageSize: props.pageData.pageSize || 20,
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
        margin-bottom: 16px;

        >button {
            min-width: 100px;
            height: 40px;

        }
    }
}

// 表格区域
.table {

    :deep(.n-data-table-tr:nth-child(odd)) {
        background-color: #121336;

        &:hover {
            background: #121336;

            .n-data-table-td {
                background-color: transparent;
            }
        }
    }

    :deep(.n-data-table-tr--striped) {
        background-color: #0D0E2E;

        &:hover {
            background: #0D0E2E;

            .n-data-table-td {
                background-color: transparent;
            }
        }
    }

    :deep(.n-data-table-td) {
        user-select: all;
        // border: .1px solid gray;
        background-color: transparent !important;
        // box-shadow: inset 0 0 1px 0 gray;
        color: #AFBABD;
    }

    // 表格
    :deep(.n-data-table-table) {
        overflow: hidden;
        border-radius: 14px;
    }

    :deep(.n-data-table) {
        font-size: 18px;
    }


    // 分页区域
    :deep(.n-data-table__pagination) {
        justify-content: center;
    }

    :deep(.n-pagination-item) {
        width: 32px;
        height: 32px;
        box-sizing: border-box;
        font-size: 16px;
        background: #14173A;
        border: 1.4px solid #AEAEB0 !important;
        color: #AEAEB0;
        border-radius: 10px !important;
    }

    :deep(.n-pagination-item--clickable) {
        &:hover {
            color: #fff !important;
        }
    }

    :deep(.n-pagination-item--button) {
        width: 32px;
        height: 32px;
        box-sizing: border-box;
        color: #fff !important;
        font-weight: bold;
        background-color: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%) !important;
        background: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%) !important;

        &:hover {
            color: #fff !important;
            background-color: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%) !important;

        }

        &.n-pagination-item--disabled {
            color: #AEAEB0 !important;
            background-color: #14173A !important;
            border: 1.4px solid #AEAEB0 !important;
            background: #14173A !important;

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