<template>
  <n-flex align="center" class="nav_box bg_color">
    <n-flex align="center" class="nav_l">
      <n-flex align="center" class="nav_title">
        <span>
          {{title}}
        </span>
        <span v-show="secTitle" class="sec_title">
          ｜{{secTitle}}
        </span>
      </n-flex>

      <n-flex align="center" class="nav_icon" v-if="showIcon">
        <n-flex align="center">
          <Imgt v-if="!refreshObj.isEyeOpen" :class="`pointer`" src="/img/payment/eyes_close.webp" alt=""
             @click="clickShow" />
          <Imgt v-else :class="`pointer`" src="/img/payment/eyes_open.webp" alt="" @click="clickShow" />
        </n-flex>
        <n-flex align="center">
          <Imgt :class="`pointer ${refreshObj.isRefreshFlag ? 'active' : ''}`" src="/img/payment/refresh.webp" alt=""
                @click="clickRefresh" />
        </n-flex>
      </n-flex>
    </n-flex>
    <n-flex class="nav_r">
     
    </n-flex>
  </n-flex>
</template>

<script setup lang="ts">
// import { watch } from 'vue';
import Imgt from '@/components/Imgt.vue';
// import { useI18n } from 'vue-i18n';
// import { Message } from "@/utils/discreteApi";

// const { t } = useI18n();
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  secTitle: {
    type: String,
    default: '',
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
  refreshObj: {
    type: Object,
    default: {
      isRefreshFlag: false,
      isEyeOpen: false,
    }
  },
});
const emit = defineEmits(['refreshWallet', 'moneyShow']);

const clickRefresh = () => {
  console.log('---', props.refreshObj)
  emit('refreshWallet')
}
const clickShow = () => {
  emit('moneyShow')
}

</script>
<style lang="less" scoped>
.nav_box {
  font-size: 20px;
  padding: 20px 40px;
  margin-bottom: 20px;
  width: 1100px;
  height: 68px;

  .nav_l {
    .nav_title {
      gap: 3px !important;
      .sec_title {
        font-size: 14px;
        font-weight: 500;
        color: rgba(174, 174, 176, 1);
      }
    }
    .nav_icon {
      gap: 16px !important;
      img {
        width: 24px;
        height: 24px;

        &.active {
          transition: all 1s ease-in-out;
          transform: rotate(720deg);
        }
      }
    }

  }
}
</style>
