/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect,useState} from 'react'
import {Paper,Typography} from '@mui/material';
import Table from './Table.component'
import { useDispatch} from 'react-redux'
import { deleteCollection, getCollections, getProducts } from '../http/Admin.http';
import font from '../themes/font.theme'
import CollectionModal from '../modals/AdminCollection.modal';
import { setAdminCollectionModal, setSnackbarModal } from '../store/modals.store'

const columns = [
    {
        id: 'id',
        label: '#',
        minWidth: 15,
        align: 'center',
    },
    {
        id: 'name',
        label: 'Название',
        minWidth:70 
    },
    { 
        id: 'visible',
        label: 'Статус',
        minWidth:30
    },
    { 
        id: 'products',
        label: 'Товары',
        minWidth:150
    },
]

const CollectionsComponent = () => {
    const [data,setData] = useState([])
    const [updateId,setUpdateId] = useState(null)
    const [products,setProducts] = useState([])
    const dispatch = useDispatch()

    const openModal = () => {
        setUpdateId(null)
        dispatch(setAdminCollectionModal(true))
    }

    const updateData = () => {
        getCollections().then(res=>{
            if(!res){
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'error',
                    message:'Непредвиденная ошибка, попробуйте позже'
                }))
            }
            else if(res.status==="success"){
                const data=res.data.data.map(item=>{
                    const products = item.collection_products.map(product=>product.product.name).join(', ')
                    return {
                        products:products,
                        createdAt:item.createdAt,
                        filename:item.filename,
                        id:item.id,
                        name:item.name,
                        updatedAt:item.updatedAt,
                        visible: item.visible?'Видна':'Скрыта'
                    }
                })
                setData(data)
            }
            else{
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'error',
                    message:res.data.message.join('\n')
                }))
            }
        }).catch(console.error)
        getProducts().then(res => {
            if(!res){
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'error',
                    message:'Непредвиденная ошибка, попробуйте позже'
                }))
            }
            else if(res.status==="success"){
                setProducts(res.data.data)
            }
            else{
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'error',
                    message:res.data.message.join('\n')
                }))
            }
        }).catch(console.error)
    }

    const handleDelete = (id) => {
        deleteCollection(id).then(res=>{
            if(!res){
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'error',
                    message:'Непредвиденная ошибка, попробуйте позже'
                }))
            }
            else if(res.status==="success"){
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'success',
                    message:"Успешно"
                }))
                updateData()
            }
            else{
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'error',
                    message:res.data.message.join('\n')
                }))
            }
        }).catch(console.error);
    }

    const handleEdit = (id) => {
        setUpdateId(id)
        dispatch(setAdminCollectionModal(true))
    }

    useEffect(() => {
        updateData()
    }, [])

    return (
        <>
            <CollectionModal products={products} handleUpdate={updateData} updateId={updateId}/>
            
            <Paper sx={{height:'100%', width: '100%', overflow: 'hidden',p:2,borderRadius:2,boxSizing:'border-box'}} elevation={0}>
                <Typography sx={{...font,fontSize:'24px',width:'100%'}}>Коллекции</Typography>
                <Table handleUpdate={updateData} onCreate={openModal} handleDelete={handleDelete} handleEdit={handleEdit} rows={data} columns={columns}/>
            </Paper>
        </>
    )
}

export default CollectionsComponent