<template>
  <DefaultTable
    ref="refTable"
    class="p-2"
    v-model:table-data="state.table"
    :columns="state.table.columns"
    search-placeholder="搜尋用戶"
    label-text-date-range="註冊日期"
    :action-buttons="['search-date-range']"
    :show-action-col="true"
    @on-change="actions.handleFetchAll"
    @search-keyword="actions.handleFetchAll(false)"
    @on-row-action-command="actions.handleRowActionCommand">
    <!-- 名稱 -->
    <template #name="scope">
      <TableCellLink
        :value="scope.row.name"
        @cell-click="actions.handleCellClick({ cell: 'name', row: scope.row })" />
    </template>

    <!-- 權限 -->
    <template #permissions="scope">
      <TableCellLink
        :value="scope.row.UserRole[0].role.name"
        @cell-click="actions.handleCellClick({ cell: 'permissions', row: scope.row })" />
    </template>

    <template #action="scope">
      <!-- 編輯 -->
      <ButtonTipPermission
        :root="scope.index == 0 ? true : false"
        type="edit"
        @on-submit="actions.handleRoutePush(`edit/${scope.row.id}`)" />
    </template>
  </DefaultTable>
</template>

<script setup lang="ts">
const router = useRouter()
const state = reactive({
  loading: false,
  table: {
    data: <IUser[]>[],
    columns: <TableColumns[]>[],
    current: 1,
    take: 5,
    total: 1,
    sort: 'created_at-asc',
    message: '',
    search_params: {
      start_date: null,
      end_date: null,
      q: null,
    },
  },
  cellLinks: {
    main: ['permissions'],
  },
})
onMounted(() => {
  actions.handleFetchAll()
})

const actions = {
  handleFetchAll: (showLoading = true) => {
    const { current: current_page, take, sort, search_params } = state.table
    const params = { current_page, take, sort, ...search_params }
    api.userApi.fetchAll(params).then((result) => {
      const columns: TableColumns[] = [
        { label: '名稱', prop: 'name', align: 'center', formatter: true },
        { label: '帳號', prop: 'account', width: 120 },
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

  /**
   * @description 點擊欄位
   */
  handleCellClick: (params: any) => {
    const { cell, row } = params
    const id = row.id
    if (cell === 'permissions') {
      router.push({
        path: `/role/${id}`,
      })
    }
    if (cell === 'name') {
      actions.handleRoutePush(`${id}`)
    }
  },

  /*
   * @description: 刪除
   */
  handleDeleteConfirm: (id: number) => {
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
