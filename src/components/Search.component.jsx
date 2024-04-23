import {useState} from 'react'
import {Paper,InputBase,IconButton,Box,Chip} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import font from "../themes/font.theme"
import { useDispatch, useSelector } from 'react-redux'
import {setPage, setSearch, setCategory, setSearchInput, setProductsLoading} from '../store/products.store'
import { setProducts,setTotalPages } from '../store/products.store'
import { setSnackbarModal } from '../store/modals.store'
import { useNavigate } from 'react-router-dom'
import { handleRequest } from '../utils/HandleRequest.util'
import ClearIcon from '@mui/icons-material/Clear';

const Search = (props) => {
  const [value,setValue] = useState('')
  const dispatch = useDispatch()

  return (
    <Paper
      component="form"
      variant='0'
      width={props.width}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        flexGrow:1,
        height:40,
        borderRadius:2,
        backgroundColor:'#eeeeee',
        color:'rgb(166, 166, 166)'
      }}
    >
      <InputBase
        sx={{...font, ml: 1, flex: 1 }}
        placeholder="Поиск"
        value={value}
        onChange={(e)=>{
          if(e.target.value === '') {
            if(props.onClear) {
              props.onClear()
            }
          }
          setValue(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            props.onChange(value)
          }
        }}
      />
      {
        value && (
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" 
            onClick={()=>{
              setValue('')
              if(props.onClear) {
                props.onClear();
              }
            }}
          >
            <ClearIcon />
          </IconButton>
        )
      }
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={()=>props.onChange(value)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default Search