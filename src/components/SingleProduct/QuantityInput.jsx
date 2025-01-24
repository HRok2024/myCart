import React from "react";
import "./QuantityInput.css";

const QuantityInput = ({
  quantity,
  setQuantity,
  stock,
  cartPage,
  productId,
}) => {
  return (
    <>
      <button
        onClick={() =>
          cartPage
            ? setQuantity("decrease", productId)
            : setQuantity((prev) => prev - 1)
        }
        className="quantity_input_button"
        disabled={quantity <= 1 ? true : false}
      >
        {" "}
        -{" "}
      </button>
      <p className="quantity_input_count">{quantity}</p>
      <button
        onClick={() =>
          cartPage
            ? setQuantity("increase", productId)
            : setQuantity((prev) => prev + 1)
        }
        className="quantity_input_button"
        disabled={quantity >= stock ? true : false}
      >
        {" "}
        +{" "}
      </button>
    </>
  );
};

export default QuantityInput;
