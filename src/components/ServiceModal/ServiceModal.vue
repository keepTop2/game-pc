<template>
  <!-- 客服聊天弹窗 -->
  <n-modal to="body" v-model:show="isShow" :mask-closable="false" transform-origin="center">
    <div class="main">
      <h4 class="top_title">
          <span @click="showSetting">与阿铁的聊天 (官方客服)</span>
          <i>
            <iconpark-icon @click="isShow = false" icon-id="Group39368" color="#fff" size="1.2rem"></iconpark-icon>
          </i>
        </h4>
        <div class="main_body">
        <!-- 左侧菜单 -->
        <div class="left_menu"></div>
        <!-- 右侧聊天区域 -->
        <div class="right_content">
          <chatArea></chatArea>
        </div>
        </div>
      <!-- 快捷语设置 -->
      <shortcutSettings v-model:visible="visibleSetting"/>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
// import btn from './btn.vue';
// import Common from '@/utils/common';
// import { Net } from '@/net/Net';
// import { NetPacket } from '@/netBase/NetPacket';
import chatArea from './chatArea.vue';
import shortcutSettings from './shortcutSettings.vue';
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
const visibleSetting = ref(false) // 快捷语设置


const isShow = computed({
  get: function () {
    return props.visible;
  },
  set: function (value) {
    emit('update:visible', value);
  },
});

// 打开快捷语设置
const showSetting = () => {
  visibleSetting.value = true
}

</script>
<style lang="less" scoped>
.main {
  width: 1200px;
  border-radius: 14px;
  border: solid 1.4px #322c59;
  overflow: hidden;
  // background-color: #231353;

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
  .main_body{
    height: 686px;
    display: flex;
    .left_menu{
      height: 100%;
      width: 280px;
      background-color: #2D1769;
    }
    .right_content{
      height: 100%;
      flex:1;
      background-color: #231353;
    }
  }
}
</style>
