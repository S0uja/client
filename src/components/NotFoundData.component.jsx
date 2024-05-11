import ReplayIcon from '@mui/icons-material/Replay'
import { Box, IconButton } from '@mui/material'
import { useState } from 'react'
import font from '../themes/font.theme'

const NotFoundDataComponent = props => {
	const [rolling, setRolling] = useState(true)

	return (
		<Box
			sx={{
				...font,
				color: 'rgb(120, 120, 120)',
				textAlign: 'center',
				fontSize: '16px',
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flex: 1,
			}}
		>
			{props.reload != false && (
				<IconButton
					onClick={() => {
						props.onClick()
						setRolling(!rolling)
					}}
					sx={{
						transform: rolling ? 'rotate(360deg)' : 'rotate(0deg)',
						transition: 'transform 0.5s',
						mx: 1,
					}}
				>
					<ReplayIcon />
				</IconButton>
			)}
			{props.label}
		</Box>
	)
}

export default NotFoundDataComponent
