<template>
  <div class="chat_content">
    <div class="chat_item"  v-for="item in chatList" :key="item.id" :style="{justifyContent:item.role=='kf'?'flex-start':'flex-end'}">
      <img :src="`/img/serviceModal/${item.role=='kf'?'avatar':'avatar1'}.webp`" alt="">
      <div class="chat_main">
        <div class="user_info">
          <span>{{ item.name }}</span>
          <div class="mark_kf">{{ item.role=='kf'?'官方客服':'我' }}</div>
          <span class="date">{{ item.date }}</span>
        </div>
        <div class="user_content">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { computed } from 'vue';
// import btn from './btn.vue';
// import Common from '@/utils/common';
// import { Net } from '@/net/Net';
// import { NetPacket } from '@/netBase/NetPacket';
// import { MessageEvent2 } from '@/net/MessageEvent2';
// import { NetMsgType } from '@/netBase/NetMsgType';
// import { Message } from '@/utils/discreteApi';

// import { useI18n } from 'vue-i18n';
// const { t } = useI18n();
// const props = defineProps({
//   visible: {
//     type: Boolean,
//     default: false,
//   },
// });
// const emit = defineEmits(['update:visible']);

const chatList = [
  {name:'阿铁',date:'2024/7/9 18:00:05',role:'kf',content:'你好，我想申请升级代理',id:1},
  {name:'阿铁',date:'2024/7/9 18:10:05',role:'user',content:'你好，我想申请升级代理',id:2},
  {name:'阿铁',date:'2024/7/9 18:20:05',role:'kf',content:'你好，我想申请升级代理',id:3},
  {name:'阿铁',date:'2024/7/9 18:30:05',role:'user',content:'你好，我想申请升级代理',id:4},
  {name:'阿铁',date:'2024/7/9 18:40:05',role:'kf',content:'你好，我想申请升级代理',id:5},
  {name:'阿铁',date:'2024/7/9 18:50:05',role:'user',content:'你好，我想申请升级代理',id:6},
  {name:'阿铁',date:'2024/7/9 18:55:05',role:'kf',content:'你好，我想申请升级代理',id:7},
  {name:'阿铁',date:'2024/7/9 18:50:05',role:'user',content:'你好，我想申请升级代理',id:6},
  {name:'阿铁',date:'2024/7/9 18:55:05',role:'kf',content:'你好，我想申请升级代理',id:7},
]




</script>
<style lang="less" scoped>
.chat_content {
  height: 558px;
  padding: 30px;
  box-sizing: border-box;
  overflow-y: auto;
  &::-webkit-scrollbar {
  display: none;
}


  .chat_item {
    display: flex;
  //  justify-content: flex-end;
   

    img {
      width: 40px;
      height: 40px;
    }
    .chat_main{
      margin-left: 10px;
    }

    .user_info {
      display: flex;
      gap: 8px;

      .mark_kf {
        border-radius: 6px;
        height: 24px;
        line-height: 24px;
        padding: 0 6px;
        font-size: 12px;
        box-sizing: border-box;
        background-image: radial-gradient(circle at 50% 14%, #4c36b3 0%, #3a2786 48%, #3c279a 65%), linear-gradient(to bottom, #fff 0%, #af9eff 102%);
      }

      .date {
        font-size: 14px;
        color: #8d84c5;
      }
    }

    .user_content {
      margin-top: 12px;
      border-radius: 2px 12px 12px 12px;
      padding: 8px 16px;
      border: solid 1px #353b5a;
      background-color: #322c59;
    }
  }
}
</style>