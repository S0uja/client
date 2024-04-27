import {Fragment,useState,useEffect} from 'react'
import SearchComponent from './Search.component'
import {Paper,Box,Typography,Pagination,PaginationItem,Skeleton} from '@mui/material'
import CardComponent from './Card.component'
import font from '../themes/font.theme'
import { useDispatch, useSelector } from 'react-redux'
import LoadingCard from './LoadingCard.component'
import {setPage,setSearch,setCategory, setSearchInput} from '../store/products.store'
import { handleRequest } from '../utils/HandleRequest.util'
import { useNavigate } from 'react-router-dom'
import { setProducts, setTotalPages, setProductsLoading,setCollections } from '../store/products.store'
import CardCategory from './CardCategory.component'
import { getMainPage } from '../http/Products.http'
import ChipBar from './ChipBar.component'
import { setSnackbarModal } from '../store/modals.store'
import CollapseComponent from './Collapse.component'

const Catalog = () => {
  const dispatch = useDispatch()
  const Products = useSelector(state => state.products.products)
  const Collections = useSelector(state => state.products.collections)
  const [loading, setLoading] = useState(true)
  const TotalPages = useSelector(state => state.products.totalPages)
  const Page = useSelector(state => state.products.page)
  const navigate = useNavigate()
  const Search = useSelector(state => state.products.search)
  const Category = useSelector(state => state.products.category)

  //ХУК ОТВЕЧАЮЩИЙ ЗА ПОИСК ТОВАРОВ
  useEffect( () => {
    const updateProducts = async () => {
      console.log('CATALOG UPDATE');

      setLoading(true)

      if(!Search && !Category?.value){
        const mainPageResponse = await getMainPage()
        if(mainPageResponse){
          dispatch(setCollections(mainPageResponse.data.data.list))
        }
        dispatch(setTotalPages(0))
        dispatch(setProductsLoading(false))
      }
      else{
        const res = await handleRequest(Page,Search,Category?.value||null,navigate)  
        window.scrollTo(0, 0)
        if(!res){
          dispatch(setSnackbarModal({
            modal:true,
            severity:'error',
            message: 'Непредвиденная ошибка, попробуйте позже'
          }))
        }
        else if(res?.status==='error'){
          dispatch(setSnackbarModal({
              modal:true,
              severity:'error',
              message:res.data.message.join('\n') || 'Произошла ошибка'
          }))
        }
        else{
            dispatch(setProducts(res.data.data.list))
            dispatch(setTotalPages(res.data.data.totalPages))
        }
      }
      
      setLoading(false)
    }
    updateProducts()
  }, [Search, Category, Page, dispatch, navigate])


  const handleChangePage = async (e,value) => {
    if (value === Page) return
    dispatch(setPage(value))
  }

  const handleChangeSearch = async (value) => {
    if(value.trim().length === 0) return
    
    dispatch(setPage(1))
    dispatch(setSearch(value.trim()))
  }

  const handleDeleteCategory = () => {
    dispatch(setPage(1))
    dispatch(setCategory(null))
  }

  const handleDeleteSearch = () => {
    dispatch(setPage(1))
    dispatch(setSearch(null))
    dispatch(setSearchInput(''))
  }


  return (
    <Paper 
      elevation={0}
      sx={{
        height:'100%',
        display:'flex',
        flexDirection:'column',
        width:'100%',
        boxSizing:'border-box',
        borderRadius:2,
        position:'relative'
      }}
    >
      
      <Box 
        sx={{
          bgcolor:'#eeeeee',
          top:8,
          position:'sticky',
          zIndex:44
        }}>
        <Box
          sx={{
            bgcolor:'#fff',
            borderRadius:2,
            borderBottomLeftRadius:0,
            borderBottomRightRadius:0,
            p:2,
            display:'flex',
            flexDirection:'column',
            gap:1
          }}
        >
          <SearchComponent 
            onChange={handleChangeSearch}
          />
          <ChipBar
            chips={[
              {value:Search,handleDelete:handleDeleteSearch},
              {value:Category?.name,handleDelete:handleDeleteCategory}
            ]}
          />
        </Box>
      </Box>
  
      {
        loading && (
          <Box sx={{display:'flex',pl:2,mb:2,gap:2,flexWrap:'wrap'}}>
            <Typography sx={{width:'100%'}}>
              <Skeleton variant="rectangular" height={'36px'} width={'230px'} sx={{boxSizing:'border-box',borderRadius:2}}/>  
            </Typography>  
            <LoadingCard/>
            <LoadingCard/>
            <LoadingCard/>
            <LoadingCard/>
            <LoadingCard/>
            <LoadingCard/>
            <LoadingCard/>
            <LoadingCard/>
          </Box>
          
        )
      }
      {
        (!loading && Products.length>0) && (
          <Box id='catalog' sx={{minHeight:'50vh',pt:0}}>
            <Box sx={{display:'flex',pl:2,mb:2,gap:2,flexWrap:'wrap'}}>
              <Typography sx={{...font,fontSize:'24px',width:'100%'}}>Все товары</Typography>
              {
                Products.map((product,index1) => (
                  <CardComponent
                    key={index1}
                    id={product.id}
                    name={product.name}
                    image={product.product_images[0]?.filename || 'defaultProductImage.jpg'}
                    avgReview={product.avgReview || 0}
                    weight_volume={product.weight_volume}
                    price={product.price}
                  />
                ))
              }
            </Box>
          </Box>
        )
      }
      {
        (!loading && Collections.length>0) && (
          <Box id='catalog' sx={{minHeight:'50vh'}}>

            <Box sx={{display:'flex',pl:2,mb:2,gap:2,flexWrap:'wrap'}}>
              <Typography sx={{...font,fontSize:'24px',width:'100%'}}>Категории</Typography>
              {
                Collections[0].cards.slice(0,12).map((card,index1) => (
                  <CardCategory
                    key={index1}
                    id={card.id}
                    name={card.name}
                    image={card.filename || 'defaultProductImage.jpg'}
                  />
                ))
              }
              {
                Collections[0].cards.length>12 && (
                  <CollapseComponent 
                    items={Collections[0].cards.slice(12,Collections[0].cards.length).map((card,index2) => (
                      <CardCategory
                        key={index2}
                        id={card.id}
                        name={card.name}
                        image={card.filename || 'defaultProductImage.jpg'}
                      />
                    ))}
                    sx={{display:'flex',mb:2,gap:2,flexWrap:'wrap'}}
                  />
                )
              }
            </Box>
            <Box sx={{display:'flex',pl:2,mb:2,gap:2,flexWrap:'wrap'}}>
              {
                Collections[0].collections.map((collection,index1) => (
                  <Fragment key={index1}>
                    <Typography sx={{...font,fontSize:'24px',width:'100%'}}>{collection.name}</Typography>
                    {
                      collection.collection_products.map((product,index2)=>(
                        <CardComponent
                          key={index2}
                          id={product.product.id}
                          name={product.product.name}
                          image={product.product.product_images[0]?.filename || 'defaultProductImage.jpg'}
                          avgReview={product.product.avgReview || 0}
                          weight_volume={product.product.weight_volume}
                          price={product.product.price}
                        />
                      ))
                    }
                  </Fragment>
                ))
              }
            </Box>
            
          </Box>
        )
      }
      {
        (!loading && Collections.length===0 && Products.length===0) && (
          <Box sx={{minHeight:'50vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Typography sx={{...font,px:14,color:'rgb(120, 120, 120)',textAlign:'center',fontSize:'24px',width:'100%'}}>Товары не найдены</Typography>
          </Box>
        )
      }
      {
        (!loading && TotalPages>1) && (
          <Box sx={{display:'flex',justifyContent:'center',p:2,mt:2}}>
            <Pagination page={Page} onChange={handleChangePage} count={TotalPages} shape="rounded" sx={{font}} renderItem={	(item) => <PaginationItem {...item} sx={font}/>}/> 
          </Box>
        )
      }
    </Paper>
  )
}

export default Catalog