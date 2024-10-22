<template>
  <div class="menu_wrap" :class="{ 'open_menu_wrap': hoverStatus }">
    <div class="menu_wrap_list" @mouseenter="mouseenter" @mouseleave="mouseleave">
      <div v-for="(item, i) in menuList" :key="i" class="menu_wrap_item"
        :class="venueActive == item.id && 'active_item'" @click="itemClick(item)">
        <Imgt :src="item.icon" />
        <span>{{ item.label }}</span>
        <div :class="venueActive == item.id && 'active_item_bg'"></div>
      </div>

      <div v-for="(item, i) in homeGameData" :key="i" class="menu_wrap_item"
        :class="venueActive == item.id && 'active_item'" @click="itemGameClick(item)">
        <!-- <Imgt :src="item.icon" /> -->
        <Imgt :src="`/img/menu/${item.id}.webp`" />
        <span>{{ unserialize(item.name) }}</span>
        <div :class="venueActive == item.id && 'active_item_bg'"></div>
      </div>
      <div class="menu_wrap_list_ban">
        <!-- <Imgt src="/img/menu/ban.webp" /> -->
      </div>
    </div>
    <div class="menu_wrap_other">
      <div @click="router.push('/wallet/activity')">
        <Imgt src="/img/menu/menu_10.webp" />
        <span>活动</span>
      </div>
      <div @click="router.push('/wallet/levelInfo')">
        <Imgt src="/img/menu/menu_11.webp" />
        <span>VIP</span>
      </div>
      <div>
        <Imgt src="/img/menu/menu_12.webp" />
        <span>商城</span>
      </div>
    </div>

    <!-- 下拉菜单 -->
    <div class="sub_menu" v-show="hoverStatus" @mouseenter="mouseenter" @mouseleave="mouseleave">

      <!-- 一级分类 -->
      <div class="sub_menu_0 sub_menu_1">
        <div :class="venueActive == item.id && 'active_1_item'" class="menu_1_item"
          v-for="(item, i) in menuList.filter(item => item.id != -1)" :key="'a' + i" @click="itemClick(item)">
          <Imgt class="icon" :src="item.icon" />
          <span class="name">{{ item.label }}</span>
          <Imgt class="more more1" :src="`/img/menu/menu_more.webp`" />
          <Imgt class="more more2" :src="`/img/menu/menu_more2.webp`" />
        </div>
        <div :class="venueActive == item.id && 'active_1_item'" class="menu_1_item" v-for="(item, i) in homeGameData"
          :key="'b' + i" @click="itemGameClick(item)">
          <Imgt class="icon" :src="`/img/menu/${item.id}.webp`" />
          <span class="name">{{ unserialize(item.name) }}</span>
          <Imgt class="more more1" :src="`/img/menu/menu_more.webp`" />
          <Imgt class="more more2" :src="`/img/menu/menu_more2.webp`" />
        </div>
      </div>

      <!-- 游戏平台 -->
      <div class="sub_menu_0 sub_menu_2">2</div>

      <!-- 游戏列表 -->
      <div class="sub_menu_0 sub_menu_3">3</div>

    </div>
  </div>
</template>
<script setup lang="ts" name="Header">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import pinia from "@/store/index";
import { Page } from "@/store/page";
import { Local } from "@/utils/storage";
const { homeGameData } = storeToRefs(Page(pinia));



const router = useRouter();
const { venueActive, lang } = storeToRefs(Page(pinia));
// const route = useRoute();
// const active_id = ref(0);
const unserialize = (v: any) => {
  let obj: any = {
    en: "en-US",
    zh: "zh-CN",
    vn: "vi-VN",
  };
  // const data = JSON.parse(v)
  return v[obj[lang.value]];
};
const menuList = [
  { label: "首页", icon: "/img/menu/menu_1.webp", url: "/", id: -1 },
  {
    label: "俱乐部",
    icon: "/img/menu/menu_2.webp",
    url: "/club",
    name: "club",
    id: 99,
  },
  { label: "赛程", icon: "/img/menu/menu_3.webp", url: "", id: 100 },
  // { label: "棋牌", icon: "/img/menu/menu_4.webp", url: "", id: 4 },
  // { label: "电子", icon: "/img/menu/menu_5.webp", url: "", id: 5 },
  // { label: "真人", icon: "/img/menu/menu_6.webp", url: "", id: 6 },
  // { label: "捕鱼", icon: "/img/menu/menu_7.webp", url: "", id: 7 },
  // { label: "彩票", icon: "/img/menu/menu_8.webp", url: "", id: 8 },
  // { label: "电竞", icon: "/img/menu/menu_9.webp", url: "", id: 9 },
];

