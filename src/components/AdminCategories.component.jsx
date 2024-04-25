import {useEffect,useState} from 'react'
import {Paper,Typography} from '@mui/material';
import Table from './Table.component'
import { useDispatch} from 'react-redux'
import { deleteCategory, getCategories } from '../http/Admin.http';
import font from '../themes/font.theme'
import CategoryModal from '../modals/AdminCategory.modal';
import { setAdminCategoryModal, setSnackbarModal } from '../store/modals.store'

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
        minWidth:150
    },
    {
        id: 'parentId',
        label: 'Родитель',
        minWidth:150
    },
]

const CategoriesComponent = () => {
    const [data,setData] = useState([])
    const [updateId,setUpdateId] = useState(null)
    const [categories,setCategories] = useState([])
    const dispatch = useDispatch()

    const openModal = () => {
        setUpdateId(null)
        dispatch(setAdminCategoryModal(true))
    }

    const updateData = () => {
        getCategories().then(res=>{
            if(!res){
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'error',
                    message:'Непредвиденная ошибка, попробуйте позже'
                }))
            }
            else if(res.status==="success"){
                const data=res.data.data.map(item=>{
                    const parentId = item.parentId?res.data.data.filter(item2=>item2.id===item.parentId)[0].name:'NULL'
                    return {
                        createdAt:item.createdAt,
                        filename:item.filename,
                        id:item.id,
                        name:item.name,
                        parentId:parentId,
                        updatedAt:item.updatedAt
                    }
                })
                setData(data)
                setCategories(res.data.data.filter(item=>item.parentId===null))
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
        deleteCategory(id).then(res=>{
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
        dispatch(setAdminCategoryModal(true))
    }

    useEffect(() => {
        updateData()
    }, [])

    return (
        <>
            <CategoryModal categories={categories} handleUpdate={updateData} updateId={updateId}/>
            
            <Paper sx={{height:'100%', width: '100%', overflow: 'hidden',p:2,borderRadius:2,boxSizing:'border-box'}} elevation={0}>
                <Typography sx={{...font,fontSize:'24px',width:'100%'}}>Категории</Typography>
                <Table handleUpdate={updateData} onCreate={openModal} handleDelete={handleDelete} handleEdit={handleEdit} rows={data} columns={columns}/>
            </Paper>
        </>
    )
}

export default CategoriesComponent