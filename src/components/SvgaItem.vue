<template>
    <div class="svga_item">
        <img v-show="!active" :src="`/svga/${props.name}.png`" alt="" />
        <canvas v-show="active" :id="`canvas-${props.name}-${props.keyStr}`"></canvas>
    </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { Parser, Player } from 'svga'

const props: any = defineProps({
    name: {
        type: String,
        default: 'hot'
    },
    active: {
        type: Boolean,
        default: false
    },
    keyStr: {
        type: [String, Number],
        default: ''
    },
    loopNumber: {
        type: Number,
        default: 0
    },
    endFrame: {
        type: Number,
        default: 0
    }
})


let player: any = null
const initPlayer = async () => {
    if (player) {
        player.start()
    } else {
        const parser = new Parser()
        const svga = await parser.load(`/svga/${props.name}.svga`)
        player = new Player({
            container: document.getElementById(`canvas-${props.name}-${props.keyStr}`) as any,
            // startFrame: 2,
            loop: props.loopNumber,
            isCacheFrames: true,
            endFrame: props.endFrame,
        })
        await player.mount(svga)
        // player.onStart = () => console.log('onStart')
        // player.onResume = () => console.log('onResume')
        // player.onPause = () => console.log('onPause')
        // player.onStop = () => console.log('onStop')
        // player.onProcess = () => console.log('onProcess', player.progress)
        // player.onEnd = () => console.log('onEnd')

        // 开始播放动画
        player.start()
    }
}

watch(() => props.active, val => {
    if (val) {
        initPlayer()
    } else {
        try {
            player.stop()
        } catch { }
    }
}, { immediate: true })
</script>

<style lang="less" scoped>
.svga_item {
    width: 100%;
    height: 100%;
    position: relative;

    img {
        width: 100%;
        height: 100%;
    }

    canvas {
        width: 100%;
        height: 100%;
    }
}
</style>