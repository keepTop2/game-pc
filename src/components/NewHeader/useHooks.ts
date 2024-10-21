

import { ref } from "vue";

const isSearch = ref(false)
const useHeaderHooks = () => {
  const search = () => {
    isSearch.value = true
  }

  return {
    search,
    isSearch
  }

}

export default useHeaderHooks;