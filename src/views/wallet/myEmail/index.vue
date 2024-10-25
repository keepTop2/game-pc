<template>
  <!-- 切换 -->
  <n-flex class="tabs">
    <div
      :class="['tab', { active_tab: tab.id == active_id }]"
      v-for="tab in tab_list"
      :key="tab.id"
      @click="tabClick(tab)"
    >
      {{ t(tab.label) }}
    </div>
  </n-flex>

  <n-flex vertical class="record_page wallet_recharge_record">
    <div class="attention">
      <span>{{ t("7_days") }}</span>
      <n-button @click="allClick" v-if="active_id == 1 && myEmail.hasNoRead">{{
        t("all_read")
      }}</n-button>
      <n-button
        v-if="active_id == 2"
        :class="{ received_all: active_id == 2 && received_all }"
        @click="allClick"
      >
        {{ received_all ? t("received_all") : t("one_click_claim") }}</n-button
      >
    </div>
    <div class="list" v-if="myEmail[active_id == 1 ? 'list' : 'rewardList'].length > 0">
      <div
        class="list-item"
        v-for="item in myEmail[active_id == 1 ? 'list' : 'rewardList']"
        :key="item"
      >
        <div class="list-item-left">
          <div class="item-badge">
            <iconpark-icon
              :icon-id="
                myEmail.email_readed.includes(item.email_id)
                  ? 'grzxiconyoux01'
                  : 'txxlicon11'
              "
              size="2rem"
              class="input_icon"
              style="margin-left: 4px"
            ></iconpark-icon>
            <div class="email_dot" v-if="isDot(item)"></div>
          </div>
          <div class="email-title">
            <span>{{ item.title }}</span>
            <span>{{ getTime(item.recv_time) }}</span>
          </div>
        </div>
        <n-button @click="viewInfo(item)">{{ t("view_details") }}</n-button>
      </div>
    </div>
    <div v-else class="no-data">
      <Imgt src="/img/wallet/nodata.webp" alt="" />
      <div>{{ t("home_page_nomore_data") }}</div>
    </div>
    <div class="t_loading">
      <n-spin v-show="loading" />
    </div>
    <!-- 查看详情弹窗 -->
    <infoModal
      v-model:visible="visible"
      :data="itemInfo"
      :active_id="active_id"
      :receive_email_ids="receive_email_ids"
    >
    </infoModal>
  </n-flex>
</template>

<script setup lang="ts">
import { onUnmounted, ref, onMounted, computed } from "vue";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { NetMsgType } from "@/netBase/NetMsgType";
import { Net } from "@/net/Net";
import { NetPacket } from "@/netBase/NetPacket";
import infoModal from "./components/infoModal.vue";
import { User } from "@/store/user";
import { storeToRefs } from "pinia";
import { Message } from "@/utils/discreteApi";
import { useI18n } from "vue-i18n";
import pinia from "@/store/index";
import Imgt from "@/components/Imgt.vue";
interface tabType {
  label: string;
  id: number;
}
const { t } = useI18n();
const store = User(pinia);
const { myEmail } = storeToRefs(store);

const active_id = ref(1);
const visible = ref(false);
const is_click_all = ref(false);
const itemInfo = ref();
// const email_readed = ref(myEmail.value.email_readed); // 已读邮箱id

const tab_list = [
  { label: "message_center", id: 1 },
  { label: "reward_email", id: 2 },
];

// tab 标签点击
const tabClick = (tab: tabType) => {
  console.log(tab);
  active_id.value = tab.id;
};
// 邮件查看详情
const viewInfo = (item: any) => {
  visible.value = true;
  itemInfo.value = item;
  if (!myEmail.value.email_readed.includes(item.email_id)) {
    const query = NetPacket.req_read_email();
    query.email_id = item.email_id;
    Net.instance.sendRequest(query);
  }
};

// 邮件是否未读
const isDot = (item: any) => {
  return !myEmail.value.email_readed.includes(item.email_id);
};

const loading = ref(false);

//邮箱已读
const resultRead_email = (rs: any) => {
  setTimeout(() => {
    btnLoading1.value = false;
  }, 3000);
  let email_id;
  if (rs.email_id.indexOf("-") > -1) {
    email_id = rs.email_id.slice(1);
  } else {
    email_id = rs.email_id;
  }

  if (!myEmail.value.email_readed.includes(email_id)) {
    myEmail.value.email_readed.push(email_id);
  }

  const sb = new Set(myEmail.value.email_readed);
  myEmail.value.hasNoRead = myEmail.value.email_id_list.some((x: any) => !sb.has(x));
};

