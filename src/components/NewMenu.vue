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
          <span>{{ item.name[langObj[lang]] }}</span>
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
              <span class="name">{{ unserialize(item.name, false) }}</span>
              <Imgt class="more more1" :src="`/img/menu/menu_more.webp`" />
              <Imgt class="more more2" :src="`/img/menu/menu_more2.webp`" />
            </div>
          </template>
        </div>

        <!-- -------------- 二级 --------------- -->

        <!-- 俱乐部 -->
        <div class="sub_menu_0 sub_menu_2" v-if="currType.id == 99">
          <template v-if="hoverStatus">
            <!-- 标题 -->
            <div class="sub_menu_2_title">
              <Imgt class="sub_menu_2_icon" :src="`/img/menu/menu_hot.webp`" />
              <span>热门俱乐部</span>
              <div style="flex: 1;"></div>
              <div class="sub_menu_2_btn">更多</div>
              <div class="sub_menu_2_btn" @click="prevScroll(scrollJL2)">&lt;</div>
              <div class="sub_menu_2_btn" @click="nextScroll(scrollJL2)">&gt;</div>
            </div>
            <!-- 俱乐部列表 -->
            <div class="sub_menu_scroll sub_menu_2_child" ref="scrollJL2">
              <div class="sub_menu_2_ss" :class="{ 'sub_menu_2_ssed': i == 2 }" v-for="i in 10" :key="i">
                <div class="sub_menu_2_ss_icon">
                  <Imgt style="width: 100%;height: 100%;" :src="`/img/menu/ss.webp`" />
                  <!-- 创建者 -->
                  <div class="sub_menu_2_ss_creater">创建者</div>
                </div>
                <div class="sub_menu_2_ss_content">
                  <div class="sub_menu_2_ss_title">俱乐部名称</div>
                  <div class="sub_menu_2_ss_info">
                    <div>俱乐部简介俱乐部简介俱乐部简介俱乐部简介俱乐部简介俱乐部简介</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- 赛程 -->
        <div class="sub_menu_0 sub_menu_2" v-if="currType.id == 100">
          <template v-if="hoverStatus">
            <!-- 标题 -->
            <div class="sub_menu_2_title">
              <Imgt class="sub_menu_2_icon" :src="`/img/menu/menu_hot.webp`" />
              <span>热门赛事</span>
              <div style="flex: 1;"></div>
              <div class="sub_menu_2_btn">更多</div>
              <div class="sub_menu_2_btn" @click="prevScroll(scrollSS2)">&lt;</div>
              <div class="sub_menu_2_btn" @click="nextScroll(scrollSS2)">&gt;</div>
            </div>
            <!-- 赛事列表 -->
            <div class="sub_menu_scroll sub_menu_2_child" ref="scrollSS2">
              <div class="sub_menu_2_ss" :class="{ 'sub_menu_2_ssed': i == 2 }" v-for="i in 10" :key="i">
                <div class="sub_menu_2_ss_icon">
                  <Imgt style="width: 100%;height: 100%;" :src="`/img/menu/ss.webp`" />
                </div>
                <div class="sub_menu_2_ss_content">
                  <div class="sub_menu_2_ss_title">德州比赛-多人奖金赛</div>
                  <div class="sub_menu_2_ss_info">
                    <iconpark-icon name="paihiconss01"></iconpark-icon>
                    <div class="sub_menu_2_ss_text">报名人数：62</div>
                  </div>
                  <div class="sub_menu_2_ss_info">
                    <iconpark-icon name="zuijin"></iconpark-icon>
                    <div class="sub_menu_2_ss_text">开始时间：2024-07-01 12:30:00</div>
                  </div>
                  <div class="sub_menu_2_ss_info">
                    <iconpark-icon name="zuijin"></iconpark-icon>
                    <div class="sub_menu_2_ss_text">结束时间：2024-07-01 12:30:00</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- 游戏平台 -->
        <div class="sub_menu_0 sub_menu_2" v-if="currType.id != 100 && currType.id != 99">
          <template v-if="hoverStatus">
            <!-- 标题 -->
            <div class="sub_menu_2_title">
              <Imgt class="sub_menu_2_icon" :src="`/img/menu/sub_menu_icon.webp`" />
              <span>游戏平台</span>
            </div>
            <!-- 平台 -->
            <div class="sub_menu_scroll sub_menu_2_child">
              <div class="sub_menu_2_item" v-for="(v, i) in platformData" :key="i" @click="clickPlat(v)">
                <div class="sub_menu_2_box">
                  <img class="sub_menu_2_img" :src="getImg(v.picture_pc)" alt="img">
                </div>
                <div class="sub_menu_2_name">{{ unserialize(v.name, false) }}</div>
              </div>
              <div class="sub_menu_2_item"></div>
            </div>
          </template>
        </div>





        <!-- ------------- 三级 ---------------- -->

        <!-- 俱乐部列表 -->
        <div class="sub_menu_0 sub_menu_3" v-if="currType.id == 99">
          <!-- 所有游戏 -->
          <template v-if="hoverStatus">
            <div class="sub_menu_3_item" style="display: flex;flex-direction: column;height: 100%;">
              <!-- 操作 -->
              <div class="sub_menu_3_title">
                <Imgt class="sub_menu_3_title_icon" :src="`/img/menu/game_icon.webp`" />
                <div class="sub_menu_3_subtitle">俱乐部游戏</div>
                <div style="flex: 1;"></div>
                <div class="sub_menu_3_btn">更多</div>
                <div class="sub_menu_3_btn" @click="prevScroll(scrollJL3)">&lt;</div>
                <div class="sub_menu_3_btn" @click="nextScroll(scrollJL3)">&gt;</div>
              </div>

              <!-- 列表 -->
              <div class="sub_menu_scroll sub_menu_3_list sub_menu_3_list2" ref="scrollJL3">
                <div class="sub_menu_3_jl" v-for="i in 20" :key="i">
                  <div class="sub_menu_3_jl_icon">
                    <Imgt style="width: 100%;height: 100%;" :src="`/img/menu/ss.webp`" />
                  </div>
                  <div class="sub_menu_3_jl_content">
                    <div class="sub_menu_3_jl_title">经典德州扑克-1860</div>
                    <div class="sub_menu_3_jl_infos">
                      <div class="sub_menu_3_jl_info">
                        <iconpark-icon name="paihiconss01" class="sub_menu_3_jl_ticon"></iconpark-icon>
                        <div class="sub_menu_3_jl_text">3/8</div>
                      </div>
                      <div class="sub_menu_3_jl_info">
                        <iconpark-icon name="txxlicon10" class="sub_menu_3_jl_ticon"></iconpark-icon>
                        <div class="sub_menu_3_jl_text">25$</div>
                      </div>
                      <div class="sub_menu_3_jl_info">
                        <iconpark-icon name="txxlicon02" class="sub_menu_3_jl_ticon"></iconpark-icon>
                        <div class="sub_menu_3_jl_text">0.25/0.6</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- 赛事简介 -->
        <div class="sub_menu_0 sub_menu_3" v-if="currType.id == 100">
          <!-- 所有游戏 -->
          <template v-if="hoverStatus">
            <div class="sub_menu_3_ss">
              <div class="sub_menu_3_ss_title">
                <Imgt class="sub_menu_3_title_icon" :src="`/img/menu/ss_icon_1.webp`" />
                <div>赛事简介</div>
              </div>
              <div class="sub_menu_3_ss_block">欢迎参加本年度最激动人心的德州扑克锦标赛！无论您是经验丰富的扑克高手，还是刚刚入门的新手，这场比赛都将为您提供一个展示技巧和策略的绝佳平台。
              </div>
              <div class="sub_menu_3_ss_title">
                <Imgt class="sub_menu_3_title_icon" :src="`/img/menu/ss_icon_2.webp`" />
                <div>比赛详情</div>
              </div>
              <div class="sub_menu_3_ss_block">
                •  日期：2024年7月20日 <br />
                •  时间：下午2:00开始 <br />
                •  比赛人数：9-2000人 <br />
                •  起始筹码：₱5,000
              </div>
              <div class="sub_menu_3_ss_title">
                <Imgt class="sub_menu_3_title_icon" :src="`/img/menu/ss_icon_3.webp`" />
                <div>比赛规则</div>
              </div>
              <div class="sub_menu_3_ss_block">
                •  比赛采用德州扑克无限注规则。 <br />
                •  每位参赛者将获得相同数量的筹码。 <br />
                •  比赛将持续到最后一名选手被淘汰，冠军将获得丰厚奖金和奖杯。
              </div>
              <div class="sub_menu_3_ss_title">
                <Imgt class="sub_menu_3_title_icon" :src="`/img/menu/ss_icon_4.webp`" />
                <div>报名方式</div>
              </div>
              <div class="sub_menu_3_ss_block">请访问我们的网站或亲临俱乐部前台报名。名额有限，先到先得！ 准备好迎接挑战了吗？快来展示您的扑克技巧，赢取丰厚奖品吧！</div>

              <div class="sub_menu_3_ss_btn">查看详情</div>
            </div>
          </template>
        </div>


        <!-- 体育和真人的入口 -->
        <div v-if="isPlatIn(currType) && currType.id != 100 && currType.id != 99" class="sub_menu_0 sub_menu_3"
          style="padding:0">
          <template v-if="hoverStatus">
            <div class="sub_menu_3_in">
              <Imgt style="width: 100%;height: 100%;object-fit: cover;" src="/img/menu/pi_bg.webp" />
              <div class="sub_menu_3_inbtn">开始游戏</div>
            </div>
          </template>
        </div>

        <!-- 所有游戏列表 -->
        <div class="sub_menu_0 sub_menu_3"
          v-if="!isPlatIn(currType) && currType.id != 100 && currType.id != 99 && currPlat.id">
          <!-- 所有游戏 -->
          <template v-if="hoverStatus">
            <div class="sub_menu_3_item" style="display: flex;flex-direction: column;height: 100%;">
              <!-- 操作 -->
              <div class="sub_menu_3_title">
                <img class="sub_menu_3_title_icon" :src="getImg(currPlat.picture_pc)" alt="img">
                <div style="flex: 1;"></div>
                <div class="sub_menu_3_btn">更多</div>
                <div class="sub_menu_3_btn" @click="prevScroll(scrollAll3)">&lt;</div>
                <div class="sub_menu_3_btn" @click="nextScroll(scrollAll3)">&gt;</div>
              </div>

              <!-- 列表 -->
              <div class="sub_menu_scroll sub_menu_3_list sub_menu_3_list2" ref="scrollAll3">
                <div class="sub_menu_3_it" v-for="(item, i) in games" :key="i">
                  <div class="sub_menu_3_it_img">
                    <img style="width:100%;height:100%" :src="getImg(item.gamePicturePC)" alt="img">
                  </div>
                  <div class="sub_menu_3_it_name">{{ unserialize(item.name, true) }}</div>
                </div>
              </div>
            </div>
          </template>
        </div>


        <!-- 一排一组游戏列表 -->
        <div class="sub_menu_0 sub_menu_scroll sub_menu_3"
          v-if="!isPlatIn(currType) && currType.id != 100 && currType.id != 99 && !currPlat.id">

          <!-- 一排一组 -->
          <template v-if="hoverStatus">
            <div class="sub_menu_3_item" v-for="index in 10" :key="index">

              <!-- 操作 -->
              <div class="sub_menu_3_title">
                <img class="sub_menu_3_title_icon" :src="`/img/menu/sub_menu_icon.webp`" alt="img">
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
                      <img style="width:100%;height:100%" :src="`/img/menu/sub_menu_icon.webp`" alt="img">
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
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetPacket } from '@/netBase/NetPacket';
import { NetMsgType } from '@/netBase/NetMsgType';
import pinia from "@/store/index";
import { Page } from "@/store/page";
import { Local } from "@/utils/storage";
import { Net } from '@/net/Net';

