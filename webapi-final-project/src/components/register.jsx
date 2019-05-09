import React, { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";

import NavBar from "../components/navBar";

class Register extends Component  {
    constructor(props) {
        super(props);
        this.state = {
          totalAmount:0,
          totalItems:0
        };
      }

render() {
      return (
        <div>
        <NavBar
          totalItems={this.state.totalItems}
          totalAmount={this.state.totalAmount}
        />
        <div className="row d-flex justify-content-center">
        <div className="col-xl-4 col-lg-4 col-md-4 col-div">
        <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter FirstName" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Last Name" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridUserName">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter UserName" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control placeholder="Phone Number" maxLength="10" />
              </Form.Group>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            </div>
            </div>
        </div>

      );
    }
  };

  export default Register;