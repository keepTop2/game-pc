

import { ref } from "vue";
import pinia from "@/store";
import { storeToRefs } from 'pinia';
import { Wallet } from '@/store/wallet';


const isSearch = ref(false)
const useHeaderHooks = () => {
  const wallet = Wallet(pinia);
  const { showRedeemCode } = storeToRefs(wallet);
  const search = () => {
    isSearch.value = true
  }
  const showRedeemCodeModal = (v: boolean) => wallet.setShowRedeemCode(v);
  return {
    showRedeemCodeModal,
    showRedeemCode,
    search,
    isSearch
  }

}

export default useHeaderHooks;