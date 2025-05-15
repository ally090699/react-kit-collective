import React, {useContext} from 'react';
import CartItem from './CartItem';
import { OrderContext } from './OrderContext';
import { Link } from 'react-router-dom';


export default function OrderConfirm() {
    const {order} = useContext(OrderContext);

    if (!order) {
        return <h1>No order found.</h1>
    }

    const {cart, subtotal, shipping, tax, discountAmount, total} = order;

    return (
        <div>
            <h1>Order #{order.orderNumber} Confirmed!</h1>
            <div className="cart flex-col">
                <h6 className="subtitle">Order Items</h6>
                {cart.length > 0 ? (
                    <div className="flex-col">
                    {cart.map((product) => (
                        <CartItem 
                            key={product.id}
                            id={product.id}
                            img={product.img}
                            name={product.name}
                            price={product.price}
                            quantity={product.quantity}
                        />
                    ))}
                    </div>
                ) : (
                    <div>
                        <h6>Cart is empty.</h6>
                    </div>
                )}
            </div>
            <div className="cart flex-col">
                <h6 className="subtitle">Order Details</h6>
                <h6>Subtotal: ${subtotal.toFixed(2)}</h6>
                <h6>Shipping: ${shipping.toFixed(2)}</h6>
                <h6>Tax: ${tax.toFixed(2)}</h6>
                <h6>Discount: ${discountAmount.toFixed(2)}</h6>
                <h6>Total: ${total}</h6>
                <Link to="/products">
                    <button className="btn btn-outline-dark">Continue Shopping</button>
                </Link>
            </div>
        </div>
    );
};
