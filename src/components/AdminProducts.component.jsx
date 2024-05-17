import { Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	deleteProduct,
	getCategories,
	getManufacturers,
	getProducts,
} from '../http/Admin.http'
import AdminProductsModal from '../modals/AdminProduct.modal'
import { setAdminProductModal, setSnackbarModal } from '../store/modals.store'
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
		id: 'name',
		label: 'Название',
		minWidth: 120,
	},
	{
		id: 'price',
		label: 'Стоимость (₽)',
		minWidth: 40,
	},
	{
		id: 'amount',
		label: 'Остаток',
		align: 'center',
		minWidth: 30,
	},
	{
		id: 'category.name',
		label: 'Категория',
		minWidth: 90,
		align: 'right',
	},
	{
		id: 'manufacturer.name',
		label: 'Производитель',
		minWidth: 110,
		align: 'right',
	},
]

const ProductsComponent = () => {
	const [categories, setCategories] = useState([])
	const [manufacturers, setManufacturers] = useState([])
	const [data, setData] = useState([])
	const [updateId, setUpdateId] = useState(null)
	const dispatch = useDispatch()

	const openModal = () => {
		setUpdateId(null)
		dispatch(setAdminProductModal(true))
	}

	const updateData = () => {
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
					setData(res.data.data)
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
		deleteProduct(id)
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
		dispatch(setAdminProductModal(true))
	}

	useEffect(() => {
		updateData()
		getCategories().then(res => {
			if (!res) {
				dispatch(
					setSnackbarModal({
						modal: true,
						severity: 'error',
						message: 'Непредвиденная ошибка, попробуйте позже',
					})
				)
			} else if (res.status === 'success') {
				setCategories(res.data.data.filter(item => item.parentId !== null))
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
		getManufacturers().then(res => {
			if (!res) {
				dispatch(
					setSnackbarModal({
						modal: true,
						severity: 'error',
						message: 'Непредвиденная ошибка, попробуйте позже',
					})
				)
			} else if (res.status === 'success') {
				setManufacturers(res.data.data)
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
	}, [])

	return (
		<>
			<AdminProductsModal
				handleUpdate={updateData}
				categories={categories}
				manufacturers={manufacturers}
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
					Товары
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

export default ProductsComponent
