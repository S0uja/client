import { Backdrop, Box, Button, Chip, Modal, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CloseButtonComponent from '../components/CloseButton.component'
import NotFoundDataComponent from '../components/NotFoundData.component'
import { getAllOrders } from '../http/Orders.http'
import { getOneProduct } from '../http/Products.http'
import {
	setOrderModal,
	setProductModal,
	setRateModal,
} from '../store/modals.store'
import { setProduct } from '../store/products.store'
import { setOrders } from '../store/user.store'
import font from '../themes/font.theme'
import modal from '../themes/modal.theme'
import AddLeadingZeros from '../utils/AddLeadingZeros.util'
import FormatDate from '../utils/FormatDate.util'
import GetStatusColor from '../utils/GetStatusColor.util'

const OrderModal = () => {
	const [loading, setLoading] = useState(true)
	const [update, setUpdate] = useState(false)
	const dispatch = useDispatch()
	const Orders = useSelector(state => state.user.orders)
	const OrderModalStatus = useSelector(state => state.modals.orderModal)

	useEffect(() => {
		getAllOrders().then(res => {
			dispatch(setOrders(res.data.data))
			setLoading(false)
		})
	}, [loading])

	const openRateProductModal = () => {
		dispatch(setRateModal(true))
	}

	const handleOpenProductModal = id => {
		dispatch(setProductModal(true))
		getOneProduct(id)
			.then(res => dispatch(setProduct(res.data.data[0])))
			.catch(console.error)
	}

	const handleCloseOrderModal = () => {
		dispatch(setOrderModal(false))
	}

	return (
		<Modal
			open={OrderModalStatus}
			onClose={handleCloseOrderModal}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
			sx={{ boxSizing: 'border-box' }}
		>
			<Box
				sx={{
					...modal,
					display: 'flex',
					flexDirection: 'column',
					boxSizing: 'border-box',
					alignItems: 'start',
					p: 2,
					gap: 2,
				}}
			>
				<Box sx={{ ...font, fontSize: '20px' }}>Заказы</Box>
				<CloseButtonComponent handleClick={handleCloseOrderModal} />
				{loading ? (
					<NotFoundDataComponent
						label='Вы еще не делали заказов'
						onClick={() => setLoading(true)}
					/>
				) : Orders?.length > 0 ? (
					<Box
						sx={{
							width: '100%',
							minWidth: '280px',
							height: '100%',
							flexGrow: 1,
							display: 'flex',
							gap: 2,
							overflowY: 'auto',
							scrollbarWidth: 'thin',
							flexDirection: 'column',
							borderRadius: 2,
							boxSizing: 'border-box',
						}}
						component='nav'
					>
						{Orders.map((order, i) => {
							return (
								<Box
									key={i}
									sx={{
										boxSizing: 'border-box',
										height: 'auto',
										borderRadius: 2,
										border: '2px solid #eeeeee',
									}}
								>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											backgroundColor: '#eeeeee',
											p: 2,
										}}
									>
										<Box
											sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
										>
											<Typography
												sx={{
													...font,
													fontWeight: 800,
													color: '#787878',
													fontSize: '12px',
												}}
												variant='p'
											>
												Заказ от {FormatDate(order.createdAt)}
											</Typography>
											<Typography
												sx={{
													...font,
													fontWeight: 800,
													color: '#787878',
													fontSize: '12px',
												}}
												variant='p'
											>
												#{AddLeadingZeros(order.id)}
											</Typography>
										</Box>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												gap: 1,
												alignItems: 'end',
											}}
										>
											<Typography
												sx={{
													...font,
													fontWeight: 800,
													color: '#787878',
													fontSize: '12px',
												}}
												variant='p'
											>
												Стоимость {order.price}₽
											</Typography>
											<Box>
												<Chip
													sx={{
														...font,
														width: 'auto',
														color: '',
														textTransform: 'uppercase',
														fontSize: '11px',
													}}
													size='small'
													label={order.order_status.name}
													variant='filled'
													color={GetStatusColor(order.order_status.id)}
												/>
											</Box>
										</Box>
									</Box>
									<Box
										sx={{
											p: 2,
											display: 'flex',
											gap: 2,
											justifyContent: 'space-between',
											flexDirection: {
												es: 'column',
												xs: 'column',
												sm: 'column',
												md: 'row',
												lg: 'row',
												xl: 'row',
											},
										}}
									>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												width: {
													es: '100%',
													xs: '100%',
													sm: '100%',
													md: '36%',
													lg: '36%',
													xl: '36%',
												},
												minWidth: '36%',
												gap: 2,
											}}
										>
											<Typography
												sx={{ ...font, fontWeight: 600, fontSize: '12px' }}
												variant='p'
											>
												Доставка на адрес {order.address}
											</Typography>
											<Typography
												sx={{ ...font, fontWeight: 600, fontSize: '12px' }}
												variant='p'
											>
												Дата обновления {FormatDate(order.updatedAt)}
											</Typography>
											<Button
												size='small'
												sx={{ ...font, fontSize: '10px', color: '' }}
												onClick={openRateProductModal}
												variant='contained'
												disableElevation
												disabled={!order.order_status.id === 2}
											>
												Оценить товары
											</Button>
										</Box>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												flexGrow: 1,
												gap: 2,
												flexWrap: 'wrap',
												justifyContent: {
													es: 'start',
													xs: 'start',
													s: 'start',
													sm: 'start',
													md: 'end',
													lg: 'end',
													xl: 'end',
												},
											}}
										>
											{order.order_products.map((product, i) => {
												return (
													<Box
														onClick={() =>
															handleOpenProductModal(product.product.id)
														}
														key={i}
														sx={{
															height: '60px',
															width: {
																es: 'calc(33.33% - 16px)',
																xs: 'calc(33.33% - 16px)',
																s: 'calc(25% - 16px)',
																sm: 'calc(20% - 16px)',
																md: 'calc(20% - 16px)',
																lg: '60px',
																xl: '60px',
															},
															borderRadius: 2,
															backgroundSize: 'cover',
															backgroundRepeat: 'no-repeat',
															backgroundPosition: 'center',
															backgroundImage: `url(${
																import.meta.env.VITE_API_STATIC_URL +
																(product.product.product_images[0]?.filename ||
																	'defaultProductImage.jpg')
															})`,
															transition: 'none',
														}}
													></Box>
												)
											})}
										</Box>
									</Box>
								</Box>
							)
						})}
					</Box>
				) : (
					<NotFoundDataComponent
						label='Вы еще не делали заказов'
						onClick={() => setLoading(true)}
					/>
				)}
			</Box>
		</Modal>
	)
}

export default OrderModal
