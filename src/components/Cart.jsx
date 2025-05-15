import React, {useState, useEffect, useContext} from "react";
import { CartContext } from "./CartContext";
import CartItem from "./CartItem";
import products from "./lists/products";
import { useHistory } from "react-router-dom";
import { OrderContext } from "./OrderContext";

export default function Cart(){
    const history = useHistory();
    const { confirmOrder } = useContext(OrderContext);
    const {cart, addQuantity, subQuantity, deleteItem, setCart} = useContext(CartContext);

    const [discount, setDiscount] = useState("");
    const [error, setError] = useState(false);
    const [statusMessages, setStatusMessages] = useState("");

    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(4.99);
    const [tax, setTax] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);

    useEffect(() => {
        console.log("Cart contents:", cart);

        const sub = cart.reduce((acc, item) => {
            const product = products.find(p => p.id === item.id)
            const price = product ? Number(product.price) : 0;
            const quantity = parseInt(item.quantity) || 0;
            return acc + price * quantity;
        }, 0);
        setSubtotal(sub);
        setTax(sub * 0.13);
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        if (subtotal > 50) {    // free shipping over 50$
            setShipping(0);
        } else {                // shipping under 50$ flat rate $4.99
            setShipping(4.99);
        }
    }, [subtotal]);

    const handleConfirmOrder = () => {
        const orderDetails = {
            cart: [...cart],
            subtotal,
            shipping,
            tax,
            discountAmount,
            total,
            date: new Date().toISOString(),
        };
        console.log("Cart contents:", orderDetails);

        confirmOrder(orderDetails);
        setCart([]);
        history.push("/orderconfirm");
    };

    const total = Number(subtotal + shipping + tax - discountAmount).toFixed(2);

    const checkDiscount = (code) => {
        if (code === "SAVE10") {
            setDiscountAmount(Number(subtotal) * 0.1);
            setShipping(subtotal > 50 ? 0 : 4.99);
            setStatusMessages("10% discount applied.");
            setError(false);
        } else if (code === "FREESHI") {
            setDiscountAmount(0);
            setShipping(0);
            setStatusMessages("FREESHI discount applied.");
            setError(false);
        } else {
            setDiscountAmount(0);
            setShipping(subtotal > 50 ? 0 : 4.99);
            setStatusMessages("Invalid discount code.");
            setError(true);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setDiscount(value);
        checkDiscount(value);
    };

    const handleAddQuantity = (id) => {
        addQuantity(id);
    };
    
    const handleSubQuantity = (id) => {
        subQuantity(id);
    };
    
    const handleDelete = (id) => {
        deleteItem(id);
    };

    return(
        <div className="main">
            <div>
                <h4 id="products-title">
                    <span role="img" aria-label="Cart emoji">🛒</span> Cart
                </h4>
            </div>
            <div className="cart flex-row">
                <div className="cart flex-col row-left">
                    <h6 className="subtitle">Order Items</h6>
                    {cart.length > 0 ? (
                        <div className="flex-col">
                        {cart.map((cartItem) => {
                            console.log(cartItem);
                            const productInfo = products.find(product => product.id === cartItem.id);
                            if (!productInfo) return null;

                            return (
                                <CartItem 
                                key={cartItem.id}
                                id={cartItem.id}
                                img={productInfo.img}
                                name={productInfo.name}
                                price={productInfo.price}
                                quantity={cartItem.quantity}
                                addQuantity={handleAddQuantity}
                                subQuantity={handleSubQuantity}
                                deleteItem={handleDelete}
                                />
                            );
                            })}
                        </div>
                    ) : (
                        <div>
                            <h6>Cart is empty.</h6>
                        </div>
                    )}

                </div>
                <div className="cart flex-col row-right">
                    <h6 className="subtitle">Order Details</h6>
                    <h6>Subtotal: ${subtotal.toFixed(2)}</h6>
                    <h6>Shipping: ${shipping.toFixed(2)}</h6>
                    <h6>Tax: ${tax.toFixed(2)}</h6>
                    <h6>Discount: ${discountAmount.toFixed(2)}</h6>
                    <div>
                        <label className="input" htmlFor="discount">Discount Code</label>
                        <input
                            type="text"
                            id="inputdiscount"
                            name="discount"
                            placeholder="i.e. SAVE15"
                            value={discount}
                            onChange={handleChange}
                            onBlur={() => checkDiscount(discount)}
                            className={error ? "error-border" : "good-border"}
                        />
                        {statusMessages && <p className="statusmsg"><i>{statusMessages}</i></p>}

                    </div>
                    <h6>Total: ${total}</h6>
                    <button className="btn btn-outline-dark" onClick={handleConfirmOrder}>Place Order</button>
                </div>
            </div>
        </div>
    );
}