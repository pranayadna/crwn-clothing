import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"


const Checkout = () => {
    const { cartItems, addItemToCart, removeItemFromCart } = useContext(CartContext)
    // const { name, imageUrl, price, quantity } = cartItems

    // const incrementQuantity = () => {
    //     const add = cartItems.map((cartItem) => ({quantity: cartItem.quantity + 1}) ) 
    //     setQuantityCount(add)
    // }

    // const addProductToCart = 

    return(
        <div className="">
            <h1>Checkout Page</h1>
            <div className="">
                <table border={1}>
                    <tr>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Remove</th>
                    </tr>
                    {
                        cartItems.map((cartItem) => {
                            const { imageUrl, name, quantity, price } = cartItem
                            return(
                            <tr>
                                <td><img src={imageUrl} alt={name} /></td>
                                <td>{name}</td>
                                <td>
                                    <button onClick={() => removeItemFromCart(cartItem)}>-</button>
                                    {quantity}
                                    <button onClick={() => addItemToCart(cartItem)}>+</button>
                                </td>
                                <td>{price}</td>
                                <td>
                                   <button onClick={() => cartItem.splice(0, 1)}>X</button>
                                </td>
                            </tr>
                        )})
                    }
                </table>
            </div>
            <div className="">
                TOTAL: $1720
            </div>
        </div>
    )
}

export default Checkout