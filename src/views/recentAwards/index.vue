<template>
  <div class="box_wrap">
    <div class="box_main">
      <div class="box_title">
        <span class="label">今日TOP榜</span>
      </div>
      <div class="match_list">
        <div class="match_list_item" v-for="i in 3" :key="i" :style="{
          'background-image': `url(/img/recentAward/top_bg${i}.webp)`,
        }">
          <Imgt src="/img/recentAward/card_img.webp" />
          <div class="card_main">
            <div class="card_main_title">
              <Imgt src="/img/recentAward/top.webp" class="top" />
              <Imgt :src="`/img/recentAward/coin${i}.webp`" class="top_coin" />
            </div>
            <div class="card_main_num">恭喜发财</div>
            <div class="card_main_time">
              <div class="card_main_time_l">
                <span>abc***123</span>
                <div>
                  <span>爆奖</span>
                  <span>113,282 VND</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="box_main">
      <div class="box_title">
        <span class="label">中奖记录</span>
      </div>
      <div class="colect_wrap">
        <div v-for="j in 16" :key="j" class="colect_wrap_item">
          <div v-if="j <= 5" class="colect_wrap_item_des">
            <Imgt :src="`/img/home/colect_${j}.png`" />
            <div class="item_name">
              <span>黑帮风云</span>
              <span>hsj***263</span>
            </div>
            <div class="item_reward">
              <span>爆奖</span>
              <span>113,282 VND</span>
            </div>
          </div>
          <div v-else class="colect_wrap_item_des">
            <Imgt :src="`/img/home/colect_2.png`" />
            <div class="item_name">
              <span>黑帮风云</span>
              <span>hsj***263</span>
            </div>
            <div class="item_reward">
              <span>爆奖</span>
              <span>113,282 VND</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref } from "vue";
</script>

<style lang="less" scoped>
@timestamp: `new Date() .getTime() `;

.box_wrap {
  margin-top: 25px;
  width: 1400px;

  .topimg {
    width: 1400px;
  }
}

.box_main {
  position: relative;
  margin-top: 10px;

  .box_title {
    display: flex;
    justify-content: space-between;

    .label {
      color: #fff;
      font-size: 30px;
    }
  }

  .match_list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 20px;

    .match_list_item {
      width: 456px;
      height: 172px;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      padding: 18px 24px;
      box-sizing: border-box;

      img {
        width: 112px;
        height: 112px;
      }

      .card_main {
        margin-left: 11px;
        flex: 1;
        display: flex;
        flex-direction: column;

        .card_main_title {
          display: flex;

          .top {
            height: 25px;
            width: 43px;
          }

          .top_coin {
            height: 28px;
            width: 12px;
            margin-left: 5px;
            margin-top: -5px;
          }
        }

        .card_main_num {
          font-size: 20px;
          color: #ffffff;
        }

        .card_main_time {
          display: flex;
          gap: 25px;

          .card_main_time_l {
            display: flex;
            flex-direction: column;
            font-size: 14px;
            color: #afb6bd;

            span {
              &:nth-child(2) {
                color: #ffd217;
              }
            }
          }
        }
      }
    }
  }
}

.colect_wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: #0b0b0b;
  border-radius: 16px;
  padding: 16px 30px;

  .colect_wrap_item_des {
    margin-bottom: 15px;

    .item_name {
      display: flex;
      justify-content: space-between;
      color: #ffffff;
    }

    .item_reward {
      display: flex;

      span {
        color: #afb6bd;
        font-size: 12px;

        &:nth-child(2) {
          color: #ffd217;
        }
      }
    }
  }
}
</style>
