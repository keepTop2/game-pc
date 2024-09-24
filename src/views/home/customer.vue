<template>
    <div style="color: #fff;display: flex;align-items: center;justify-content: center;">
        <ServiceModal v-model:visible="visible" />
    </div>
</template>

<script setup lang="ts">
import ServiceModal from "@/components/ServiceModal/ServiceModal.vue"
import { ref } from "vue"

const visible = ref(true)
</script>

<style lang="less" scoped>
:deep(.clo){
    display: none;

}


</style>