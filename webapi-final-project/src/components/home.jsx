import React, { Component } from "react";
import { Link } from "react-router-dom";

import NavBar from "./navBar";
import Items from "./Items";

class Home extends Component {
  render() {
    return (
      <div>
      <body>
        <Items></Items>
      </body>
      </div>
    );
  }
}

export default Home;