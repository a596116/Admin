<template>
  <DefaultTable
    ref="refTable"
    class="p-4"
    v-model:table-data="state.table"
    :columns="state.table.columns"
    search-placeholder="搜尋用戶"
    label-text-date-range="註冊日期"
    :action-buttons="['search-date-range']"
    :row-buttons="['edit', 'delete']"
    @on-change="actions.handleFetchAll"
    @search-keyword="actions.handleFetchAll(false)"
    @on-row-action-command="actions.handleRowActionCommand">
    <!-- 權限 -->
    <template #permissions="scope">
      <el-tag class="mx-1 !border-0" effect="plain">
        {{ scope.row.UserRole[0].role.name }}
      </el-tag>
    </template>
  </DefaultTable>
</template>

<script setup lang="ts">
import { dayjs } from 'element-plus'

const router = useRouter()
const state = reactive({
  loading: false,
  table: {
    data: <IUser[]>[],
    columns: <TableColumns[]>[],
    current: 1,
    take: 2,
    total: 1,
    sort: 'created_at-desc',
    message: '',
    search_params: {
      start_date: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      q: null,
    },
  },
})
onMounted(() => {
  actions.handleFetchAll()
})

const actions = {
  handleFetchAll: (showLoading = true) => {
    const { current: page, take, sort, search_params } = state.table
    const params = { page, take, sort, ...search_params }
    api.userApi.fetchAll(params).then((result) => {
      const columns: TableColumns[] = [
        { label: '名稱', prop: 'name', align: 'center' },
        { label: '手機號', prop: 'phone', width: 120 },
        { label: '狀態', prop: 'status', width: 80, type: 'status' },
        { label: '權限', prop: 'permissions', formatter: true, align: 'center' },
        { label: '頭像', prop: 'avatar', align: 'center', type: 'image' },
        { label: '註冊日期', prop: 'created_at', type: 'date' },
      ]
      const { current_page: current = 1, total = 1, per_page: take = 20, data, message } = result
      state.table = {
        data,
        columns,
        total,
        take: Number(take),
        current: Number(current),
        sort,
        search_params,
        message,
      }
    })
  },
  /**
   * @description 路由跳轉
   */
  handleRoutePush: (params: any, query?: any) => {
    router.push({
      path: `/user/${params}`,
      query: query,
    })
  },
  /*
   * @description: 刪除
   */
  handleDeleteConfirm: (id: string) => {
    mesBox
      .question({
        title: `刪除用戶?`,
        subTitle: `確定要刪除 ${id} 嗎?`,
        showCancelButton: true,
      })
      .then(() => {
        // actions.handleDelete(id, number)
      })
      .catch(() => {})
  },
  handleRowActionCommand: (row: IUser, command: string) => {
    switch (command) {
      case 'edit':
        actions.handleRoutePush(`edit/${row.id}`)
        break
      case 'delete':
        actions.handleDeleteConfirm(row.id)
        break
    }
  },
}
</script>

<style scoped></style>
