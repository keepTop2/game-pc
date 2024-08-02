<template>
  <div class="chat_content">
    <div class="chat_item"  v-for="item in chatList" :key="item.id" :style="{justifyContent:item.role=='kf'?'flex-start':'flex-end'}">
      <img v-if="item.role=='kf'"  :src="`/img/serviceModal/avatar.webp`" alt="">
      <div class="chat_main">
        <div class="user_info" :style="{flexDirection:item.role=='kf'?'row':'row-reverse'}">
          <span>{{ item.name }}</span>
          <div class="mark_kf">{{ item.role=='kf'?'官方客服':'我' }}</div>
          <span class="date">{{ item.date }}</span>
        </div>
        <div :class="[item.role=='kf'?'user_content':'me_content']" v-if="!item.money">
          {{ item.content }}
        </div>
        <!-- 转账 -->
        <div :class="[item.role=='kf'?'user_content':'me_content']" v-else class="money">
          <div class="left">
          <img src="/img/serviceModal/transfer.webp" alt="">
          <div class="left_info">
          <span>转账给你</span>
          <span>300,000,000,000</span>
          </div>
          </div>
          <div class="total">
          代理转账
          </div>
        </div>
      </div>
      <img v-if="item.role=='user'" :src="`/img/serviceModal/avatar1.webp`" alt="">
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
  {name:'阿铁',date:'2024/7/9 18:10:05',role:'user',money:'2000',content:'你好，我想申请升级代理',id:2},
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
  height: 538px;
  padding: 30px 0px;
  box-sizing: border-box;
  overflow-y: auto;
  &::-webkit-scrollbar {
  display: none;
}


  .chat_item {
    display: flex;
    // flex-direction: row-reverse;
  //  justify-content: flex-end;
   

    img {
      width: 40px;
      height: 40px;
    }
    .chat_main{
      margin-left: 10px;
      margin-right: 10px;
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
    .me_content {
      margin-top: 12px;
      border-radius: 12px 2px 12px 12px;
      padding: 8px 16px;
      border: solid 1px #353b5a;
      background-color: #322c59;
    }

    .money{
      padding: 8px 0px;
      width: 287px;
      border: unset;
      cursor: pointer;
      background-color: #F9493E;

      .left{
        display: flex;
        align-items: center;
        margin-left: 16px;
        .left_info{
          margin-left: 10px;
          display: flex;
          flex-direction: column;
        }
      }
      .total{
        border-top: solid 1px rgba(255, 255, 255, 0.2);
        text-align: center;
      }
    }
  }
}
</style>