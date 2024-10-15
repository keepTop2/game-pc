<!-- 记录 -->
<template>
    <div class="record_page coop_table">
        <!-- Tabs -->
        <n-flex class="tabs" align="center">
            <n-flex align="center" justify="center" class="tabs_item"
              :class="{ 'button n-button active_tab': activeTab == item.id }" @click="changeTab(item)"
              v-for="(item, index) in titleArr" :key="index">{{ item.title }}
            </n-flex>
        </n-flex>
        <router-view></router-view>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router';
const router = useRouter();

const { t } = useI18n()
const titleArr: any = reactive([
    {
        title: t('mine_myload'),
        id: 1,
        url: 'rechargeRecord'
    },
    {
        title: t('mine_mywithdraw'),
        id: 2,
        url: 'withdrawRecord'
    },
    {
        title: t('mine_mybet'),
        id: 3,
        url: 'betRecord'
    },
    {
        title: t('mine_myaudit'),
        id: 4,
        url: 'accountsRecord'
    },
    {
        title: t('recharge_inspect_record'),
        id: 5,
        url: 'auditRecord'
    },
    {
        title: t('home_page_waterRecord'),
        id: 6,
        url: 'waterRecord'
    },
    {
        title: t('proxyRecord'),
        id: 7,
        url: 'proxyRecord'
    },
    {
        title: t('home_page_loginRecord'),
        id: 8,
        url: 'loginRecord'
    },

])

const activeTab = ref(1)
const changeTab = (item: any) => {
    activeTab.value = item.id
    router.push(item.url);
}

</script>

<style lang='less' scoped>
@import '@/assets/recordPage.less';

.coop_table {
    .tabs {
        margin-bottom: 40px;
        border-radius: 14px;
        padding: 4px;
        background: #0D0E2E;

        .tabs_item {
            min-width: 106px;
            color: #AEAEB0;
        }

        .active_tab {
            color: #fff;
        }

        .button {
            height: 40px;
            font-size: 18px;
        }
    }

}
</style>
