<template>
  <!-- 禁言 -->
  <n-modal to="body" v-model:show="isShow" :mask-closable="false" transform-origin="center">
    <div class="main_setting">
      <h4 class="top_title">
        <span>{{ t('chat_page_mute') }}</span>
        <i>
          <iconpark-icon @click="isShow = false" icon-id="Group39368" color="#fff" size="1.2rem"></iconpark-icon>
        </i>
      </h4>
      <div class="main_body">
        <n-radio-group v-model:value="choose" name="radiogroup">
          <n-radio v-for="(item, index) in list" :key="item.id" :value="item.id">
            <div class="radio_item">
              <span class="label">{{t( item.label )}}</span>
              <n-input-number v-model:value="list[index].day" :min="0.1" :max="99"  :show-button="false"
                style="width:85%"   />

              <span>{{ t('chat_page_day') }}</span>
            </div>
          </n-radio>
        </n-radio-group>
        <div class="btn_group">
          <div class="btn_close" @click="isShow = false">{{  t('home_page_cancel')  }}</div>
          <div class="btn_save" @click="saveClick">{{ t('chat_page_save') }}</div>
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Message } from "@/utils/discreteApi.ts";
import IWebsocket from '../chatWS'
// import { useI18n } from 'vue-i18n';
import usechatHooks from '../useHooks';
import { useI18n } from 'vue-i18n';
// const { t } = useI18n();

const { t } = useI18n();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  stateData: {
    type: Object,
    default: () => ({}),
  }
});

const { encodeInput, encodeParams }: any = usechatHooks(props.stateData)

const list = ref([
  { label: 'chat_page_ban_user', id: 1, day: '' },
  { label: 'chat_page_block_user', id: 2, day: '' },
  { label: 'chat_page_ban_ip', id: 3, day: '' },
  { label: 'chat_page_block_ip', id: 4, day: '' },
])
const choose = ref()
const emit = defineEmits(['update:visible']);

// 禁言保存
const saveClick = () => {
  //   //禁言解禁请求
  // message MuteReq {
  //   int64 deviceid = 1; // 设备id
  //   string ip = 2; // ip
  //   int32 mtype = 3; // 操作类型 1 禁言用户 2禁言ip   3解封用户 4解封ip
  //   int32 days = 4; // 天数
  // }
  // //解封解封请求
  // message ForbidReq {
  //   int64 deviceid = 1; // 设备id
  //   string ip = 2; // ip
  //   int32 mtype = 3; // 操作类型 1 封禁用户 2封禁ip   3解封用户 4解封ip
  //   int32 days = 4; // 天数
  // }

  const state = props.stateData
  if (!state.userData?.id) {
    Message.error('请先选择用户')
    return
  }

  if (!choose.value) {
    Message.error('请先选择')
    return
  }
  const requestid = state.requestid;
  const type = 25; //
  var payload = {
    deviceid: state.deviceID,
    id: state.userData.id,
    days: Number(list.value[choose.value - 1]?.day),
    mtype: choose.value
  }

  const actionType = choose.value < 3 ? 'MuteReq' : 'ForbidReq'
  const decodedata = encodeParams(payload, actionType)
  const encodedRequest = encodeInput(type, requestid, decodedata);
  IWebsocket.sendMessageHandler(encodedRequest)
  isShow.value = false
}

const isShow = computed({
  get: function () {
    choose.value = ''
    list.value.forEach(item => item.day = '')
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

  &:deep(.n-radio-group) {
    width: 100%;

    .n-radio {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 20px;
    }

    .n-radio-input {
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
  .label {
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
    background: url('/img/serviceModal/tab_btn.webp?t=@{timestamp}') no-repeat;
    background-size: 100% 100%;
    margin-top: -5px;
    line-height: 40px
  }
}
</style>
