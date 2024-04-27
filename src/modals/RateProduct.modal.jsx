import {Modal,Box,Backdrop,IconButton,CircularProgress,ListItemAvatar,Avatar,Rating} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react'
import modal from '../themes/modal.theme'
import {LoadingButton} from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux'
import {setRateModal,setSnackbarModal} from '../store/modals.store'
import CloseIcon from '@mui/icons-material/Close';
import {getProductsForRate,createReview} from '../http/Orders.http'
import MobileStepper from '@mui/material/MobileStepper';
import font from '../themes/font.theme'
import FormTextFieldComponent from '../components/FormTextField.component'

const RateProductModal = () => {
  const dispatch = useDispatch()
  const RateProductModalStatus = useSelector(state => state.modals.rateModal)
  const [activeStep] = useState(0)
  const [loading,setLoading] = useState(true)
  const [rates, setRates] = useState([])
  const [hover, setHover] = useState(-1);
  const [rate,setRate] = useState(5)
  const [text,setText] = useState('')
  const labels = {
    1: 'Ужасно',
    2: 'Плохо',
    3: 'Средне',
    4: 'Хорошо',
    5: 'Отлично',
  };
  

  useEffect(()=>{
    if(!RateProductModalStatus) return
    getProductsForRate().then(res=>{
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
          setRates(...res.data.data)
          setLoading(false)
      }
    })
  },[dispatch,RateProductModalStatus])

  const getLabelText = (value)=>{
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  const handleCloseCartModal = () => {
    dispatch(setRateModal(false))
  }

  const handleCreateReview = () => {
    setLoading(true)
    createReview(rates[0].id,rates[0].product.id,text,rate).then(res=>{
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
          const newRates = rates
          newRates.shift()
          setRates(newRates || [])
          setRate(5)
          setText('')
          setLoading(false)
          dispatch(setSnackbarModal({
            modal:true,
            severity:'success',
            message:'Успешно'
          }))
      }
    })
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={RateProductModalStatus}
      onClose={handleCloseCartModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
          backdrop: {
              timeout: 500,
          },
      }}
      sx={{boxSizing:'border-box'}}
    >
      <Box sx={{
        ...modal,
        height:'auto',
        maxWidth:'600px',
        display:'flex',
        justifyContent:'space-between',
        boxSizing:'border-box',
        alignItems:'start',
        flexDirection:{es:'column',xs:'column',sm:'column',md:'row',lg:'row',xl:'row'},
        gap:1
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseCartModal}
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
          loading ?
          <Box sx={{flexGrow:1,widht:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <CircularProgress color={'primary'}/>
          </Box>
          :
          rates.length === 0 ?
          <Box 
            sx={{width:'100%',fontSize:'20px',color:'rgb(120, 120, 120)',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}
          >
            Все товары оценены, спасибо!
          </Box>
          :
          <Box sx={{width:'100%'}}>
            <MobileStepper
              variant="dots"
              steps={rates.length}
              position="static"
              activeStep={activeStep}
              sx={{ width:'100%',display:'flex',justifyContent:'center' }}
            />
              <Box sx={{width:'100%',boxSizing:'border-box',display:'flex',gap:2,alignItems:'center',flexDirection:{
                  es: 'column',
                  xs: 'column',
                  s: 'column',
                  sm: 'row',
                  md: 'row',
                  lg: 'row',
                  xl: 'row',
                  xxl: 'row',
                }}}>
                <ListItemAvatar sx={{width:{es: '100%',xs:'100%',s:'100%',sm: 145}}}>
                    <Avatar
                        variant="rounded"
                        src={import.meta.env.VITE_API_STATIC_URL+(rates[0].product.product_images[0]?.filename || 'defaultProductImage.jpg')}
                        sx={{ margin:'0 auto',width:{es: '100%',xs:'100%',s:'100%',sm: 145}, height: 145 }}
                    />
                </ListItemAvatar>
                <Box sx={{width:'100%',display:'flex',gap:2,flexDirection:'column',justifyContent:'center'}}>
                    <FormTextFieldComponent 
                      error={{status:false}}
                      type={'text'}
                      label={''}
                      rows={2}
                      m={true}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder={'Расскажите ваши впечатления'}
                    />

                    <Box sx={{...font,gap:2,display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:{
                      es: 'column',
                      xs: 'column',
                      s: 'row',
                      sm: 'row',
                      md: 'row',
                      lg: 'row',
                      xl: 'row',
                      xxl: 'row',
                  }}}>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Rating
                          value={rate}
                          getLabelText={getLabelText}
                          onChange={(event, newValue) => {
                            setRate(newValue);
                          }}
                          onChangeActive={(event, newHover) => {
                            setHover(newHover);
                          }}
                        />
                        {rate !== null && (
                          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rate]}</Box>
                        )}
                      </Box>

                      <LoadingButton
                        disabled={rate>0?false:true}
                        loading={loading}
                        disableElevation
                        variant={"contained"}
                        color="success"
                        onClick={handleCreateReview}
                        size='large'
                        sx={{...font,px:2,color:'#fff',fontWeight:750,borderRadius:2,width:{es: '100%',xs: '100%',s: 'auto',}}}
                        startIcon={<CheckIcon size="small"/>}
                    >   
                        Отправить
                      </LoadingButton>
                    </Box>

                </Box>
              </Box>
          </Box>
        }
      </Box>
    </Modal>
  )
}

export default RateProductModal