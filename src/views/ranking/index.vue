<template>
  <div class="box_wrap">
    <Imgt src="/img/game/topimg.webp" class="topimg" />
    <div class="box_main">
      <div class="box_title">
        <span class="label">最新赛事排行</span>
        <div class="more">
          <span>展开</span>
          <iconpark-icon
            class="left"
            icon-id="fangxiangicon02"
            size=".8rem"
          ></iconpark-icon>
        </div>
      </div>
      <div class="match_list">
        <div
          class="match_list_item"
          v-for="i in 6"
          :key="i"
          :style="{
            'background-image': `url(/img/game/bg_card${getRandomValue()}.webp)`,
          }"
        >
          <Imgt src="/img/ranking/card_img.webp" />
          <div class="card_main">
            <div class="card_main_title">德州比赛-多人奖金赛</div>
            <div class="card_main_num">报名人数：62</div>
            <div class="card_main_time">
              <div class="card_main_time_l">
                <span>开始时间:2024-07-01 12:30:00</span>
                <span>开始时间:2024-07-01 12:30:00</span>
              </div>
              <div>
                <n-button style="height: 36px; width: 98px">报名</n-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="box_main">
      <div class="box_title">
        <span class="label">赛事详情</span>
      </div>
      <div class="box_list">
        <div class="tab_wrap">
          <div
            v-for="item in tabList"
            :key="item.id"
            @click="tabClick(item)"
            :class="{ tab_active: tab_id == item.id }"
          >
            <span>{{ item.label }}</span>
          </div>
        </div>
        <Imgt src="/img/game/desimg.webp" class="des_img" />

        <matchDes v-show="tab_id == 1"></matchDes>
        <div v-show="tab_id == 2" class="bonus_list">
          <div class="bonus_item" v-for="i in 5" :key="i">
            <div class="bonus_item_title">
              <div>第一名获得</div>
              <div>2,888,888</div>
            </div>
            <Imgt :src="`/img/ranking/bonus_${i}.webp`" class="bonus_img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import matchDes from "../newHome/components/matchDes.vue";
const tab_id = ref(1);
const tabList = [
  { label: "赛况", id: 1 },
  { label: "奖金", id: 2 },
  { label: "牌桌", id: 3 },
  { label: "排行榜", id: 4 },
  { label: "盲注", id: 5 },
];

const tabClick = (item: any) => {
  tab_id.value = item.id;
};

const getRandomValue = () => {
  const randomNumber = Math.random() * 3; // 生成一个0到2.9之间的随机数

  const intValue = Math.floor(randomNumber); // 向下取整
  return intValue + 1; // 返回1到3之间的整数
};
</script>

<style lang="less" scoped>
@timestamp: `new Date() .getTime() `;

.box_wrap {
  margin-top: 25px;
  width: 1400px;
  .topimg {
    width: 1400px;
  }
}

.box_main {
  position: relative;
  margin-top: 10px;
  .box_title {
    display: flex;
    justify-content: space-between;
    .label {
      color: #fff;
      font-size: 30px;
    }
  }

  .match_list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
    .match_list_item {
      width: 453px;
      height: 140px;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      padding: 14px;
      img {
        width: 112px;
        height: 112px;
      }
      .card_main {
        margin-left: 11px;
        flex: 1;
        display: flex;
        flex-direction: column;
        .card_main_title {
          font-size: 20px;
          color: #fff;
        }
        .card_main_num {
          font-size: 14px;
          color: #afb6bd;
        }
        .card_main_time {
          display: flex;
          gap: 25px;
          .card_main_time_l {
            display: flex;
            flex-direction: column;
            font-size: 12px;
            color: #afb6bd;
          }
        }
      }
    }
  }

  .box_list {
    height: 607px;
    width: 1400px;
    border-radius: 16px;
    padding: 24px 20px;
    box-sizing: border-box;
    justify-content: center;
    background: linear-gradient(
        180deg,
        rgba(13, 15, 48, 0.288) 0%,
        rgba(17, 20, 60, 0.6) 100%
      ),
      linear-gradient(0deg, rgba(20, 23, 58, 0.69), rgba(20, 23, 58, 0.69));

    .des_img {
      width: 100%;
    }
  }
}

.more {
  position: absolute;
  right: 0;
  top: 10px;

  width: 90px;
  height: 40px;
  display: flex;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: solid 1.4px #282747;
  background-color: #282747;
  cursor: pointer;
  color: #c6c4f5;

  &:hover {
    color: #fff;
    background: url("/img/dialog/click.webp?t=@{timestamp}") no-repeat;
    background-size: 100% 100%;
  }
}

.tab_wrap {
  display: flex;
  color: #afb6bd;
  font-size: 20px;
  padding-top: 3px;
  gap: 65px;
  margin-left: 32px;
  margin-bottom: 40px;

  div {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover {
      color: #b5a5ff;
    }
  }

  .tab_active {
    color: #b5a5ff;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -15px;

      height: 5px;
      width: 100%;
      border-radius: 100px;
      background: linear-gradient(180deg, #5a6cff 0%, #7e1cff 100%);
    }
  }
}

.bonus_list {
  display: flex;
  gap: 15px;
  margin-top: 12px;
}

.bonus_item {
  background: url("/img/ranking/bonus_bg.webp?t=@{timestamp}") no-repeat;
  background-size: 100% 100%;
  width: 260px;
  height: 152px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .bonus_item_title {
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div {
      &:nth-child(1) {
        font-size: 16px;
      }
      &:nth-child(2) {
        font-size: 24px;
        font-weight: 600;
      }
    }
  }
  .bonus_img {
    position: absolute;
    left: 12px;
    top: 0;
  }
}
</style>
