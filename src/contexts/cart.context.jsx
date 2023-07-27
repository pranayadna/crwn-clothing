import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    console.log(cartItems);
    console.log(productToAdd);
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1} 
            : cartItem)
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    console.log(cartItems);
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id )
    }
    
    return cartItems.map((cartItem) =>
            cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
};


export const CartContext = createContext({
    isCartOpen: false,
    setIsCarOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {}
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])

    // ambil quantity dari per item bukan semuanya
    // const increment = cartItems.map

    // const deleteItemFromCheckout = (cartItems) => {
    //     cartItems.splice()
    // }
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const removeItemFromCheckout = (cartItems) => {

    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems }
    
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}