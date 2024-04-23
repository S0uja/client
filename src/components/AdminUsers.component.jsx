/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect,useState} from 'react'
import {Paper,Typography} from '@mui/material';
import Table from './Table.component'
import { useDispatch} from 'react-redux'
import { getUsers, deleteUser } from '../http/Admin.http';
import font from '../themes/font.theme'
import UserModal from '../modals/AdminUser.modal';
import { setAdminPersonalModal, setSnackbarModal } from '../store/modals.store'

const columns = [
    {
        id: 'id',
        label: '#',
        minWidth: 15,
        align: 'center',
    },
    {
        id: 'number',
        label: 'Номер телефона',
        minWidth: 120
    },
    { 
        id: 'fio',
        label: 'ФИО',
        minWidth: 140
    },
    {
        id: 'birthdate',
        label: 'Дата рождения',
        minWidth: 110,
        align: 'left',
    },
];

const UsersComponent = () => {
    const [data,setData] = useState([])
    const [updateId,setUpdateId] = useState(null)
    const dispatch = useDispatch()

    const openModal = () => {
        setUpdateId(null)
        dispatch(setAdminPersonalModal(true))
    }

    const updateData = () => {
        getUsers().then(res=>{
            if(!res){
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'error',
                    message:'Непредвиденная ошибка, попробуйте позже'
                }))
            }
            else if(res.status==="success"){
                setData(res.data.data.filter(item=>item.role.toLowerCase()==='user'))
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
        deleteUser(id).then(res=>{
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
        dispatch(setAdminPersonalModal(true))
    }

    useEffect(() => {
        updateData()
    }, [])

    return (
        <>
            <UserModal handleUpdate={updateData} updateId={updateId}/>
            
            <Paper sx={{height:'100%', width: '100%', overflow: 'hidden',p:2,borderRadius:2,boxSizing:'border-box'}} elevation={0}>
                <Typography sx={{...font,fontSize:'24px',width:'100%'}}>Пользователи</Typography>
                <Table handleUpdate={updateData} onCreate={openModal} handleDelete={handleDelete} handleEdit={handleEdit} rows={data} columns={columns}/>
            </Paper>
        </>
    )
}

export default UsersComponent