<template>
  <div>
    <!-- <section class="wh_container"> -->
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li @click="PreMonth(state.myDate, false)">
          <div class="wh_jiantou1"></div>
        </li>
        <li class="wh_content_li">{{ state.dateTop }}</li>
        <li @click="NextMonth(state.myDate, false)">
          <div class="wh_jiantou2"></div>
        </li>
      </div>
      <div class="wh_content div1">
        <div class="wh_content_item" v-for="(tag, i) in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" :key="i">
          <div class="wh_top_tag">{{ tag }}</div>
        </div>
      </div>
      <table class="wh_content">
        <th class="wh_content_item" v-for="(item, index) in state.list" :key="index" @click="clickDay(item, index)">
        <td class="wh_item_date" v-bind:class="[
          { wh_isMark: item.isMark },
          { wh_other_dayhide: item.otherMonth !== 'nowMonth' },
          { wh_want_dayhide: item.dayHide },
          { wh_isToday: item.isToday },
          { wh_chose_day: item.chooseDay },
          setClass(item)
        ]">
          <span v-if="item.IsSignIn === 'true' && item.SignInType === '1'">补签</span>
          <img :src="imgUrl(item)" width="25" v-else-if="item.img" />
          <span v-else>{{ item.id }}</span>
          <i v-if="item.gou"></i>
        </td>
        </th>
      </table>
      <!-- <div class="sign_text">您已经连续签到<b>{{ props.dayNum.ContinuousDays }}</b>天 -->
        <!-- <span class="btn"  @click="setSignIn">补签(<i>{{ props.dayNum.ComplementSignedCount }}</i>)</span> -->
      <!-- </div> -->
      <!-- <p class="btn1" @click="setSignIn(props.dayNum.TodayIsSignIn)"
        :class="props.dayNum.TodayIsSignIn === 'true' ? 'btn_disabled' : ''">
        {{ props.dayNum.TodayIsSignIn === 'true' ? '已签到' : '立即签到' }}
      </p> -->
    </div>
    <!-- </section> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
// import img1 from "/img/club/club_diaBtn_1.webp"; // 已签到图片
const img1 = new URL('/logo.png', import.meta.url).href
// import img2 from "@/assets/img/signin/3.png"; // 3天已打开宝箱
// import img3 from "@/assets/img/signin/31.png"; // 3天未打开宝箱
// import img10 from "@/assets/img/signin/32.png"; // 3天当天打开宝箱
// import img4 from "@/assets/img/signin/5.png"; // 5天已打开宝箱
// import img5 from "@/assets/img/signin/51.png"; // 5天未打开宝箱
// import img11 from "@/assets/img/signin/52.png"; // 5天当天打开宝箱
// import img6 from "@/assets/img/signin/7.png"; // 7天已打开宝箱
// import img7 from "@/assets/img/signin/71.png"; // 7天未打开宝箱
// import img12 from "@/assets/img/signin/72.png"; // 7天当天打开宝箱
// import img8 from "@/assets/img/signin/30.png"; // 30天已打开宝箱
// import img9 from "@/assets/img/signin/301.png"; // 30天未打开宝箱
// import img13 from "@/assets/img/signin/302.png"; // 30天当天打开宝箱
const props:any = defineProps({
  markDate: Array,
  markDateMore: Array,
  textTop: Array,
  sundayStart: Boolean,
  agoDayHide: String,
  futureDayHide: String,
  data: Array,
  dayNum: Object,
});
const emit = defineEmits(["clickToday", "signInEvent", "choseDay"]);
// 默认是周一开始
// 当某月的天数
const getDaysInOneMonth = (date: Date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let d = new Date(year, month, 0);
  return d.getDate();
};
// 向前空几个
const getMonthweek = (date: { getFullYear: () => any; getMonth: () => number; }) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dateFirstOne = new Date(year + "/" + month + "/1").getDay();
  return props.sundayStart
    ? dateFirstOne === 0
      ? 7
      : dateFirstOne
    : dateFirstOne === 0
      ? 6
      : dateFirstOne - 1;
};
/**
 * 获取当前日期上个月或者下个月
 */
