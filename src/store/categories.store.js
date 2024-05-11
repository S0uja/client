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
	},
})

export const { setCategories } = categories.actions

export default categories.reducer
