import { Backdrop, Box, Button, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CircularLoadingComponent from '../components/CircularLoading.component'
import CloseButtonComponent from '../components/CloseButton.component'
import FormImageFieldComponent from '../components/FormImagesField.component'
import FormSelectFieldComponent from '../components/FormSelectField.component'
import FormTextFieldComponent from '../components/FormTextField.component'
import { createProduct, getProduct, updateProduct } from '../http/Admin.http'
import { setAdminProductModal, setSnackbarModal } from '../store/modals.store'
import font from '../themes/font.theme'
import modal from '../themes/modal.theme'
import ImageUrlToFile from '../utils/ImageUrlToFile.util'

const ProductsModal = props => {
	const ProductModalStatus = useSelector(
		state => state.modals.adminProductModal
	)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [mode, setMode] = useState('create')
	const [fieldsErrors, setFieldsErrors] = useState({
		name: { status: false, message: '' },
		price: { status: false, message: '' },
		amount: { status: false, message: '' },
		description: { status: false, message: '' },
		expirationdate: { status: false, message: '' },
		storageconditions: { status: false, message: '' },
		structure: { status: false, message: '' },
		weight_volume: { status: false, message: '' },
		categoryId: { status: false, message: '' },
		manufacturerId: { status: false, message: '' },
		images: { status: false, message: '' },
	})
	const [fields, setFields] = useState({
		name: '',
		price: 0,
		amount: 0,
		description: '',
		expirationdate: '',
		storageconditions: '',
		structure: '',
		weight_volume: '',
		categoryId: null,
		manufacturerId: null,
		images: [],
	})

	useEffect(() => {
		setLoading(true)
		if (!ProductModalStatus) return

		if (!props.updateId) {
			setMode('create')
			setLoading(false)
			return
		}

		setMode('update')
		getProduct(props.updateId).then(async res => {
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
				const images = []
				for (const image of res.data.data[0].product_images) {
					images.push({
						id: import.meta.env.VITE_API_STATIC_URL + image.filename,
						file: await ImageUrlToFile(
							import.meta.env.VITE_API_STATIC_URL + image.filename
						),
					})
				}
				setFields({
					name: res.data.data[0].name,
					price: parseFloat(res.data.data[0].price),
					amount: parseFloat(res.data.data[0].amount),
					description: res.data.data[0].description,
					expirationdate: res.data.data[0].expirationdate,
					storageconditions: res.data.data[0].storageconditions,
					structure: res.data.data[0].structure,
					weight_volume: res.data.data[0].weight_volume,
					categoryId: res.data.data[0].category?.id || '',
					manufacturerId: res.data.data[0].manufacturer?.id || '',
					images: images,
				})
				setLoading(false)
			}
		})
	}, [ProductModalStatus, dispatch, props.updateId])

	const clearFields = () => {
		setFields({
			name: '',
			price: 0,
			amount: 0,
			description: '',
			expirationdate: '',
			storageconditions: '',
			structure: '',
			weight_volume: '',
			categoryId: null,
			manufacturerId: null,
			images: [],
		})
		setFieldsErrors({
			name: { status: false, message: '' },
			price: { status: false, message: '' },
			amount: { status: false, message: '' },
			description: { status: false, message: '' },
			expirationdate: { status: false, message: '' },
			storageconditions: { status: false, message: '' },
			structure: { status: false, message: '' },
			weight_volume: { status: false, message: '' },
			categoryId: { status: false, message: '' },
			manufacturerId: { status: false, message: '' },
			images: { status: false, message: '' },
		})
	}
	const handleClose = () => {
		dispatch(setAdminProductModal(false))
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

		if (fields.price <= 0) {
			setFieldsErrors(prevState => ({
				...prevState,
				price: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				price: { status: false, message: '' },
			}))
		}

		if (fields.amount <= 0) {
			setFieldsErrors(prevState => ({
				...prevState,
				amount: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				amount: { status: false, message: '' },
			}))
		}

		if (fields.description.trim() === '') {
			setFieldsErrors(prevState => ({
				...prevState,
				description: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				description: { status: false, message: '' },
			}))
		}

		if (fields.expirationdate.trim() === '') {
			setFieldsErrors(prevState => ({
				...prevState,
				expirationdate: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				expirationdate: { status: false, message: '' },
			}))
		}

		if (fields.storageconditions.trim() === '') {
			setFieldsErrors(prevState => ({
				...prevState,
				storageconditions: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				storageconditions: { status: false, message: '' },
			}))
		}

		if (fields.structure.trim() === '') {
			setFieldsErrors(prevState => ({
				...prevState,
				structure: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				structure: { status: false, message: '' },
			}))
		}

		if (fields.weight_volume.trim() === '') {
			setFieldsErrors(prevState => ({
				...prevState,
				weight_volume: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				weight_volume: { status: false, message: '' },
			}))
		}

		if (fields.categoryId === '') {
			setFieldsErrors(prevState => ({
				...prevState,
				categoryId: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				categoryId: { status: false, message: '' },
			}))
		}

		if (fields.manufacturerId === '') {
			setFieldsErrors(prevState => ({
				...prevState,
				manufacturerId: { status: true, message: '* Обязательное поле' },
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				manufacturerId: { status: false, message: '' },
			}))
		}

		if (!fields.images.length) {
			setFieldsErrors(prevState => ({
				...prevState,
				images: {
					status: true,
					message: '* Необходимо загрузить хотя бы одно изображение',
				},
			}))
			errors = true
		} else {
			setFieldsErrors(prevState => ({
				...prevState,
				images: { status: false, message: '' },
			}))
		}

		return errors
	}
	const create = event => {
		event.preventDefault()

		const valid = validate()

		if (!valid) {
			setLoading(true)
			createProduct(
				fields.name,
				fields.price,
				fields.amount,
				fields.description,
				fields.expirationdate,
				fields.storageconditions,
				fields.structure,
				fields.weight_volume,
				fields.categoryId,
				fields.manufacturerId,
				fields.images.map(image => image.file)
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
			updateProduct(
				props.updateId,
				fields.name,
				fields.price,
				fields.amount,
				fields.description,
				fields.expirationdate,
				fields.storageconditions,
				fields.structure,
				fields.weight_volume,
				fields.categoryId,
				fields.manufacturerId,
				fields.images.map(image => image.file)
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
			open={ProductModalStatus}
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
							{mode === 'create' ? 'Новый товар' : 'Редактирование'}
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
									placeholder={'Название продукта'}
								/>

								<FormTextFieldComponent
									type={'number'}
									error={fieldsErrors.price}
									label={'Стоимость'}
									value={fields.price}
									onChange={e => handleChange('price', e.target.value)}
								/>

								<FormTextFieldComponent
									type={'number'}
									error={fieldsErrors.amount}
									label={'Остаток'}
									value={fields.amount}
									onChange={e => handleChange('amount', e.target.value)}
								/>

								<FormTextFieldComponent
									type={'text'}
									error={fieldsErrors.structure}
									label={'Состав'}
									value={fields.structure}
									placeholder={'Вода, соль, сахар'}
									onChange={e => handleChange('structure', e.target.value)}
								/>

								<FormTextFieldComponent
									type={'text'}
									error={fieldsErrors.description}
									label={'Описание'}
									multiline={true}
									placeholder={'Описание товара'}
									rows={5}
									value={fields.description}
									onChange={e => handleChange('description', e.target.value)}
								/>

								<FormTextFieldComponent
									type={'text'}
									error={fieldsErrors.expirationdate}
									label={'Срок годности'}
									placeholder={'0 дней'}
									value={fields.expirationdate}
									onChange={e => handleChange('expirationdate', e.target.value)}
								/>

								<FormTextFieldComponent
									type={'text'}
									error={fieldsErrors.storageconditions}
									label={'Условия хранения'}
									placeholder={'Хранить при t от +0 до +15 градусов'}
									value={fields.storageconditions}
									onChange={e =>
										handleChange('storageconditions', e.target.value)
									}
								/>

								<FormTextFieldComponent
									type={'text'}
									error={fieldsErrors.weight_volume}
									label={'Вес/Объем'}
									placeholder={'250г'}
									value={fields.weight_volume}
									onChange={e => handleChange('weight_volume', e.target.value)}
								/>

								<FormSelectFieldComponent
									label={'Категория'}
									options={props.categories}
									onChange={value => handleChange('categoryId', value)}
									error={fieldsErrors.categoryId}
									placeholder={'Категория товара'}
									value={fields.categoryId}
								/>

								<FormSelectFieldComponent
									label={'Производитель'}
									options={props.manufacturers}
									onChange={value => handleChange('manufacturerId', value)}
									error={fieldsErrors.manufacturerId}
									placeholder={'Производитель товара'}
									value={fields.manufacturerId}
								/>

								<FormImageFieldComponent
									error={fieldsErrors.images}
									label={'Изображения'}
									value={fields.images}
									multiple={true}
									onChange={value => handleChange('images', value)}
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

export default ProductsModal
