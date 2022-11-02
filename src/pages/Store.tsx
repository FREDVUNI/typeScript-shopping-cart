import React from 'react'
import StoreItems from '../data/items.json'
import { Row,Col } from 'react-bootstrap'
import { StoreItem } from '../components/StoreItem'

const Store = () =>{
    return(
        <>
            <h4>Store</h4>
            <Row md={2} xs={1} lg={4} className="g-3">
                {StoreItems.map((item) =>(
                <Col key={item.id}>
                    {<StoreItem {...item}/>}
                </Col>
                ))}
            </Row>
        </>
    )
}

export default Store