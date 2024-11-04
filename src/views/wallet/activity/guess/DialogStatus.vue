<!-- 各种状态弹窗 -->
<template>
    <n-modal class="tips_sm_modal" :show="show" :mask-closable="false">
        <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <div class="form_container vertical">
                <div class="header rel center">
                    <span>分享</span>
                    <span class="close abs center pointer t-sm" @click="show = false">
                        <iconpark-icon icon-id="tanctongyguanb" color="#fff" size="1rem"></iconpark-icon>
                    </span>
                </div>

                <!-- 分享 -->
                <div class="form_status_content" v-if="0">
                    <div class="content_item">第xxx期开奖号码：123<span class="red">45</span></div>
                    <div class="content_item">您的竞猜内容：<span class="red">45</span></div>
                    <div class="content_item">您的竞猜排名：8</div>
                    <div class="content_item">您的中奖奖金：800</div>
                    <n-flex align="center" justify="center"
                        class=" button n-buttom submit_btn weight_5 pointer green_btn" block>
                        分享
                    </n-flex>
                    <div class="tip">分享后请复制您的Facebook主页</div>
                </div>

                <!-- 分享成功 -->
                <div class="form_status_content" v-if="0">
                    <div class="subtitle">请输入您的Facebook主页</div>
                    <n-input class="ipt" clearable :type="'text'" size="large" v-model:value="fbLink"
                        :placeholder="'请输入Facebook主页链接'"></n-input>
                    <n-flex align="center" justify="center"
                        class=" button n-buttom submit_btn weight_5 pointer green_btn blue_btn" block>
                        确定
                    </n-flex>
                </div>

                <!-- 分享失败 -->
                <div class="form_status_content" v-if="0">
                    <div class="content_item" style="margin:40px 0;">您未成功分享，请重新分享</div>
                    <n-flex align="center" justify="center"
                        class=" button n-buttom submit_btn weight_5 pointer green_btn" block>
                        分享
                    </n-flex>
                </div>

                <!-- 提示 -->
                <div class="form_status_content" v-if="1">
                    <div class="subtitle">您的Facebook主页未审核通过</div>
                    <div class="reson">
                        <div class="subtitle">失败原因：</div>
                        <div class="rs">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</div>
                    </div>
                    <div style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
                        <n-flex align="center" justify="center"
                            class=" button n-buttom submit_btn weight_5 pointer green_btn" block style="width: 187px;">
                            重新分享
                        </n-flex>
                        <n-flex align="center" justify="center"
                            class=" button n-buttom submit_btn weight_5 pointer green_btn blue_btn" block
                            style="width: 187px;">
                            认证主页
                        </n-flex>
                    </div>
                </div>

            </div>
        </n-card>

    </n-modal>

</template>

<script setup lang="ts">
import { ref } from "vue"

const show = ref(false)

const fbLink: any = ref('')

</script>

<style lang="less" scoped>
// @import '@/assets/CommonForm.less';
.form_container {
    .header {
        position: relative;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 2px solid rgba(38, 41, 76, 1);
        font-size: 20px;

        .close {
            right: 20px;
        }
    }

    .form_status_content {
        padding: 26px 40px 28px 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .content_item {
            color: #FFF;
            font-size: 16px;
            font-weight: 400;
            margin-bottom: 8px;

            .red {
                color: #E43939;
            }
        }

        .tip {
            color: #EB808C;
            font-size: 16px;
            font-weight: 400;
            margin-top: 8px;
        }

        .subtitle {
            width: 100%;
            text-align: left;
            color: #FFF;
            font-size: 16px;
            font-weight: 400;
            margin-bottom: 10px;
        }

        .reson {
            display: flex;
            align-items: flex-start;

            .subtitle {
                width: auto;
            }

            .rs {
                color: #AFB6BD;
                font-size: 16px;
                flex: 1;
                font-weight: 400;
            }
        }

        .ipt {
            height: 40px;
        }

        .green_btn {
            background: linear-gradient(180deg, #57BC8C 0.17%, #2DA36B 100%);
            box-shadow: 0.5px 0.5px 1px 0px #A9F5D1 inset;
            width: 240px;
            height: 40px;
            border-radius: 8px;
            margin-top: 20px;
        }

        .blue_btn {
            box-shadow: 0.5px 0.5px 1px 0px #7E1CFF inset;
            background: linear-gradient(180deg, #5A6CFF 0%, #7E1CFF 100%);

        }
    }
}

// 弹窗提示
.tips_sm_modal {
    &.form_card {
        width: 494px !important;

        :deep(.n-card__content) {
            padding: 0 !important;
        }
    }
}
</style>