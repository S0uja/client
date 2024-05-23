import { Box, CircularProgress } from '@mui/material'

const CircularLoadingComponent = props => {
	return (
		<Box
			sx={{
				widht: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexGrow: 1,
				flex: 1,
				...props.sx,
			}}
		>
			<CircularProgress color='primary' sx={{ height: '100%' }} />
		</Box>
	)
}

export default CircularLoadingComponent
