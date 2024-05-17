import ClearIcon from '@mui/icons-material/Clear'
import { Box, Collapse, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeSql } from '../http/Admin.http'
import { setSnackbarModal } from '../store/modals.store'
import font from '../themes/font.theme'
import FormTextFieldComponent from './FormTextField.component'
import LoadingButton from './LoadingButton.component'
import Table from './Table.component'

const AdminSQLComponents = () => {
	const [value, setValue] = useState('')
	const [error, setError] = useState({ status: false, message: '' })
	const [data, setData] = useState([])
	const [columns, setColumns] = useState([])
	const dispatch = useDispatch()

	const clearField = () => {
		setValue('')
		setColumns([])
		setError({ status: false, message: '' })
	}
	const handleSendSQL = () => {
		makeSql(value).then(res => {
			if (!res) {
				return dispatch(
					setSnackbarModal({
						modal: true,
						severity: 'error',
						message: res.data.message.join('\n'),
					})
				)
			} else if (res.status === 'error') {
				return setError({
					status: true,
					message: res.data.message[0].original.text,
				})
			}

			setData(res.data.data[0][0])
			setColumns(
				Object.keys(res.data.data[0][0][0]).map(key => {
					return {
						id: key,
						label: key,
					}
				})
			)
			setError({ status: false, message: '' })
		})
	}

	return (
		<Paper
			sx={{
				height: '100%',
				width: '100%',
				overflow: 'hidden',
				p: 2,
				borderRadius: 2,
				boxSizing: 'border-box',
			}}
			elevation={0}
		>
			<Typography sx={{ ...font, fontSize: '24px', mb: 2, width: '100%' }}>
				SQL
			</Typography>
			<Box
				sx={{
					height: '91%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<Box>
					<FormTextFieldComponent
						error={error}
						type={'text'}
						label={'Запрос'}
						rows={8}
						value={value}
						onChange={e => setValue(e.target.value)}
						m={true}
					/>

					<Box
						sx={{
							display: 'flex',
							width: '100%',
							boxSizing: 'border-box',
							p: 2,
							gap: 4,
						}}
					>
						<LoadingButton
							color={'error'}
							label={'Очистить'}
							onClick={clearField}
							disable={!value.length}
							icon={<ClearIcon size='small' />}
						/>

						<LoadingButton
							color={'success'}
							label={'Выполнить'}
							onClick={handleSendSQL}
							disable={!value.length}
						/>
					</Box>
				</Box>
				<Collapse in={!!columns.length}>
					<Table onlyRead={true} rows={data} columns={columns} />
				</Collapse>
			</Box>
		</Paper>
	)
}

export default AdminSQLComponents
