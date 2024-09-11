<template>
  <div class="iframe_box">
    <!-- <nut-drag class="drag" attract :boundary="{ top: 0, left: 0, bottom: 20, right: 30 }">
      <iconpark-icon name="hoticonhbwvmun01" size="30" @click.stop="onBtnClicked" />
    </nut-drag> -->

    <iframe id="iframeId" v-if="state.src" :src="state.src" frameborder="0" scrolling="auto" />
  </div>
</template>
<script setup lang='ts'>
import { Local } from '@/utils/storage';
import { onMounted, reactive } from 'vue'

import { useRouter, useRoute } from 'vue-router'
// const router = useRouter()
const route = useRoute()

const state: any = reactive({
  src: '',
  left: '',
  top: '',
  rlen: history.length,
  offset: { x: window.innerWidth - 100, y: 45 },
})

// const onBtnClicked = () => {
//   let len = state.rlen - history.length - 1
//   router.go(len)
// }
onMounted(() => {
  if (route.query.screenOrientation == '1') {

  }
  state.src = Local.get('gameUrl')
})
</script>


<style lang="less" scoped>
.iframe_box {
  bottom: 0;
  height: 100%;
  left: 0;
  min-height: 100vh;
  overflow-y: scroll;
  overflow: hidden;
  padding-bottom: 0;
  // position: fixed;
  // right: 0;
  // top: 0;
  width: 100%;
  z-index: 4000;
}

#iframeId {
  height: 100%;
  min-height: 0 !important;
  padding-top: 0;
  position: relative;
  width: 100%;
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
