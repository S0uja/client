import { Box, Paper } from '@mui/material'

const DashboardComponent = () => {
	return (
		<Paper
			elevation={0}
			sx={{
				borderRadius: 2,
				width: '100%',
				minHeight: '100vh',
				position: 'sticky',
				top: 8,
			}}
		>
			<Box>Посетителей сегодня</Box>
		</Paper>
	)
}

export default DashboardComponent
