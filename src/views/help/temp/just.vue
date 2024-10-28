<template>
  <div class="help_content_box">
    <n-flex class="help_nav">
      <div :class="`pointer help_nav_item ${curTab === item.value && 'active'}`" v-for="(item, index) in navArr" :key="index" @click="changeTab(item)">
        {{t(item.label)}}
      </div>
    </n-flex>
    <!-- 概述 -->
    <div v-show="curTab === 'overview'" class="he_txt">
      <div class="he_txt_list">
        {{ t('help_page_just_txt_1') }}</div>
      <div class="he_txt_list">{{t('help_page_just_txt_2')}}</div>
      <div class="he_txt_list">{{t('help_page_just_txt_3')}}</div>
    </div>

    <!-- 种子 -->
    <div v-show="curTab === 'seed'" >
      <div class="he_title">{{t('help_page_just_txt_4')}}</div>
      <div class="he_txt">
        <div class="he_txt_list">{{ t('help_page_just_txt_5') }}</div>
      </div>
      <div class="he_box">
        <div class="he_box_title">{{ t('help_page_just_txt_6') }}:</div>
        <div class="he_txt_list">93FC60B08821E32D7D5D7E01FB3844888FE03D50971574AEA71D3BF6876DD2E0</div>
        <div class="he_box_title">{{ t('help_page_just_txt_6') }}:</div>
        <div class="he_txt_list">vYiCl54YlcvOukoq70QXSnXZVjdHhJu6VSkXGcJn</div>
        <div class="he_box_title">{{ t('help_page_just_txt_7') }}:</div>
        <div class="he_txt_list">4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
        <div class="he_box_title">{{ t('help_page_just_txt_8') }}:</div>
        <div class="he_txt_list">BVCSlcvOukoq70QXSnXZVjdHhJu6VSkXGc5678</div>
        <div class="he_box_title">{{ t('help_page_just_txt_9') }}:</div>
        <div class="he_txt_list" style="margin-bottom: 0">mNQON2ccQ5x1eyIN4VWqC169r4zRhr4X</div>
      </div>
      <div class="he_txt">
        <div class="he_txt_list">{{ t('help_page_just_txt_10') }}</div>
        <div class="he_txt_list">{{ t('help_page_just_txt_11') }}</div>
        <div class="he_txt_list">{{ t('help_page_just_txt_12') }}</div>
        <div class="he_txt_list">{{ t('help_page_just_txt_13') }}</div>
        <div class="he_txt_list">{{ t('help_page_just_txt_14') }}</div>
      </div>
      <div class="he_title">{{t('help_page_just_txt_15')}}</div>
      <div class="he_txt_list">{{t('help_page_just_txt_16')}} <span class="sec_color">{{ t('help_page_just_txt_17') }}</span> {{t('help_page_just_txt_18')}}
        <span class="sec_color"> {{ t('help_page_just_txt_19') }} </span> {{ t('help_page_just_txt_20') }} <span class="sec_color"> {{t('help_page_just_txt_21')}}</span>, {{t('help_page_just_txt_22')}} </div>
      <div class="he_txt_list"> {{t('help_page_just_txt_23')}} </div>

    </div>

    <!-- 开奖 -->
    <div v-show="curTab === 'draw'" >
      <div class="he_title">{{t('help_page_just_txt_25')}}</div>
      <div class="he_txt">
        <div class="he_txt_list"> {{t('help_page_just_txt_26')}}</div>
      </div>
      <div class="he_box">
        <div class="he_box_title">{{ t('help_page_just_txt_27') }}:</div>
        <div class="he_txt_list">93FC60B08821E32D7D5D7E01FB3844888FE03D50971574AEA71D3BF6876DD2E0</div>
        <div class="he_box_title">{{ t('help_page_just_txt_17') }}:</div>
        <div class="he_txt_list">4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
        <div class="he_box_title">{{ t('help_page_just_txt_28') }}:</div>
        <div class="he_txt_list">vYiCl54YlcvOukoq70QXSnXZVjdHhJu6VSkXGcJn4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
        <div class="he_box_title">{{ t('help_page_just_txt_29') }}:</div>
        <div class="he_txt_list">
          69A80EA77183D1445E5F989C6295AD61C6D9D457F2CCB1804F4DB57AE365CDCD35C58A9FEDFD545751A23116601659F47C0C12603D5A13115DB11CED4CE4279A
        </div>
      </div>
      <div class="he_title">{{t('help_page_just_txt_30')}}</div>
      <div class="he_txt">
        <div class="he_txt_list">
          {{t('help_page_just_txt_31')}}
        </div>
      </div>
      <div class="he_table">
        <n-flex class="he_table_header">
          <span class="he_table_td"> {{t('help_page_just_txt_32')}} </span>
          <span class="he_table_td"> {{t('help_page_just_txt_33')}} </span>
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

      <div class="he_title">{{t('help_page_just_txt_34')}}:</div>
      <div class="he_box">
        <div class="he_box_title">{{ t('help_page_just_txt_19') }}:</div>
        <div class="he_txt_list">93FC60B08821E32D7D5D7E01FB3844888FE03D50971574AEA71D3BF6876DD2E0</div>
        <div class="he_box_title">{{ t('help_page_just_txt_17') }}:</div>
        <div class="he_txt_list">4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
        <div class="he_box_title">{{ t('help_page_just_txt_28') }}:</div>
        <div class="he_txt_list">vYiCl54YlcvOukoq70QXSnXZVjdHhJu6VSkXGcJn4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
        <div class="he_box_title">{{ t('help_page_just_txt_29') }}:</div>
        <div class="he_txt_list">
          69A80EA77183D1445E5F989C6295AD61C6D9D457F2CCB1804F4DB57AE365CDCD35C58A9FEDFD545751A23116601659F47C0C12603D5A13115DB11CED4CE4279A
        </div>
        <div class="he_box_title">{{ t('help_page_just_txt_35') }}: 6</div>
        <div class="he_box_title">{{ t('help_page_just_txt_36') }}</div>
      </div>
    </div>

    <!-- 验证 -->
    <div v-show="curTab === 'verify'" >
      <div class="he_title">{{t('help_page_just_txt_37')}}</div>
      <div class="he_txt">
        <div class="he_txt_list">{{t('help_page_just_txt_38')}}</div>
      </div>

      <div class="he_txt_list">{{ t('help_page_just_txt_39') }}：</div>
      <div class="he_title">{{t('help_page_just_txt_40')}}</div>
      <div class="he_box">
        <div class="he_box_title">{{ t('help_page_just_txt_9') }}:</div>
        <div class="he_txt_list">4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
        <div class="he_box_title">{{ t('help_page_just_txt_41') }}:</div>
        <div class="he_txt_list">4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
      </div>

      <div class="he_txt_list"> {{t('help_page_just_txt_42')}} :</div>
      <div class="he_title">{{t('help_page_just_txt_43')}}</div>
      <div class="he_box">
        <div class="he_box_title">{{ t('help_page_just_txt_27') }}:</div>
        <div class="he_txt_list">93FC60B08821E32D7D5D7E01FB3844888FE03D50971574AEA71D3BF6876DD2E0</div>
        <div class="he_box_title">{{ t('help_page_just_txt_19') }}:</div>
        <div class="he_txt_list">vYiCl54YlcvOukoq70QXSnXZVjdHhJu6VSkXGcJn</div>
        <div class="he_box_title">{{ t('help_page_just_txt_17') }}:</div>
        <div class="he_txt_list">4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
        <div class="he_box_title">{{ t('help_page_just_txt_28') }}:</div>
        <div class="he_txt_list">vYiCl54YlcvOukoq70QXSnXZVjdHhJu6VSkXGcJn4Gs0FmBQvzbrcA6trO935S5pcb7hak70</div>
        <div class="he_box_title">{{ t('help_page_just_txt_29') }}:</div>
        <div class="he_txt_list">69A80EA77183D1445E5F989C6295AD61C6D9D457F2CCB1804F4DB57AE365CDCD35C58A9FEDFD545751A23116601659F47C</div>
      </div>

      <div class="he_title">{{t('help_page_just_txt_44')}}: </div>
      <div class="he_title">{{t('help_page_just_txt_45')}}</div>
      <div class="he_txt">
        <div class="he_txt_list">{{ t('help_page_just_txt_46') }}</div>
        <div class="he_txt_list">{{ t('help_page_just_txt_29') }}:</div>
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
  {label: 'help_page_just_txt_gs', value: 'overview'},
  {label: 'help_page_just_txt_zz', value: 'seed'},
  {label: 'help_page_just_txt_kj', value: 'draw'},
  {label: 'help_page_just_txt_yz', value: 'verify'},
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
