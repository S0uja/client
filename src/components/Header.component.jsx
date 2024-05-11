import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CreditScoreIcon from '@mui/icons-material/CreditScore'
import FastfoodIcon from '@mui/icons-material/Fastfood'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import {
	Avatar,
	Box,
	Button,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Popover,
	Typography,
} from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCart } from '../store/cart.store'
import {
	setAuthModal,
	setOrderModal,
	setProfileModal,
	setSupportModal,
} from '../store/modals.store'
import { setUserInfo } from '../store/user.store'
import font from '../themes/font.theme'
import ShortingFio from '../utils/ShortiongFio.util'
import StringAvatar from '../utils/StringAvatar.util'

const Header = () => {
	const navigate = useNavigate()
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [isOpen, setIsOpen] = React.useState(false)
	const id = open ? 'simple-popover' : undefined
	const dispatch = useDispatch()
	const UserInfo = useSelector(state => state.user.userInfo)

	const handleOpenPopover = event => {
		setAnchorEl(event.currentTarget)
		setIsOpen(true)
	}

	const handleClosePopover = () => {
		setAnchorEl(null)
		setIsOpen(false)
	}

	const handleOpenAuthModal = () => {
		handleClosePopover()
		dispatch(setAuthModal(true))
	}

	const handleOut = () => {
		handleClosePopover()
		dispatch(setCart([]))
		dispatch(setUserInfo({}))
		navigate('/')
		localStorage.removeItem('cart')
		localStorage.removeItem('token')
	}

	const handleOpenOrder = () => {
		handleClosePopover()
		dispatch(setOrderModal(true))
	}

	const handleOpenProfile = () => {
		setIsOpen(false)
		dispatch(setProfileModal(true))
	}

	const handleOpenAdminPanel = () => {
		navigate('/admin')
	}

	const handleHomeButton = () => {
		navigate('/')
	}

	const handleOpenSupport = () => {
		dispatch(setSupportModal(true))
	}

	return (
		<Paper
			id='header'
			elevation={0}
			sx={{
				my: '8px',
				alignItems: 'center',
				justifyContent: 'space-between',
				boxSizing: 'border-box',
				p: 2,
				display: 'flex',
				width: '100%',
				borderRadius: 2,
				height: 60,
				backgroundColor: '#fff',
			}}
		>
			<Box
				onClick={handleHomeButton}
				sx={{
					cursor: 'pointer',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{/* <img src={logo} style={{overflow:'hidden',height:'30px',borderRadius:1}} /> */}
				<FastfoodIcon size='large' sx={{ color: 'rgb(64,64,64)' }} />
				<Typography sx={{ ...font, color: 'rgb(64,64,64)', fontSize: '20px' }}>
					FoodExpress
				</Typography>
			</Box>

			{!UserInfo?.id ? (
				<Button
					onClick={handleOpenAuthModal}
					disableElevation
					color='secondary'
					sx={{ ...font, borderRadius: 2 }}
					variant='text'
					startIcon={<PersonOutlineIcon />}
				>
					Войти
				</Button>
			) : (
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Button
						aria-describedby={id}
						variant='text'
						onClick={handleOpenPopover}
						sx={{ p: 0, textTransform: 'none' }}
					>
						<Typography sx={{ ...font, mx: 2 }}>
							{ShortingFio(UserInfo.fio)}
						</Typography>
						<Avatar variant='rounded' {...StringAvatar(UserInfo.fio)} />
					</Button>
					<Popover
						id={id}
						open={isOpen}
						anchorEl={anchorEl}
						elevation={2}
						onClose={handleClosePopover}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						sx={{ mt: 2, borderRadius: 2 }}
					>
						<List sx={{ p: 1 }}>
							<ListItem disablePadding>
								<ListItemButton
									sx={{ borderRadius: 2 }}
									onClick={handleOpenProfile}
								>
									<ListItemIcon>
										<PersonIcon sx={{ ...font, fontSize: '18px' }} />
									</ListItemIcon>
									<ListItemText
										primaryTypographyProps={{ ...font }}
										primary='Профиль'
										sx={font}
									/>
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton
									sx={{ borderRadius: 2 }}
									onClick={handleOpenOrder}
								>
									<ListItemIcon>
										<CreditScoreIcon sx={{ ...font, fontSize: '18px' }} />
									</ListItemIcon>
									<ListItemText
										primaryTypographyProps={{ ...font }}
										primary='Заказы'
										sx={font}
									/>
								</ListItemButton>
							</ListItem>
							{UserInfo?.role != 'user' && (
								<ListItem disablePadding>
									<ListItemButton
										sx={{ borderRadius: 2 }}
										onClick={handleOpenAdminPanel}
									>
										<ListItemIcon>
											<AdminPanelSettingsIcon
												sx={{ ...font, fontSize: '18px' }}
											/>
										</ListItemIcon>
										<ListItemText
											primaryTypographyProps={{ ...font }}
											primary='Админка'
											sx={font}
										/>
									</ListItemButton>
								</ListItem>
							)}
							<ListItem disablePadding>
								<ListItemButton
									sx={{ borderRadius: 2 }}
									onClick={handleOpenSupport}
								>
									<ListItemIcon>
										<SupportAgentIcon sx={{ ...font, fontSize: '18px' }} />
									</ListItemIcon>
									<ListItemText
										primaryTypographyProps={{ ...font }}
										primary='Поддержка'
										sx={font}
									/>
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton sx={{ borderRadius: 2 }} onClick={handleOut}>
									<ListItemIcon>
										<LogoutIcon sx={{ ...font, fontSize: '18px' }} />
									</ListItemIcon>
									<ListItemText
										primaryTypographyProps={{ ...font }}
										primary='Выйти'
										sx={font}
									/>
								</ListItemButton>
							</ListItem>
						</List>
					</Popover>
				</Box>
			)}
		</Paper>
	)
}

export default Header
