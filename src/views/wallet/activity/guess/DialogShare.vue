<!-- 数字竞猜-分享弹窗 -->
<template>
    <CommonForm class="guess_share_form" :title="'数字竞猜活动'" :form="form" :show-form="show" :submit-text="'立即分享'"
        :form-ref="'formRef'" @on-submit="onSubmit">
        <template v-slot:content>
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
        </template>
    </CommonForm>
</template>

<script setup lang="ts">
import CommonForm from '@/components/CommonForm.vue';
import { ref, reactive } from "vue"

const show = ref(false)

const form: any = reactive({
    fields: {},
    rules: {},
    data: {}
});
const onSubmit = () => {
    console.error('立即分享')
}
</script>

<style lang="less" scoped>
.guess_share_form {
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
<style lang="less">
.guess_share_form {
    &.tips_sm_modal {
        &.form_card {
            width: 960px !important;

            .form_container {
                .body_box {
                    padding: 40px !important;
                }
            }
        }
    }
}
</style>