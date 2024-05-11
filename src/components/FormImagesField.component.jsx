import CloseIcon from '@mui/icons-material/Close' // Импортируем иконку крестика
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import font from '../themes/font.theme'

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
})

const ImagePreviewBox = styled(Box)({
	position: 'relative',
	'&:hover > .deleteIcon': {
		display: 'block',
	},
})

const DeleteIconBox = styled(Box)({
	position: 'absolute',
	top: 4,
	right: 4,
	display: 'none',
	cursor: 'pointer',
	borderRadius: '50%',
})

const FormImageFieldComponent = props => {
	const handleImageChange = e => {
		const files = Array.from(e.target.files)
		const newImages = files.map(file => ({
			id: URL.createObjectURL(file),
			file: file,
		}))
		if (props.multiple) {
			props.onChange([...props.value, ...newImages])
		} else {
			props.onChange(newImages)
		}
	}

	const removeImage = id => {
		props.onChange(props.value.filter(image => image.id !== id))
	}

	return (
		<FormControl
			sx={{
				width: '100%',
				mb: 2,
				border: props.error.status ? '1px solid #d32f2f' : '1px solid #c4c4c4',
				borderRadius: 2,
				p: 2,
				boxSizing: 'border-box',
			}}
		>
			<InputLabel
				shrink
				sx={{
					...font,
					color: props.error.status ? '#d32f2f' : '',
					fontSize: '1rem',
					backgroundColor: '#fff',
					px: 1,
					left: '-4px',
				}}
			>
				{props.label}
			</InputLabel>
			<Button
				component='label'
				variant='outlined'
				disableElevation
				startIcon={<CloudUploadIcon />}
				sx={{ ...font, fontSize: '14px', borderRadius: 2, color: '#666666' }}
			>
				Загрузить изображение
				<VisuallyHiddenInput
					multiple={props.multiple || false}
					type='file'
					onChange={handleImageChange}
				/>
			</Button>

			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				{props.value.map(image => (
					<ImagePreviewBox
						key={image.id}
						component='div'
						sx={{ width: '100%', mt: 2, mb: 0, position: 'relative' }}
					>
						<Box
							component='img'
							src={image.id}
							sx={{ width: '100%', borderRadius: 2 }}
							alt='preview'
						/>
						<DeleteIconBox
							className='deleteIcon'
							onClick={() => removeImage(image.id)}
						>
							<CloseIcon sx={{ color: '#636363' }} />
						</DeleteIconBox>
					</ImagePreviewBox>
				))}
			</Box>
			<FormHelperText
				sx={{
					...font,
					color: props.error.status ? '#d32f2f' : '',
					fontSize: '0.75rem',
				}}
			>
				{props.error.message}
			</FormHelperText>
		</FormControl>
	)
}

export default FormImageFieldComponent
