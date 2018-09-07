import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = props => {
  return (
    <header className="App-header">
      <Link to="/">Home</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/cart">Cart {props.cart.cart.length}</Link>
      <a href={process.env.REACT_APP_LOGIN}>Login</a>
    </header>
  );
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Header);
