import { ref } from 'vue'
import { defineStore } from 'pinia'

const useToken = defineStore('token', () => {
  const token = ref(null)

  // 获取用户信息
  const userInfoStores = ref({});
  // 更新获取用户信息
  const updateSserInfoStores = (val) => { userInfoStores.value = val }

  //修改token方法
  const updateToken = (val) => token.value = val
  //删除token方法
  const removeToken = () => token.value = null

  return { token, updateToken, removeToken, userInfoStores,updateSserInfoStores }
}, { persist: true })




export default useToken