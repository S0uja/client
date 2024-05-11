import { Box } from '@mui/material'
import font from '../themes/font.theme'

const MessageComponent = props => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: props.source != props.variant ? 'start' : 'end',
			}}
		>
			<Box
				sx={{
					...font,
					fontSize: '14px',
					maxWidth: '65%',
					minWidth: '30%',
					width: 'auto',
					wordBreak: 'break-all',
					bgcolor: '#eeeeee',
					px: 1,
					pt: 2,
					pb: 2.6,
					borderRadius: 2,
					position: 'relative',
				}}
			>
				{props.data}
				<Box
					sx={{
						...font,
						color: '#696969',
						position: 'absolute',
						bottom: 4,
						right: props.source === props.variant ? '4' : '0',
						left: props.source === props.variant ? '0' : '4',
						px: 1,
						fontSize: '10px',
					}}
				>
					{props.time}
				</Box>
			</Box>
		</Box>
	)
}

export default MessageComponent
