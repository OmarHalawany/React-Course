import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import NavBar from "./navbar";
import ShoppingCart from "./ShoppingCart";
import Home from "./home";
import ProductDetails from "./productDetails";
import NotFound from "./NotFound";
import Login from "./login";
import Menu from "./Menu";
import Admin from "./Admin";
import ProductForm from "./productform";

class App extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    let { data } = await axios.get("http://localhost:3000/products/");
    this.setState({ products: data });
  }

  async componentDidUpdate() {
    let { data } = await axios.get("http://localhost:3000/products/");
    this.setState({ products: data });
  }

  deleteItem = async (prod) => {
    let oldProducts = [...this.state.products];

    let products = this.state.products.filter((p) => p.id !== prod.id);
    this.setState({ products });

    try {
      await axios.delete("http://localhost:3000/products/" + prod.id);
    } catch (ex) {
      toast.error("cant delete");
      this.setState({ products: oldProducts });
    }
  };

  resetCart = () => {
    let products = [...this.state.products];
    for (let i in products) {
      products[i] = { ...products[i] };
    }
    products = products.map((p) => {
      p.count = 0;
      return p;
    });

    this.setState({ products });
  };

  incrementHandler = (product) => {
    let products = [...this.state.products];
    let indx = products.indexOf(product);
    products[indx] = { ...products[indx] };

    products[indx].count++;
    this.setState({ products });
  };

  handleInCartChange = (prod) => {
    let products = [...this.state.products];
    let ind = products.indexOf(prod);
    products[ind] = { ...products[ind] };
    products[ind].isInCart = !products[ind].isInCart;
    this.setState({ products });
  };

  adminOnEdit = () => {
    console.log("edit");
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar
          productsCount={this.state.products.filter((p) => p.isInCart).length}
        />
        <div className="container-fluid">
          <Switch>
            <Route path="/productform/:type/:id?" component={ProductForm} />
            <Route
              path="/admin"
              render={(props) => (
                <Admin
                  {...props}
                  products={this.state.products}
                  onDelete={this.deleteItem}
                  onEdit={this.adminOnEdit}
                />
              )}
            />
            <Route path="/login" component={Login} />
            <Route path="/notfound" component={NotFound} />
            <Route
              path="/menu"
              render={(props) => (
                <Menu
                  {...props}
                  products={this.state.products}
                  handleInCartChange={this.handleInCartChange}
                />
              )}
            />
            <Route
              path="/cart"
              render={(props) => (
                <ShoppingCart
                  products={this.state.products.filter((p) => p.isInCart)}
                  incrementHandler={this.incrementHandler}
                  deleteItem={this.handleInCartChange}
                  resetCart={this.resetCart}
                  {...props}
                />
              )}
            />
            <Route
              path="/product/:id"
              render={(props) => (
                <ProductDetails products={this.state.products} {...props} />
              )}
            />

            <Route path="/home" component={Home} />
            <Redirect exact from="/" to="/home" />
            <Redirect to="/notfound" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
