import { useContext } from "react"

import { CartContext } from "../../contexts/cart.context"

import Button from "../button/button.component"
import CartItems from "../cart-items/cart-items.component"

import './cart-dropdown.styles.scss'
import { Link } from "react-router-dom"

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)

    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((cartItem) => (
                    <CartItems key={cartItem.id} cartItem={cartItem} />
                ))}
            </div>
            <Link to='checkout'>Go to checkout</Link>
        </div>
    )
}

export default CartDropdown