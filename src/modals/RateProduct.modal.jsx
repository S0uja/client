import {
	Avatar,
	Backdrop,
	Box,
	ListItemAvatar,
	Modal,
	Rating,
} from '@mui/material'
import MobileStepper from '@mui/material/MobileStepper'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CircularLoadingComponent from '../components/CircularLoading.component'
import CloseButtonComponent from '../components/CloseButton.component'
import FormTextFieldComponent from '../components/FormTextField.component'
import LoadingButton from '../components/LoadingButton.component'
import NotFoundDataComponent from '../components/NotFoundData.component'
import { createReview, getProductsForRate } from '../http/Orders.http'
import { setRateModal, setSnackbarModal } from '../store/modals.store'
import font from '../themes/font.theme'
import modal from '../themes/modal.theme'

const RateProductModal = () => {
	const dispatch = useDispatch()
	const RateProductModalStatus = useSelector(state => state.modals.rateModal)
	const [activeStep] = useState(0)
	const [loading, setLoading] = useState(true)
	const [rates, setRates] = useState([])
	const [hover, setHover] = useState(-1)
	const [rate, setRate] = useState(5)
	const [text, setText] = useState('')
	const [fieldError, setFieldError] = useState({
		status: false,
		message: '',
	})
	const labels = {
		1: 'Ужасно',
		2: 'Плохо',
		3: 'Средне',
		4: 'Хорошо',
		5: 'Отлично',
	}

	useEffect(() => {
		if (!RateProductModalStatus) return
		getProductsForRate().then(res => {
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
				setRates(...res.data.data)
				setLoading(false)
			}
		})
	}, [dispatch, RateProductModalStatus, loading])

	const getLabelText = value => {
		return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
	}

	const handleCloseCartModal = () => {
		dispatch(setRateModal(false))
	}

	const validate = () => {
		let errors = false

		if (text.trim() === '') {
			setFieldError({ status: true, message: '* Обязательное поле' })
			errors = true
		} else {
			setFieldError({ status: false, message: '' })
		}

		return errors
	}

	const handleCreateReview = () => {
		setLoading(true)

		const valid = validate()

		if (!valid) {
			createReview(rates[0].id, rates[0].product.id, text, rate).then(res => {
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
					const newRates = rates
					newRates.shift()
					setRates(newRates || [])
					setRate(5)
					setText('')
					setLoading(false)
					dispatch(
						setSnackbarModal({
							modal: true,
							severity: 'success',
							message: 'Успешно',
						})
					)
				}
			})
		}
	}

	return (
		<Modal
			open={RateProductModalStatus}
			onClose={handleCloseCartModal}
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
					zIndex: 7777777,
					height: 'auto',
					maxWidth: '600px',
					minHeight: '200px',
					display: 'flex',
					justifyContent: 'space-between',
					boxSizing: 'border-box',
					alignItems: 'start',
					flexDirection: {
						es: 'column',
						xs: 'column',
						sm: 'column',
						md: 'row',
						lg: 'row',
						xl: 'row',
					},
					gap: 1,
				}}
			>
				<CloseButtonComponent handleClick={handleCloseCartModal} />

				{loading ? (
					<CircularLoadingComponent sx={{ height: 168 }} />
				) : rates.length === 0 ? (
					<NotFoundDataComponent
						sx={{ height: 168 }}
						onClick={() => setLoading(!loading)}
						label={'Все товары оценены, спасибо!'}
					/>
				) : (
					<Box sx={{ width: '100%' }}>
						<MobileStepper
							variant='dots'
							steps={rates.length}
							position='static'
							activeStep={activeStep}
							sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
						/>
						<Box
							sx={{
								width: '100%',
								boxSizing: 'border-box',
								display: 'flex',
								gap: 2,
								alignItems: 'center',
								flexDirection: {
									es: 'column',
									xs: 'column',
									s: 'column',
									sm: 'row',
									md: 'row',
									lg: 'row',
									xl: 'row',
									xxl: 'row',
								},
							}}
						>
							<ListItemAvatar
								sx={{ width: { es: '100%', xs: '100%', s: '100%', sm: 145 } }}
							>
								<Avatar
									variant='rounded'
									src={
										import.meta.env.VITE_API_STATIC_URL +
										(rates[0].product.product_images[0]?.filename ||
											'defaultProductImage.jpg')
									}
									sx={{
										margin: '0 auto',
										width: { es: '100%', xs: '100%', s: '100%', sm: 145 },
										height: 145,
									}}
								/>
							</ListItemAvatar>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									gap: 2,
									flexDirection: 'column',
									justifyContent: 'center',
								}}
							>
								<FormTextFieldComponent
									error={fieldError}
									type={'text'}
									label={''}
									rows={2}
									m={true}
									value={text}
									onChange={e => setText(e.target.value)}
									placeholder={'Расскажите ваши впечатления'}
								/>

								<Box
									sx={{
										...font,
										gap: 2,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										flexDirection: {
											es: 'column',
											xs: 'column',
											s: 'row',
											sm: 'row',
											md: 'row',
											lg: 'row',
											xl: 'row',
											xxl: 'row',
										},
									}}
								>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<Rating
											value={rate}
											getLabelText={getLabelText}
											onChange={(event, newValue) => {
												setRate(newValue)
											}}
											onChangeActive={(event, newHover) => {
												setHover(newHover)
											}}
										/>
										{rate !== null && (
											<Box sx={{ ml: 2 }}>
												{labels[hover !== -1 ? hover : rate]}
											</Box>
										)}
									</Box>
									<LoadingButton
										disable={rate > 0 ? false : true}
										label={'Отправить'}
										onClick={handleCreateReview}
										size={'medium'}
									/>
								</Box>
							</Box>
						</Box>
					</Box>
				)}
			</Box>
		</Modal>
	)
}

export default RateProductModal
