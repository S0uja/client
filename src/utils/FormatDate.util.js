const FormatDate = isoDate => {
	const date = new Date(isoDate) // Преобразуем строку в объект Date
	const day = String(date.getDate()).padStart(2, '0') // Получаем день месяца и добавляем ведущий ноль при необходимости
	const month = String(date.getMonth() + 1).padStart(2, '0') // Получаем месяц (начиная с 0) и добавляем ведущий ноль при необходимости
	const year = date.getFullYear() // Получаем год
	return `${day}/${month}/${year}` // Возвращаем отформатированную дату в формате DD/MM/YYYY
}

export default FormatDate
