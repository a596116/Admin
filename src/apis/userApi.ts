import { http } from '@/plugins/axios'
export interface Data<T> {
  count: number
  rows: T[]
}

class userApi {
  /**
   * @description: 獲取用戶列表
   */
  fetchAll(query: any) {
    return http.request<IUser[]>({
      url: `auth`,
      params: query,
    })
  }


  // 修改資料data(table哪張表, id哪筆資料, data要修改的資料)
  update(table: string, id: string, data: any) {
    return http.request({
      url: `data/${table}?id=${id}`,
      method: 'put',
      data,
    })
  }

  create<T>(table: string, data: T) {
    return http.request({
      url: `data/create/${table}`,
      method: 'post',
      data
    })
  }

  delete(table: string, id: number) {
    return http.request({
      url: `data/${table}?id=${id}`,
      method: 'DELETE'
    })
  }

}

export default new userApi()
