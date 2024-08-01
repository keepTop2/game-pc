<template>
  <!-- 客服聊天弹窗 -->
  <n-modal to="body" v-model:show="isShow" :mask-closable="false" transform-origin="center">
    <div class="main">
      <!-- 快捷语设置 -->
      <shortcutSettings v-model:visible="visibleSetting" />
      <h4 class="top_title">
        <span @click="showSetting">与阿铁的聊天 (官方客服)</span>
        <i>
          <iconpark-icon @click="isShow = false" icon-id="Group39368" color="#fff" size="1.2rem"></iconpark-icon>
        </i>
      </h4>
      <div class="main_body">
        <!-- 左侧设置 -->
        <div class="left_setting">
          <div class="set_item" v-for="item in settingList" :key="item.id">
            <iconpark-icon  :icon-id="item.img" color="#fff" size="1.8rem"></iconpark-icon>
            <img :src="`/img/serviceModal/${item.img}`" alt="">
            <span>{{ item.name }}</span>
          </div>
        </div>
        <!-- 左侧菜单 -->
        <div class="left_menu">
          <n-flex class="tabs">
            <div :class="['tab', { active_tab: tab.id == active_id }]" v-for="tab in tab_list" :key="tab.id"
              @click="tabClick(tab)">
              {{ t(tab.label) }}
            </div>
          </n-flex>
          <n-input v-model:value="search" placeholder="查找聊天列表" />
          <div class="manage_group" @click="manageClick">管理分组</div>
          <div class="user_list">
            <div class="list_item" v-for="item in userList" :key="item.id">
              <div class="item_left">
                <img :src="`/img/serviceModal/avatar1.webp`" alt="">
                <span>{{ item.name }}</span>
              </div>
              <div class="high_proxy">{{ item.role == 'proxy' ? '上级代理' : '官方客服' }}</div>
            </div>
          </div>
        </div>
        <!-- 右侧聊天区域 -->
        <div class="right_content">
          <chatArea></chatArea>
          <div class="send_message">
            <!-- <picker set="emojione" /> -->
            <n-input v-model:value="value">
              <template #suffix>
                <div class="send_icon">
                  <iconpark-icon icon-id="ftsx04" size="1.2rem" class="pointer" @click="sendMoney" />
                  <iconpark-icon icon-id="ftsx01" size="1.2rem" class="pointer" />
                  <iconpark-icon icon-id="ftsx03" size="1.2rem" class="pointer" />
                  <n-popover trigger="hover" :show-arrow="false" placement="top-end">
                    <template #trigger>
                      <iconpark-icon icon-id="ftsx02" size="1.2rem" class="pointer" />
                    </template>
                    <div class="emoji">
                      <EmojiPicker :native="true" @select="onSelectEmoji" />
                    </div>
                  </n-popover>
                </div>
              </template>
            </n-input>
            <div class="send_btn">发送</div>
          </div>
        </div>
      </div>
      <!-- 快捷语设置 -->
      <shortcutSettings v-model:visible="visibleSetting" />

      <manageGroup  v-model:visible="visibleGroup" />

      <sendMoneyModal  v-model:visible="visibleTransfor" />
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import EmojiPicker from 'vue3-emoji-picker'

import 'vue3-emoji-picker/css'
// import btn from './btn.vue';
// import Common from '@/utils/common';
// import { Net } from '@/net/Net';
// import { NetPacket } from '@/netBase/NetPacket';
import chatArea from './chatArea.vue';
import shortcutSettings from './shortcutSettings.vue';
import manageGroup from './manageGroup.vue'
import sendMoneyModal from './sendMoneyModal.vue'
// import { MessageEvent2 } from '@/net/MessageEvent2';
// import { NetMsgType } from '@/netBase/NetMsgType';
// import { Message } from '@/utils/discreteApi';
interface tabType {
  label: string;
  id: number;
}
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible']);
const active_id = ref(1);
const search = ref('')
const value = ref('')

const tab_list = [
  { label: '聊天列表', id: 1 },
  { label: '用户列表', id: 2 },
];

// tab 标签点击
const tabClick = (tab: tabType) => {
  console.log(tab);
  active_id.value = tab.id;
};

const userList = [
  { name: '小美', role: 'proxy', id: 1 },
  { name: '啊铁', role: 'user', id: 2 },
  { name: '客服', role: 'user', id: 3 },
  { name: 'davie', role: 'user', id: 4 },
  { name: 'chu', role: 'proxy', id: 5 },
]

const settingList = [
  { name: '全部对话', img: 'zuocweidy01', id: 1 },
  { name: '工作', img: 'zuocweidy02', id: 2 },
  { name: '编辑', img: 'zuocweidy03', id: 3 },
]

function onSelectEmoji(emoji: any) {
  console.log(emoji)
  /*
    // result
    { 
        i: "😚", 
        n: ["kissing face"], 
        r: "1f61a", // with skin tone
        t: "neutral", // skin tone
        u: "1f61a" // without tone
    }
    */
}

const visibleTransfor = ref(false)
const visibleSetting = ref(false) // 快捷语设置
const visibleGroup = ref(false) // 管理分组弹窗

// 转账
const sendMoney = ()=>{
  visibleTransfor.value =  true
}


const isShow = computed({
  get: function () {
    return props.visible;
  },
  set: function (value) {
    emit('update:visible', value);
  },
});

const manageClick = ()=>{
  visibleGroup.value = true
}

// 打开快捷语设置
const showSetting = () => {
  visibleSetting.value = true
}
</script>
<style lang="less" scoped>
.main {
  // width: 100%;
  border-radius: 14px;
  border: solid 1.4px #322c59;
  overflow: hidden;
  // background-color: #231353;

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
    height: 686px;
    display: flex;

    .left_menu {
      padding: 16px 10px;
      height: 100%;
      width: 280px;
      background-color: #2D1769;
      box-sizing: border-box;

      &:deep(.n-input__placeholder) {

        text-align: center;

      }
    }

    .left_setting {
      width: 72px;
      background-color: #2D1769;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;

      .set_item {
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        img{
          width: 32px;
        }

      }
    }

    .right_content {
      position: relative;
      padding: 0 30px;
      height: 100%;
      width: 920px;
      background-color: #231353;
    }
  }
}

.tabs {
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 2px;
  border-radius: 14px;
  background: linear-gradient(0deg, #1d0e4a, #1d0e4a),
    radial-gradient(50% 50% at 50% 50%,
      rgba(126, 126, 126, 0.1) 0%,
      rgba(21, 21, 21, 0.1) 100%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.1) 100%);

  .tab {
    flex: 1;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #8d84c5;
    cursor: pointer;
  }

  .active_tab {
    background: url(/img/serviceModal/tab_btn.webp) no-repeat;
    background-size: 100% 112%;
    color: #fff;
  }
}

.user_list {
  .list_item {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .item_left {
      display: flex;
      align-items: center;

      img {
        height: 50px;
        width: 50px;
        margin-right: 10px;
      }
    }

    .high_proxy {
      font-size: 12px;
      color: #fff;
      padding: 6px 8px;
      border-radius: 6px;
      background-image: radial-gradient(circle at 50% 0%, #489dc3, #3685a9 49%, #489dc3 65%), linear-gradient(to bottom, #fff, #928776);
    }
  }

}

.send_message {
  height: 52px;
  display: flex;
  align-items: center;

  &:deep(.n-input) {

    height: 52px;

    .n-input__input-el {
      height: 52px;
    }
  }

  .send_btn {
    cursor: pointer;
    height: 52px;
    width: 130px;
    margin-left: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(/img/serviceModal/send_btn.webp) no-repeat;
    background-size: 100% 100%;
    color: #fff;
  }

  .send_icon {
    display: flex;
    gap: 12px;

    img {
      height: 24px;
      width: 24px;
      cursor: pointer;
    }
  }
}

.emoji {
  &:deep(.v3-emoji-picker) {
    width: 350px;
    height: 350px;
  }
}

.manage_group{
  display: flex;
  justify-content: flex-end;
  color:#C0C2DB;
  margin-top: 12px;
  cursor: pointer;
}
.pointer{
  cursor: pointer;
}

</style>
