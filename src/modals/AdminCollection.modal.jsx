import { Backdrop, Box, Button, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CircularLoadingComponent from '../components/CircularLoading.component'
import CloseButtonComponent from '../components/CloseButton.component'
import FormSelectFieldComponent from '../components/FormSelectField.component'
import FormSwitchFieldComponent from '../components/FormSwitchField.component'
import FormTextFieldComponent from '../components/FormTextField.component'
import {
	createCollection,
	getCollection,
	updateCollection,
} from '../http/Admin.http'
import {
	setAdminCollectionModal,
	setSnackbarModal,
} from '../store/modals.store'
import font from '../themes/font.theme'
import modal from '../themes/modal.theme'

const CollectionModal = props => {
	const CollectionModalStatus = useSelector(
		state => state.modals.adminCollectionModal
	)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [mode, setMode] = useState('create')
	const [fieldsErrors, setFieldsErrors] = useState({
		name: { status: false, message: '' },
		visible: { status: false, message: '' },
		products: { status: false, message: '' },
	})
	const [fields, setFields] = useState({
		name: '',
		visible: false,
		products: [],
	})

	useEffect(() => {
		setLoading(true)
		if (!CollectionModalStatus) return

		if (!props.updateId) {
			setMode('create')
			setLoading(false)
			return
		}

		setMode('update')
		getCollection(props.updateId).then(async res => {
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
				const products = res.data.data[0].collection_products.map(
					product => product.product
				)
				setFields({
					name: res.data.data[0].name,
					visible: res.data.data[0].visible,
					products: products,
				})
				setLoading(false)
			}
		})
	}, [CollectionModalStatus, dispatch, props.updateId])

	const clearFields = () => {
		setFields({
			name: '',
			visible: false,
			products: [],
		})
		setFieldsErrors({
			name: { status: false, message: '' },
			visible: { status: false, message: '' },
			products: { status: false, message: '' },
		})
	}

	const handleClose = () => {
		dispatch(setAdminCollectionModal(false))
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

		if (fields.products.length === 0) {
			setFieldsErrors(prevState => ({
				...prevState,
				products: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				products: { status: false, message: '' },
			}))
		}

		return errors
	}

	const create = event => {
		event.preventDefault()

		const valid = validate()

		if (!valid) {
			setLoading(true)
			createCollection(
				fields.name,
				fields.visible,
				fields.products.map(product => product.id)
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
			updateCollection(
				props.updateId,
				fields.name,
				fields.visible,
				fields.products.map(product => product.id)
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
			open={CollectionModalStatus}
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
								fontSize: '22px',
								mt: 2,
								mb: 3,
								textAlign: 'center',
							}}
						>
							{mode === 'create' ? 'Новая коллекция' : 'Редактирование'}
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
									type={'text'}
									error={fieldsErrors.name}
									label={'Название'}
									value={fields.name}
									onChange={e => handleChange('name', e.target.value)}
									placeholder={'Название коллекции'}
								/>

								<FormSelectFieldComponent
									label={'Товары'}
									multiple={true}
									options={props.products}
									onChange={value => handleChange('products', value)}
									error={fieldsErrors.products}
									placeholder={'Товары в коллекции'}
									value={fields.products}
								/>

								<FormSwitchFieldComponent
									label={'Видна всем'}
									onChange={e => handleChange('visible', e.target.checked)}
									value={fields.visible}
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

export default CollectionModal
