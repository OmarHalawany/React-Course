import React from "react";

const MenuCart = (props) => {
  let style = !props.product.isInCart
    ? { color: "#80808080", cursor: "pointer" }
    : { cursor: "pointer" };

  return (
    <i
      style={style}
      onClick={() => props.handleInCartChange(props.product)}
      className="fas fa-cart-plus"
    ></i>
  );
};

export default MenuCart;
