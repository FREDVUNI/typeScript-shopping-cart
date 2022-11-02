import React, { useState,ReactNode,useContext,createContext } from 'react'
import { ShoppingCart } from '../components/ShoppingCart'
import { useLocalStorage } from '../hooks/useLocalStorage'

type ShoppingCartContextProps={
    children:ReactNode
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity:(id:number) => number
    increaseQuantity:(id:number) => void
    decreaseQuantity:(id:number) => void
    removeFromCart:(id:number) => void
    cartQuantity:number
    cartItems:CartItem[]
}

type CartItem ={
    id:number
    quantity:number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export const useShoppingCart = () =>{
    return useContext(ShoppingCartContext)
}

export const ShoppingCartProvider = ({children}:ShoppingCartContextProps) =>{
    const [cartItems,setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])
    const [isOpen,setIsOpen] = useState(false)
    
    const cartQuantity = cartItems.reduce((quantity,item) => item.quantity + quantity,0)
    
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const getItemQuantity = (id:number) =>{
        return cartItems.find(items => items.id === id) ?.quantity || 0
    }

    const increaseQuantity = (id:number) =>{
        setCartItems(currentItems =>{
            if(currentItems.find(item => item.id === id) == null){
                return [...currentItems, { id, quantity:1 }]
            }else{
                return currentItems.map(item =>{ 
                    if(item.id === id){
                        return { ...item, quantity:item.quantity + 1 }
                    }else{
                        return item
                    }
                })
            }
        })
    }

    const decreaseQuantity = (id:number) =>{
        setCartItems(currentItems =>{
            if(currentItems.find(item => item.id === id)?.quantity === 1){
                return currentItems.filter(item => item.id !== id)
            }else{
                return currentItems.map(item =>{ 
                    if(item.id === id){
                        return {...item,quantity:item.quantity - 1}
                    }else{
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id:number) =>{
        setCartItems(currentItems =>{
            return currentItems.filter( item => item.id !== id )
        })
    }

    return (
        <ShoppingCartContext.Provider 
        value={{
            getItemQuantity,
            increaseQuantity,
            decreaseQuantity,
            removeFromCart,
            openCart,
            closeCart,
            cartItems,
            cartQuantity
            }}
        >
            <ShoppingCart isOpen={isOpen}/>
            {children}
        </ShoppingCartContext.Provider>
    )   
}