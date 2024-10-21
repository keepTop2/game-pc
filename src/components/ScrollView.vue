<template>
    <!-- 滚动组件 -->

    <div :class="{ wrapper: true, x: props.scrollX }" class="wrapper" ref="wrapper">
        <div class="content" :class="{ 'pt': hasTabbar }">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { onBeforeUnmount } from 'vue';
// import ObserveImage from '@better-scroll/observe-image'
import Pullup from '@better-scroll/pull-up'

import { useRoute } from 'vue-router';
const route = useRoute();
let wrapper: any = ref()
BScroll.use(ObserveDOM)
// BScroll.use(ObserveImage)
const hasTabbar = ref(false)
let bscroll: any
const emit = defineEmits(['ckick', 'beforeScroll', 'afterScroll', 'scroll'])
const props = defineProps({
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
        type: Number,
        required: false,
        default: 1
    },

    /**
     * 是否开启横向滚动，默认纵向滚动。
     * 开启横向滚动需要将传入元素设置为横向例如：display:inline-block
     */
    scrollX: {
        type: Boolean,
        required: false,
        default: true
    },

    /**
     * 点击列表是否派发click事件
     */
    click: {
        type: Boolean,
        default: true
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
        type: Boolean,
        default: false
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
        type: Function,
        default: null
    },

    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
        type: Boolean,
        default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    afterScroll: {
        type: Boolean,
        default: false
    },

})



onBeforeUnmount(() => {
    wrapper = null
    bscroll = null;
    console.log(bscroll);

})
const init = () => {
    if (props.pullup) BScroll.use(Pullup)
    bscroll = new BScroll(wrapper.value, {
        scrollX: props.scrollX,
        probeType: props.probeType,
        useTransition: false,
        click: props.click,
        observeDOM: true,
        observeImage: true,
        mouseWheel: true,
        pullDownRefresh: {
            stop: 56,
            threshold: 70,
        },
        pullUpLoad: {
            threshold: -20
        }
    })


    /**
     * 如果开启了滚动前事件派发
     */
    if (props.beforeScroll) {
        bscroll.on('beforeScrollStart', () => {
            emit('beforeScroll')
        })
    }

    /**
     * 如果开启了滚动(滚动中)事件派发
     */
    if (props.listenScroll) {
        bscroll.on('scroll', (position: any) => {
            emit('scroll', position)
            console.log(position)
        })
    }

    /**
     * 如果开启了滚动结束事件派发
     */
    if (props.beforeScroll) {
        bscroll.on('scrollEnd', () => {
            emit('afterScroll')
        })
    }

    if (props.pullup !== null) {
        bscroll.on('pullingUp', () => {
            try {
                props.pullup().then(() => {
                    bscroll.finishPullUp()
                })
            } catch (e) {
                // 传入非 Promise 函数
                bscroll.finishPullUp()
            }
        })
    }


}
onMounted(() => {

    hasTabbar.value = ['activity', 'me', 'trans'].includes(String(route.name))
    setTimeout(() => {
        init()
    }, 20);

})

// watch(() => props.total, () => {

//     setTimeout(() => {
//         bscroll.refresh();
//     }, 200);
// })

</script>



<style lang="less" scoped>
.wrapper {
    overflow: hidden;

    .content {
        display: block;

    }

    .pt {
        padding-bottom: 100px;
    }

    // 开启横向滚动
    &.x {
        white-space: nowrap;

        .content {
            display: inline-block;

        }
    }
}
</style>
