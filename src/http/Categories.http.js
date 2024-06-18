import { $host } from "./index.http"

export const getAllCategories = async () => {
    try {
        // console.log('TRY GET CATEGORIES');

        const {data} = await $host.get('api/category')
        
        return {status: data.status, data:data.body}
    }
    catch (err) {
        if (err.code === 'ECONNABORTED') {
            return {status:'error', data:{message:['Превышено время ожидания, попробуйте чуть позже']}}
        }
    }
}

export const getOneCategory = async (id) => {
    try {
        // console.log('TRY GET ONE CATEGORIY');
        const {data} = await $host.get(`api/category/${id}`)
        
        return {status: data.status, data:data.body}
    }
    catch (err) {
        if (err.code === 'ECONNABORTED') {
            return {status:'error', data:{message:['Превышено время ожидания, попробуйте чуть позже']}}
        }
    }
}