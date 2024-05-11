import AvTimerIcon from '@mui/icons-material/AvTimer'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import LocalAtm from '@mui/icons-material/LocalAtm'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Box, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import {
	getLogs,
	getMetrica,
	getMounthEarn,
	getMounthOrdersCount,
} from '../http/Admin.http'
import font from '../themes/font.theme'
import SecondsToTimer from '../utils/SecondsToTimer.util'
import DashboardCardComponent from './AdminDashboardCard.component'
import Table from './Table.component'
const columns = [
	{
		id: 'ip',
		label: 'IP',
		minWidth: 90,
	},
	{
		id: 'user_id',
		label: 'Идентификатор пользователя',
		minWidth: 120,
	},
	{
		id: 'role',
		label: 'Роль пользователя',
		minWidth: 120,
	},
	{
		id: 'date',
		label: 'Временная метка',
		minWidth: 120,
	},
	{
		id: 'method',
		label: 'Метод',
		minWidth: 70,
	},
	{
		id: 'path',
		label: 'Адрес',
		minWidth: 90,
	},
]

const AdminDashboardComponent = () => {
	const [data, setData] = useState({
		watchs: '...',
		visits: '...',
		users: '...',
		earn: '...',
		ordersCount: '...',
		avgVisitDurationSeconds: '...',
		logs: [],
	})
	useEffect(() => {
		const fetchData = async () => {
			const metrica = await getMetrica()
			const ordersCount = await getMounthOrdersCount()
			const earn = await getMounthEarn()
			const logs = await getLogs()

			setData({
				visits: metrica.data.totals[0],
				users: metrica.data.totals[1],
				watchs: metrica.data.totals[2],
				avgVisitDurationSeconds: SecondsToTimer(metrica.data.totals[3]),
				ordersCount: ordersCount.data.data[0],
				earn: earn.data.data[0] + '₽',
				logs: logs.data.data[0],
			})
		}
		fetchData()
	}, [])

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
			<Typography sx={{ ...font, fontSize: '24px', width: '100%' }}>
				Информационная панель
			</Typography>
			<Box
				sx={{
					py: 2,
					display: 'flex',
					flexWrap: 'wrap',
					gap: 2,
					justifyContent: 'center',
				}}
			>
				<DashboardCardComponent
					width={1}
					data={data.visits}
					title='Визиты'
					icon={<InsertLinkIcon sx={{ fontSize: 40 }} />}
					background='linear-gradient(31deg, rgba(73,194,44,1) 0%, rgba(59,231,43,1) 50%, rgba(136,226,84,1) 100%)'
				/>
				<DashboardCardComponent
					width={1}
					data={data.users}
					title='Посетители'
					icon={<PeopleAltIcon sx={{ fontSize: 40 }} />}
					background='linear-gradient(31deg, rgba(147,147,147,1) 0%, rgba(198,198,198,1) 50%, rgba(232,232,232,1) 100%)'
				/>
				<DashboardCardComponent
					width={2}
					data={data.avgVisitDurationSeconds}
					title='Среднее время посещения'
					icon={<AvTimerIcon sx={{ fontSize: 40 }} />}
					background='linear-gradient(31deg, rgba(81,20,95,1) 0%, rgba(115,17,197,1) 50%, rgba(172,0,255,1) 100%)'
				/>
				<DashboardCardComponent
					width={1}
					data={data.watchs}
					title='Просмотры'
					icon={<VisibilityIcon sx={{ fontSize: 40 }} />}
					background='linear-gradient(31deg, rgba(9,0,164,1) 0%, rgba(0,0,238,1) 50%, rgba(0,98,255,1) 100%)'
				/>
				<DashboardCardComponent
					width={1}
					data={data.ordersCount}
					title='Заказов за месяц'
					icon={<ShoppingCartIcon sx={{ fontSize: 40 }} />}
					background='linear-gradient(31deg, rgba(161,22,22,1) 0%, rgba(250,42,42,1) 50%, rgba(255,82,82,1) 100%)'
				/>
				<DashboardCardComponent
					width={2}
					data={data.earn}
					title='Заработок за месяц'
					icon={<LocalAtm sx={{ fontSize: 40 }} />}
					background='linear-gradient(31deg, rgba(245,207,0,1) 0%, rgba(255,217,32,1) 50%, rgba(255,237,0,1) 100%)'
				/>
				<Table onlyRead={true} rows={data.logs} columns={columns} />
			</Box>
		</Paper>
	)
}

export default AdminDashboardComponent
