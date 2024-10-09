<template>
  <div class="club_content">
    <n-flex class="top_bg">
      <n-flex justify="center" class="item_list_l">
        <Imgt :src="`/img/club/new/image.webp`" />
      </n-flex>
      <n-flex class="item_list_r">
        <n-flex class="item_top">
          {{ t('BY88俱乐部-驻马尼拉分部') }}
          <n-flex align="center" justify="center" class="button button_color">
            管理
          </n-flex>
        </n-flex>
        <div class="txt_dec">
          <div>俱乐部简介:</div>
          <div class="txt_con">
            俱乐部简介内容俱乐部简介内容俱乐部简介内容俱乐部简介内容俱乐部简介内容乐部简介内容简介内容简介内容简介内容简介内容
          </div>
        </div>
        <n-flex align="center" class="item_bottom">
          <span class="icon"></span>
          <span>12434</span>
        </n-flex>
      </n-flex>
    </n-flex>
    <div class="top_banner">
      <Imgt :src="`/img/club/new/banner1.webp`" />
    </div>
    <n-flex class="club_list_tab" align="center">
      <div :class="`btn_type ${curGmaeType === item.key ? 'active' : ''}`" v-for="(item, index) in curGmaeArr"
        :key="index" @click="clickTabGame(item.key)">
        <Imgt :src="`/img/club/new/game${index + 1}.webp`" />
        <div>
          {{ item.title }}
        </div>
      </div>
    </n-flex>

    <n-flex class="top_box">
      <n-flex class="item_list item_list_next button" v-for="(item, index) in listData"
        :style="{ 'background-image': `url(/img/club/new/bgn${index + 1}.webp)` }" :key="index" @click="goToPage(item)">
        <n-flex align="flex-end" justify="center" class="item_list_l">
          <Imgt :src="`/img/club/new/${item.icon}.webp`" />
        </n-flex>
        <n-flex justify="center" class="item_list_l">
          {{ t(item.label) }}
        </n-flex>
      </n-flex>
    </n-flex>

    <div class="bottom_box">
      <n-flex align="center" justify="space-between">
        <n-flex class="tab_list">
          <n-flex align="center" :class="`item_list button ${curTab === item.value && 'active'}`"
            v-for="(item, index) in tabData" :key="index" @click="clickTab(item.value)">
            <span class="txt"> {{ t(item.label) }} </span>
          </n-flex>
        </n-flex>
        <n-flex justify="center" align="center" class="tab_right button button_color">
          <span class="icon"> </span>
          <span>筛选 </span>
        </n-flex>
      </n-flex>

      <!-- 经典 -->
      <n-flex v-show="curTab === 'joinClub'" class="join_club_box">
        <n-flex align="center" class="item_list" v-for="(item, index) in gameListData" :key="index">
          <div class="bg_txt">
            <div>JOINED</div>
            <div>GAME</div>
          </div>
          <n-flex justify="center" class="item_list_l">
            <Imgt :src="`/img/club/new/image.webp`" />
          </n-flex>
          <n-flex class="item_list_r">
            <div>{{ t(item.name) }}</div>
            <n-flex class="txt_dec">
              <n-flex class="item_bb">
                <span class="icon">
                  <Imgt :src="`/img/club/new/renIcon.webp`" />
                </span>
                <span>{{ item.count }}</span>
              </n-flex>
              <n-flex class="item_bb">
                <span class="icon">
                  <Imgt :src="`/img/club/new/bankIcon.webp`" />
                </span>
                <span>{{ item.minBet }}</span>
              </n-flex>
              <n-flex class="item_bb">
                <span class="icon">
                  <Imgt :src="`/img/club/new/monIcon.webp`" />
                </span>
                <span>{{ item.rate }}</span>
              </n-flex>
            </n-flex>
          </n-flex>
        </n-flex>
      </n-flex>
      <!-- 6+ -->
      <n-flex v-show="curTab === 'joinPlay'" class="join_club_box">
        <n-flex align="center" class="item_list" v-for="(item, index) in gameListData" :key="index">
          <div class="bg_txt">
            <div>JOINED</div>
            <div>GAME</div>
          </div>
          <n-flex justify="center" class="item_list_l">
            <Imgt :src="`/img/club/new/image.webp`" />
          </n-flex>
          <n-flex class="item_list_r">
            <div>{{ t(item.name) }}</div>
            <n-flex class="txt_dec">
              <n-flex class="item_bb">
                <span class="icon">
                  <Imgt :src="`/img/club/new/renIcon.webp`" />
                </span>
                <span>{{ item.count }}</span>
              </n-flex>
              <n-flex class="item_bb">
                <span class="icon">
                  <Imgt :src="`/img/club/new/bankIcon.webp`" />
                </span>
                <span>{{ item.minBet }}</span>
              </n-flex>
              <n-flex class="item_bb">
                <span class="icon">
                  <Imgt :src="`/img/club/new/monIcon.webp`" />
                </span>
                <span>{{ item.rate }}</span>
              </n-flex>
            </n-flex>
          </n-flex>
        </n-flex>
      </n-flex>

      <!-- 赛事+ -->
      <n-flex v-show="curTab === 'event'" class="join_club_box">
        <n-flex align="center" class="item_list" v-for="(item, index) in eventListData" :key="index">
          <div class="bg_txt">
            <div>JOINED</div>
            <div>GAME</div>
          </div>
          <n-flex justify="center" class="item_list_l">
            <Imgt :src="`/img/club/new/image.webp`" />
          </n-flex>
          <n-flex class="item_list_r">
            <div>{{ t(item.name) }}</div>
            <div class="txt_dec">
              <n-flex class="item_bb">
                <span class="icon">
                  <Imgt :src="`/img/club/new/renIcon.webp`" />
                </span>
                <span>{{ t('报名人数') }}: {{ item.num }}</span>
              </n-flex>
              <n-flex class="time_box">
                <div class="it_left">
                  <n-flex class="item_bb size_12">
                    <span class="icon">
                      <Imgt :src="`/img/club/new/bankIcon.webp`" />
                    </span>
                    <span>{{ t('开始时间') }}: {{ item.startTime }}</span>
                  </n-flex>
                  <n-flex class="item_bb size_12">
                    <span class="icon">
                      <Imgt :src="`/img/club/new/monIcon.webp`" />
                    </span>
                    <span>{{ t('结束时间') }}: {{ item.endTime }}</span>
                  </n-flex>
                </div>
                <n-flex align="center" justify="center" class="it_right button button_color">
                  报名
                </n-flex>
              </n-flex>

            </div>
          </n-flex>
        </n-flex>
      </n-flex>

    </div>
  </div>

  <!-- 加入俱乐部弹窗 -->
  <n-modal :show="showJoinModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container">
        <div class="header">
          <span class="title">{{ t('club_page_jrjlb') }}</span>
          <span class="close pointer">
            <iconpark-icon @click="onClose" icon-id="tanctongyguanb" color="#fff" size="1rem"></iconpark-icon>
          </span>
        </div>
        <div class="form_body">
          <n-form>
            <n-form-item :label="t('club_page_id')">
              <n-input v-model:value="joinParams.id" :placeholder="t('club_page_qsr')" clearable />
            </n-form-item>
          </n-form>

          <n-flex class="form_footer" justify="space-between">
            <button class="c_join_btn button_color" :disabled="(!canJoin || !joinParams.id)" @click="onSubmit"
              style="width: 100%"> {{ t('搜素') }} </button>
          </n-flex>
        </div>
      </div>
    </n-card>
  </n-modal>


