import React, { Component } from "react";
import { Navbar } from "reactstrap";

class Header extends Component {
  render() {
    return (
      <Navbar color="light" className="d-flex justify-content-center">
        <h5>Assignment</h5>
      </Navbar>
    );
  }
}

export default Header;
