<template>
  <n-modal
    to="body"
    v-model:show="isShow"
    :mask-closable="false"
    transform-origin="center"
  >
    <n-card
      class="shortcut_set"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <div class="main_setting">
        <h4 class="top_title">
          <span>{{ t("chat_page_shortcut_set") }}</span>
          <i>
            <iconpark-icon
              @click="isShow = false"
              icon-id="Group39368"
              color="#fff"
              size="1.2rem"
            ></iconpark-icon>
          </i>
        </h4>
        <div class="main_body">
          <n-flex align="center" class="tab_top">
            <a
              :class="`tab_item tab_item_${item.id} ${
                curTab === item.id ? 'active' : ''
              }`"
              v-for="(item, index) in tabArr"
              :key="index"
              @click="clickTab(item.id)"
            >
              {{ item.title }}
            </a>
          </n-flex>
          <n-flex align="center" class="input_top">
            <span>{{ t("chat_page_shortcut_add") }}</span>
            <n-flex class="input_box">
              <!-- 下拉选择-->
              <div v-show="showSelect" class="select_list">
                <n-flex
                  align="center"
                  justify="center"
                  :class="`select_item ${ite.id === curType ? 'active' : ''}`"
                  @click="clickSelect(ite.id)"
                  v-for="(ite, idx) in dataCateList"
                  :key="idx"
                >
                  {{ ite.title }}
                </n-flex>
              </div>
              <n-flex
                align="center"
                justify="center"
                class="n_select drop_down_99999"
                @click="clickShowSelect"
              >
                <span
                  class="select_txt"
                  :title="dataCateList.find((item: any) => item.id === curType)?.title"
                >
                  {{ dataCateList.find((item: any) => item.id === curType)?.title }}
                </span>
                <i
                  :class="`n-base-icon n-base-suffix__arrow ${
                    showSelect ? 'selectIcon' : ''
                  }`"
                >
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </i>
              </n-flex>
              <n-input v-model:value="addForm.title" clearable />
              <span class="add_icon button" @click="addNewLine"></span>
            </n-flex>
            <span @click="showSetting" class="button" style="color: #c0c2db">{{
              t("chat_page_mType")
            }}</span>
          </n-flex>

          <!-- 表格 -->
          <div class="table_box">
            <n-flex align="center" class="table_header">
              <span class="list_lx">{{ t("chat_page_type") }}</span>
              <span class="list_kjy">{{ t("chat_page_shortcut") }}</span>
              <span>{{ t("chat_page_top") }}</span>
              <span>{{ t("chat_page_autoReply") }}</span>
              <span>{{ t("proxy_page_caoZ") }}</span>
            </n-flex>
            <div :class="`table_body ${showEdit && 'cant_edit'}`">
              <div class="nodata" v-if="!dataList.length">
                <Imgt src="/img/wallet/nodata.webp" alt="nodata" />
                <div>{{ t("home_page_nomore_data") }}</div>
              </div>
              <div v-else>
                <n-flex
                  class="table_list"
                  align="center"
                  v-for="(item, index) in dataList"
                  :key="index"
                >
                  <n-flex justify="center" class="list_lx">
                    <!-- 下拉选择-->
                    <div v-show="item.showSelect" class="select_list">
                      <n-flex
                        align="center"
                        justify="center"
                        :class="`select_item ${ite.id === item.qhcid ? 'active' : ''}`"
                        @click="clickSelectList(ite.id, index)"
                        v-for="(ite, idx) in dataCateList"
                        :key="idx"
                      >
                        {{ ite.title }}
                      </n-flex>
                    </div>
                    <n-flex
                      align="center"
                      justify="center"
                      :class="`n_select n_select_list drop_down_${index}`"
                      @click="clickShowSelectList(index)"
                    >
                      <span
                        class="select_txt"
                        :title="dataCateList.find((ite: any) => ite.id === item.qhcid)?.title"
                      >
                        {{ dataCateList.find((ite: any) => ite.id === item.qhcid)?.title }}
                      </span>

                      <i
                        v-if="item.deviceid"
                        :class="`n-base-icon n-base-suffix__arrow ${
                          item.showSelect ? 'selectIcon' : ''
                        }`"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </i>
                    </n-flex>
                  </n-flex>
                  <span class="list_kjy">
                    <!-- 官方的不能编辑 -->
                    <n-input
                      v-model:value="item.content"
                      placeholder="此处修改快捷语"
                      :disabled="!item.deviceid"
                      style="text-align: left"
                      clearable
                    />
                  </span>
                  <n-flex class="list_item" justify="center">
                    <div
                      class="coverSwitch"
                      :data-value="item.istop"
                      @click="handleBeforeChange(item, 'istop', index)"
                    ></div>
                    <n-switch
                      class="switch"
                      v-model:value="item.istop"
                      :checked-value="1"
                      :unchecked-value="2"
                      @update:value="(e: any) => { handleUpdateValue(e, 'istop', index) }"
                    >
                    </n-switch>
                  </n-flex>
                  <n-flex class="list_item" justify="center">
                    <div
                      class="coverSwitch"
                      :data-value="item.istop"
                      @click="handleBeforeChange(item, 'isautorsp', index)"
                    ></div>
                    <n-switch
                      class="switch"
                      v-model:value="item.isautorsp"
                      :checked-value="1"
                      :unchecked-value="2"
                      @update:value="(e: any) => { handleUpdateValue(e, 'isautorsp', index) }"
                    >
                    </n-switch>
                  </n-flex>
                  <!-- 官方的不能删除 -->
                  <span v-if="!item.deviceid" class="list_item"></span>
                  <span
                    v-else
                    class="list_item button"
                    @click="removeList(item, index)"
                    style="color: #ff2424"
                  >
                    {{ t("paymentManagement_page_delete") }}
                  </span>
                </n-flex>
              </div>
            </div>
          </div>
          <!-- 底部 -->
          <n-flex align="center" justify="center" class="btn_bottom">
            <n-flex
              v-show="showEdit"
              @click="changeEdit"
              align="center"
              justify="center"
              class="button"
              >{{ t("home_page_modify") }}
            </n-flex>
            <n-flex
              v-show="!showEdit"
              align="center"
              justify="center"
              class="button"
              @click="addQuick"
              >{{ t("chat_page_save") }}</n-flex
            >
          </n-flex>
        </div>
      </div>
      <!-- 快捷语设置 -->
      <!--      <categoryList v-model:visible="visibleSetting"/>-->
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Imgt from "@/components/Imgt.vue";
// import categoryList from './categoryList.vue';
import { useI18n } from "vue-i18n";
import { Dialog, Message } from "@/utils/discreteApi";
// import { storeToRefs } from 'pinia';
// import { User } from '@/store/user.ts';
// import pinia from '@/store';

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
  quickPhrasesList: {
    type: Array,
    default: [],
  },
});
// const visibleSetting = ref(false) // 类别
const emit = defineEmits(["update:visible", "showCateSetting", "addModifyQuick"]);

// const userInfo = User(pinia);
// const { roleInfo } = storeToRefs(userInfo);
const addForm = ref({
  title: "",
});
const showEdit: any = ref(true);
const curTab: any = ref("0");
const dropDown: any = ref(99999);
const dropDownArr: any = ref([]);
// tag: 所在标签
const tabArr: any = ref([
  // { title: 'promo_page_all', id: '0' },
  // { title: '来访', id: 'visit' },
  // { title: '充值类', id: 'deposit' },
  // { title: '提款类', id: 'withdraw' },
  // { title: '投注类', id: 'bet' },
  // { title: '代理类', id: 'agent' },
]);
const showSelect = ref(false);
const curType: any = ref("");
const isLoading = ref(false);
const dataCateList: any = ref([
  // {title: '奋斗奋斗分', id: 1},
  // {title: 'dsds', id: 2},
  // {title: '仿佛地方', id: 3},
]); // 快捷语分类列表
const dataListOrigin: any = ref([]);
const dataList: any = ref([
  // {content: '奋斗奋斗分', id: 1},
  // {content: 'dsdssad', id: 2},
  // {content: '得实大厦', id: 3},
]);

const isShow = computed({
  get: function () {
    return props.visible;
  },
  set: function (value) {
    emit("update:visible", value);
  },
});

// 修改
const changeEdit = () => {
  showEdit.value = false;
};
// 打开类别设置
const showSetting = () => {
  // visibleSetting.value = true
  emit("showCateSetting");
};
const clickTab = (e: any) => {
  // console.log('*****', e, dataListOrigin.value)
  curTab.value = e;
  filterData();
};
// 过滤数据
const filterData = () => {
  const newArr = dataListOrigin.value.length
    ? JSON.parse(JSON.stringify(dataListOrigin.value))
    : [];
  dataList.value =
    curTab.value === "0"
      ? newArr
      : newArr.filter((item: any) => item.qhcid === curTab.value);
};
const clickShowSelect = () => {
  dropDown.value = 99999;
  showSelect.value = !showSelect.value;
  document.addEventListener("click", handleClickOutside);
};
const handleClickOutside = (event: any) => {
  if (!dropDownArr.value.includes(dropDown.value)) {
    dropDownArr.value.push(dropDown.value);
  }
  const modal = document.querySelector(`.drop_down_${dropDown.value}`);
  if (modal && !modal.contains(event.target)) {
    // 关闭当前
    closeModal();
  } else {
    // 关闭其他
    if (dropDown.value !== 99999) {
      showSelect.value = false;
    }
    dropDownArr.value.map((item: any) => {
      if (item !== dropDown.value && item !== 99999) {
        dataList.value[item].showSelect = false;
      }
    });
  }
};
const closeModal = () => {
  showSelect.value = false;
  if (dataList.value[dropDown.value]) {
    dataList.value[dropDown.value].showSelect = false;
  }
  document.removeEventListener("click", handleClickOutside);
};
const clickSelect = (e: any) => {
  curType.value = e;
  showSelect.value = false;
};
// 列表下拉类型
const clickShowSelectList = (index: any) => {
  // 官方的不能编辑
  if (!dataList.value[index].deviceid) {
    return;
  }
  dropDown.value = index;
  dataList.value[index].showSelect = !dataList.value[index]?.showSelect;
  document.addEventListener("click", handleClickOutside);
};
// 列表切换类型
const clickSelectList = (e: any, index: any) => {
  // console.log('----', e, index);
  dataList.value[index].qhcid = e;
  dataList.value[index].showSelect = false;
};

const handleBeforeChange = (item: any, type: any, index: number) => {
  console.log("before---", item, type, index);
  // 只能设置非官方的数据， 没有 deviceid 这个字段或者这个字段值为 0 代表官方
  // if (!item.deviceid) {
  //   return Message.error(t('proxy_page_caoZuoFail'))
  // }
  // console.log('设置===', item[type]);
  dataList.value[index][type] = item[type] == 1 ? 2 : 1;
  // 只能设置一条自动回复
  if (type === "isautorsp" && dataList.value[index][type] == 1) {
    dataList.value.forEach((item: any, i: any) => {
      if (index !== i) {
        item[type] = 2;
      }
    });
  }
};
// 开关
const handleUpdateValue = (e: any, type: any, index: number) => {
  console.log("++++++", e, type, index);
  // dataList.value[index][type] = e;
};
// 删除
const removeList = (item: any, index: number) => {
  // console.log('删除==', item);
  // 只能删除非官方的数据， 没有 deviceid 这个字段或者这个字段值为 0 代表非官方
  if (!item.deviceid) {
    return Message.error(t("proxy_page_caoZuoFail"));
  }
  Dialog.warning({
    showIcon: false,
    title: t("paymentManagement_page_tips"),
    content: t("paymentManagement_page_tipContent"),
    positiveText: t("home_page_confirm"),
    negativeText: t("home_page_cancel"),
    onPositiveClick: () => {
      console.log("---", item);
      // 接口的数据，需要调接口
      if (item.id) {
        const curP = {
          ...item,
          mType: 18, // 16 新增，17 修改，18 删除
        };
        doActionQuick(curP);
      } else {
        // 前端添加的数据，直接删除
        dataList.value.splice(index, 1);
      }
    },
    onNegativeClick: () => {},
  });
};
// 新增一行
const addNewLine = () => {
  const obj = {
    content: addForm.value.title,
    mType: 16, // 16 新增，17 修改，18 删除
    qhcid: curType.value, // 分类id
    istop: 2, //1 为置顶 其余值不置顶
    isautorsp: 2, //是否是自动回复 前端用的
  };
  if (!obj.content.trim()) {
    return Message.error(t("chat_page_empty_tip"));
  }
  dataList.value.unshift(obj);
  addForm.value.title = ""; // 清空
};
// 新增快捷语
const addQuick = () => {
  if (isLoading.value) return;
  isLoading.value = true;
  let emptyCount: any = 0;
  dataList.value.map((item: any) => {
    item.content = item.content.trim();
    if (!item.content) {
      emptyCount++;
    }
  });
  if (emptyCount > 0) {
    isLoading.value = false;
    return Message.error(t("chat_page_empty_tip"));
  }
  dataList.value.map((item: any) => {
    // 这是编辑的数据
    if (item.id) {
      // console.log('编辑快捷语--');
      const curP = {
        ...item,
        mType: 17, // 16 新增，17 修改，18 删除
      };
      doActionQuick(curP);
    } else {
      // 这是新增的数据
      // console.log('新增快捷语--');
      const curP = {
        ...item,
        mType: 16, // 16 新增，17 修改，18 删除
      };
      doActionQuick(curP);
    }
  });
  console.log(dataList.value);
  showEdit.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 3 * 1000);
};
// 新增编辑删除快捷语
const doActionQuick = (data: any) => {
  const params = {
    ...data,
  };
  emit("addModifyQuick", params);
};

watch(
  () => props.quickPhrasesCateList,
  (n) => {
    if (n.length) {
      dataCateList.value = n;

      tabArr.value = [{ title: t("promo_page_all"), id: "0" }, ...n];
      curType.value = dataCateList.value[0]?.id; // 默认第一条
    }
  }
);
watch(
  () => props.quickPhrasesList,
  (n) => {
    dataList.value = n.length ? JSON.parse(JSON.stringify(n)) : [];
    dataListOrigin.value = n.length ? JSON.parse(JSON.stringify(n)) : [];
    filterData();
  }
);
</script>
<style lang="less" scoped>
@timestamp: `new Date() .getTime() `;

.shortcut_set {
  :deep(.n-card__content) {
    padding: 0;
  }

  .main_setting {
    width: 852px;
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
      background-color: #14173a;
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

      > i {
        position: absolute;
        top: 5px;
        right: 15px;
        cursor: pointer;
      }
    }

    .main_body {
      height: 686px;
      padding: 40px 60px;

      .tab_top {
        width: 732px;
        height: 46px;
        flex-flow: nowrap !important;
        overflow-x: scroll;
        overflow-y: hidden;
        //padding: 0 42px 6px 6px;
        border-radius: 14px;
        box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.25);
        border: solid 1.4px #322c59;

        &::-webkit-scrollbar {
          display: block;
          height: 3px;
        }

        &::-webkit-scrollbar-thumb {
          background: #3c279a;
          border-radius: 8px;
        }

        a {
          display: flex;
          flex: none;
          align-items: center;
          justify-content: center;
          //flex: 1;
          min-width: 100px;
          height: 42px;
          line-height: 16px;
          color: #8d81c1;

          &.active {
            flex: none;
            width: 128px;
            background: url("/img/serviceModal/tab_btn.webp?t=@{timestamp}") center
              no-repeat;
            background-size: 100%;
            background-position-y: 3px;
            color: #fff;
          }
        }
      }

      .n_select {
        font-size: 16px;
        cursor: pointer;
        gap: 0 !important;
        position: absolute;
        top: 1.5px;
        z-index: 1;
        min-width: 76px;
        width: 120px;
        padding: 0 3px;
        height: 40px;
        border-radius: 10px;
        background: linear-gradient(180deg, #5567ff 0%, #9e1eff 100%);

        .select_txt {
          max-width: 100px;
          line-height: 16px;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          /* 这里是超出几行省略 */
          overflow: hidden;
        }

        &.n_select_list {
          position: relative;
          min-width: 76px;
        }

        .n-base-icon {
          width: 11px;
          transition: 0.3s;

          &.selectIcon {
            transform: rotate(180deg);
            left: 5px;
          }
        }
      }

      .select_list {
        background: #231353;
        border-radius: 10px;
        border: solid 1px #322c59;
        position: absolute;
        z-index: 19;
        min-width: 74px;
        max-width: 120px;
        top: 45px;
        text-align: center;

        .select_item {
          cursor: pointer;
          color: #8e82c2;
          min-height: 36px;
          border-bottom: solid 1px rgba(255, 255, 255, 0.1);

          &.active {
            color: #fff;
            background-image: radial-gradient(
              circle at 50% 100%,
              #1154ff,
              #1154ff 34%,
              #1170ff 59%
            );
          }

          &:first-child {
            &.active {
              border-radius: 10px 10px 0 0;
            }
          }

          &:last-child {
            &.active {
              border-radius: 0 0 10px 10px;
            }
          }
        }
      }

      .n-input {
        font-size: 16px;
        height: 40px;
        padding: 0 30px 0 110px;
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
        margin: 20px 0;

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
            background: url("/img/serviceModal/addIcon.webp?t=@{timestamp}") center
              no-repeat;
            background-size: 100%;
          }
        }
      }

      .table_box {
        font-size: 14px;
        text-align: center;

        .table_header {
          gap: 0 !important;
          position: absolute;
          width: 735px;
          height: 40px;
          background-color: #1b1f4b;
          border-radius: 10px 10px 0px 0px;
          line-height: 40px;

          span {
            flex: 1;
            padding-bottom: 10px;
          }
        }

        .list_lx {
          flex: unset !important;
          width: 158px;
        }

        .list_kjy {
          flex: unset !important;
          width: 253px;
        }

        .table_body {
          transform: translate(0, 50px);
          height: 360px;
          overflow-y: auto;

          &.cant_edit {
            pointer-events: none;
          }

          .table_list {
            gap: 0 !important;
            position: relative;
            height: 60px;
            background: #1d1146;

            &:nth-child(2n) {
              background: #2e1d7d;
            }

            .n-input {
              padding: 0;
              font-size: 14px;
            }

            .list_item {
              position: relative;
              flex: 1;

              .coverSwitch {
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 1;
                cursor: pointer;
              }
            }

            .select_list {
              top: 53px;
            }

            ::v-deep(.n-switch) {
              width: 50px;
              height: 20px;
              border-radius: 11px;
              box-shadow: inset 0 4px 4px 0 #9495a8;
              background-color: #c0c2db;

              .n-switch__rail {
                width: 100%;
                height: 100%;

                .n-switch__button {
                  top: 2px;
                  width: 16px;
                  height: 16px;
                  max-width: inherit;
                  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.25);
                  background-image: radial-gradient(
                    circle at 51% 22%,
                    #fff,
                    #c2deff 56%,
                    #fff 87%
                  );
                }
              }

              &.n-switch--active {
                .n-switch__rail {
                  box-shadow: inset 0 4px 4px 0 #0c8518;
                  background-color: #0cc51e;

                  .n-switch__button {
                    left: 35px;
                  }
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

        > div {
          width: 240px;
          height: 46px;
          border-radius: 12px;
          background: linear-gradient(180deg, #5567ff 0%, #9e1eff 100%);

          &:last-child {
            background-image: url("/img/serviceModal/btnSave.webp?t=@{timestamp}");
          }
        }
      }
    }
  }
}
</style>
