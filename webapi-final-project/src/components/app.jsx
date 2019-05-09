import React, { Component } from "react";
import { Route } from "react-router-dom";
import NavBar from "./navBar";
import Login from "../components/login";
import Register from "../components/register";
import Home from "../components/home";
import Items from "./Items";
import Footer from "./footer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      term: "",
      category: "",
      cartBounce: false,
      quantity: 1,
      quickViewProduct: {},
      modalActive: false
    };
  }


  render() {
    return (
      <div>
        
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        {/* <Footer/> */}
          
        
      </div>
    );
  }
}

export default App;