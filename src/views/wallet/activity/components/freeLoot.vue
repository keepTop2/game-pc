
<template>
  <div class="freeLoot">
    <div class="banner">
      <img src="/img/activity/image.webp" alt=""/>
      <span>活动时间：2024.1.1 ~ 2024.6.30</span>
    </div>

    <div class="plan">
      <div class="header">
        <Imgt src="/img/wallet/trialGame.svg" class="pointer" />
      </div>
      <div class="planListBox">
        <div class="planList">
          <div class="planListItem" v-for="(item, index) in planList.data"  @click="gameStart(item)" :style="{background: `url(${item.img}) no-repeat`}" :key="index">
            <span>{{item.name}}</span>
          </div>
        </div>
        <n-button @click="pushPlanListData" tertiary class="planButton">
          点击加载更多
        </n-button>
      </div>

    </div>
  </div>

</template>


<script setup lang="ts">
// import { useI18n } from 'vue-i18n';
import Imgt from '@/components/Imgt.vue';
import { reactive } from 'vue';
// import { useRoute, useRouter } from 'vue-router';
// import Imgt from '@/components/Imgt.vue';

const planList = reactive({
  data: [
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},

  ]
})

const pushPlanListData = () => {
  let data = [{name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},
    {name: 'Qwefsdfsa12312312312', img: '/img/home/colect_4.png'},]
  planList.data.push(...data)
}


const gameStart = () => {
  window.open('https://www.baidu.com/')
}


</script>


<style scoped lang="less">
.freeLoot {
  width: 100%;
  height: 100%;
  padding: 20px 0 30px;
  .banner {
    border-radius: 0;
    >img {
      width: 100%;
      height: 150px;
      border-radius: 6px;
      margin-bottom: 12px;
    }
    >span {
      font-size: 14px;
    }
  }
  .plan {
    border:1px solid rgba(38, 41, 76, 1);
    background-color: rgba(23, 27, 68, 1);
    //min-height: calc(100% - 230px);
    margin-top: 14px;
    border-radius: 12px;
    >.header{
      display: flex;
      justify-content: center;
      >img{
        width: 214px;
        height: 32px;
        margin-top:-6px;
      }
    }
    >.planListBox {
      height: 500px;
      overflow-y: auto;
      padding: 20px 40px 0;
      >.planList {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 16px;
        align-items: center;

        >.planListItem {
          position: relative;
          display: flex;
          align-items: end;
          justify-content: center;
          width: 120px;
          height: 120px;
          background-size: contain!important;
          span{
            display: block;
            width: 73px;
            //line-height: 18;
            //text-align: center;
            font-size: 12px;
            white-space: nowrap; /* 保持文本在一行显示 */
            overflow: hidden;    /* 隐藏溢出的文本 */
            text-overflow: ellipsis; /* 显示省略号 */
          }
        }
        >.planListItem:hover {
          cursor: pointer;
          &::after{
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            background-image: url("/img/wallet/gamePlan.webp");
            background-repeat: no-repeat;
            background-size: 70px;
            background-position: center;
            background-color: rgba(47, 19, 148, 0.7) !important;
          }
        }
      }
      >.planButton {
        width: 100%;
        background-image: none;
        //background-color: rgba(51, 56, 107, 1);
        border: 1px solid rgba(51, 56, 107, 1);
        margin: 16px 0 30px;
        color: rgba(51, 56, 107, 1);
        font-size: 12px;
      }
    }

  }
}
</style>