</template>

<script setup lang='ts' name="clubInfo">
import { onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Imgt from '@/components/Imgt.vue';
// import { NetPacket } from '@/netBase/NetPacket';
// import { Net } from '@/net/Net';
// import { MessageEvent2 } from '@/net/MessageEvent2.ts';
// import { NetMsgType } from '@/netBase/NetMsgType.ts';
// import { Message } from '@/utils/discreteApi.ts';
// import { User } from '@/store/user.ts';
// import pinia from '@/store';
// import { storeToRefs } from 'pinia';
// import { useRoute } from 'vue-router';

// const UserStore = User(pinia);
// const { roleInfo } = storeToRefs(UserStore);
const { t } = useI18n();
// const route = useRoute();
const showModal = ref(false);
const showJoinModal = ref(false);
const showCreateModal = ref(false);
const canJoin = ref(true); // 是否可以加入俱乐部
const curTitle = ref('俱乐部');
const curTab = ref('joinClub'); // joinClub, joinPlay

const tabData = ref([
  { label: '经典', value: 'joinClub', icon: 'icon_club' },
  { label: '6+', value: 'joinPlay', icon: 'icon_game' },
  { label: '赛事', value: 'event', icon: 'icon_game' },
]);
const listData = ref([
  { label: '新建牌局', value: 'joinPlay', icon: 'icon1' },
  { label: '快速开始', value: 'start', icon: 'icon4' },
]);
const curGmaeType = ref('dz');
const curGmaeArr = [
  { title: '德州PK', key: 'dz' },
  { title: '跑得快', key: 'pdk' },
  { title: '21点', key: '21' },
  { title: '骰子', key: 'tz' },
  { title: '黑杰克', key: 'jack' },
  { title: '百人游戏', key: 'bai' },
];
// 我加入的牌局
const gameListData = ref(
  [
    {
      name: '经典德州-1860',
      type: '【美元桌】',
      minBet: 25,
      icon: 'avatar',
      rate: '0.25/0.50',
      count: '3/8',
    },
    {
      name: '经典德州-1860',
      type: '【美元桌】',
      minBet: 25,
      icon: 'avatar',
      rate: '0.25/0.50',
      count: '3/8',
    },
    {
      name: '经典德州-1860',
      type: '【美元桌】',
      minBet: 25,
      icon: 'avatar',
      rate: '0.25/0.50',
      count: '3/8',
    },
    {
      name: '经典德州-1860',
      type: '【美元桌】',
      minBet: 25,
      icon: 'avatar',
      rate: '0.25/0.50',
      count: '3/8',
    },
    {
      name: '经典德州-1860',
      type: '【美元桌】',
      minBet: 25,
      icon: 'avatar',
      rate: '0.25/0.50',
      count: '3/8',
    },
  ],
);
// 赛事列表
const eventListData = ref(
  [
    {
      name: '德州比赛-多人奖金赛',
      num: 25,
      startTime: '2024-07-01 12:30:00',
      endTime: '2024-09-01 12:30:00',
    },
    {
      name: '德州比赛-多人奖金赛',
      num: 25,
      startTime: '2024-07-01 12:30:00',
      endTime: '2024-09-01 12:30:00',
    },
    {
      name: '德州比赛-多人奖金赛',
      num: 25,
      startTime: '2024-07-01 12:30:00',
      endTime: '2024-09-01 12:30:00',
    },
    {
      name: '德州比赛-多人奖金赛',
      num: 25,
      startTime: '2024-07-01 12:30:00',
      endTime: '2024-09-01 12:30:00',
    },
  ],
);
// 加入俱乐部表单提交
const joinParams = ref({
  id: '',
});
// 创建俱乐部表单提交
const createParams = ref({
  name: '',
  rate: '',
  dec: '',
});

const clickTabGame = (e: any) => {
  curGmaeType.value = e;
};

const goToPage = (item: any) => {
  if (item.value === 'create') {
    showCreateAc();
  } else if (['join', 'joinPlay'].includes(item.value)) {
    showJoinAc();
  }
}
const showJoinAc = () => {
  joinParams.value = { id: '' }
  showJoinModal.value = true
}
const showCreateAc = () => {
  createParams.value = {
    name: '',
    rate: '',
    dec: '',
  }
  showCreateModal.value = true
}

const openModal = () => {
  showModal.value = !showModal.value;
};

const clickTab = (e: any) => {
  curTab.value = e;
  curTitle.value = e === 'joinClub' ? t('club_page_club') : t('club_page_ycj');
};

// 关闭加入俱乐部弹窗
const onClose = () => {
  showJoinModal.value = false;
};
// 加入俱乐部提交
const onSubmit = () => {
  console.log('----------', joinParams);
  // const id = joinParams.value.id.trim()
  // const req = NetPacket.req_join_club();
  // req.club_id = id
  // Net.instance.sendRequest(req);
};
// 监听加入俱乐部
// const joinClubHandle = (res: any) => {
//   const tipStr: any = {
//     0: '成功加入申请',
//     1: '俱乐部不存在',
//     2: '你已经申请加入，待审批',
//     3: '不能重复加入',
//   }
//   showJoinModal.value = false;
//   if (res.result === 0) {
//     Message.success(t(tipStr[res.result]));
//   } else {
//     Message.error(t(tipStr[res.result]));
//   }
// };

// 搜索俱乐部, 获取俱乐部信息，加入俱乐部前需要查询是否存在
// const searchClub = () => {
//   console.log('搜索---');
//   const id = joinParams.value.id.trim()
//   if (!id) {
//     return Message.error(t('请输入俱乐部ID'));
//   }
// const req = NetPacket.req_get_club_info();
// req.club_id = id
// Net.instance.sendRequest(req);
// };
// 监听创建俱乐部信息
// const getClubInfoHandle = (res: any) => {
//   if (res.club_id) {
//     canJoin.value = true
//   } else {
//     Message.error(t('俱乐部不存在'));
//   }
// };

// 监听创建俱乐部返回
// const createClubHandle = (res: any) => {
//   const tipStr: any = {
//     0: '创建成功',
//     1: '抽水比例配置不对',
//     2: '俱乐部名称已经存在',
//     3: '代理等级不正确',
//     4: '俱乐部数量达到上限',
//     5: '名称或简介长度不符合要求',
//   }
//   console.log('创建俱乐部==', res);
//   if (res.result === 0) {
//     Message.success(t(tipStr[res.result]));
//     showCreateModal.value = false;
//     getClubList();
//   } else {
//     Message.error(t(tipStr[res.result]));
//   }
// };
// 获取俱乐部列表
// const getClubList = () => {
//   const req = NetPacket.req_get_club_list();
//   Net.instance.sendRequest(req);
// }
// 监听俱乐部列表返回, res.created_club_list 创建的俱乐部列表， res.joined_club_list 加入的俱乐部列表
// const getClubListHandle = (res: any) => {
//   console.log('俱乐部列表==', res);
// };

// watch(
//   () => route.params.openType,
//   (n) => {
//     // getClubList();
//     curTab.value = n;
//     curTitle.value = n === 'club' ? t('club_page_club') : t('club_page_ycj');
//   },
//   {
//     deep: true,
//   },
// );

onUnmounted(() => {
  // 取消监听
  // MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_create_club, null);
  // MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_club_list, null);
  // MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_club_info, null);
  // MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_join_club, null);
});
onMounted(() => {
  // getClubList();
  // MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_create_club, createClubHandle);
  // MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_get_club_list, getClubListHandle);
  // MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_get_club_info, getClubInfoHandle);
  // MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_join_club, joinClubHandle);
})

defineExpose({
  openModal,
});

</script>

<style lang='less' scoped>
@timestamp: `new Date().getTime()`;
@import '@/assets/club.less';

.top_bg {
  margin: 16px 0;
  padding: 35px 32px;
  width: 1400px;
  height: 218px;
  background: url('/img/club/new/topBg.webp?t=@{timestamp}') center no-repeat;
  background-size: 100%;
  gap: 17px !important;

  .item_list_l {
    img {
      width: 148px;
      height: 148px;
    }
  }

  .item_list_r {
    flex: 1;

    >div {
      width: 100%;
      font-size: 20px;
      font-weight: 600;
    }

    .item_top {
      .button {
        width: 96px;
        height: 36px;
        border-radius: 8px;
        font-size: 16px;
      }
    }

    .txt_dec {
      width: 656px;
      font-size: 14px;
      color: rgba(175, 182, 189, 1);

      .txt_con {
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }

    .item_bottom {
      gap: 2px !important;
      font-size: 14px;
      color: rgba(181, 164, 255, 1);

      .icon {
        width: 16px;
        height: 16px;
        background: url('/img/club/new/ren_t.webp?t=@{timestamp}') center no-repeat;
        background-size: 100%;
      }
    }
  }
}

.top_banner {
  margin-bottom: 20px;

  img {
    width: 100%;
  }
}

.club_list_tab {
  background: linear-gradient(180deg, #0A0B22 0%, #000000 100%);
  border: 1px solid #000;
  border-radius: 16px;
  padding: 24px 48px;
  gap: 40px !important;
  margin-bottom: 20px;

  .btn_type {
    font-size: 16px;
    text-align: center;

    img {
      width: 128px;
    }
  }
}

.top_box {
  gap: 24px !important;
}
</style>
