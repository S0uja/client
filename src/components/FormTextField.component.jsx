/* eslint-disable react/prop-types */
import { TextField } from '@mui/material'
import font from '../themes/font.theme'

const FormTextFieldComponent = props => {
	return (
		<TextField
			error={props?.error?.status}
			helperText={props?.error?.message}
			sx={{ width: '100%', mb: props.m ? 0 : 2 }}
			type={props.type}
			label={props.label}
			variant='outlined'
			value={props.value}
			disabled={props.disabled}
			fullWidth={true}
			multiline={props.rows && props.rows > 1 ? true : false}
			rows={props.rows || 1}
			placeholder={props.placeholder}
			onChange={props.onChange}
			FormHelperTextProps={{
				style: {
					...font,
					color: '',
					fontSize: '',
				},
			}}
			InputLabelProps={{
				shrink: true,
				style: {
					...font,
					color: '',
					backgroundColor: '#fff',
					paddingRight: '8px',
				},
			}}
			InputProps={{
				style: {
					...font,
					fontSize: '14px',
					borderRadius: 8,
				},
			}}
		/>
	)
}

export default FormTextFieldComponent
