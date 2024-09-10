<!-- 代理介绍 -->
<template>
    <!-- <n-modal v-model:show="showModal" :mask-closable="false"> -->
    <div class="record_page proxy_intro">


        <!-- Tab -->
        <!-- <n-flex class="tabs" align="center">
                <n-flex align="center" justify="center" class="tab">俱乐部</n-flex>
                <n-flex align="center" justify="center" class="tab active_tab">赌场</n-flex>
            </n-flex> -->

        <!-- 代理制度 -->
        <div class="subtitle">{{ t('proxy_page_copyZd') }}</div>
        <div class="table shadow_table">
            <n-flex class="tr th">
                <div class="td">{{ t('proxy_page_agentCj') }}</div>
                <div class="td">{{ t('proxy_page_groupWater') }}</div>
            </n-flex>
            <n-flex class="tr" v-for="(item, i) in proxyConfig" :key="i">
                <div class="td">{{ item.name }}</div>
                <div class="td td_money">{{ item.value }}</div>
            </n-flex>
        </div>

        <!-- 代理层级 -->
        <div class="subtitle" style="position: relative;top: 50px;">{{ t('proxy_page_agentCj') }}</div>
        <n-flex vertical class="level_box">

            <!-- Boss -->
            <n-flex vertical class="icon_box" :align="'center'">
                <Imgt style="width:37px" class="icon" src="/img/proxy/level_1.webp" alt="BOSS" />
                <div class="name">BOSS</div>
            </n-flex>
            <n-flex class="model_box_content">
                <n-flex class="item " style="width:100%">
                    <span class="item_title">{{ t('proxy_page_team') }}：</span>
                    <span>{{ t('proxy_page_turnover') }} 300,000 *（0.65%-0.525%）=3,750</span>
                </n-flex>
                <n-flex class="item item_margin">
                    <span class="item_title">{{ t('proxy_page_contributions') }}：</span>
                    <span>(1000,000 * 0.65%) + (100,000 * 0.65%) = 13,000 <br /><br />
                        {{ t('proxy_page_revenue') }} = {{ t('proxy_page_team') }} + {{ t('proxy_page_contributions')
                        }} = 16,750</span>
                </n-flex>
                <!-- <n-flex class="item item_3">
                        <span class="item_title">团队总业绩：</span>
                        <span>800万</span>
                    </n-flex>
                    <n-flex class="item item_3">
                        <span class="item_title">团队分红：</span>
                        <span>10000</span>
                    </n-flex>
                    <n-flex class="item item_3">
                        <span class="item_title">直属总业绩：</span>
                        <span>60万</span>
                    </n-flex>
                    <n-flex class="item item_3 item_margin">
                        <span class="item_title">直属分红：</span>
                        <span>9000</span>
                    </n-flex>
                    <n-flex class="item item_3 item_margin">
                        <span class="item_title">两队总佣金：</span>
                        <span>19000</span>
                    </n-flex>
                    <n-flex class="item item_3">&nbsp;</n-flex>
                    <n-flex class="item item_3">
                        <span>团队分红=总业绩800万 ✖️ 差额0.125%</span>
                    </n-flex>
                    <n-flex class="item item_3">
                        <span>直属分红=60万 ✖️ 1.5%</span>
                    </n-flex> -->
            </n-flex>

            <!-- 树状结构1 -->
            <div class="tree">
                <div class="line_box"></div>
                <div class="text_box">{{ t('proxy_page_nextCs') }} 0.125% {{ t('proxy_page_nextZs') }}</div>
                <n-flex class="icons_box" justify="space-between" align="stretch">
                    <n-flex vertical class="icon_box" style="transform: translateX(-50%)" :align="'center'">
                        <Imgt style="width:30px" class="icon" src="/img/proxy/level_2.webp" alt="BOSS" />
                        <div class="name">{{ t('proxy_page_partner') }} B1</div>
                    </n-flex>
                    <n-flex vertical class="icon_box" style="transform: translateX(50%)" :align="'center'">
                        <Imgt style="width:30px" class="icon" src="/img/proxy/level_2.webp" alt="BOSS" />
                        <div class="name">B2 {{ t('proxy_page_player') }}</div>
                    </n-flex>
                </n-flex>
            </div>

            <!-- 合伙人 -->
            <n-flex justify="space-between" align="stretch">
                <n-flex vertical class="model_box_content content_2">
                    <n-flex class="item item_margin" style="justify-content:center">
                        <span class="item_title">{{ t('proxy_page_winLose') }}：</span>
                        <span>100,000,000</span>
                    </n-flex>
                    <!-- <n-flex class="item">
                            <span class="item_title">团队总业绩：</span>
                            <span>800万</span>
                        </n-flex>
                        <n-flex class="item item_margin">
                            <span class="item_title">A1有效投注：</span>
                            <span>50万</span>
                        </n-flex>
                        <n-flex class="item">
                            <span class="item_title">直属下级业绩：</span>
                            <span>50万</span>
                        </n-flex> -->
                </n-flex>
                <n-flex vertical class="model_box_content content_2">
                    <n-flex class="item item_margin" style="justify-content:center">
                        <span class="item_title">{{ t('proxy_page_winLose') }}：</span>
                        <span>100,000,000</span>
                    </n-flex>
                    <!-- <n-flex class="item">
                            <span class="item_title">团队总业绩：</span>
                            <span>800万</span>
                        </n-flex>
                        <n-flex class="item item_margin">
                            <span class="item_title">A1有效投注：</span>
                            <span>50万</span>
                        </n-flex>
                        <n-flex class="item">
                            <span class="item_title">直属下级业绩：</span>
                            <span>50万</span>
                        </n-flex> -->
                </n-flex>
            </n-flex>

            <!-- 树状结构2 -->
            <n-flex justify="space-between" align="stretch">
                <div class="tree" style="width:25%">
                    <div class="line_box"></div>
                    <div class="text_box">{{ t('proxy_page_nextCs') }}0.125%+<br />{{ t('proxy_page_nextZs') }}
                    </div>
                    <n-flex class="icons_box level2" justify="space-between" align="stretch">
                        <n-flex vertical class="icon_box" style="transform: translateX(-50%)" :align="'center'">
                            <Imgt style="width:34px" class="icon" src="/img/proxy/level_3.webp" alt="BOSS" />
                            <div class="name">{{ t('proxy_page_gjMaster') }} C1</div>
                        </n-flex>
                        <n-flex vertical class="icon_box" style="transform: translateX(50%)" :align="'center'">
                            <Imgt style="width:34px" class="icon" src="/img/proxy/level_3.webp" alt="BOSS" />
                            <div class="name">{{ t('proxy_page_player') }} C2</div>
                        </n-flex>
                    </n-flex>
                </div>
                <div class="tree" style="width:25%"></div>
                <!-- <div class="tree" style="width:25%">
                        <div class="line_box"></div>
                        <div class="text_box">下级总业绩0.125%+<br />直属下级业绩的有效流水抽成</div>
                        <n-flex class="icons_box" justify="space-between" align="stretch">
                            <n-flex vertical class="icon_box" style="transform: translateX(-50%)" :align="'center'">
                                <Imgt style="width:34px" class="icon" src="/img/proxy/level_3.webp" alt="BOSS" />
                                <div class="name">高级厅主B3</div>
                            </n-flex>
                            <n-flex vertical class="icon_box" style="transform: translateX(50%)" :align="'center'">
                                <Imgt style="width:34px" class="icon" src="/img/proxy/level_3.webp" alt="BOSS" />
                                <div class="name">高级厅主B4</div>
                            </n-flex>
                        </n-flex>
                    </div> -->
            </n-flex>

            <!-- 高级厅主 -->
            <n-flex justify="space-between" align="stretch">
                <n-flex vertical class="model_box_content content_4">
                    <n-flex class="item">
                        <span class="item_title">{{ t('proxy_page_winLose') }}：</span>
                        <span>100,000,000</span>
                    </n-flex>
                    <!-- <n-flex class="item">
                            <span class="item_title">团队总业绩：</span>
                            <span>800万</span>
                        </n-flex>
                        <n-flex class="item item_margin">
                            <span class="item_title">A1有效投注：</span>
                            <span>50万</span>
                        </n-flex>
                        <n-flex class="item">
                            <span class="item_title">直属下级业绩：</span>
                            <span>50万</span>
                        </n-flex> -->
                </n-flex>
                <n-flex vertical class="model_box_content content_4">
                    <n-flex class="item">
                        <span class="item_title">{{ t('proxy_page_winLose') }}：</span>
                        <span>100,000,000</span>
                    </n-flex>
                    <!-- <n-flex class="item">
                            <span class="item_title">团队总业绩：</span>
                            <span>800万</span>
                        </n-flex>
                        <n-flex class="item item_margin">
                            <span class="item_title">A1有效投注：</span>
                            <span>50万</span>
                        </n-flex>
                        <n-flex class="item">
                            <span class="item_title">直属下级业绩：</span>
                            <span>50万</span>
                        </n-flex> -->
                </n-flex>
                <n-flex vertical class="model_box_content content_4" style="opacity: 0;">&nbsp;</n-flex>
                <n-flex vertical class="model_box_content content_4" style="opacity: 0;">&nbsp;</n-flex>
                <!-- <n-flex vertical class="model_box_content content_4">
                        <n-flex class="item">
                            <span class="item_title">团队总业绩：</span>
                            <span>800万</span>
                        </n-flex>
                        <n-flex class="item item_margin">
                            <span class="item_title">A1有效投注：</span>
                            <span>50万</span>
                        </n-flex>
                        <n-flex class="item">
                            <span class="item_title">直属下级业绩：</span>
                            <span>50万</span>
                        </n-flex>
                    </n-flex>
                    <n-flex vertical class="model_box_content content_4">
                        <n-flex class="item">
                            <span class="item_title">团队总业绩：</span>
                            <span>800万</span>
                        </n-flex>
                        <n-flex class="item item_margin">
                            <span class="item_title">A1有效投注：</span>
                            <span>50万</span>
                        </n-flex>
                        <n-flex class="item">
                            <span class="item_title">直属下级业绩：</span>
                            <span>50万</span>
                        </n-flex>
                    </n-flex> -->
            </n-flex>
        </n-flex>

        <!-- 详细介绍 -->
        <!-- <div class="subtitle">详细介绍</div>
            <div class="table shadow_table">
                <n-flex class="tr th">
                    <div class="td">类型</div>
                    <div class="td td_25">计算计算方式</div>
                </n-flex>
                <n-flex class="tr" v-for="(item, i) in proxyCalc" :key="i">
                    <div class="td">{{ item.name }}</div>
                    <div class="td td_25">{{ item.value }}</div>
                </n-flex>
                <n-flex class="tr">
                    <div class="td">有效投注</div>
                    <div class="td td_25">
                        例如德州扑克的一局游戏中只计算每轮的有效跟注，例如大盲位遇到对手全弃牌，只计算双方的有效跟注，因为该对局只有小盲位跟半BAT，所以大盲位的有效投注也只有半BET，而不是盲注的1BET。
                        <br /><br />再举一个例子，当德州扑克一局中，某位玩家全押，对手全弃牌时，只计算双方之间的有效跟注，假设全押者的上家押注300U，而全押者全押1000U，对手全弃牌，则只计算全押者300U的有效跟注。
                    </div>
                </n-flex>
            </div> -->

        <div class="intro">
            <div class="title">{{ t('proxy_page_xiangxijieshao') }}</div>
            <div class="subtitle">{{ t('proxy_page_juli') }}</div>
            <div class="content">{{ t('proxy_page_shuoming1') }}{{ t('proxy_page_shuoming2') }}
                <div class="br"></div>
                {{ t('proxy_page_shuoming3') }}
            </div>
            <div class="subtitle">{{ t('proxy_page_shuoming5') }}</div>
            <div class="content">{{ t('proxy_page_shuoming6') }}<div class="br"></div>{{ t('proxy_page_shuoming7') }}<div class="br"></div>{{ t('proxy_page_shuoming8') }}
            </div>
            <div class="subtitle">{{ t('proxy_page_shuoming9') }}</div>
            <div class="content">{{ t('proxy_page_shuoming10') }}<div class="br"></div>{{ t('proxy_page_shuoming11') }}<div class="br"></div>
            {{ t('proxy_page_shuoming12') }}</div>
            <div class="subtitle">{{ t('proxy_page_shuoming14') }}</div>
            <div class="content">{{ t('proxy_page_shuoming15') }}<div class="br"></div>
            {{ t('proxy_page_shuoming16') }}<div
                    class="br">
                </div>{{ t('proxy_page_shuoming17') }}
            </div>
        </div>
    </div>
    <!-- </n-modal> -->
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useI18n } from "vue-i18n";
import Imgt from '@/components/Imgt.vue';
// import { useRouter } from 'vue-router';

