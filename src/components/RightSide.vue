<template>
  <div class="right_side">
    <div
      v-for="item in opList"
      :key="item.id"
      class="right_side_item"
      @click="handleClick(item)"
    >
      <iconpark-icon :icon-id="item.icon" size="1rem"></iconpark-icon>
      <span>{{ item.label }}</span>
    </div>
  </div>
  <!-- 客服弹窗 -->
  <n-modal :show="kefuVisible" :mask-closable="false">
    <div>
      <ServiceModal v-model:visible="kefuVisible" />
    </div>
  </n-modal>
</template>

<script setup lang="ts">
// import { ref } from "vue";
import { User } from "@/store/user";
import ServiceModal from "./ServiceModal/ServiceModal.vue";
import pinia from "@/store/index";
import { storeToRefs } from "pinia";
import { Message } from "@/utils/discreteApi.ts";
const userInfo = User(pinia);
const {
  hasLogin,
  roleInfo,

  kefuVisible,
  agentInfo,
} = storeToRefs(userInfo);

const opList = [
  { label: "客服", icon: "cebliconzd01", id: 1 },
  { label: "社群", icon: "cebliconzd02", id: 2 },
  { label: "下载", icon: "cebliconzd03", id: 3 },
  { label: "", icon: "cebliconzd04", id: 4 },
];

const handleClick = (item: any) => {
  switch (item.id) {
    case 1:
      if (!hasLogin) {
        Message.error("用户未登录");
      }
      if ([2, 4].includes(agentInfo.value.mutetype.type_id)) {
        Message.error("用户被封禁");
      } else {
        kefuVisible.value = true;
        return;
      }
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth", // 可选，平滑滚动
      });
      break;

    default:
      break;
  }
};
</script>

<style lang="less" scoped>
.right_side {
  position: fixed;
  right: 10px;
  top: 50%;
  color: aliceblue;
  width: 60px;
  height: 240px;
  background: #1c2131;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 0 8px;

  .right_side_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 65px;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    border-bottom: 1px solid #000000;
    white-space: nowrap;

    &:last-child {
      height: 50px;
      border-bottom: unset;
    }
  }
}
</style>
