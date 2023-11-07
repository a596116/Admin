<template>
  <DefaultTable
    ref="refTable"
    class="p-4"
    v-model:table-data="state.table"
    :columns="state.table.columns"
    search-placeholder="搜尋標題"
    label-text-date-range="新增日期"
    :action-buttons="['search-date-range']"
    :show-action-col="true"
    @on-change="actions.handleFetchAll"
    @search-keyword="actions.handleFetchAll()"
    @on-row-action-command="actions.handleRowActionCommand">
    <!-- 名稱 -->
    <template #title="scope">
      <TableCellLink
        :value="scope.row.title"
        @cell-click="actions.handleCellClick({ cell: 'title', row: scope.row })" />
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
import { Ithome } from '@/apis/ithomeApi'

const router = useRouter()
const state = reactive({
  table: {
    data: <Ithome[]>[],
    columns: <TableColumns[]>[],
    current: 1,
    take: 10,
    total: 1,
    sort: 'created_at-desc',
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
  handleFetchAll: () => {
    const { current: current_page, take, sort, search_params } = state.table
    const params = { current_page, take, sort, ...search_params }

    api.ithomeApi.fetchAll(params).then((result) => {
      const columns: TableColumns[] = [
        { label: '標題', prop: 'title', align: 'center', formatter: true },
        { label: '發售日期', prop: 'time', type: 'date' },
        { label: '圖片', prop: 'img', align: 'center', type: 'image' },
        { label: '新增日期', prop: 'created_at', type: 'date' },
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
      path: `/ithome/${params}`,
      query: query,
    })
  },

  /**
   * @description 點擊欄位
   */
  handleCellClick: (params: any) => {
    const { cell, row } = params
    const id = row.id
    if (cell === 'title') {
      actions.handleRoutePush(`${id}`)
    }
  },

  handleRowActionCommand: (row: IUser, command: string) => {
    switch (command) {
      case 'edit':
        actions.handleRoutePush(`edit/${row.id}`)
        break
    }
  },
}
</script>
