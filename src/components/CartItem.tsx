import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json"
import { Stack,Button } from "react-bootstrap"
import { FormatCurrency } from "../utils/FormatCurrency"

type cartItemProps ={
    id:number
    quantity:number
}

export const CartItem = ({ id,quantity }: cartItemProps) =>{
    const { removeFromCart } = useShoppingCart()
    const item = storeItems.find(item => item.id === id)
    if(item == null ) return null
    
    return(
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.imgUrl} style={{ width:"125px",height:"75px",objectFit:"cover" }}/>
            <div className="me-auto">
                <div>
                    {item.name} {quantity > 1 && 
                    <span className="muted" style={{ fontSize:".65rem" }}>{quantity} x</span>}
                </div>
                <div className="text-muted" style={{ fontSize:".75rem" }}>
                    { FormatCurrency(item.price) }
                </div>
            </div>
            <Button variant="outline-danger" size="sm" onClick={ () => removeFromCart(item.id) }>X</Button>
        </Stack>
    )

}