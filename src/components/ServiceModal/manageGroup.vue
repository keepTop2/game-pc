<template>
  <!-- 管理分组弹窗 -->
  <n-modal to="body" v-model:show="isShow" :mask-closable="false" transform-origin="center">
      <div class="main_setting">
        <h4 class="top_title">
          <span>分组管理</span>
          <i>
            <iconpark-icon @click="isShow = false" icon-id="Group39368" color="#fff" size="1.2rem"></iconpark-icon>
          </i>
        </h4>
        <div class="main_body">
         <div class="group_main">
          <div class="tips">将不同对话归纳分类，并在它们之间快速切换。</div>
          <div>
            <div>当前分组</div>
          </div>
         </div>
      </div>
    </div>

  </n-modal>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
// import btn from './btn.vue';
// import Common from '@/utils/common';
// import { Net } from '@/net/Net';
// import { NetPacket } from '@/netBase/NetPacket';
// import { MessageEvent2 } from '@/net/MessageEvent2';
// import { NetMsgType } from '@/netBase/NetMsgType';
// import { Message } from '@/utils/discreteApi';
// import { useI18n } from 'vue-i18n';

// const { t } = useI18n();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible']);

const isAdd = ref(false)
const isShow = computed({
  get: function () {
    return props.visible;
  },
  set: function (value) {
    emit('update:visible', value);
  },
});

</script>
<style lang="less" scoped>
  .top_title {
    margin: 0;
    width: 100%;
    position: relative;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #fff;
    // border-radius: 14px;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    text-align: center;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    background-image: linear-gradient(to bottom,
        #4c36b3 100%,
        #3a2786 28%,
        #3c279a 0%);

    >i {
      position: absolute;
      top: 5px;
      right: 15px;
      cursor: pointer;
    }
  }
  .main_body {
    width:494px;
    height: 600px;
    padding: 40px 60px;
    background-color: #231353;
    box-sizing: border-box;
  }
  .group_main{
    .tips{
      color:#8D84C5;
      font-size: 14px;
    }
  }

</style>
