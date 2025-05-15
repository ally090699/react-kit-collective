import React, {useContext} from "react";
import { Link } from "react-router-dom";
import products from "./lists/products";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { CartContext } from "./CartContext";

export default function ProductDetails(props){
    const { addToCart } = useContext(CartContext);

    const {id} = props.match.params;
    const product = products.find((p)=> p.id.toString() === id);
    if (!product) return <div>Product not found.</div>;

    return(
        <div className="main">
            <div className="flex-row">
                <div>
                    <img className="detail-image" src={product.img} alt={product.name} />
                </div>
                <div className="flex-col">
                    <div className="detail flex-row">
                        <div className="detail flex-col row-left">
                            <h5 className="detail-name">{product.name}</h5>
                            <h6 className="detail-code">Code: {product.pcode}</h6>
                        </div>
                        <div className="detail flex-col row-right">
                            <h6 className="detail-price">Price: ${product.price}</h6>
                            <h6 className="detail-rating">Rating: {product.averageRating} / 5</h6>
                        </div>
                    </div>
                    <div>
                        <p className="detail-desc">{product.desc}</p>
                    </div>
                </div>
            </div>
            
            <div className="buttons flex-row">
                <Link to="/products">
                    <button className="btn btn-outline-dark"><KeyboardBackspaceIcon/></button>
                </Link>
                <button className="btn btn-outline-dark"
                    onClick={(e) => {
                        e.preventDefault();
                        addToCart({
                            id: props.id
                        });
                    }}
                    ><AddShoppingCartIcon/>
                </button>
            </div>
        </div>
    );
}