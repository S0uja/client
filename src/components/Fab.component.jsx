import React from 'react'
import {Fab} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import font from '../themes/font.theme'
import {setCartModal} from '../store/modals.store'
import { useSelector, useDispatch } from 'react-redux'
import CartPriceReduce from '../utils/CartPriceReduce.util'

const FabComponent = () => {
    const dispatch = useDispatch()
    const Cart = useSelector(state => state.cart.cart)

    const CartAvailable = Cart.filter(item=>item.product.amount>0)

    const handleClickFab = () => {
        dispatch(setCartModal(true))
    }

    return (
        <Fab 
            variant="extended" 
            size="large" 
            color="primary" 
            sx={{
                ...font,
                color:'#fff',
                alignItems:'center',
                position:'fixed',
                bottom:'10px',
                right:'10px',
                display:{es:'flex',xs:'flex',sm:'flex',md:'flex',lg:'flex',xl:'none'}
            }}
            onClick={handleClickFab}
            disabled={CartPriceReduce(CartAvailable)===0}
        >
            <ShoppingCartIcon sx={{ mr: 1 }} />
            {CartPriceReduce(CartAvailable)} ₽
        </Fab>
    )
}

export default FabComponent