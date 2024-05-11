import { BarChart } from '@mui/x-charts/BarChart'
import font from '../themes/font.theme'

const Chart = () => {
	return (
		<BarChart
			sx={{ ...font }}
			series={[
				{ data: [51, 6, 32, 55], label: 'Посетители' },
				{ data: [43, 22, 12, 45], label: 'Новые пользователи' },
			]}
			height={290}
			xAxis={[
				{ data: ['Январь', 'Февраль', 'Март', 'Апрель'], scaleType: 'band' },
			]}
			// margin={{ top: 24, bottom: 24, left: 24, right: 24 }}
		/>
	)
}

export default Chart
