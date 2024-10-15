<template>
  <div class="menu_wrap">
    <div class="menu_wrap_list">
      <div
        v-for="item in menuList"
        :key="item.id"
        :class="['menu_wrap_item', { active_item: active_id == item.id }]"
        @click="itemClick(item)"
      >
        <Imgt :src="item.icon" />
        <span>{{ item.label }}</span>
        <div :class="{ active_item_bg: active_id == item.id }"></div>
      </div>
      <div class="menu_wrap_list_ban">
        <!-- <Imgt src="/img/menu/ban.webp" /> -->
      </div>
    </div>
    <div class="menu_wrap_other">
      <div>
        <Imgt src="/img/menu/menu_10.webp" />
        <span>活动</span>
      </div>
      <div>
        <Imgt src="/img/menu/menu_11.webp" />
        <span>VIP</span>
      </div>
      <div>
        <Imgt src="/img/menu/menu_12.webp" />
        <span>商城</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Header">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const route = useRoute();
const active_id = ref(1);

const menuList = [
  { label: "首页", icon: "/img/menu/menu_1.webp", url: "/", id: 1 },
  {
    label: "俱乐部",
    icon: "/img/menu/menu_2.webp",
    url: "/gameMain/club",
    name: "club",
    id: 2,
  },
  { label: "赛程", icon: "/img/menu/menu_3.webp", url: "", id: 3 },
  { label: "棋牌", icon: "/img/menu/menu_4.webp", url: "", id: 4 },
  { label: "电子", icon: "/img/menu/menu_5.webp", url: "", id: 5 },
  { label: "真人", icon: "/img/menu/menu_6.webp", url: "", id: 6 },
  { label: "捕鱼", icon: "/img/menu/menu_7.webp", url: "", id: 7 },
  { label: "彩票", icon: "/img/menu/menu_8.webp", url: "", id: 8 },
  { label: "电竞", icon: "/img/menu/menu_9.webp", url: "", id: 9 },
];

const itemClick = (item: any) => {
  active_id.value = item.id;
  router.push(`${item.url}`);
};

onMounted(() => {
  console.log(77777, route);
});
</script>

<style lang="less" scoped>
@timestamp: `new Date() .getTime() `;

.menu_wrap {
  display: flex;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: first baseline;
  position: relative;
  height: 120px;

  .menu_wrap_list {
    // background: url('/img/menu/ban.webp?t=@{timestamp}') no-repeat;
    // background-size: 100% 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1010px;
    height: 100%;

    :first-child {
      margin: 0 28px;
    }

    .menu_wrap_item {
      width: 70px;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #ffffff;
      font-size: 16px;
      font-weight: 600;
      z-index: 100;
      cursor: pointer;
      position: relative;
      z-index: 100;

      span {
        display: block;
        margin-top: -4px;
        z-index: 100;
      }

      img {
        width: 70px;
        z-index: 100;
      }

      .active_item_bg {
        width: 130px;
        height: 68px;
        z-index: 1;
        top: 30px;
        left: -27px;
        position: absolute;
        background: url("/img/menu/btn_bg.webp?t=@{timestamp}") no-repeat;
        background-size: 100% 100%;
      }
    }

    .active_item {
      z-index: 100;

      img {
        scale: 1.2;
        margin-bottom: 5px;
        margin-top: -5px;
      }
    }

    .menu_wrap_list_ban {
      position: absolute;
      left: 0;
      top: 45px;
      z-index: 1;
      width: 1010px;
      height: 68px;
      border-radius: 16px;
      background: url("/img/menu/ban.webp?t=@{timestamp}") no-repeat;
      background-size: 100% 100%;
    }
  }

  .menu_wrap_other {
    position: absolute;
    right: 0;
    top: 30px;
    height: 100%;
    // margin-left: 40px;
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      width: 88px;
      height: 82px;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #ffffff;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
    }
  }
}
</style>
