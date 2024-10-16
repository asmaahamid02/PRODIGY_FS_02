export interface IMeta {
  total: number
  totalPages: number
  nextPage: number | null
}

export interface IStatistics {
  totalEmployees: number
  totalRoles: number
  totalDepartments: number
  totalAddedEmployees: number
  totalAddedRoles: number
  totalAddedDepartments: number
  totalExpenses: number
}

export interface IResponse<T> {
  data: T
  meta: IMeta
}
