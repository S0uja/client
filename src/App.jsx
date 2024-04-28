import { useEffect} from 'react'
import { setCategories } from './store/categories.store'
import Categories from './components/Categories.component'
import Catalog from './components/Catalog.component'
import { useDispatch } from 'react-redux'
import { getAllCategories, getOneCategory } from './http/Categories.http'
import ProductModal from './modals/Product.modal'
import AuthModal from './modals/Auth.modal'
import {ThemeProvider} from '@mui/material/styles';
import theme from './themes/colors.theme'
import Cart from './components/Cart.component'
import Header from './components/Header.component'
import { userCheck } from './http/User.http'
import { getAllOrders } from './http/Orders.http'
import {setUserInfo} from "./store/user.store"
import SyncCart from './utils/SyncCart.util'
import {setCart} from './store/cart.store'
import SnackbarModal from './modals/Snackbar.modal'
import Grid from '@mui/material/Unstable_Grid2'
import CartFab from './components/CartFab.component'
import CartModal from './modals/Cart.modal'
import { setOrders,setAddresses } from './store/user.store'
import OrderModal from './modals/Order.modal'
import ProfileModal from './modals/Profile.modal'
import { setPage, setCategory, setSearch, setSearchInput } from './store/products.store'
import { getCart } from './http/Cart.http'
import FooterComponent from './components/Footer.component'
import RateProductModal from './modals/RateProduct.modal'
import SupportModal from './modals/Support.modal'


export const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const searchParams = new URLSearchParams(window.location.search)
        const params = {}
        if(searchParams.size>0){
          params.page = searchParams.get('page')
          params.search = searchParams.get('search') 
          params.category = searchParams.get('category') 

          params.page = params.page==='null'?1:params.page
          params.search = params.search==='null'?null:params.search
          params.category = params.category==='null'?null:params.category

          if(params.category){
            params.category = await getOneCategory(params.category)
            params.category = params.category.data.data[0]
          }

          dispatch(setPage(parseInt(params.page)))
          dispatch(setCategory({name:params.category?.name,value:params.category?.id}))
          dispatch(setSearch(params.search))
          dispatch(setSearchInput(params.search))
        }

        if (localStorage.getItem('token')) {
          const userResponse = await userCheck()
          if (userResponse?.data) {
            dispatch(setUserInfo(userResponse.data.data[0]))
          }
        }
        
        const categoriesResponse = await getAllCategories()
        if (categoriesResponse) {
          dispatch(setCategories(categoriesResponse.data.data));
        }
        
        const ordersResponse = await getAllOrders()
        if (ordersResponse) {
          dispatch(setOrders(ordersResponse.data.data));
        }
        
        if (localStorage.getItem('addresses')) {
          dispatch(setAddresses(JSON.parse(localStorage.getItem('addresses'))))
        }

        if (localStorage.getItem('cart')) {
          const localCart = JSON.parse(localStorage.getItem('cart'))
          const syncCart = await SyncCart(localCart)
          dispatch(setCart(syncCart))
        }

        else if(localStorage.getItem('token')) {
          const localCart = await getCart()
          const syncCart = await SyncCart(localCart.data.data[0]?.json)
          dispatch(setCart(syncCart))
        }

      } catch (error) {
        console.error('Ошибка в запросах:', error);
      }
    }
    fetchData()
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <RateProductModal/>
      <ProfileModal/>
      <OrderModal/>
      <SnackbarModal />
      <ProductModal />
      <AuthModal />
      <CartModal />
      <CartFab/>
      <SupportModal/>

      <Grid maxWidth={'xl'} container={true} disableEqualOverflow sx={{width: "100vw",px:1,pb:1,m:0,position:'relative',boxSizing:'border-box'}}>
        <Grid 
          es={12} xs={12} sm={12} md={12} lg={12} xl={12}
          sx={{width:'100%',display:{es:'block',xs:'block',sm:'block',md:'block',lg:'block',xl:'block'}}}
        >
          <Header />
        </Grid>

        <Grid
          es={12} xs={12} sm={12} md={12} lg={12} xl={12}
          sx={{width:'100%',display:{ex:'block',xs:'block', sm:'block',md:'block',lg:'block',xl:'block'},position:'sticky',zIndex:5,top:0,backgroundColor:'#eeeeee',height:'8px'}}
        >
        </Grid>

        <Grid
          es={0} xs={0} sm={0} md={3} lg={3} xl={2.5}
          sx={{pr:2,width:'100%',display:{es:'none',xs:'none',sm:'none',md:'block',lg:'block',xl:'block'}}}
        >
          <Categories />
        </Grid>

        <Grid
          es={12} xs={12} sm={12} md={9} lg={9} xl={6.5}
        >
          <Catalog />
        </Grid>

        <Grid
          es={0} xs={0} sm={0} md={0} lg={0} xl={3}
          sx={{pl:2,display:{es:'none',xs:'none',sm:'none',md:'none',lg:'none',xl:'block'}}}
        >
          <Cart />
        </Grid>

        <Grid
          es={0} xs={0} sm={0} md={3} lg={3} xl={2.5}
          sx={{pr:2,width:'100%',display:{es:'none',xs:'none',sm:'none',md:'block',lg:'block',xl:'block'}}}
        >
        </Grid>
        
        <Grid 
          es={12} xs={12} sm={12} md={9} lg={9} xl={6.5}
          sx={{width:'100%',display:{es:'block',xs:'block',sm:'block',md:'block',lg:'block',xl:'block'}}}
        >
          <FooterComponent />
        </Grid>

      </Grid>
    </ThemeProvider>
  )
}

export default App