const { homeGameData } = storeToRefs(Page(pinia));

const router = useRouter();
const { venueActive, lang, settings } = storeToRefs(Page(pinia));

// 解析图片地址
const getImg = (name: any) => {
  if (!name) return ''
  return settings.value.backend_upload + name
}
// 解析游戏名和平台名
const langObj: any = {
  en: 'en-US',
  zh: 'zh-CN',
  vn: 'vi-VN'
}
const unserialize = (v: any, isPlatform: boolean) => {
  if (!v) return ''
  let obj: any = {
    en: 'en-US',
    zh: 'zh-CN',
    vn: 'vi-VN'
  }
  if (isPlatform) {
    v = JSON.parse(v)
  }
  return v[obj[lang.value]]
}
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
const currType: any = ref({})
const itemClick = async (item: any) => {
  currType.value = item
  currPlat.value = {}
  await Page(pinia).setVenueActive(item.id);
  router.push(`${item.url}`);

  clickLoading.value = true
  if (venueActive.value == -1) { // 点击主页关闭下拉
    hoverStatus.value = false
  }
  setTimeout(() => {
    clickLoading.value = false
  }, 200)
};
const platformData = ref()
const itemGameClick = async (item: any) => {
  currType.value = item
  currPlat.value = {}
  platformData.value = (homeGameData.value.find((e: any) => (e.id == Number(item.id)))).three_platform

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
    // clickPlat(platformData.value[0])
  }, 200)
};


