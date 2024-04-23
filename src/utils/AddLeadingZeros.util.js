const AddLeadingZeros = (orderNumber)=>{
    const orderNumberString = String(orderNumber); // Преобразуем номер заказа в строку
    const zerosToAdd = 6 - orderNumberString.length; // Вычисляем количество нулей, которые нужно добавить
    const paddedOrderNumber = '0'.repeat(zerosToAdd) + orderNumberString; // Добавляем нули в начало номера заказа
    return paddedOrderNumber;
}

export default AddLeadingZeros