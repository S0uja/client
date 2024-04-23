import {useState} from 'react'
import font from '../themes/font.theme'
import {List,ListItemButton,ListItemText,Collapse,ListItemAvatar,Avatar,Skeleton, Divider} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import {setCategory, setPage} from '../store/products.store'
import { setProducts,setTotalPages } from '../store/products.store'
import { setSnackbarModal } from '../store/modals.store'
import { useNavigate } from 'react-router-dom'
import { handleRequest } from '../utils/HandleRequest.util'

const Categories = () => {
    const Categories = useSelector(state => state.categories.categories)
    const [open, setOpen] = useState(0)
    const dispatch = useDispatch()
    const Category = useSelector(state => state.products.category)

    const handleOpen = (id) => {
        open===id ? setOpen(0) : setOpen(id)
    }
    
    const handleChangeCategory = async (name,value) => {
        if(value===Category?.value) return
        dispatch(setPage(1))
        dispatch(setCategory({name:name,value:value}))
    }

    return (
        <List
            id="categories"
            sx={{
                flexGrow:1,
                widht:'100%',
                bgcolor:'background.paper',
                borderRadius:2,
                p:2,
                position:'sticky',
                top: 8,
                gap:1,
                display:'flex',
                flexDirection:'column'
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {
                Categories.length?
                Categories.map((category,index) => {

                    if(category.parentId){
                        return
                    }

                    const child = Categories.filter((item)=>item.parentId===category.id)

                    return (
                        <div key={index}>
                            <ListItemButton key={index} sx={{borderRadius:2,p:1}} onClick={() => handleOpen(category.id)}>
                                <ListItemAvatar sx={{ minWidth: 40 }}>
                                    <Avatar 
                                        variant="rounded"
                                        src={import.meta.env.VITE_API_URL+category.filename}
                                        sx={{ width: 24, height: 24 }}
                                    
                                    />
                                </ListItemAvatar>
                                <ListItemText primaryTypographyProps={font} primary={category.name}/>
                            </ListItemButton>

                            {child.length>0 && 
                                <Collapse in={open===category.id} timeout="auto" unmountOnExit>
                                {
                                    child.map((sub_category,i)=>{
                                        return (
                                            <ListItemButton onClick={()=>handleChangeCategory(sub_category.name,sub_category.id)} key={i} sx={{borderRadius:2, mb:1,p:1, pl: 2 }}>
                                                <ListItemText primaryTypographyProps={font} primary={sub_category.name} />
                                            </ListItemButton>
                                        )
                                    })
                                }
                                </Collapse>
                            }
                        </div>
                    )
                })
                :
                <>
                    <Skeleton variant="rectangular" height={'45px'} width={'100%'} sx={{boxSizing:'border-box',borderRadius:2,p:1 }}/>
                    <Skeleton variant="rectangular" height={'45px'} width={'100%'} sx={{boxSizing:'border-box',borderRadius:2,p:1 }}/>
                    <Skeleton variant="rectangular" height={'45px'} width={'100%'} sx={{boxSizing:'border-box',borderRadius:2,p:1 }}/>
                    <Skeleton variant="rectangular" height={'45px'} width={'100%'} sx={{boxSizing:'border-box',borderRadius:2,p:1 }}/>
                    <Skeleton variant="rectangular" height={'45px'} width={'100%'} sx={{boxSizing:'border-box',borderRadius:2,p:1 }}/>
                    <Skeleton variant="rectangular" height={'45px'} width={'100%'} sx={{boxSizing:'border-box',borderRadius:2,p:1 }}/>
                    <Skeleton variant="rectangular" height={'45px'} width={'100%'} sx={{boxSizing:'border-box',borderRadius:2,p:1 }}/>
                    <Skeleton variant="rectangular" height={'45px'} width={'100%'} sx={{boxSizing:'border-box',borderRadius:2,p:1 }}/>
                </>
            }
        </List>
    )
}

export default Categories