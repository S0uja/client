/* eslint-disable react/prop-types */
import { Box } from '@mui/material'

const AdminDashboardCardComponent = props => {
	const sizes = {
		es: 'calc(100% - 16px)',
		xs: 'calc(100% - 16px)',
		s: `calc(${50 * props.width}% - 16px)`,
		sm: `calc(${33.33 * props.width}% - 16px)`,
		md: `calc(${33.33 * props.width}% - 16px)`,
		lg: `calc(${25 * props.width}% - 16px)`,
		xl: `calc(${25 * props.width}% - 16px)`,
	}

	return (
		<Box
			sx={{
				flexBasis: {
					...sizes,
				},
				textAlign: 'center',
				height: '170px',
				background: props.background,
				borderRadius: 2,
				color: '#fff',
				display: 'flex',
				fontSize: '17px',
				flexDirection: 'column',
				gap: 2,
				position: 'relative',
			}}
		>
			<Box sx={{ position: 'absolute', top: 8, left: 8 }}>{props.icon}</Box>
			<Box
				sx={{
					display: 'flex',
					position: 'relative',
					justifyContent: 'space-around',
					alignItems: 'center',
					gap: 4,
					flex: 1,
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						bottom: 8,
						textAlign: 'center',
						width: '100%',
						fontSize: 18,
					}}
				>
					{props.title}
				</Box>
				<Box sx={{ fontSize: 36 }}>{props.data || 0}</Box>
			</Box>
		</Box>
	)
}

export default AdminDashboardCardComponent
