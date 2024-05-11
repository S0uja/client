import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'

const CloseButtonComponent = props => {
	return (
		<IconButton
			onClick={props.handleClick}
			sx={{
				position: 'absolute',
				right: 8,
				top: 8,
				zIndex: 333,
				color: theme => theme.palette.grey[500],
			}}
		>
			<CloseIcon />
		</IconButton>
	)
}

export default CloseButtonComponent
