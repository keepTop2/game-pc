<!-- 数字竞猜-分享弹窗 -->
<template>
    <n-modal class="tips_sm_modal" :show="show" :mask-closable="false">
        <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <div class="form_container vertical">
                <div class="header rel center">
                    <span>数字竞猜活动</span>
                    <span class="close abs center pointer t-sm">
                        <iconpark-icon icon-id="tanctongyguanb" color="#fff" size="1rem"></iconpark-icon>
                    </span>
                </div>
                <div class="banner"></div>
                <div class="guess_share_form">
                    <div class="guess_share_content">
                        <!-- 头部说明 -->
                        <div class="share_content_title">
                            <div class="title_item">
                                <div class="name">活动说明：</div>
                                <div class="content">这是一段很长很详细的活动说明，这是一段很长很详细的活动说明，这是一段很长很详细的活动说明，这是一段很长很详细的活动说明。</div>
                            </div>
                            <div class="title_item">
                                <div class="name">竞猜内容：</div>
                                <div class="content">参与者需要猜测北越彩票GiaiDB特别奖最后两位号码</div>
                            </div>
                            <div class="title_item">
                                <div class="name">竞猜结果：</div>
                                <div class="content">以北越特别奖结果的最后两位为开奖结果，玩家输入竞猜号码提交后 系统会记录玩家竞猜数字并展示在活动页面</div>
                            </div>
                            <div class="title_item">
                                <div class="name">每日竞猜时间：</div>
                                <div class="content">00:00到18:25 (UTC+7)</div>
                            </div>
                            <div class="title_item">
                                <div class="name">系统开奖时间：</div>
                                <div class="content">18:40 (UTC+7)</div>
                            </div>
                            <div class="title_item">
                                <div class="name">系统派奖时间：</div>
                                <div class="content">19:00 (UTC+7)</div>
                            </div>
                            <div class="title_item">
                                <div class="name">中奖规则：</div>
                                <div class="content">以最快猜中数字的参与者做排名，设置不同的奖励 猜中速度越快奖励越高</div>
                            </div>
                            <div class="title_item">
                                <div class="name">竞猜条件：</div>
                                <div class="content">每日分享点facebook按钮并成功分享平台的用户即可获得参与条件（每天-次）</div>
                            </div>
                            <div class="title_item">
                                <div class="name">活动领取：</div>
                                <div class="content">参与者在赢得奖励以后,需成功分享获奖界面后才可领取彩金，彩金有流水限制（后台配置）</div>
                            </div>
                        </div>

                        <!-- 表格 -->
                        <div class="share_content_table">
                            <div class="inner_table">
                                <div class="tr th">
                                    <div class="td">奖项</div>
                                    <div class="td">排名</div>
                                    <div class="td">奖品</div>
                                </div>
                                <div class="tr">
                                    <div class="td">一等奖</div>
                                    <div class="td">1</div>
                                    <div class="td">1,000,000.00</div>
                                </div>
                                <div class="tr">
                                    <div class="td">一等奖</div>
                                    <div class="td">1</div>
                                    <div class="td">1,000,000.00</div>
                                </div>
                                <div class="tr">
                                    <div class="td">一等奖</div>
                                    <div class="td">1</div>
                                    <div class="td">1,000,000.00</div>
                                </div>
                                <div class="tr">
                                    <div class="td">一等奖</div>
                                    <div class="td">1</div>
                                    <div class="td">1,000,000.00</div>
                                </div>
                                <div class="tr">
                                    <div class="td">一等奖</div>
                                    <div class="td">1</div>
                                    <div class="td">1,000,000.00</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="btn">
                        <n-flex align="center" justify="center"
                            class="button_color button n-buttom submit_btn weight_5 pointer" block>
                            立即分享
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

</script>

<style lang="less" scoped>
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

    .banner {
        margin: 20px auto 0 auto;
        width: 880px;
        height: 150px;
        border: 1px solid #26294C;
        border-radius: 8px;
        overflow: hidden;
    }
}

.guess_share_form {
    padding: 20px 40px 40px 40px;

    .btn {
        width: 372px;
        height: 46px;
        margin: 30px auto 0 auto;

        .button {
            width: 372px;
            height: 46px;
        }
    }

    .guess_share_content {
        .share_content_title {
            .title_item {
                display: flex;
                align-items: flex-start;
                margin-bottom: 8px;

                .name {
                    flex-shrink: 0;
                    width: 150px;
                    color: #AFBABD;
                    text-align: right;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: normal;
                }

                .content {
                    flex: 1;
                    color: #FFF;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: normal;
                }
            }
        }

        .share_content_table {
            margin-top: 24px;
            border: 1px solid #26294C;
            padding: 48px 20px 20px 20px;
            border-radius: 10px;
            background-color: #171B44;

            .inner_table {
                border: 1px solid #26294C;
                border-radius: 10px;
                overflow: hidden;

                .tr {
                    display: flex;
                    align-items: stretch;
                    border-bottom: 1px solid #26294C;

                    &:nth-child(odd) {
                        background: #0D0E2E;
                    }

                    &:nth-child(even) {
                        background: #121336;
                    }

                    &:nth-last-child {
                        border-bottom: none;

                    }

                    .td {
                        flex: 1;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #AFBABD;
                        font-size: 14px;
                        font-weight: 400;
                        border-right: 1px solid #26294C;

                        &:nth-last-child {
                            border-bottom: none;

                        }
                    }
                }

                .th {
                    background: #1B1F4B !important;

                    .td {
                        color: #FFF;
                        font-size: 16px;
                    }
                }
            }
        }
    }
}
</style>

<style lang="less" scoped>
// @import '@/assets/CommonForm.less';

// 弹窗提示
.tips_sm_modal {
    &.form_card {
        width: 960px !important;

        :deep(.n-card__content) {
            padding: 0 !important;
        }
    }
}
</style>