<template>
  <DefaultTable
    ref="refTable"
    class="p-2"
    v-model:table-data="state.table"
    :columns="state.table.columns"
    search-placeholder="搜尋Line用戶"
    label-text-date-range="註冊日期"
    :action-buttons="['search-date-range']"
    :show-action-col="true"
    :show-index="false"
    @on-change="actions.handleFetchAll"
    @search-keyword="actions.handleFetchAll()"
    @on-row-action-command="actions.handleRowActionCommand">
    <!-- 名稱 -->
    <template #displayName="scope">
      <TableCellLink
        :value="scope.row.displayName"
        @cell-click="actions.handleCellClick({ cell: 'displayName', row: scope.row })" />
    </template>

    <!-- 推播 -->
    <template #nike_broadcast="scope">
      <TagStatus :status="Number(scope.row.nike_broadcast)" />
    </template>
    <template #hypebeast_broadcast="scope">
      <TagStatus :status="Number(scope.row.hypebeast_broadcast)" />
    </template>
    <template #ithome_broadcast="scope">
      <TagStatus :status="Number(scope.row.ithome_broadcast)" />
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
import { LineUser } from '@/apis/line-userApi'
import { dayjs } from 'element-plus'

const router = useRouter()
const state = reactive({
  table: {
    data: <LineUser[]>[],
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
  handleFetchAll: () => {
    const { current: current_page, take, sort, search_params } = state.table
    const params = { current_page, take, sort, ...search_params }
    api.LineUserApi.fetchAll(params).then((result) => {
      const columns: TableColumns[] = [
        { label: '名稱', prop: 'displayName', align: 'center', formatter: true },
        { label: '狀態', prop: 'status', width: 100, align: 'center', type: 'status' },
        { label: '頭像', prop: 'pictureUrl', align: 'center', type: 'image' },
        { label: 'nike推播', prop: 'nike_broadcast', align: 'center', formatter: true },
        { label: 'hypebeast推播', prop: 'hypebeast_broadcast', align: 'center', formatter: true },
        { label: 'ithome推播', prop: 'ithome_broadcast', align: 'center', formatter: true },
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
      path: `/lineUser/${params}`,
      query: query,
    })
  },

  /**
   * @description 點擊欄位
   */
  handleCellClick: (params: any) => {
    const { cell, row } = params
    const id = row.id
    if (cell === 'displayName') {
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

<style scoped></style>
