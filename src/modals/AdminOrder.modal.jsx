import { Backdrop, Box, Button, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CircularLoadingComponent from '../components/CircularLoading.component'
import CloseButtonComponent from '../components/CloseButton.component'
import FormSelectFieldComponent from '../components/FormSelectField.component'
import FormSwitchFieldComponent from '../components/FormSwitchField.component'
import FormTextFieldComponent from '../components/FormTextField.component'
import { createOrder, getOrder, updateOrder } from '../http/Admin.http'
import { setAdminOrderModal, setSnackbarModal } from '../store/modals.store'
import font from '../themes/font.theme'
import modal from '../themes/modal.theme'

const OrderModal = props => {
	const OrderModalStatus = useSelector(state => state.modals.adminOrderModal)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [mode, setMode] = useState('create')
	const [fieldsErrors, setFieldsErrors] = useState({
		address: { status: false, message: '' },
		user: { status: false, message: '' },
		status: { status: false, message: '' },
		products: { status: false, message: '' },
		price: { status: false, message: '' },
		autoprice: { status: false, message: '' },
	})
	const [fields, setFields] = useState({
		address: '',
		user: null,
		status: null,
		products: [],
		price: 0,
		autoprice: true,
	})

	useEffect(() => {
		setLoading(true)
		if (!OrderModalStatus) return

		if (!props.updateId) {
			setMode('create')
			setLoading(false)
			return
		}

		setMode('update')
		getOrder(props.updateId).then(async res => {
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
				const products = res.data.data[0].order_products.map(product => {
					return { ...product.product, count: product.count }
				})
				const user = {
					id: res.data.data[0].user.id,
					name: res.data.data[0].user.number,
					fio: res.data.data[0].user.fio,
				}
				setFields({
					address: res.data.data[0].address,
					user: user,
					status: res.data.data[0].order_status,
					products: products,
					price: res.data.data[0].price,
					autoprice: true,
				})
				setLoading(false)
			}
		})
	}, [OrderModalStatus, dispatch, props.updateId])

	const clearFields = () => {
		setFields({
			address: '',
			user: null,
			status: null,
			products: [],
			price: 0,
			autoprice: true,
		})
		setFieldsErrors({
			address: { status: false, message: '' },
			user: { status: false, message: '' },
			status: { status: false, message: '' },
			products: { status: false, message: '' },
			price: { status: false, message: '' },
			autoprice: { status: false, message: '' },
		})
	}

	const handleClose = () => {
		dispatch(setAdminOrderModal(false))
		clearFields()
	}

	const calcPrice = (products, mk = false) => {
		if (!fields.autoprice && !mk) return
		setFields(prevState => ({
			...prevState,
			price: products.reduce((acc, product) => {
				return acc + product.price * product.count
			}, 0),
		}))
	}

	const handleChange = (attribute, value) => {
		setFields(prevState => ({
			...prevState,
			[attribute]: value,
		}))

		if (attribute === 'products' && fields.autoprice === true) {
			calcPrice(value, true)
		}
		if (attribute === 'autoprice' && value === true) {
			calcPrice(fields.products, true)
		}
	}

	const validate = () => {
		let errors = false

		if (fields.address.trim() === '') {
			setFieldsErrors(prevState => ({
				...prevState,
				address: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				address: { status: false, message: '' },
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

		if (!fields.user) {
			setFieldsErrors(prevState => ({
				...prevState,
				user: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				user: { status: false, message: '' },
			}))
		}

		if (!fields.status) {
			setFieldsErrors(prevState => ({
				...prevState,
				status: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				status: { status: false, message: '' },
			}))
		}

		if (fields.price < 0) {
			setFieldsErrors(prevState => ({
				...prevState,
				price: { status: true, message: '* Минимальная стоимость 0' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				price: { status: false, message: '' },
			}))
		}

		return errors
	}

	const create = event => {
		event.preventDefault()

		const valid = validate()

		if (!valid) {
			setLoading(true)
			// address, products, price, userId, orderStatusId
			createOrder(
				fields.address,
				fields.products.map(product => {
					return { id: product.id, count: product.count }
				}),
				fields.price,
				fields.user.id,
				fields.status.id
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
			updateOrder(
				props.updateId,
				fields.address,
				fields.products.map(product => {
					return { id: product.id, count: product.count }
				}),
				fields.price,
				fields.user.id,
				fields.status.id
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
			open={OrderModalStatus}
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
							{mode === 'create' ? 'Новый заказ' : 'Редактирование'}
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
									error={fieldsErrors.address}
									label={'Адрес'}
									rows={3}
									placeholder={'Адрес доставки заказа'}
									value={fields.address}
									onChange={e => handleChange('address', e.target.value)}
								/>

								<FormSelectFieldComponent
									label={'Пользователь'}
									options={props.users}
									onChange={value => handleChange('user', value)}
									error={fieldsErrors.user}
									placeholder={'Заказчик'}
									value={fields.user}
								/>

								<FormSelectFieldComponent
									label={'Статус'}
									options={props.order_statuses}
									onChange={value => handleChange('status', value)}
									error={fieldsErrors.status}
									placeholder={'Статус заказа'}
									value={fields.status}
								/>

								<FormSelectFieldComponent
									label={'Товары'}
									multiple={true}
									options={props.products}
									onChange={value => handleChange('products', value)}
									error={fieldsErrors.products}
									placeholder={'Товары в заказе'}
									value={fields.products}
									variant={'products'}
									updatePrice={calcPrice}
								/>

								<FormTextFieldComponent
									type={'number'}
									error={fieldsErrors.price}
									label={'Стоимость'}
									value={fields.price}
									onChange={e => handleChange('price', e.target.value)}
									disabled={fields.autoprice}
								/>

								<FormSwitchFieldComponent
									label={'Автоматический расчет цены'}
									onChange={e => handleChange('autoprice', e.target.checked)}
									value={fields.autoprice}
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

export default OrderModal
