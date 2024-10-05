<template>
  <n-modal to="body" v-model:show="isShow" :mask-closable="false" transform-origin="center">
    <div class="change_card">
      <div class="login_from_box">
        <h4 class="forget_title">
          <span>{{ t('email_title') }}</span>
          <i>
            <iconpark-icon @click="isShow = false" icon-id="Group39368" color="#fff" size="1.2rem"></iconpark-icon>
          </i>
        </h4>

        <div class="info_form">
          <div class="form-item">
            <span>{{ t('email_title') }}</span>
            <div class="item-title">{{ data?.title }}</div>
          </div>
          <div class="form-item">
            <span>{{ t('email_content') }}</span>
            <div class="item_content">
              <div v-html="data?.content" class="content_wrap" </div>
              </div>
            </div>
            <div class="form-item" v-if="active_id == 2">
              <span>{{ t('attachment') }}</span>
              <div class="item-title">
                <div class="item-title-left">
                  <Imgt src="/img/email/majesticon.svg" alt="" />
                  <span>{{
                    Common.thousands(data?.attachments[0].award_value)
                  }}</span>
                </div>
                <btn :width="90" @click="getAward" v-if="!receive_email_ids.includes(props.data.email_id)">{{
                  t('vip_collect') }}</btn>
                <span v-else class="is-receive">{{ t('received') }}</span>
              </div>
            </div>
            <!-- <btn :width="374" :height="46" @click="isShow = false">{{ t('confirm') }}</btn> -->
          </div>
        </div>
      </div>
  </n-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import btn from './btn.vue';
import Common from '@/utils/common';
import { Net } from '@/net/Net';
import { NetPacket } from '@/netBase/NetPacket';
import Imgt from '@/components/Imgt.vue';
// import { MessageEvent2 } from '@/net/MessageEvent2';
// import { NetMsgType } from '@/netBase/NetMsgType';
// import { Message } from '@/utils/discreteApi';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '邮件标题',
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  active_id: {
    type: Number,
    default: 1,
  },
  receive_email_ids: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:visible']);

// 附件领取
const getAward = () => {
  const query = NetPacket.req_get_email_attachments();
  query.email_id = props.data.email_id;
  Net.instance.sendRequest(query);
};

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

.change_card {
  width: 494px;
  border-radius: 14px;
  border: solid 1.4px #322c59;
  background-color: #231353;

  .login_from_box {
    display: block;

    >.login_form {
      padding: 60px 40px 46px;

      >.tab {
        width: 100%;
        display: flex;
        justify-content: space-around;

        >span {
          flex: 1;
        }
      }
    }
  }

  .forget_title {
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

  .set_password {
    margin-bottom: 20px;
  }

  .btn {
    color: #fff;
    width: 90px;
    font-size: 14px;
    background: url('/img/login/sendBtn.webp?t=@{timestamp}') no-repeat;
    background-size: contain;
  }

  :deep(.n-button .n-button__icon, ) {
    height: 0.7em;
    width: 0.7em;
  }

  :deep(.n-button .n-button__icon .n-icon-slot) {
    height: 0.7em;
    width: 0.7em;
  }

  :deep(.n-base-loading .n-base-loading__container .n-base-loading__icon) {
    height: 0.7em;
    width: 0.7em;
  }

  .login_btn {
    margin-top: 40px;
  }
}

.info_form {
  height: 100%;
  padding: 40px 60px;

  .form-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .item-title {
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 16px;
    // margin: 72px 60px 52px;
    padding-left: 16px;
    border-radius: 12px;
    box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    border: solid 1px #322c59;
    background-color: #1d0e4a;
    word-break: break-all;

    .item-title-left {
      display: flex;
      align-items: center;
    }
  }
}

.item_content {
  min-height: 150px;
  width: 100%;
  margin-top: 10px;
  // margin: 52px 60px 0;
  border-radius: 12px;
  box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px #322c59;
  background-color: #1d0e4a;

  .content_wrap {
    min-height: 150px;
    max-height: 300px;
    word-break: break-all;
    overflow-y: auto;
    padding: 3px 8px;
  }
}

.is-receive {
  color: #9993C6;
  font-size: 16px;
  margin-right: 10px
}
</style>