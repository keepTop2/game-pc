<template>
  <div class="feedback_wrap">
    <div></div>
    <div class="input_wrap">
      <n-input
        v-model:value="feedbackValue"
        :rows="6"
        type="textarea"
        :placeholder="placeholder"
      />
      <n-button @click="submit">提交</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Message } from "@/utils/discreteApi";
import { NetPacket } from "@/netBase/NetPacket";
import { NetMsgType } from "@/netBase/NetMsgType";
import { MessageEvent2 } from "@/net/MessageEvent2";
import { Net } from "@/net/Net";
import { aaa, bbb } from "@/net/Utils";
import pinia from "@/store/index";
import { storeToRefs } from "pinia";
import { User } from "@/store/user";
const userInfo = User(pinia);
const placeholder =
  " 功能建议/活动创意/BUG等问题请您详细描述，您的宝贵意见一经采纳，PKBET将派发对应奖励！";

const feedbackValue = ref();
const { roleInfo } = storeToRefs(userInfo);
// 有奖反馈提交
const submit = () => {
  if (!feedbackValue.value || feedbackValue.value.length < 3) {
    Message.error("反馈内容过短，不能少于3个字");
    return;
  }
  const query = NetPacket.req_submit_suggest();
  query.aaa = aaa;
  query.bbb = bbb;
  query.role_id = roleInfo.value?.id;
  query.content = feedbackValue.value;
  Net.instance.sendRequest(query);
};
// 反馈监听
const notify_suggest = (rs: any) => {
  if (rs.code == 1) {
    feedbackValue.value = "";
    Message.success("操作成功");
  }
};

onMounted(() => {
  MessageEvent2.addMsgEvent(NetMsgType.msgType.msg_nodify_submit_suggest, notify_suggest);
});
onUnmounted(() => {
  // 取消监听
  MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_nodify_submit_suggest, null);
});
</script>

<style lang="less" scoped>
.feedback_wrap {
  height: 694px;
  width: 100%;
  background: #14173a;
  border-radius: 16px;
  margin-bottom: 20px;
  padding: 40px;
  .input_wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    &:deep(.n-input__placeholder) {
      color: #aeaeb0;
    }
  }
  .n-button {
    margin-top: 64px;
    width: 330px;
    height: 40px;
  }
}
</style>