const getOtherMonth = (date: Date, str = "nextMonth") => {
  let timeArray = dateFormat(date).split("-");
  let year = timeArray[0];
  let month = timeArray[1];
  let day = timeArray[2];
  let year2:string | number = year;
  let month2: string | number;
  if (str === "nextMonth") {
    month2 = parseInt(month) + 1;
    if (month2 === 13) {
      year2 = parseInt(year2) + 1;
      month2 = 1;
    }
  } else {
    month2 = parseInt(month) - 1;
    if (month2 === 0) {
      year2 = parseInt(year2) - 1;
      month2 = 12;
    }
  }
  let day2:number |string = day;
  let days2 = new Date(Number(year2), month2, 0).getDate();
  if (Number(day2) > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = "0" + month2;
  }
  let t2 = year2 + "/" + month2 + "/" + day2;
  return new Date(t2);
};
// 上个月末尾的一些日期
const getLeftArr = (date: any) => {
  let arr = [] as any;
  let leftNum = getMonthweek(date);
  let num = getDaysInOneMonth(getOtherMonth(date, "preMonth")) - leftNum + 1;
  let year = getOtherMonth(date, "preMonth").getFullYear();
  let month = getOtherMonth(date, "preMonth").getMonth() + 1;
  // 上个月多少开始
  for (let i = 0; i < leftNum; i++) {
    let nowTime = year + "/" + month + "/" + (num + i);
    arr.push({
      id: num + i,
      date: dateFormat(nowTime),
      isToday: false,
      otherMonth: "preMonth",
    });
  }
  return arr;
};
// 下个月末尾的一些日期
const getRightArr = (date: any) => {
  let arr = [] as any;
  let nextDate:Date = getOtherMonth(date, "nextMonth");
  let leftLength = getDaysInOneMonth(date) + getMonthweek(date);
  let _length = 7 - (leftLength % 7);
  for (let i = 0; i < _length; i++) {
    let month1 = parseInt(String(nextDate.getMonth() + 1));
    let nowTime = nextDate.getFullYear() + "/" + month1 + "/" + (i + 1);
    arr.push({
      id: i + 1,
      date: dateFormat(nowTime),
      isToday: false,
      otherMonth: "nextMonth",
    });
  }
  return arr;
};
// format日期
const dateFormat = (date: unknown) => {
  var date1:any = typeof date === "string" ? new Date(date) : date;
  var a = date1.getDate();
  var b = date1.getMonth() + 1;
  if (date1.getDate() < 10) {
    a = "0" + a;
  }
  if (date1.getMonth() + 1 < 10) {
    b = "0" + b;
  }
  return date1.getFullYear() + "-" + b + "-" + a;
};
// 获取某月的列表不包括上月和下月
const getMonthListNoOther = (date: any) => {
  let arr = [] as any;
  let num = getDaysInOneMonth(date);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let toDay = dateFormat(new Date());

  for (let i = 0; i < num; i++) {
    let a:string|number = "";
    let b = "";
    if (i + 1 < 10) {
      a = "0" + (i + 1);
    } else {
      a = i + 1;
    }
    if (month < 10) {
      b = "0" + month;
    } else {
      b = month;
    }
    let nowTime = year + "-" + b + "-" + a;
    arr.push({
      id: i + 1,
      date: nowTime,
      isToday: toDay === nowTime,
      otherMonth: "nowMonth",
    });
  }
  return arr;
};
// 获取某月的列表 用于渲染
const getMonthList = (date: Date) => {
  return [
    ...getLeftArr(date),
    ...getMonthListNoOther(date),
    ...getRightArr(date),
  ];
};
const imgUrl = (item: { isToday: any; MonthContinuousDays: string; IsCliamedReward: string; WeekContinuousDay: string | number; futureDate: any; gou: boolean; }) => {
  let img: any;
  if (item.isToday) {
    // 如果是今天
    item.MonthContinuousDays === "30"
      ? item.IsCliamedReward === "true"
        ? (img = state.imgs.now[item.MonthContinuousDays])
        : (img = state.imgs.future[item.MonthContinuousDays])
      : item.IsCliamedReward === "true"
        ? (img = state.imgs.now[item.WeekContinuousDay] || img1)
        : (img = state.imgs.future[item.WeekContinuousDay] || img1);
  } else {
    // 如果不是当天
    if (item.futureDate) {
      // 如果是未来时间
      item.MonthContinuousDays === "30"
        ? (img = state.imgs.future[item.MonthContinuousDays])
        : (img = state.imgs.future[item.WeekContinuousDay] || img1);
    } else {
      // 如果是过去时间
      if (item.IsCliamedReward === "false") {
        // 如果未领取
        item.MonthContinuousDays === "30"
          ? (img = state.imgs.formerly[item.MonthContinuousDays])
          : (img = state.imgs.formerly[item.WeekContinuousDay] || img1);
      } else {
        // 如果领取了
        item.MonthContinuousDays === "30"
          ? (img = state.imgs.now[item.MonthContinuousDays])
          : (img = state.imgs.now[item.WeekContinuousDay] || img1);
      }
    }
  }
  img === img1 && (item.gou = true);
  return img;
};
// const setSignIn = (e: string) => {
//   e !== "true" && emit("signInEvent", true);
// };
// const intStart = () => {
//   // 周日开始
//   sundayStart = props.sundayStart;
// };
const setClass = (data: { markClassName: string | number; }) => {
  // 设置class样式
  let obj:any = {};
  obj[data.markClassName] = data.markClassName;
  return obj;
};
const clickDay = (item: { otherMonth: string; dayHide: any; date: any; }, _index: any) => {
  // 点击时间
  if (item.otherMonth === "nowMonth" && !item.dayHide) {
    getList(state.myDate, item.date);
  }
  if (item.otherMonth !== "nowMonth") {
    item.otherMonth === "preMonth" ? PreMonth(item.date) : NextMonth(item.date);
  }
};
// const ChoseMonth = (date: string | number | Date, isChosedDay = true) => {
//   date = dateFormat(date);
//   state.myDate = new Date(date);
//   //   emit("changeMonth", dateFormat(state.myDate));
//   if (isChosedDay) {
//     getList(state.myDate, date, isChosedDay);
//   } else {
//     getList(state.myDate);
//   }
// };
const PreMonth = (date: string, isChosedDay = true) => {
  date = dateFormat(date);
  state.myDate = getOtherMonth(state.myDate, "preMonth");
  //   emit("changeMonth", date); // 格式化时间
  if (isChosedDay) {
    getList(state.myDate, date, isChosedDay);
  } else {
    getList(state.myDate);
  }
};
const NextMonth = (date: string, isChosedDay = true) => {
  date = dateFormat(date);
  state.myDate = getOtherMonth(state.myDate, "nextMonth");
  //   emit("changeMonth", dateFormat(state.myDate));
  if (isChosedDay) {
    getList(state.myDate, date, isChosedDay);
  } else {
    getList(state.myDate);
  }
};
const forMatArgs = () => {
  let markDate:any = props.markDate;
  let markDateMore:any = props.markDateMore;
  markDate = markDate.map((k: any) => {
    return dateFormat(k);
  });
  markDateMore = markDateMore.map((k: any) => {
    k.date = dateFormat(k.date);
    return k;
  });
  return [markDate, markDateMore];
};
const getList = (date: Date, chooseDay?: any, _isChosedDay = true) => {
  let [markDate, markDateMore] = forMatArgs();
  state.dateTop = `${date.getMonth() + 1}月签到日历`; // 标题
  let arr = getMonthList(state.myDate); // 获取当月时间
  let today = new Date();
  let year = today.getFullYear(); // 今天哪一年
  let tadayDate = today.getDate(); // 今天几号
  let tadayMonth = today.getMonth() + 1; // 今天属于几月

  for (let i = 0; i < arr.length; i++) {
    let markClassName = ""; // 增加类名
    let k = arr[i];

    let c = k.date.substr(0, 4); // 年
    let a = k.date.substr(5, 2); //  月
    let b = k.date.substr(8, 2); // 日

    if (Number(c) > year) {
      k.futureDate = true;
    } else if (Number(a) >= tadayMonth && Number(b) > tadayDate) {
      k.futureDate = true;
    }
    props.data.map((e: { img: boolean; SignDate: any; }) => {
      // 将数据库返回的数据合并
      e.img = true;
      e.SignDate === k.date && Object.assign(k, e);
    });
    k.chooseDay = false; // 设置当前选择的天都为没选中
    let nowTime = k.date;
    let t = new Date(nowTime).getTime() / 1000; // 将每天转换为时间戳
    // 看每一天的class
    for (let c of markDateMore) {
      if (c.date === nowTime) {
        markClassName = c.className || "";
      }
    }
    // 标记选中某些天 设置class
    k.markClassName = markClassName;
    k.isMark = markDate.indexOf(nowTime) > -1;
    // 无法选中某天
    k.dayHide = t < props.agoDayHide || t > props.futureDayHide;
    if (k.isToday) {
      emit("clickToday", k);
    }
    let flag = !k.dayHide && k.otherMonth === "nowMonth";
    if (chooseDay && chooseDay === nowTime && flag) {
      emit("choseDay", k);
      state.historyChose.push(nowTime);
      k.chooseDay = true;
    } else if (
      state.historyChose[state.historyChose.length - 1] === nowTime &&
      !chooseDay &&
      flag
    ) {
      k.chooseDay = true;
    }
  }
  state.list = arr;
};
const state:any = reactive({
  discountData: "",
  active: 0,
  myDate: new Date(), // 得到今天的时间,
  list: [],
  historyChose: [],
  dateTop: "",
  clickItem: {},
  imgs: {
    formerly: {
      // 过去
      // 3: img3,
      // 5: img5,
      // 7: img7,
      // 30: img9,
    },
    now: {
      // 现在
      // 3: img2,
      // 5: img4,
      // 7: img6,
      // 30: img8,
    },
    future: {
      // 3: img10,
      // 5: img11,
      // 7: img12,
      // 30: img13,
    },
  },
});
onMounted(async () => {
  getList(state.myDate);
});
watch(
  () => props.data,
  (_n, _l) => {
    getList(state.myDate);
  },
  {
    deep: true,
  }
);
watch(
  () => props.markDate,
  (_e) => {
    getList(state.myDate);
  },
  {
    deep: true,
  }
);
watch(
  () => props.markDateMore,
  (_e) => {
    getList(state.myDate);
  },
  {
    deep: true,
  }
);
watch(
  () => props.agoDayHide,
  (_e) => {
    getList(state.myDate);
  },
  {
    deep: true,
  }
);
watch(
  () => props.futureDayHide,
  (_e) => {
    getList(state.myDate);
  },
  {
    deep: true,
  }
);
watch(
  () => props.sundayStart,
  (_e) => {
    // intStart();
    getList(state.myDate);
  },
  {
    deep: true,
  }
);
</script>


