import CheckIcon from '@mui/icons-material/Check'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import font from '../themes/font.theme'

const LoadingButtonComponent = props => {
	const [loading, setLoading] = useState(false)

	const handleClick = async () => {
		setLoading(true)
		await props.onClick()
		return setLoading(false)
	}

	return (
		<LoadingButton
			disabled={props.disable}
			loading={loading}
			disableElevation
			variant={'contained'}
			color={props.color || 'success'}
			onClick={handleClick}
			size={props.size || 'large'}
			sx={{
				...font,
				color: '#fff',
				px: 3,
				fontWeight: 600,
				width: 1,
				borderRadius: 2,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				...props.sx,
			}}
			startIcon={props.icon || <CheckIcon size='small' />}
		>
			{props.label}
		</LoadingButton>
	)
}

export default LoadingButtonComponent
