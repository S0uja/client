import { createSlice } from '@reduxjs/toolkit'

export const manufacturers = createSlice({
	name: 'manufacturers',
	initialState: {
		manufacturers: [],
	},
	reducers: {
		setManufacturers: (state, action) => {
			state.manufacturers = action.payload
		},
	},
})

export const { setManufacturers } = manufacturers.actions

export default manufacturers.reducer
