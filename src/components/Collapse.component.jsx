/* eslint-disable react/prop-types */

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import FormControlLabel from '@mui/material/FormControlLabel'
import font from '../themes/font.theme'

const CollapseComponent = props => {
	return (
		<Box sx={{ width: '100%', height: 'auto', boxSizing: 'border-box' }}>
			<Box sx={{ ...props.sx, mb: 0, boxSizing: 'border-box' }}>
				{props.items.map((item, i) => {
					return (
						<Fade key={i} in={props.show} unmountOnExit>
							<Box
								sx={{
									flexBasis: {
										es: 'calc(50% - 16px)',
										xs: 'calc(33.33% - 16px)',
										sm: 'calc(25% - 16px)',
										md: 'calc(25% - 16px)',
										lg: 'calc(25% - 16px)',
										xl: 'calc(25% - 16px)',
									},
									height: 'auto',
								}}
							>
								{item}
							</Box>
						</Fade>
					)
				})}
				<Fade in={props.show} unmountOnExit>
					<Box sx={{ mt: -2, height: '16px', width: '100%' }}></Box>
				</Fade>
			</Box>
			<FormControlLabel
				sx={{ width: '100%', heigth: 'auto' }}
				onClick={props.handleShow}
				control={
					<Button
						sx={{
							...font,
							borderRadius: 2,
							width: '100%',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{props.show ? 'Скрыть' : 'Показать больше'}
						</Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{props.show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</Box>
					</Button>
				}
			/>
		</Box>
	)
}

export default CollapseComponent
