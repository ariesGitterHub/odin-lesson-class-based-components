import React, { Component } from "react";
import styles from "../styles/Button.module.css";

class Button extends Component {
  render() {
    // This destructuring below is also acceptable, contrast with ClassInputField.jsx code example
    const { variant = "default", type, children, ...rest } = this.props;

    return (
      <button
        type={type}
        className={`${styles.button} ${styles[variant]}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
}

export default Button;
