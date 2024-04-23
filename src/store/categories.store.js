import { createSlice } from '@reduxjs/toolkit'

export const categories = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    add: (state, action) => {
      if(!state.cart.filter(item => item.productId === action.payload.productId).length){
        state.cart.push(action.payload)
      }
      else{
        state.cart.forEach(item => {
          if(item.productId === action.payload.productId) item.count++
        })
      }
    },
    remove: (state,action) => {
      state.cart.forEach(item => {
        if(item.productId === action.payload.productId) {
          if(item.count<=1){
            state.cart = state.cart.filter(itemTMP => itemTMP.productId !== action.payload.productId);
          }else{
            item.count--
          }
          
        }
      })
    },
    del: (state, action) => {
      state.cart = state.cart.filter(item => item.productId !== action.payload.productId);
    },
  },
})

export const { add, remove, del, setCategories } = categories.actions

export default categories.reducer