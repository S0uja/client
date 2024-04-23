import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    orders: [],
    addresses: [],
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    clearUserInfo: (state, action) => {
      state.userInfo = {}
      localStorage.removeItem('token')
    },
    setOrders: (state, action) => {
      state.orders = action.payload
    },
    setAddresses: (state, action) => {
      state.addresses = action.payload
    },
  },
})

export const { setUserInfo, clearUserInfo, setOrders, setAddresses } = user.actions

export default user.reducer