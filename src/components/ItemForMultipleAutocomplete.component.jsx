/* eslint-disable react/prop-types */
import {useState} from 'react'
import {TextField,Box} from '@mui/material'
import font from '../themes/font.theme'

const ItemForMultipleAutocompleteComponent = (props) => {
    const [count,setCount] = useState(props.product.count)

    return (
        <Box sx={{gap:1,justifyContent:'space-between',border:'1px solid #cbcbcb',borderRadius:2,display:'flex',alignItems:'center',px:1}}>
            <Box sx={{...font,fontSize:'12px',flexGrow:1}}>{props.product.name}</Box>
            <Box sx={{...font,fontSize:'12px',color:'#6f6f6f'}}>{props.product.amount} шт / </Box>
            <TextField 
                sx={{...font,fontSize:'12px',maxWidth:'50px',py:1}}
                type="tel"
                size="small"
                variant='standard'
                value={count}
                onChange={(e)=>{
                    if(e.target.value.length>6) return
                    if(parseInt(e.target.value)>props.max) return

                    setCount(parseInt(e.target.value)||0)
                    props.onChange(parseInt(e.target.value)||0)
                    
                }}
                FormHelperTextProps={{
                    style:  { 
                        ...font,
                        color:'',
                        fontSize:''
                    }
                }}
                InputLabelProps={{
                    shrink:true,
                    style: {
                        ...font,
                        color: '',
                        backgroundColor:'#fff',
                        paddingRight:'8px',
                    }
                }}
                InputProps={{
                    style: {
                        ...font,
                        fontSize:'14px',
                        borderRadius: 8,
                        padding:0,
                    }
                }}
            />
        </Box>
    )
}

export default ItemForMultipleAutocompleteComponent