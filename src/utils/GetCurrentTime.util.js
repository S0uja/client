const GetCurrentTimeUtil = () => {
	const now = new Date()
	const hours = String(now.getHours()).padStart(2, '0') // Получаем часы и добавляем ведущий 0, если значение меньше 10
	const minutes = String(now.getMinutes()).padStart(2, '0') // Получаем минуты и добавляем ведущий 0, если значение меньше 10

	return `${hours}:${minutes}`
}

export default GetCurrentTimeUtil
