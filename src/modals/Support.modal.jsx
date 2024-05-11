import { Backdrop, Box, Modal } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatFieldComponent from '../components/ChatField.component'
import CircularLoadingComponent from '../components/CircularLoading.component'
import CloseButtonComponent from '../components/CloseButton.component'
import MessageComponent from '../components/Message.component'
import { setSnackbarModal, setSupportModal } from '../store/modals.store'
import font from '../themes/font.theme'
import modal from '../themes/modal.theme'
import GetCurrentTimeUtil from '../utils/GetCurrentTime.util'
let SOCKET

const SupportModal = () => {
	const dispatch = useDispatch()
	const SupportModalStatus = useSelector(state => state.modals.supportModal)
	const [room, setRoom] = useState('')
	const [messages, setMessages] = useState([])
	const [loading, setLoading] = useState(true)
	const messagesEndRef = useRef(null)

	useEffect(() => {
		if (SupportModalStatus === true) {
			let socketUrl = `${import.meta.env.VITE_API_WS_SUPPORT}user`

			if (localStorage.getItem('support_room')) {
				socketUrl += `?room=${localStorage.getItem('support_room')}`
				setRoom(localStorage.getItem('support_room'))
			}

			SOCKET = new WebSocket(socketUrl)

			SOCKET.onerror = error => {
				console.log(error)
			}
			SOCKET.onopen = () => {
				setLoading(false)
			}
			SOCKET.onmessage = ({ data }) => {
				data = JSON.parse(data)

				if (data.constructor === Array) {
					handleSetMessages(
						data.map(message => {
							return {
								source: message.source,
								data: message.message,
								time: GetCurrentTimeUtil(),
							}
						})
					)
				} else {
					handleAddMessage({
						source: data.source,
						data: data.message,
						time: GetCurrentTimeUtil(),
					})
					if (!localStorage.getItem('support_room'))
						localStorage.setItem('support_room', data.room)
					if (room !== data.room) setRoom(data.room)
				}

				if (SupportModalStatus === false) {
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'info',
							message: 'Новое сообщение от поддержки',
						})
					)
				}
			}
			SOCKET.onclose = event => {
				if (event.wasClean) {
					handleAddMessage({
						source: 'server',
						data: 'Соединение закрыто чисто',
						time: GetCurrentTimeUtil(),
					})
				} else {
					handleAddMessage({
						source: 'server',
						data: 'Обрыв соединения',
						time: GetCurrentTimeUtil(),
					})
				}
				handleAddMessage({
					source: 'server',
					data: 'Обрыв соединения c кодом ' + event.code,
					time: GetCurrentTimeUtil(),
				})

				SOCKET = null
			}
		}
	}, [SupportModalStatus])

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
	const handleCloseSupportModal = () => {
		dispatch(setSupportModal(false))
	}
	const handleSendMessage = message => {
		if (message === '') return

		SOCKET.send(jsonMessage(message, room, 'server'))
		handleAddMessage({
			source: 'user',
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
		<Modal
			open={SupportModalStatus}
			onClose={handleCloseSupportModal}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
			sx={{ boxSizing: 'border-box' }}
		>
			<Box
				sx={{
					...modal,
					minHeight: '400px',
					maxWidth: '450px',
					justifyContent: 'start',
					flexDirection: 'column',
				}}
			>
				<CloseButtonComponent handleClick={handleCloseSupportModal} />

				<Box sx={{ ...font, fontSize: '20px' }}>{`Поддержка #${room}`}</Box>

				<Box
					ref={messagesEndRef}
					sx={{
						scrollbarWidth: 'thin',
						width: '100%',
						my: 2,
						flex: 1,
						overflowY: 'auto',
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
					}}
				>
					{loading ? (
						<CircularLoadingComponent />
					) : (
						messages.map((message, index) => (
							<MessageComponent
								key={index}
								time={message.time}
								data={message.data}
								source={message.source}
								variant={'user'}
							/>
						))
					)}
				</Box>

				<ChatFieldComponent handleSendMessage={handleSendMessage} />
			</Box>
		</Modal>
	)
}

export default SupportModal
