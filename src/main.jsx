import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import NotFound from './404'
import Admin from './Admin'
import App from './App'
import { store } from './store/index.store'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path='/admin' element={<Admin />} />
					<Route path='/' element={<App />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
		</Provider>
	</React.StrictMode>
)
