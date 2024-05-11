import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import LunchDiningIcon from '@mui/icons-material/LunchDining'
import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import font from './themes/font.theme'

const NotFound = () => {
	const navigate = useNavigate()
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100vh',
				color: '#565656',
				flexDirection: 'column',
				gap: 3,
			}}
		>
			<Box
				sx={{
					...font,
					fontSize: '100px',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				4<LunchDiningIcon sx={{ fontSize: '116px' }} />4
			</Box>
			<Box sx={{ ...font, fontSize: '18px', px: 4, textAlign: 'center' }}>
				Что-то пошло не так! Страница которую вы запрашиваете не существует
			</Box>
			<Button
				variant={'text'}
				sx={{
					...font,
					textTransform: 'none',
					fontSize: '16px',
					color: 'rgb(64, 64, 64)',
				}}
				onClick={() => navigate('/')}
			>
				<KeyboardArrowLeftIcon />
				Вернуться на главную страницу
			</Button>
		</Box>
	)
}

export default NotFound
