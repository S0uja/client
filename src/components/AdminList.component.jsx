/* eslint-disable react/prop-types */
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ArticleIcon from '@mui/icons-material/Article'
import CategoryIcon from '@mui/icons-material/Category'
import CollectionsIcon from '@mui/icons-material/Collections'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard'
import InventoryIcon from '@mui/icons-material/Inventory'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import {
	Avatar,
	Divider,
	List,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
} from '@mui/material'
import font from '../themes/font.theme'

const AdminListComponent = props => {
	return (
		<List
			id='tables'
			sx={{
				flexGrow: 1,
				bgcolor: 'background.paper',
				borderRadius: 2,
				p: { es: 0, xs: 0, sm: 0, md: 2, lg: 2, xl: 2 },
				gap: 1,
				display: 'flex',
				flexDirection: {
					es: 'row',
					xs: 'row',
					sm: 'row',
					md: 'column',
					lg: 'column',
					xl: 'column',
				},
				boxSizing: 'border-box',
				overflowX: 'auto',
				scrollbarWidth: 'none',
			}}
			component='nav'
		>
			<ListItemButton
				sx={{ borderRadius: 2, minWidth: '170px' }}
				onClick={() => props.onChange('dashboard')}
			>
				<ListItemAvatar sx={{ minWidth: 40 }}>
					<Avatar
						variant='rounded'
						sx={{ width: 24, height: 24, bgcolor: '#404040' }}
					>
						<DashboardIcon sx={{ width: '16px' }} />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primaryTypographyProps={font}
					primary={'Информационная панель'}
				/>
			</ListItemButton>

			<Divider
				textAlign='left'
				sx={{
					...font,
					color: '#878787',
					display: {
						es: 'none',
						xs: 'none',
						sm: 'none',
						md: 'flex',
						lg: 'flex',
						xl: 'flex',
					},
				}}
			>
				Инструменты
			</Divider>

			{/* <ListItemButton sx={{borderRadius:2,minWidth:'170px'}} onClick={()=>props.onChange('reports')}>
                <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar 
                        variant="rounded"
                        sx={{ width: 24, height: 24, bgcolor:'#404040' }}
                        
                    >
                        <DescriptionIcon sx={{width:'16px'}} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={font} primary={'Отчетность'}/>
            </ListItemButton> */}

			{/* <ListItemButton sx={{ borderRadius: 2, minWidth: '170px' }}>
				<ListItemAvatar sx={{ minWidth: 40 }}>
					<Avatar
						variant='rounded'
						sx={{ width: 24, height: 24, bgcolor: '#404040' }}
					>
						<EmailIcon sx={{ width: '16px' }} />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primaryTypographyProps={font} primary={'Почта'} />
			</ListItemButton> */}

			<ListItemButton
				sx={{ borderRadius: 2, minWidth: '170px' }}
				onClick={() => props.onChange('support')}
			>
				<ListItemAvatar sx={{ minWidth: 40 }}>
					<Avatar
						variant='rounded'
						sx={{ width: 24, height: 24, bgcolor: '#404040' }}
					>
						<SupportAgentIcon sx={{ width: '16px' }} />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primaryTypographyProps={font} primary={'Поддержка'} />
			</ListItemButton>

			<Divider
				textAlign='left'
				sx={{
					...font,
					color: '#878787',
					display: {
						es: 'none',
						xs: 'none',
						sm: 'none',
						md: 'flex',
						lg: 'flex',
						xl: 'flex',
					},
				}}
			>
				База данных
			</Divider>

			<ListItemButton
				sx={{ borderRadius: 2, minWidth: '170px' }}
				onClick={() => props.onChange('sql')}
			>
				<ListItemAvatar sx={{ minWidth: 40 }}>
					<Avatar
						variant='rounded'
						sx={{ width: 24, height: 24, bgcolor: '#404040' }}
					>
						<ArticleIcon sx={{ width: '16px' }} />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primaryTypographyProps={font} primary={'SQL'} />
			</ListItemButton>

			<ListItemButton
				sx={{ borderRadius: 2, minWidth: '170px' }}
				onClick={() => props.onChange('personal')}
			>
				<ListItemAvatar sx={{ minWidth: 40 }}>
					<Avatar
						variant='rounded'
						sx={{ width: 24, height: 24, bgcolor: '#404040' }}
					>
						<ManageAccountsIcon sx={{ width: '16px' }} />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primaryTypographyProps={font} primary={'Персонал'} />
			</ListItemButton>

			<ListItemButton
				sx={{ borderRadius: 2, minWidth: '170px' }}
				onClick={() => props.onChange('products')}
			>
				<ListItemAvatar sx={{ minWidth: 40 }}>
					<Avatar
						variant='rounded'
						sx={{ width: 24, height: 24, bgcolor: '#404040' }}
					>
						<InventoryIcon sx={{ width: '16px' }} />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primaryTypographyProps={font} primary={'Товары'} />
			</ListItemButton>

			<ListItemButton
				sx={{ borderRadius: 2, minWidth: '170px' }}
				onClick={() => props.onChange('users')}
			>
				<ListItemAvatar sx={{ minWidth: 40 }}>
					<Avatar
						variant='rounded'
						sx={{ width: 24, height: 24, bgcolor: '#404040' }}
					>
						<PeopleAltIcon sx={{ width: '16px' }} />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primaryTypographyProps={font} primary={'Пользователи'} />
			</ListItemButton>

			<ListItemButton
				sx={{ borderRadius: 2, minWidth: '170px' }}
				onClick={() => props.onChange('manufacturers')}
			>
				<ListItemAvatar sx={{ minWidth: 40 }}>
					<Avatar
						variant='rounded'
						sx={{ width: 24, height: 24, bgcolor: '#404040' }}
					>
						<AccountCircleIcon sx={{ width: '16px' }} />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primaryTypographyProps={font} primary={'Производители'} />
			</ListItemButton>

			<ListItemButton
				sx={{ borderRadius: 2, minWidth: '170px' }}
				onClick={() => props.onChange('categories')}
			>
				<ListItemAvatar sx={{ minWidth: 40 }}>
					<Avatar
						variant='rounded'
						sx={{ width: 24, height: 24, bgcolor: '#404040' }}
					>
						<CategoryIcon sx={{ width: '16px' }} />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primaryTypographyProps={font} primary={'Категории'} />
			</ListItemButton>

			<ListItemButton
				sx={{ borderRadius: 2, minWidth: '170px' }}
				onClick={() => props.onChange('orders')}
			>
				<ListItemAvatar sx={{ minWidth: 40 }}>
					<Avatar
						variant='rounded'
						sx={{ width: 24, height: 24, bgcolor: '#404040' }}
					>
						<ShoppingCartIcon sx={{ width: '16px' }} />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primaryTypographyProps={font} primary={'Заказы'} />
			</ListItemButton>

			<ListItemButton
				sx={{ borderRadius: 2, minWidth: '170px' }}
				onClick={() => props.onChange('collections')}
			>
				<ListItemAvatar sx={{ minWidth: 40 }}>
					<Avatar
						variant='rounded'
						sx={{ width: 24, height: 24, bgcolor: '#404040' }}
					>
						<CollectionsIcon sx={{ width: '16px' }} />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primaryTypographyProps={font} primary={'Коллекции'} />
			</ListItemButton>

			<ListItemButton
				sx={{ borderRadius: 2, minWidth: '170px' }}
				onClick={() => props.onChange('order_statuses')}
			>
				<ListItemAvatar sx={{ minWidth: 40 }}>
					<Avatar
						variant='rounded'
						sx={{ width: 24, height: 24, bgcolor: '#404040' }}
					>
						<DepartureBoardIcon sx={{ width: '16px' }} />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primaryTypographyProps={font}
					primary={'Статусы заказа'}
				/>
			</ListItemButton>
		</List>
	)
}

export default AdminListComponent
