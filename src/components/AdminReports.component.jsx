import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Box, Button, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { getProfit } from '../http/Admin.http'
import font from '../themes/font.theme'
import FormTextField from './FormTextField.component'

const AdminReportsComponent = () => {
	const [startDate, setStartDate] = useState({
		profit: '',
		users: '',
		products: '',
	})

	const [endDate, setEndDate] = useState({
		profit: '',
		users: '',
		products: '',
	})

	// console.log(startDate)

	const handleChangeStartDate = (key, value) => {
		setStartDate(prevState => ({
			...prevState,
			[key]: value,
		}))
	}

	const handleChangeEndDate = (key, value) => {
		setEndDate(prevState => ({
			...prevState,
			[key]: value,
		}))
	}

	return (
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
				Отчетность
			</Typography>

			<Box
				sx={{
					borderRadius: 2,
					backgroundColor: '#eeeeee',
					py: 1,
					px: 2,
					my: 2,
					display: 'flex',
					gap: 3,
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Box sx={{ ...font, fontSize: '18px' }}>Прибыль</Box>

				<Box sx={{ display: 'flex', gap: 2 }}>
					<Box sx={{ ...font, display: 'flex', gap: 2, alignItems: 'center' }}>
						C:{' '}
						<FormTextField
							onChange={e => handleChangeStartDate('profit', e.target.value)}
							value={startDate.profit}
							m={true}
							type={'date'}
						></FormTextField>
					</Box>

					<Box sx={{ ...font, display: 'flex', gap: 2, alignItems: 'center' }}>
						По:{' '}
						<FormTextField
							onChange={e => handleChangeEndDate('profit', e.target.value)}
							value={endDate.profit}
							m={true}
							type={'date'}
						></FormTextField>
					</Box>
				</Box>

				<Button
					variant={'outlined'}
					onClick={() => getProfit(startDate.profit, endDate.profit)}
					sx={{
						...font,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						p: 1.6,
						pl: 2.5,
						borderRadius: 2,
						color: '',
						height: '100%',
					}}
					disableElevation
				>
					Создать <NavigateNextIcon />
				</Button>
			</Box>

			<Box
				sx={{
					borderRadius: 2,
					backgroundColor: '#eeeeee',
					py: 1,
					px: 2,
					my: 2,
					display: 'flex',
					gap: 3,
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Box sx={{ ...font, fontSize: '18px' }}>Новые пользователи</Box>

				<Box sx={{ display: 'flex', gap: 2 }}>
					<Box sx={{ ...font, display: 'flex', gap: 2, alignItems: 'center' }}>
						C:{' '}
						<FormTextField
							onChange={e => handleChangeStartDate('users', e.target.value)}
							value={startDate.users}
							m={true}
							type={'date'}
						></FormTextField>
					</Box>

					<Box sx={{ ...font, display: 'flex', gap: 2, alignItems: 'center' }}>
						По:{' '}
						<FormTextField
							onChange={e => handleChangeEndDate('users', e.target.value)}
							value={endDate.users}
							m={true}
							type={'date'}
						></FormTextField>
					</Box>
				</Box>

				<Button
					variant={'outlined'}
					sx={{
						...font,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						p: 1.6,
						pl: 2.5,
						borderRadius: 2,
						color: '',
						height: '100%',
					}}
					disableElevation
				>
					Создать <NavigateNextIcon />
				</Button>
			</Box>

			<Box
				sx={{
					borderRadius: 2,
					backgroundColor: '#eeeeee',
					py: 1,
					px: 2,
					my: 2,
					display: 'flex',
					gap: 3,
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Box sx={{ ...font, fontSize: '18px' }}>Популярные товары</Box>

				<Box sx={{ display: 'flex', gap: 2 }}>
					<Box sx={{ ...font, display: 'flex', gap: 2, alignItems: 'center' }}>
						C:{' '}
						<FormTextField
							m={true}
							onChange={e => handleChangeStartDate('products', e.target.value)}
							value={startDate.products}
							type={'date'}
						></FormTextField>
					</Box>

					<Box sx={{ ...font, display: 'flex', gap: 2, alignItems: 'center' }}>
						По:{' '}
						<FormTextField
							m={true}
							onChange={e => handleChangeEndDate('products', e.target.value)}
							value={endDate.products}
							type={'date'}
						></FormTextField>
					</Box>
				</Box>

				<Button
					variant={'outlined'}
					sx={{
						...font,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						p: 1.6,
						pl: 2.5,
						borderRadius: 2,
						color: '',
						height: '100%',
					}}
					disableElevation
				>
					Создать <NavigateNextIcon />
				</Button>
			</Box>
		</Paper>
	)
}

export default AdminReportsComponent
