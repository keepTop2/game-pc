<!-- 层级管理弹窗 -->
<template>
    <!-- 奖励派发说明 -->
    <ModalDialog v-model:visible="showModal" title="proxy_page_tagManage">
        <template #content>
            <div class="model_box level_manage">
                <div class="model_box_content content">
                    <div class="subtitle">{{ t('proxy_page_account') }}</div>
                    <div class="item" style="padding: 0 16px">{{ levelInfo.username || '--' }}</div>
                    <div class="subtitle">{{ t('proxy_page_agentCj') }}</div>
                    <n-select class="item" v-model:value="level" :options="levels" />
                    <div class="tip">{{ t('proxy_page_tips') }}</div>
                    <div class="btns">
                        <!-- <div class="btn" @click="closeModal">{{ t('proxy_page_close') }}</div> -->
                        <div class="btn n-button" @click="submitData">{{ t('proxy_page_modify') }}</div>
                    </div>
                </div>
            </div>
        </template>
    </ModalDialog>
</template>

<script setup lang='ts'>
import { ref, computed, onUnmounted } from 'vue';
import { IdentityMap } from "@/enums/proxyEnum";
import { Net } from "@/net/Net";
import { NetPacket } from "@/netBase/NetPacket";
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import { Message } from "@/utils/discreteApi";
import { useI18n } from "vue-i18n";
import ModalDialog from '@/components/ModalDialog.vue';

const { t } = useI18n()
const emits = defineEmits(['success'])
const props = defineProps({
    proxyInfo: {
        type: Object,
        default: () => { }
    }
})

const loading = ref(false)
const showModal = ref(false)
const level = ref('0')
const levelInfo: any = ref({}) // 会员层级数据

// 1.除实习厅主，其他代理等级设置下级时，必须比自己等级低，不能同样等级
// 2.实习厅主，可以把他的直属玩家设置为与自己等级相同的实习厅主
const levels: any = computed(() => {
    const arr: any = []
    Object.keys(IdentityMap).map((key: string) => {
        if ((levelInfo.value.level || 0) <= Number(key) && key < props.proxyInfo.level) {
            arr.push({ label: IdentityMap[key], value: key })
        }
    })
    if (props.proxyInfo.level == 1) {
        arr.push({ label: IdentityMap[1], value: '1' })
    }
    return arr
})

const openModal = (info: any) => {
    level.value = info.level.toString()
    levelInfo.value = info || {}
    showModal.value = true
}
const closeModal = () => {
    showModal.value = false
}


const submitData = () => { // 提交
    if (loading.value) return
    const query = NetPacket.req_improve_agent_lev()
    query.role_id = levelInfo.value.role_id
    query.level = level.value
    loading.value = true
    Net.instance.sendRequest(query);
}
const resultHandle = (rs: any) => {
    setTimeout(() => {
        loading.value = false
    }, 300)
    if (rs && rs.result) {
        closeModal()
        Message.success(t('proxy_page_caoZuo'))
        emits('success')
    }
}

// 回执监听
MessageEvent2.addMsgEvent(
    NetMsgType.msgType.msg_notify_improve_agent_lev,
    resultHandle,
);
onUnmounted(() => {
    // 取消监听
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_improve_agent_lev, null);

});

defineExpose({
    openModal
})
</script>

<style lang='less' scoped>
@import '@/assets/modelBox.less';
@timestamp: `new Date().getTime()`;

.level_manage {
    width: 500px;
    border-radius: 14px;
    user-select: none;

    .box_title_close {
        cursor: pointer;
    }

    .content {
        padding: 40px 60px;
        font-size: 16px;


        .subtitle {
            margin-bottom: 10px;
        }

        .item {
            margin-bottom: 20px;
            width: 100%;
            height: 40px;
            line-height: 40px;
            border-radius: 12px;
            box-sizing: border-box;
            // background-color: #1D0E4A;
            color: #fff;
            border: #AEAEB0 solid 2px;
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.4) inset;

            ::v-deep(.n-base-selection) {
                background-color: rgba(0, 0, 0, 0) !important;

                .n-base-selection-label {
                    background-color: rgba(0, 0, 0, 0) !important;
                    border: none;
                }
            }

            ::v-deep(.n-base-selection__border) {
                border: none;
            }

            ::v-deep(.n-base-selection__state-border) {
                border: none;
            }
        }

        .tip {
            margin-bottom: 40px;
            color: #AEAEB0;
            text-align: right;
        }

        .btns {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .btn {
                width: 100%;
                height: 40px;
                font-size: 18px;
                color: #EBEFFF;
                cursor: pointer;
                margin-left: 0;
            }

        }
    }
}
</style>
