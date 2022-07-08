import classes from "./checkout.module.css";
import { useRef, useState } from "react";

const isempty = (value) => value.trim() === "";
const isfivenumber = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [forminputvalidity, setforminputvalidity] = useState({
    name: true,
    street: true,
    city: true,
    pincode: true,
  });

  const nameinputref = useRef();
  const streetinputref = useRef();
  const pincodeinputref = useRef();
  const cityinputref = useRef();

  const confirmhandler = (event) => {
    event.preventDefault();

    const enteredname = nameinputref.current.value;
    const enteredstreet = streetinputref.current.value;
    const enteredcity = cityinputref.current.value;
    const enteredpincode = pincodeinputref.current.value;

    const enterednameisvalid = !isempty(enteredname);
    const enteredstreetisvalid = !isempty(enteredstreet);
    const enteredcityisvalid = !isempty(enteredcity);
    const enteredpincodeisvalid = isfivenumber(enteredpincode);

    setforminputvalidity({
      name: enterednameisvalid,
      street: enteredstreetisvalid,
      city: enteredcityisvalid,
      pincode: enteredpincodeisvalid,
    });

    const formisvalid =
      enterednameisvalid &&
      enteredstreetisvalid &&
      enteredcityisvalid &&
      enteredpincodeisvalid;

    if (!formisvalid) {
      return;
    }

    props.onconfirm({
      name: enteredname,
      street: enteredstreet,
      city: enteredcity,
      pincode: enteredpincode,
    });
  };

  return (
    <form onSubmit={confirmhandler}>
      <div
        className={`${classes.control} ${
          forminputvalidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Name : </label>
        <input type="text" id="name" ref={nameinputref} />
        {!forminputvalidity.name && <p>enter valid name</p>}
      </div>
      <div
        className={`${classes.control} ${
          forminputvalidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street : </label>
        <input type="text" id="street" ref={streetinputref} />
        {!forminputvalidity.street && <p>enter valid street</p>}
      </div>
      <div
        className={`${classes.control} ${
          forminputvalidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City : </label>
        <input type="text" id="city" ref={cityinputref} />
        {!forminputvalidity.city && <p>enter valid city</p>}
      </div>
      <div
        className={`${classes.control} ${
          forminputvalidity.pincode ? "" : classes.invalid
        }`}
      >
        <label htmlFor="pincode">Pin-Code : </label>
        <input type="number" id="pincode" ref={pincodeinputref} />
        {!forminputvalidity.pincode && <p>enter valid pincode</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Close
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
