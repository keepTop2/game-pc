<!-- 代理合作 -->
<template>
    <!-- <n-modal v-model:show="showModal" :mask-closable="false"> -->
    <div class="proxy_coop">

        <!-- 概览 -->
        <div class="content bg_color">
            <div class="model_box_content content_box" style="border-bottom:1px solid #322C59;">
                <div class="item item_margin">
                    <span class="item_title">{{ t('proxy_page_casino') }}：</span>
                    <span>{{ proxyInfo.level == 0 ? t('wanjia') : IdentityMap[proxyInfo.level] }}</span>
                </div>
                <div class="item item_margin">
                    <span class="item_title">{{ t('proxy_page_casinoFc') }}：</span>
                    <span>{{ !proxyInfo.level ? '0%(VND)' : proxyInfo.ratio ? `${proxyInfo.ratio * 100}%(VND)` :
                        '0%(VND)' }} </span>
                </div>
            </div>
            <div class="model_box_content content_box">
                <div class="item">
                    <span class="item_title">{{ t('proxy_page_commission') }}：</span>
                    <span class="orange">{{ !proxyInfo.level ? '--' : ((proxyInfo.personal_money + proxyInfo.team_money)
                        ||
                        '0') }}</span>
                </div>
                <div class="item">
                    <!-- <span class="item_title">{{ t('proxy_page_clubCommission') }}：</span> -->
                    <span class="item_title">{{ t('Direct commission') }}：</span>
                    <span class="orange">{{ !proxyInfo.level ? '--' : (proxyInfo.personal_money || '0') }}</span>
                </div>
                <div class="item">
                    <!-- <span class="item_title">{{ t('proxy_page_dcCommission') }}：</span> -->
                    <span class="item_title">{{ t('Team commission') }}：</span>
                    <span class="orange">{{ !proxyInfo.level ? '--' : (proxyInfo.team_money || '0') }}</span>
                </div>
                <!-- 按钮们 -->
                <div class="btns">
                    <div class="item">
                        <n-flex align="center" justify="center" class="button button_color" @click="toProxyRecord">
                            {{ t('mine_myaudit') }}
                        </n-flex>
                    </div>
                    <div class="item">
                        <n-flex align="center" justify="center" class="button button_color" @click="claim">
                            {{ t('WithDraw_Commission') }}
                        </n-flex>
                    </div>
                </div>
            </div>
        </div>

        <!-- 推广链接 -->
        <n-flex class="link_box" justify="center" align="center">
            <span>{{ t('proxy_page_url') }}：</span>
            <a v-if="proxyInfo.s_link" :href="proxyInfo.s_link" target="_blank">{{ proxyInfo.s_link }}</a>
            <span v-else> -- </span>
            <n-flex align="center" justify="center" class="button n-button"
                @click="copyToClipboard(proxyInfo.s_link)">{{ t('proxy_page_copy') }}
            </n-flex>
            <n-flex align="center" justify="center" class="button n-button" style="width: 140px;" @click="openIntro">{{
                t('proxy_page_agentRule') }}
            </n-flex>
        </n-flex>

        <!-- 表格 -->
        <cooperationTable :proxyInfo="proxyInfo" />
    </div>
    <!-- </n-modal> -->
</template>

<script setup lang='ts'>
import { ref, onUnmounted } from 'vue';
import cooperationTable from "@/components/cooperationTable.vue"
import { Net } from "@/net/Net";
import { NetPacket } from "@/netBase/NetPacket";
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import { IdentityMap } from "@/enums/proxyEnum";
import { Message } from "@/utils/discreteApi";
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router';
// import Imgt from '@/components/Imgt.vue';

const { t } = useI18n()
const router = useRouter();
// const emits = defineEmits(['openIntro'])
const openIntro = () => {
    // emits('openIntro');
    // closeModal()
    router.push('/wallet/proxyIntroduction')
}

// const showModal = ref(false)
// const openModal = () => { // 打开
//     showModal.value = true
//     queryData()
// }
// const closeModal = () => { // 关闭
//     showModal.value = false
// }

const proxyInfo: any = ref({})


