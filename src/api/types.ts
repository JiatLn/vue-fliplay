import type { IUserInfo } from '@/store/modules/useUserStore'

export interface BasicResp<T> {
  code: number
  data: T
  msg: string
}

export interface LoginResp {
  token: string
  user: Partial<IUserInfo>
}

export interface DataResp<T> {
  code: number
  total: number
  rows: T
  msg: string
}

export interface IPageParams {
  pageNum: number
  pageSize: number
}
