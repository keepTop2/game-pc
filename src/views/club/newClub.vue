<template>
    <div class="club_content">
      <div class="top_title">{{t('club_page_club')}}</div>
      <n-flex class="top_box">
        <n-flex class="item_list button" v-for="(item, index) in listData"
             :style="{ 'background-image': `url(/img/club/new/bg${index + 1}.webp)` }"
             :key="index" @click="goToPage(item)">
          <n-flex align="flex-end" justify="center" class="item_list_l">
            <Imgt :src="`/img/club/new/${item.icon}.webp`" />
          </n-flex>
          <n-flex justify="center" class="item_list_l">
            {{ t(item.label) }}
          </n-flex>
        </n-flex>
      </n-flex>

      <div class="bottom_box">
        <n-flex class="tab_list">
          <n-flex align="center" :class="`item_list button ${curTab === item.value && 'active'}`" v-for="(item, index) in tabData"
                  :key="index" @click="clickTab(item.value)">
            <span :class="`icon ${item.icon}`"></span>
            <span class="txt"> {{t(item.label)}} </span>
          </n-flex>
        </n-flex>
        <!-- 我加入的俱乐部 -->
        <n-flex v-show="curTab === 'joinClub'" class="join_club_box">
          <n-flex align="center" class="item_list" v-for="(item, index) in clubListData" :key="index">
            <div class="bg_txt">
              <div>JOIN THE</div>
              <div>CLUB</div>
            </div>
            <n-flex justify="center" class="item_list_l">
              <Imgt :src="`/img/club/new/image.webp`" />
              <span class="c_box">{{t('创建者')}}</span>
            </n-flex>
            <n-flex class="item_list_r">
              <div>{{ t(item.name) }}</div>
              <div class="txt_dec">{{ item.dec }}</div>
            </n-flex>
          </n-flex>

        </n-flex>
        <!-- 我加入的牌局 -->
        <n-flex v-show="curTab === 'joinPlay'" class="join_club_box">
          <n-flex align="center" class="item_list" v-for="(item, index) in gameListData" :key="index">
            <div class="bg_txt">
              <div>JOINED</div>
              <div>GAME</div>
            </div>
            <n-flex justify="center" class="item_list_l">
              <Imgt :src="`/img/club/new/image.webp`" />
              <span class="c_box">{{t('创建者')}}</span>
            </n-flex>
            <n-flex class="item_list_r">
              <div>{{ t(item.name) }}</div>
              <n-flex class="txt_dec">
                <n-flex class="item_bb">
                  <span class="icon"> <Imgt :src="`/img/club/new/renIcon.webp`" /> </span>
                  <span>{{item.count}}</span>
                </n-flex>
                <n-flex class="item_bb">
                  <span class="icon"> <Imgt :src="`/img/club/new/bankIcon.webp`" /> </span>
                  <span>{{item.minBet}}</span>
                </n-flex>
                <n-flex class="item_bb">
                  <span class="icon"> <Imgt :src="`/img/club/new/monIcon.webp`" /> </span>
                  <span>{{item.rate}}</span>
                </n-flex>
              </n-flex>
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
            <iconpark-icon @click="onClose" icon-id="Group39368" color="#fff" size="1rem"></iconpark-icon>
          </span>
        </div>
        <div class="form_body">
          <n-form>
            <n-form-item :label="t('club_page_id')">
              <n-input v-model:value="joinParams.id" :placeholder="t('club_page_qsr')" clearable />
            </n-form-item>
          </n-form>

          <n-flex class="form_footer" justify="space-between">
            <button class="c_join_btn" :disabled="(!canJoin || !joinParams.id)" @click="onSubmit" style="width: 100%"> {{ t('搜素') }} </button>
          </n-flex>
        </div>
      </div>
    </n-card>
  </n-modal>

  <!-- 创建俱乐部弹窗 -->
  <n-modal :show="showCreateModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container">
        <div class="header">
          <span class="title">{{ t('club_page_cjjlb') }}</span>
          <span class="close pointer">
            <iconpark-icon @click="onCloseCreate" icon-id="Group39368" color="#fff" size="1rem"></iconpark-icon>
          </span>
        </div>
        <div class="form_body">
          <n-form>
            <n-flex align="center" class="upload_img">
              <span>{{t('上传图片')}}:</span>
              <n-upload
                :max="1"
                @before-upload="beforeUpload"
                accept=".jpg,.jpeg,.png,.gif,.webp">
                <n-button>上传</n-button>
              </n-upload>
            </n-flex>
            <n-form-item :label="`${t('club_page_jlbmc')}:`">
              <n-input type="textarea" :rows="2" v-model:value="createParams.name" :placeholder="t('club_page_qsr')" clearable/>
            </n-form-item>
            <n-form-item :label="`${t('club_page_jlbjj')}:`">
              <n-input type="textarea" :rows="2" v-model:value="createParams.dec" :placeholder="t('club_page_qsr')" />
            </n-form-item>
          </n-form>

          <n-flex class="form_footer" justify="space-between">
            <a @click="onCloseCreate"> {{ t('club_page_gb') }} </a>
            <a class="c_join_btn" @click="onSubmitCreate"> {{ t('club_page_ljcj') }} </a>
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
import { Message } from '@/utils/discreteApi.ts';
import { User } from '@/store/user.ts';
import pinia from '@/store';
import { storeToRefs } from 'pinia';
// import { useRoute } from 'vue-router';

