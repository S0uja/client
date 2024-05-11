const GetContrastColor = imgSrc => {
	const img = new Image()
	img.src = imgSrc
	const canvas = document.createElement('canvas')
	canvas.width = img.width
	canvas.height = img.height
	const ctx = canvas.getContext('2d')
	ctx.drawImage(img, 0, 0)
	const imageData = ctx.getImageData(0, 0, img.width, img.height)
	const data = imageData.data
	let brightnessSum = 0
	for (let i = 0; i < data.length; i += 4) {
		brightnessSum += (data[i] + data[i + 1] + data[i + 2]) / 3 // вычисление яркости
	}
	const brightness = brightnessSum / (img.width * img.height) // средняя яркость
	const contrastColor = brightness > 127 ? 'black' : 'white' // выбор контрастного цвета
	return contrastColor
}

export default GetContrastColor
