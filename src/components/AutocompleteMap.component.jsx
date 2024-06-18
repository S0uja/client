import {
	Autocomplete,
	Box,
	CircularProgress,
	Skeleton,
	TextField,
} from '@mui/material'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import font from '../themes/font.theme'

const mapState = {
	center: [56.76, 37.64],
	zoom: 17,
	controls: [],
}

const AutocompleteMap = props => {
	const Addresses = useSelector(state => state.user.addresses)
	const [yMap, setYMap] = useState(null)
	const [addressCoord, setAddressCoord] = useState(null)
	const [loadingMap, setLoadingMap] = useState(true)
	const [options, setOptions] = useState(Addresses)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!options.length && Addresses.length > 0) {
			setOptions(Addresses)
		}
		// console.log(options)
	}, [Addresses, options])

	const filterOptions = options => {
		const uniqueOptions = []
		const uniqueDisplayNames = []

		options.forEach(option => {
			if (!uniqueDisplayNames.includes(option.displayName)) {
				uniqueDisplayNames.push(option.displayName)
				uniqueOptions.push(option)
			}
		})

		return uniqueOptions
	}

	const handleFind = async value => {
		props.setAddress(value)
		const newValue = value.trim()
		if (!yMap) return
		setLoading(true)
		const res = await yMap.suggest(newValue)
		setOptions(filterOptions(res))
		setLoading(false)
	}

	const handleClickToMap = async e => {
		const coords = e.get('coords')
		setAddressCoord(coords)
		const info = await yMap.geocode(coords)
		const geoObject = info.geoObjects.get(0)
		props.setAddress(geoObject.getAddressLine())
	}

	const handleSelectFromOptions = async value => {
		const res = await yMap.geocode(value)
		props.setAddress(value)
		setAddressCoord(res.geoObjects.get(0).geometry._coordinates)
	}

	const onYmapsLoad = ymaps => {
		setLoadingMap(false)
		setYMap(ymaps)
		const getUserAddress = async () => {
			const res = await ymaps.geolocation.get()
			const coords = res.geoObjects.position
			setAddressCoord(coords)
			const info = await ymaps.geocode(coords)
			const geoObject = info.geoObjects.get(0)

			setOptions(Addresses)

			if (Addresses.indexOf(geoObject.getAddressLine()) === -1) {
				setOptions(prevArray => [
					{ displayName: geoObject.getAddressLine() },
					...prevArray,
				])
			}

			props.setAddress(geoObject.getAddressLine())
		}
		getUserAddress()
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
			<Box
				sx={{
					width: '100%',
					height: '100%',
					borderRadius: 2,
					overflow: 'hidden',
					display: {
						es: 'none',
						xs: 'none',
						sm: 'none',
						md: 'block',
						lg: 'block',
						xl: 'block',
					},
				}}
			>
				<YMaps
					query={{
						load: 'package.full',
						apikey: `${import.meta.env.VITE_YANDEX_API_KEY}`,
						suggest_apikey: `${import.meta.env.VITE_YANDEX_SUGGEST_API_KEY}`,
					}}
				>
					<Map
						height={loadingMap ? '0px' : '300px'}
						state={
							addressCoord ? { ...mapState, center: addressCoord } : mapState
						}
						onLoad={onYmapsLoad}
						onClick={handleClickToMap}
					>
						{addressCoord && <Placemark geometry={addressCoord} />}
					</Map>
				</YMaps>
				{loadingMap && (
					<Skeleton variant='rectangular' width={'100%'} height={300} />
				)}
			</Box>

			<Autocomplete
				ListboxProps={{
					style: { maxHeight: '250px', backgroundColor: '#eeeeee' },
				}}
				isOptionEqualToValue={(option, value) => true}
				size={'small'}
				loading={loading}
				loadingText='Поиск...'
				value={props.address}
				autoSelect={options.length > 0 && true}
				filterOptions={x => x}
				sx={{ ...font, borderRadius: 4 }}
				options={options.map(option => option.displayName)}
				clearText='Очистить'
				onChange={(event, value) => {
					event && handleSelectFromOptions(value)
				}}
				onInputChange={(event, value) => {
					event && handleFind(value)
				}}
				noOptionsText='Не найдено'
				renderInput={params => (
					<TextField
						{...params}
						FormHelperTextProps={{
							style: {
								...font,
								color: '',
								fontSize: '',
							},
						}}
						InputLabelProps={{
							style: {
								...font,
								color: '',
							},
						}}
						error={props.errors.status}
						helperText={props.errors.message}
						label='Адрес доставки'
						InputProps={{
							...params.InputProps,
							style: {
								...font,
								borderRadius: 8,
								fontSize: '14px',
							},
							endAdornment: (
								<>
									{loading === true && (
										<CircularProgress sx={{ color: '#787878' }} size={20} />
									)}
									{params.InputProps.endAdornment}
								</>
							),
						}}
					/>
				)}
			/>
		</Box>
	)
}

export default AutocompleteMap
