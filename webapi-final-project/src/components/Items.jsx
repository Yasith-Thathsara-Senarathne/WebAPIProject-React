import React, { Component } from "react";
import axios from "axios";
import { Card, Carousel } from "react-bootstrap";

import Item from "../components/item";
import NavBar from "../components/navBar";

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: [],
      cart: [],
      selectedProduct: {},
      quickViewProdcut: {},
      isAdded: false,
      totalItems: 0,
      totalAmount: 0.0,
      quantity: 1,
      userName:"User",
      isLogged:false
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
    this.handleDeleteRow = this.handleDeleteRow.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get("http://localhost:5000/item/items");
    let itemsArray = response.data.map(item => {
      return {
        id: item._id,
        image: item.image,
        name: item.name,
        price: item.price,
        category: item.category,
        quantity:item.quantity
      };
    });
    console.log(itemsArray);
    this.setState({ allItems: itemsArray });
  }

  handleDeleteRow() {
    let clickedId = sessionStorage.getItem('clickedId')
    let rows = this.state.cart;
    rows.splice(clickedId, 1)
    this.setState({ 
      cart: rows
    });
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }

  render() {
    return (

      <div>
      <NavBar
        totalItems={this.state.totalItems}
        totalAmount={this.state.totalAmount}
        cart={this.state.cart}
        userName={this.state.userName}
        isLogged={this.state.isLogged}
        handleDeleteRow={()=> this.handleDeleteRow()}
        />

        {/* <div>
        <Carousel
        
        onSelect={this.handleSelect}
        >
        <Carousel.Item>
        <Card>
        <Card.Img src="https://static-01.daraz.lk/original/76695809f6f8da7f780e4edd46f2ac80.jpg_200x200q75.jpg_.webp" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Second slide&bg=282c34"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Third slide&bg=20232a"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
        </div> */}

      <div className="container">
        <div className="row">
          {this.state.allItems.map(item => (
            <div className="col-sm" key={item.id}>
              <Item
                key={item.id}
                item={item}
                sumTotalItems={() => this.handleAddToCart(item)}
              />
            </div>
          ))}
        </div>
      </div>
      </div>
    );
  }

  

  handleAddToCart(selectedProducts) {
    
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    console.log(productID);
    //let productQty = selectedProducts.quantity;
    if (this.checkProduct(productID)) {
      console.log("hi");
      let index = cartItem.findIndex(x => x.id == productID);
      cartItem[index].quantity =
        Number(cartItem[index].quantity) + Number(1);
      this.setState({
        cart: cartItem
      });
    } else {
      selectedProducts.quantity = 1;
      cartItem.push(selectedProducts);
    }
    this.setState({
      cart: cartItem,
      cartBounce: true
    });
    setTimeout(
      function() {
        this.setState({
          cartBounce: false,
          quantity: 1
        });
        console.log(this.state.quantity);
        console.log(this.state.cart);
      }.bind(this),
      1000
    );
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    // Save data to sessionStorage
    sessionStorage.removeItem('cart');
    sessionStorage.removeItem('totalItems');
    sessionStorage.removeItem('totalAmount');
    sessionStorage.setItem('cart', JSON.stringify(this.state.cart));
    sessionStorage.setItem('totalItems', this.state.totalItems);
    sessionStorage.setItem('totalAmount', this.state.totalAmount);
  }

  sumTotalItems() {
    let total = 0;
    let cart = this.state.cart;
    total = cart.length;
    this.setState({
      totalItems: total
    });
  }

  sumTotalAmount() {
    let total = 0;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].price * parseInt(cart[i].quantity);
    }
    this.setState({
      totalAmount: 0,
      totalAmount: total
    });
  }

  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function(item) {
      return item.id === productID;
    });
  }

}

export default Items;
