<template>
  <!-- 禁言 -->
  <n-modal to="body" v-model:show="isShow" :mask-closable="false" transform-origin="center">
    <div class="main_setting">
      <h4 class="top_title">
        <span>禁言</span>
        <i>
          <iconpark-icon @click="isShow = false" icon-id="Group39368" color="#fff" size="1.2rem"></iconpark-icon>
        </i>
      </h4>
      <div class="main_body">
        <n-radio-group v-model:value="choose" name="radiogroup">
          <n-radio v-for="(item,index) in list" :key="item.id" :value="item.id">
            <div class="radio_item">
              <span class="label">{{item.label}}</span>
              <n-input v-model:value="list[index].day" placeholder="" style="width:230px" />
              <span>天</span>
            </div>
          </n-radio>
        </n-radio-group>
        <div class="btn_group">
            <div class="btn_close" >取消</div>
            <div class="btn_save" >保存</div>
          </div>
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

const list = ref([
  { label: '禁言用户', id: 1, day: '' },
  { label: '封锁用户', id: 2, day: '' },
  { label: '禁言IP', id: 3, day: '' },
  { label: '封锁IP', id: 4, day: '' },
])
const choose = ref()
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

  &:deep(.n-radio-group) {
    width: 100%;
    .n-radio{
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 20px;
    }
    .n-radio-input{
      width: 20px;
    }

    .n-radio__label {
      // display: flex;
      // align-items: center;
      // width: 100%;
    }
  }
}

.radio_item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ffffff;
  width: 100%;
  // margin-bottom: 12px;
  .label{
    display: inline-block;
    width: 80px;
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
</style>
