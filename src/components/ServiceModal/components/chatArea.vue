<template>
  <n-spin :show="show">
    <div class="chat_content" ref="chatContentRef">
      <div v-if="chatList.length">
        <div
          class="chat_item"
          v-for="item in (chatList as any)"
          :key="item.date"
          :style="{ justifyContent: item.role == '2' ? 'flex-start' : 'flex-end' }"
        >
          {{ item.THeadPhoto }}
          <Imgt
            v-if="item.role == '2'"
            :src="`/img/head_icons/${item.THeadPhoto || '1001'}.webp`"
          />
          <div class="chat_main">
            <div
              class="user_info"
              :style="{ flexDirection: item.role == '2' ? 'row' : 'row-reverse' }"
            >
              <span>{{ item.name }}</span>
              <div
                class="mark_kf"
                v-if="item.role == '2'"
                :style="{
                  background: setColor(userData),
                }"
              >
                {{ t(setLabel()) }}
              </div>
              <div v-else class="mark_kf_me">我</div>
              <span class="date">{{ item.date }}</span>
            </div>
            <div
              :class="[item.role == '2' ? 'user_content' : 'me_content']"
              v-if="!item.money"
              @click="showImg(item.content)"
            >
              <div
                class=" "
                v-html="initMessage(item.content)"
                v-if="item.content.indexOf('storage/uploads') == -1"
              ></div>
              <!-- 图片视频 -->
              <div v-else>
                <n-image
                  v-if="item.content.includes('storage/uploads/image')"
                  width="140"
                  :src="'http://18.167.175.195:8031/' + item.content"
                  :previewed-img-props="{ style: { border: '8px solid white' } }"
                />
                <video
                  v-else
                  :src="'http://18.167.175.195:8031/' + item.content"
                  controls
                  preload="auto"
                  muted
                  width="240"
                  height="200"
                ></video>
              </div>
            </div>
            <!-- 转账 -->
            <div
              :class="[item.role == '2' ? 'user_content' : 'me_content']"
              v-else
              class="money"
            >
              <div class="left">
                <Imgt src="/img/serviceModal/transfer.webp" />
                <div class="left_info">
                  <span>转账给你</span>
                  <span>300,000,000,000</span>
                </div>
              </div>
              <div class="total">代理转账</div>
            </div>
          </div>
          <Imgt
            v-if="item.role == 1"
            :src="`/img/head_icons/${roleInfo.head_photo}.webp`"
          />
        </div>
      </div>
    </div>
  </n-spin>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import usechatHooks from "../useHooks";
import Imgt from "@/components/Imgt.vue";
// import btn from './btn.vue';
// import Common from '@/utils/common';
// import { Net } from '@/net/Net';
// import { NetPacket } from '@/netBase/NetPacket';
// import { MessageEvent2 } from '@/net/MessageEvent2';
// import { NetMsgType } from '@/netBase/NetMsgType';
// import { Message } from '@/utils/discreteApi';
import pinia from "@/store/index";
import { storeToRefs } from "pinia";
import { User } from "@/store/user";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const userInfo = User(pinia);

const { roleInfo, agentInfo } = storeToRefs(userInfo);
const props = defineProps({
  chatList: {
    type: Array,
    default: () => [],
  },
  userData: {
    type: Object,
    default: () => ({}),
  },
  deepObj: {
    type: Object,
    default: () => ({}),
  },
  setColor: {
    type: Function,
    default: () => ({}),
  },
});
const { initMessage }: any = usechatHooks();
const newValue = computed(() => {
  return props.chatList.length;
});

const setLabel = () => {
  if (agentInfo.value.user_type == 1) {
    const obj: any = {
      0: "chat_page_customer_user",
      5: "chat_page_agent_user",
    };
    return obj[props.userData.agentlevel] || "chat_page_agent_gamer";
  } else {
    return (
      (props.deepObj[props.userData.deep] && props.deepObj[props.userData.deep].label) ||
      "chat_page_direct_user"
    );
  }
};

function scrollToBottom() {
  const element = chatContentRef.value;
  element.scrollTo(0, chatContentRef.value.scrollHeight);
}

// 监听新消息滚动到最底部
watch(
  () => newValue.value,
  () => {
    setTimeout(() => {
      scrollToBottom();
    }, 500);
  }
);

const chatContentRef: any = ref(null);
const show = ref(false);
const showImg = (content: any) => {
  console.log(content);
};

onMounted(() => {
  show.value = true;
  setTimeout(() => {
    show.value = false;
    // scrollToBottom()
  }, 1000);
});

// const emit = defineEmits(['update:visible']);
</script>
<style lang="less" scoped>
.chat_content {
  height: 538px;
  padding: 30px 0px;
  box-sizing: border-box;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .chat_item {
    display: flex;
    margin-bottom: 20px;
    // flex-direction: row-reverse;
    //  justify-content: flex-end;

    img {
      width: 40px;
      height: 40px;
    }

    .chat_main {
      margin-left: 10px;
      margin-right: 10px;
    }

    .user_info {
      display: flex;
      align-items: center;
      gap: 8px;

      .mark_kf {
        border-radius: 6px;
        height: 24px;
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
        box-sizing: border-box;
      }

      .mark_kf_me {
        border-radius: 6px;
        height: 24px;
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
        box-sizing: border-box;
        background-image: radial-gradient(
            circle at 50% 0%,
            #e9c0ad,
            #b8856d 61%,
            #d1a28d 83%
          ),
          linear-gradient(to bottom, #fff, #653e2d);
      }

      .date {
        font-size: 14px;
        color: #8d84c5;
      }
    }

    .user_content {
      margin-top: 5px;
      border-radius: 2px 12px 12px 12px;
      padding: 8px 16px;
      border: solid 1px #353b5a;
      background-color: #282d6a;
    }

    .me_content {
      margin-top: 12px;
      border-radius: 12px 2px 12px 12px;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      max-width: 450px;
      border: solid 1px #5a47b2;
      background-color: #5b6cff;
    }

    .money {
      padding: 8px 0px;
      width: 287px;
      border: unset;
      cursor: pointer;
      background-color: #f9493e;

      .left {
        display: flex;
        align-items: center;
        margin-left: 16px;

        .left_info {
          margin-left: 10px;
          display: flex;
          flex-direction: column;
        }
      }

      .total {
        border-top: solid 1px rgba(255, 255, 255, 0.2);
        text-align: center;
      }
    }
  }
}

.item_column {
  display: flex;
  flex-direction: column;
}

.item_center {
  display: flex;
  justify-content: center;
}
</style>
