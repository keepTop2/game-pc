<template>
  <div class="menu_wrap_box">
    <div class="menu_wrap_null"></div>
    <div class="menu_wrap" :class="{ 'open_menu_wrap': hoverStatus }">
      <!-- 主菜单 -->
      <div class="menu_wrap_list" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <div v-for="(item, i) in menuList" :key="i" class="menu_wrap_item"
          :class="[venueActive == item.id && 'active_item', 'menu_wrap_item' + item.id]" @click="itemClick(item)">
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
      <!-- 活动/vip/商城 -->
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
      <div class="sub_menu" :class="{ 'show_sub_menu': hoverStatus }" @mouseenter="mouseenter" @mouseleave="mouseleave">

        <!-- 一级分类 -->
        <div class="sub_menu_0 sub_menu_scroll sub_menu_1">
          <template v-if="hoverStatus">
            <div :class="venueActive == item.id && 'active_1_item'" class="menu_1_item"
              v-for="(item, i) in menuList.filter(item => item.id != -1)" :key="'a' + i" @click="itemClick(item)">
              <Imgt class="icon" :src="item.icon" />
              <span class="name">{{ item.label }}</span>
              <Imgt class="more more1" :src="`/img/menu/menu_more.webp`" />
              <Imgt class="more more2" :src="`/img/menu/menu_more2.webp`" />
            </div>
            <div :class="venueActive == item.id && 'active_1_item'" class="menu_1_item"
              v-for="(item, i) in homeGameData" :key="'b' + i" @click="itemGameClick(item)">
              <Imgt class="icon" :src="`/img/menu/${item.id}.webp`" />
              <span class="name">{{ unserialize(item.name) }}</span>
              <Imgt class="more more1" :src="`/img/menu/menu_more.webp`" />
              <Imgt class="more more2" :src="`/img/menu/menu_more2.webp`" />
            </div>
          </template>
        </div>

        <!-- 游戏平台 -->
        <div class="sub_menu_0 sub_menu_2">
          <template v-if="hoverStatus">
            <!-- 标题 -->
            <div class="sub_menu_2_title">
              <Imgt class="sub_menu_2_icon" :src="`/img/menu/sub_menu_icon.webp`" />
              <span>游戏平台</span>
            </div>
            <!-- 平台 -->
            <div class="sub_menu_scroll sub_menu_2_child">
              <div class="sub_menu_2_item" v-for="i in 32" :key="i">
                <div class="sub_menu_2_box">
                  <Imgt class="sub_menu_2_img" :src="`/img/menu/sub_menu_icon.webp`" />
                </div>
                <div class="sub_menu_2_name">JILI</div>
              </div>
            </div>
          </template>
        </div>

        <!-- 游戏列表 -->
        <div class="sub_menu_0 sub_menu_scroll sub_menu_3">
          <template v-if="hoverStatus">
            <div class="sub_menu_3_item" v-for="index in 10" :key="index">

              <!-- 操作 -->
              <div class="sub_menu_3_title">
                <Imgt class="sub_menu_3_title_icon" :src="`/img/menu/sub_menu_icon.webp`" />
                <div style="flex: 1;"></div>
                <div class="sub_menu_3_btn">更多</div>
                <div class="sub_menu_3_btn" @click="prevPage">&lt;</div>
                <div class="sub_menu_3_btn" @click="nextPage">&gt;</div>
              </div>

              <!-- 游戏 -->
              <div class="sub_menu_3_list">
                <TransitionGroup :name="aniName">
                  <div class="sub_menu_3_it" v-for="i in arr" :key="i">
                    <div class="sub_menu_3_it_img">
                      <Imgt style="width:100%;height:100%" :src="`/img/menu/sub_menu_icon.webp`" />
                    </div>
                    <div class="sub_menu_3_it_name">埃及探秘宝典{{ i }}</div>
                  </div>
                </TransitionGroup>
              </div>
            </div>
          </template>
        </div>
      </div>
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

// 点击菜单
const itemClick = async (item: any) => {
  await Page(pinia).setVenueActive(item.id);
  router.push(`${item.url}`);
  mouseenter()

  clickLoading.value = true
  setTimeout(() => {
    clickLoading.value = false
  }, 200)
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
  }, 200)
};
onMounted(async () => {
  if (Local.get("venueActive")) {
    await Page(pinia).setVenueActive(Local.get("venueActive"));
  }
});


// 展开状态
const hoverStatus = ref(false)
const hovertimeout: any = ref(null)
const clickLoading = ref(false) // 防止点击后被全局loading阻挡鼠标导致关闭
const mouseleave = () => {
  // if (clickLoading.value) return
  hovertimeout.value = setTimeout(() => {
    hoverStatus.value = false
  }, 300)
}
const mouseenter = () => {
  // if (clickLoading.value) return
  if (hovertimeout.value) clearTimeout(hovertimeout.value)
  hoverStatus.value = true
}