<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

table,
td,
th {
  border-collapse: collapse;
}

.wh_container {
  max-width: 100%;
  margin: auto;
}

li {
  list-style-type: none;
}

.wh_top_changge {
  display: flex;
  // background: #130b35;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;

  li {
    cursor: pointer;
    display: flex;
    font-size: 0.4rem;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 1.2rem;
  }

  .wh_content_li {
    cursor: auto;
    flex: 2.5;
  }
}

.wh_content_all {
  // font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
  //   "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  color: #574949;
  width: 100%;
  overflow: hidden;
  padding-bottom: 0.2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(172, 177, 223, 0.3);
  border: solid 1px #fff;
  background-image: linear-gradient(to bottom, #edeef9 100%, #fff 80%);
}

.wh_content {
  display: flex;
  flex-wrap: wrap;
  /* padding: 0 3% 0 3%; */
  width: 100%;
  // background: #23175a;
}

.div1 {
  // background: #1c114b;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 0.4rem;
}

.wh_content_item,
.wh_content_item_tag {
  font-size: 0.3rem;
  width: 14.28%;
  text-align: center;
  position: relative;
}

.wh_content_item {
  >.wh_isMark {
    margin: auto;
    border-radius: 2.6rem;
    background: blue;
    z-index: 2;
  }

  .wh_other_dayhide {
    color: #170d40;
  }

  .wh_want_dayhide {
    color: #bfbfbf;
  }

  .wh_isToday {
    background: #b4afcf;
  }

  .wh_chose_day {
    background: #b4afcf;
  }
}

th {
  border-collapse: collapse;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    // border: 0.02rem solid #170d40;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: left top;
    transform-origin: left top;
  }
}