// 判断分类是否是体育和真人(没有游戏列表，直接展示平台入口)
const isPlatIn = (types: any) => {
  return [4].includes(types.id)
}

// 点击平台
const currPlat: any = ref({})
const clickPlat = (item: any) => {
  currPlat.value = item

  // 体育和真人展示入口 
  if (isPlatIn(currType.value)) {
    return
  }

  // 点击的时候才监听
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_get_games_in_platform, handleGames);

  setTimeout(() => {

    games.value = []
    const query = NetPacket.req_get_games_in_platform()
    query.agentId = item.id
    query.is_lable = 0
    query.kindId = 1
    query.page = 1
    query.pageSize = 9999
    Net.instance.sendRequest(query);
  }, 100)
}
// 游戏列表
const games: any = ref([])
const handleGames = (res: any) => {
  games.value = res.info || []

  setTimeout(() => {
    //  收到后就移除监听
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_games_in_platform, null);
  }, 200)
}

// 主动触发分类选择
const handleClick = (id: any) => {
  const t: any = [...menuList, ...homeGameData.value].find((e: any) => (e.id == id))
  if (t) {
    platformData.value = t.three_platform
    if ([-1, 99, 100].includes(t.id)) {
      itemClick(t)
    } else {
      itemGameClick(t)
    }
  }
}

