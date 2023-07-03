import React from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
function App() {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };

    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }
  return (
    <div className="App">
      <div id="todo-list" className="TodoWrapper">
        <h1>To-do List</h1>
        <form className="TodoForm" onSubmit={handleSubmit}>
          <input
            className="todo-input"
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button className="todo-btn" type="submit">
            Add Todo
          </button>
        </form>
        {todos.map((todo) => (
          <div key={todo.id} className="Todo">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <div>
              {todo.id === todoEditing ? (
                <input
                  type="text"
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <div>{todo.text}</div>
              )}
            </div>

            <div>
              {todo.id === todoEditing ? (
                <button
                  className="Edit-btn"
                  onClick={() => submitEdits(todo.id)}
                >
                  Submit Edits
                </button>
              ) : (
                <button
                  className="Edit-btn"
                  onClick={() => setTodoEditing(todo.id)}
                >
                  Edit
                </button>
              )}

              <FontAwesomeIcon
                className="fa-trash"
                icon={faTrash}
                onClick={() => deleteTodo(todo.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
