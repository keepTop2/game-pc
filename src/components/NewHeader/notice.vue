<template>
  <div class="notice-wrapper">
    <div class="notice" :style="noticeStyle" v-if="tList.length">
      <span>{{ tList[num] }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({
  announcementList: {
    // 当前代理详情
    type: Array,
    default: () => [],
  },
});
const tList = computed(() => {
  const list = props.announcementList.map((item) => t(item));
  return list;
});

const noticeStyle = computed(() => {
  return {
    animation: "scrollNotice 5s linear infinite",
  };
});
const maxLength = computed(() => {
  return props.announcementList.length;
});

let marqueetimer = null;
const num = ref(0);
const showMarquee = () => {
  const max = props.announcementList.length;
  marqueetimer = setInterval(function () {
    num.value++;
    if (num.value > maxLength.value) {
      num.value = 0;
    }
  }, 5000);
};

onMounted(() => {
  showMarquee();
});

onUnmounted(() => {
  clearInterval(marqueetimer);
});
</script>

<style>
@keyframes scrollNotice {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.notice-wrapper {
  width: 320px;
  height: 60px;
  overflow: hidden;
  position: relative;
  line-height: 60px;
}

.notice {
  width: 300px;
  /* width: 50%; */
  position: absolute;
  color: #9497a1;
  white-space: nowrap;
}
</style>