// 游戏翻页
const arr = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
const aniName = ref('gamelist')
const nextPage = () => {
  aniName.value = 'aniName'
  const cuts: any = []
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const a: any = arr.value.shift()
      cuts.push(a)
    }, i * 50)

  }
  setTimeout(() => {
    arr.value.push(...cuts)
  }, 500)
}
const prevPage = () => {
  aniName.value = 'aniName2'
  for (let i = 0; i < 5; i++) {
    const a: any = arr.value.pop()
    setTimeout(() => {
      arr.value.unshift(a)
    }, i * 50)
  }
}
</script>

<style lang="less" scoped>
@timestamp: `new Date() .getTime() `;

.gamelist-move,
.gamelist-enter-active,
.gamelist-leave-active {
  transition: all 0.3s ease;
}

.gamelist-enter-from {
  opacity: 0;
  transform: translateX(90px);
}

.gamelist-leave-to {
  opacity: 0;
  transform: translateX(-90px);
}

.gamelist2-move,
.gamelist2-enter-active,
.gamelist2-leave-active {
  transition: all 0.3s ease;
}

.gamelist2-enter-from {
  opacity: 0;
  transform: translateX(-90px);
}

.gamelist2-leave-to {
  opacity: 0;
  transform: translateX(90px);
}


.menu_wrap_box {
  position: relative;
  z-index: 1999;
  user-select: none;

  .menu_wrap_null {
    height: 133px;
  }
}

.menu_wrap {
  width: 100%;
  margin: 0 auto 17px;
  display: flex;
  flex-wrap: wrap;
  align-items: first baseline;
  position: absolute;
  top: 0;
  left: 0;
  height: 133px;
  transition: all ease .3s;
  transition-delay: 0s;
  background: url("/img/menu/menu_bg.webp?t=@{timestamp}") no-repeat;
  background-size: 100% 0;
  background-position-y: 124px;

  .sub_menu {
    width: 100%;
    transition: all ease .3s;
    height: 0;
    opacity: 0;

  }

  .show_sub_menu {
    height: 794px;
    opacity: 1;
    transition: all ease .3s;
  }

  .menu_wrap_list {
    // background: url('/img/menu/ban.webp?t=@{timestamp}') no-repeat;
    // background-size: 100% 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1060px;
    height: 133px;
    padding-right: 48px;

    :first-child {
      margin: 0 14px;
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

    .menu_wrap_item-1 {
      width: 100px;
      margin-right: -4px;

      img {
        width: 100px;
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
      width: 1030px;
      height: 68px;
      border-radius: 16px;
      background: url("/img/menu/ban.webp?t=@{timestamp}") no-repeat;
      background-size: 100% 100%;
      transition: all ease .3s;
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
      margin-left: 20px;
    }
  }
}

.open_menu_wrap {
  height: 927px;
  background: url("/img/menu/menu_bg.webp?t=@{timestamp}") no-repeat;
  background-size: 100% calc(100% - 50px);
  background-position-y: 50px;
  // transition-delay: 50ms;

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
    }

    .sub_menu_scroll {

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
      padding: 0 20px 20px 20px;
      display: flex;
      flex-direction: column;

      .sub_menu_2_title {
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: rgba(255, 255, 255, 0.60);
        font-size: 18px;

        .sub_menu_2_icon {
          width: 22px;
          height: 22px;
          margin-right: 8px;
        }
      }

      .sub_menu_2_child {
        flex: 1;
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        justify-content: space-between;

        .sub_menu_2_item {
          width: 90px;
          cursor: pointer;

          .sub_menu_2_box {
            border-radius: 6px;
            background: rgba(62, 87, 151, 0.21);
            width: 90px;
            height: 90px;
            display: flex;
            align-items: center;
            justify-content: center;

            .sub_menu_2_img {
              width: 70%;
            }
          }

          .sub_menu_2_name {
            font-size: 14px;
            color: #fff;
            text-align: center;
            margin: 13px 0;
          }
        }
      }
    }

    .sub_menu_3 {
      width: 714px;
      padding: 0 20px 20px 20px;
      overflow-x: hidden;

      .sub_menu_3_item {
        .sub_menu_3_title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 30px;
          padding-bottom: 1px;

          .sub_menu_3_title_icon {
            height: 18px;
            width: auto;
          }

          .sub_menu_3_btn {
            margin-left: 6px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            box-shadow: 0.3px 0.3px 0.6px 0px #4B4A6E inset;
            color: #fff;
            font-size: 13px;
            min-width: 24px;
            padding: 0 9px;
            background-color: #282747;
            cursor: pointer;
          }
        }

        .sub_menu_3_list {
          display: flex;
          align-items: stretch;
          justify-content: flex-start;

          .sub_menu_3_it {
            margin-right: 26px;
            cursor: pointer;



            width: 90px;

            .sub_menu_3_it_img {
              width: 90px;
              height: 90px;
              border-radius: 5px;
            }

            .sub_menu_3_it_name {
              color: #fff;
              text-align: center;
              font-size: 15px;
              margin: 13px 0;
            }
          }
        }
      }
    }
  }

  .menu_wrap_list {
    .menu_wrap_list_ban {
      background: none;
    }
  }
}
</style>
