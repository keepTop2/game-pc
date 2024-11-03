<!-- 数字竞猜 -->
<template>
    <div class="guess">
        <DialogShare />
        <DialogGuess />
        <DialogStatus />
        <DialogRank />
    </div>
</template>

<script setup lang="ts">
import DialogShare from "./DialogShare.vue"
import DialogGuess from "./DialogGuess.vue"
import DialogStatus from "./DialogStatus.vue"
import DialogRank from "./DialogRank.vue"
</script>

<style lang="less" scoped></style>