<template>
  <div class="club_content">
    <div class="top_title">{{ t('club_page_club') }}</div>
    <n-flex class="top_box">
      <n-flex class="item_list button" v-for="(item, index) in listData"
        :style="{ 'background-image': `url(/img/club/new/bg${index + 1}.webp)` }" :key="index" @click="goToPage(item)">
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
        <n-flex align="center" :class="`item_list button ${curTab === item.value && 'active'}`"
          v-for="(item, index) in tabData" :key="index" @click="clickTab(item.value)">
          <span :class="`icon ${item.icon}`"></span>
          <span class="txt"> {{ t(item.label) }} </span>
        </n-flex>
      </n-flex>
      <!-- 我加入的俱乐部 -->
      <n-flex v-show="curTab === 'joinClub'" class="join_club_box">
        <n-flex align="center" class="item_list" v-for="(item, index) in clubListData" @click="goToPage(item)"
          :key="index">
          <div class="bg_txt">
            <div>JOIN THE</div>
            <div>CLUB</div>
          </div>
          <n-flex justify="center" class="item_list_l">
            <Imgt :src="`/img/club/new/image.webp`" />
            <span class="c_box">{{ t('创建者') }}</span>
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
            <span class="c_box">{{ t('创建者') }}</span>
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

  <!-- 创建俱乐部弹窗 -->
  <n-modal :show="showCreateModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container">
        <div class="header">
          <span class="title">{{ t('club_page_cjjlb') }}</span>
          <span class="close pointer">
            <iconpark-icon @click="onCloseCreate" icon-id="tanctongyguanb" color="#fff" size="1rem"></iconpark-icon>
          </span>
        </div>
        <div class="form_body">
          <n-form>
            <n-flex align="center" class="upload_img">
              <span>{{ t('上传图片') }}:</span>
              <n-upload :max="1" @before-upload="beforeUpload" accept=".jpg,.jpeg,.png,.gif,.webp">
                <n-button>上传</n-button>
              </n-upload>
            </n-flex>
            <n-form-item :label="`${t('club_page_jlbmc')}:`">
              <n-input type="textarea" :rows="2" v-model:value="createParams.name" :placeholder="t('club_page_qsr')"
                clearable />
            </n-form-item>
            <n-form-item :label="`${t('club_page_jlbjj')}:`">
              <n-input type="textarea" :rows="2" v-model:value="createParams.dec" :placeholder="t('club_page_qsr')" />
            </n-form-item>
          </n-form>

          <n-flex class="form_footer" justify="space-between">
            <a @click="onCloseCreate"> {{ t('club_page_gb') }} </a>
            <a class="c_join_btn button_color" @click="onSubmitCreate"> {{ t('club_page_ljcj') }} </a>
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
import { useRouter } from 'vue-router';
// import { useRoute } from 'vue-router';

const UserStore = User(pinia);
const { roleInfo } = storeToRefs(UserStore);
const { t } = useI18n();
// const route = useRoute();
const router = useRouter();
const showModal = ref(false);
const showJoinModal = ref(false);
const showCreateModal = ref(false);
const canJoin = ref(true); // 是否可以加入俱乐部
const curTitle = ref('俱乐部');
const curTab = ref('joinClub'); // joinClub, joinPlay

const tabData = ref([
  { label: '我加入的俱乐部', value: 'joinClub', icon: 'icon_club' },
  { label: '我加入的牌局', value: 'joinPlay', icon: 'icon_game' },
]);
const listData = ref([
  { label: 'club_page_cjjlb', value: 'create', icon: 'icon1' },
  { label: 'club_page_jrjlb', value: 'join', icon: 'icon2' },
  { label: 'club_page_jrpj', value: 'joinPlay', icon: 'icon3' },
  { label: '快速开始', value: 'start', icon: 'icon4' },
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
  } else {
    router.push(`/clubNext`)
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
@import '@/assets/club.less';

.top_box {
  gap: 40px !important;
}
</style>
