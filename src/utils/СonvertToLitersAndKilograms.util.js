const ConvertToLitersAndKilograms = (arr) => {
    let totalLiters = 0;
    let totalKilograms = 0;
    
    // if(!arr.lenght) return { titalLiters:0, totalKilograms:0 }

    arr.forEach(item => {
        const weight_volume = item.product.weight_volume
        const count = item.count

        if(weight_volume.includes('кг')){
            totalKilograms += parseFloat(weight_volume)*count

        } else if(weight_volume.includes('г')){
            totalKilograms += parseFloat(weight_volume)/1000*count

        } else if(weight_volume.includes('мл')){
            totalLiters += parseFloat(weight_volume)/1000*count

        } else if(weight_volume.includes('л')){
            totalLiters += parseFloat(weight_volume)*count
        }
    })
    
    totalLiters = totalLiters.toFixed(2)
    totalKilograms = totalKilograms.toFixed(2)

    return { totalLiters, totalKilograms }
}

export default ConvertToLitersAndKilograms