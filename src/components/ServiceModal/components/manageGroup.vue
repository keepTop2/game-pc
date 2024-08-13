<template>
  <!-- 管理分组弹窗 -->
  <n-modal to="body" v-model:show="isShow" :mask-closable="false" transform-origin="center">
    <div class="main_setting">
      <h4 class="top_title">
        <span>{{ stepTitle[step] }}</span>
        <i>
          <iconpark-icon @click="isShow = false" icon-id="Group39368" color="#fff" size="1.2rem"></iconpark-icon>
        </i>
      </h4>
      <div class="main_body">
        <!-- 分组管理 -->
        <div class="group_main" v-if="step == 1">
          <div class="tips">将不同对话归纳分类，并在它们之间快速切换。</div>
          <div class="group_now">
            <div class="title">当前分组</div>
            <div class="group_item" v-for="item in groupList" :key="item.id">
              <div class="item_left">
                <iconpark-icon icon-id="zuocweidy02" size="1.3rem" />
                <span>{{ item.name }}</span>
              </div>
              <iconpark-icon icon-id="lajilou" size="1rem" @click="delGroup(item)" class="pointer" />
            </div>
          </div>
          <div class="add_group" @click="addGroup">
            <iconpark-icon icon-id="tianjia" size="1rem" />
            <span>创建分组</span>
          </div>
        </div>
        <!-- 创建分组 -->
        <div class="group_add" v-if="step == 2">
          <div class="title">分组名称</div>
          <div class="add_name">
            <n-input v-model:value="groupName" placeholder="编辑名称" />
            <iconpark-icon icon-id="zuocweidy02" size="1.3rem" />
          </div>
          <div>
            <div class="title">包括的对话</div>
            <div class="add_uaer" @click="addUser">
              <iconpark-icon icon-id="tianjia" size="1rem" />
              <span>添加对话</span>
            </div>
          </div>
          <div class="user_list">
            <div class="list_item">
              <div class="user_info">
                <img :src="`/img/serviceModal/avatar1.webp`" alt="">
                <span>abc***fds</span>
                <div class="high_proxy">上级代理</div>
              </div>
              <iconpark-icon icon-id="shanchu" size="0.6rem" />
            </div>
          </div>
          <div class="tips">选择会出现在此分组中的对话语分类。</div>
          <div class="btn_group">
            <div class="btn_close" @click="cancelAddGroup">取消</div>
            <div class="btn_save" @click="saveGroup">保存</div>
          </div>
        </div>
        <!-- 添加对话 -->
        <div v-if="step == 3">
          <n-input v-model:value="groupName" placeholder="输入对话名称" />
          <div class="title">对话</div>
          <div class="user_list">
            <div class="list_item" v-for="index in 10" :key="index">
              <div class="user_info">
                <img :src="`/img/serviceModal/avatar1.webp`" alt="">
                <span>abc***fds</span>
              </div>
              <div class="high_proxy">上级代理</div>
            </div>
          </div>
          <div class="btn_group">
            <div class="btn_close">取消</div>
            <div class="btn_save">保存</div>
          </div>
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import usechatHooks from '../useHooks';
import IWebsocket from '../chatWS'
// import btn from './btn.vue';
// import Common from '@/utils/common';
// import { Net } from '@/net/Net';
// import { NetPacket } from '@/netBase/NetPacket';
// import { MessageEvent2 } from '@/net/MessageEvent2';
// import { NetMsgType } from '@/netBase/NetMsgType';
// import { Message } from '@/utils/discreteApi';
// import { useI18n } from 'vue-i18n';

// const { t } = useI18n();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  stateData: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['update:visible']);
const step = ref(1)
const groupName = ref('')
const { groupList, encodeInput, encodeParams }: any = usechatHooks(props.stateData)
const stepTitle: any = {
  1: '创建分组',
  2: '分组管理',
  3: '添加对话',
}
//创建分组
const addGroup = () => {
  step.value = 2
  groupName.value = ''

}
//添加对话
const addUser = () => {
  step.value = 3

}
// 取消保存分组
const cancelAddGroup = ()=>{
  step.value = 1
}

