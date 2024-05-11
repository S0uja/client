import { Backdrop, Box, Button, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CircularLoadingComponent from '../components/CircularLoading.component'
import CloseButtonComponent from '../components/CloseButton.component'
import FormTextFieldComponent from '../components/FormTextField.component'
import { createUser, getUser, updateUser } from '../http/Admin.http'
import { setAdminPersonalModal, setSnackbarModal } from '../store/modals.store'
import font from '../themes/font.theme'
import modal from '../themes/modal.theme'

const PersonalModal = props => {
	const PersonalModalStatus = useSelector(
		state => state.modals.adminPersonalModal
	)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [mode, setMode] = useState('create')
	const [fieldsErrors, setFieldsErrors] = useState({
		number: { status: false, message: '' },
		password: { status: false, message: '' },
		fio: { status: false, message: '' },
		role: { status: false, message: '' },
		birthdate: { status: false, message: '' },
	})
	const [fields, setFields] = useState({
		number: '',
		password: '',
		fio: '',
		role: '',
		birthdate: '',
	})

	useEffect(() => {
		setLoading(true)
		if (!PersonalModalStatus) return
		if (!props.updateId) {
			setMode('create')
			setLoading(false)
			return
		}

		setMode('update')
		getUser(props.updateId).then(res => {
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
				setLoading(false)
				setFields({
					number: res.data.data[0].number,
					password: res.data.data[0].password,
					fio: res.data.data[0].fio,
					role: res.data.data[0].role,
					birthdate: res.data.data[0].birthdate,
				})
			}
		})
	}, [PersonalModalStatus, dispatch, props.updateId])

	const clearFields = () => {
		setFields({
			number: '',
			password: '',
			fio: '',
			role: '',
			birthdate: '',
		})
		setFieldsErrors({
			number: { status: false, message: '' },
			password: { status: false, message: '' },
			fio: { status: false, message: '' },
			role: { status: false, message: '' },
			birthdate: { status: false, message: '' },
		})
	}
	const handleClose = () => {
		dispatch(setAdminPersonalModal(false))
		clearFields()
	}
	const handleChange = (attribute, value) => {
		if (attribute === 'number') {
			value = value.replace(/\D/g, '')
			value = value.slice(0, 11)
		}

		setFields(prevState => ({
			...prevState,
			[attribute]: value,
		}))
	}
	const validate = () => {
		let errors = false

		if (fields.number === '') {
			setFieldsErrors(prevState => ({
				...prevState,
				number: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				number: { status: false, message: '' },
			}))
		}

		if (fields.role === '') {
			setFieldsErrors(prevState => ({
				...prevState,
				role: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				role: { status: false, message: '' },
			}))
		}

		if (!new RegExp(/^7\d{10}$/).test(fields.number)) {
			setFieldsErrors(prevState => ({
				...prevState,
				number: { status: true, message: '* Некорректный номер телефона' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				number: { status: false, message: '' },
			}))
		}

		if (fields.password === '') {
			setFieldsErrors(prevState => ({
				...prevState,
				password: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				password: { status: false, message: '' },
			}))
		}

		if (
			!new RegExp(
				/^([A-Za-zА-Яа-яЁё]+\s){1,2}[A-Za-zА-Яа-яЁё]+\s[A-Za-zА-Яа-яЁё]+$/
			).test(fields.fio) ||
			fields.fio === ''
		) {
			setFieldsErrors(prevState => ({
				...prevState,
				fio: { status: true, message: '* Некорректный формат ФИО' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				fio: { status: false, message: '' },
			}))
		}

		if (!fields.birthdate) {
			setFieldsErrors(prevState => ({
				...prevState,
				birthdate: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			const today = new Date()
			const birthdateObj = new Date(fields.birthdate)
			const age = today.getFullYear() - birthdateObj.getFullYear()

			if (age < 14) {
				setFieldsErrors(prevState => ({
					...prevState,
					birthdate: { status: true, message: '* Минимальный возраст 14 лет' },
				}))
				errors = true
			} else if (age >= 100) {
				setFieldsErrors(prevState => ({
					...prevState,
					birthdate: { status: true, message: '* Максимальный возраст 99 лет' },
				}))
				errors = true
			} else {
				setFieldsErrors(prevState => ({
					...prevState,
					birthdate: { status: false, message: '' },
				}))
			}
		}

		return errors
	}
	const create = event => {
		event.preventDefault()

		const valid = validate()

		if (!valid) {
			setLoading(true)
			createUser(
				fields.number,
				fields.password,
				fields.fio,
				fields.role,
				fields.birthdate
			)
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
			updateUser(
				props.updateId,
				fields.number,
				fields.fio,
				fields.role,
				fields.birthdate
			)
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
			open={PersonalModalStatus}
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
					height: '100%',
					minHeight: '450px',
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
						<Box
							sx={{
								...font,
								textAlign: 'center',
								fontSize: '22px',
								mt: 2,
								mb: 3,
							}}
						>
							{mode === 'create' ? 'Новый сотрудник' : 'Редактирование'}
						</Box>
						<Box
							sx={{
								height: '87.5%',
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
									type={'tel'}
									error={fieldsErrors.number}
									label={'Номер телефона'}
									value={fields.number}
									onChange={e => handleChange('number', e.target.value)}
								/>

								{mode === 'create' && (
									<FormTextFieldComponent
										type={'password'}
										error={fieldsErrors.password}
										label={'Пароль'}
										value={fields.password}
										onChange={e => handleChange('password', e.target.value)}
									/>
								)}

								<FormTextFieldComponent
									type={'text'}
									error={fieldsErrors.fio}
									label={'ФИО'}
									value={fields.fio}
									onChange={e => handleChange('fio', e.target.value)}
								/>
								<FormTextFieldComponent
									type={'text'}
									error={fieldsErrors.role}
									label={'Роль'}
									value={fields.role}
									onChange={e => handleChange('role', e.target.value)}
								/>
								<FormTextFieldComponent
									type={'date'}
									error={fieldsErrors.birthdate}
									label={'Дата рождения'}
									value={fields.birthdate}
									onChange={e => handleChange('birthdate', e.target.value)}
								/>
							</Box>
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
				)}
			</Box>
		</Modal>
	)
}

export default PersonalModal
