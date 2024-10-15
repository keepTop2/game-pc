<template>
    <div class="login_form">

        <n-form ref="formRef" :model="state.formParams" label-placement="left">
            <n-grid :cols="24" :x-gap="24">
                <template v-for="(item, i) in state.formParamsList" :key="i">
                    <n-form-item-gi :span="item.span" :label="item.label" :path="item.path">
                        <n-select v-if="item.type == 'select'" v-model:value="state.formParams[item.path]"
                            :placeholder="item.placeholder" :options="item.options" />
                        <n-date-picker v-if="item.type == 'daterange'" v-model:value="state.formParams[item.path]"
                            type="daterange" />
                    </n-form-item-gi>

                </template>

                <n-gi :span="8">
                    <div style="display: flex; justify-content: flex-end">
                        <n-button round type="primary" @click="handleValidateButtonClick">
                            验证
                        </n-button>
                    </div>
                </n-gi>
            </n-grid>
        </n-form>
    </div>
    <div class="table">
        <n-data-table striped :bordered="false" :single-line="false" :columns="state.columns" :data="state.data"
            :pagination="state.pagination" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, h } from "vue";
import { useI18n } from 'vue-i18n';
import { NButton } from "naive-ui";
const { t } = useI18n();
const emit = defineEmits(['changeTab', 'submitData', 'nextChange']);

const formRef = ref();

const state: any = reactive({
    // 查询参数集合
    formParams: {
        mobile: '',
        phoneCode: '',
    },
    // 各类输入框集合
    formParamsList: [
        {
            span: 8,
            type: 'select',
            label: 'Select',
            path: 'path',
            placeholder: '请选择',
            options: [
                {
                    label: '我是1号',
                    value: 1
                },
                {
                    label: '我是2号',
                    value: 2
                },
                {
                    label: '我是3号',
                    value: 3
                },
            ]
        },
        {
            span: 8,
            type: 'daterange',
            label: 'Select',
            path: 'path',
            placeholder: '请选择',


        }
    ],
    // 表格表头
    columns: [
        {
            title: 'Name',
            key: 'name'
        },
        {
            title: 'Age',
            key: 'age'
        },
        {
            title: 'Address',
            key: 'address'
        },
        {
            title: 'Tags',
            key: 'tags',
        },
        {
            title: 'Action',
            key: 'actions',
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
        }
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

})





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
</style>