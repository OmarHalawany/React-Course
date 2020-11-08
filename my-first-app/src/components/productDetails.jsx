import React, { Component } from "react";

class ProductDetails extends Component {
  save = () => {
    //backend ==> save
    this.state.history.replace("/cart");
  };

  render() {
    const id = parseInt(this.props.match.params.id);
    let product = { ...this.props.products.filter((p) => p.id === id)[0] };

    return (
      <React.Fragment>
        <h1>Product No. {product.id}</h1>
        <h2>{product.name}</h2>
        <h2>Count in shopping cart: {product.count}</h2>
        <button onClick={this.save} className="btn btn-primary btn-sm">
          Save
        </button>
      </React.Fragment>
    );
  }
}

export default ProductDetails;
