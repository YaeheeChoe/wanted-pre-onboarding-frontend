import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };


  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/signin');
    }
  }, []);
  return (
    <div>
      <h1>투두 리스트</h1>

      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>추가</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleDeleteTodo(index)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo
