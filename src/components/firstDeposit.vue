

<template>
  <div class="firstDeposit">
<!--    <div class="notice_dialog" :class="['notice_dialog_' + noticeList[currentIndex].type]">-->
       <Imgt class="close_icon" @click="closeDialog" src="/img/dialog/close.png" alt="X" />

    <div class="left">
      <Imgt class="firstDeposit_img treble" src="/img/home/firstDeposit_treble.webp" alt="X" />
      <Imgt class="firstDeposit_img redPacket" src="/img/home/firstDeposit_redPacket.webp" alt="X" />
      <Imgt class="firstDeposit_img platform" src="/img/home/firstDeposit_platform.webp" alt="X" />
      <Imgt class="firstDeposit_img bubble" src="/img/home/firstDeposit_bubble.webp" alt="X" />
      <Imgt class="firstDeposit_img star" src="/img/home/firstDeposit_star.webp" alt="X" />
      <Imgt class="firstDeposit_img stars_left" src="/img/home/firstDeposit_stars_left.webp" alt="X" />
    </div>
    <div class="content">
      <p class="tips">{{t('first_deposit_tips')}}</p>
      <div class="signIn">
        <div class="day" v-for="(item, index) in signIn_7.data" :key="index">
          <div class="now_get">
            <p>{{item.name}}</p>
            <Imgt class="question" src="/img/home/question_icon.webp" alt="" />
          </div>
          <div class="day_content">
            <div class="information">
              <div>
                <p class="percent">{{item.percent}}%</p>
                <!--              <Imgt class="purse" src="/img/home/firstDeposit_purse.webp" alt="" />-->
                <Imgt class="gift" :src="item.src" alt="" />
                <div class="water_money" v-if="item.waterNum !== undefined">
                  <n-progress
                    type="circle"
                    :percentage="item.waterNum"
                    color="rgba(53, 208, 60, 1)"
                  />
                </div>
              </div>
              <n-button :bordered="false" class="weal" @click="signInButton">{{t('first_deposit_receive')}}</n-button>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="right">
      <Imgt class="firstDeposit_img balloon" src="/img/home/firstDeposit_balloon.webp" alt="X" />
      <Imgt class="firstDeposit_img chest" src="/img/home/firstDeposit_chest.webp" alt="X" />
      <Imgt class="firstDeposit_img stars" src="/img/home/firstDeposit_stars.webp" alt="X" />
    </div>
  </div>

</template>


<script setup lang="ts">
// 优惠首存
import { User } from '@/store/user.ts';
import pinia from '@/store';
import Imgt from '@/components/Imgt.vue';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const userInfo = User(pinia);

const closeDialog = () => {
  console.log('closeDialog');
  userInfo.setFirstDeposit(false)
}

const signIn_7 = reactive({
  data: [
    {name: t('first_deposit_sign_in_1'), percent: 5,  src: '/img/home/firstDeposit_1.webp'},
    {name: t('first_deposit_sign_in_2'), percent: 10, src: '/img/home/firstDeposit_2.webp'},
    {name: t('first_deposit_sign_in_3'), percent: 15, src: '/img/home/firstDeposit_3.webp'},
    {name: t('first_deposit_sign_in_4'), percent: 30, src: '/img/home/firstDeposit_last.webp', water: true, waterNum: 100},
    {name: t('first_deposit_sign_in_5'), percent: 60, src: '/img/home/firstDeposit_last.webp', water: true, waterNum: 40},
    {name: t('first_deposit_sign_in_6'), percent: 80, src: '/img/home/firstDeposit_last.webp', water: true, waterNum: 0},
  ]
})

const signInButton = () => {

}


</script>


<style scoped lang="less">

