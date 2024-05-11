import SendIcon from '@mui/icons-material/Send'
import { Box, IconButton, InputBase, Paper } from '@mui/material'
import { useState } from 'react'
import font from '../themes/font.theme'

const ChatFieldComponent = props => {
	const [message, setMessage] = useState('')

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
			<Paper
				component='form'
				variant='0'
				sx={{
					p: '2px 4px',
					display: 'flex',
					alignItems: 'center',
					flexGrow: 1,
					height: 40,
					borderRadius: 2,
					backgroundColor: '#eeeeee',
					color: 'rgb(166, 166, 166)',
				}}
			>
				<InputBase
					sx={{ ...font, ml: 1, flex: 1 }}
					placeholder='Сообщение'
					value={message}
					onChange={e => setMessage(e.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							e.preventDefault()
							props.handleSendMessage(message)
							setMessage('')
						}
					}}
				/>
				<IconButton
					type='button'
					sx={{ p: '10px' }}
					onClick={() => {
						props.handleSendMessage(message)
						setMessage('')
					}}
				>
					<SendIcon />
				</IconButton>
			</Paper>
		</Box>
	)
}

export default ChatFieldComponent
