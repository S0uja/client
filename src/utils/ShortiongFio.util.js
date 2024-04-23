const ShortingFio = (fio) => {
    const fioArr = fio.split(' ')
    return `${fioArr[0]} ${fioArr[1][0]}.${fioArr[2][0]}.`
}

export default ShortingFio