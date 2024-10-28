<!-- 系统公告 -->
<template>
    <div class="notice_dialog" :class="['notice_dialog_' + noticeList[currentIndex].type]">
        <!-- <Imgt class="close_icon" @click="closeDialog" src="/img/dialog/close.png" alt="X" /> -->
        <div class="close close_icon abs center pointer t-sm" @click="closeDialog">
        </div>
        <!-- 头部装饰 -->
        <div class="notice_title">
            <span class="title">{{ noticeTitle }}</span>
        </div>

        <!-- 轮播 -->
        <div class="notice_body">
            <n-carousel ref="carouselRef" @update:current-index="(e: any) => currentIndex = e" centered-slides
                :show-dots="false" style="width: 100%;height: 200px;" effect="card" draggable>
                <div class="info_box" v-for="(item, i) in noticeList" :key="i">
                    <div style="margin-bottom:20px" v-if="item.title">{{ t(item.title) }}</div>
                    <div class="notice_content">{{ t(item.content) }}</div>
                </div>
            </n-carousel>
        </div>

        <!-- 按钮 -->
        <!-- <div class="notice_btn" @click="closeDialog">{{ t('home_page_confirm') }}</div> -->
        <!-- <div class="notice_readed">
            <n-checkbox v-model:checked="readed">
                <span>{{ t('home_page_notice_donttip') }}</span>
            </n-checkbox>
        </div> -->
        <div class="btns">
            <div class="btn n-button" @click="confirmHandler">{{ t('home_page_confirm') }}</div>
        </div>

        <ul class="custom-dots">
            <li v-for="index of noticeList.length" :key="index" :class="{ ['is-active']: currentIndex === index - 1 }"
                @click="to(index - 1)" />
        </ul>
    </div>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue';
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { User } from '@/store/user';
import { useI18n } from "vue-i18n";
// import Imgt from '@/components/Imgt.vue';

const { t } = useI18n();

const userInfo = User(pinia);
const { noticeList } = storeToRefs(userInfo);

// console.error(noticeList.value)
const readed = ref(false)

const currentIndex = ref(0)
const carouselRef = ref()
const to = (i: any) => {
    carouselRef.value.to(i)
}

// type: 公告类型:0=一般公告，1=维护公告，2=系统公告,
const noticeTitleMap: any = {
    0: t('home_page_notice_title'),
    1: t('home_page_notice_fixtitle'),
    2: t('home_page_notice_systitle'),
}
const noticeTitle = computed(() => {
    return noticeTitleMap[noticeList.value[currentIndex.value].type] || t('home_page_notice_title')
})

const confirmHandler = () => {
    readed.value = true
    closeDialog()
}

const closeDialog = () => { // 关闭弹窗
    try {
        to(0)
    } catch { }
    if (readed.value) { // 缓存下已读列表
        let localIds = []
        try {
            localIds = JSON.parse(localStorage.getItem('readed_notice_ids') || '[]')
        } catch {
            localIds = []
        }
        localIds.push(...noticeList.value.map((item: any) => item.title))

        if (localIds.length > 100) { // 最多保留100条id
            localIds = localIds.slice(localIds.length - 100, localIds.length)
        }

        localStorage.setItem('readed_notice_ids', JSON.stringify(localIds))
    }
    User(pinia).setNotice(false)
}

</script>

<style lang='less' scoped>
@timestamp: `new Date().getTime()`;

.notice_dialog {
    position: relative;
    border-radius: 16px;
    background-image: url('/img/home/notice_bg_0.png?t=@{timestamp}');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 500px;
    min-height: 400px;
    padding: 20px 40px 50px 40px;
    display: flex;
    user-select: none;
    flex-direction: column;

    .close_icon {
        width: 40px;
        height: 40px;
        position: absolute;
        font-size: 24px;
        right: 5px;
        top: 10px;
        cursor: pointer;
    }

    .notice_title {
        // height: 60px;
        position: relative;

        .title {
            color: #fff;
            font-size: 24px;
            font-weight: 900;
            // top: 20px;
            left: 0;
        }
    }

    .notice_body {
        flex: 1;
        color: #fff;
        font-size: 16px;
        line-height: 22px;
        margin: 50px 0 10px;

        .info_box {
            width: 100%;
            height: 100%;
            overflow-y: auto;
            // background-color: #231353;

            .notice_content {
                color: #AEAEB0;
            }
        }


    }

    .notice_btn {
        font-size: 18px;
        width: 100%;
        height: 45px;
        cursor: pointer;
        background: url('/img/home/btnBG3.webp?t=@{timestamp}') no-repeat;
        background-size: 100% 112%;
        color: #fff;
        justify-content: center;
        align-items: center;
        display: flex;
        font-size: 18px;
    }

    .notice_readed {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 21px;

        span {
            color: #fff;
        }
    }

    .btns {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .btn {
            width: 80%;
            height: 40px;
            text-align: center;
            font-size: 18px;
            color: #EBEFFF;
            cursor: pointer;
            margin-left: 0;
        }

    }




    .custom-dots {
        display: flex;
        margin: 0;
        padding: 0;
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
    }

    .custom-dots li {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin: 0 3px;
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 0.5);
        transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
    }

    .custom-dots li.is-active {
        width: 40px;
    }
}

.notice_dialog_1 {
    background-image: url('/img/home/notice_bg_1.png?t=@{timestamp}');
}

.notice_dialog_2 {
    background-image: url('/img/home/notice_bg_2.png?t=@{timestamp}');
}
</style>
