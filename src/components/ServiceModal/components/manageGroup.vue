<template>
  <!-- 管理分组弹窗 -->
  <n-modal
    to="body"
    v-model:show="isShow"
    :mask-closable="false"
    transform-origin="center"
  >
    <div class="main_setting">
      <h4 class="top_title">
        <span>{{ t(stepTitle[step]) }}</span>
        <i>
          <iconpark-icon
            @click="isShow = false"
            icon-id="tanctongyguanb"
            color="#fff"
            size="1.2rem"
          ></iconpark-icon>
        </i>
      </h4>
      <div class="main_body">
        <!-- 分组管理 -->
        <div class="group_main" v-if="step == 1">
          <div class="tips">{{ t("chat_page_change_conversion") }}</div>
          <div class="group_now">
            <div class="title">{{ t("chat_page_group_now") }}</div>
            <div
              class="group_item"
              v-for="item in groupList"
              :key="item.id"
              @click="editGroup(item)"
            >
              <div class="item_left">
                <iconpark-icon icon-id="zuocweidy02" size="1.3rem" />
                <span>{{ item.name }}</span>
              </div>
              <iconpark-icon
                icon-id="lajilou"
                size="1rem"
                @click.stop="delGroup(item)"
                class="pointer"
              />
            </div>
          </div>
          <div class="add_group" @click="addGroup">
            <iconpark-icon icon-id="tianjia" size="1rem" />
            <span>{{ t("chat_page_group_add") }}</span>
          </div>
        </div>
        <!-- 创建分组 -->
        <div class="group_add" v-if="step == 2">
          <div class="title">{{ t("chat_page_group_name") }}</div>
          <div class="add_name">
            <n-input v-model:value="groupName" placeholder="编辑名称" />
            <iconpark-icon icon-id="zuocweidy02" size="1.3rem" />
          </div>
          <div>
            <div class="title">{{ t("chat_page_contain_conversion") }}</div>
            <div class="add_uaer" @click="addUser">
              <iconpark-icon icon-id="tianjia" size="1rem" />
              <span>{{ t("chat_page_add_conversion") }}</span>
            </div>
          </div>
          <div class="user_list">
            <div class="list_item" v-for="item in chatitemIdList" :key="item.id">
              <div class="user_info">
                <div class="avatar">
                  <Imgt
                    :src="`/img/head_icons/${
                      item.THeadPhoto ? item.THeadPhoto : '1002'
                    }.webp`"
                    alt=""
                    class="img1"
                  />
                  <Imgt
                    :src="`/img/serviceModal/vip${item.vip}.webp`"
                    alt=""
                    class="img2"
                    v-if="item.vip"
                  />
                </div>
                <span>{{ item.TUsername }}</span>
                <div
                  class="high_proxy"
                  :style="{
                    background: deepObj[item.deep] ? deepObj[item.deep].color : '',
                  }"
                >
                  {{ (deepObj[item.deep] && deepObj[item.deep].label) || "直属玩家" }}
                </div>
              </div>
              <iconpark-icon
                icon-id="shanchu"
                class="pointer"
                size="0.6rem"
                @click="delItem(item)"
              />
            </div>
          </div>
          <div class="tips">{{ t("chat_page_group_conversion") }}</div>
          <div class="btn_group">
            <div class="btn_close" @click="cancelAddGroup">
              {{ t("home_page_cancel") }}
            </div>
            <div class="btn_save" @click="saveGroup">{{ t("chat_page_save") }}</div>
          </div>
        </div>
        <!-- 添加对话 -->
        <div v-if="step == 3">
          <n-input v-model:value="groupName" placeholder="输入对话名称" />
          <div class="title">{{ t("chat_page_conversion") }}</div>
          <div class="user_list">
            <n-checkbox-group v-model:value="chatitemIdList">
              <n-checkbox
                :value="item"
                v-for="item in itemList.filter((i: any) => i.deep != '0'&&!i.chatgroupid)"
                :key="item.id"
              >
                <div class="list_item">
                  <div class="user_info">
                    <div class="avatar">
                      <Imgt
                        :src="`/img/head_icons/${
                          item.THeadPhoto ? item.THeadPhoto : '1002'
                        }.webp`"
                        alt=""
                        class="img1"
                      />
                      <Imgt
                        :src="`/img/serviceModal/vip${item.vip}.webp`"
                        alt=""
                        class="img2"
                        v-if="item.vip"
                      />
                    </div>
                    <span>{{ item.TUsername }}</span>
                  </div>
                  <div
                    class="high_proxy"
                    :style="{
                      background: deepObj[item.deep || item.agentlevel]
                        ? deepObj[item.deep || item.agentlevel].color
                        : '',
                    }"
                  >
                    {{ t(setLabel(item)) }}
                  </div>
                </div>
              </n-checkbox>
            </n-checkbox-group>
          </div>
          <div class="btn_group">
            <div class="btn_close" @click="closeChatItem">
              {{ t("home_page_cancel") }}
            </div>
            <div class="btn_save" @click="saveChatItem">{{ t("chat_page_save") }}</div>
          </div>
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import usechatHooks from "../useHooks";
import IWebsocket from "../chatWS";
import Imgt from "@/components/Imgt.vue";
import { Message } from "@/utils/discreteApi.ts";
import { useI18n } from "vue-i18n";
// import btn from './btn.vue';
// import Common from '@/utils/common';
// import { Net } from '@/net/Net';
// import { NetPacket } from '@/netBase/NetPacket';
// import { MessageEvent2 } from '@/net/MessageEvent2';
// import { NetMsgType } from '@/netBase/NetMsgType';
// import { Message } from '@/utils/discreteApi';
// import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  stateData: {
    type: Object,
    default: () => ({}),
  },
  itemList: {
    type: Object,
    default: () => [],
  },
  deepObj: {
    type: Object,
    default: () => [],
  },
  agentInfo: {
    type: Object,
    default: () => [],
  },
});
const emit = defineEmits(["update:visible"]);
const step = ref(1);
const groupName = ref("");
const editGroupItem = ref();
const {
  groupList,
  encodeInput,
  encodeParams,
  decodeContent,
  getChatlist,
  groupChatitemList,
  editchat,
}: any = usechatHooks(props.stateData);
const stepTitle: any = {
  1: "chat_page_group_add",
  2: "chat_page_group",
  3: "chat_page_add_conversion",
};

const chatitemIdList: any = ref(groupChatitemList || []);
//创建分组
const addGroup = () => {
  step.value = 2;
  groupName.value = "";
  groupChatitemList.value = [];
};
//编辑分组
const editGroup = (item: any) => {
  step.value = 2;
  groupName.value = item.name;
  editGroupItem.value = item;
  getChatlist(item);
};
//添加对话
const addUser = () => {
  step.value = 3;
  chatitemIdList.value = [];
};
// 取消保存分组
const cancelAddGroup = () => {
  step.value = 1;
};

// 选择对话取消
const closeChatItem = () => {
  step.value = 2;
  chatitemIdList.value = [];
};

const saveChatItem = () => {
  if (chatitemIdList.value.length == 0) {
    Message.error("请选择");
  } else {
    step.value = 2;
  }
};

const setLabel = (val: any) => {
  if (props.agentInfo.user_type == 1) {
    const obj: any = {
      0: "官方玩家",
      5: "官方代理",
    };
    return obj[val.agentlevel] || "代理玩家";
  } else {
    return (props.deepObj[val.deep] && props.deepObj[val.deep].label) || "直属玩家";
  }
};

// 删除选择的对话
const delItem = (item: any) => {
  chatitemIdList.value = chatitemIdList.value.filter((op: any) => op.id != item.id);
  if (
    editGroupItem.value &&
    editGroupItem.value.id &&
    editGroupItem.value.id == item.chatgroupid
  ) {
    editchat(item, { id: -1 });
  }
};

// 保存分组
const saveGroup = () => {
  if (!groupName.value && !groupName.value.trim()) {
    Message.error("请填写分组名称");
    return;
  }
  console.log(4444444);
  if (chatitemIdList.value.length == "0") {
    Message.error("请添加对话");
    return;
  }

  const state = props.stateData;
  state.requestid++;
  const requestid = state.requestid;
  let type = 9; //
  var payload: any = {
    deviceid: state.deviceID,
    sort: 1,
    istop: 2,
    name: groupName.value,
  };
  // 编辑分组
  if (editGroupItem.value && editGroupItem.value.id) {
    payload.id = editGroupItem.value.id;
    type = 10;
  }
  const decodedata = encodeParams(payload, "ChatGroupModifyReq");
  const encodedRequest = encodeInput(type, requestid, decodedata);
  IWebsocket.sendMessageHandler(encodedRequest);
  isShow.value = false;
  // editGroupItem.value = ''
};
// 删除分组
const delGroup = (item: any) => {
  const state = props.stateData;
  const requestid = state.requestid;
  const type = 11; //
  var payload = {
    deviceid: state.deviceID,
    id: item.id,
    sort: 0,
    istop: 0,
    name: "",
  };
  const decodedata = encodeParams(payload, "ChatGroupModifyReq");
  const encodedRequest = encodeInput(type, requestid, decodedata);
  IWebsocket.sendMessageHandler(encodedRequest);
};

//分组列表保存回执处理
const getChatMsg9 = (decodeobj1: any) => {
  const decodeobj00 = decodeContent(decodeobj1.data, "ChatGroupModifyRsp");
  const GroupItem =
    editGroupItem.value && editGroupItem.value.id ? editGroupItem.value : decodeobj00;
  if (chatitemIdList.value.length) {
    chatitemIdList.value.forEach((item: any) => {
      editchat(item, GroupItem);
    });
  }
};

defineExpose({
  getChatMsg9,
});

const isShow = computed({
  get: function () {
    return props.visible;
  },
  set: function (value) {
    step.value = 1;
    emit("update:visible", value);
  },
});
</script>
<style lang="less" scoped>
@timestamp: `new Date() .getTime() `;

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
  background-color: #14173a;

  > i {
    position: absolute;
    top: 5px;
    right: 15px;
    cursor: pointer;
  }
}

.main_body {
  width: 494px;
  height: 500px;
  padding: 40px 50px;
  background-color: #14173a;
  box-sizing: border-box;
}

.title {
  margin-top: 20px;
  color: #ffffff;
  font-size: 14px;
}

.group_main {
  .tips {
    color: #8d84c5;
    font-size: 14px;
  }

  .group_now {
    height: 350px;
  }

  .group_item {
    margin-top: 12px;
    display: flex;
    cursor: pointer;
    padding: 2px 4px;
    justify-content: space-between;

    &:hover {
      background-color: #422299;
      border-radius: 3px;
    }

    .item_left {
      display: flex;
      gap: 5px;
      align-items: center;

      span {
        width: 100%;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }

    .del_icon {
      height: 24px;
      width: 24px;
    }
  }

  .add_group {
    display: flex;
    gap: 8px;
    color: #8e82c2;
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
    color: #8e82c2;
    cursor: pointer;
    margin-top: 5px;
  }

  .tips {
    color: #8d84c5;
    margin-top: 6px;
  }
}

.btn_group {
  margin-top: 30px;
  display: flex;
  align-items: center;
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
    background-color: #212443;
    height: 40px;
  }

  .btn_save {
    width: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border-radius: 8px;
    background: linear-gradient(180deg, #5a6cff 0%, #7e1cff 100%);

    margin-top: -5px;
    line-height: 40px;
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
      color: #ffffff;
    }
  }

  &:deep(.n-checkbox-group) {
    width: 100%;

    .n-checkbox {
      width: 100%;
      display: flex;
      align-items: center;

      .n-checkbox__label {
        display: inline-block;
        width: 100%;
      }

      .n-checkbox-box {
        border-radius: 50%;
      }
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
  background-image: radial-gradient(circle at 50% 0%, #489dc3, #3685a9 49%, #489dc3 65%),
    linear-gradient(to bottom, #fff, #928776);
}

.pointer {
  cursor: pointer;
}

.avatar {
  display: flex;
  flex-direction: column;
  position: relative;

  .img1 {
    height: 50px;
    width: 50px;
    margin-right: 10px;
  }

  .img2 {
    height: 21px;
    position: absolute;
    bottom: -6px;
    // margin-top: -15px;
  }
}
</style>
