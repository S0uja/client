import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { ThemeProvider } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CategoriesComponent from './components/AdminCategories.component'
import CollectionsComponent from './components/AdminCollections.component'
import DashboardComponent from './components/AdminDashboard.component'
import AdminList from './components/AdminList.component'
import ManufacturersComponent from './components/AdminManufacturers.component'
import OrderStatusesComponent from './components/AdminOrderStatuses.component'
import OrdersComponent from './components/AdminOrders.component'
import PersonalComponent from './components/AdminPersonal.component'
import ProductsComponent from './components/AdminProducts.component'
import ReportsComponent from './components/AdminReports.component'
import AdminSQLComponent from './components/AdminSQL.components'
import SupportComponent from './components/AdminSupport.component'
import UsersComponent from './components/AdminUsers.component'
import Header from './components/Header.component'
import { userCheck } from './http/User.http'
import SnackbarModal from './modals/Snackbar.modal'
import { setSnackbarModal } from './store/modals.store'
import { setUserInfo } from './store/user.store'
import theme from './themes/colors.theme'

const Admin = () => {
	const [loading, setLoading] = useState(false)
	const [tab, setTab] = useState('dashboard')
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (localStorage.getItem('token')) {
					const userResponse = await userCheck()

					if (!userResponse) {
						navigate('/')
						dispatch(
							setSnackbarModal({
								modal: true,
								severity: 'error',
								message: 'Непредвиденная ошибка, попробуйте позже',
							})
						)
					} else if (userResponse.data.data[0].status === 'error') {
						navigate('/')
						dispatch(
							setSnackbarModal({
								modal: true,
								severity: 'error',
								message: userResponse.data.message.join('\n'),
							})
						)
					} else if (userResponse.data.data[0].role === 'admin') {
						dispatch(setUserInfo(userResponse.data.data[0]))
						setLoading(false)
					} else {
						navigate('/')
						dispatch(
							setSnackbarModal({
								modal: true,
								severity: 'error',
								message: 'Недостаточно прав',
							})
						)
					}
				} else {
					navigate('/')
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'error',
							message: 'Не авторизован',
						})
					)
				}
			} catch (error) {
				console.error('Ошибка в запросах:', error)
			}
		}
		fetchData()
	}, [dispatch, navigate])

	const handleChangeTap = id => {
		setTab(id)
	}

	return (
		<>
			{loading ? (
				<Box
					sx={{
						height: '200px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					Проверка доступа...
				</Box>
			) : (
				<ThemeProvider theme={theme}>
					<SnackbarModal />

					<Grid
						maxWidth={'xl'}
						container={true}
						disableEqualOverflow
						sx={{
							width: '100vw',
							px: 1,
							pb: 1,
							pt: 0,
							m: 0,
							position: 'relative',
							boxSizing: 'border-box',
						}}
					>
						<Grid
							es={12}
							xs={12}
							sm={12}
							md={12}
							lg={12}
							xl={12}
							sx={{
								pb: 1,
								display: {
									es: 'block',
									xs: 'block',
									sm: 'block',
									md: 'block',
									lg: 'block',
									xl: 'block',
								},
							}}
						>
							<Header />
						</Grid>

						<Grid
							es={12}
							xs={12}
							sm={12}
							md={3.5}
							lg={3}
							xl={3}
							sx={{
								pr: { es: 0, xs: 0, sm: 0, md: 2, lg: 2, xl: 2 },
								pb: { es: 2, xs: 2, sm: 2, md: 0, lg: 0, xl: 0 },
								display: {
									es: 'block',
									xs: 'block',
									sm: 'block',
									md: 'block',
									lg: 'block',
									xl: 'block',
								},
							}}
						>
							<AdminList onChange={handleChangeTap} />
						</Grid>

						<Grid
							es={12}
							xs={12}
							sm={12}
							md={8.5}
							lg={9}
							xl={9}
							sx={{
								width: '100%',
								display: {
									es: 'block  ',
									xs: 'block',
									sm: 'block',
									md: 'block',
									lg: 'block',
									xl: 'block',
								},
							}}
						>
							{tab === 'support' && <SupportComponent />}
							{tab === 'reports' && <ReportsComponent />}
							{tab === 'dashboard' && <DashboardComponent />}
							{tab === 'categories' && <CategoriesComponent />}
							{tab === 'manufacturers' && <ManufacturersComponent />}
							{tab === 'personal' && <PersonalComponent />}
							{tab === 'products' && <ProductsComponent />}
							{tab === 'collections' && <CollectionsComponent />}
							{tab === 'users' && <UsersComponent />}
							{tab === 'orders' && <OrdersComponent />}
							{tab === 'order_statuses' && <OrderStatusesComponent />}
							{tab === 'sql' && <AdminSQLComponent />}
						</Grid>
					</Grid>
				</ThemeProvider>
			)}
		</>
	)
}

export default Admin
