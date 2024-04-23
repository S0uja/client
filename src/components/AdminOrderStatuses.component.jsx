import {useEffect,useState} from 'react'
import {Paper,Typography} from '@mui/material';
import Table from './Table.component'
import { useDispatch} from 'react-redux'
import { deleteOrderStatus, getOrderStatuses } from '../http/Admin.http';
import font from '../themes/font.theme'
import OrderStatusModal from '../modals/AdminOrderStatus.modal';
import { setAdminOrderStatusModal, setSnackbarModal } from '../store/modals.store'

const columns = [
    {
        id: 'id',
        label: '#',
        align: 'center',
    },
    {
        id: 'name',
        label: 'Название',
        minWidth:150
    },
]

const CategoriesComponent = () => {
    const [data,setData] = useState([])
    const [updateId,setUpdateId] = useState(null)
    const dispatch = useDispatch()

    const openModal = () => {
        setUpdateId(null)
        dispatch(setAdminOrderStatusModal(true))
    }

    const updateData = () => {
        getOrderStatuses().then(res=>{
            if(!res){
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'error',
                    message:'Непредвиденная ошибка, попробуйте позже'
                }))
            }
            else if(res.status==="success"){
                setData(res.data.data)
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
        deleteOrderStatus(id).then(res=>{
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
        dispatch(setAdminOrderStatusModal(true))
    }

    useEffect(() => {
        updateData()
    }, [])

    return (
        <>
            <OrderStatusModal handleUpdate={updateData} updateId={updateId}/>
            
            <Paper sx={{height:'100%', width: '100%', overflow: 'hidden',p:2,borderRadius:2,boxSizing:'border-box'}} elevation={0}>
                <Typography sx={{...font,fontSize:'24px',width:'100%'}}>Статусы заказа</Typography>
                <Table handleUpdate={updateData} onCreate={openModal} handleDelete={handleDelete} handleEdit={handleEdit} rows={data} columns={columns}/>
            </Paper>
        </>
    )
}

export default CategoriesComponent