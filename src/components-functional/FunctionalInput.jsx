import { useState, useEffect } from "react";
import Button from "./FunctionButton";
import InputField from "./FunctionInputField";

const FunctionalInput = ({ name }) => {
  const [todos, setTodos] = useState(["Example 1, take out the trash", "Example 2, do the laundry"]);
  const [inputVal, setInputVal] = useState("");
  const [count, setCount] = useState(0);
  const [showForm, setShowForm] = useState(null);
  const [editInputVal, setEditInputVal] = useState(""); // holds current edit value

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
    setShowForm(todo); // this identifies which todo is being edited
    setEditInputVal(todo); // preload the existing todo value into input
  };

  const handleEditSubmit = (e, originalTodo) => {
    e.preventDefault();
    const updatedTodos = todos.map((todo) =>
      todo === originalTodo ? editInputVal : todo
    );
    setTodos(updatedTodos);
    setShowForm(null); // close edit form
  };

  return (
    <section className="functional-section">
      <h2>{name}</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Enter a new task &nbsp;"
          value={inputVal}
          onChange={handleInputChange}
          buttonText="Submit"
        />
      </form>
      <h3>Current tasks: {count}</h3>
      <ul>
        {todos.map((todo) => (
          <div className="todo-container-functional" key={todo}>
            {showForm !== todo && (
              <>
                <li>{todo}</li>
                <div className="button-container">
                  <Button type="button" onClick={() => handleDelete(todo)}>
                    Delete
                  </Button>
                  <Button type="button" onClick={() => handleToggle(todo)}>
                    Edit
                  </Button>
                </div>
              </>
            )}
            {/* Only show input if this todo is being edited */}
            {showForm === todo && (
              <form onSubmit={(e) => handleEditSubmit(e, todo)}>
                <InputField
                  label="Edit task &nbsp;"
                  value={editInputVal}
                  onChange={(e) => setEditInputVal(e.target.value)}
                  buttonText="Resubmit"
                />
              </form>
            )}
          </div>
        ))}
      </ul>
    </section>
  );
};

export default FunctionalInput;
