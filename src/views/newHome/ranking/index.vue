<template>
  <div class="box_wrap">
    <Imgt src="/img/game/topimg.webp" />
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
        <div class="match_list_item"></div>
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
        <Imgt src="/img/game/desimg.webp" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
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
</script>

<style lang="less" scoped>
@timestamp: `new Date() .getTime() `;

.box_wrap {
  margin-top: 15px;
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
    .match_list_item {
      width: 453px;
      height: 140px;
      background: url("/img/game/bg_card1.webp?t=@{timestamp}") no-repeat;
      background-size: 100% 100%;
    }
  }

  .box_list {
    height: 607px;
    width: 100%;
    border-radius: 16px;
    padding: 24px 20px;
    box-sizing: border-box;
    background: linear-gradient(
        180deg,
        rgba(13, 15, 48, 0.288) 0%,
        rgba(17, 20, 60, 0.6) 100%
      ),
      linear-gradient(0deg, rgba(20, 23, 58, 0.69), rgba(20, 23, 58, 0.69));
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
</style>
