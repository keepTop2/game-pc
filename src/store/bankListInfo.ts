import { defineStore } from 'pinia';

interface BankListInfoSpec {
  bankList: any[]; // 这里假设bankList是一个数组，具体类型根据实际情况定义
}

export const BankListInfo = defineStore({
  id: 'bankListInfo',
  persist: true,
  state: (): BankListInfoSpec => ({
    bankList: []
  }),
  actions: {
    setBankListInfo(v: any) {
      let data = v.map((item: any) => {return {value: item.bank_id, label: item.bank_name}});
      this.bankList = [...data];
    },
  },
});
