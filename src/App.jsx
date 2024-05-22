import { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Navbar from "./components/Navbar";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const addTodo = () => {
    if (todoInput.trim() !== "") {
      const newTodo = {
        id: todos.length + 1,
        text: todoInput.trim(),
        color: getRandomColor(),
      };
      setTodos([...todos, newTodo]);
      setTodoInput("");
    }
    saveToLS();
  };

  const getRandomColor = () => {
    const colors = [
      "bg-blue-200",
      "bg-green-200",
      "bg-yellow-200",
      "bg-salmon-200",
      "bg-purple-200",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleInputChange = () => {
    setTodoInput(event.target.value);
  };

  const handleEdit = (id) => {
    const editedTodo = todos.find((todo) => todo.id === id);
    if (editedTodo) {
      setTodoInput(editedTodo.text);
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, text: todoInput.trim() } : todo
      );

      setTodos(updatedTodos);
      saveToLS();
    }
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    // let id = e;
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="container w-3/4 absolute right-0 text-center rounded-full px-4 pt-4">
        <div className="bg-[#1e1e1f] text-white font-bold text-2xl p-4 sticky top-0 rounded-lg">
          <h1>Your Todos </h1>
        </div>
        <div className="todos flex flex-col w-full px-20 py-4">
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={todoInput}
              onChange={handleInputChange}
              id=""
              className="w-full py-4 px-4 border border-gray-300 text-bold text-xl rounded-md mr-4"
              placeholder="Add a new todo"
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white px-8 py-4 rounded-md"
            >
              Add
            </button>
          </div>
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          <div className="divide-y divide-gray-300 flex flex-wrap w-full h-screen">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`p-4 rounded-md m-4 overflow-y-auto h-1/3 w-[45%] ${todo.color}`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-lg text-start font-semibold w-[75%]">
                    {todo.text}
                  </span>
                  <div>
                    <button
                      onClick={(e) => {
                        handleEdit(todo.id);
                      }}
                      className="text-gray-500 hover:text-gray-700 mr-3 text-2xl"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(todo.id);
                      }}
                      className="text-red-500 hover:text-red-700 text-2xl"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
