import { configureStore } from '@reduxjs/toolkit'
import cartReduser from './cart.store'
import categoriesReduser from './categories.store'
import manufacturersReduser from './manufacturers.store'
import modalsReduser from './modals.store'
import productsReduser from './products.store'
import userReduser from './user.store'

export const store = configureStore({
	reducer: {
		cart: cartReduser,
		categories: categoriesReduser,
		products: productsReduser,
		modals: modalsReduser,
		user: userReduser,
		manufacturers: manufacturersReduser,
	},
})
