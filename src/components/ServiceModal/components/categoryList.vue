<template>
  <!-- 客服聊天弹窗 -->
  <n-modal to="body" v-model:show="isShow" :mask-closable="false" transform-origin="center">
    <n-card class="shortcut_set" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="main_setting">
        <h4 class="top_title">
          <span>{{ t('chat_page_category_man') }}</span>
          <i>
            <iconpark-icon @click="closeWin" icon-id="Group39368" color="#fff" size="1.2rem"></iconpark-icon>
          </i>
        </h4>
        <div class="main_body">
          <n-flex align="center" class="input_top">
            <span>{{ t('chat_page_add_type') }}</span>
            <n-flex class="input_box">
              <n-input v-model:value="addForm.title" clearable />
              <span class="add_icon button" @click="addNewLine"></span>
            </n-flex>
          </n-flex>

          <!-- 表格 -->
          <div class="table_box">
            <n-flex align="center" class="table_header">
              <span class="list_lx">{{ t('chat_page_type_name') }}</span>
              <span class="list_kjy">{{ t('chat_page_shortcut_num') }}</span>
              <span>{{ t('proxy_page_caoZ') }}</span>
            </n-flex>
            <div class="table_body">
              <div class="nodata" v-if="!dataCateList.length">
                <Imgt src="/img/wallet/nodata.webp" alt="nodata" />
                <div>{{ t('home_page_nomore_data') }}</div>
              </div>
              <div v-else>
                <n-flex class="table_list" align="center" v-for="(item, index) in dataCateList"
                        :key="index">
                  <n-flex justify="center" class="list_lx">
                    <n-input v-model:value="item.title" :placeholder="t('chat_page_type_tip')"
                             style="text-align: left" />
                  </n-flex>
                  <span class="list_kjy">
                    {{ item?.num || 0 }}
                  </span>
                  <span v-if="!item.deviceid || item?.num" class="list_item"></span>
                  <span v-else class="list_item button" @click="removeList(item, index)"
                        style="color: #ff2424">
                    {{ t('paymentManagement_page_delete') }}
                  </span>
                </n-flex>
              </div>
            </div>

          </div>
          <!-- 底部 -->
          <n-flex align="center" justify="center" class="btn_bottom">
            <n-flex align="center" justify="center" @click="closeWin" class="button">{{ t('proxy_page_close') }}</n-flex>
            <n-flex align="center" justify="center" class="button" @click="addCateQuick">{{ t('chat_page_save') }}
            </n-flex>
          </n-flex>

        </div>
      </div>
    </n-card>

  </n-modal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Imgt from '@/components/Imgt.vue';
// import btn from './btn.vue';
// import Common from '@/utils/common';
// import { Net } from '@/net/Net';
// import { NetPacket } from '@/netBase/NetPacket';
// import { MessageEvent2 } from '@/net/MessageEvent2';
// import { NetMsgType } from '@/netBase/NetMsgType';
import { useI18n } from 'vue-i18n';
import { Dialog, Message } from '@/utils/discreteApi';
// import { User } from '@/store/user.ts';
// import pinia from '@/store';
// import { storeToRefs } from 'pinia';

const { t } = useI18n();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  quickPhrasesCateList: {
    type: Array,
    default: [],
  },
});
const emit = defineEmits(['update:visible', 'addModifyCateQuick']);

// const userInfo = User(pinia);
// const { roleInfo } = storeToRefs(userInfo);

const addForm = ref({
  title: '',
});
const isLoading = ref(false);
const dataCateList: any = ref([]);

