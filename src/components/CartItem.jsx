import React from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from "react-router-dom";

export default function CartItem(props){
    return(
        <div className="flex-row">
            <Link className="link" to={`/products/${props.id}`} key={props.id}>
                <img className="cart img" src={props.img} alt={`Crochet ${props.name}`}/>
            </Link>
            <div className="item flex-row">
                <div>
                    <h6>{props.name}</h6>
                    <h6><b>{props.price}</b></h6>
                </div>
                <div className="flex-row">
                    <button className="btn small btn-outline-dark"
                    onClick={() => props.addQuantity(props.id)}
                    >+</button>
                    <input className="quantityin" type="number" value={props.quantity} readOnly/>
                    <button className="btn small btn-outline-dark"
                    onClick={() => props.subQuantity(props.id)}
                    >-</button>
                </div>
                <div>
                    <button className="btn small btn-outline-dark"
                    onClick={() => props.deleteItem(props.id)}
                    ><ClearIcon/></button>
                </div>
            </div>
        </div>
    );
}