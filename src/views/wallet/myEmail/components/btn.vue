<template>
  <div class="btn-style" :style="{ width: width/19.2 + 'rem', height:  height/19.2 + 'rem', }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  width: {
    // 宽度
    type: Number,
    default: 120,
  },
  height: {
    // 宽度
    type: Number,
    default: 36,
  },
});
</script>

<style lang="less" scoped>
.btn-style {
  background: url(/img/wallet/tabBtnBG.webp) no-repeat;
  background-size: 100% 112%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  box-sizing: border-box;
  border-radius: 16px;
  cursor: pointer;
}
</style>
