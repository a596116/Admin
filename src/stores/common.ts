import { isEmpty, isEqual } from 'lodash-es'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('error', () => {
  const loading = ref<boolean>(false)

  const formEdit = reactive<any>({
    isFormEdit: false,
    oldForm: {},
  })

  const setIsFormEdit = (b: boolean) => {
    formEdit.isFormEdit = b
  }
  const setOldForm = (form: any) => {
    formEdit.oldForm = form
  }
  const isFormEdit = (form: any) => {
    // 取出不為空的欄位
    const oldForm = Object.keys(formEdit.oldForm).reduce((obj: any, key) => {
      if (!isEmpty(formEdit.oldForm[key])) {
        obj[key] = formEdit.oldForm[key]
      }
      return obj
    }, {})
    const newForm = Object.keys(form).reduce((obj: any, key) => {
      if (!isEmpty(form[key])) {
        obj[key] = form[key]
      }
      return obj
    }, {})
    if (isEqual(newForm, oldForm)) {
      formEdit.isFormEdit = false
    } else {
      formEdit.isFormEdit = true
    }
  }

  return { loading, isFormEdit, formEdit, setIsFormEdit, setOldForm }
})
