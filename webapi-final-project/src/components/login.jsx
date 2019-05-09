import React, { Component } from "react";
import { Form, Spinner } from "react-bootstrap";
import axios from "axios";

import NavBarWithoutCart from "../components/navBarWithoutCart";
import NavBar from "../components/navBar";

class Login extends Component  {

    constructor(props) {
      super(props);
      this.state = {
        cart: [],
        totalItems: 0,
        totalAmount: 0.0,
        userData:[],
        userName:"User",
        isLogged:false,
        emailEmpty:true,
        passwordEmpty:false,
        passwordError:false,
        passwordErrorMessage:"Please Enter Password",
        errorMessage:"",
        loginLoader:false
      };
      this.submitLogin = this.submitLogin.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }


    componentDidMount(){
      // Get saved data from sessionStorage
      let data = sessionStorage.getItem('isLogged');
  
      this.setState({
        isLogged:sessionStorage.getItem('isLogged'),
        userName:sessionStorage.getItem('userName'),
        // cart:sessionStorage.getItem('cart'),
        // totalItems:sessionStorage.getItem('totalItems'),
        // totalAmount:sessionStorage.getItem('totalAmount')
      });
    }
  
    async submitLogin(event) {

      this.setState({
        loginLoader:true
      });

      var email = this.refs.email.value;
      var password = this.refs.password.value;

      // do stuff
      console.log('Email:', email);
      console.log('Password:', password);
      const body={
        local:{
          email:email,
          password:password,
        },
        method:"local"
      };
      const response = await axios.post('http://localhost:5000/user/login', (body))
      .then(response => { 
        
        let userData = response.data.userData;
        let userId = response.data.userData.userId;
        this.setState({
          userName:userData.username,
          isLogged:true,
          userData:userData
        });
        // Save data to sessionStorage
        sessionStorage.setItem('isLogged', this.state.isLogged);
        sessionStorage.setItem('userName', this.state.userName);
        sessionStorage.setItem('userId', userId);
        console.log(this.state.userName);
        this.setState({
          loginLoader:false
        });
        //this.props.history.push(`/`);
      })
      //this.context.router.push('/')
      .catch(error => {
        this.setState({
          loginLoader:false
        });
        console.log(error.response.data.errorMessage)
          this.setState({
            passwordError:true,
            errorMessage:error.response.data.errorMessage
          });
      });
    }


    handleEmailChange (e) {
      var email = e.target.value;
      if(email.length == 0)
      {
        this.setState({
          emailEmpty:true,
          passwordEmpty:false
        })
      }
      else
      {
        this.setState({
          emailEmpty:false,
          passwordEmpty:true
        })
      }
    }

    handlePasswordChange (e) {
      var password = e.target.value;
      if(password.length == 0)
      {
        this.setState({
          passwordErrorMessage:"Please Enter Password",
          passwordEmpty:true
        })
      }
      else if(password.length < 6)
      {
        this.setState({
          passwordErrorMessage:"Password must be more than 6 characters",
          passwordEmpty:true
        })
      }
      else
      {
        this.setState({
          passwordEmpty:false
        })
      }
    }
  
    render() {
      return (
        <div className="box">
          <NavBar
            totalItems={this.state.totalItems}
            totalAmount={this.state.totalAmount}
            cart={this.state.cart}
            userName={this.state.userName}
            isLogged={this.state.isLogged}
          />  
          
          <Form hidden={this.state.isLogged}>
          <div className="row d-flex justify-content-center">
                <div className="col-xl-4 col-lg-4 col-md-4 col-div">
                    <form >
                        <div class="card-body">
                          <h5 class="card-title">Login</h5>
                          <div class="form-group">
                          <label for="email">Email *</label>
                          <input type="text" class="form-control" id="email" placeholder="Email Address" name="email" ref="email" onChange={this.handleEmailChange}/>
                          <span style={{ color: 'red' }}>{this.state.emailEmpty ? "Please Enter Email Address" : ""}</span>
                          </div>
                          <div class="form-group">
                          <label for="email">Password *</label>
                          <input type="password" class="form-control" id="password" placeholder="Password" name="password" ref="password" onChange={this.handlePasswordChange}/>
                          <span style={{ color: 'red' }}>{this.state.passwordEmpty ? this.state.passwordErrorMessage : ""}</span>
                          </div>
                          <span style={{ color: 'red' }}>{this.state.passwordError ? this.state.errorMessage : ""}</span>
                          <div>
                          <button type="submit" class="btn btn-primary" 
                          onClick={this.submitLogin.bind()} >Login</button>
                          <span>
                          {this.state.loginLoader ? <Spinner animation="border"/> : ""}
                          </span>
                          </div>
                          </div>
                  </form>
                  </div>
              </div>
              </Form>
              <Form>
                <div className="row d-flex justify-content-center">
                  <div className="col-xl-4 col-lg-4 col-md-4 col-div">
                  <h5 class="card-title">{this.state.userName}' Account</h5>
                  </div>
                </div>
              </Form>
          </div>
        

      );
    }
  };

  export default Login;