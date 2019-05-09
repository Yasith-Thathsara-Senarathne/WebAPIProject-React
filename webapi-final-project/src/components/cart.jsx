import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Table } from "react-bootstrap";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state ={
        cartItem:[],
        subTotal:0.00,
        clickedId:0,
        clickedItemId:0,
        clickedName:""
    }
    
    this.deleteRowFromCart = this.deleteRowFromCart.bind(this);

  }

  componentDidMount(){

    this.setState({
      cartItem:this.props.cartItem,
      subTotal:this.props.subTotal
    });
  }
  
  deleteRowFromCart(key) {
    
    // 
    //console.log(key);
    this.setState({
      
    },
    function()
    {
      sessionStorage.setItem('clickedId',key);
      this.props.deleteRowFromCart(this.key);
    }
    );

    this.setState({
      cartItem:this.props.cartItem,
      subTotal:this.props.subTotal
    });
}

  render() {
    return (
        <Table  striped bordered hover size="sm">
        <thead>
            <tr>
              <th>#</th>  
              <th>Item Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Line Total</th>
            </tr>
        </thead>
        <tbody>{this.state.cartItem.map(function(item, key) {
             
             return (
                 
                <tr id = {key} key = {key}>
                    <td>{key+1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity * item.price}</td>
                    <button onClick={this.deleteRowFromCart.bind(this,key)} 
                    {...this.state.clickedId= key}
                    {...this.state.clickedItemId=item.id}
                    {...this.state.clickedItemName=item.name} 
                    >X</button>
                </tr>
              );
           
           }.bind(this))}</tbody>
           <tr>
            <th>Sub Total</th>
            <th></th>
            <th></th>
            <th></th>
            <th>Rs. {this.props.subTotal.toFixed(2)}</th>
            </tr>
      </Table>
    );
  }
}

export default Cart;