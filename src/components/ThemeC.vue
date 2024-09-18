<template>
  <n-switch :rail-style="railStyle"
            v-model:value="themeColor"
            :checked-value="themeArr[1].value"
            :unchecked-value="themeArr[0].value"
            @update:value="(e: any) => { handleUpdateValue(e) }"
  >
    <template #checked>
      {{ themeArr[1].label }}
    </template>
    <template #unchecked>
      {{ themeArr[0].label }}
    </template>
  </n-switch>
</template>

<script setup lang='ts'>
import type { CSSProperties } from 'vue';
import { Page } from '@/store/page.ts';
import pinia from '@/store';
import { storeToRefs } from 'pinia';

const page = Page(pinia);
const { themeColor } = storeToRefs(page);
const themeArr: any = [
  { label: '日间模式', value: 'dayMode' },
  { label: '夜间模式', value: 'nightMode' },
];
// const props: any = defineProps({
//   theme: {
//     type: String,
//     default: '',
//   },
// });
const railStyle = ({
                     focused,
                     checked,
                   }: {
  focused: boolean
  checked: boolean
}) => {
  const style: CSSProperties = {};
  if (checked) {
    style.background = '#d03050';
    if (focused) {
      style.boxShadow = '0 0 0 2px #d0305040';
    }
  } else {
    style.background = '#2080f0';
    if (focused) {
      style.boxShadow = '0 0 0 2px #2080f040';
    }
  }
  return style;
};
// 切换皮肤
const handleUpdateValue = async (e: any) => {
  await page.setTheme(e);
};

</script>
