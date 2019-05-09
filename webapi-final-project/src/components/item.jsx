import React, { Component } from "react";
import { Card, Button, NavDropdown } from "react-bootstrap";

import NavBar from "./navBar";

class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {},
      quickViewProdcut: {},
      isAdded: false,
      totalItems: 0,
      totalAmount: 0.0,
      isLogged:false
    };
  }

  addToCart(image, name, price, id, quantity) {
    this.setState(
      {
        selectedProduct: {
          image: image,
          name: name,
          price: price,
          id: id,
          quantity: quantity
        }
      },
      function() {
        this.props.sumTotalItems(this.selectedProduct);
      }
    );
    this.setState(
      {
        isAdded: true
      },
      function() {
        setTimeout(() => {
          this.setState({
            isAdded: false,
            selectedProduct: {}
          });
        }, 3500);
      }
    );
  }

  quickView(image, name, price, id) {
    this.setState(
      {
        quickViewProdcut: {
          image: image,
          name: name,
          price: price,
          id: id
        }
      },
      function() {
        this.props.openModal(this.state.quickViewProdcut);
      }
    );
  }

  render() {
    let image = this.props.image;
    let name = this.props.name;
    let price = this.props.price;
    let id = this.props.id;
    let quantity = this.props.quantity;
    return (

      <Card style={{ width: '11rem', height: '23rem'}}>
      <Card.Img variant="top" src={this.props.item.image} />
      <Card.Body>
        <Card.Title>{this.props.item.name}</Card.Title>
        <Card.Text>
          Rs. {this.props.item.price}
        </Card.Text>
        <Button
            type="button"
            className="btn btn-info"
            disabled={this.state.isLogged}
            // className={this.state.isLogged ? "" : "disabled"}
            onClick={this.addToCart.bind(
              this,
              image,
              name,
              price,
              id,
              quantity
            )}
            totalItems={this.state.totalItems}
            totalAmount={this.state.totalAmount}
          >
           {!this.state.isAdded ? "ADD TO CART" : "✔ ADDED"}
          </Button>
          <div>
            <p>Added : {this.props.item.quantity} </p>
          </div>
      </Card.Body>
    </Card>
    );
  }
}
export default Item;
