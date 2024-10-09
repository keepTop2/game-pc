<template>
  <div class="iframe_box">
    <Header />
    <iframe id="iframeId" v-if="state.src" :src="state.src" frameborder="0" scrolling="auto" />
  </div>
</template>
<script setup lang='ts'>
import { Local } from '@/utils/storage';
import { onMounted, reactive } from 'vue'
import Header from '@/components/Header.vue';
import { useRoute } from 'vue-router'
const route = useRoute()

const state: any = reactive({
  src: '',
  left: '',
  top: '',
  rlen: history.length,
  offset: { x: window.innerWidth - 100, y: 45 },
})

onMounted(() => {
  if (route.query.screenOrientation == '1') {

  }
  state.src = Local.get('gameUrl')
})
</script>


<style lang="less" scoped>
.iframe_box {
  bottom: 0;
  left: 0;
  min-height: 100vh;
  overflow-y: scroll;
  overflow: hidden;
  padding-bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 4000;
}

#iframeId {
  min-height: 0 !important;
  padding-top: 0;
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}

.drag {
  margin-top: 2px;
  background-color: #ccc;
  border-radius: 50%;
  padding: 2px 4px;
}

.ys-float-btn {
  z-index: 999;
  position: fixed;
}

@keyframes move {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
<style lang="less">
html, body {
  overflow-y: scroll;
}
.header {
  position: absolute !important;
  top: 0;
}
</style>
