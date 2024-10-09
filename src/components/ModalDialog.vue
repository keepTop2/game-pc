<template>
  <n-modal class="tips_sm_modal" :show="isShow" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container vertical">
        <div class="header center">
          <span class="t_md">{{ t(`${title}`) }}</span>
          <span class="close abs pointer t_sm">
            <iconpark-icon @click="closeWin" icon-id="tanctongyguanb" color="#fff" size="1.5em"></iconpark-icon>
          </span>
        </div>
        <div class="body_sec">
          <slot name="content"></slot>
        </div>
      </div>
    </n-card>
  </n-modal>

</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t } = useI18n();
const props:any = defineProps({
  title: String,
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible']);

const isShow = computed({
  get: function() {
    return props.visible;
  },
  set: function(value) {
    emit('update:visible', value);
  },
});
const closeWin = () => {
  isShow.value = false;
};
</script>
<style scoped lang="less">
// 弹窗提示
.tips_sm_modal {
  &.form_card {
    width: 504px !important;

    :deep(.n-card__content) {
      padding: 0 !important;

      .header {
        position: relative;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 2px solid rgba(38, 41, 76, 1);

        .close {
          right: 20px;
        }
      }
    }
  }
}
</style>
