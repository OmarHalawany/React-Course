import React, { Component } from "react";
import axios from "axios";

class ProductForm extends Component {
  state = {
    name: "",
    price: "",
    id: "",
  };

  async componentDidMount() {
    let type = this.props.match.params.type;
    if (type === "edit") {
      let id = this.props.match.params.id;
      let { data } = await axios.get("http://localhost:3000/products/" + id);
      let state = { ...this.state };
      state.name = data.name;
      state.price = data.price;
      state.id = data.id;
      this.setState(state);
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.props.match.params.type === "new") {
      //Add
      let newProduct = { ...this.state, count: 0, isInCart: false };
      await axios.post("http://localhost:3000/products", newProduct);
    } else {
      //Edit
      let newProduct = { ...this.state, count: 0, isInCart: false };
      delete newProduct.id;
      await axios.put(
        "http://localhost:3000/products/" + this.state.id,
        newProduct
      );
    }
    this.props.history.replace("/admin");
  };
  handleChange = (e) => {
    let state = { ...this.state };
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  };
  render() {
    return (
      <React.Fragment>
        <h1>{this.state.type} product</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
              className="form-control"
              id="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              value={this.state.price}
              onChange={this.handleChange}
              name="price"
              className="form-control"
              id="price"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default ProductForm;
