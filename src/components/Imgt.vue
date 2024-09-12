<!-- 带时间戳的图片组件 -->
<template>
    <img :src="props.src + '?t=' + Date.now()" :alt="props.alt">
</template>

<script setup lang='ts' name="Img">

const props: any = defineProps({
    src: {
        type: String,
        default: ''
    },
    alt: {
        type: String,
        default: 'img'
    }
})

</script>