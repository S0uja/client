import {useState,useEffect} from 'react';
import {Card,CardMedia,Box, Typography,CardContent} from '@mui/material';
import font from '../themes/font.theme'
import { useDispatch, useSelector } from 'react-redux'
import {setCategory, setPage} from '../store/products.store'
import { setProducts,setTotalPages } from '../store/products.store'
import { setSnackbarModal } from '../store/modals.store'
import { useNavigate } from 'react-router-dom'
import { handleRequest } from '../utils/HandleRequest.util'
import GetContrastColor from '../utils/GetContrastColor.util'

const CardCategoryComponent = (props) => {

    const dispatch = useDispatch()
    const Category = useSelector(state => state.products.category)

    const handleChangeCategory = async (name,value) => {
      if(value === Category?.value) return
      dispatch(setPage(1))
      dispatch(setCategory({name:name,value:value}))
    }

    return (
        <Card sx={{
            flexBasis: {
              es:'calc(50% - 16px)',
              xs:'calc(33.33% - 16px)',
              sm:'calc(25% - 16px)',
              md:'calc(25% - 16px)',
              lg:'calc(25% - 16px)',
              xl:'calc(25% - 16px)',
            },
            height:'auto',
            backgroundColor:'#eeeeee',
            borderRadius:2,
            cursor:'pointer'
          }}
          elevation={0}
          onClick={()=>{
            handleChangeCategory(props.name,props.id)
          }}
        >
          <CardContent sx={{p:1}}>
            <Typography gutterBottom variant="p" component="div" sx={{...font, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',lineHeight: '1.2em', height: '2.4em'}}>
              {props.name}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              aspectRatio: '1 / 1',
              borderRadius:2,userSelect: 'none', userDrag: 'none'
            }}
            image={import.meta.env.VITE_API_URL+props.image}
            // image={import.meta.env.VITE_API_STATIC_URL+'defaultProductImage.jpg'}
          />
        </Card>
    )
}
export default CardCategoryComponent;