// 保存分组
const saveGroup = () => {
  const state = props.stateData
  state.requestid++;
  const requestid = state.requestid;
  const type = 9; //
  var payload = {
    deviceid: state.deviceID,
    sort: 1,
    istop: 2,
    name:groupName.value
  }
  const decodedata = encodeParams(payload, 'ChatGroupModifyReq')
  const encodedRequest = encodeInput(type, requestid, decodedata);
  IWebsocket.sendMessageHandler(encodedRequest)
}
// 删除分组
const delGroup = (item: any) => {
  const state = props.stateData
  const requestid = state.requestid;
  const type = 11; //
  var payload = {
    deviceid: state.deviceID,
    id: item.id,
    sort: 0,
    istop: 0,
    name: "",
  }
  const decodedata = encodeParams(payload, 'ChatGroupModifyReq')
  const encodedRequest = encodeInput(type, requestid, decodedata);
  IWebsocket.sendMessageHandler(encodedRequest);
}


const isShow = computed({
  get: function () {
    return props.visible;
  },
  set: function (value) {
    step.value = 1;
    emit('update:visible', value);
  },
});

</script>
<style lang="less" scoped>
.top_title {
  margin: 0;
  width: 100%;
  position: relative;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #fff;
  // border-radius: 14px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  text-align: center;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-image: linear-gradient(to bottom,
      #4c36b3 100%,
      #3a2786 28%,
      #3c279a 0%);

  >i {
    position: absolute;
    top: 5px;
    right: 15px;
    cursor: pointer;
  }
}

.main_body {
  width: 494px;
  height: 480px;
  padding: 40px 60px;
  background-color: #231353;
  box-sizing: border-box;
}

.title {
  margin-top: 20px;
  color: #ffffff;
  font-size: 14px;
}

.group_main {
  .tips {
    color: #8D84C5;
    font-size: 14px;
  }

  .group_now {
    height: 350px
  }

  .group_item {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;

    .item_left {
      display: flex;
      gap: 5px;
      align-items: center;
    }

    .del_icon {
      height: 24px;
      width: 24px;
    }
  }

  .add_group {
    display: flex;
    gap: 8px;
    color: #8E82C2;
    cursor: pointer;
  }
}

.group_add {
  .user_list {
    height: 150px;
  }

  .add_name {
    margin-top: 10px;
    gap: 12px;
    display: flex;
  }

  .add_uaer {
    display: flex;
    align-items: center;
    font-size: 16px;
    gap: 6px;
    color: #8E82C2;
    cursor: pointer;
    margin-top: 5px;
  }

  .tips {
    color: #8D84C5;
    margin-top: 6px;
  }
}

.btn_group {
  margin-top: 30px;
  display: flex;
  gap: 34px;

  div {
    width: 170px;
    height: 45px;
    cursor: pointer;

  }

  .btn_close {
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: radial-gradient(circle at 50% 14%, #4c36b3 0%, #3a2786 33%, #3c279a 44%), linear-gradient(to bottom, #fff, #af9eff);
  }

  .btn_save {
    width: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    background: url(/img/serviceModal/tab_btn.webp) no-repeat;
    background-size: 100% 100%;
    margin-top: -5px;
    line-height: 40px
  }
}

.user_list {
  height: 270px;
  overflow-y: auto;

  .list_item {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;

    .user_info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}

.high_proxy {
  width: 60px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  // padding: 6px 8px;
  border-radius: 6px;
  background-image: radial-gradient(circle at 50% 0%, #489dc3, #3685a9 49%, #489dc3 65%), linear-gradient(to bottom, #fff, #928776);
}

.pointer {
  cursor: pointer;
}
</style>
