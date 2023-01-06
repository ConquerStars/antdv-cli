export class Pagination {
  showTotal: (num: number) => string
  current: number
  pageSize: number
  total: number
  showSizeChanger: boolean
  pageSizeOptions: string[]
  constructor(p?: Partial<Pagination>) {
    this.showTotal = p?.showTotal ?? ((totle = 0) => `共 ${totle} 条`)
    this.current = p?.current ?? 1
    this.pageSize = p?.pageSize ?? 10
    this.total = p?.total ?? 0
    this.showSizeChanger = p?.showSizeChanger ?? true
    this.pageSizeOptions = p?.pageSizeOptions ?? ['10', '20', '50', '100']
  }
}

export const defaultDateFormat = 'YYYY-MM-DD HH:mm:ss'
