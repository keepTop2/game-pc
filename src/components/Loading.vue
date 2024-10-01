<template>
    <div class="share_content">
        <n-modal :show="isShow" @click="isShow = false">
            <div class="loading-main">
                <div class="loading-content">
                    <SvgaItem keyStr="1" name="loading" :active="true" class="tab_style" />
                </div>
            </div>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SvgaItem from "@/components/SvgaItem.vue"
const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
})
const emit = defineEmits(['update:visible', 'close']);
const isShow = computed({
    get: function () {
        return props.visible;
    },
    set: function (value) {
        emit('update:visible', value);
    },
});

</script>

<style lang='less' scoped>
.loading-main {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loading-content {
    position: relative;
    text-align: center;
    height: 500px;
}

:deep(.nut-popup) {
    background: unset;
}
</style>