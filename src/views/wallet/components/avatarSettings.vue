<template>
  <n-modal to="body" v-model:show="isShow" :mask-closable="false" transform-origin="center">
    <n-card class="avatar_set" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="main_setting">
        <h4 class="top_title">
          <span>{{t('自定义头像')}}</span>
          <i>
            <iconpark-icon @click="isShow = false" icon-id="Group39368" color="#fff" size="1.2rem"></iconpark-icon>
          </i>
        </h4>
        <div class="main_body">
          <!-- 表格 -->
          <n-flex class="table_box">
            <n-flex justify="center" class="list_item" v-for="(item, index) in dataList" :key="index">
              <Imgt :class="curTab == item.value && 'active'" :src="`/img/head_icons/${item.value}.webp`" @click="clickTab(item)"/>
            </n-flex>
            <n-flex justify="center" class="list_item">
              <n-upload
                :max="1"
                @before-upload="beforeUpload"
                accept=".jpg,.jpeg,.png,.gif,.webp"
                :default-file-list="fileList"
                list-type="image-card"
              >
                点击上传
              </n-upload>
            </n-flex>
          </n-flex>
          <!-- 底部 -->
          <n-flex align="center" justify="center" class="btn_bottom">
            <n-flex align="center" justify="center" class="button" @click="submitAction">{{ t('home_page_confirm') }}</n-flex>
            <n-flex align="center" justify="center" class="button" @click="isShow = false">{{ t('home_page_cancel') }}</n-flex>
          </n-flex>

        </div>
      </div>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Imgt from '@/components/Imgt.vue';
import { useI18n } from 'vue-i18n';
import { Message } from "@/utils/discreteApi";
import { storeToRefs } from 'pinia';
import { User } from '@/store/user.ts';
import pinia from '@/store';

const { t } = useI18n();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const UserStore = User(pinia);
const emit = defineEmits(['update:visible']);
const { roleInfo } = storeToRefs(UserStore);

const curTab: any = ref(roleInfo.value.head_photo);
const dataList: any = ref([
  {value: '1001'},
  {value: '1002'},
  {value: '1003'},
  {value: '1004'},
  {value: '1005'},
  {value: '1006'},
  {value: '1007'},
  {value: '1008'},
  {value: '1009'},
  {value: '1010'},
  {value: '1011'},
  {value: '1012'},
]);
const fileList = ref([])

const isShow = computed({
  get: function () {
    return props.visible;
  },
  set: function (value) {
    emit('update:visible', value);
  },
});

const clickTab = (e: any) => {
  console.log('*****', e)
  curTab.value = e.value
}
const submitAction = () => {
  console.log('&&&&&&&', curTab.value)
}
// 上传图片
const beforeUpload = (data: any) => {
  const file = data.file.file
  if (file && file.size > 1024 * 1024 * 2) { // 2MB限制
    Message.error('文件大小不能超过2MB！')
    return;
  }
  const formData = new FormData();
  formData.append('avatar', file);
  formData.append('role_id', `${roleInfo.value.id}`);
  fetch(`http://18.162.112.52:8031/api/upload/avatar`, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json()).then(response => {
    if (response.status == 200 || response.status == 'success') {
      const urlImg = response.data.path
      Message.success(response.message)
      console.log('&&&&&', urlImg)
    } else {
      Message.error(response.message)
    }
  })
}

watch(() => roleInfo.value, (n) => {
  if (n) {
   console.log('====', n)
  }
})

</script>
<style lang="less" scoped>
@timestamp: `new Date().getTime()`;

.avatar_set {
  :deep(.n-card__content) {
    padding: 0;
  }

  .main_setting {
    width: 852px;
    border-radius: 14px;
    border: solid 1.4px #322c59;
    overflow: hidden;

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

      >i {
        position: absolute;
        top: 5px;
        right: 15px;
        cursor: pointer;
      }
    }

    .main_body {
      height: 686px;
      padding: 40px 60px;

      .table_box {
        gap: 30px !important;
        .list_item {
          width: 120px;
          img {
            cursor: pointer;
            width: 116px;
            border: 2px solid #231353;
            border-radius: 50%;
            &.active {
              border-color: #ad95f6;
            }
          }
          :deep(.n-upload) {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #616161;
            border-radius: 10px;
            .n-upload-file-list {
              display: flex;
              width: 100%;
              height: 100%;
              .n-upload-trigger--image-card, .n-upload-file {
                width: 100%;
                height: 100%;
                .n-upload-dragger {
                  background: none;
                }
              }
            }
          }
        }
      }

      .btn_bottom {
        font-size: 18px;
        gap: 8px 34px !important;
        margin-top: 80px;

        >div {
          width: 178px;
          height: 54px;
          background: url('/img/serviceModal/btnSave.webp?t=@{timestamp}') center no-repeat;
          background-size: 100%;

          &:last-child {
            background-image: url('/img/serviceModal/btnCancel.webp?t=@{timestamp}');
          }
        }
      }

    }
  }
}
</style>
