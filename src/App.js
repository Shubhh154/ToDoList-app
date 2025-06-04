// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
const { v4: uuidv4 } = require('uuid');

function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToDOs = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    const taskToEdit = Todos.find((item) => item.id === id);
    if (taskToEdit) {
      setTodo(taskToEdit.Todo);
    }
  };

  const handleDelete = (id) => {
    const newTodos = Todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToDOs(newTodos);
  };

  const handleAdd = () => {
    if (Todo.trim()) {
      const newTodos = [...Todos, { id: uuidv4(), Todo, isCompleted: false }];
      setTodos(newTodos);
      saveToDOs(newTodos);
      setTodo("");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const newTodos = Todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
    saveToDOs(newTodos);
  };

  return (
    <>
      <nav className="bg-red-900 text-white flex justify-between p-2 mx-auto">
        <div>
          <span className="font-bold text-xl mx-8">miTask</span>
        </div>

        <ul className="flex gap-4">
          <li className="cursor-pointer hover:font-bold transition-all">Home</li>
          <li className="cursor-pointer hover:font-bold transition-all">Your task</li>
        </ul>
      </nav>

      <div className="container mx-auto my-5 rounded-xl p-5 bg-red-100 min-h-[80vh]">
        <div className="addTodo flex justify-center gap-3 py-5">
          <h2 className="text-l font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={Todo}
            type="text"
            className="w-80"
          />
          <button
            onClick={handleAdd}
            disabled={Todo.trim().length <= 1}
            className="bg-red-800 hover:bg-red-950 disabled:bg-red-500 p-2 py-1 text-sm text-white rounded-md mx-6"
          >
            Add
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          <input
            onChange={toggleFinished}
            type="checkbox"
            id="show"
            checked={showFinished}
          />
          <label htmlFor="show" className="ml-2">Show Finished Tasks</label>
        </div>

        <h2 className="text-l flex justify-center items-center text-2xl font-bold mt-4">Your Todos</h2>
        <div className="todos flex flex-col items-center">
          {Todos.length === 0 && (
            <div className="m-5">NO Todos to display</div>
          )}
          {Todos.map((item) => {
            if (showFinished || !item.isCompleted) {
              return (
                <div
                  key={item.id}
                  className="todo flex w-1/2 justify-between m-2"
                >
                  <div className="flex gap-3">
                    <input
                      name={item.id}
                      onClick={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                    <div
                      className={item.isCompleted ? "line-through" : ""}
                    >
                      {item.Todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-red-800 hover:bg-red-950 p-2 py-1 text-sm text-white rounded-md mx-6"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-800 hover:bg-red-950 p-2 py-1 text-sm text-white rounded-md mx-6"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
