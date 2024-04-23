import {useEffect,useState} from 'react'
import {Paper,Typography} from '@mui/material';
import Table from './Table.component'
import { useDispatch} from 'react-redux'
import { getManufacturers, deleteManufacturer } from '../http/Admin.http';
import font from '../themes/font.theme'
import ManufacturerModal from '../modals/AdminManufacturer.modal';
import { setAdminManufacturerModal, setSnackbarModal } from '../store/modals.store'

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
        minWidth: 120
    },
    { 
        id: 'contact',
        label: 'Контакты',
        minWidth: 90
    },
    { 
        id: 'description',
        label: 'Описание',
        minWidth: 130
    }
]

const ManufacturersComponent = () => {
    const [data,setData] = useState([])
    const [updateId,setUpdateId] = useState(null)
    const dispatch = useDispatch()

    const openModal = () => {
        setUpdateId(null)
        dispatch(setAdminManufacturerModal(true))
    }

    const updateData = () => {
        getManufacturers().then(res=>{
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
        }).catch(console.error);
    }

    const handleDelete = (id) => {
        deleteManufacturer(id).then(res=>{
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
        dispatch(setAdminManufacturerModal(true))
    }

    useEffect(() => {
        updateData()
    }, [])

    return (
        <>
            <ManufacturerModal handleUpdate={updateData} updateId={updateId}/>
            
            <Paper sx={{height:'100%', width: '100%', overflow: 'hidden',p:2,borderRadius:2,boxSizing:'border-box'}} elevation={0}>
                <Typography sx={{...font,fontSize:'24px',width:'100%'}}>Производители</Typography>
                <Table handleUpdate={updateData} onCreate={openModal} handleDelete={handleDelete} handleEdit={handleEdit} rows={data} columns={columns}/>
            </Paper>
        </>
    )
}

export default ManufacturersComponent