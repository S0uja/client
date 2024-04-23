import {Paper,Box,Backdrop,Modal,CircularProgress,Button,Typography,TextField,IconButton} from '@mui/material';
import {useState,useEffect} from 'react'
import modal from '../themes/modal.theme'
import font from "../themes/font.theme"
import { useDispatch, useSelector } from 'react-redux'
import { setProfileModal } from '../store/modals.store'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import StringToColor from '../utils/StringToColor.util'
import {setAddresses} from '../store/user.store'
import {userUpdate,userUpdatePassword} from '../http/User.http'
import { setUserInfo } from '../store/user.store';
import { setSnackbarModal } from '../store/modals.store';
import {LoadingButton} from '@mui/lab';
import { setCart } from '../store/cart.store';
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

const ProfileModal = (props) => {
  const dispatch = useDispatch()

  const ProfileModalStatus = useSelector(state => state.modals.profileModal)
  const UserInfo = useSelector(state => state.user.userInfo)
  const Addresses = useSelector(state => state.user.addresses)
  const [tab,setTab] = useState(1)
  const [loading,setLoading] = useState(false)

  const [fio,setFio] = useState(UserInfo?.fio)
  const [number,setNumber] = useState(UserInfo?.number)
  const [birthdate,setBirthdate] = useState(UserInfo?.birthdate)

  useEffect(() => {
    setFio(UserInfo?.fio);
    setNumber(UserInfo?.number);
    setBirthdate(UserInfo?.birthdate);
  }, [UserInfo])

  const [updateInfoErrors,setUpdateInfoErrors] = useState({
    number:{status:false,message:""},
    fio:{status:false,message:""},
    birthdate:{status:false,message:""}
  })
  const [updatePasswordErrors,setUpdatePasswordErrors] = useState({
    currentPassword:{status:false,message:""},
    newPassword:{status:false,message:""}
  })
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleCloseProfileModal = () => {
    dispatch(setProfileModal(false))
  }

  const handleNumberChange = (e) => {
    let phoneNumber = e.target.value.replace(/\D/g, '')
    phoneNumber = phoneNumber.slice(0, 11)
    setNumber(phoneNumber)
  }

  const handleDeleteAddress = (index) => {
    const filteredAddresses = Addresses.filter((address, i) => i !== index)
    localStorage.setItem('addresses', JSON.stringify(filteredAddresses))
    dispatch(setAddresses(filteredAddresses));
  }

  const handleResetUserInfo = () => {
    setFio(UserInfo?.fio)
    setNumber(UserInfo?.number)
    setBirthdate(UserInfo?.birthdate)
  }

  const updateUserInfo = (event) => {
      event.preventDefault()
      let errors = false
      if (number===UserInfo.number && fio===UserInfo?.fio && birthdate===UserInfo.birthdate) return
      
      if (number === '') {
        setUpdateInfoErrors(prevState => ({
            ...prevState,
            number: {status:true, message:'* Обязательное поле'}
        }));
        errors=true
      }

      if (!new RegExp(/^7\d{10}$/).test(number)) {
        setUpdateInfoErrors(prevState => ({
            ...prevState,
            number: {status:true, message:'* Некорректный номер телефона'}
        }));
        errors=true
      }
      
      if (!new RegExp(/^([А-Яа-яЁё]+\s){1,2}[А-Яа-яЁё]+\s[А-Яа-яЁё]+$/).test(fio) || fio === '') {
        console.log(fio);
        setUpdateInfoErrors(prevState => ({
            ...prevState,
            fio: {status:true, message:'* Некорректный формат ФИО'}
        }));
        errors=true
      }

      if (!birthdate) {
        setUpdateInfoErrors(prevState => ({
            ...prevState,
            birthdate: { status: true, message: '* Обязательное поле' }
        }))
        errors = true
      }
      else {
        const today = new Date();
        const birthdateObj = new Date(birthdate);
        const age = today.getFullYear() - birthdateObj.getFullYear();
    
        if (age < 14) {
          setUpdateInfoErrors(prevState => ({
              ...prevState,
              birthdate: { status: true, message: '* Минимальный возраст 14 лет' }
          }))
          errors = true
        } 
        else if (age >= 100) {
          setUpdateInfoErrors(prevState => ({
              ...prevState,
              birthdate: { status: true, message: '* Максимальный возраст 99 лет' }
          }))
          errors = true
        }
      }

      if(!errors){
          setUpdateInfoErrors({
              number:{status:false,message:""},
              password:{status:false,message:""},
              fio:{status:false,message:""},
              birthdate:{status:false,message:""},
          })

          userUpdate(number,fio,birthdate).then(res=>{
              if(res.status==='error'){
                  dispatch(setSnackbarModal({
                      modal:true,
                      severity:'error',
                      message:res.data.message.join('\n')
                  }))
              }
              else{
                  dispatch(setSnackbarModal({
                      modal:true,
                      severity:'success',
                      message:'Успешно'
                  }))
                  dispatch(setUserInfo(res.data.data[0]))
              }
          }).catch(console.error);
      }
  }

  const updateUserPassword = (event) => {
    event.preventDefault()
    let errors = false
    
    if (currentPassword === '') {
      setUpdatePasswordErrors(prevState => ({
          ...prevState,
          currentPassword: {status:true, message:'* Обязательное поле'}
      }))
      errors=true
    }
    if (newPassword === '') {
      setUpdatePasswordErrors(prevState => ({
          ...prevState,
          newPassword: {status:true, message:'* Обязательное поле'}
      }))
      errors=true
    }
    if(newPassword === currentPassword){
      setUpdatePasswordErrors(prevState => ({
        ...prevState,
        newPassword: {status:true, message:'* Новый и текущий пароль не должны совпадать'}
    }))
    errors=true
    }
    if(!errors){
        setUpdatePasswordErrors({
          currentPassword:{status:false,message:""},
          newPassword:{status:false,message:""}
        })

        userUpdatePassword(currentPassword,newPassword).then(res=>{
            if(res.status==='error'){
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'error',
                    message:res.data.message.join('\n')
                }))
            }
            else{
                dispatch(setSnackbarModal({
                    modal:true,
                    severity:'success',
                    message:'Успешно'
                }))
                dispatch(setUserInfo(res.data.data[0]))
                setCurrentPassword('')
                setNewPassword('')
            }
        }).catch(console.error);
    }
  }

  const handleOut = () => {
    handleCloseProfileModal()
    dispatch(setCart([]))
    dispatch(setUserInfo({}))
    localStorage.removeItem('cart')
    localStorage.removeItem('token')
  }

  return (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={ProfileModalStatus}
          onClose={handleCloseProfileModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
          sx={{boxSizing:'border-box'}}
        >
          <Box sx={{...modal,overflow:'hidden',justifyContent:'space-between',alignItems:'start',display:'flex',boxSizing:'border-box',flexDirection:{es:'column',xs:'column',sm:'column',md:'row',lg:'row',xl:'row'}}}>
            
            <IconButton
              aria-label="close"
              onClick={handleCloseProfileModal}
              sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  zIndex:333,
                  overrflow:'auto',
                  color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{width:'100%',minWidth:'300px',p:3,boxSizing:'border-box'}}>
              <Box sx={{mb:2,p:2,boxSizing:'border-box',borderRadius:2,display:'flex',alignItems:'center',justifyContent:'start',flexGrow:1,flexDirection:"column",backgroundColor:StringToColor(UserInfo?.fio)}}>
                <Typography sx={{...font,mx:2,color:'#fff',justifyContent:'center',alignItems:'center',display:'flex',fontSize:{es:'14px',xs:'14px',sm:'20px',md:'20px',lg:'20px',xl:'20px'},height:{es:'50px',xs:'50px',sm:'50px',md:'100px',lg:'100px',xl:'100px'}}}>
                  {UserInfo?.fio}
                </Typography>
              </Box>

              <Box sx={{display:'flex',gap:2,overflow:'auto',width:'100%',overflowX:'auto',flexDirection:{es:'row',xs:'row',sm:'row',md:'column',lg:'column',xl:'column'}}}>
                <Box variant="text" onClick={()=>setTab(1)} sx={{...font,display:'flex',alignItems:'center',textTransform:'none',justifyContent:'start',borderRadius:0,p:1,px:2,fontSize:{es:'10px',xs:'11px',sm:'12px',md:'14px',lg:'14px',xl:'16px'},borderBottom:(tab===1?'2px solid #404040':'2px solid rgba(0,0,0,0)')}}>
                  Личные данные
                </Box>
                <Box variant="text" onClick={()=>setTab(2)} sx={{...font,display:'flex',alignItems:'center',textTransform:'none',justifyContent:'start',borderRadius:0,p:1,px:2,fontSize:{es:'10px',xs:'11px',sm:'12px',md:'14px',lg:'14px',xl:'16px'},borderBottom:(tab===2?'2px solid #404040':'2px solid rgba(0,0,0,0)')}}>
                  Адреса
                </Box>
                <Box variant="text" onClick={()=>setTab(3)} sx={{...font,display:'flex',alignItems:'center',textTransform:'none',justifyContent:'start',borderRadius:0,p:1,px:2,fontSize:{es:'10px',xs:'11px',sm:'12px',md:'14px',lg:'14px',xl:'16px'},borderBottom:(tab===3?'2px solid #404040':'2px solid rgba(0,0,0,0)')}}>
                  Безопасность
                </Box>
                <Box variant="text" onClick={handleOut} sx={{...font,display:'flex',alignItems:'center',color:'#c62828',textTransform:'none',justifyContent:'start',borderRadius:0,p:1,px:2,fontSize:{es:'10px',xs:'11px',sm:'12px',md:'14px',lg:'14px',xl:'16px'}}}>
                  Выйти 
                </Box>
              </Box>
            </Box>

            <Box sx={{boxSizing:'border-box',flexGrow:2,p:2,width:'100%',height:'100%',display:(tab===1?'flex':'none'),flexDirection:'column',justifyContent:'start'}}>
              <Typography sx={{...font,fontSize:'22px',mb:3,textAlign:'center',display:{es:'none',xs:'none',sm:'none',md:'block',lg:'block',xl:'block'}}}>Личные данные</Typography>
              
              <TextField 
                label="ФИО" 
                variant="outlined" 
                FormHelperTextProps={{style:  {...font,color:'',fontSize:''}}}
                InputLabelProps={{shrink: true,style: {...font,color:''}}} 
                InputProps={{style: {...font,borderRadius: 8}}} 
                sx={{width:'100%',minWidth:'100px',maxWidth:'350px',m:'10px auto'}} 
                value={fio}
                onChange={(e)=>setFio(e.target.value)}
                error={updateInfoErrors.fio.status}
                helperText={updateInfoErrors.fio.message}
              />
              <TextField 
                label="Номер телефона" 
                FormHelperTextProps={{style:  {...font,color:'',fontSize:''}}}
                InputLabelProps={{shrink: true,style: {...font,color:''}}} 
                InputProps={{style: {...font,borderRadius: 8}}} 
                variant="outlined" 
                sx={{width:'100%',maxWidth:'350px',m:'10px auto'}} 
                value={number}
                onChange={handleNumberChange}
                error={updateInfoErrors.number.status}
                helperText={updateInfoErrors.number.message}
              />
              <TextField 
                FormHelperTextProps={{style:  {...font,color:'',fontSize:''}}}
                InputLabelProps={{shrink: true,style: {...font,color:''}}} 
                InputProps={{style: {...font,borderRadius: 8}}} 
                type="date" 
                label="Дата рождения" 
                variant="outlined" 
                sx={{width:'100%',maxWidth:'350px',m:'10px auto'}} 
                value={birthdate}
                onChange={(e)=>{
                  setBirthdate(e.target.value)
                }}
                error={updateInfoErrors.birthdate.status}
                helperText={updateInfoErrors.birthdate.message}
              />

              <Box sx={{display:'flex',my:'10px',gap:2,justifyContent:'center'}}>
                <LoadingButton loading={loading} disableElevation sx={{...font,color:"",borderRadius:2}} onClick={updateUserInfo} variant="contained" color="success">Сохранить</LoadingButton>
                <LoadingButton disableElevation sx={{...font,color:"",borderRadius:2}} onClick={handleResetUserInfo} variant="contained" color="error">Сбросить</LoadingButton>
              </Box>
            </Box>

            <Box sx={{boxSizing:'border-box',display:(tab===2?'flex':'none'),p:2,width:'100%',height:'100%',flexDirection:'column',justifyContent:'start'}}>
              <Typography sx={{...font,fontSize:'22px',mb:3,textAlign:'center',display:{es:'none',xs:'none',sm:'none',md:'block',lg:'block',xl:'block'}}}>Сохраненные адреса</Typography>
              <Box sx={{overflow:'auto',maxHeight:'100%',scrollbarWidth:'none'}}>
                {
                  Addresses.length>0
                  ?
                  Addresses.map((address,index)=>(
                    <Box key={index} sx={{maxWidth:'350px',display:'flex',alignItems:'center',justifyContent:'space-between',boxSizing:'border-box',borderRadius:2,width:'100%',p:1,m:'10px auto',border:'1px solid rgb(200, 200, 200)'}}>
                      
                      <Typography  component="div" variant="p" sx={{...font,width:'100%',whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 1, WebkitBoxOrient: 'horizontal',lineHeight: '1.2em', height: '1.2em'}}>
                        {address.displayName}
                      </Typography>

                      <IconButton 
                        aria-label="close"
                        onClick={()=>handleDeleteAddress(index)}
                        sx={{color:'rgb(64, 64, 64)'}}
                      >
                        <DeleteOutlineIcon/>
                      </IconButton>

                    </Box>
                  ))
                  :
                  <Box sx={{maxWidth:'350px',display:'flex',alignItems:'center',justifyContent:'space-between',boxSizing:'border-box',borderRadius:2,width:'100%',p:1,m:'10px auto',textAlign:'center'}}>
                      
                    <Typography  component="div" variant="p" sx={{...font,fontSize:'16px',color:'rgb(120, 120, 120)',width:'100%',whiteSpace: 'wrap', overflow: 'hidden'}}>
                      Список сохраненных адресов пуст
                    </Typography>

                  </Box>
                }
              </Box>
            </Box>

            <Box sx={{boxSizing:'border-box',display:(tab===3?'flex':'none'),p:2,width:'100%',height:'100%',flexDirection:'column',justifyContent:'start'}}>
              <Typography sx={{...font,fontSize:'22px',mb:3,textAlign:'center',display:{es:'none',xs:'none',sm:'none',md:'block',lg:'block',xl:'block'}}}>Безопасность</Typography>
              <TextField 
                type="password" 
                error={updatePasswordErrors.currentPassword.status} 
                helperText={updatePasswordErrors.currentPassword.message}
                FormHelperTextProps={{style:  {...font,color:'',fontSize:''}}} 
                InputLabelProps={{shrink: true,style: {...font,color:''}}} 
                InputProps={{style: {...font,borderRadius: 8}}} 
                label="Текущий пароль" 
                variant="outlined" 
                sx={{width:'100%',maxWidth:'350px',m:'10px auto'}} 
                onChange={(e)=>setCurrentPassword(e.target.value)} 
                value={currentPassword}
              />
              <TextField
                type="password" 
                error={updatePasswordErrors.newPassword.status} 
                helperText={updatePasswordErrors.newPassword.message}
                FormHelperTextProps={{style:  {...font,color:'',fontSize:''}}} 
                InputLabelProps={{shrink: true,style: {...font,color:''}}} 
                InputProps={{style: {...font,borderRadius: 8}}} 
                label="Новый пароль" 
                variant="outlined" 
                sx={{width:'100%',maxWidth:'350px',m:'10px auto'}} 
                onChange={(e)=>setNewPassword(e.target.value)} 
                value={newPassword}
              />
              <Box sx={{display:'flex',my:'10px',gap:2,justifyContent:'center'}}>
                <Button sx={{...font,color:"",borderRadius:2}} onClick={updateUserPassword} disableElevation variant="contained" color="success">Сохранить</Button>
              </Box>
            </Box>

          </Box>
        </Modal>
  )
}

export default ProfileModal