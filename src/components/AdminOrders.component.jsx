/* eslint-disable react-hooks/exhaustive-deps */
import { Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	deleteOrder,
	getOrderStatuses,
	getOrders,
	getProducts,
	getUsers,
} from '../http/Admin.http'
import OrderModal from '../modals/AdminOrder.modal'
import { setAdminOrderModal, setSnackbarModal } from '../store/modals.store'
import font from '../themes/font.theme'
import Table from './Table.component'

const columns = [
	{
		id: 'id',
		label: '#',
		minWidth: 15,
		align: 'center',
	},
	{
		id: 'user.number',
		label: 'Пользователь',
		minWidth: 50,
	},
	{
		id: 'price',
		label: 'Стоимость',
		align: 'center',
		minWidth: 30,
	},
	{
		id: 'order_status.name',
		label: 'Статус',
		align: 'center',
		minWidth: 80,
	},
	{
		id: 'products',
		label: 'Товары',
		minWidth: 150,
	},
]

const OrdersComponent = () => {
	const [data, setData] = useState([])
	const [updateId, setUpdateId] = useState(null)
	const [products, setProducts] = useState([])
	const [orderStatuses, setOrderStatuses] = useState([])
	const [users, setUsers] = useState([])
	const dispatch = useDispatch()

	const openModal = () => {
		setUpdateId(null)
		dispatch(setAdminOrderModal(true))
	}

	const updateData = () => {
		getOrders()
			.then(res => {
				if (!res) {
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'error',
							message: 'Непредвиденная ошибка, попробуйте позже',
						})
					)
				} else if (res.status === 'success') {
					const data = res.data.data.map(item => {
						const products = item.order_products
							.map(product => product.product.name)
							.join(', ')
						return {
							address: item.address,
							createdAt: item.createdAt,
							price: `${item.price} ₽`,
							id: item.id,
							user: item.user,
							updatedAt: item.updatedAt,
							products: products,
							order_status: item.order_status,
						}
					})
					setData(data)
				} else {
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'error',
							message: res.data.message.join('\n'),
						})
					)
				}
			})
			.catch(console.error)
		getProducts()
			.then(res => {
				if (!res) {
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'error',
							message: 'Непредвиденная ошибка, попробуйте позже',
						})
					)
				} else if (res.status === 'success') {
					const data = res.data.data.map(product => {
						return { ...product, count: 1 }
					})
					setProducts(data)
				} else {
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'error',
							message: res.data.message.join('\n'),
						})
					)
				}
			})
			.catch(console.error)
		getUsers()
			.then(res => {
				if (!res) {
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'error',
							message: 'Непредвиденная ошибка, попробуйте позже',
						})
					)
				} else if (res.status === 'success') {
					const users = res.data.data.map(user => {
						return {
							id: user.id,
							name: user.number,
							fio: user.fio,
						}
					})
					setUsers(users)
				} else {
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'error',
							message: res.data.message.join('\n'),
						})
					)
				}
			})
			.catch(console.error)
		getOrderStatuses()
			.then(res => {
				if (!res) {
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'error',
							message: 'Непредвиденная ошибка, попробуйте позже',
						})
					)
				} else if (res.status === 'success') {
					setOrderStatuses(res.data.data)
				} else {
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'error',
							message: res.data.message.join('\n'),
						})
					)
				}
			})
			.catch(console.error)
	}

	const handleDelete = id => {
		deleteOrder(id)
			.then(res => {
				if (!res) {
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'error',
							message: 'Непредвиденная ошибка, попробуйте позже',
						})
					)
				} else if (res.status === 'success') {
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'success',
							message: 'Успешно',
						})
					)
					updateData()
				} else {
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'error',
							message: res.data.message.join('\n'),
						})
					)
				}
			})
			.catch(console.error)
	}

	const handleEdit = id => {
		setUpdateId(id)
		dispatch(setAdminOrderModal(true))
	}

	useEffect(() => {
		updateData()
	}, [])

	return (
		<>
			<OrderModal
				order_statuses={orderStatuses}
				users={users}
				products={products}
				handleUpdate={updateData}
				updateId={updateId}
			/>

			<Paper
				sx={{
					height: '100%',
					width: '100%',
					overflow: 'hidden',
					p: 2,
					borderRadius: 2,
					boxSizing: 'border-box',
				}}
				elevation={0}
			>
				<Typography sx={{ ...font, fontSize: '24px', width: '100%' }}>
					Заказы
				</Typography>
				<Table
					handleUpdate={updateData}
					onCreate={openModal}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
					rows={data}
					columns={columns}
				/>
			</Paper>
		</>
	)
}

export default OrdersComponent