const isShow = computed({
  get: function() {
    return props.visible;
  },
  set: function(value) {
    emit('update:visible', value);
  },
});
// 关闭
const closeWin = () => {
  isShow.value = false;
};
// 删除
const removeList = (item: any, index: number) => {
  // console.log('删除==', item);
  // 只能删除非官方的数据， 没有 deviceid 这个字段或者这个字段值为 0 代表官方，或者下面有快捷语(num 大于0 代表有快捷语)
  if (!item.deviceid || item?.num) {
    return Message.error(t('proxy_page_caoZuoFail'));
  }
  Dialog.warning({
    showIcon: false,
    title: t('paymentManagement_page_tips'),
    content: t('paymentManagement_page_tipContent'),
    positiveText: t('home_page_confirm'),
    negativeText: t('home_page_cancel'),
    onPositiveClick: () => {
      console.log('---', item);
      // 接口的数据，需要调接口
      if (item.id) {
        const curP = {
          ...item,
          mType: 22, // 20 新增，21 修改，22 删除
        };
        doActionCateQuick(curP);
      } else { // 前端添加的数据，直接删除
        dataCateList.value.splice(index, 1);
      }
    },
    onNegativeClick: () => {

    },
  });
};
// 新增一行
const addNewLine = () => {
  const obj = {
    title: addForm.value.title.trim(),
    mType: 20, // 20 新增，21 修改，22 删除
  };
  if (!obj.title) {
    return Message.error(t('chat_page_empty_tip'));
  }
  if (obj.title.length > 12) {
    return Message.error(t('chat_page_longer_tip'));
  }
  dataCateList.value.unshift(obj);
  addForm.value.title = ''; // 清空
};
// 新增快捷语
const addCateQuick = () => {
  if (isLoading.value) return;

  isLoading.value = true;
  dataCateList.value.map((item: any) => {
    item.title = item.title.trim();
    if (item.title.length > 12) {
      return Message.error(t('chat_page_longer_tip'));
    }
    // 这是编辑的数据
    if (item.id) {
      // console.log('编辑快捷语分类哈哈哈--');
      const curP = {
        ...item,
        mType: 21, // 20 新增，21 修改，22 删除
      };
      doActionCateQuick(curP);
    } else {  // 这是新增的数据
      // console.log('新增快捷语分类啊啊啊--');
      const curP = {
        ...item,
        mType: 20, // 20 新增，21 修改，22 删除
      };
      doActionCateQuick(curP);
    }
  });
  console.log(dataCateList.value);
  setTimeout(() => {
    isLoading.value = false;
  }, 5 * 1000);
};
// 新增编辑删除快捷语
const doActionCateQuick = (data: any) => {
  const params = {
    ...data,
  };
  emit('addModifyCateQuick', params);
};
watch(() => props.visible, (n) => {
  // 关闭
  if (!n) {
    addForm.value.title = ''; // 清空
  }
});
watch(() => props.quickPhrasesCateList, (n) => {
  if (n.length) {
    dataCateList.value = n;
  }
});

</script>
<style lang="less" scoped>
@timestamp: `new Date().getTime()`;

.shortcut_set {
  :deep(.n-card__content) {
    padding: 0;
  }

  .main_setting {
    width: 494px;
    border-radius: 14px;
    border: solid 1.4px #322c59;
    overflow: hidden;
    font-size: 16px;
    // background-color: #231353;

    .top_title {
      margin: 0;
      width: 100%;
      position: relative;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #fff;
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;
      text-align: center;
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
      background-image: linear-gradient(to bottom, #4c36b3 100%, #3a2786 28%, #3c279a 0%);

      > i {
        position: absolute;
        top: 5px;
        right: 15px;
        cursor: pointer;
      }
    }

    .main_body {
      height: 566px;
      padding: 30px 60px 40px;

      .n-input {
        font-size: 16px;
        height: 40px;
        padding: 0 30px 0 0;
        border-radius: 12px;
        box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.25);
        border: solid 1px #322c59;
        background-color: #1d0e4a;

        :deep(.n-input-wrapper) {
          padding: 0 10px;
        }

        :deep(.n-input__input-el) {
          height: 100%;
        }
      }

      .input_top {
        gap: 0 10px !important;
        margin: 0 0 20px;

        .input_box {
          position: relative;
          width: auto;
          flex: auto;

          .add_icon {
            position: absolute;
            right: 18px;
            top: 10px;
            width: 20px;
            height: 20px;
            background: url('/img/serviceModal/addIcon.webp?t=@{timestamp}') center no-repeat;
            background-size: 100%;
          }
        }

      }

      .table_box {
        font-size: 14px;
        text-align: center;

        .table_header {
          padding-left: 10px;
          gap: 0 !important;
          position: absolute;
          width: 380px;
          height: 66px;
          background: url('/img/serviceModal/tableTopSec.webp?t=@{timestamp}') center no-repeat;
          background-size: 100%;
          left: 50%;
          transform: translateX(-50%);

          span {
            flex: 1;
            padding-bottom: 10px;
          }
        }

        .list_lx {
          flex: unset !important;
          width: 214px;
        }

        .list_kjy {
          flex: unset !important;
          width: 90px;
        }

        .table_body {
          transform: translate(0, 50px);
          height: 300px;
          overflow-y: auto;
          border-radius: 0 0 10px 10px;

          .table_list {
            padding-left: 10px;
            gap: 0 !important;
            position: relative;
            height: 60px;
            background: #1D1146;

            &:nth-child(2n) {
              background: #2E1D7D;
            }

            .n-input {
              padding: 0;
              font-size: 14px;
            }

            .list_item {
              flex: 1;
            }

            .list_kjy {
              color: #8d84c5;
            }

          }
        }
      }

      .btn_bottom {
        font-size: 18px;
        gap: 8px 31px !important;
        margin-top: 90px;

        > div {
          width: 170px;
          height: 50px;
          background: url('/img/serviceModal/btnCancel.webp?t=@{timestamp}') center no-repeat;
          background-size: 100%;

          &:last-child {
            background-image: url('/img/serviceModal/btnSave.webp?t=@{timestamp}');
          }
        }
      }

    }
  }
}
</style>
