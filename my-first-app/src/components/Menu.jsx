import React from "react";
import MenuCart from "./MenuCart";

const Menu = (props) => {
  return (
    <React.Fragment>
      <h1>Menu</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <MenuCart
                  handleInCartChange={props.handleInCartChange}
                  product={product}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Menu;
