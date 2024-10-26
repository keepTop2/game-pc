<template>
  <div>
    <div class="announcement">
      <div class="carousel_wrap">
        <n-carousel :draggable="false" autoplay :loop="true">
          <div v-for="img in bannerData" :key="img">
            <Imgt class="carousel" :src="img" />
          </div>
        </n-carousel>
        <p style="height: 40px">
          <iconpark-icon icon-id="Group39360" size="1rem"></iconpark-icon>
          <n-carousel
            :show-dots="false"
            autoplay
            draggable
            direction="vertical"
            v-if="textAnnouncement"
          >
            <span
              v-for="(v, i) in textAnnouncement"
              :key="i"
              style="height: 40px"
              class="carousel_span"
              >{{ t(v) }}</span
            >
          </n-carousel>
        </p>
      </div>
      <!-- 轮播图右侧 -->
      <div class="carousel_wrap_des">
        <div v-if="hasLogin" class="activity_wrap">
          <div class="activity_name">{{ firstActivity?.name }}</div>
          <div class="to_give">
            {{ firstActivity?.details }}
          </div>
          <div
            class="free_btn sign_up"
            style="width: 154px"
            @click="router.push('/wallet/records')"
          >
            存款开始游戏
          </div>
        </div>

        <div v-else>
          <Imgt class="carousel_man" src="/img/home/activity_man.webp" />
          <div class="bonus_des">
            <div class="to_register">注册并<span>获得</span>奖励</div>
            <div class="bonus_num">
              <span>888,88800</span>
              <span>VND</span>
            </div>
          </div>
          <div class="btn_group">
            <!-- <n-button style="height: 40px; width: 140px">Sign Up</n-button> -->
            <div class="free_btn sign_up" @click="isReg = true">Sign Up</div>
            <div class="free_btn" @click="pageStore.openFreeModal">Free Game</div>
          </div>
          <div class="community_icon">
            <Imgt
              v-for="i in 5"
              :key="i"
              class="icon1"
              :src="`/img/home/community_icon${i}.webp`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import pinia from "@/store/index";
import { storeToRefs } from "pinia";
import { Page } from "@/store/page";
import { useI18n } from "vue-i18n";
import { User } from "@/store/user";
import { ref, onMounted, computed } from "vue";
const page = Page(pinia);
const pageStore = Page()
import { useRouter } from "vue-router";
// const isVisible = ref(0);
const { textAnnouncement, adminI18n, homeActivityList } = storeToRefs(page);
const userInfo = User(pinia);
const { hasLogin, isReg } = storeToRefs(userInfo);
const { t } = useI18n();
const router = useRouter();

const bannerData: any = ref([]);

const firstActivity = computed(() => {
  return homeActivityList.value && homeActivityList.value[0];
});

// 获取banner图
function getBanner() {
  const { zh } = adminI18n.value;
  for (const key in zh) {
    if (key.indexOf("pc_admin_banner") > -1) {
      bannerData.value.push(zh[key]);
    }
  }
}

onMounted(() => {
  getBanner();
});
</script>

<style lang="less" scoped>
@timestamp: `new Date() .getTime() `;

.announcement {
  position: relative;
  display: flex;
  &:deep(.n-carousel__dot) {
    width: 64px !important;
    border-radius: 100px !important;
  }

  img {
    object-fit: cover;
  }

  height: 424px;

  .carousel_wrap {
    width: 941px;
    height: 100%;
    margin-right: 15px;
  }

  > p {
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 40px;
    padding: 0 14.5px;
    background-color: rgba(0, 0, 0, 0.3);
    margin: 0;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 16px;
    // border-bottom-left-radius: 15px;
    // border-bottom-right-radius: 15px;
  }
}

.carousel_wrap_des {
  width: 444px;
  height: 100%;
  border-radius: 12px;
  background: url("/img/home/activity.webp?t=@{timestamp}") no-repeat;
  background-size: 100% 100%;
  position: relative;
  padding-top: 80px;
  padding-left: 30px;
  .carousel_man {
    height: 246px;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  .bonus_des {
    .to_register {
      font-size: 30px;
      font-weight: 600;
      color: #ffffff;
      span {
        color: #faca46;
      }
    }
  }
  .bonus_num {
    background-image: -webkit-linear-gradient(
      180deg,
      #ffffff 44.07%,
      #999999 62.34%,
      #ffffff 76.33%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    span {
      &:nth-child(1) {
        font-size: 40px;
      }
      &:nth-child(2) {
        font-size: 30px;
      }
    }
  }
}
.free_btn {
  width: 140px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #fff;
  font-size: 16px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  cursor: pointer;
}
.sign_up {
  border: none;
  background: linear-gradient(180deg, #5567ff 0%, #9e1eff 100%);
}

.btn_group {
  margin-top: 58px;
  display: flex;
  gap: 12px;
}
.community_icon {
  display: flex;
  margin-top: 24px;
  gap: 15px;
  cursor: pointer;
  img {
    height: 40px;
  }
}
.activity_wrap {
  display: flex;
  flex-direction: column;
  margin-left: 120px;

  .activity_name {
    font-size: 30px;
    color: #fff;
  }
  .to_give {
    margin-top: 12px;
    margin-bottom: 60px;
    background-image: -webkit-linear-gradient(
      180deg,
      #ffffff 44.07%,
      #999999 62.34%,
      #ffffff 76.33%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    font-size: 30px;
    span {
      font-size: 40px;
    }
  }
}
</style>
