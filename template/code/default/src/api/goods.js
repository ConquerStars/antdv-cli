import axios from '@/api'

/**
 * 获取分页数据
 * @param {FetchActionListParams} FetchParams
 * @returns {Promise<AxiosResponse<<Pagination<Result[]>>>}
 */
export const FetchGoodsList = (params) => {
  return axios.get(`/goods`, {
    params,
    headers: { 'Device-Type': 'win32' }
  })
}
