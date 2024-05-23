import {
	Avatar,
	Box,
	Collapse,
	List,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Skeleton,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../http/Categories.http'
import { setCategories } from '../store/categories.store'
import { setSnackbarModal } from '../store/modals.store'
import { setCategory, setManufacturer, setPage } from '../store/products.store'
import font from '../themes/font.theme'
import NotFoundDataComponent from './NotFoundData.component'

const Categories = () => {
	const Categories = useSelector(state => state.categories.categories)
	const [loading, setLoading] = useState('true')
	const Category = useSelector(state => state.products.category)
	const [open, setOpen] = useState(0)
	const dispatch = useDispatch()
	const [update, setUpdate] = useState(true)

	useEffect(() => {
		setLoading(true)
		getAllCategories().then(res => {
			if (!res) {
				dispatch(
					setSnackbarModal({
						modal: true,
						severity: 'error',
						message: 'Непредвиденная ошибка, попробуйте позже',
					})
				)
			} else if (res?.status === 'error') {
				dispatch(
					setSnackbarModal({
						modal: true,
						severity: 'error',
						message:
							res.data.message.join('\n') ||
							'Непредвиденная ошибка, попробуйте позже',
					})
				)
			} else {
				dispatch(setCategories(res.data.data))
			}
			setLoading(false)
		})
	}, [update])

	const handleOpen = id => {
		open === id ? setOpen(0) : setOpen(id)
	}

	const handleChangeCategory = async (name, value) => {
		if (value === Category?.value) return
		dispatch(setPage(1))
		dispatch(setManufacturer(null))
		dispatch(setCategory({ name: name, value: value }))
	}

	return (
		<List
			sx={{
				flexGrow: 1,
				widht: '100%',
				bgcolor: 'background.paper',
				borderRadius: 2,
				p: 2,
				position: 'sticky',
				top: 8,
				gap: 1,
				display: 'flex',
				flexDirection: 'column',
				minHeight: '50px',
			}}
		>
			{loading ? (
				<>
					<Skeleton
						variant='rectangular'
						height={'45px'}
						width={'100%'}
						sx={{ boxSizing: 'border-box', borderRadius: 2, p: 1 }}
					/>
					<Skeleton
						variant='rectangular'
						height={'45px'}
						width={'100%'}
						sx={{ boxSizing: 'border-box', borderRadius: 2, p: 1 }}
					/>
					<Skeleton
						variant='rectangular'
						height={'45px'}
						width={'100%'}
						sx={{ boxSizing: 'border-box', borderRadius: 2, p: 1 }}
					/>
					<Skeleton
						variant='rectangular'
						height={'45px'}
						width={'100%'}
						sx={{ boxSizing: 'border-box', borderRadius: 2, p: 1 }}
					/>
					<Skeleton
						variant='rectangular'
						height={'45px'}
						width={'100%'}
						sx={{ boxSizing: 'border-box', borderRadius: 2, p: 1 }}
					/>
					<Skeleton
						variant='rectangular'
						height={'45px'}
						width={'100%'}
						sx={{ boxSizing: 'border-box', borderRadius: 2, p: 1 }}
					/>
					<Skeleton
						variant='rectangular'
						height={'45px'}
						width={'100%'}
						sx={{ boxSizing: 'border-box', borderRadius: 2, p: 1 }}
					/>
					<Skeleton
						variant='rectangular'
						height={'45px'}
						width={'100%'}
						sx={{ boxSizing: 'border-box', borderRadius: 2, p: 1 }}
					/>
				</>
			) : Categories.length ? (
				Categories.map((category, index) => {
					if (category.parentId) {
						return
					}

					const child = Categories.filter(item => item.parentId === category.id)

					return (
						<Box key={index}>
							<ListItemButton
								key={index}
								sx={{ display: 'flex', borderRadius: 2, p: 1 }}
								onClick={() => handleOpen(category.id)}
							>
								<ListItemAvatar sx={{ minWidth: 40 }}>
									<Avatar
										variant='rounded'
										src={
											import.meta.env.VITE_API_STATIC_URL + category.filename
										}
										sx={{ width: 30, height: 30 }}
									/>
								</ListItemAvatar>
								<ListItemText
									primaryTypographyProps={font}
									primary={category.name}
								/>
							</ListItemButton>

							{child.length > 0 && (
								<Collapse
									in={open === category.id}
									timeout='auto'
									unmountOnExit
								>
									{child.map((sub_category, i) => {
										return (
											<ListItemButton
												onClick={() =>
													handleChangeCategory(
														sub_category.name,
														sub_category.id
													)
												}
												key={i}
												sx={{ borderRadius: 2, mb: 1, p: 1, pl: 2 }}
											>
												<ListItemText
													primaryTypographyProps={font}
													primary={sub_category.name}
												/>
											</ListItemButton>
										)
									})}
								</Collapse>
							)}
						</Box>
					)
				})
			) : (
				<NotFoundDataComponent
					label='Категории не найдены'
					onClick={() => setUpdate(!update)}
				/>
			)}
		</List>
	)
}

export default Categories
