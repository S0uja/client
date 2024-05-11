import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { getOneProduct } from '../http/Products.http'
import { setProductModal } from '../store/modals.store'
import { setProduct } from '../store/products.store'
import font from '../themes/font.theme'
import ProductButton from './ProductButton.component'

const CardComponent = props => {
	const dispatch = useDispatch()

	const handleOpenProductModal = id => {
		dispatch(setProductModal(true))
		getOneProduct(id)
			.then(res => dispatch(setProduct(res.data.data[0])))
			.catch(console.error)
	}

	return (
		<Card
			sx={{
				flexBasis: {
					es: 'calc(50% - 16px)',
					xs: 'calc(33.33% - 16px)',
					sm: 'calc(25% - 16px)',
					md: 'calc(25% - 16px)',
					lg: 'calc(25% - 16px)',
					xl: 'calc(25% - 16px)',
				},
				height: 'auto',
				backgroundColor: 'rgba(0,0,0,0)',
				borderRadius: 2,
			}}
			elevation={0}
		>
			<CardMedia
				component='img'
				sx={{
					aspectRatio: '1 / 1',
					borderRadius: 2,
					userSelect: 'none',
					userDrag: 'none',
					cursor: 'pointer',
				}}
				image={import.meta.env.VITE_API_STATIC_URL + props.image}
				onClick={() => {
					handleOpenProductModal(props.id)
				}}
			/>
			<CardContent sx={{ p: 1, cursor: 'default' }}>
				<Typography
					gutterBottom
					variant='p'
					component='div'
					sx={{
						...font,
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						lineHeight: '1.2em',
						height: '2.4em',
					}}
				>
					{props.name}
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography
						component='div'
						variant='p'
						sx={{
							...font,
							color: '#787878',
							width: '70%',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							WebkitLineClamp: 1,
							WebkitBoxOrient: 'vertical',
							lineHeight: '1.2em',
							height: '1.2em',
						}}
					>
						{props.weight_volume}
					</Typography>
					<Typography
						component='div'
						variant='p'
						sx={{ ...font, color: '#787878' }}
					>
						★ {parseFloat(props.avgReview)}
					</Typography>
				</Box>
			</CardContent>
			<ProductButton id={props.id} price={props.price} />
		</Card>
	)
}

export default CardComponent