const UserStore = User(pinia);
const { roleInfo } = storeToRefs(UserStore);
const { t } = useI18n();
// const route = useRoute();
const showModal = ref(false);
const showJoinModal = ref(false);
const showCreateModal = ref(false);
const canJoin = ref(true); // 是否可以加入俱乐部
const curTitle = ref('俱乐部');
const curTab = ref('joinClub'); // joinClub, joinPlay

const tabData = ref([
  { label: '我加入的俱乐部', value: 'joinClub', icon: 'icon_club'},
  { label: '我加入的牌局', value: 'joinPlay', icon: 'icon_game'},
]);
const listData = ref([
  { label: 'club_page_cjjlb', value: 'create', icon: 'icon1'},
  { label: 'club_page_jrjlb', value: 'join', icon: 'icon2'},
  { label: 'club_page_jrpj', value: 'joinPlay', icon: 'icon3'},
  { label: '快速开始', value: 'start', icon: 'icon4'},
]);
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
// 我加入的俱乐部
const clubListData = ref(
  [
    {
      create: 'fsf898',
      name: '俱乐部-分部名称',
      id: 23233,
      dec: '俱乐部简介俱乐',
    },
    {
      create: 'fsf898',
      name: '俱乐部-分部名称',
      id: 23233,
      dec: '俱乐部简介俱乐部简介俱乐部简介俱乐部简介简俱乐部简介俱乐部简介俱乐部简',
    },
    {
      create: 'fsf898',
      name: '俱乐部-分部名称',
      id: 23233,
      dec: '俱乐部简介俱乐部简介俱乐部简介俱乐部简介简俱乐部简介俱乐部简介俱乐部简',
    },
    {
      create: 'fsf898',
      name: '俱乐部-分部名称',
      id: 23233,
      dec: '俱乐部简介俱乐部简介俱乐部简介俱乐部简介简俱乐部简介俱乐部简介俱乐部简',
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

// 上传图片
const beforeUpload = (data: any) => {
  const file = data.file.file
  if (file && file.size > 1024 * 1024 * 2) { // 2MB限制
    Message.error('文件大小不能超过2MB！')
    return;
  }
  const formData = new FormData();
  formData.append('avatar', file);
  formData.append('role_id', `${roleInfo.value.id}`);
  fetch(`http://18.162.112.52:8031/api/upload/avatar`, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json()).then(response => {
    if (response.status == 200 || response.status == 'success') {
      const urlImg = response.data.path
      Message.success(response.message)
      console.log('&&&&&', urlImg)
    } else {
      Message.error(response.message)
    }
  })
}

const goToPage = (item: any) => {
  if (item.value === 'create') {
    showCreateAc();
  } else if (['join', 'joinPlay'].includes(item.value)) {
    showJoinAc();
  }
}
const showJoinAc = () => {
  joinParams.value = {id: ''}
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
// 关闭创建俱乐部弹窗
const onCloseCreate = () => {
  showCreateModal.value = false;
};
// 创建俱乐部提交
const onSubmitCreate = () => {
  console.log('----------', createParams);
  if (!createParams.value.name) {
    return Message.error(t('俱乐部名称不能为空'));
  }
  if (!createParams.value.dec) {
    return Message.error(t('俱乐部简介不能为空'));
  }
  // const req = NetPacket.req_create_club();
  // req.club_name = createParams.value.name;
  // req.club_introduction = createParams.value.dec;
  // req.club_logo = 0; // logo
  // Net.instance.sendRequest(req);
};
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

//.level_modal {
//  .level_title {
//    background-image: url('/img/club/club_title_bg1.webp?t=@{timestamp}');
//
//    &.level_title_join {
//      background-image: url('/img/club/club_title_bg2.webp?t=@{timestamp}');
//    }
//  }
//}

// 加入俱乐部弹窗
.form_card {
  width: 494px !important;

  :deep(.n-card__content) {
    padding: 0;

    .n-form-item {
      .n-form-item-label {
        color: #fff;
      }
    }
  }

  .form_container {
    display: flex;
    flex-direction: column;

    .header {
      height: 50px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 16px 16px 0 0;
      color: #fff;

      .title {
        font-size: 16px;
        font-weight: 500;
      }

      .close {
        position: absolute;
        top: 16px;
        right: 25px;
        display: flex;
        font-size: 12px;
        justify-content: center;
        align-items: center;
        flex-grow: 0;
      }
    }

    .form_body {
      gap: 20px;
      padding: 28px 32px;

      .upload_img {
        font-size: 16px;
        margin-bottom: 16px;
        .n-upload {
          display: flex;
          align-items: center;
          flex: 1;
          :deep(.n-upload-file-list) {
            width: 100%;
            margin-top: 0;
            .n-upload-file-info__name {
              color: #ddd;
              font-size: 16px;
            }
            .n-upload-file:hover {
              background-color: rgba(0, 0, 0 , .2);
            }
          }
          .n-button {
            margin-right: 5px;
            width: 76px;
            height: 36px;
            font-size: 16px;
            color: #fff;
            background: linear-gradient(180deg, #5A6CFF 0%, #7E1CFF 100%);
            :deep(.n-button__border) {
              border: 0;
            }
          }
        }
      }

    }

    .form_footer {
      padding: 4px 25px;

      a, button {
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        border: 0;
        color: #fff;
        width: 170px;
        height: 52px;
        background: rgba(33, 36, 67, 1);

        &[disabled] {
          opacity: .5;
          cursor: not-allowed;
        }

        &.c_join_btn {
          background: linear-gradient(180deg, #5A6CFF 0%, #7E1CFF 100%);
        }
      }
    }

  }
}

.club_content {
  color: #fff;
  .top_title {
    font-weight: 700;
    font-size: 30px;
    margin: 24px 0;
  }
  .top_box {
    gap: 36px !important;
    .item_list {
      cursor: pointer;
      width: 320px;
      height: 144px;
      background-size: 100%;
      .item_list_l {
        width: 180px;
        img {
          width: 48px;
          height: 48px;
        }
      }
    }
  }
  .bottom_box {

    .tab_list {
      margin: 44px 0 20px;
      gap: 30px !important;
      .item_list {
        position: relative;
        gap: 5px !important;
        .icon {
          width: 27px;
          height: 23px;
          background: url('/img/club/new/icon_club.webp?t=@{timestamp}') center no-repeat;
          background-size: 100%;
          &.icon_game {
            background-image: url('/img/club/new/icon_game.webp?t=@{timestamp}');
          }
        }
        &.active {
          color: rgba(181, 164, 255, 1);
          &::after {
            content: '';
            position: absolute;
            border-radius: 100px;
            width: 100%;
            height: 7px;
            background: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%);
            bottom: -10px;
          }

          .icon {
            background-image: url('/img/club/new/icon_club_a.webp?t=@{timestamp}');
            &.icon_game {
              background-image: url('/img/club/new/icon_game_a.webp?t=@{timestamp}');
            }
          }
        }

      }
    }

    .join_club_box {
      margin: 20px 0 0;
      gap: 15px !important;

      .item_list {
        position: relative;
        flex-wrap: nowrap;
        width: 453px;
        height: 140px;
        padding: 14px;
        font-size: 14px;
        color: rgba(175, 182, 189, 1);
        background: url('/img/club/new/listBg1.webp?t=@{timestamp}') center no-repeat;
        background-size: 100%;
        &:nth-child(3n+2) {
          background-image: url('/img/club/new/listBg2.webp?t=@{timestamp}');
        }
        &:nth-child(3n+3) {
          background-image: url('/img/club/new/listBg3.webp?t=@{timestamp}');
        }
        .bg_txt {
          position: absolute;
          right: 0;
          font-weight: 700;
          font-size: 61.5px;
          color: rgba(255, 255, 255, 0.3);
          opacity: 0.08;
          text-align: right;
          line-height: 75px;
          padding-right: 3px;
        }
        img {
          width: 111px;
          border-radius: 50%;
        }
        .item_list_l {
          position: relative;
          .c_box {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            bottom: 0;
            background: rgba(0, 0, 0, 0.72);
            //background: url('/img/club/new/smallBg.webp?t=@{timestamp}') center no-repeat;
            background-size: 100%;
            color: rgba(255, 255, 255, 1);
            width: 106px;
            height: 31px;
            border-radius: 0 0 50% 50%;
          ;
          }
        }
        .item_list_r {
          flex: 1;
          div:first-child {
            color: #fff;
            font-size: 20px;
            font-weight: 600;
          }
          .txt_dec {
            width: 100%;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; /* 这里是超出几行省略 */
            overflow: hidden;

            .item_bb {
              font-size: 14px;
              color: rgba(175, 182, 189, 1);
              gap: 3px !important;

              .icon {
                img {
                  width: 20px;
                  height: 20px;
                }
              }
            }
          }
        }
      }
    }
  }

}
</style>
