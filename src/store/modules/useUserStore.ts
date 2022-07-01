import { defineStore } from 'pinia'

export interface IUserInfo {
  token: string
  name: string
  id: string
}

export const USER_KEY = 'user'

const useUserStore = defineStore({
  id: USER_KEY,
  state: (): IUserInfo => {
    return {
      token: '',
      name: '',
      id: '',
    }
  },
  getters: {
    isLogin(): boolean {
      return this.token !== ''
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setId(id: string) {
      this.id = id
    },
    login(user: Partial<IUserInfo>) {
      this.$patch({
        ...user,
      })
    },
    logout() {
      this.$state = {
        token: '',
        name: '',
        id: '',
      }
      localStorage.removeItem(USER_KEY)
    },
  },
})

export const initUserStore = () => {
  const instance = useUserStore()
  instance.$subscribe((mutation, state) => {
    localStorage.setItem(instance.$id, JSON.stringify(state))
  })

  const val = localStorage.getItem(instance.$id)
  if (val)
    instance.login(JSON.parse(val))
}

export default useUserStore
