import MenuIcon from '@mui/icons-material/Menu'
import {
	Box,
	CircularProgress,
	Collapse,
	IconButton,
	Paper,
	Typography,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import font from '../themes/font.theme'
import GetCurrentTimeUtil from '../utils/GetCurrentTime.util'
import ChatFieldComponent from './ChatField.component'
import MessageComponent from './Message.component'
import NotFoundDataComponent from './NotFoundData.component'
let SOCKET

const AdminSupportComponent = () => {
	const UserInfo = useSelector(state => state.user.userInfo)
	const [room, setRoom] = useState()
	const [messages, setMessages] = useState([])
	const [clients, setClients] = useState([])
	const [loading, setLoading] = useState(true)
	const [open, setOpen] = useState(false)
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
					width: '100%',
					height: '570px',
					border: '3px solid #eeeeee',
					borderRadius: 2,
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<Collapse
					sx={{
						bgcolor: '#eeeeee',
						left: 0,
						position: 'absolute',
						zIndex: 444444,
						height: '95%',
						p: 2,
					}}
					unmountOnExit
					orientation='horizontal'
					in={open}
				>
					<Box sx={{ width: '220px' }}></Box>
					{clients.length < 1 ? (
						<NotFoundDataComponent label={'Нет обращений'} reload={false} />
					) : (
						clients.map((client, i) => (
							<Box
								sx={{
									...font,
									cursor: 'pointer',
									fontSize: '16px',
									borderRadius: 2,
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
				</Collapse>
				<Box
					sx={{
						height: '40px',
						borderBottomRightRadius: 16,
						backgroundColor: '#eeeeee',
						position: 'absolute',
						top: 0,
						zIndex: 44444,
						transition: '300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
						left: open ? '252px' : '0',
					}}
				>
					<IconButton onClick={() => setOpen(!open)}>
						<MenuIcon />
					</IconButton>
				</Box>
				<Box
					sx={{
						boxSizing: 'border-box',
						width: '100%',
						display: 'flex',
						justifyContent: 'start',
						flexDirection: 'column',
						position: 'relative',
						p: 2,
					}}
				>
					<Box sx={{ ...font, textAlign: 'center', fontSize: '16px', mb: 2 }}>
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
