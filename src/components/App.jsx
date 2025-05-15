import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Homepage from "./Homepage";
import About from "./About";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Login from "./Login";
import Contact from "./Contact";
import ThankYou from "./ThankYou";
import Error from "./Error";
import "../styles.css";
import { CartProvider } from "./CartContext";
import OrderConfirm from "./OrderConfirm";
import { OrderProvider } from "./OrderContext";

export default function App() {
  function backToTop(event){
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  }
  
  return (
    <CartProvider>
      <OrderProvider>
        <Router basename="/kitCollective">
          <div className="content-wrapper">
            <Header />
            <div className="main-content">
              <Switch>
                <Route exact path="/" component={Homepage} />
                <Route path="/about" component={About} />
                <Route path="/products/:id" component={ProductDetails}/>
                <Route path="/products" component={Products} />
                <Route path="/cart" component={Cart} />
                <Route path="/login" component={Login} />
                <Route path="/contact" component={Contact} />
                <Route path="/thankyou" component={ThankYou} />
                <Route path="/orderconfirm" component={OrderConfirm} />
                <Route path="/error" component={Error} />
              </Switch>
            </div>
            <button onClick={backToTop} id="backToTopBtn" title="Back to Top">↑</button>
            <Footer />
          </div>
        </Router>
      </OrderProvider>
    </CartProvider>
  );
}
