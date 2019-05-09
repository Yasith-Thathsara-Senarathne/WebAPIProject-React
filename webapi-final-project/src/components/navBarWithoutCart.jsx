import React, { Component } from "react";
import { Link } from "react-router-dom";


class NavBarWithoutCart extends Component {
  render() {
    return (
      <div>
      <nav className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          The Veggy Shop 
        </Link>
        
        <div className="box">
          <div className="box">
                <table>
                  <tbody>
                    <tr>
                    <tr>
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
            <table>
              
            </table>
        </div>
      </nav>
      </div>
    );
  }
}

export default NavBarWithoutCart;
