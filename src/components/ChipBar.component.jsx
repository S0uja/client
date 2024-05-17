import { Box, Chip } from '@mui/material'

const ChipBarComponent = props => {
	return (
		<Box
			sx={{
				display: 'flex',
				gap: 1,
				flexGrow: 1,
				flexWrap: 'wrap',
			}}
		>
			{props.chips.map((item, index) => {
				if (item?.value) {
					return (
						<Chip key={index} label={item.value} onDelete={item.handleDelete} />
					)
				}
			})}
		</Box>
	)
}

export default ChipBarComponent