.firstDeposit{
  position: relative;
  border-radius: 16px;
  width: 1000px;
  min-height: 400px;
  background-image: url('/img/home/firstDeposit_texture.webp');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  //background-color: rgba(204, 193, 151, 0.44);
  padding: 20px 40px 50px 40px;
  display: flex;
  user-select: none;
  flex-direction: column;
  &::after {
    content: 'Deposit benefits';
    position: absolute;
    right: 26px;
    top: 14px;
    font-family: Niagara Solid;
    font-size: 100px;
    font-weight: 400;
    line-height: 107.08px;
    text-align: left;
    opacity: 0.2;

  }
  p {
    margin: 0;
  }

  .close_icon {
    width: 50px;
    height: 50px;
    position: absolute;
    font-size: 24px;
    right: 5px;
    top: -80px;
    cursor: pointer;
    z-index: 10;
  }
.content {
  position: absolute;
  left: 325px;
  top: 10px;
  z-index: 5;
  .signIn {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    gap: 16px;
    .day {
      width: 192px;
      height: 150px;
      overflow: hidden;
      top: 546px;
      border-radius: 16px;
      background: linear-gradient(180deg, #FFFFFF 0%, #FFE6A3 100%);
      .now_get {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 32px;
        padding: 0 6px;
        //cursor: pointer;
        background: linear-gradient(91.03deg, #FFA451 0.29%, #FF6B18 99.39%);
        p {
          margin: 0 auto;
        }
        .question {
          width: 24px;
          height: 24px;
          flex-grow: 0;
        }
      }
      .day_content {
        display: flex;
        height: calc(100% - 32px);
        align-items: center;
        flex-direction: column;
        .information {
          width: 100%;
          height: 100%;
          padding: 0 10px 10px;
          background-image:url('/img/home/firstDeposit_purse.webp');
          background-repeat: no-repeat;
          background-position: center 0;
          background-size: 96px 96px;
          >div {
            position: relative;
            display: flex;
            height: calc(100% - 24px);
            align-items: center;
            padding: 18px 30px 0 12px;
            justify-content: space-between;
            .percent {
              width: 46px;
              height: 22px;
              line-height: 22px;
              text-align: center;
              border-radius: 20px;
              font-size: 16px;
              color: rgba(255, 111, 29, 1);
              border: 1px solid rgba(255, 111, 29, 1);

            }
            .gift {
              width: 36px;
              height: 43px;
              margin-top: 20px;
              z-index: 2;
            }
            .water_money {
              position: absolute;
              top: 5px;
              right: -3px;
              :deep(.n-progress) {
                width: 44px;
                height: 44px;
                .n-progress-text {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 12px;
                  text-align: center;
                  font-weight: 700;
                  color: #ffffff;
                  width: 36px;
                  height:36px;
                  border-radius: 100%;
                  background: radial-gradient(121.98% 100% at 50% 0%, #3EF345 0%, #22B627 68.01%, #3EF345 97%);

                }
              }

            }
          }

          .weal {
            width: 100%;
            height: 24px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 400;
            border-radius: 20px;
            background: linear-gradient(180deg, #F7DC82 0%, #CA8528 100%);
          }

        }

      }
    }
  }

}

  .left {
    position: relative;
    .firstDeposit_img {
      position: absolute;
      top: 0;
      left: 0;
    }
    .bubble {
      top: 12px;
      left: -245px;
      width: 120px;
      height: 120px;

    }
    .redPacket{
      width: 382px;
      height: 390px;
      top: -100px;
      left: -130px;
      z-index: 3;
    }
    .platform {
      width: 556px;
      height: 556px;
      left: -200px;
      top: -30px;
      z-index: 2;
    }
    .treble {
      top: -100px;
      left: 50%;
      transform: translateX(-40%);
      width: 430px;
      height: 65px;
    }
    .star {
      width: 60px;
      height: 60px;
      top: 220px;
      left: -150px;
    }
    .stars_left {
      width: 552px;
      height: 670px;
      left: -240px;
      top: -180px;
      z-index: 1;
    }
  }
  .right {
    position: absolute;
    bottom: 0;
    right: 0;
    .firstDeposit_img {
      position: absolute;

      bottom: 0;
      right: 0;
    }
    .balloon {
      right: -130px;
      width: 208px;
      height: 284px;
    }
    .chest {
      right: -130px;
      bottom: -80px;
      width: 208px;
      height: 208px;
      z-index: 2;
    }
    .stars {
      width: 587px;
      height: 712px;
      bottom: -155px;
      right: -180px;
    }
  }
}

</style>
