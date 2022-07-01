import axios from 'axios'
import { INVALID_TOKEN, NO_PERMISSION, OK_CODE } from '@/app/keys'
import router from '@/router'
import type { IUserInfo } from '@/store/modules/useUserStore'
import useUserStore from '@/store/modules/useUserStore'

const requests = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 20 * 1000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {
  config = config || {}
  const user = JSON.parse(localStorage.getItem('user') || '{}') as IUserInfo
  if (user.token)
    config.headers!.Authorization = `Bearer ${user.token}`

  return config
})

requests.interceptors.response.use(
  (resp) => {
    const { code, msg } = resp.data || {}
    const userStore = useUserStore()
    if (code === OK_CODE)
      return Promise.resolve(resp)

    if (code === INVALID_TOKEN) {
      // console.log('INVALID_TOKEN')
      userStore.logout()
      router.push({
        name: 'Login',
      })
      return Promise.reject(msg)
    }
    if (code === NO_PERMISSION) {
      router.push({
        name: 'Login',
      })
      return Promise.reject(msg)
    }
    return Promise.resolve(resp)
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default requests
