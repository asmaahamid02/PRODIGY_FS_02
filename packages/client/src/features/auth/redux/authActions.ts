import { createAsyncThunk } from '@reduxjs/toolkit'
import { ILoginRequest } from '@staffsphere/shared/src/types/requests.types'
import { getUserService, loginService } from '../services'

export const login = createAsyncThunk(
  'login',
  async (data: ILoginRequest, { rejectWithValue }) => {
    try {
      const response = await loginService(data)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getUser = createAsyncThunk(
  'getUser',
  async (_: undefined, { rejectWithValue }) => {
    try {
      const response = await getUserService()
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