onMounted(async () => {
  if (Local.get("venueActive")) {
    await Page(pinia).setVenueActive(Local.get("venueActive"));
    handleClick(Number(Local.get("venueActive")))
  }
});
onUnmounted(() => {
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_games_in_platform, null);
})


// 展开状态
const hoverStatus = ref(true)
const hovertimeout: any = ref(null)
const clickLoading = ref(false) // 防止点击后被全局loading阻挡鼠标导致关闭
const mouseleave = () => {
  // if (clickLoading.value) return
  hovertimeout.value = setTimeout(() => {
    // hoverStatus.value = false
  }, 300)
}
const mouseenter = () => {
  // if (clickLoading.value) return
  if (venueActive.value == -1) return // 悬停主页不下拉
  if (hovertimeout.value) clearTimeout(hovertimeout.value)
  hoverStatus.value = true

  // 如果没有激活二级分类就触发下点击事件
  // if (!currPlat.value.id) {
  //   handleClick(venueActive.value)
  // }
}


// 滚动
const scrollSS2 = ref() // 二级-赛事列表
const scrollJL2 = ref() // 二级-俱乐部分类列表
const scrollAll3 = ref() // 三级-所有游戏列表
const scrollJL3 = ref() // 三级-俱乐部列表
const prevScroll = (dom: any) => {
  dom.scrollTo({
    top: dom.scrollTop - dom.clientHeight,
    behavior: 'smooth'
  });
}
const nextScroll = (dom: any) => {
  dom.scrollTo({
    top: dom.scrollTop + dom.clientHeight,
    behavior: 'smooth'
  });
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
    height: calc(100% - 133px); // 794px
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
  // height: 927px;
  height: 75vh;
  min-height: 500px;
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

        .sub_menu_2_btn {
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
        align-content: flex-start;

        .sub_menu_2_ss {
          cursor: pointer;
          height: 110px;
          width: 100%;
          margin-bottom: 12px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          background: linear-gradient(269deg, rgba(162, 86, 238, 0.52) 1.3%, #1B1C2A 77.11%);

          &:nth-child(2n) {
            background: linear-gradient(269deg, rgba(86, 151, 238, 0.52) 1.3%, #1B1C2A 77.11%);
          }

          &:nth-child(3n) {
            background: linear-gradient(269deg, rgba(238, 122, 86, 0.52) 1.3%, #1B1C2A 77.11%);
          }

          &:nth-child(4n) {
            background: linear-gradient(269deg, rgba(238, 168, 86, 0.52) 1.3%, #1B1C2A 77.11%);
          }

          .sub_menu_2_ss_icon {
            width: 88px;
            height: 88px;
            flex-shrink: 0;
            margin-right: 10px;
            border-radius: 50%;
            position: relative;
            overflow: hidden;

            .sub_menu_2_ss_creater {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 33px;
              background: rgba(0, 0, 0, 0.72);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              color: #fff;
            }
          }

          .sub_menu_2_ss_content {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            color: #AFB6BD;
            font-size: 12px;

            .sub_menu_2_ss_title {
              color: #FFF;
              font-size: 20px;
            }

            .sub_menu_2_ss_info {
              display: flex;
              align-items: center;

              .sub_menu_2_ss_text {
                margin-left: 8px;
              }
            }
          }
        }

        .sub_menu_2_ssed {
          background: linear-gradient(270deg, #1C99FF 0%, #9C1FFF 100%), linear-gradient(269deg, rgba(162, 86, 238, 0.52) 1.3%, rgba(0, 2, 35, 0.00) 77.11%) !important;

          .sub_menu_2_ss_content {
            color: #fff;
          }
        }

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
      width: 720px;
      padding: 0 20px 20px 20px;
      overflow-x: hidden;

      .sub_menu_3_ss {
        padding: 40px 0;

        .sub_menu_3_ss_title {
          color: rgba(255, 255, 255, 0.60);
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 16px;

          .sub_menu_3_title_icon {
            width: 22px;
            height: 22px;
            margin-right: 8px;
          }
        }

        .sub_menu_3_ss_block {
          margin-bottom: 24px;
          background-color: #060716;
          border-radius: 12px;
          padding: 16px;
          color: #A1A2B6;
          font-size: 16px;
          font-weight: 400;
        }

        .sub_menu_3_ss_btn {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%);
          box-shadow: 0.5px 0.5px 1px 0px #9B9EFF inset;
          color: #FFF;
          text-align: center;
          font-size: 16px;
          width: 372px;
          height: 46px;
          margin: 20px auto 0 auto;
        }
      }

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

          .sub_menu_3_subtitle {
            color: rgba(255, 255, 255, 0.60);
            margin-left: 8px;
            font-size: 18px;
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

        .sub_menu_3_list2 {
          flex-wrap: wrap;
          flex: 1;
          overflow-y: auto;

          .sub_menu_3_it {
            &:nth-child(6n) {
              margin-right: 0;
            }
          }

          .sub_menu_3_jl {
            width: 326px;
            height: 110px;
            border-radius: 16px;
            background: linear-gradient(269deg, rgba(162, 86, 238, 0.52) 1.3%, #1B1C2A 77.11%);
            margin-bottom: 8px;
            margin-right: 12px;
            overflow: hidden;
            padding: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &:nth-child(2n) {
              margin-right: 0;
              background: linear-gradient(269deg, rgba(86, 151, 238, 0.52) 1.3%, #1B1C2A 77.11%);
            }

            &:nth-child(3n) {
              background: linear-gradient(269deg, rgba(238, 122, 86, 0.52) 1.3%, #1B1C2A 77.11%);
            }

            &:nth-child(4n) {
              background: linear-gradient(269deg, rgba(238, 168, 86, 0.52) 1.3%, #1B1C2A 77.11%);
            }


            .sub_menu_3_jl_icon {
              width: 80px;
              height: 80px;
              margin-right: 12px;
            }

            .sub_menu_3_jl_content {
              display: flex;
              flex: 1;
              flex-direction: column;
              align-items: flex-start;
              justify-content: center;

              .sub_menu_3_jl_title {
                font-size: 20px;
                color: #FFF;
                margin-bottom: 12px;
              }

              .sub_menu_3_jl_infos {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #AFB6BD;
                font-size: 14px;

                .sub_menu_3_jl_info {
                  display: flex;
                  align-items: center;

                  .sub_menu_3_jl_text {
                    margin-left: 4px;
                  }

                  .sub_menu_3_jl_ticon {
                    font-size: 20px;
                  }
                }
              }
            }
          }
        }
      }

      .sub_menu_3_in {
        width: 714px;
        height: 100%;
        position: relative;

        .sub_menu_3_inbtn {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 40px;
          width: 372px;
          height: 46px;
          border-radius: 12px;
          background: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%);
          box-shadow: 0.5px 0.5px 1px 0px #9B9EFF inset;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFF;
          font-size: 16px;
          cursor: pointer;
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
