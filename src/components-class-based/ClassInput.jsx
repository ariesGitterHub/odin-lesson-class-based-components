import { Component } from "react";
import { render } from "react-dom"; // deprecated by needed it this to run it
import Button from "./ClassButton";
import InputField from "./ClassInputField";

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ["Just some demo tasks", "As an example"],
      inputVal: "",
      count: 0,
      showForm: null,
      editInputVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    // this.setEditInputVal = this.setEditInputVal.bind(this); // Bind this method for editing
  }

  // Below, this is equivalent to a useEffect hook.
  // The componentDidUpdate lifecycle method works like useEffect
  // NOTE: Lifecycle methods such as componentDidUpdate, componentDidMount, componentWillUnmount, and others are already automatically bound to the component instance. You do not need to use .bind(this) on them

  componentDidUpdate(prevProps, prevState) {
    // Check if the todos array has changed
    if (prevState.todos !== this.state.todos) {
      const countTasks = this.state.todos.length;
      this.setState({ count: countTasks });
    }
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: "",
    }));
  }

  handleDelete(todoToDelete) {
    const updatedTasks = this.state.todos.filter(
      (todo) => todo !== todoToDelete
    );
    this.setState({ todos: updatedTasks });
  }

  //Reminder that below can be written as such.
  handleToggle(todo) {
    this.setState({
      showForm: todo,
      editInputVal: todo,
    });
  }

  // Or, like this...The only difference here is the way the method is defined. The above way is a regular method instead of an arrow function.
  // handleToggle = (todo) => {
  //   this.setState({
  //     showForm: todo,
  //     editInputVal: todo,
  //   });
  // };

  // Key difference:
  // Arrow function (handleToggle = (todo) => { ... }): Automatically binds the method to the class instance (this), meaning you don’t need to explicitly bind it in the constructor.

  // Regular method (handleToggle(todo) { ... }): You'll need to bind this method manually in the constructor (see far above)  if you're going to use it as an event handler or pass it around.

  // Key takeaway: Arrow functions are automatically bound, no need for bind() in the constructor. Regular functions require manual binding in the constructor for this to work correctly.

  handleEditSubmit(e, originalTodo) {
    e.preventDefault();
    const updatedTodos = this.state.todos.map((todo) =>
      todo === originalTodo ? this.state.editInputVal : todo
    );
    this.setState({ todos: updatedTodos, showForm: null, editInputVal: "" }); // Clear input after submitting
  }


  render() {
    return (
      <section className="class-based-section">
        <h2>Class-based Input</h2>
        {/* Notice how the props get provided by this, unlike the FunctionalInput */}
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          {/* <label htmlFor="task-entry">Enter a task: </label> */}
          {/* <input
            type="text"
            id="task-entry"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          /> */}
          {/* <button type="submit">Submit</button> */}
          <InputField
            label="Enter a new task &nbsp;"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
            buttonText="Submit"
          />
        </form>
        {/* <h4>All the tasks!</h4> */}
        <h4>Current tasks: {this.state.count}</h4>
        {/* <ul>
          {this.state.todos.map((todo) => (
            <li key={todo}>{todo}</li>
          ))}
        </ul> */}
        <ul>
          {this.state.todos.map((todo) => (
            <div className="todo-container-class-based" key={todo}>
              {this.state.showForm !== todo && (
                <>
                  <li>{todo}</li>
                  <div className="button-container">
                    <Button
                      type="button"
                      onClick={() => this.handleDelete(todo)}
                    >
                      Delete
                    </Button>
                    <Button
                      type="button"
                      onClick={() => this.handleToggle(todo)}
                    >
                      Edit
                    </Button>
                  </div>
                </>
              )}
              {/* Only show input if this todo is being edited */}
              {this.state.showForm === todo && (
                <form onSubmit={(e) => this.handleEditSubmit(e, todo)}>
                  <InputField
                    label="Edit task &nbsp;"
                    value={this.state.editInputVal}
                    onChange={(e) => this.setEditInputVal(e.target.value)}
                    // onChange={(e) =>
                    //   this.setState({ editInputVal: e.target.value })
                    // }
                    //onChange={(e) => {
                      // console.log("Editing Input:", e.target.value);
                      //this.setState({ editInputVal: e.target.value });
                    //}}
                    buttonText="Resubmit"
                  />
                </form>
              )}
            </div>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