const queryData = () => { // 查询
    const query = NetPacket.req_daily_return_info()
    Net.instance.sendRequest(query);
}
queryData()
const resultHandle = (rs: any) => {
    proxyInfo.value = rs || {}
    console.error('proxyInfo', proxyInfo.value)
}

// 提款
const claim = () => {
    if (!agentTip()) return
    const query = NetPacket.req_daily_return_claim()
    Net.instance.sendRequest(query);
}
const claimHandle = (rs: any) => {
    if (rs.result === 0) {
        Message.success(t('promo_page_applySuc'))
        queryData()
    } else {
        Message.error(t('Insufficient Commission'))
    }
}

// 回执监听
MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_daily_return_info,
    resultHandle,
);
MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_daily_return_claim,
    claimHandle,
);
onUnmounted(() => {
    // 取消监听
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_daily_return_info, null);

});

// 非下级代理时 提示：您还不是代理，请联系上级
const agentTip = () => {
    if (proxyInfo.value.level == 0) {
        Message.error(t('proxy_page_notAgent'))
        return false
    }
    return true
}
const toProxyRecord = () => {
    if (!agentTip()) return
    router.push({ name: 'proxyRecord' })
}

const copyToClipboard = (text: string) => {
    if (!agentTip()) return
    // 检查浏览器是否支持 Clipboard API
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            Message.success(t('proxy_page_copyFinish'))
        }).catch(() => {
            Message.error(t('proxy_page_copyFail'))
        });
    } else {
        // 使用旧方法进行复制
        const textArea = document.createElement('textarea');
        textArea.value = text;
        // 避免影响页面布局
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        document.body.appendChild(textArea);
        // 选择并复制文本
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                Message.success(t('proxy_page_copyFinish'))
            } else {
                Message.error(t('proxy_page_copyFail'))
            }
        } catch (err) {
            Message.error(t('proxy_page_copyFail'))
        }
        // 移除临时文本区域
        document.body.removeChild(textArea);
    }
}

// defineExpose({
//     openModal
// })
</script>

<style lang='less' scoped>
@import '@/assets/recordPage.less';
@import '@/assets/modelBox.less';
@timestamp: `new Date().getTime()`;

.proxy_coop {
    margin-top: 20px;
    width: 100%;
    // padding: 20px 30px 40px 30px;
    box-sizing: border-box;
    user-select: none;

    .content {
        padding: 20px 40px;
        margin-bottom: 20px;
        border: 1px solid #322C59;
        border-radius: 12px;
    }

    .content_box {
        font-size: 16px;
        margin-top: 20px;
        display: flex;
        line-height: 16px;
        padding-bottom: 12px;
        align-items: center;

        .item {
            width: 50%;
            color: #fff;

            .item_title {
                font-weight: 400;
                color: #AEAEB0;
            }

            .green {
                color: #80FF44;
            }

            .orange {
                color: #FABB2D;
            }
        }

        .item_margin {
            margin-bottom: 20px;
        }

        .btns {
            display: flex;

            .item {
                &:first-child {
                    margin-right: 20px;
                }

                .button {
                    background: #282747 !important;
                    font-size: 18px;
                    border-radius: 12px;
                    box-shadow: 0.5px 0.5px 1px 0px #424164 inset;
                }
            }
        }
    }

    .link_box {
        font-size: 18px;
        margin: 40px 0 40px 0;
        gap: none;
        color: #fff;

        .button {
            height: 40px;
            font-size: 18px;
        }

        a {
            color: #5971FF;
            background: linear-gradient(to bottom, #5567FF, #9E1EFF);
            background-clip: text;
            color: transparent;
            display: inline-block;
            position: relative;

            &::after {
                content: '';
                display: block;
                height: 3px;
                background: linear-gradient(to bottom, #5567FF, #9E1EFF);
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
            }
        }
    }

    .btn {
        width: 156px;
        height: 42px;
        cursor: pointer;
        background: url('/img/home/btnBG.webp?t=@{timestamp}') no-repeat;
        background-size: 100% 112%;
        color: #fff;
        justify-content: center;
        padding: 0 10px;
        display: flex;
        align-items: center;
        text-align: center;

        .icon {
            margin-right: 5px;
            font-size: 18px;
        }

        span {
            text-align: center;
        }
    }

    .link_btn {
        line-height: 1;
    }
}
</style>
