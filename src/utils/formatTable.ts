export function tableStyle(props?: any) {
  return {
    main: {
      header: () => {
        return {
          letterSpacing: '.4em',
          fontWeight: 500,
        }
      },
      row: () => {
        return {
          fontSize: '14px',
          height: '60px',
        }
      },
      tableRowClassName: ({ row, rowIndex }: { row: any; rowIndex: number }) => {
        if (row.id == 'total') {
          return 'row-bg--total'
        }
      },
      tableColClassName: ({ row, column }: { row: any; column: any }) => {
        // const hightLightText = 'name'
        // if (column.property === hightLightText) {
        //   return 'text-hd-primary'
        // }
        return ''
      },
    },
    expand: {
      header: () => {
        return {
          letterSpacing: '.4em',
          fontWeight: 500,
        }
      },
      row: () => {
        return {
          fontSize: '12px',
        }
      },
      tableRowClassName: ({ row, rowIndex }: { row: any; rowIndex: number }) => {
        if (row.id == 'total') {
          return 'row-bg--total'
        }
        // if (rowIndex % 2 !== 0) {
        //   return 'row-bg'
        // }
      },
      tableColClassName: ({ row, column }: { row: any; column: any }) => {
        // const hightLightText = 'name'
        // if (column.property === hightLightText) {
        //   return 'text-hd-primary'
        // }
        return ''
      },
    },
  }
}