// const router = useRouter();

const { t } = useI18n()
// const showModal = ref(false)
// const openModal = () => { // 打开
//     showModal.value = true
// }
// const closeModal = () => { // 关闭
//     showModal.value = false
// }


const proxyConfig = ref([
    { name: t('proxy_page_jxMaster'), value: "0.15%" },
    { name: t('proxy_page_master'), value: "0.275%" },
    { name: t('proxy_page_gjMaster'), value: "0.4%" },
    { name: t('proxy_page_partner'), value: "0.525%" },
    { name: "BOSS", value: "0.65%" },
])
// const proxyCalc = ref([
//     { name: "团队分红", value: "总业绩1000万×每层差额0.125%" },
//     { name: "直属分红", value: "直属业绩×团队有效流水抽成" },
//     { name: "BOSS总业绩", value: "合伙人业绩总和+直属下级业绩" },
//     { name: "合伙人总业绩", value: "高级厅主业绩总和+直属下级业绩" },
//     { name: "高级厅主总业绩", value: "厅主业绩总和+直属下级业绩" },
//     { name: "厅主总业绩", value: "见习厅主业绩总和+直属下级业绩" },
//     { name: "见习业绩", value: "直属有效投注" },
//     { name: "自身有效投注", value: "上级的直属下级有效投注" },
//     { name: "业绩", value: "有效投注的别称" },
// ])

