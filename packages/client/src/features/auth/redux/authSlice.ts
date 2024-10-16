import { IGetUserResponse, ILoginResponse } from './../services/index'
import { IUser } from '@staffsphere/shared/src/types/user.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUser, login, logout } from './authActions'

interface IAuthState {
  user?: IUser | null
  isAuthenticated: boolean
  status: 'idle' | 'loading' | 'failed'
}

const initialState: IAuthState = {
  isAuthenticated: false,
  status: 'idle',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    clearUser: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<ILoginResponse>) => {
          state.status = 'idle'
          state.user = action.payload.user
          state.isAuthenticated = true
        }
      )
      .addCase(login.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(getUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<IGetUserResponse>) => {
          state.user = action.payload.data.user
          state.status = 'idle'
          state.isAuthenticated = true
        }
      )
      .addCase(getUser.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.status = 'idle'
      })
      .addCase(logout.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer
