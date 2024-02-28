import { http } from '@/plugins/axios'

export interface Ithome {
  id: number
  title: string
  descs: any
  img: string
  link: string
  time: string
  created_at: string
  updated_at: string
}

enum Api {
  default = 'ithome',
}

class IthomeApi {
  /**
   * @description: 獲取Ithome列表
   */
  fetchAll(query: any) {
    return http.request<Ithome[]>({
      url: `${Api.default}`,
      params: query,
    })
  }

  /**
   * @description: 獲取Ithome
   */
  fetch(id: string) {
    return http.request<Ithome>({
      url: `${Api.default}/${id}`,
    })
  }

  /**
   * @description: 新增Ithome
   */
  create(data: any) {
    return http.request({
      url: `${Api.default}`,
      method: 'post',
      data,
    })
  }

  /**
   * @description: 更新HypeBeast
   */
  update(data: any) {
    return http.request({
      url: `${Api.default}/${data.id}`,
      method: 'put',
      data,
    })
  }

  /**
   * @description: 刪除Nike
   */
  delete(id: number) {
    return http.request({
      url: `${Api.default}/${id}`,
      method: 'DELETE',
    })
  }
}

export default new IthomeApi()
