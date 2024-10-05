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

    </div>
</template>
<script setup lang="ts" name="footer">
import { useI18n } from "vue-i18n";
import Imgt from '@/components/Imgt.vue';

const { t } = useI18n();

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

    .club_list {
        display: flex;
        justify-content: space-between;
        .club_name{
            display: flex;
            align-items: center;
            gap: 4px;
            margin-bottom: 16px;
            img{
                height: 20px;
                width: 20px;
            }
            span{
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
}
</style>
