import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StartIcon from '@mui/icons-material/Start'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import {
	Avatar,
	Box,
	Collapse,
	ListItemAvatar,
	Typography,
} from '@mui/material'
import Tab from '@mui/material/Tab'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../http/Orders.http'
import { getOneProduct } from '../http/Products.http'
import { setCart } from '../store/cart.store'
import {
	setAuthModal,
	setProductModal,
	setSnackbarModal,
} from '../store/modals.store'
import { setProduct } from '../store/products.store'
import { setAddresses, setOrders } from '../store/user.store'
import font from '../themes/font.theme'
import CartPriceReduce from '../utils/CartPriceReduce.util'
import SyncCart from '../utils/SyncCart.util'
import ConvertToLitersAndKilograms from '../utils/СonvertToLitersAndKilograms.util'
import AutocompleteMap from './AutocompleteMap.component'
import LoadingButton from './LoadingButton.component'
import NotFoundDataComponent from './NotFoundData.component'
import ProductButton from './ProductButton.component'

const Cart = () => {
	const dispatch = useDispatch()
	const Cart = useSelector(state => state.cart.cart)
	const Addresses = useSelector(state => state.user.addresses)
	const Orders = useSelector(state => state.user.orders)
	const UserInfo = useSelector(state => state.user.userInfo)
	const [notAvailableProducts, setNotAvailableProducts] = useState(false)
	const CartAvailable = Cart.filter(item => item.product.amount > 0)
	const CartNotAvailable = Cart.filter(item => item.product.amount <= 0)
	const { totalLiters, totalKilograms } = ConvertToLitersAndKilograms(Cart)
	const [tab, setTab] = useState('1')
	const [address, setAddress] = useState(null)
	const [addressError, setAddressError] = useState({
		status: false,
		message: null,
	})

	useEffect(() => {
		setTab('1')
	}, [Cart])

	const handleOpenProductModal = id => {
		dispatch(setProductModal(true))
		getOneProduct(id)
			.then(res => dispatch(setProduct(res.data.data[0])))
			.catch(console.error)
	}
	const handleChange = (event, value) => {
		setTab(value)
	}
	const handleOpenNotAvailableProducts = () => {
		setNotAvailableProducts(!notAvailableProducts)
	}
	const handleChangeAddress = value => {
		setAddress(value)
	}
	const handleCreateOrder = async () => {
		if (!Cart) return

		const syncCart = await SyncCart(Cart)
		dispatch(setCart(syncCart))

		if (!address) {
			return setAddressError({ status: true, message: '* Обязательное поле' })
		}

		if (!Addresses.filter(item => item.displayName === address).length) {
			dispatch(setAddresses([...Addresses, { displayName: address }]))
			localStorage.setItem(
				'addresses',
				JSON.stringify([...Addresses, { displayName: address }])
			)
		}

		setAddressError({ status: false, message: null })

		await createOrder(
			address,
			syncCart.map(item => {
				return { id: item.productId, count: item.count }
			}),
			CartPriceReduce(CartAvailable)
		)
			.then(res => {
				if (res?.status === 'error' || !res) {
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'error',
							message: res?.data?.message?.join('\n') || 'Ошибка',
						})
					)
				} else {
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'success',
							message: 'Успешно',
						})
					)
					dispatch(setCart(CartNotAvailable))
					setTab('1')
					dispatch(setOrders([...Orders, res.data.data[0]]))
				}
			})
			.catch(console.error)
	}

	return (
		<Box
			sx={{
				flexGrow: 1,
				bgcolor: 'white',
				borderRadius: 2,
				p: 2,
				boxSizing: 'border-box',
				position: 'sticky',
				top: 8,
			}}
		>
			<TabContext value={tab}>
				<Box sx={{ display: 'flex', justifyContent: 'center', mt: -1 }}>
					<TabList onChange={handleChange}>
						<Tab label='Корзина' value='1' sx={{ ...font, fontSize: '13px' }} />
						<Tab
							label='Данные заказа'
							value='2'
							sx={{ ...font, fontSize: '13px' }}
						/>
					</TabList>
				</Box>

				<TabPanel value='1' sx={{ p: 0 }}>
					<Box
						sx={{
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							minHeight: '350px',
							maxHeight: '436px',
							overflowY: 'auto',
							scrollbarWidth: 'none',
							pt: 1,
						}}
					>
						{CartAvailable.length > 0 ? (
							CartAvailable.map((item, i) => {
								return (
									<Box
										key={i}
										sx={{
											boxSizing: 'border-box',
											width: '100%',
											display: 'flex',
											my: 1,
											alignItems: 'center',
										}}
									>
										<ListItemAvatar
											onClick={() => handleOpenProductModal(item.product.id)}
										>
											<Avatar
												variant='rounded'
												src={
													import.meta.env.VITE_API_STATIC_URL +
													(item.product.product_images[0]?.filename ||
														'defaultProductImage.jpg')
												}
												sx={{ width: 50, height: 50, cursor: 'pointer' }}
											/>
										</ListItemAvatar>

										<Box
											sx={{
												minWidth: '50%',
												flexGrow: 1,
												position: 'relative',
												boxSizing: 'border-box',
											}}
										>
											<Box sx={{ ...font, width: '100%' }}>
												<Typography
													variant='p'
													component='div'
													sx={{
														...font,
														width: '100%',
														wordBreak: 'break-all',
														overflow: 'hidden',
														textOverflow: 'ellipsis',
														display: '-webkit-box',
														WebkitLineClamp: 2,
														WebkitBoxOrient: 'vertical',
														lineHeight: '1.2em',
														height: '2.4em',
														whiteSpace: 'wrap',
													}}
												>
													{item.product.name}
												</Typography>
											</Box>
											<Box
												sx={{
													...font,
													display: 'flex',
													gap: 2,
													justifyContent: 'start',
													width: '100%',
												}}
											>
												<Typography
													component='div'
													variant='p'
													sx={{
														...font,
														color: '#787878',
														overflow: 'hidden',
														textOverflow: 'ellipsis',
														WebkitLineClamp: 1,
														WebkitBoxOrient: 'vertical',
														lineHeight: '1.2em',
														height: '1.2em',
													}}
												>
													{item.product.weight_volume}
												</Typography>
												<Typography
													component='div'
													variant='p'
													sx={{
														...font,
														color: '#787878',
														overflow: 'hidden',
														textOverflow: 'ellipsis',
														WebkitLineClamp: 1,
														WebkitBoxOrient: 'vertical',
														lineHeight: '1.2em',
														height: '1.2em',
													}}
												>
													{item.product.price} ₽
												</Typography>
											</Box>
										</Box>

										<Box sx={{ width: 'auto' }}>
											<ProductButton
												id={item.product.id}
												variant={'text'}
												style={{
													color: '#404040',
													padding: 0,
													flexDirection: 'column-reverse',
													justifyContent: 'center',
													alignItems: 'center',
												}}
											/>
										</Box>
									</Box>
								)
							})
						) : (
							<NotFoundDataComponent label={'Пусто'} reload={false} />
						)}
						{!!CartNotAvailable.length && (
							<Box
								sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
								onClick={handleOpenNotAvailableProducts}
							>
								<Box sx={{ flex: 1, wordWrap: 'nowrap', color: '#707070' }}>
									Недоступные к покупке
								</Box>
								{notAvailableProducts ? (
									<ExpandMoreIcon sx={{ color: '#707070' }} />
								) : (
									<ExpandLessIcon sx={{ color: '#707070' }} />
								)}
							</Box>
						)}
						{!!CartNotAvailable.length > 0 && (
							<Collapse in={notAvailableProducts} timeout='auto' unmountOnExit>
								{CartNotAvailable.map((item, i) => {
									return (
										<Box
											key={i}
											sx={{
												boxSizing: 'border-box',
												width: '100%',
												display: 'flex',
												my: 1,
												alignItems: 'center',
											}}
										>
											<ListItemAvatar>
												<Avatar
													variant='rounded'
													src={
														import.meta.env.VITE_API_STATIC_URL +
														(item.product.product_images[0]?.filename ||
															'defaultProductImage.jpg')
													}
													sx={{
														filter: 'grayscale(100%)',
														width: 50,
														height: 50,
													}}
												/>
											</ListItemAvatar>

											<Box
												sx={{
													minWidth: '50%',
													flexGrow: 1,
													position: 'relative',
													boxSizing: 'border-box',
												}}
											>
												<Box sx={{ ...font, width: '100%' }}>
													<Typography
														variant='p'
														component='div'
														sx={{
															...font,
															width: '85%',
															wordBreak: 'break-all',
															overflow: 'hidden',
															textOverflow: 'ellipsis',
															display: '-webkit-box',
															WebkitLineClamp: 2,
															WebkitBoxOrient: 'vertical',
															lineHeight: '1.2em',
															height: '2.4em',
															whiteSpace: 'wrap',
														}}
													>
														{item.product.name}
													</Typography>
												</Box>
												<Box
													sx={{
														...font,
														display: 'flex',
														gap: 2,
														justifyContent: 'start',
														width: '100%',
													}}
												>
													<Typography
														component='div'
														variant='p'
														sx={{
															...font,
															color: '#787878',
															overflow: 'hidden',
															textOverflow: 'ellipsis',
															WebkitLineClamp: 1,
															WebkitBoxOrient: 'vertical',
															lineHeight: '1.2em',
															height: '1.2em',
														}}
													>
														{item.product.weight_volume}
													</Typography>
												</Box>
											</Box>

											<Box sx={{ width: 'auto' }}>
												<ProductButton
													id={item.product.id}
													variant={'text'}
													style={{ color: '#404040', padding: 0 }}
												/>
											</Box>
										</Box>
									)
								})}
							</Collapse>
						)}
					</Box>
					<LoadingButton
						icon={<StartIcon size='small' />}
						label={'Продолжить'}
						disable={!Cart.length}
						onClick={tab => handleChange(tab, '2')}
					/>
				</TabPanel>

				<TabPanel value='2' sx={{ p: 0, pt: 2 }}>
					<AutocompleteMap
						address={address}
						setAddress={handleChangeAddress}
						errors={addressError}
					/>

					<Box sx={{ display: 'flex', width: '100%' }}>
						<Typography
							sx={{
								...font,
								flexGrow: 1,
								color: 'rgb(120, 120, 120)',
								fontSize: '12px',
							}}
						>
							Вес/Объем :
						</Typography>
						<Typography
							sx={{
								...font,
								flexGrow: 1,
								color: 'rgb(120, 120, 120)',
								fontSize: '12px',
							}}
						>
							{totalKilograms + ' КГ'}
						</Typography>
						<Typography
							sx={{
								...font,
								flexGrow: 1,
								color: 'rgb(120, 120, 120)',
								fontSize: '12px',
							}}
						>
							{totalLiters + ' Л'}
						</Typography>
					</Box>

					<Typography
						sx={{
							...font,
							color: 'rgb(120, 120, 120)',
							fontSize: '16px',
							my: 2,
						}}
					>
						Стоимость: {CartPriceReduce(CartAvailable)} ₽
					</Typography>

					<LoadingButton
						label={'Оформить'}
						disable={!Cart.length}
						onClick={() => {
							if (!UserInfo.role) {
								return dispatch(setAuthModal(true))
							}
							handleCreateOrder()
						}}
					/>
				</TabPanel>
			</TabContext>
		</Box>
	)
}

export default Cart
