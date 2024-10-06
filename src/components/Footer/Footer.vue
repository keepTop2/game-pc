<template>
    <div class="foot_wrap">
        <div class="club_list">
            <div v-for="(value, key, i) in clubList" class="club_list_item" :key="key">
                <div class="club_name">
                    <Imgt :src="`/img/footer/club_icon${i + 1}.webp`" />
                    <span>{{ key }}</span>
                </div>
                <template v-if="value.length">
                    <span v-for="(item, index) in value" :key="index">{{ item?.label }}</span>
                </template>
            </div>
        </div>
        <div class="pay_wrap">
            <div class="pay_wrap_des">接受点付款方式</div>
            <div class="pay_wrap_item">
                <div v-for="i in 11" :key="i">
                    <Imgt :src="`/img/footer/pay_icon${i}.webp`" />
                </div>
            </div>
        </div>
        <div class="sponsor_wrap">
            <div class="pay_wrap_des">赞助和博彩责任</div>
            <div class="sponsor_wrap_item">
                <div v-for="i in 7" :key="i">
                    <Imgt :src="`/img/footer/sponsor${i}.webp`" />
                </div>
            </div>
        </div>
        <div class="foot_wrap_bottom">
            <div class="foot_wrap_bottom_l">
                <Imgt src="/img/header/logo.webp" class="logo home_logo" @click="router.push('/')" />
                <div class="des_wrap">
                    <div class="des_title">PKBET - 专业德州扑克的终极平台</div>
                    <div>欢迎来到PKBET，一个屡获殊荣的在线赌场，通过以玩家为中心的方法，我们满足全球数百万德州扑克爱好者的需求。
                        PKBET的首要任务是社区，确保提供永恒且无尽的专业德州扑克体验。</div>
                    <div class="des_title">为什么选择PKBET？</div>
                    <div class="des_list">
                        <span>•  专业平台：我们专注于德州扑克，提供最专业的游戏环境和公平的竞技平台。</span>
                        <span> •  全球玩家：与来自世界各地的顶尖玩家同台竞技，提升您的扑克技巧。</span>
                        <span> •  全球玩家：与来自世界各地的顶尖玩家同台竞技，提升您的扑克技巧。</span>
                        <span> •  安全可靠：我们采用最先进的加密技术，确保您的资金和个人信息安全无虞。</span>
                    </div>

                </div>

            </div>
            <div class="foot_wrap_bottom_r">
                <div class="des_wrap">
                    <div class="des_title">我们的承诺：</div>
                    <div class="des_list">
                        <span> •  公平竞技：我们致力于提供公平、公正的游戏环境，所有玩家都能
                            在同等条件下竞技。</span>
                        <span>•  社区优先：我们重视每一位玩家的体验，提供24/7的客户支持，
                            确保您的问题能及时得到解决。</span>
                        <span>
                            •  负责任的游戏：我们倡导负责任的游戏行为，提供多种工具帮助玩
                            家管理游戏时间和资金。
                        </span>
                    </div>
                    <div style="margin-top: 30px;">
                        立即加入PKBET，体验专业德州扑克的魅力！<br>
                        您使用和访问PKBET即表示您完全理解并同意受我们的服务条款和负责任的游戏政策内容的法律约束。<br>
                        版权所有© 2024 PKBET 保留所有权利
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts" name="footer">
import { useI18n } from "vue-i18n";
import Imgt from '@/components/Imgt.vue';
import { useRouter } from 'vue-router';
const { t } = useI18n();
const router = useRouter();
const clubList: any = {
    '俱乐部': [{ label: '俱乐部首页', id: 1, path: '' }, { label: '德州扑克', id: 2, path: '' }, { label: '21点', id: 3, path: '' },
    { label: '塔拉牌', id: 4, path: '' }, { label: '跑得快', id: 5, path: '' }, { label: '三公', id: 6, path: '' },
    { label: '鱼虾蟹', id: 7, path: '' }, , { label: '港式五张', id: 8, path: '' }],
    '赌场': [{ label: '赌场首页', id: 1, path: '' }, { label: '真人视讯', id: 2, path: '' }, { label: '电子游戏', id: 3, path: '' },
    { label: '体育游戏', id: 4, path: '' }, { label: '彩票游戏', id: 5, path: '' }, { label: '电竞游戏', id: 6, path: '' }, { label: '百人场', id: 7, path: '' }],
    '用户回馈': [{ label: 'VIP俱乐部', id: 1, path: '' }, { label: '成为代理', id: 2, path: '' }, { label: '优惠活动', id: 3, path: '' },
    { label: '邀请好友', id: 4, path: '' }],
    '支持/法律': [{ label: '帮助中心', id: 1, path: '' }, { label: '赌博意识', id: 2, path: '' }, { label: '可验证公平性', id: 3, path: '' },
    { label: '常见问题', id: 4, path: '' }, { label: '隐私政策', id: 5, path: '' }, { label: '服务条款', id: 6, path: '' },
    { label: '公司资质', id: 7, path: '' }, { label: '反洗钱政策', id: 8, path: '' }, { label: '下载APP', id: 8, path: '' }, { label: '联系客服', id: 9, path: '' }],
    '关于我们': [{ label: '自研游戏', id: 1, path: '' }, { label: '代理合作', id: 2, path: '' }, { label: '联系方式', id: 3, path: '' }],
    '社区': [{ label: 'Telegram', id: 1, path: '' }, { label: 'Facebook', id: 2, path: '' }, { label: 'Telephone', id: 3, path: '' }],
}



</script>
<style lang='less' scoped>
.foot_wrap {
    width: 1300px;
    margin: 0 auto;
    padding-bottom: 20px;

    .club_list {
        display: flex;
        justify-content: space-between;

        .club_name {
            display: flex;
            align-items: center;
            gap: 4px;
            margin-bottom: 16px;

            img {
                height: 20px;
                width: 20px;
            }

            span {
                color: #B5BCCA !important;
                margin-bottom: unset !important;
            }
        }

        .club_list_item {
            display: flex;
            flex-direction: column;
            align-items: center;

            span {
                color: #808291;
                font-size: 16px;
                margin-bottom: 14px;

                &:nth-child(1) {
                    color: #B5BCCA;

                }
            }
        }
    }

    .pay_wrap {
        height: 126px;
        border-top: 1px solid #454651;
        border-bottom: 1px solid #454651;

        .pay_wrap_des {
            color: #B5BCCA;
            text-align: center;
            margin-top: 20px;
        }

        .pay_wrap_item {
            margin-top: 8px;
            display: flex;
            justify-content: center;
            gap: 25px;

            img {
                width: 50px;
                height: 50px;
                cursor: pointer;
            }
        }
    }

    .sponsor_wrap {
        border-bottom: 1px solid #454651;
        padding-bottom: 20px;

        .pay_wrap_des {
            color: #B5BCCA;
            text-align: center;
            margin-top: 20px;
        }

        .sponsor_wrap_item {
            margin-top: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            div {
                cursor: pointer;
            }
        }
    }

    .foot_wrap_bottom {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;

        .foot_wrap_bottom_l {
            width: 837px;
        }

        .foot_wrap_bottom_r {
            width: 400px;
        }

        .home_logo {
            height: 73px;
        }

        .des_wrap {
            color: #808291;
            font-size: 16px;

            .des_list {
                display: flex;
                flex-direction: column;
            }

            .des_title {
                color: #B5BCCA;
                margin: 12px 0px;
            }
        }
    }
}
</style>
