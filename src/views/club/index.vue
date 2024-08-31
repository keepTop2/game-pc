<template>
  <n-modal class="level_modal" v-model:show="showModal" preset="card">
    <template #header>
      <div :class="`level_title ${props.openType === 'clubJoin' ? 'level_title_join' : ''}`">
        {{ curTitle }}
      </div>
    </template>
    <div class="club_content">
      <div class="club_info">
        <!-- 俱乐部头部 -->
        <div v-if="curTab === 'club'" class="club_top">
          <div class="club_top_top">
            <div class="club_top_av"><img src="/img/home/avatar.webp" alt="avatar"></div>
            <div class="club_title_1"> BY88俱乐部-驻马尼拉分部</div>
            <n-flex class="club_title_2" align="center" justify="center">
              <span class="club_icon"></span>
              <span> 2323 {{ t('club_page_ren') }}</span>
            </n-flex>
          </div>

          <n-flex class="club_top_center" align="center">
            <div class="club_top_cen_l">
              <div><span class="name_1"> {{ t('club_page_id') }}： </span> <span> 1234324 </span>
              </div>
              <div><span class="name_1"> {{ t('club_page_sf') }}： </span>
                <span> {{ t('club_page_cheny') }} </span>
              </div>
            </div>
            <div class="club_top_cen_r">
              <div><span class="name_1"> {{ t('club_page_csbl') }}： </span> <span class="name_bl"> 1.0% </span>
              </div>
              <n-flex>
                <span class="name_1"> {{ t('club_page_xsmz') }}： </span>
                <div class="club_switch">
                  <n-switch v-model:value="switchActive" />
                </div>
              </n-flex>
            </div>
          </n-flex>
          <n-flex class="club_top_bottom" justify="space-between">
            <a class="btn_join" @click="() => { showJoinModal = true }"> {{ t('club_page_jrjlb')
              }} </a>
            <a class="btn_creat" @click="() => { showCreateModal = true }"> {{ t('club_page_cjjlb')
              }}</a>
          </n-flex>
        </div>

        <!-- 已创建 俱乐部头部 -->
        <div v-if="curTab === 'clubJoin'" class="club_join_top">
          <div class="club_join_title"> {{ t('club_page_srxq') }}：$</div>
          <n-flex class="club_join_con">
            <div class="club_join_con_l">
              <div class="con_l_item">
                <span> {{ t('club_page_jlbzsr') }}： </span>
                <span class="txt_mon"> 8788 </span>
              </div>
              <div class="con_l_item">
                <span> {{ t('club_page_zyxtz') }}： </span>
                <span class="txt_mon"> 998788 </span>
              </div>
              <div class="con_l_item">
                <span> {{ t('club_page_jtzsr') }}： </span>
                <span class="txt_mon"> 18788 </span>
              </div>
              <div class="con_l_item">
                <span> {{ t('club_page_jtztz') }}： </span>
                <span class="txt_mon"> 33998788 </span>
              </div>

            </div>

            <div class="club_join_con_r">
              <div class="con_l_item">
                <span> {{ t('club_page_csbl') }}： </span>
                <span class="name_bl"> 1.0% </span>
              </div>
              <div class="con_l_item">
                <span> {{ t('club_page_wdsf') }}： </span>
                <span class="txt_name"> {{ t('club_page_tz') }} </span>
              </div>
              <div class="con_l_item">
                <span> {{ t('club_page_bzsr') }}： </span>
                <span class="txt_mon"> 523 </span>
              </div>
              <div class="con_l_item">
                <span> {{ t('club_page_bztz') }}： </span>
                <span class="txt_mon"> 323 </span>
              </div>
            </div>
          </n-flex>
        </div>

        <!-- 俱乐部切换类别 -->
        <n-flex class="club_tab" justify="space-between">
          <a :class="`btn_join ${curTab === item.key ? 'active' : ''}`"
             v-for="(item, index) in tabArr" :key="index"
             @click="clickTab(item.key)">
            {{ item.title }}
          </a>
        </n-flex>

        <!-- 俱乐部--列表 -->
        <div v-if="curTab === 'club'" class="club_list">
          <n-flex class="club_list_tab" align="center">
            <a :class="`btn_type ${curGmaeType === item.key ? 'active' : ''}`"
               v-for="(item, index) in curGmaeArr"
               :key="index" @click="clickTabGame(item.key)">
              {{ item.title }}
            </a>
          </n-flex>
          <div class="club_list_content">
            <n-flex>
              <n-flex class="club_list_item" v-for="(item, index) in gameListData" :key="index"
                      align="center"
                      justify="space-around">
                <div class="item_l">
                  <div class="mb_rr"> {{ item.name }}</div>
                  <n-flex align="center" class="item_l_bottom">
                    <span class="mon_icon"></span>
                    <span> {{ item.minBet }} $</span>
                  </n-flex>
                </div>
                <div class="item_center">
                  <div class="type_name mb_rr"> {{ item.type }}</div>
                  <n-flex align="center" justify="center" class="item_c_bottom">
                    <span class="mon_icon_sec"></span>
                    <span> {{ item.rate }}</span>
                  </n-flex>
                </div>
                <div class="item_r">
                  <div class="item_r_top mb_rr">
                    <img src="/img/home/avatar.webp" alt="avatar">
                  </div>
                  <n-flex align="center" justify="center" class="item_r_bottom">
                    <span class="ren_icon"></span>
                    <span> {{ item.count }}</span>
                  </n-flex>
                </div>
              </n-flex>
            </n-flex>
            <div class="list_bottom">
              <a class="btn_create_p"> {{ t('club_page_cjpj') }} </a>
              <a class="btn_join_p"> {{ t('club_page_jrpj') }} </a>
            </div>
          </div>

        </div>

        <!-- 已创建 俱乐部列表 -->
        <div v-if="curTab === 'clubJoin'" class="club_join_list">
          <div class="clubJoin_list_item" v-for="(item, index) in clubListData" :key="index">
            <div class="list_left_av">
              <div class="list_av_icon">
                <img src="/img/home/avatar.webp" alt="avatar">
              </div>
              <div class="av_txt">
                {{ t('club_page_cjz') }}
              </div>
              <div class="av_txt">
                <n-ellipsis>
                  {{ item.create }}
                </n-ellipsis>
              </div>
            </div>
            <n-flex justify="space-between" class="join_list_t">
              <span> {{ item.name }} </span>
              <a> {{ t('club_page_ckxq') }} </a>
            </n-flex>

            <n-flex class="join_list_content" justify="space-around">
              <div class="club_join_con_l">
                <div class="join_l_item">
                  <span> {{ t('club_page_id') }}： </span>
                  <span class="txt_name"> {{ item.id }} </span>
                </div>
                <div class="join_l_item">
                  <span> {{ t('club_page_jrsr') }}： </span>
                  <span class="txt_mon"> {{ item.todayEarn }} </span>
                </div>
                <div class="join_l_item">
                  <span> {{ t('club_page_jrtz') }}： </span>
                  <span class="txt_mon"> {{ item.todayBet }} </span>
                </div>

              </div>

              <div class="club_join_con_r">
                <div class="join_l_item">
                  <span> {{ t('club_page_zxrs') }}： </span>
                  <span class="txt_name"> {{ item.online }} </span>
                </div>
                <div class="join_l_item">
                  <span> {{ t('club_page_jrzx') }}： </span>
                  <span class="txt_name"> {{ item.todayOnline }} </span>
                </div>
                <div class="join_l_item">
                  <span> {{ t('club_page_tzrs') }}： </span>
                  <span class="txt_name"> {{ item.betCount }} </span>
                </div>
              </div>
            </n-flex>
          </div>
        </div>

      </div>
    </div>
  </n-modal>

  <!-- 加入俱乐部弹窗 -->
  <n-modal :show="showJoinModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container">
        <div class="header">
          <span class="title">{{ t('club_page_jrjlb') }}</span>
          <span class="close pointer">
            <iconpark-icon @click="onClose" icon-id="Group39368" color="#fff"
                           size="1rem"></iconpark-icon>
          </span>
        </div>
        <div class="form_body">
          <n-form>
            <n-form-item :label="t('club_page_id')">
              <n-flex class="form_body_input" justify="space-between" align="center">
                <n-input v-model:value="joinParams.id" :placeholder="t('club_page_qsr')" />
                <a class="btn_search" @click="searchClub">{{ t('club_page_ss') }}</a>
              </n-flex>
            </n-form-item>
          </n-form>

          <n-flex class="form_footer" justify="space-between">
            <a @click="onClose"> {{ t('club_page_gb') }} </a>
            <a class="c_join_btn" @click="onSubmit"> {{ t('club_page_ljjr') }} </a>
          </n-flex>
        </div>
      </div>
    </n-card>
  </n-modal>

  <!-- 创建俱乐部弹窗 -->
  <n-modal :show="showCreateModal" :mask-closable="false">
    <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="form_container">
        <div class="header">
          <span class="title">{{ t('club_page_cjjlb') }}</span>
          <span class="close pointer">
            <iconpark-icon @click="onCloseCreate" icon-id="Group39368" color="#fff"
                           size="1rem"></iconpark-icon>
          </span>
        </div>
        <div class="form_body">
          <n-form>
            <n-form-item :label="t('club_page_jlbmc')">
              <n-input v-model:value="createParams.name" :placeholder="t('club_page_qsr')" />
            </n-form-item>
            <n-form-item :label="t('club_page_jlbcs')">
              <n-input type="number" v-model:value="createParams.rate"
                       :placeholder="t('club_page_qsr')" />
            </n-form-item>
            <n-form-item :label="t('club_page_jlbjj')">
              <n-input type="textarea" v-model:value="createParams.dec"
                       :placeholder="t('club_page_qsr')" />
            </n-form-item>
          </n-form>

          <n-flex class="form_footer" justify="space-between">
            <a @click="onCloseCreate"> {{ t('club_page_gb') }} </a>
            <a class="c_join_btn" @click="onSubmitCreate"> {{ t('club_page_ljcj') }} </a>
          </n-flex>
        </div>
      </div>
    </n-card>
  </n-modal>


</template>

<script setup lang='ts' name="clubInfo">
import { ref, watch } from 'vue';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps({
  openType: {
    type: String,
    default: () => 'club',
  },
});
const showModal = ref(false);
const showJoinModal = ref(false);
const showCreateModal = ref(false);
const switchActive = ref(false);
// const clubDataAll = ref({});
const loading = ref(false);
const curTitle = ref('俱乐部');
const curTab = ref('club'); // club, clubJoin
const tabArr: any = ref(
  [
    { title: t('club_page_yjr'), key: 'club' },
    { title: t('club_page_ycj'), key: 'clubJoin' },
  ],
);
const curGmaeType = ref('dz');
const curGmaeArr = [
  { title: '德州', key: 'dz' },
  { title: '21点', key: '21' },
  { title: '越南跑得快', key: 'pdk' },
  { title: 'Tiến Lên', key: 'len' },
  { title: '黑杰克', key: 'jack' },
  { title: '百人游戏', key: 'bai' },
  { title: '桥牌', key: 'pai' },
];

const gameListData = ref(
  [
    {
      name: '经典德州-1860',
      type: '【美元桌】',
      minBet: 25,
      icon: 'avatar',
      rate: '0.25/0.50',
      count: '3/8',
    },
    {
      name: '经典德州-1860',
      type: '【美元桌】',
      minBet: 25,
      icon: 'avatar',
      rate: '0.25/0.50',
      count: '3/8',
    },
    {
      name: '经典德州-1860',
      type: '【美元桌】',
      minBet: 25,
      icon: 'avatar',
      rate: '0.25/0.50',
      count: '3/8',
    },
    {
      name: '经典德州-1860',
      type: '【美元桌】',
      minBet: 25,
      icon: 'avatar',
      rate: '0.25/0.50',
      count: '3/8',
    },
    {
      name: '经典德州-1860',
      type: '【美元桌】',
      minBet: 25,
      icon: 'avatar',
      rate: '0.25/0.50',
      count: '3/8',
    },
    {
      name: '经典德州-1860',
      type: '【美元桌】',
      minBet: 25,
      icon: 'avatar',
      rate: '0.25/0.50',
      count: '3/8',
    },
    {
      name: '经典德州-1860',
      type: '【美元桌】',
      minBet: 25,
      icon: 'avatar',
      rate: '0.25/0.50',
      count: '3/8',
    },
    {
      name: '经典德州-1860',
      type: '【美元桌】',
      minBet: 25,
      icon: 'avatar',
      rate: '0.25/0.50',
      count: '3/8',
    },
    {
      name: '经典德州-1860',
      type: '【美元桌】',
      minBet: 25,
      icon: 'avatar',
      rate: '0.25/0.50',
      count: '3/8',
    },
    {
      name: '经典德州-1860',
      type: '【美元桌】',
      minBet: 25,
      icon: 'avatar',
      rate: '0.25/0.50',
      count: '3/8',
    },
  ],
);
const clubListData = ref(
  [
    {
      create: 'fsf898',
      name: '俱乐部-分部名称',
      id: 23233,
      todayEarn: 79898,
      todayBet: 898,
      online: 825,
      todayOnline: 98,
      betCount: 88,
    },
    {
      create: 'fsf898',
      name: '俱乐部-分部名称',
      id: 23233,
      todayEarn: 79898,
      todayBet: 898,
      online: 825,
      todayOnline: 98,
      betCount: 88,
    },
    {
      create: 'fsf898',
      name: '俱乐部-分部名称',
      id: 23233,
      todayEarn: 79898,
      todayBet: 898,
      online: 825,
      todayOnline: 98,
      betCount: 88,
    },
  ],
);
// 加入俱乐部表单提交
const joinParams = ref({
  id: '',
});
// 创建俱乐部表单提交
const createParams = ref({
  name: '',
  rate: '',
  dec: '',
});

// 获取等级数据
const queryData = () => {
  loading.value = true;
  const query = NetPacket.req_vip_info();
  Net.instance.sendRequest(query);
};

// 数据处理
// const resultHandle = (rs: any) => {
//   console.log('level-data--------', rs)
//   setTimeout(() => {
//     loading.value = false
//   }, 300)
//   clubDataAll.value = rs;
// }

const openModal = () => {
  showModal.value = !showModal.value;
  queryData();
};

const clickTab = (e: any) => {
  curTab.value = e;
  curTitle.value = e === 'club' ? t('club_page_club') : t('club_page_ycj');
};

const clickTabGame = (e: any) => {
  curGmaeType.value = e;
};
// 关闭加入俱乐部弹窗
const onClose = () => {
  showJoinModal.value = false;
};
// 加入俱乐部提交
const onSubmit = () => {
  console.log('----------', joinParams);
};
// 搜索俱乐部
const searchClub = () => {
  console.log('搜索---');
};
// 关闭创建俱乐部弹窗
const onCloseCreate = () => {
  showCreateModal.value = false;
};
// 创建俱乐部提交
const onSubmitCreate = () => {
  console.log('----------', createParams);
};

watch(
  () => props.openType,
  (n) => {
    curTab.value = n;
    curTitle.value = n === 'club' ? t('club_page_club') : t('club_page_ycj');
  },
  {
    deep: true,
  },
);


defineExpose({
  openModal,
});

</script>

<style lang='less' scoped>
.level_modal {
  .level_title {
    background-image: url(/img/club/club_title_bg1.webp);

    &.level_title_join {
      background-image: url(/img/club/club_title_bg2.webp);
    }
  }
}

// 加入俱乐部弹窗
.form_card {
  width: 494px !important;

  :deep(.n-card__content) {
    padding: 0;

    .n-form-item {
      .n-form-item-label {
        color: #fff;
      }

      .form_body_input {
        width: 100%;

        .n-input {
          width: 76% !important;
        }
      }

    }
  }

  .form_container {
    display: flex;
    flex-direction: column;

    .header {
      height: 50px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
      border-radius: 14px 14px 0 0;
      background-image: linear-gradient(to bottom, #4c36b3 100%, #3a2786 28%, #3c279a 0%);
      color: #fff;

      .title {
        font-size: 16px;
        font-weight: 500;
      }

      .close {
        position: absolute;
        top: 16px;
        right: 25px;
        display: flex;
        font-size: 12px;
        justify-content: center;
        align-items: center;
        flex-grow: 0;
      }
    }

    .form_body {
      gap: 20px;
      padding: 40px 60px;

      .btn_search {
        font-size: 16px;
        display: inline-block;
        width: 70px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: url(/img/club/club_diaBtn_sea.webp) center no-repeat;
        background-size: 100%;
      }
    }

    .form_footer {
      a {
        display: inline-block;
        width: 170px;
        height: 46px;
        line-height: 46px;
        text-align: center;
        background: url(/img/club/club_diaBtn_1.webp) center no-repeat;
        background-size: 100%;

        &.c_join_btn {
          background-image: url(/img/club/club_diaBtn_2.webp);
        }
      }
    }

  }
}

.club_info {
  font-size: 16px;
  padding: 0 6px;

  .club_icon {
    width: 27px;
    height: 22px;
    background: url(/img/club/club_icon_2.webp) center no-repeat;
    background-size: 100%;
  }

  .mb_rr {
    margin-bottom: 8px;
  }

  .name_1 {
    color: #8E82C2;
  }

  .name_bl {
    color: #80FF44;
  }

  .txt_mon {
    color: #FABB2D;
  }

  .txt_name {
    color: #fff;
  }

  .club_top {
    .club_top_top {
      position: relative;
      height: 145px;
      margin-top: 20px;
      background: url(/img/club/club_top_bg.webp) center no-repeat;
      background-size: 100%;

      .club_top_av {
        position: absolute;
        width: 72px;
        height: 72px;
        border: 2px solid #fff;
        border-radius: 50%;
        left: 50%;
        transform: translate(-50%, -30px);

        img {
          width: 70px;
          border-radius: 50%;
        }
      }

      .club_title_1 {
        text-align: center;
        padding: 50px 0 12px;
        font-size: 20px;
      }

      .club_title_2 {
        font-size: 20px;
      }

    }

    .club_top_center {
      height: 114px;
      margin: 15px auto;
      padding: 0 20px;
      background: url(/img/club/club_yjr_bg.webp) center no-repeat;
      background-size: 100%;
      gap: 0 !important;

      > div {
        flex: 1;

        .club_switch {
          ::v-deep(.n-switch) {
            .n-switch__rail {
              width: 68px;
              height: 22px;
              background: url(/img/club/club_switch_bg.webp) center no-repeat;
              background-size: 100%;

              .n-switch__button {
                width: 32px;
                height: 18px;
                background: url(/img/club/club_switch_1.webp) center no-repeat;
              }
            }

            &.n-switch.n-switch--active {
              .n-switch__rail {
                .n-switch__button {
                  background: url(/img/club/club_switch_2.webp) center no-repeat;
                }
              }
            }
          }
        }

      }

    }

    .club_top_bottom {
      margin-bottom: 30px;

      a {
        width: 186px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        background: url(/img/club/club_join_bg.webp) center no-repeat;
        background-size: 100%;
        transition: .3s;
      }
    }

  }

  .club_tab {
    height: 72px;
    background: url(/img/club/club_tabs_bg.webp) center no-repeat;
    background-size: 100%;
    padding: 0 6px;

    a {
      flex: 1;
      margin-top: 9px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      transition: .3s;
      color: #8D81C1;

      &.active {
        background: url(/img/club/club_yjr_title_bg.webp) center no-repeat;
        background-size: 100%;
        color: #fff;
      }

    }
  }

  .club_list {
    margin: 15px 0;

    .club_list_tab {
      height: 70px;
      background: #311C71;
      border-radius: 10px 10px 0 0;
      padding: 0 6px;

      .btn_type {
        position: relative;
        flex: 1;
        text-align: center;
        color: #8D81C1;
        height: 58px;
        line-height: 58px;

        &.active {
          color: #fff;
          background: url(/img/club/club_tab_bg.webp) center no-repeat;
          background-size: 100%;
          background-position-y: 8px;
        }

        &:nth-child(n+2) {
          &::before {
            content: '';
            position: absolute;
            display: inline-block;
            width: 1px;
            height: 36px;
            background: url(/img/line.webp) center no-repeat;
            background-size: 100%;
            left: -8px;
            top: 11px;
          }
        }


      }
    }

    .club_list_content {
      background: #1D0E4A;
      border: 1px solid #322C59;
      border-top: 0;
      padding: 15px;

      .club_list_item {
        flex: 48.5%;
        height: 94px;
        border-radius: 8px;
        margin-bottom: 8px;
        background: radial-gradient(to top, #3C279A 0%, #3A2786 26%, #4C36B3 100%);

        .item_l {
          .item_l_bottom {
            gap: 8px !important;

            .mon_icon {
              width: 22px;
              height: 17px;
              background: url(/img/club/club_icon_1.webp) center no-repeat;
              background-size: 100%;
            }
          }
        }

        .item_center {

          .type_name {
            text-align: center;
            color: #D0A6FF;
          }

          .item_c_bottom {
            gap: 8px !important;

            .mon_icon_sec {
              width: 17px;
              height: 17px;
              background: url(/img/club/q_icon.webp) center no-repeat;
              background-size: 100%;
            }
          }

        }

        .item_r {
          width: 100px;
          text-align: center;

          .item_r_top {
            display: inline-block;
            width: 28px;
            height: 28px;
            border: 1px solid #fff;
            border-radius: 50%;

            img {
              width: 100%;
              border-radius: 50%;
            }
          }

          .item_r_bottom {
            gap: 8px !important;

            .ren_icon {
              width: 22px;
              height: 18px;
              background: url(/img/club/club_icon_2.webp) center no-repeat;
              background-size: 100%;
            }
          }
        }

      }

      .list_bottom {
        margin-top: 10px;
        text-align: right;

        a {
          display: inline-block;
          width: 128px;
          height: 44px;
          line-height: 44px;
          text-align: center;
          background: url(/img/club/club_join_btn.webp) center no-repeat;
          background-size: 100%;

          &:nth-child(n+2) {
            margin-left: 15px;
          }
        }
      }

    }
  }

  /* 已创建俱乐部 */

  .club_join_top {

    .club_join_con {
      margin: 20px 0;
      padding: 25px;
      height: 198px;
      color: #8E82C2;
      background: url(/img/club/club_join_bg_1.webp) center no-repeat;
      background-size: 100%;

      > div {
        flex: 1;
      }

      .con_l_item {
        line-height: 36px;
      }

    }
  }

  .club_join_list {
    margin-top: 25px;

    .clubJoin_list_item {
      position: relative;
      height: 246px;
      margin-bottom: 15px;

      .list_left_av {
        position: absolute;
        width: 200px;
        height: 246px;
        top: -10px;
        left: 5px;
        text-align: center;
        padding: 45px 10px;
        background: url(/img/club/club_tx_bg.webp) center no-repeat;
        background-size: 100%;

        .list_av_icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 10px;
          border: 2px solid #fff;
          border-radius: 50%;

          img {
            width: 100%;
            border-radius: 50%;
          }
        }

        .av_txt {
          line-height: 28px;
        }
      }

      .join_list_t {
        font-size: 18px;
        margin-bottom: 5px;
        padding-left: 240px;

        a {
          font-size: 16px;
          display: inline-block;
          width: 120px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          background: url(/img/club/club_join_btn.webp) center no-repeat;
          background-size: 96%;
        }
      }

      .join_list_content {
        padding: 20px 0 20px 240px;
        height: 156px;
        color: #8E82C2;
        background: url(/img/club/club_join_bg_2.webp) center no-repeat;
        background-size: 100%;

        > div {
          flex: 1;
        }

        .join_l_item {
          line-height: 38px;
        }
      }

    }
  }

}
</style>
