<template>
  <!-- 转账 -->
  <n-modal to="body" v-model:show="isShow" :mask-closable="false" transform-origin="center">
    <div class="main_setting">
      <h4 class="top_title">
        <span>转账</span>
        <i>
          <iconpark-icon @click="isShow = false" icon-id="tanctongyguanb" color="#fff" size="1.2rem"></iconpark-icon>
        </i>
      </h4>
      <div class="main_body">
        <div class="amount">
          <span>可用金额:</span>
          <span class="amount_total">300,000,000,000</span>
        </div>
        <div>
          <div class="title">转账金额</div>
          <n-input v-model:value="amount" placeholder="" />

          <div class="title">备注说明</div>
          <n-input v-model:value="remarks" placeholder="" type="textarea" />
        </div>
        <div class="btn_save">立即转账</div>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
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
});
const amount = ref()
const remarks = ref()
const emit = defineEmits(['update:visible']);

const isShow = computed({
  get: function () {
    return props.visible;
  },
  set: function (value) {
    emit('update:visible', value);
  },
});

</script>
<style lang="less" scoped>
@timestamp: `new Date().getTime()`;

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

.title {
  margin-top: 20px;
  margin-bottom: 10px;
  color: #ffffff;
  font-size: 14px;
}

.main_body {
  width: 494px;
  height: 480px;
  padding: 40px 60px;
  background-color: #231353;
  box-sizing: border-box;
}

.amount {
  display: flex;
  color: #8D84C5;

  .amount_total {
    color: #FABB2D;
  }

}


.btn_save {
  width: 374px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background: url('/img/serviceModal/btn_1.webp?t=@{timestamp}') no-repeat;
  background-size: 100% 100%;
  margin-top: 45px;
  line-height: 40px;
  cursor: pointer;

}
</style>
