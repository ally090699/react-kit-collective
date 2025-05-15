import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function Card(props){
    const { addToCart } = useContext(CartContext);
    

    return(
        <div id={props.id} className="card product inner">
            <img className="card-img-top" src={props.img} alt={`Crochet ${props.name}`}/>
            <div className="card-body">
                <h6 className="card-title">{props.name}</h6>
                <div className="flex">
                    <h6 className="card-price"><b>{props.price}</b></h6>
                    <div className="add-to-cart">
                        <button className="btn btn-outline-dark"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart({
                                id: props.id 
                            });
                        }}
                        ><AddShoppingCartIcon/></button>
                    </div>
                </div>
            </div>
        </div>
    );
}