// defineExpose({
//     openModal
// })
</script>

<style lang='less' scoped>
@import '@/assets/recordPage.less';
@import '@/assets/modelBox.less';

.proxy_intro {
    width: 1200px;
    box-sizing: border-box;
    font-size: 14px;
    min-height: 1200px;
    user-select: none;

    .intro {


        .title {
            font-size: 12px;
            font-weight: 400;
            color: #A2A5DE;
            margin: 20px 0 10px 0;
        }

        .subtitle {
            color: #FFFFFF;
            margin-bottom: 10px;
            font-size: 12px;
            font-weight: 400;
            line-height: 17px;
        }

        .content {
            color: #FFFFFF;
            padding-left: 24px;
            font-size: 12px;
            font-weight: 400;
            line-height: 17px;

            .br {
                margin-bottom: 10px;
            }
        }
    }

    .table {
        .th {
            .td {
                color: #fff;
            }
        }

        .tr {
            color: #8E82C2;
        }

        .tr:nth-child(odd) {
            color: #fff;
        }
    }

    .model_box_content {
        border-radius: 12px;
        background-color: #1D0E4A;
        border: 1px solid #322C59;
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.4) inset;
        padding: 25px 30px;
    }



    .subtitle {
        font-size: 16px;
        margin: 20px 0;
        color: #fff
    }

    .tabs {
        margin-top: 20px;
        border-radius: 14px;
        box-sizing: border-box;
        height: 72px;
        background: linear-gradient(0deg, #1D0E4A, #1D0E4A),
            radial-gradient(50% 50% at 50% 50%, rgba(126, 126, 126, 0.1) 0%, rgba(21, 21, 21, 0.1) 100%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.1) 100%);
        border: 1.4px solid #322C59;
        box-shadow: 0px 4px 4px 0px #00000040 inset;

        .tab {
            padding: 10px;
            flex: 1;
            color: #8D81C1;
            font-size: 16px;
            height: 52px;
            cursor: pointer;
        }

        .active_tab {
            background: url(/img/wallet/tabBtnBG.webp) no-repeat;
            background-size: 100% 112%;
            color: #fff;
        }
    }

    .level_box {
        .icon_box {
            height: 57px;
            position: relative;

            .icon {
                height: 30px;
                object-fit: contain;
            }

            .name {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                white-space: nowrap;
                color: #fff
            }
        }

        .content_2 {
            width: 555px;
        }

        .content_4 {
            width: 264px;
        }

        .item {
            font-size: 16px;
            color: #fff;
            line-height: 16px;

            .item_title {
                color: #8E82C2;
                font-weight: 400;
            }
        }

        .item_3 {
            width: 30%;
        }

        .item_margin {
            margin: 20px 0;
        }

        .tree {
            width: 50%;
            position: relative;
            padding-top: 20px;
            margin: 0 auto;

            .text_box {
                position: absolute;
                width: 70%;
                left: 50%;
                transform: translateX(-50%);
                top: 0;
                text-align: center;
                top: 40px;
                color: #8D81C1;
            }

            .line_box {
                width: 100%;
                height: 20px;
                border: 1px solid #fff;
                border-bottom: none;
                position: relative;
                margin-bottom: 12px;

                &::after {
                    content: "";
                    width: 1px;
                    height: 20px;
                    position: absolute;
                    top: -20px;
                    left: 50%;
                    background-color: #fff;
                    transform: translateX(-50%);
                }
            }

            .icons_box.level2 {
                .icon_box {
                    width: 100px;
                    min-height: 100px;

                    .name {
                        width: 100px;
                        top: 30px;
                        white-space: pre-wrap;
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>
