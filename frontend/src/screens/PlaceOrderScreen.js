import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button, Col, Row, ListGroup, Image, Card} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import CheckOutSteps from '../components/CheckOutSteps';

import Message from '../components/Message';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch()

    const {order, success, error} = useSelector(state => state.orderCreate)

    const cart = useSelector(state => state.cart)
    const {shippingAddress, paymentMethod: {paymentMethod}, cartItems} = cart

    // Calculate Prices
    cart.itemsPrice = cartItems.reduce((acc, item)=> acc + item.price * item.qty, 0);

    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;

    cart.taxPrice = Number(0.15 * cart.itemsPrice).toFixed(2);

    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)

    const {itemsPrice, shippingPrice, taxPrice, totalPrice} = cart

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const renderOrderItems = () => {
        return (
            <ListGroup variant='flush'>
                {cartItems.map((item, index) => {
                    return (
                        <ListGroup.Item key={index}>
                            <Row>
                                <Col md={1}>
                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col>
                                   <Link to={`/product/${item.product}`}>{item.name}</Link> 
                                </Col>
                                <Col md={4}>
                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        )
    }

    const renderError = () => error && <Message variant='danger'>{error}</Message>

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }))
    }

    return (
        <>
            <CheckOutSteps step1 step2 step3 step4 style={{margin: 'auto'}}/>        
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country} 
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {paymentMethod === 'stripe' ? 'Stripe or Credit Card' : 'Pay At Delivery'}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cartItems.length ===0 ? <Message>YOur cart is empty</Message> : renderOrderItems()}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {renderError()}
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cartItems === 0} onClick={placeOrderHandler}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

            </Row>
        </>
    )
}

export default PlaceOrderScreen
