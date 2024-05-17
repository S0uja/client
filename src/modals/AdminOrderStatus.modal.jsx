import { Backdrop, Box, Button, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CircularLoadingComponent from '../components/CircularLoading.component'
import CloseButtonComponent from '../components/CloseButton.component'
import FormTextFieldComponent from '../components/FormTextField.component'
import {
	createOrderStatus,
	getOrderStatus,
	updateOrderStatus,
} from '../http/Admin.http'
import {
	setAdminOrderStatusModal,
	setSnackbarModal,
} from '../store/modals.store'
import font from '../themes/font.theme'
import modal from '../themes/modal.theme'

const OrderStatusModal = props => {
	const OrderStatusModalStatus = useSelector(
		state => state.modals.adminOrderStatusModal
	)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [mode, setMode] = useState('create')
	const [fieldsErrors, setFieldsErrors] = useState({
		name: { status: false, message: '' },
	})
	const [fields, setFields] = useState({
		name: '',
	})

	useEffect(() => {
		setLoading(true)
		if (!OrderStatusModalStatus) return

		if (!props.updateId) {
			setMode('create')
			setLoading(false)
			return
		}

		setMode('update')
		getOrderStatus(props.updateId)
			.then(res => {
				if (!res) {
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'error',
							message: 'Непредвиденная ошибка, попробуйте позже',
						})
					)
					setLoading(false)
				} else if (res.status === 'error') {
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'error',
							message: res.data.message.join('\n'),
						})
					)
					setLoading(false)
				} else {
					setFields({
						name: res.data.data[0].name,
					})
					setLoading(false)
				}
			})
			.catch(console.error)
	}, [OrderStatusModalStatus, dispatch, props.updateId])

	const clearFields = () => {
		setFields({
			name: '',
		})
		setFieldsErrors({
			name: { status: false, message: '' },
		})
	}

	const handleClose = () => {
		dispatch(setAdminOrderStatusModal(false))
		clearFields()
	}

	const handleChange = (attribute, value) => {
		setFields(prevState => ({
			...prevState,
			[attribute]: value,
		}))
	}

	const validate = () => {
		let errors = false

		if (fields.name.trim() === '') {
			setFieldsErrors(prevState => ({
				...prevState,
				name: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				name: { status: false, message: '' },
			}))
		}

		return errors
	}

	const create = event => {
		event.preventDefault()

		const valid = validate()

		if (!valid) {
			setLoading(true)
			createOrderStatus(fields.name)
				.then(res => {
					if (!res) {
						dispatch(
							setSnackbarModal({
								modal: true,
								severity: 'error',
								message: 'Непредвиденная ошибка, попробуйте позже',
							})
						)
						setLoading(false)
					} else if (res.status === 'error') {
						dispatch(
							setSnackbarModal({
								modal: true,
								severity: 'error',
								message: res.data.message.join('\n'),
							})
						)
						setLoading(false)
					} else {
						handleClose()
						dispatch(
							setSnackbarModal({
								modal: true,
								severity: 'success',
								message: 'Успешно',
							})
						)
						props.handleUpdate()
						setLoading(false)
						clearFields()
					}
				})
				.catch(console.error)
		}
	}

	const update = event => {
		event.preventDefault()

		const valid = validate()

		if (!valid) {
			setLoading(true)
			updateOrderStatus(props.updateId, fields.name)
				.then(res => {
					if (!res) {
						dispatch(
							setSnackbarModal({
								modal: true,
								severity: 'error',
								message: 'Непредвиденная ошибка, попробуйте позже',
							})
						)
						setLoading(false)
					} else if (res.status === 'error') {
						dispatch(
							setSnackbarModal({
								modal: true,
								severity: 'error',
								message: res.data.message.join('\n'),
							})
						)
						setLoading(false)
					} else {
						handleClose()
						dispatch(
							setSnackbarModal({
								modal: true,
								severity: 'success',
								message: 'Успешно',
							})
						)
						props.handleUpdate()
						setLoading(false)
						clearFields()
					}
				})
				.catch(console.error)
		}
	}

	return (
		<Modal
			open={OrderStatusModalStatus}
			onClose={handleClose}
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
					height: '',
					minHeight: '200px',
					maxWidth: '350px',
					justifyContent: 'start',
					flexDirection: 'column',
				}}
			>
				<CloseButtonComponent handleClick={handleClose} />

				{loading ? (
					<CircularLoadingComponent />
				) : (
					<Box sx={{ width: '100%', height: '100%' }}>
						<Box sx={{ ...font, fontSize: '22px', my: 2, textAlign: 'center' }}>
							{mode === 'create' ? 'Новый статус заказа' : 'Редактирование'}
						</Box>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
							}}
						>
							<Box
								sx={{
									maxHeight: '85%',
									width: '100%',
									overflowY: 'auto',
									pt: 1,
									scrollbarWidth: 'thin',
								}}
							>
								<FormTextFieldComponent
									type={'text'}
									error={fieldsErrors.name}
									label={'Название'}
									value={fields.name}
									onChange={e => handleChange('name', e.target.value)}
									placeholder={'Название статуса'}
								/>
							</Box>
							<Box sx={{ height: '17%', display: 'flex', alignItems: 'end' }}>
								{mode === 'create' ? (
									<Button
										disabled={loading}
										onClick={create}
										disableElevation
										color='secondary'
										sx={{
											...font,
											height: '52px',
											color: '#fff',
											borderRadius: 2,
											width: '100%',
										}}
										variant='contained'
									>
										Создать
									</Button>
								) : (
									<Button
										disabled={loading}
										onClick={update}
										disableElevation
										color='secondary'
										sx={{
											...font,
											height: '52px',
											color: '#fff',
											borderRadius: 2,
											width: '100%',
										}}
										variant='contained'
									>
										Обновить
									</Button>
								)}
							</Box>
						</Box>
					</Box>
				)}
			</Box>
		</Modal>
	)
}

export default OrderStatusModal
