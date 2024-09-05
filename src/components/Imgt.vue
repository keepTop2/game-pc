<!-- 带时间戳的图片组件 -->
<template>
    <img :src="props.src + '?t=' + Date.now()" alt="img">
</template>

<script setup lang='ts' name="Img">

const props: any = defineProps({
    src: {
        type: String,
        default: ''
    }
})

</script>