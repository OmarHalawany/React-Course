import React, { Component } from "react";
import { Link } from "react-router-dom";

class Product extends Component {
  getClasses() {
    return this.props.product.count === 0
      ? "badge badge-warning m-1"
      : "badge badge-primary m-1";
  }

  render() {
    return (
      <div className="row">
        <div className="col-2">
          <span>
            <Link to={"/product/" + this.props.product.id}>
              {this.props.product.name}
            </Link>
          </span>
        </div>
        <div className="col">
          <span className={this.getClasses()}>{this.props.product.count}</span>
          <button
            onClick={() => this.props.incrementProduct(this.props.product)}
            className="btn btn-primary btn-sm m-1"
          >
            +
          </button>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => this.props.deleteItem(this.props.product)}
          >
            <i className="fas fa-trash m-1"></i>
          </span>
        </div>
      </div>
    );
  }
}

export default Product;
