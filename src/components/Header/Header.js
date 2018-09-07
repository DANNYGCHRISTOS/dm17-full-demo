import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCart } from '../../ducks/cartReducer';
import { getUser } from '../../ducks/userReducer';
// HEADER IS CONNECTED, WILL PULL DATA TO SHOW ON PAGE LOAD
class Header extends React.Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getCart();
  }

  render() {
    const { REACT_APP_LOGIN, REACT_APP_LOGOUT } = process.env;
    return (
      <header className="App-header">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart {this.props.cart.cart.length}</Link>
        {this.props.user.user.user_name ? (
          <div>
            <a href={REACT_APP_LOGOUT}>Logout</a>
            <p>Welcome, {this.props.user.user.user_name}</p>
          </div>
        ) : (
          <div>
            <a href={REACT_APP_LOGIN}>Login</a>
          </div>
        )}
      </header>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getCart, getUser }
)(Header);
