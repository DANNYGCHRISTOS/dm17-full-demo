import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProducts } from '../../ducks/productReducer';
import { addToCart, getCart } from '../../ducks/cartReducer';

import Loader from '../Loader/Loader';
import ProductCard from '../ProductCard/ProductCard';

class Shop extends Component {
  componentDidMount() {
    this.props.getProducts();
    this.props.getCart();
  }
  render() {
    return (
      <div>
        <Loader isLoading={this.props.isLoading} />
        <h1 style={{ fontFamily: 'cursive', fontSize: '100px' }}>
          Ye Olde Shoppe
        </h1>
        <div
          className="card-container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}
        >
          {this.props.product.products[0] ? (
            this.props.product.products.map(product => (
              <ProductCard product={product} addToCart={this.props.addToCart} />
            ))
          ) : (
            <h1>No Products</h1>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getProducts, addToCart, getCart }
)(Shop);
