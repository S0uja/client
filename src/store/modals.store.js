import { createSlice } from '@reduxjs/toolkit'

export const modals = createSlice({
  name: 'modals',
  initialState: {
    productModal: false,
    authModal:false,
    cartModal:false,
    snackbarModal:false,
    snackbarSeverity:'success',
    snackbarMessage:'',
    orderModal:false,
    profileModal:false,
    confirmModal:false,
    rateModal:false,
    supportModal:true,

    adminCategoryModal:false,
    adminProductModal:false,
    adminManufacturerModal:false,
    adminPersonalModal:false,
    adminCollectionModal:false,
    adminOrderModal:false,
    adminOrderStatusModal:false,
  },
  reducers: {
    setSupportModal:(state, action) => {
      state.supportModal = action.payload
    },
    setRateModal:(state, action) => {
      state.rateModal = action.payload
    },
    setAdminOrderStatusModal: (state, action) => {
      state.adminOrderStatusModal = action.payload
    },
    setAdminOrderModal: (state, action) => {
      state.adminOrderModal = action.payload
    },
    setAdminCollectionModal: (state, action) => {
      state.adminCollectionModal = action.payload
    },
    setProductModal: (state, action) => {
      state.productModal = action.payload
    },
    setConfirmModal: (state, action) => {
      state.confirmModal = action.payload
    },
    setAuthModal: (state, action) => {
      state.authModal = action.payload
    },
    setCartModal: (state, action) => {
      state.cartModal = action.payload
    },
    setSnackbarModal: (state, action) => {
      state.snackbarModal = action.payload.modal
      state.snackbarMessage = action.payload.message
      state.snackbarSeverity = action.payload.severity
    },
    setOrderModal:(state, action) => {
      state.orderModal = action.payload
    },
    setProfileModal:(state,action) => {
      state.profileModal = action.payload
    },
    setAdminPersonalModal:(state,action) => {
      state.adminPersonalModal = action.payload
    },
    setAdminProductModal:(state,action) => {
      state.adminProductModal = action.payload
    },
    setAdminManufacturerModal:(state,action) => {
      state.adminManufacturerModal = action.payload
    },
    setAdminCategoryModal:(state,action) => {
      state.adminCategoryModal = action.payload
    },
  },
})

export const { setSupportModal,setRateModal,setAdminOrderStatusModal,setAdminOrderModal,setAdminCollectionModal, setAdminCategoryModal, setConfirmModal, setAdminProductModal, setAdminManufacturerModal, setAdminPersonalModal, setProductModal, setAuthModal, setSnackbarModal, setCartModal, setOrderModal, setProfileModal } = modals.actions

export default modals.reducer