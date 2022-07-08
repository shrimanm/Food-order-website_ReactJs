import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [formenable, setformenable] = useState(false);
  const [issubmitting, setissubmitting] = useState(false);
  const [didsubmit, setdidsubmit] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const formhandler = () => {
    setformenable(true);
  };

  const submithandler = async (userdata) => {
    setissubmitting(true);
    await fetch(
      "https://food-order-app-dda73-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userdata,
          ordereditems: cartCtx.items,
        }),
      }
    );
    setissubmitting(false);
    setdidsubmit(true);
    cartCtx.clearCart();
  };
  const modalaction = (
    <React.Fragment>
      {!formenable && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={formhandler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartmodalcontent = (
    <React.Fragment>
      {!formenable && cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {formenable && (
        <section>
          <Checkout onconfirm={submithandler} onCancel={props.onClose} />
        </section>
      )}
      {modalaction}
    </React.Fragment>
  );

  const issubmittingmodalcontent = <p>sending order data...</p>;

  const didsubmitmodalcontent = <p>successfully sent the order....</p>;

  return (
    <Modal onClose={props.onClose}>
      {!issubmitting && !didsubmit && cartmodalcontent}
      {issubmitting && issubmittingmodalcontent}
      {!issubmitting && didsubmit && didsubmitmodalcontent}
    </Modal>
  );
};

export default Cart;
