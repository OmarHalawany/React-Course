import React, { Component } from "react";
import Product from "./Product";

class ShoppingCart extends Component {
  render() {
    const { products, resetCart, deleteItem, incrementHandler } = this.props;
    return (
      <React.Fragment>
        <h1>Shopping Cart</h1>
        <button onClick={resetCart} className="btn btn-secondary btn-sm">
          Reset
        </button>
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            deleteItem={deleteItem}
            incrementProduct={incrementHandler}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default ShoppingCart;
