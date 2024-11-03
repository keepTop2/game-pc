<!-- 排行弹窗 -->
<template>
    <n-modal class="tips_sm_modal" :show="show" :mask-closable="false">
        <n-card class="form_card" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <div class="form_container vertical">
                <div class="header rel center">
                    <span>2007期</span>
                    <span class="close abs center pointer t-sm" @click="show = false">
                        <iconpark-icon icon-id="tanctongyguanb" color="#fff" size="1rem"></iconpark-icon>
                    </span>
                </div>

                <div class="table-content">
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

            </div>
        </n-card>

    </n-modal>

</template>

<script setup lang="ts">
import { ref } from "vue"
import Ball from "./Ball.vue"

const show = ref(false)


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

    .table-content {
        padding: 20px 40px 40px 40px;

        .table {
            width: 100%;
            border: 1px solid #26294C;
            border-radius: 16px;
            background-color: #1B1F4B;
            max-height: 60vh;
            overflow-y: auto;

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
    }

}

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