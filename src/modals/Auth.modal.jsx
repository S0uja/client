import {useState} from 'react'
import font from "../themes/font.theme"
import modal from '../themes/modal.theme'
import {Box,Backdrop,Modal,Button,CircularProgress,Tab,IconButton} from '@mui/material'
import {TabList,TabContext,TabPanel} from '@mui/lab'
const activeTabSx = { height:'100%',p:0,boxSizing:'border-box',display:'flex',flexDirection:'column',justifyContent:'space-between' }
import { useDispatch, useSelector } from 'react-redux'
import { setAuthModal, setSnackbarModal } from '../store/modals.store'
import { userLogin, userRegistration } from '../http/User.http'
import {setUserInfo} from "../store/user.store"
import CloseIcon from '@mui/icons-material/Close'
import SyncCart from '../utils/SyncCart.util'
import { setCart } from '../store/cart.store'
import FormTextFieldComponent from '../components/FormTextField.component'
import { getCart } from '../http/Cart.http'

const AuthModal = () => {
    const [singIn,setSingIn] = useState({
        number:'',
        password:''
    })
    const [singUp,setSingUp] = useState({
        number:'',
        password:'',
        fio:'',
        birthdate:''
    })
    const [singInErrors,setsingInErrors] = useState({
        number:{status:false,message:""},
        password:{status:false,message:""}
    })
    const [singUpErrors,setsingUpErrors] = useState({
        number:{status:false,message:""},
        password:{status:false,message:""},
        fio:{status:false,message:""},
        birthdate:{status:false,message:""}
    })
    const [loading,setLoading] = useState(false)
    const [tab, setTab] = useState('1');

    const AuthModalStatus = useSelector(state => state.modals.authModal)
    const dispatch = useDispatch()

    const handleChangeTab = (event,value) => {
        setTab(value);
    }
    const handleChangeSingUp = (attribute, value) => {

        if(attribute==='number'){
            value = value.replace(/\D/g, '')
            value = value.slice(0, 11)
        }

        setSingUp(prevState => ({
            ...prevState,
            [attribute]: value
        }));
    }
    const handleChangeSingIn = (attribute, value) => {
        if(attribute==='number'){
            value = value.replace(/\D/g, '')
            value = value.slice(0, 11)
        }

        setSingIn(prevState => ({
            ...prevState,
            [attribute]: value
        }));
    }
    const handleCloseAuthModal = () => {
        dispatch(setAuthModal(false))
    }

    const login = (event) => {
        event.preventDefault()
        let errors = false

        if (singIn.number === '') {
            setsingInErrors(prevState => ({
                ...prevState,
                number: {status:true, message:'* Обязательное поле'}
            }));
            errors=true
        }
        else{
            setsingInErrors(prevState => ({
                ...prevState,
                number: {status:false, message:''}
            }));
        }

        if (!new RegExp(/^7\d{10}$/).test(singIn.number)) {
            setsingInErrors(prevState => ({
                ...prevState,
                number: {status:true, message:'* Некорректный номер телефона'}
            }));
            errors=true
        }
        else{
            setsingInErrors(prevState => ({
                ...prevState,
                number: {status:false, message:''}
            }));
        }
        
        if (singIn.password === '') {
            setsingInErrors(prevState => ({
                ...prevState,
                password: {status:true, message:'* Обязательное поле'}
            }));
            errors=true
        }
        else{
            setsingInErrors(prevState => ({
                ...prevState,
                password: {status:false, message:''}
            }));
        }

        if(!errors){
            setLoading(true)
            userLogin(singIn.number,singIn.password).then(res=>{
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
                    dispatch(setAuthModal(false))
                    dispatch(setSnackbarModal({
                        modal:true,
                        severity:'success',
                        message:'Успешно'
                    }))
                    dispatch(setUserInfo(res.data.data[0]))
                    setLoading(false)

                    getCart().then(res=>{
                        if(res.data.data[0]?.json) {
                            SyncCart(JSON.parse(res.data.data[0].json)).then(cart=>{
                                dispatch(setCart(cart))
                            }).catch(console.error);
                        }
                    }).catch(console.error);
                }
            }).catch(console.error);
        }
    }

    const register = (event) => {
        event.preventDefault()
        let errors = false

        if (singUp.number === '') {
            setsingUpErrors(prevState => ({
                ...prevState,
                number: {status:true, message:'* Обязательное поле'}
            }));
            errors=true
        }
        else{
            setsingUpErrors(prevState => ({
                ...prevState,
                number: {status:false, message:''}
            }));
        }

        if (!new RegExp(/^7\d{10}$/).test(singUp.number)) {
            setsingUpErrors(prevState => ({
                ...prevState,
                number: {status:true, message:'* Некорректный номер телефона'}
            }));
            errors=true
        }
        else{
            setsingUpErrors(prevState => ({
                ...prevState,
                number: {status:false, message:''}
            }));
        }
        
        if (singUp.password === '') {
            setsingUpErrors(prevState => ({
                ...prevState,
                password: {status:true, message:'* Обязательное поле'}
            }));
            errors=true
        }
        else{
            setsingUpErrors(prevState => ({
                ...prevState,
                password: {status:false, message:''}
            }));
        }

        if (!new RegExp(/^([А-Яа-яЁё]+\s){1,2}[А-Яа-яЁё]+\s[А-Яа-яЁё]+$/).test(singUp.fio) || singUp.fio === '') {
            setsingUpErrors(prevState => ({
                ...prevState,
                fio: {status:true, message:'* Некорректный формат ФИО'}
            }));
            errors=true
        }
        else{
            setsingUpErrors(prevState => ({
                ...prevState,
                fio: {status:false, message:''}
            }));
        }

        if (!singUp.birthdate) {
            setsingUpErrors(prevState => ({
                ...prevState,
                birthdate: { status: true, message: '* Обязательное поле' }
            }))
            errors = true
        }
        else {
            const today = new Date();
            const birthdateObj = new Date(singUp.birthdate);
            const age = today.getFullYear() - birthdateObj.getFullYear();
        
            if (age < 14) {
                setsingUpErrors(prevState => ({
                    ...prevState,
                    birthdate: { status: true, message: '* Минимальный возраст 14 лет' }
                }))
                errors = true
            } 
            else if (age >= 100) {
                setsingUpErrors(prevState => ({
                    ...prevState,
                    birthdate: { status: true, message: '* Максимальный возраст 99 лет' }
                }))
                errors = true
            }
            else{
                setsingUpErrors(prevState => ({
                    ...prevState,
                    birthdate: {status:false, message:''}
                }));
            }
        }

        if(!errors){
            setLoading(true)
            userRegistration(singUp.number,singUp.password,singUp.fio,singUp.birthdate).then(res=>{
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
                    dispatch(setSnackbarModal({
                        modal:true,
                        severity:'success',
                        message:'Успешно'
                    }))
                    dispatch(setUserInfo(res.data.data[0]))
                    dispatch(setAuthModal(false))
                    setLoading(false)
                    getCart().then(res=>{
                        SyncCart(res.data.data[0].json).then(cart=>{
                            dispatch(setCart(cart))
                        }).catch(console.error);
                    }).catch(console.error);
                }
            }).catch(console.error);
        }
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={AuthModalStatus}
            onClose={handleCloseAuthModal}
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
                    onClick={handleCloseAuthModal}
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
                    <Box sx={{widht:'100%',height:'100%',display:'flex',alignItems:'center'}}>
                        <CircularProgress color='primary' sx={{height:'100%'}}/>
                    </Box>
                    :
                    <TabContext value={tab} sx={{flexGrow:1}}>

                        <TabList onChange={handleChangeTab} textColor='secondary' indicatorColor='secondary' sx={{mb:3}}>
                            <Tab label="Вход" value="1" sx={font} />
                            <Tab label="Регистрация" value="2" sx={font} />
                        </TabList>

                        <TabPanel value="1" sx={()=>tab==='1' && activeTabSx}>
                            <Box sx={{p:2,height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                                <Box >
                                    <FormTextFieldComponent 
                                        type={'tel'}
                                        error={singInErrors.number}
                                        label={'Телефон'}
                                        value={singIn.number}
                                        onChange={(e) => handleChangeSingIn('number',e.target.value)}
                                    />
                                    <FormTextFieldComponent 
                                        type={'password'}
                                        error={singInErrors.password}
                                        label={'Пароль'}
                                        value={singIn.password}
                                        onChange={(e) => handleChangeSingIn('password',e.target.value)}
                                    />
                                </Box>
                                <Button type="submit" onClick={login} disableElevation color="secondary" sx={{...font,height:'52px',color:'#fff',borderRadius:2,width:'100%'}} variant="contained">Войти</Button>
                            </Box>
                        </TabPanel>

                        <TabPanel value="2" sx={()=>tab==='2' && activeTabSx}>
                            <Box sx={{p:2,height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                                <Box>
                                    <FormTextFieldComponent 
                                        type={'tel'}
                                        error={singUpErrors.number}
                                        label={'Телефон'}
                                        value={singUp.number}
                                        onChange={(e) => handleChangeSingUp('number',e.target.value)}
                                    />
                                    <FormTextFieldComponent 
                                        type={'password'}
                                        error={singUpErrors.password}
                                        label={'Пароль'}
                                        value={singUp.password}
                                        onChange={(e) => handleChangeSingUp('password',e.target.value)}
                                    />
                                    <FormTextFieldComponent 
                                        type={'text'}
                                        error={singUpErrors.fio}
                                        label={'ФИО'}
                                        value={singUp.fio}
                                        onChange={(e) => handleChangeSingUp('fio',e.target.value)}
                                    />
                                    <FormTextFieldComponent 
                                        type={'date'}
                                        error={singUpErrors.birthdate}
                                        label={'Дата рождения'}
                                        value={singUp.birthdate}
                                        onChange={(e) => handleChangeSingUp('birthdate',e.target.value)}
                                    />
                                </Box>

                                <Button type="submit" onClick={register} disableElevation color="secondary" sx={{...font,height:'52px',color:'#fff',borderRadius:2,width:'100%'}} variant="contained">Зарегистрироваться</Button>
                            </Box>
                        </TabPanel>

                    </TabContext>
                }
            </Box>
        </Modal>
    )
}

export default AuthModal