const itemClick = async (item: any) => {
  await Page(pinia).setVenueActive(item.id);
  router.push(`${item.url}`);
  mouseenter()

  clickLoading.value = true
  setTimeout(() => {
    clickLoading.value = false
  }, 1000)
};
const itemGameClick = async (item: any) => {
  await Page(pinia).setVenueActive(item.id);
  router.push({
    path: "/gameDetail",
    query: {
      venue_id: item.id,
    },
  });
  clickLoading.value = true
  setTimeout(() => {
    clickLoading.value = false
  }, 1000)
};
onMounted(async () => {
  if (Local.get("venueActive")) {
    await Page(pinia).setVenueActive(Local.get("venueActive"));
  }
});
// watch(
//   () => route.query.venue_id,
//   async (n: any) => {
//     if (n) {
//       await Page(pinia).setVenueActive(n);

//     }
//   }
// )

// 展开状态
const hoverStatus = ref(false)
const hovertimeout: any = ref(null)
const clickLoading = ref(false)
const mouseleave = () => {
  if (clickLoading.value) return
  hovertimeout.value = setTimeout(() => {
    hoverStatus.value = false
  }, 300)
}
const mouseenter = () => {
  if (clickLoading.value) return
  if (hovertimeout.value) clearTimeout(hovertimeout.value)
  hoverStatus.value = true
}
</script>

<style lang="less" scoped>
@timestamp: `new Date() .getTime() `;

.menu_wrap {
  width: 100%;
  margin: 0 auto 17px;
  display: flex;
  flex-wrap: wrap;
  align-items: first baseline;
  position: relative;
  height: 133px;

  .sub_menu {
    width: 100%;
    height: 794px;
  }

  .menu_wrap_list {
    // background: url('/img/menu/ban.webp?t=@{timestamp}') no-repeat;
    // background-size: 100% 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1010px;
    height: 133px;

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
    top: 2px;
    height: 133px;
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

.open_menu_wrap {
  height: 927px;
  background: url("/img/menu/menu_bg.webp?t=@{timestamp}") no-repeat;
  background-size: 100% calc(100% - 50px);
  background-position-y: 50px;

  .sub_menu {
    padding: 14px 20px 20px 14px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;

    .sub_menu_0 {
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      overflow-y: auto;
      height: 100%;

      &::-webkit-scrollbar {
        display: block;
        width: 6px;
        height: 10px;
      }

      &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0);
        border-radius: 18px;
      }

      &::-webkit-scrollbar-thumb {
        background: #381B8B;
        border-radius: 10px;
      }
    }

    .sub_menu_1 {
      width: 244px;
      padding: 14px;

      .menu_1_item {
        height: 59px;
        margin-bottom: 37px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 14px 0 6px;
        cursor: pointer;

        &:last-child {
          margin-bottom: 0;
        }

        .icon {
          width: 58px;
          height: 58px;
        }

        .name {
          color: #9497A1;
          font-size: 18px;
        }

        .more {
          width: 15px;
          height: 26px;
        }

        .more1 {
          display: block;
        }

        .more2 {
          display: none;
        }
      }

      .active_1_item {
        background-image: linear-gradient(to right, #1C99FF, #9C1FFF);
        border-radius: 8px;

        .name {
          color: #fff;
        }

        .more1 {
          display: none;
        }

        .more2 {
          display: block;
        }
      }
    }

    .sub_menu_2 {
      width: 368px;
    }

    .sub_menu_3 {
      width: 714px;
    }
  }

  .menu_wrap_list {
    .menu_wrap_list_ban {
      background: none;
    }
  }
}
</style>
