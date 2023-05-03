export function tableStyle(props?: any) {
  return {
    main: {
      header: () => {
        return {
          letterSpacing: '.4em',
          backgroundColor: '#f8f9fa',
          // borderBottom: '1px solid #3c486b',
          fontWeight: 500,
        }
      },
      row: () => {
        return {
          backgroundColor: '#f8f9fa',
          fontSize: '14px',
          height: '60px',
        }
      },
      tableRowClassName: ({ row, rowIndex }: { row: any, rowIndex: number }) => {
        if (row.id == 'total') {
          return 'row-bg--total'
        }
        if (props?.alertRow.includes(rowIndex)) {
          return 'row-bg-alert'
        }
      },
      tableColClassName: ({ row, column }: { row: any, column: any }) => {
        const hightLightText = 'name'
        const cellLinks = props?.cellLinks || []
        const redCols = props?.redCols || []
        if (column.property === hightLightText) {
          if (cellLinks.includes(column.property)) {
            return 'text-primary-500 cursor-pointer'
          } else {
            return 'text-primary-500'
          }
        }
        if (redCols.includes(column.property)) {
          return 'text-custom-red-500'
        }
        if (cellLinks.includes(column.property)) {
          return 'text-primary-500 cursor-pointer'
        }
        if (column.property === 'in_count') {
          return 'text-green-600'
        }
        if (column.property === 'out_count') {
          return 'text-red-600'
        }
      },
    },
    expand: {
      header: () => {
        return {
          letterSpacing: '.4em',
          backgroundColor: '#E9F6FC',
          fontWeight: 500,
        }
      },
      row: () => {
        return {
          fontSize: '12px',
        }
      },
      tableRowClassName: ({ row, rowIndex }: { row: any, rowIndex: number }) => {
        if (props?.alertRow.includes(rowIndex)) {
          return 'row-bg-alert'
        }
        if (rowIndex % 2 !== 0) {
          return 'row-bg'
        }
      },
      tableColClassName: ({ row, column }: { row: any, column: any }) => {
        const hightLightText = 'name'
        const cellLinks = props?.cellLinks || []
        const redCols = props?.redCols || []
        if (column.property === hightLightText) {
          if (cellLinks.includes(column.property)) {
            return 'text-primary-500 cursor-pointer'
          } else {
            return 'text-primary-500'
          }
        }
        if (redCols.includes(column.property)) {
          return 'text-custom-red-500'
        }
        if (cellLinks.includes(column.property)) {
          return 'text-primary-500 cursor-pointer'
        }
        if (column.property === 'in_count') {
          return 'text-green-600'
        }
        if (column.property === 'out_count') {
          return 'text-red-600'
        }
      },
    },
  }
}
