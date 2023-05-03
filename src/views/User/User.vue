<template>
  <DefaultTable
    ref="refTable"
    v-model:table-data="state.table"
    :columns="state.table.columns"
    search-placeholder="沖帳單號/票據單號/票據號碼"
    :action-buttons="[]">
    <!-- 狀態 -->
    <template #active="scope">
      <el-tag
        class="mx-1 !border-0"
        :color="scope.row.active == 1 ? '#bfccb5' : '#e9edc9'"
        effect="dark">
        {{ scope.row.active == 1 ? '啟用' : '停用' }}
      </el-tag>
    </template>
    <!-- 權限 -->
    <template #permissions="scope">
      <el-tag
        v-for="(item, index) of scope.row.permissions"
        :key="index"
        class="mx-1 !border-0"
        effect="dark">
        {{ item }}
      </el-tag>
    </template>
    <!-- 註冊日期 -->
    <template #createdAt="scope">
      {{ dayjs(scope.row.createdAt).format('YYYY-MM-DD') }}
    </template>
    <!-- 頭像 -->
    <template #avatar="scope">
      <el-image :src="scope.row.avatar && '/logo.png'" fit="cover" class="max-w-[70px]"></el-image>
    </template>
    <!-- action -->
    <template #action="scope">
      <!-- 編輯 -->
      <ButtonTipPermission
        type="edit"
        @on-submit="actions.handleRoutePush(`edit/${scope.row.id}`)" />
      <!-- 刪除 -->
      <ButtonTipPermission
        type="delete"
        @on-submit="actions.handleDeleteConfirm(scope.row.id, scope.row.number)" />
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
    take: 20,
    total: 1,
    sort: 'updated_at-desc',
    message: '',
    search_params: {
      start_date: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      start_account_date: null,
      end_account_date: null,
      currency_exchange_id: null,
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
    const params = { page }
    api.userApi.fetchAll(page).then((result) => {
      const columns: TableColumns[] = [
        { label: '名稱', prop: 'name', align: 'center' },
        { label: '手機號', prop: 'phone', width: 120 },
        { label: '狀態', prop: 'active', formatter: true, width: 80 },
        { label: '權限', prop: 'permissions', formatter: true, align: 'center' },
        { label: '頭像', prop: 'avatar', formatter: true, align: 'center' },
        { label: '註冊日期', prop: 'createdAt' },
      ]
      const { data, message } = result
      state.table = {
        ...state.table,
        data: data.rows,
        message,
        columns,
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
  handleDeleteConfirm: (id: number, number: number) => {
    mesBox
      .question({
        title: `刪除應收沖帳?`,
        subTitle: `確定要刪除 ${number} 嗎?`,
        showCancelButton: true,
      })
      .then(() => {
        // actions.handleDelete(id, number)
      })
      .catch(() => {})
  },
}
</script>

<style scoped></style>
