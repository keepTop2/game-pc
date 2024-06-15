<template>
    <div class="home">
        <Sidebar />
        <div class="content">
            1
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Sidebar from '@/components/Sidebar.vue';
</script>

<style lang='less' scoped>
.home {
    display: flex;
}
</style>