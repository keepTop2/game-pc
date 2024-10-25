<template>
  <div class="help_content_box">
    <n-flex class="help_nav">
      <div :class="`pointer help_nav_item ${curTab === item.value && 'active'}`" v-for="(item, index) in navArr" :key="index" @click="changeTab(item)">
        {{t(item.label)}}
      </div>
    </n-flex>
    <!-- 概述 -->
    <div v-show="curTab === 'overview'" class="he_txt">
      <div class="he_txt_list">可证明的公平性是加密货币和区块链技术促成的一项技术，它使玩家或赌场无法作弊。您不再需要因为输掉的赌注而怀疑赌场。因此，无论您玩什么游戏，您都可以确信结果是公平和准确的，因为我们的赌博平台具有可证明的公平性。要检查每个赌注，您可以查看投注记录，您将获得每个赌注的更多详细信息。</div>
      <div class="he_txt_list">PKBET使用SHA-256技术将对局种子和服务器种子（系统开奖因素）加密后的64位16进制字符串预先展示给玩家并让玩家保存好，对局结束后，向玩家公布未加密的服务器种子原始值与开奖取值过程，玩家使用未加密的服务器原始值去任意一个SHA-256加密网站进行加密，对照一下是否为之前保存好的那串字符串，如果字符串一致，则代表游戏结果没有被篡改。具体图文流程参考：《种子》界面</div>
      <div class="he_txt_list">我们的开奖结果是由服务器种子与对局种子合并后经过SHA-512加密后根据游戏的不同，取前几位作为开奖结果，具体开奖流程参考：《开奖》界面。</div>
    </div>

    <!-- 种子 -->
    <div v-show="curTab === 'seed'" >
      <div class="he_title">{{t('什么是种子？')}}</div>
      <div class="he_txt">
        <div class="he_txt_list">种子是生成的字符串，用于加密目的，以下是投注时展示给您的信息。</div>
      </div>
      <div class="he_box">
        <div class="he_box_title">上一局的服务器种子SHA265:</div>
        <div class="he_txt_list">93FC60B08821E32D7D5D7E01FB3844888FE03D50971574AEA71D3BF6876DD2E0</div>
        <div class="he_box_title">上一局的服务器种子SHA265:</div>
        <div class="he_txt_list">vYiCl54YlcvOukoq70QXSnXZVjdHhJu6VSkXGcJn</div>
        <div class="he_box_title">上一局的客户端种子:</div>
        <div class="he_txt_list">4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
        <div class="he_box_title">下一局的服务器种子:</div>
        <div class="he_txt_list">BVCSlcvOukoq70QXSnXZVjdHhJu6VSkXGc5678</div>
        <div class="he_box_title">下一局的客户端种子:</div>
        <div class="he_txt_list" style="margin-bottom: 0">mNQON2ccQ5x1eyIN4VWqC169r4zRhr4X</div>
      </div>
      <div class="he_txt">
        <div class="he_txt_list">上一局的服务器种子 SHA256：我们这边生成的上一局的种子（加密的 SHA256）</div>
        <div class="he_txt_list">上一局的服务器种子：我们这边生成的上一局的服务器种子</div>
        <div class="he_txt_list">上一局的客户端种子：您这边客户端生成的上一局的客户端种子</div>
        <div class="he_txt_list">下一局的服务器种子 SHA256：下一局的服务器种子（加密的 SHA256）</div>
        <div class="he_txt_list">下一局的客户端种子：您的下一局的客户端种子</div>
      </div>
      <div class="he_title">{{t('种子用来干什么？')}}</div>
      <div class="he_txt_list">在您投注后，我们会使用<span class="sec_color">客户端种子</span>和<span class="sec_color">服务器种子</span>进行<span class="sec_color">合并</span>，然后使用SHA512进行加密，根据游戏规则的不同，取数字的前几位作为我们的开奖结果。 </div>
      <div class="he_txt_list">SHA512 哈希：服务器种子和客户端种子合并后使用 SHA512 加密 </div>

    </div>

    <!-- 开奖 -->
    <div v-show="curTab === 'draw'" >
      <div class="he_title">{{t('如何验证对局是否公平？')}}</div>
      <div class="he_txt">
        <div class="he_txt_list">PKBET支持两次验证：验证开奖结果种子与验证服务器种子</div>
      </div>

      <div class="he_txt_list">投注时我们会向您提供以下信息：</div>
      <div class="he_title">{{t('即将开始下一局的验证信息')}}</div>
      <div class="he_box">
        <div class="he_box_title">下一局的客户端种子:</div>
        <div class="he_txt_list">4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
        <div class="he_box_title">下一局的服务器种子SHA265:</div>
        <div class="he_txt_list">4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
      </div>

      <div class="he_txt_list">您在该对局开奖前，可以复制并保存这两个值，开奖结束后，我们将给您提供未加密的服务器种子与未加密的合并种子，如下图所示:</div>
      <div class="he_title">{{t('即将开始下一局的验证信息')}}</div>
      <div class="he_box">
        <div class="he_box_title">服务器种子SHA265:</div>
        <div class="he_txt_list">93FC60B08821E32D7D5D7E01FB3844888FE03D50971574AEA71D3BF6876DD2E0</div>
        <div class="he_box_title">服务器种子:</div>
        <div class="he_txt_list">vYiCl54YlcvOukoq70QXSnXZVjdHhJu6VSkXGcJn</div>
        <div class="he_box_title">客户端种子:</div>
        <div class="he_txt_list">4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
        <div class="he_box_title">合并后的开奖种子:</div>
        <div class="he_txt_list">vYiCl54YlcvOukoq70QXSnXZVjdHhJu6VSkXGcJn4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
        <div class="he_box_title">开奖种子SHA512哈希:</div>
        <div class="he_txt_list">69A80EA77183D1445E5F989C6295AD61C6D9D457F2CCB1804F4DB57AE365CDCD35C58A9FEDFD545751A23116601659F47C</div>
      </div>

      <div class="he_title">{{t('您可以任选以下两种验证方式的其中一种：')}}</div>
      <div class="he_title">{{t('第一种：验证服务器种子是否被篡改过')}}</div>
      <div class="he_txt">
        <div class="he_txt_list">步骤1：复制服务器种子</div>
        <div class="he_txt_list">开奖种子SHA512哈希:</div>
        <div class="he_txt_list">69A80EA77183DAE365CDD545751A23116601659F47C</div>
      </div>
    </div>

    <!-- 验证 -->
    <div v-show="curTab === 'verify'" >

    </div>

  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const curTab: any = ref('overview');
const navArr = [
  {label: '概述', value: 'overview'},
  {label: '种子', value: 'seed'},
  {label: '开奖', value: 'draw'},
  {label: '验证', value: 'verify'},
]
const changeTab = (e: any) => {
  curTab.value = e.value
}
</script>

<style lang='less' scoped>
@import './index.less';
.he_txt_list, .he_txt_list_1 {
  margin-bottom: 10px;
  .sec_color {
    color: #FAC904;
  }
}
.he_title {
  &:nth-child(n+2) {
    margin-top: 16px !important;
  }
}
</style>
