import Button from "./FunctionButton";

export default function InputField({
  label,
  type = "text",
  id = "task-entry",
  name = "task-entry",
  value,
  placeholder = "Please input a task...",
  onChange,
  required = false,
  buttonText,
}) {
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
