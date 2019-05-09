import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Modal, Button, NavDropdown, Alert } from "react-bootstrap";
import axios from "axios";
import Items from "./Items";
import Cart from "./cart";


class NavBar extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleCartShow = this.handleCartShow.bind(this);
    this.handleCartClose = this.handleCartClose.bind(this);
    this.submitLogout = this.submitLogout.bind(this);
    this.handleDeleteRow = this.handleDeleteRow.bind(this);
    this.postOrder = this.postOrder.bind(this);
   

    this.state = {
      showCart: false,
      showSucccess:false,
      cart:[],
      totalAmount:0.0,
      totalItems:0,
      isLogged:false,
      userName:"User",
      clickedId:0,
      userData:[]
    };
  }

  componentDidMount(){
    // Get saved data from sessionStorage
    let data = sessionStorage.getItem('isLogged');

    this.setState({
      isLogged:sessionStorage.getItem('isLogged'),
      userName:sessionStorage.getItem('userName'),
      cart:this.props.cart,
      totalAmount:this.props.totalAmount,
      totalItems:this.props.totalItems
    });
  }

  handleCartClose() {
    this.setState({ showCart: false });
  }

  handleCartShow() {
    this.setState({ showCart: true });
  }

  submitLogout(){
    sessionStorage.removeItem('isLogged');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userId');
    this.setState({ 
      isLogged:false,
      userName:"User",
      userData:[] 
    });
    window.location.reload();

  }

  handleDeleteRow() {
    this.setState({ 
      cart: this.props.cart,
      clickedId:sessionStorage.getItem('clickedId')
    },
    function(){
      console.log(this.state.clickedId);
      sessionStorage.setItem('clickedId',this.state.clickedId);
      this.props.handleDeleteRow();
      //sessionStorage.removeItem('clickedId');
    }
    );
    this.setState({
      cart: this.props.cart,
      totalItems: this.props.totalItems,
      totalAmount: this.props.totalAmount
    });
  }


  async postOrder(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    var userId=sessionStorage.getItem('userId');
    console.log(userId);
    const order={
      userId:userId,
      orderDate:today,
      subTotal:this.props.totalAmount.toFixed(2),
      orderDetail:this.props.cart
    }
    console.log(order);

    const response = await axios.post('http://localhost:5000/order/orders', (order))
      .then(response => { 
        
        this.setState({
          showCart:false,
          showSucccess:true,
        },
        function() {
          setTimeout(() => {
            this.setState({
              showSucccess: false
            });
            window.location.reload();
          }, 3500);
        });
      })
      .catch(error => {
        
      });
  }

  render() {
    return (
      <div>
      <Navbar bg="light" expand="lg">
        <Link className="navbar-brand" to="/">
          The Veggy Shop 
        </Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
        </div>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
            <a className="cart-icon" href="#" ref="cartButton" data-toggle="modal" data-target="#exampleModal">
              <img
                width="100%"
                src="/black-shopping-cart.png"
                alt="Cart"
                onClick={this.handleCartShow}
              />
            </a>
            <Modal show={this.state.showCart} onHide={this.handleCartClose}>
            <Modal.Header closeButton>
              <Modal.Title>CART</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Cart 
              cartItem={this.props.cart} subTotal={this.props.totalAmount}
              deleteRowFromCart={() => this.handleDeleteRow()}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCartClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.postOrder.bind()} disabled={!this.state.isLogged}>
                Proceed To Checkout
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.showSucccess} onHide={this.handleClose}>
          <Alert  variant="success" dismissible>
              Order Successfully Added
            </Alert>
          </Modal>
            </li>
            <tr>
            <th>
              <td>No. of items</td>
              <td>:</td>
              <td>
                <strong>{this.props.totalItems}</strong>
              </td>
            </th>
            <tr>
            <th>
              <td className="blue">Sub Total</td>
              <td>:</td>
              <td>
                <strong>Rs. {this.props.totalAmount.toFixed(2)}</strong>
              </td>
            </th>
            </tr>
            </tr>
            {/* <Nav.Link href="/login">{!this.state.isLogged ? "Login" : this.state.userName}</Nav.Link> */}
            <NavDropdown title={!this.props.isLogged && !this.state.isLogged ? "User" : this.state.userName || this.props.userName} id="basic-nav-dropdown">
              <NavDropdown.Item href="/login">My Account</NavDropdown.Item>
              <NavDropdown.Item href="/">My Orders</NavDropdown.Item>
              <NavDropdown.Item onClick={this.submitLogout.bind()}>Logout</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/register" >{!this.state.isLogged ? "Sign Up" : ""}</Nav.Link>
          </ul>
        
        
        {/* <div className="box">
          <div className="box">
                <table>
                  <tbody>
                    <tr>
                    <th>
                    <a
                        className="cart-icon"
                        href="#"
                        ref="cartButton"
                      >
                        <img
                          src="/cart-59-32.png"
                          alt="Cart"
                        />
                    </a>
                    </th>
                    <tr>
                    <th>
                      <td>No. of items</td>
                      <td>:</td>
                      <td>
                        <strong>{this.props.totalItems}</strong>
                      </td>
                    </th>
                    </tr>
                    <tr>
                    <th>
                      <td className="blue">Sub Total</td>
                      <td>:</td>
                      <td>
                        <strong>Rs. {parseFloat(this.props.totalAmount)}</strong>
                      </td>
                    </th>
                    <div className="center-boader">
                    <tr>
                      <th>
                      <Link className="navbar-brand" to="/login">
                        <u>LOGIN</u>
                      </Link>
                      </th>
                      <th>
                      <Link className="navbar-brand" to="/register">
                      <u>SIGN UP</u>
                      </Link>
                      </th>
                      </tr>
                      </div>
                    </tr>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div> */}
      </Navbar>
      </div>
    );
  }
}

export default NavBar;
