import React, { useState } from "react";
import "./App.css";

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}
function Todo({todo,index,completeTodo,removeTodo}){
  return(
    <div className = 'todo' 
    style={{textDecoration : todo.isCompleted?"line-through":""}}>
      {todo.text}
      <div>
        <button class = 'button' onClick={() => completeTodo(index)}>Complete</button>
        <button class = 'button' onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}
function App() {
  var oldData = JSON.parse(localStorage.getItem('oldData'));
  if (oldData==null){
    oldData=[]
  }
  const [todos,setTodos] = useState([...oldData]);


  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    localStorage.setItem('oldData',JSON.stringify(newTodos));
    setTodos(newTodos);
  };
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    localStorage.setItem('oldData',JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    localStorage.setItem('oldData',JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}
  export default App;