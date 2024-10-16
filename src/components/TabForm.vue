<template>
    <div class="login_form">

        <n-form ref="formRef" :loading="props.loading" :model="props.formParams" label-placement="left">
            <n-grid :cols="24" :x-gap="24">
                <template v-for="(item, i) in props.formParamsList" :key="i">
                    <n-form-item-gi :span="item.span" :label="t(item.label)" :path="item.path">
                        <n-select v-if="item.type == 'select'" v-model:value="props.formParams[item.path]"
                            :placeholder="item.placeholder" :options="item.options" />
                        <n-date-picker v-if="item.type == 'daterange'" :is-date-disabled="disabledDate"
                            v-model:value="state.date" type="daterange" format="yyyy/MM/dd" :show-suffix="false"
                            :on-confirm="chooseTime" />

                    </n-form-item-gi>

                </template>


            </n-grid>
        </n-form>

        <div class="seach_btn">
            <n-button round type="primary" @click="seach">
                搜索
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
import { convertDateToObject } from "@/utils/dateTime";
const { t } = useI18n();
const emit = defineEmits(['changeTab', 'sendSeach', 'nextChange']);
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
        defaultPageSize: 20
    },
    date: null,


})
const chooseTime = (date: any) => { // 手动选择时间
    props.formParams.start_time = convertDateToObject(date[0])
    props.formParams.end_time = convertDateToObject(date[1])
}
const seach = () => {

    emit('sendSeach');
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


    >.seach_btn>button {
        width: 100px;
        height: 40px;

    }
}
</style>