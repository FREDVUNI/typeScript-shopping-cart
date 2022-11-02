type StoreItemProps = {
    id:number,
    name:string,
    price:number,
    imgUrl:string
}
import { useShoppingCart } from '../context/ShoppingCartContext'
import { Card,Button } from 'react-bootstrap'
import { FormatCurrency } from '../utils/FormatCurrency'

export const StoreItem = ({id,name,price,imgUrl}:StoreItemProps) =>{
    const {
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
    } = useShoppingCart()
    
    const quantity = getItemQuantity(id)

    return(
        <Card className="h-100">
            <Card.Img variant="top" src={imgUrl} height="200px" style={{ objectFit:"cover" }}/>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-space-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{FormatCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    { quantity === 0 ?( 
                        <Button className="w-100 btn-dark" onClick = { () => increaseQuantity(id) }>+ Add to cart</Button>
                        ): 
                        <div className="d-flex align -items-center flex-column" style={{ gap:".5rem" }}>
                            <div className="d-flex align-items-center justify-content-center" style={{ gap:".5rem" }}>
                                <Button className="btn btn-sm btn-dark" onClick = { () => decreaseQuantity(id) }>-</Button>
                                <div>
                                    <span className="fs-3 text-success">{quantity}</span> in cart
                                </div>
                                <Button className="btn btn-sm btn-dark" onClick = { () => increaseQuantity(id) }>+</Button>
                            </div>
                            <Button className="btn btn-sm btn-danger" onClick ={ () => removeFromCart(id) }>Remove</Button>
                        </div>
                    }
                </div>
            </Card.Body>
        </Card>
    )
}