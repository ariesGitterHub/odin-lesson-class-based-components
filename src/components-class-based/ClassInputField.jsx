import React, { Component } from "react";
import Button from "./ClassButton";

class InputField extends Component {
  render() {
    const {
      label,
      type,
      id,
      name,
      value,
      placeholder,
      onChange,
      required,
      buttonText,
    } = this.props;

    return (
      <div className="input-field-container">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          autoFocus
        />
        <div className="button-container">
          <Button type="submit">{buttonText}</Button>
        </div>
      </div>
    );
  }
}

// Set default props for the class component
//NOTE: that in a class-based component, it's typically done using the defaultProps property instead of destructuring default values inside the render method. Also NOTE, that in ClassButton.jsx, that it is don teh other way via destructuring
InputField.defaultProps = {
  type: "text",
  id: "task-entry",
  name: "task-entry",
  placeholder: "Please input a task...",
  required: false,
};

export default InputField;
