import React from "react";

const Btn = props => {
  const { children, type = "button" } = props || {};

  return (
    <button {...props} type={type}>
      {children}
    </button>
  );
};

export default Btn;
