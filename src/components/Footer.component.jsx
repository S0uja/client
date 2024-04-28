/* eslint-disable react/no-unescaped-entities */
import {Paper,Box, Typography,Link} from '@mui/material'
import font from '../themes/font.theme'
import FastfoodIcon from '@mui/icons-material/Fastfood';

const FooterComponent = () => {
  return (
    <Paper elevation={0} sx={{mt:2,alignItems:'center',justifyContent:'space-between',boxSizing:'border-box',p:2,display:'flex',width:'100%',borderRadius:2,backgroundColor:'#fff'}}>
        <Box sx={{display:'flex',flexDirection:'column',gap:1}}>
            <Box><Link target="_blank" rel="noopener" sx={{...font,cursor:'pointer',fontSize:14}} href={'https://disk.yandex.ru/d/lg_cFYyA-7OGYg'}>Пользовательское соглашение</Link></Box>
            <Box><Link target="_blank" rel="noopener" sx={{...font,cursor:'pointer',fontSize:14}} href={'https://disk.yandex.ru/i/IXiQDDmiIupB8Q'}>Согласие на обработку персональных данных</Link></Box>
        </Box>
        <Box sx={{display:'flex',flexDirection:'column',gap:1,alignItems:'end'}}>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <FastfoodIcon size='small' sx={{color:'rgb(64,64,64)',fontSize:'16px'}}/>
                <Typography sx={{...font,color:'rgb(64,64,64)',fontSize:'16px'}}>FoodExpress</Typography>
            </Box>
            <Typography color="inherit" sx={{...font,fontSize:14}}>Выполнил: Голышев К.Д.</Typography>
        </Box>
    </Paper>
  )
}

export default FooterComponent