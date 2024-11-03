<!-- 数字竞猜-竞猜弹窗 -->
<template>
    <n-modal class="tips_sm_modal" :show="show" :mask-closable="false">
        <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <div class="form_container vertical">
                <div class="header rel center">
                    <span>数字竞猜活动</span>
                    <span class="close abs center pointer t-sm" @click="show = false">
                        <iconpark-icon icon-id="tanctongyguanb" color="#fff" size="1rem"></iconpark-icon>
                    </span>
                </div>
                <div class="banner"></div>

                <!-- 表单 -->
                <div class="guess_form">
                    <div class="top">
                        <div>2001期中奖号码：未开奖</div>
                        <img class="gift" src="/img/activity/gift.webp" alt="">
                    </div>
                    <div class="bottom">
                        <div class="subtitle">您的竞猜号码</div>
                        <div class="rs_box">
                            <div class="rs_item">
                                <Ball :val="'un'" />
                                <div class="rs_text">十位</div>
                            </div>
                            <div class="rs_item">
                                <Ball :val="'un'" />
                                <div class="rs_text">个位</div>
                            </div>
                        </div>
                        <!-- 未竞猜 -->
                        <template v-if="0">
                            <div class="subtitle">请点击选择</div>
                            <div class="rs_list">
                                <Ball :val="i - 1" v-for="i in 10" />
                            </div>
                            <div class="btns">
                                <n-flex align="center" justify="center"
                                    class=" button n-buttom submit_btn weight_5 pointer red_btn" block>
                                    删除
                                </n-flex>
                                <n-flex align="center" justify="center"
                                    class="button_color button n-buttom submit_btn weight_5 pointer" block>
                                    确定
                                </n-flex>
                            </div>
                        </template>
                        <!-- 已竞猜/未参与/未中奖 -->
                        <template v-if="1">
                            <div class="subtitle">您已参与今日竞猜</div>
                            <div class="rs_box">
                                <!-- <span style="color:#E43939">请耐心等待开奖</span> -->
                                <span style="color:#FAC904">中奖奖金：800</span>

                                <div class="rs_box_tip">第一次领取，需要进行简单认证！</div>
                            </div>
                            <div class="btns">
                                <n-flex align="center" justify="center"
                                    class=" button n-buttom submit_btn weight_5 pointer green_btn" block>
                                    分享
                                </n-flex>
                                <n-flex align="center" justify="center"
                                    class="button n-buttom submit_btn weight_5 pointer disabled_btn" block>
                                    领取
                                </n-flex>
                            </div>
                        </template>
                    </div>
                </div>

                <!-- 数据 -->
                <div class="guess_data">
                    <div class="tabs">
                        <div class="tab" :class="{ 'tab_active': tab == 1 }" @click="tab = 1">我的竞猜</div>
                        <div class="tab" :class="{ 'tab_active': tab == 2 }" @click="tab = 2">竞猜排名</div>
                    </div>

                    <!-- 我的竞猜 -->
                    <div class="my_guess" v-if="tab == 1">
                        <div class="my_guess_box">
                            <div class="mg_title">2007期</div>
                            <div class="mini_table" style="margin-bottom: 12px;">
                                <div class="tr">
                                    <div class="td">账号</div>
                                    <div class="td td_val">svir</div>
                                </div>
                                <div class="tr">
                                    <div class="td">竞猜号码</div>
                                    <div class="td td_val">
                                        <Ball style="margin-right: 8px;" :val="0" :size="18" />
                                        <Ball :val="0" :size="18" />
                                    </div>
                                </div>
                                <div class="tr">
                                    <div class="td">排名</div>
                                    <div class="td td_val">1</div>
                                </div>
                                <div class="tr">
                                    <div class="td">中奖</div>
                                    <div class="td td_val">100000</div>
                                </div>
                                <div class="tr">记录</div>
                                <div class="tr">^</div>
                            </div>
                            <div class="table">
                                <div class="tr th">
                                    <div class="td">账号</div>
                                    <div class="td">竞猜号码</div>
                                    <div class="td">排名</div>
                                    <div class="td">竞猜时间</div>
                                </div>
                                <div class="tr" v-for="i in 20" :key="i">
                                    <div class="td">svir</div>
                                    <div class="td">
                                        <Ball style="margin-right: 8px;" :val="0" :size="18" />
                                        <Ball :val="0" :size="18" />
                                    </div>
                                    <div class="td">1</div>
                                    <div class="td">17:31:20</div>
                                </div>
                            </div>
                        </div>
                        <div class="my_guess_box">
                            <div class="mg_title">2007期</div>

                            <div class="mini_table" v-for="i in 10" :key="i" style="margin-bottom: 20px">
                                <div class="tr">
                                    <div class="td">账号</div>
                                    <div class="td td_val">svir</div>
                                </div>
                                <div class="tr">
                                    <div class="td">竞猜号码</div>
                                    <div class="td td_val">
                                        <Ball style="margin-right: 8px;" :val="0" :size="18" />
                                        <Ball :val="0" :size="18" />
                                    </div>
                                </div>
                                <div class="tr">
                                    <div class="td">排名</div>
                                    <div class="td td_val">1</div>
                                </div>
                                <div class="tr">
                                    <div class="td">中奖</div>
                                    <div class="td td_val">100000</div>
                                </div>
                                <div class="tr">记录</div>
                                <div class="tr">^</div>
                            </div>
                        </div>
                        <div class="bottom_shadow"></div>
                    </div>



                    <!-- 竞猜排行 -->
                    <div class="guess_rank" v-if="tab == 2">
                        <div class="rank_title">
                            <div>未猜中，没有您的排名</div>
                            <div class="rank_term">
                                <div>请选择期数：</div>
                                <n-select class="rank_term_select" v-model:value="term" :options="termList" />
                            </div>
                        </div>

                        <div class="table">
                            <div class="tr th">
                                <div class="td">账号</div>
                                <div class="td">竞猜号码</div>
                                <div class="td">排名</div>
                                <div class="td">中奖</div>
                            </div>
                            <div class="tr" v-for="i in 20" :key="i">
                                <div class="td">svir</div>
                                <div class="td">
                                    <Ball style="margin-right: 8px;" :val="0" :size="18" />
                                    <Ball :val="0" :size="18" />
                                </div>
                                <div class="td">
                                    <img class="rank_icon" src="/img/activity/rank_1.webp" alt="">
                                </div>
                                <div class="td money">3000000</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </n-card>

    </n-modal>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Ball from "./Ball.vue"