.wh_top_tag {
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_item_date {
  height: 0.65rem;
  line-height: 0.65rem;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  i {
    display: inline-block;
    width: 0.4rem;
    height: 0.32rem;
    background-image: url("../assets/img/signin/gou.png");
    background-size: contain;
    position: absolute;
    bottom: 0;
    right: -0.02rem;
  }
}

.wh_jiantou1 {
  width: 0.3rem;
  height: 0.3rem;
  border-top: 0.05rem solid #574949;
  border-left: 0.05rem solid #574949;
  transform: rotate(-45deg);
  cursor: pointer;
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}

.wh_jiantou2 {
  cursor: pointer;
  width: 0.3rem;
  height: 0.3rem;
  border-top: 0.05rem solid #574949;
  border-right: 0.05rem solid #574949;
  transform: rotate(45deg);
}

.sign_text {
  font-size: 15px;
  margin: 0.2rem 0.2rem 0.3rem;
  letter-spacing: 0.05rem;

  b {
    margin: 0 0.1rem;
    color: #dca42b;
  }
}

.btn {
  border-radius: 0.2rem;
  padding: 0.07rem 0.2rem;
  text-align: center;
  line-height: 1.3;
  color: #574949;
  border-radius: 22px;
  box-shadow: 0 5px 5px 0 rgba(119, 135, 165, 0.2), inset -1px 1px 0 0 rgba(255, 255, 255, 0.7), inset 1px 1px 0 0 rgba(255, 255, 255, 0.7);
  border-style: solid;
  border-width: 1px;
  border-image-source: linear-gradient(to bottom, rgba(119, 135, 165, 0.2), rgba(119, 135, 165, 0.38));
  border-image-slice: 1;
  background-image: radial-gradient(circle at 50% 97%, #fff, rgba(255, 255, 255, 0)), linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0) 32%), linear-gradient(to top, #fff 100%, #e5e9f1 50%, #fff), linear-gradient(to bottom, #e6e6eb, #e6e6eb), linear-gradient(to bottom, rgba(119, 135, 165, 0.2), rgba(119, 135, 165, 0.38));
  float: right;
  font-size: 0.3rem;

  i {
    font-style: normal;
  }
}

.btn1 {
  width: 75%;
  font-size: 0.35rem;
  text-align: center;
  height: 40px;
  line-height: 40px;
  border-radius: 44px;
  box-shadow: 0 5px 12px 0 rgba(244, 118, 104, 0.25);
  background-image: linear-gradient(#febbbb, #fe7474, #febbbb);
  color: #fff;
  margin: 0 auto;
  background-origin: border-box;
  background-clip: content-box, content-box, content-box, border-box;
}

.btn_disabled {
  background-color: #aaa06a;
}</style>
