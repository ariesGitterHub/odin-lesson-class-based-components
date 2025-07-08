import { useState, useEffect } from "react";
import Button from "./Button";
import InputField from "./InputField";

const FunctionalInput = ({ name }) => {
  const [todos, setTodos] = useState(["Just some demo tasks", "As an example"]);
  const [inputVal, setInputVal] = useState("");
  const [count, setCount] = useState(0);
  const [showForm, setShowForm] = useState(null);

  useEffect(() => {
    const countTasks = todos.length;
    setCount(countTasks);
  }, [todos]);

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((prevTodos) => [...prevTodos, inputVal]);
    setInputVal("");
  };

  const handleDelete = (todoToDelete) => {
    const updatedTasks = todos.filter((todo) => todo !== todoToDelete);
    setTodos(updatedTasks);
  };

  const handleToggle = (todo) => {
    setShowForm(todo);
  };

  return (
    <section className="functional-section">
      <h2>Functional Input</h2>
      <h3>{name}</h3>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="task-entry">Enter a task &nbsp;</label>
        <input
          type="text"
          id="task-entry"
          name="task-entry"
          value={inputVal}
          placeholder="Please input a task..."
          onChange={handleInputChange}
        /> */}
        <InputField
          label="Enter a task &nbsp;"
          value={inputVal}
          onChange={handleInputChange}
          buttonText="Submit"
        />
      </form>
      <h4>You currently have {count} tasks</h4>
      <ul>
        {todos.map((todo) => (
          <div className="todo-container" key={todo}>
            <div>
              <li>{todo}</li>
              <div className="button-container">
                <Button type="button" onClick={() => handleDelete(todo)}>
                  Delete
                </Button>
                <Button type="button" onClick={() => handleToggle(todo)}>
                  Edit
                </Button>
              </div>
            </div>
            <div className="visible edit">
              <InputField
                value={todo}
                onChange={handleInputChange}
                buttonText="Resubmit"
              />
            </div>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default FunctionalInput;
