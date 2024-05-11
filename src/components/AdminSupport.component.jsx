import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import font from '../themes/font.theme'
import GetCurrentTimeUtil from '../utils/GetCurrentTime.util'
import ChatFieldComponent from './ChatField.component'
import MessageComponent from './Message.component'
let SOCKET

const AdminSupportComponent = () => {
	const UserInfo = useSelector(state => state.user.userInfo)
	const [room, setRoom] = useState()
	const [messages, setMessages] = useState([])
	const [clients, setClients] = useState([])
	const [loading, setLoading] = useState(true)
	const messagesEndRef = useRef(null)

	useEffect(() => {
		SOCKET = new WebSocket(
			`${import.meta.env.VITE_API_WS_SUPPORT}admin?room=${room}&id=${
				UserInfo.id
			}`
		)

		SOCKET.onopen = () => {
			setLoading(false)
		}
		SOCKET.onmessage = ({ data }) => {
			data = JSON.parse(data)

			if (data.clients) {
				setClients(data.clients)
			}
			if (data.chat) {
				handleSetMessages(
					data.chat.map(message => {
						return {
							source: message.source,
							data: message.message,
							time: GetCurrentTimeUtil(),
						}
					})
				)
			}
			if (!data.clients && !data.chat) {
				handleAddMessage({
					source: data.source,
					data: data.message,
					time: GetCurrentTimeUtil(),
				})
			}
		}
		SOCKET.onclose = event => {
			if (event.wasClean) {
				handleAddMessage({
					source: 'user',
					data: 'Соединение закрыто чисто',
					time: GetCurrentTimeUtil(),
				})
			} else {
				handleAddMessage({
					source: 'user',
					data: 'Обрыв соединения',
					time: GetCurrentTimeUtil(),
				})
			}
			handleAddMessage({
				source: 'user',
				data: 'Обрыв соединения c кодом ' + event.code,
				time: GetCurrentTimeUtil(),
			})

			SOCKET = null
		}
	}, [room])

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const jsonMessage = (message, room, target) => {
		return JSON.stringify({
			message: message,
			room: room,
			target: target,
		})
	}
	const handleAddMessage = data => {
		setMessages(prev => [...prev, data])
	}
	const handleSetMessages = data => {
		setMessages(data)
	}
	const handleSendMessage = message => {
		if (message === '') return

		SOCKET.send(jsonMessage(message, room, 'server'))
		handleAddMessage({
			source: 'server',
			data: message,
			time: GetCurrentTimeUtil(),
		})
	}
	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
		}
	}

	return (
		<Paper
			sx={{
				width: '100%',
				overflow: 'hidden',
				p: 2,
				borderRadius: 2,
				boxSizing: 'border-box',
			}}
			elevation={0}
		>
			<Typography sx={{ ...font, fontSize: '24px', width: '100%' }}>
				Поддержка
			</Typography>
			<Box
				sx={{
					display: 'flex',
					mt: 2,
					height: '570px',
					border: '3px solid #eeeeee',
					borderRadius: 2,
				}}
			>
				<Box
					sx={{
						bgcolor: '#eeeeee',
						width: '30%',
						p: 2,
					}}
				>
					{clients.length < 1 ? (
						<Box
							sx={{
								...font,
								cursor: 'pointer',
								fontSize: '16px',
								textAlign: 'center',
							}}
						>
							Нет обращений
						</Box>
					) : (
						clients.map((client, i) => (
							<Box
								sx={{
									...font,
									cursor: 'pointer',
									fontSize: '16px',
									p: 2,
									bgcolor: '#fff',
								}}
								onClick={() => setRoom(client)}
								key={i}
							>
								#{client}
							</Box>
						))
					)}
				</Box>

				<Box
					sx={{
						boxSizing: 'border-box',
						width: '70%',
						display: 'flex',
						justifyContent: 'start',
						flexDirection: 'column',
						p: 2,
					}}
				>
					<Box sx={{ ...font, fontSize: '16px', mb: 2 }}>
						{room ? 'Поддержка #' + room : 'Откройте чат с клиентом'}
					</Box>

					<Box
						ref={messagesEndRef}
						sx={{
							scrollbarWidth: 'thin',
							height: 'calc(100% - 40px)',
							width: '100%',
							my: 2,
							mt: 0,
							flex: 1,
							overflowY: 'auto',
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						}}
					>
						{loading ? (
							<Box
								sx={{
									width: '100%',
									height: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<CircularProgress color='primary' sx={{ height: '100%' }} />
							</Box>
						) : (
							messages.map((message, index) => {
								return (
									<MessageComponent
										key={index}
										time={message.time}
										data={message.data}
										source={message.source}
										variant={'server'}
									/>
								)
							})
						)}
					</Box>
					<ChatFieldComponent handleSendMessage={handleSendMessage} />
				</Box>
			</Box>
		</Paper>
	)
}

export default AdminSupportComponent
