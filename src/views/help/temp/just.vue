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
      <div class="he_title">{{t('如何合并开奖种子和获取开奖结果？')}}</div>
      <div class="he_txt">
        <div class="he_txt_list">我们已经详细讲解过什么是种子,我们会使用客户端种子和服务器种子进行合并，然后使用SHA512进行加密，取前几位作为我们的开奖结果，下图为开奖种子合并的过程。</div>
      </div>
      <div class="he_box">
        <div class="he_box_title">服务器种子SHA265:</div>
        <div class="he_txt_list">93FC60B08821E32D7D5D7E01FB3844888FE03D50971574AEA71D3BF6876DD2E0</div>
        <div class="he_box_title">客户端种子:</div>
        <div class="he_txt_list">4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
        <div class="he_box_title">合并后的开奖种子:</div>
        <div class="he_txt_list">vYiCl54YlcvOukoq70QXSnXZVjdHhJu6VSkXGcJn4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
        <div class="he_box_title">开奖种子SHA512哈希:</div>
        <div class="he_txt_list">
          69A80EA77183D1445E5F989C6295AD61C6D9D457F2CCB1804F4DB57AE365CDCD35C58A9FEDFD545751A23116601659F47C0C12603D5A13115DB11CED4CE4279A
        </div>
      </div>
      <div class="he_title">{{t('如何使用开奖种子？')}}</div>
      <div class="he_txt">
        <div class="he_txt_list">
          大逃杀有8个房间（具体游戏规则参照大逃杀游戏规则），对应的是8个游戏结果，所以我们只需要取8个范围的值即可，而我们加密后的字符串是16进制的，也就是表示了从0-15一共16个数字，以下为取值表。
        </div>
      </div>
      <div class="he_table">
        <n-flex class="he_table_header">
          <span class="he_table_td"> {{t('SHA512哈希首位')}} </span>
          <span class="he_table_td"> {{t('房间')}} </span>
        </n-flex>
        <div class="he_table_body">
          <n-flex class="he_table_tr"><span class="he_table_td"> 0,1 </span> <span class="he_table_td"> 1 </span></n-flex>
          <n-flex class="he_table_tr"><span class="he_table_td"> 2,3 </span> <span class="he_table_td"> 2 </span></n-flex>
          <n-flex class="he_table_tr"><span class="he_table_td"> 4,5 </span> <span class="he_table_td"> 3 </span></n-flex>
          <n-flex class="he_table_tr"><span class="he_table_td"> 6,7 </span> <span class="he_table_td"> 4 </span></n-flex>
          <n-flex class="he_table_tr"><span class="he_table_td"> 8,9 </span> <span class="he_table_td"> 5 </span></n-flex>
          <n-flex class="he_table_tr"><span class="he_table_td"> a,b </span> <span class="he_table_td"> 6 </span></n-flex>
          <n-flex class="he_table_tr"><span class="he_table_td"> c,d </span> <span class="he_table_td"> 7 </span></n-flex>
          <n-flex class="he_table_tr"><span class="he_table_td"> e,f </span> <span class="he_table_td"> 8 </span></n-flex>
        </div>

      </div>

      <div class="he_title">{{t('投注结算后，我们将展示给您：')}}</div>
      <div class="he_box">
        <div class="he_box_title">服务器种子:</div>
        <div class="he_txt_list">93FC60B08821E32D7D5D7E01FB3844888FE03D50971574AEA71D3BF6876DD2E0</div>
        <div class="he_box_title">客户端种子:</div>
        <div class="he_txt_list">4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
        <div class="he_box_title">合并后的开奖种子:</div>
        <div class="he_txt_list">vYiCl54YlcvOukoq70QXSnXZVjdHhJu6VSkXGcJn4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
        <div class="he_box_title">开奖种子SHA512哈希:</div>
        <div class="he_txt_list">
          69A80EA77183D1445E5F989C6295AD61C6D9D457F2CCB1804F4DB57AE365CDCD35C58A9FEDFD545751A23116601659F47C0C12603D5A13115DB11CED4CE4279A
        </div>
        <div class="he_box_title">SHA512哈希取值: 6</div>
        <div class="he_box_title">对应游戏结果: 房间号</div>
      </div>
    </div>

    <!-- 验证 -->
    <div v-show="curTab === 'verify'" >
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

      <div class="he_txt_list">您在该对局开奖前，可以复制并保存这两个值，开奖结束后，我们将给您提供未加密的服务器种子与未加密的合并种子，如下图所示：</div>
      <div class="he_title">{{t('验证信息')}}</div>
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
.he_table {
  width: 483px;
  border: 1px solid rgba(175, 182, 189, 0.4);
  border-radius: 16px;
  .he_table_header {
    background: #31345C;
    border-radius: 16px 16px 0 0;
  }
  .he_table_td {
    flex: 1;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(175, 182, 189, 0.4);
    &:nth-child(n+2) {
      border-left: 1px solid rgba(175, 182, 189, 0.4);
    }
  }
  .he_table_tr, .he_table_header {
    gap: 0 !important;
    &:last-child {
      .he_table_td {
        border-bottom: 0;
      }
    }
  }
}
</style>
