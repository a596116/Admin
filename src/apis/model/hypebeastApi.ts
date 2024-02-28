import { http } from '@/plugins/axios'

export interface HypeBeast {
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
  default = 'hypebeast',
}

class HypeBeastApi {
  /**
   * @description: 獲取HypeBeast列表
   */
  fetchAll(query: any) {
    return http.request<HypeBeast[]>({
      url: `${Api.default}`,
      params: query,
    })
  }

  /**
   * @description: 獲取HypeBeast
   */
  fetch(id: string) {
    return http.request<HypeBeast>({
      url: `${Api.default}/${id}`,
    })
  }

  /**
   * @description: 新增HypeBeast
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

export default new HypeBeastApi()
