const CartPriceReduce = (cart) => {
    return cart.reduce((accumulator, item) => (
        item.product.amount > 0 ? accumulator + item.count * item.product.price : accumulator
    ), 0)
}

export default CartPriceReduce