import { RootState } from '../../../store'

export const selectAuthState = (state: RootState) => state.auth
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated
export const selectUser = (state: RootState) => state.auth.user
export const selectStatus = (state: RootState) => state.auth.status
export const selectError = (state: RootState) => state.auth.error
