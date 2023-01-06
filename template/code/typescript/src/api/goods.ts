import axios from '@/api'
import type { Pagination } from '@/api'
import type { AxiosResponse } from 'axios'
import type { Device } from '@/utils/filters'

/**
 * 获取执法行动 【列表】
 * @param FetchParams
 * @returns {Promise<AxiosResponse<Pagination<Goods[]>>>}
 */
type FetchGoodsListParams = {
  queryType: number
  queryValue: string
  startDate: string | number
  endDate: string | number
  page: number
  size: number
}
export type Goods = {
  id: number
  title: string
  created: number
  device: Device
  endTime?: number
  latitude: number
  location: string
  longitude: number
  remark: string
  startTime: number
  status: number
  url: string
  user: { userName: string; realName: string; avatar: string | null }
}
export const FetchGoodsList = (
  params: FetchGoodsListParams
): Promise<AxiosResponse<Pagination<Goods[]>>> => {
  return axios.get(`/goods`, {
    params,
    headers: { 'Device-Type': 'win32' }
  })
}
