<template>
    <n-flex :align="'center'" class="date_select" :class="'date_select_' + props.styleMode">
        <n-flex :align="'center'">
            <div class="date_item" :class="{ 'active_item': active == key }" @click="changeTime(key)"
                v-for="(val, key) in showOptions" :key="key">{{ val }}
            </div>
        </n-flex>
        <n-date-picker :is-date-disabled="disabledDate" input-readonly class="date_select_box" :format="'yyyy/MM/dd'"
            :on-confirm="chooseTime" v-model:value="timeObj.range" type="daterange">
            <template #separator>
                <span style="color: #8D84C5;">-</span>
            </template>
        </n-date-picker>
    </n-flex>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted, computed, PropType } from 'vue';
import { convertDateToObject } from "@/utils/dateTime"
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps({
    styleMode: { // 样式模式
        type: Number,
        default: 0
    },
    fasters: { // 快捷选项
        type: Array as PropType<string[]>,
        default: () => ['1', '2', '3']
    }
})
const emits = defineEmits(['submit'])
const active = ref('2') // 当前激活快捷项
type FasterOptionsType = {
    [key: string]: any;
};
const fasterOptions: FasterOptionsType = reactive({ // 快捷选项
    '1': t('home_page_yesToday'),
    '2': t('home_page_today'),
    '3': t('home_page_thisWeek'),
    '4': t('home_page_month')
})
const showOptions = computed(() => {
    const obj: FasterOptionsType = {}
    props.fasters.forEach(key => {
        obj[key] = fasterOptions[key]
    })
    return obj
})
const changeTime = (key: number | string) => { // 切换快捷选项
    active.value = String(key)
    timeCalc(String(key))
    submit()
}
const chooseTime = () => { // 手动选择时间
    active.value = '0' // 清除快捷选项
    submit()
}

const now = new Date();
const disabledDate = (d: any) => {
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

const timeObj = reactive({ // 选择的时间对象
    range: [new Date(), new Date()],
})

const submit = () => { // 提交结果
    setTimeout(() => {
        emits('submit', {
            start_time: convertDateToObject(timeObj.range[0]),
            end_time: convertDateToObject(timeObj.range[1]),
        })
    }, 0)
}


const timeCalc = (key: string) => { // 快捷项计算
    // 获取当前时间
    const now = new Date();
    // 获取今天的 00:00:00 时间
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    // 获取明天的 00:00:00 时间
    const tomorrowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    // 获取昨天的 00:00:00 时间
    const yesterdayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);
    // 获取30天前的 00:00:00 时间
    const ago30Midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29, 0, 0, 0);
    // 获取当前日期是星期几（0 表示星期日，1 表示星期一，...，6 表示星期六）
    const dayOfWeek = now.getDay();
    // 计算本周一的日期
    const distanceToMonday = (dayOfWeek + 6) % 7;  // 计算从今天到上一个星期一的天数
    const thisMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - distanceToMonday, 0, 0, 0);
    // 计算下周一的日期
    const nextMonday = new Date(thisMonday.getFullYear(), thisMonday.getMonth(), thisMonday.getDate() + 7, 0, 0, 0);
    switch (key) {
        case '1':
            timeObj.range = [yesterdayMidnight, todayMidnight]
            break
        case '2':
            timeObj.range = [todayMidnight, tomorrowMidnight]
            break
        case '3':
            timeObj.range = [thisMonday, nextMonday]
            break
        case '4':
            timeObj.range = [ago30Midnight, tomorrowMidnight]
            break
    }
}

onMounted(() => {
    changeTime(active.value) // 加载时默认触发
})

</script>

<style lang='less' scoped>
.date_select {
    .date_item {
        border: 1.4px solid rgba(90, 71, 178, 1);
        height: 36px;
        min-width: 70px;
        border-radius: 10px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        color: #8D81C1;
        background: #372771;
        justify-content: center;
        cursor: pointer;
        box-sizing: border-box;
    }

    .active_item {
        height: 36px;
        background: url(/img/home/btnBG.webp) no-repeat;
        background-size: 100% 114%;
        border: 1.4px solid rgba(90, 71, 178, 0);
        color: #fff;
    }

    .date_select_box {
        width: 350px;
        height: 36px !important;
        box-sizing: border-box;

        :deep(.n-input) {
            background: #372771;
            height: 38px;
            font-size: 16px;

            .n-input__input-el {
                height: 38px;
                color: #8D84C5;
            }
        }
    }
}

.date_select_2 {
    flex-direction: row-reverse !important;

    .date_item {
        width: 150px;
        margin: 0 0 0 6px;
    }

    .active_item {
        background: url(/img/home/btnBG3.webp) no-repeat;
        background-size: 100% 125%;
        background-position-y: 20%;
    }

    .date_select_box {
        flex: 1;
        margin-right: 6px
    }
}
</style>
