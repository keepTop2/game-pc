<!-- 号码球 -->
<template>
    <div class="ball" :style="{ width: props.size + 'px', height: props.size + 'px' }">
        <img :src="`/img/activity/ball_${props.val}.webp`" alt="">
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    val: {
        type: [String, Number],
        default: 'un', // un-未选中 ed-选中 0-9 对应数字
    },
    size: {
        type: Number,
        default: 50
    }
})
</script>

<style lang="less" scoped>
.ball {
    border-radius: 50%;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
    }
}
</style>