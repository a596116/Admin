<template>
  <DefaultTable
    ref="refTable"
    class="p-4"
    v-model:table-data="state.table"
    :columns="state.table.columns"
    :action-buttons="['create']"
    :showHeader="false"
    :row-buttons="['edit', 'delete']"
    @on-change="actions.handleFetchAll"
    @on-command="actions.handleCommand"
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
    take: 10,
    total: 1,
    sort: 'created_at-asc',
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
    api.roleApi.fetchAll(params).then((result) => {
      const columns: TableColumns[] = [
        { label: '權限名稱', prop: 'name', align: 'center' },
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
  /*
   * @description: 刪除
   */
  handleDelete: (id: number, name: string) => {
    api.roleApi.delete(id).then((result) => {
      if (result?.code === 200) {
        mesBox
          .success({
            title: `刪除用戶權限成功`,
            subTitle: `已刪除 ${name} 的資料`,
          })
          .then(() => {
            setTimeout(() => {
              actions.handleFetchAll()
            }, 200)
          })
          .catch(() => {})
      } else {
        mesBox
          .warning({
            title: '無法刪除!',
            subTitle: `無法刪除請再確認!`,
          })
          .catch(() => {})
      }
    })
  },
  /**
   * @description 路由跳轉
   */
  handleRoutePush: (params: any, query?: any) => {
    router.push({
      path: `/role/${params}`,
      query: query,
    })
  },
  /*
   * @description: 刪除
   */
  handleDeleteConfirm: (id: number, name: string) => {
    mesBox
      .question({
        title: `刪除用戶權限?`,
        subTitle: `確定要刪除 ${name} 嗎?`,
        showCancelButton: true,
      })
      .then(() => {
        actions.handleDelete(id, name)
      })
      .catch(() => {})
  },
  handleRowActionCommand: (row: any, command: string) => {
    switch (command) {
      case 'edit':
        actions.handleRoutePush(`edit/${row.id}`)
        break
      case 'delete':
        actions.handleDeleteConfirm(row.id, row.name)
        break
    }
  },

  handleCommand: (command: string) => {
    switch (command) {
      case 'create':
        actions.handleRoutePush('create')
        break
    }
  },
}
</script>

<style scoped></style>