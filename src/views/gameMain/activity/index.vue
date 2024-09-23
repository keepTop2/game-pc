<template>
    <div class="activity">
        <div class="activity_img">
            <div v-for="(item, i) in activityTitleList[state.name]" :key="i">
                <Imgt @click="popDetail(item)" :src="activityDetail(String(item.name))"
                    v-if="activityDetail(String(item.name))" />

            </div>

        </div>
        <n-modal v-model:show="state.showModal">
            <n-card :title="t('activity_page_detail')" closable @close="state.showModal = false" :bordered="false"
                size="huge" role="dialog" aria-modal="true">
                <Imgt v-if="state.detailImg" :src="t(state.detailImg)" />
            </n-card>
        </n-modal>
        <!-- <Calendar class="calendar" :markDate="[]" :markDateMore="state.arr" @clickToday="clickToday" agoDayHide="1530115221"
      @signInEvent="signInEvent" @choseDay="clickDay" :data="state.dataList" :sundayStart="false" :dayNum="state.dayNum">
    </Calendar> -->
    </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, watch } from 'vue';
import Imgt from '@/components/Imgt.vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Page } from '@/store/page';
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
// import Calendar from '@/components/Calendar.vue'
const { activityTitleList } = storeToRefs(Page(pinia));
const { t } = useI18n();
// const router = useRouter();
const route = useRoute();
const activityDetail = (item: string) => {
    let str1 = item.split('_')
    let str2 = ''
    if (str1.length > 0) {
        str2 = str1[0] + '_pc_' + str1[1] + '_' + str1[2]
    }
    if (t(str2).indexOf('http') != -1) {
        return t(str2)
    } else {
        return ''
    }

}

const state: any = reactive({
    name: '',
    link: '',
    showModal: false,
    detailImg: null,
})
const popDetail = (item: any) => {
    state.detailImg = null
    state.showModal = true
    state.detailImg = activityDetail(item.content)
}
// const closeToast = (header: string, img: string, msg: string) => {
//   state.toastText = {
//     header: header,
//     isShow: true,
//     img: img,
//     msg: msg
//   }
//   setTimeout(() => {
//     state.toastText = {
//       header: '',
//       isShow: false, // toast 控制
//       img: '', // toast 显示图片
//       msg: '' // toast 提示语
//     }
//   }, 3000)
// }
// const signInEvent = async () => {
//   if (state.activeDate.IsSignIn === 'true') {
//     return closeToast('签到失败', '', '今日已签到')
//   }
//   let str = state.activeDate.date.split('-') // 点击的时间
//   let today = new Date()
//   let year = today.getFullYear() // 今天哪一年
//   let tadayDate = today.getDate() // 今天几号
//   let tadayMonth = today.getMonth() + 1 // 今天属于几月
//   if (Number(str[0]) > year) {
//     return closeToast('签到失败', '', '未到活动时间')
//   } else if (Number(str[0]) < year && Number(str[1]) !== 12) {
//     return closeToast('签到失败', '', '选择时间有误')
//   } else if (Number(str[0]) < year && Number(str[1]) === 12) {
//     // sign()
//   } else {
//     if (Number(str[1]) > tadayMonth || Number(str[2]) > tadayDate) {
//       return closeToast('签到失败', '', '未到活动时间')
//     } else {
//     //   sign()
//     }
//   }
// }
// const clickToday = (data: any) => {
//   if (!state.flag) {
//     state.activeDate = data
//     state.flag = true
//     // console.log('跳到了本月今天', data) // 跳到了本月
//   }
// }
// const clickDay = (data: any) => {
//   state.activeDate = data
// }
onMounted(() => {
    state.name = route.query.typeName
});

watch(
    () => route.query,
    (n) => {

        state.name = n.typeName
    }
)
</script>

<style lang='less' scoped>
.activity {

    width: 1200px;

    .activity_img {
        margin-top: 20px;

        img {
            width: 1200px;
            height: 200px;
            margin-bottom: 20px;
        }

    }
}
</style>