<template>
    <div class="login_form">

        <n-form ref="formRef" :loading="props.loading" :model="props.formParams" label-placement="left">
            <n-grid :cols="24" :x-gap="24">
                <template v-for="(item, i) in props.formParamsList" :key="i">
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
import { ref, reactive, h } from "vue";
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

const disabledDate = (d: any) => {
    const now = new Date();
    // 获取今天的日期
    const dayOfWeek = now.getDay();
    // 计算本周一的日期
    const distanceToMonday = (dayOfWeek + 6) % 7;  // 计算从今天到上一个星期一的天数
    const thisMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - distanceToMonday, 0, 0, 0);
    // 计算下周一的日期
    const nextMonday = new Date(thisMonday.getFullYear(), thisMonday.getMonth(), thisMonday.getDate() + 8, 0, 0, 0);

    // 获取90天前的时间戳
    const ninetyDaysAgo = now.getTime() - 90 * 24 * 60 * 60 * 1000;

    // 判断是否在今天24:00之前且在90天以内
    return !(d < nextMonday && d >= ninetyDaysAgo);
}



const changeTab = (tabId: number) => {
    resetInputHide()
    emit('changeTab', tabId);
};
const resetInputHide = () => {
    for (const key in state.formData.list) {
        state.formData.list[key].show = false
    }
}







const resetFormValue = () => { state.formData.formParams = state.formInitValue }




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
</style>