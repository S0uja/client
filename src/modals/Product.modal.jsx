import {Paper,Box,Backdrop,Modal,Fade,Button,Typography,CircularProgress,IconButton} from '@mui/material';
import Slider from '../components/Slider.component'
import modal from '../themes/modal.theme'
import font from "../themes/font.theme"
import hr from "../themes/hr.theme"
import ProductButton from '../components/ProductButton.component'
import { useDispatch, useSelector } from 'react-redux'
import { setProductModal } from '../store/modals.store'
import { setProduct } from '../store/products.store'
import CloseIcon from '@mui/icons-material/Close';

const ProductModal = (props) => {

  const ProductModalStatus = useSelector(state => state.modals.productModal)
  const ProductInfo = useSelector(state => state.products.productInfo)
  const dispatch = useDispatch()
  
  const handleCloseProductModal = () => {
    dispatch(setProductModal(false))
    dispatch(setProduct(null))
  }

  return (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={ProductModalStatus}
          onClose={handleCloseProductModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
          sx={{boxSizing:'border-box'}}
        >
          <Box sx={{...modal,display:'flex',boxSizing:'border-box',flexDirection:{es:'column',xs:'column',sm:'row',md:'row',lg:'row',xl:'row'},gap:3}}>
            <IconButton
              aria-label="close"
              onClick={handleCloseProductModal}
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
            ProductInfo===null
            ?
            <CircularProgress color='primary'/>
            :
            <>
              <Slider images={ProductInfo.product_images} />

              <Box sx={{width:'100%',mb:3,height:{es:'40%',xs:'40%',sm:'90%',md:'90%',lg:'90%',xl:'90%'}}}>

                <Box sx={{overflowY:'scroll',scrollbarWidth: 'none',height:{es:'90%',xs:'90%',sm:'90%',md:'90%',lg:'90%',xl:'90%'},position:'relative'}}>

                  <Typography sx={{...font,fontSize:'28px', wordBreak:'break-all'}}>
                    {ProductInfo.name}
                  </Typography>
                  <Box sx={{display:'flex',justifyContent:'start',gap:2,alignItems:'center'}}>
                    <Typography sx={{...font,fontSize:'20px',color:'rgb(120, 120, 120)'}}>
                      {ProductInfo.weight_volume}
                    </Typography>
                    
                    <Typography sx={{...font,fontSize:'20px',color:'rgb(120, 120, 120)'}}>
                      ★ {ProductInfo.avgReview || 0}
                    </Typography>
                  </Box>
                  

                  <hr style={hr}/>
                  
                  <Typography sx={{...font,color:'rgb(120, 120, 120)'}}>
                    Состав
                  </Typography>
                  <Typography sx={{...font,wordBreak:'break-all'}}>
                    {ProductInfo.structure}
                  </Typography>

                  <hr style={hr}/>

                  <Typography sx={{...font,color:'rgb(120, 120, 120)'}}>
                    Описание
                  </Typography>
                  <Typography sx={{...font,wordBreak:'break-all'}}>
                    {ProductInfo.description}
                  </Typography>
                  
                  <Typography sx={{...font,mt:2,color:'rgb(120, 120, 120)'}}>
                    Срок хранения
                  </Typography>
                  <Typography sx={{...font,wordBreak:'break-all'}}>
                    {ProductInfo.expirationdate}
                  </Typography>
                  
                  <Typography sx={{...font,mt:2,color:'rgb(120, 120, 120)'}}>
                    Условия хранения
                  </Typography>
                  <Typography sx={{...font,wordBreak:'break-all'}}>
                    {ProductInfo.storageconditions}
                  </Typography>

                  <Typography sx={{...font,mt:2,color:'rgb(120, 120, 120)'}}>
                    Производитель
                  </Typography>
                  <Typography sx={{...font,wordBreak:'break-all'}}>
                    {ProductInfo.manufacturer?.name||'Сторонний производитель'}
                  </Typography>

                </Box>

                <Box sx={{minHeight:'10%',display:'flex',flexDirection:'column',justifyContent:'end',pt:1}}>
                  <ProductButton id={ProductInfo.id} price={ProductInfo.price}/>
                </Box>

              </Box>
            </>
          }
          </Box>
        </Modal>
  );
}

export default ProductModal