const getTime = (value: any) => {
  return `${value.year}-${setZero(value.month)}-${setZero(value.day)} ${setZero(
    value.hour
  )}:${setZero(value.minute)}:${setZero(value.second)}`;
};

const setZero = (value: any) => {
  return value > 9 ? value : "0" + value;
};

//通知附件领取成功回执
const receive_email_ids: any = ref([]); // 已领取的id
const received_all = computed(() => {
  return myEmail.value["rewardList"].every((email: any) => {
    return receive_email_ids.value.includes(email.email_id);
  });
});
const isReadTotal = ref(0);
const resultAttachments = (rs: any) => {
  setTimeout(() => {
    btnLoading2.value = false;
  }, 3000);
  if (rs.email_id) {
    receive_email_ids.value.push(rs.email_id);
    // 从列表移除
    const list = myEmail.value.rewardList;
    const index = list.findIndex((item: any) => rs.email_id == item.email_id);
    if (index >= 0) {
      list.splice(index, 1);
      User(pinia).setEmailList({
        ...myEmail.value,
        rewardList: list,
      });
    }

    //全部领取
    if (is_click_all.value) {
      isReadTotal.value++;
      isReadTotal.value == 1 && Message.success(t("receive_ok"));
      setTimeout(() => {
        is_click_all.value = false;
        isReadTotal.value = 0;
      }, 1000);
    } else {
      Message.success(t("receive_ok"));
    }
  }
};

// 全部已读，一键领取
const btnLoading1 = ref(false);
const btnLoading2 = ref(false);
const allClick = () => {
  is_click_all.value = true;
  const list = myEmail.value[active_id.value == 1 ? "list" : "rewardList"];
  if (active_id.value == 1) {
    if (btnLoading1.value) return;
    btnLoading1.value = true;
  } else {
    if (btnLoading2.value) return;
    btnLoading2.value = true;
  }
  if (list && list.length > 0) {
    for (const item of list) {
      if (active_id.value == 1) {
        //全部已读
        const query = NetPacket.req_read_email();
        query.email_id = item.email_id;
        Net.instance.sendRequest(query);
      } else {
        // 一键领取
        if (!receive_email_ids.value.includes(item.email_id)) {
          const query = NetPacket.req_get_email_attachments();
          query.email_id = item.email_id;
          Net.instance.sendRequest(query);
        }
      }
    }
  }
};

onMounted(() => {
  // email_readed.value = myEmail.value.email_readed;
  // 回执监听
  // 监听邮件已读
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_notify_read_email, resultRead_email);
  // 通知附件领取成功
  MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_get_email_attachments,
    resultAttachments
  );
});

onUnmounted(() => {
  // 取消监听
  // MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_email_list, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_read_email, null);
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_get_email_attachments, null);
});
</script>

<style lang="less" scoped>
@import "@/assets/recordPage.less";
@timestamp: `new Date() .getTime() `;

.tabs {
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 14px;
  background: #14173a;
  border: 1px solid #26294c;

  .tab {
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #ffffff;
    cursor: pointer;
    background: unset;
  }

  .active_tab {
    // background: url("/img/wallet/tabBtnBG.webp?t=@{timestamp}") no-repeat;
    // background-size: 100% 112%;
    color: #b5a5ff;
  }
}

.wallet_recharge_record {
  font-size: 14px;
  user-select: none;
}

.attention {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #ffffff;
  .n-button {
    height: 40px;
    width: 120px;
  }
}

.received_all {
  opacity: 0.5;
  cursor: not-allowed !important;
}

.list {
  .list-item {
    height: 70px;
    margin: 20px 0;
    padding: 27px 27px 27px 26px;
    border-radius: 14px;
    background: #212443;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .n-button {
      height: 40px;
      width: 120px;
    }

    .list-item-left {
      display: flex;
      align-items: center;
      .item-badge {
        position: relative;
        .email_dot {
          position: absolute;
          top: 5px;
          right: 0px;
          height: 7px;
          width: 7px;
          border-radius: 50%;
          background-color: red;
          animation: dot-info-animal 1.6s infinite ease-in-out;
        }

        @keyframes dot-info-animal {
          0% {
            opacity: 0.3;
            transform: scale(0.9);
          }

          50% {
            opacity: 0.7;
            transform: scale(1.12);
          }

          100% {
            opacity: 0.3;
            transform: scale(0.9);
          }
        }
      }
    }

    img {
      height: 32px;
      width: 32px;
    }

    .email-title {
      margin-left: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      span {
        &:nth-child(1) {
          color: #ffffff;
          font-size: 16px;
        }

        &:nth-child(2) {
          color: #ffffff;
          font-size: 16px;
        }
      }
    }
  }
}

.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  gap: 10px;
  color: #ffffff;

  img {
    height: 200px;
  }
}
</style>