const show = ref(false)
const tab = ref(1) // 1-我的竞猜  2-竞猜排行

// 排行期号
const term = ref(null)
const termList = ref([
    {
        label: '20202020第1期',
        value: '2020'
    },
])

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

    .guess_form {
        width: 880px;
        height: 414px;
        border-radius: 12px;
        overflow: hidden;
        margin: 20px auto;
        position: relative;

        .top {
            background: linear-gradient(95deg, #FA397E 0%, #FF852D 99.32%), linear-gradient(90deg, #5A6CFF 0%, #7E1CFF 100%);
            height: 98px;
            width: 100%;
            padding: 18px 20px;
            color: #FFF;
            font-size: 16px;
            position: relative;

            .gift {
                width: 60px;
                height: 60px;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 18px;
            }
        }

        .bottom {
            height: 356px;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            background-size: 100% 100%;
            background-image: url('/img/activity/Subtract.webp');
            padding: 24px 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .subtitle {
                color: #AFB6BD;
                font-size: 14px;
                font-weight: 500;
                line-height: normal;
                margin-bottom: 8px;
            }

            .rs_box {
                height: 98px;
                background-color: #0C0E2F;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                position: relative;

                .rs_item {
                    margin: 0 100px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    .rs_text {
                        margin-top: 4px;
                        color: #AFB6BD;
                        font-size: 14px;
                        font-weight: 400;
                    }
                }

                .rs_box_tip {
                    position: absolute;
                    left: 0;
                    bottom: -21px;
                    color: #EB808C;
                }
            }

            .rs_list {
                margin-bottom: 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }


            .btns {
                display: flex;
                align-items: center;
                justify-content: center;

                .button {
                    width: 240px;
                    height: 46px;
                    margin: 0 10px;
                    border-radius: 12px;
                }

                .red_btn {
                    background: linear-gradient(180deg, #F45248 0%, #EC3E3E 100%);
                }

                .disabled_btn {
                    color: #AFB6BD;
                    background: linear-gradient(180deg, #7F7A94 0.17%, #6A6580 100%);
                    box-shadow: 0.5px 0.5px 1px 0px #A6A2BA inset;
                }

                .green_btn {
                    background: linear-gradient(180deg, #57BC8C 0.17%, #2DA36B 100%);
                    box-shadow: 0.5px 0.5px 1px 0px #A9F5D1 inset;
                }
            }
        }
    }

    .guess_data {
        border: 1px solid #26294C;
        background-color: #171B44;
        height: 660px;
        border-radius: 16px;
        padding: 20px;
        width: 880px;
        margin: 0 auto 30px auto;
        display: flex;
        flex-direction: column;

        .tabs {
            display: flex;
            height: 44px;
            flex-shrink: 0;
            background-color: #0D0E2E;
            border-radius: 10px;
            margin-bottom: 16px;

            .tab {
                flex: 1;
                color: #AFB6BD;
                font-size: 16px;
                font-weight: 400;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                padding: 2px;
            }

            .tab_active {
                border-radius: 10px;
                background: linear-gradient(180deg, #5567FF 0%, #9E1EFF 100%);
                box-shadow: 0.5px 0.5px 1px 0px #9B9EFF inset;
                color: #FFF;
            }
        }

        .my_guess {
            flex: 1;
            overflow-y: auto;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            .mg_title {
                color: #AFB6BD;
                font-size: 14px;
                font-weight: 500;
                margin-bottom: 8px;
            }

            .mini_table {
                width: 410px;
                height: 80px;
                border: 1px solid #26294C;
                border-radius: 16px;
                background-color: #1B1F4B;
                display: flex;
                overflow: hidden;

                .tr {
                    flex: 1;
                    border-right: 1px solid #26294C;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    color: #FFF;
                    font-size: 16px;


                    .td {
                        width: 100%;
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .td_val {
                        background-color: #121336;
                        color: #AFBABD;
                        font-size: 14px;
                    }

                    &:last-child {
                        border-right: none;
                    }
                }
            }

            .table {
                width: 410px;
                border: 1px solid #26294C;
                border-radius: 16px;
                background-color: #1B1F4B;

                .tr {
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: stretch;
                    border-bottom: 1px solid #26294C;

                    &:nth-child(even) {
                        background-color: #121336;
                    }

                    &:nth-child(odd) {
                        background-color: #0D0E2E;
                    }

                    &:last-child {
                        border-bottom: none;
                    }

                    .td {
                        flex: 1;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-right: 1px solid #26294C;
                        color: #AFBABD;
                        font-size: 14px;
                        font-weight: 400;

                        &:last-child {
                            border-right: none;
                        }
                    }
                }

                .th {
                    background-color: rgba(0, 0, 0, 0) !important;

                    .td {
                        color: #fff;
                        font-size: 16px;
                    }
                }
            }

            .my_guess_box {
                width: calc(50% - 10px);
            }

            .bottom_shadow {
                background: linear-gradient(180deg, rgba(23, 27, 68, 0.00) 0%, #171B44 100%);
                width: calc(100% - 80px);
                position: absolute;
                height: 60px;
                bottom: 30px;
                left: 40px;
                z-index: 9;
            }
        }

        .guess_rank {
            display: flex;
            flex-direction: column;
            overflow: hidden;

            .rank_title {
                height: 56px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #AFB6BD;
                font-size: 16px;
                font-weight: 400;

                .rank_term {
                    display: flex;
                    align-items: center;

                    .rank_term_select {
                        width: 200px;

                        ::v-deep(.n-base-selection) {
                            border: 1px solid rgba(175, 182, 189, 0.32) !important;
                        }

                        ::v-deep(.n-base-selection__border) {
                            border: 1px solid rgba(175, 182, 189, 0.32) !important;
                        }
                    }
                }
            }

            .table {
                flex: 1;
                margin-top: 12px;
                overflow-y: auto;
                width: 820px;
                border: 1px solid #26294C;
                border-radius: 16px;
                background-color: #1B1F4B;

                .tr {
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: stretch;
                    border-bottom: 1px solid #26294C;

                    &:nth-child(even) {
                        background-color: #121336;
                    }

                    &:nth-child(odd) {
                        background-color: #0D0E2E;
                    }

                    &:last-child {
                        border-bottom: none;
                    }

                    .td {
                        flex: 1;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-right: 1px solid #26294C;
                        color: #AFBABD;
                        font-size: 14px;
                        font-weight: 400;

                        &:last-child {
                            border-right: none;
                        }

                        .rank_icon {
                            width: 38px;
                            height: 24px;
                        }
                    }

                    .money {
                        color: #FAC904;
                    }
                }

                .th {
                    background-color: rgba(0, 0, 0, 0) !important;

                    .td {
                        color: #fff;
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