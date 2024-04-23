import { createSlice } from '@reduxjs/toolkit'

export const products = createSlice({
  name: 'products',
  initialState: {
    collections: [],
    products: [],
    productsLoading:true,
    productInfo: null,
    search: null,
    category:null,
    sort:null,
    page:1,
    totalPages:0,
    searchInput:''
  },
  reducers: {
    setCollections: (state, action) => {
      state.collections = action.payload
      state.products = []
    }, 
    setProductsLoading: (state, action) => {
      state.productsLoading = action.payload
    }, 
    setSearchInput: (state, action) => {
      state.searchInput = action.payload
    },  
    setProducts: (state, action) => {
      state.products = action.payload
      state.collections = []
    },  
    setProduct: (state,action) => {
      state.productInfo = action.payload
    },
    setTotalPages: (state,action) => {
      state.totalPages = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setCategory: (state, action) => {
        state.category = action.payload
    },
    setSort: (state, action) => {
        state.sort = action.payload
    },
    setPage: (state, action) => {
        state.page = action.payload
    }
  }
})

export const { setCollections, setProductsLoading, setSearchInput, setTotalPages, setProducts, setProduct, setSearch, setCategory, setPage, setSort } = products.actions

export default products.reducer