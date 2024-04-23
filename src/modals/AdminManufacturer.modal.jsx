/* eslint-disable react/prop-types */
import {Modal,Box,Backdrop,IconButton,Button,CircularProgress} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setAdminManufacturerModal, setSnackbarModal } from '../store/modals.store'
import font from "../themes/font.theme"
import modal from '../themes/modal.theme'
import CloseIcon from '@mui/icons-material/Close'
import {useEffect, useState} from 'react'
import FormTextFieldComponent from '../components/FormTextField.component'
import {createManufacturer,getManufacturer,updateManufacturer} from '../http/Admin.http'
import ImageUrlToFile from '../utils/ImageUrlToFile.util'
import FormImageFieldComponent from '../components/FormImagesField.component'

const ManufacturerModal = (props) => {
    const ManufacturerModalStatus=useSelector(state => state.modals.adminManufacturerModal)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [mode,setMode] = useState('create')
    const [fieldsErrors,setFieldsErrors] = useState({
        name:{status:false,message:""},
        description:{status:false,message:""},
        contact:{status:false,message:""},
        images:{status:false,message:""},
    })
    const [fields,setFields] = useState({
        name:'',
        description:'',
        contact:'',
        images:[]
    })

    useEffect(()=>{
        setLoading(true)
        if(!ManufacturerModalStatus) return
        
        if(!props.updateId) {
            setMode('create')
            setLoading(false)
            return
        }

        setMode('update')
        getManufacturer(props.updateId).then(async res => {
            if(!res){
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'error',
                    message:'Непредвиденная ошибка, попробуйте позже'
                }))
                setLoading(false)
            }
            else if(res.status==='error'){
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'error',
                    message:res.data.message.join('\n')
                }))
                setLoading(false)
            }
            else{
                const images = []
                if(res.data.data[0].filename){
                    images.push({
                        id: import.meta.env.VITE_API_URL + res.data.data[0].filename,
                        file: await ImageUrlToFile(import.meta.env.VITE_API_URL + res.data.data[0].filename)
                    })
                }
                setFields({
                    name:res.data.data[0].name,
                    description:res.data.data[0].description,
                    contact:res.data.data[0].contact,
                    images:images
                })
                setLoading(false)
            }
        })

    },[ManufacturerModalStatus,dispatch,props.updateId])

    const clearFields = () => {
        setFields({
            name:'',
            description:'',
            contact:'',
            images:[]
        })
        setFieldsErrors({
            name:{status:false,message:""},
            description:{status:false,message:""},
            contact:{status:false,message:""},
            images:{status:false,message:""},
        })
    }

    const handleClose = () => {
        dispatch(setAdminManufacturerModal(false))
        clearFields()
    }

    const handleChange = (attribute, value) => {
        setFields(prevState => ({
            ...prevState,
            [attribute]: value
        }));
    }

    const validate = () => {
        let errors = false

        if (fields.name.trim() === '') {
            setFieldsErrors(prevState => ({
                ...prevState,
                name: {status:true, message:'* Обязательное поле'}
            }));
            errors=true;
        } else {
            setFieldsErrors(prevState => ({
                ...prevState,
                name: {status:false, message:''}
            }));
        }
        
        if (fields.description.trim() === '') {
            setFieldsErrors(prevState => ({
                ...prevState,
                description: {status:true, message:'* Обязательное поле'}
            }));
            errors=true;
        } else {
            setFieldsErrors(prevState => ({
                ...prevState,
                description: {status:false, message:''}
            }));
        }
        
        if (fields.contact.trim() === '') {
            setFieldsErrors(prevState => ({
                ...prevState,
                contact: {status:true, message:'* Обязательное поле'}
            }));
            errors=true;
        } else {
            setFieldsErrors(prevState => ({
                ...prevState,
                contact: {status:false, message:''}
            }));
        }
        
        if (fields.images.length === 0) {
            setFieldsErrors(prevState => ({
                ...prevState,
                images: {status:true, message:'* Обязательное поле'}
            }));
            errors=true;
        } else {
            setFieldsErrors(prevState => ({
                ...prevState,
                images: {status:false, message:''}
            }));
        }

        return errors
    }

    const create = (event) => {
        event.preventDefault()

        const valid = validate()

        if(!valid){
            setLoading(true)
            createManufacturer(fields.name,fields.description,fields.contact,fields.images[0].file).then((res)=>{
                if(!res){
                    dispatch(setSnackbarModal({
                        modal:true,
                        severity:'error',
                        message:'Непредвиденная ошибка, попробуйте позже'
                    }))
                    setLoading(false)
                }
                else if(res.status==='error'){
                    dispatch(setSnackbarModal({
                        modal:true,
                        severity:'error',
                        message:res.data.message.join('\n')
                    }))
                    setLoading(false)
                }
                else{
                    handleClose()
                    dispatch(setSnackbarModal({
                        modal:true,
                        severity:'success',
                        message:'Успешно'
                    }))
                    props.handleUpdate()
                    setLoading(false)
                    clearFields()
                }
            }).catch(console.error);
        }
    }

    const update = (event) => {
        event.preventDefault()

        const valid = validate()

        if(!valid){
            setLoading(true)
            updateManufacturer(props.updateId,fields.name,fields.description,fields.contact,fields.images[0].file).then((res)=>{
                if(!res){
                    dispatch(setSnackbarModal({
                        modal:true,
                        severity:'error',
                        message:'Непредвиденная ошибка, попробуйте позже'
                    }))
                    setLoading(false)
                }
                else if(res.status==='error'){
                    dispatch(setSnackbarModal({
                        modal:true,
                        severity:'error',
                        message:res.data.message.join('\n')
                    }))
                    setLoading(false)
                }
                else{
                    handleClose()
                    dispatch(setSnackbarModal({
                        modal:true,
                        severity:'success',
                        message:'Успешно'
                    }))
                    props.handleUpdate()
                    setLoading(false)
                    clearFields()
                }
            }).catch(console.error);
        }
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={ManufacturerModalStatus}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            sx={{boxSizing:'border-box'}}
        >
            <Box sx={{...modal,minHeight:'450px',maxWidth:'350px',justifyContent:'start',flexDirection:'column'}}>
                
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        zIndex:333,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <CloseIcon />
                </IconButton>

                {
                    loading
                    ?
                    <Box sx={{widht:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <CircularProgress color={'primary'}/>
                    </Box>
                    :
                    <Box sx={{width:'100%',height:'100%'}}>
                        <Box sx={{...font,fontSize:'22px',mt:2,mb:3,textAlign:'center'}}>{mode==='create'?'Новый производитель':'Редактирование'}</Box>
                        <Box sx={{height:'87.5%',width:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                            <Box sx={{maxHeight:'85%',width:'100%',overflowY:'auto',pt:1,scrollbarWidth:'thin'}}>

                                <FormTextFieldComponent 
                                    type={'text'}
                                    error={fieldsErrors.name}
                                    label={'Название'}
                                    value={fields.name}
                                    onChange={(e) => handleChange('name',e.target.value)}
                                    placeholder={'Название производителя'}
                                />

                                <FormTextFieldComponent 
                                    type={'text'}
                                    error={fieldsErrors.description}
                                    label={'Описание'}
                                    rows={5}
                                    value={fields.description}
                                    onChange={(e) => handleChange('description',e.target.value)}
                                    placeholder={'Описание производителя'}
                                />

                                <FormTextFieldComponent 
                                    type={'text'}
                                    error={fieldsErrors.contact}
                                    label={'Контакты'}
                                    rows={2}
                                    value={fields.contact}
                                    onChange={(e) => handleChange('contact',e.target.value)}
                                    placeholder={'Контакты производителя'}
                                />

                                <FormImageFieldComponent
                                    error={fieldsErrors.images}
                                    label={'Изображение'}
                                    value={fields.images}
                                    onChange={(value) => handleChange('images',value)}
                                />

                            </Box>
                            <Box sx={{height:'17%',display:'flex',alignItems:'end'}}>
                                {
                                    mode==='create'?
                                    <Button disabled={loading} onClick={create} disableElevation color="secondary" sx={{...font,height:'52px',color:'#fff',borderRadius:2,width:'100%'}} variant="contained">Создать</Button>
                                    :
                                    <Button disabled={loading} onClick={update} disableElevation color="secondary" sx={{...font,height:'52px',color:'#fff',borderRadius:2,width:'100%'}} variant="contained">Обновить</Button>
                                }
                            </Box>
                        </Box>
                    </Box>
                }
            </Box>
        </Modal>
    )
}

export default ManufacturerModal