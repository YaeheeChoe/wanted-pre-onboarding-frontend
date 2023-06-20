import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../styles/colors';
const RootCont =styled.div`
    position: absolute;
    width :300px;
    height: 300px;
    top: calc(50% - 100px);
    left: calc(50% - 150px);
`
const Cont = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`;

const Btn = styled.button`
    background: ${COLORS.primary};
    color: ${COLORS.white};
    padding:8px;
`

function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const url = 'https://www.pre-onboarding-selection-task.shop/todos';

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    setToken(storedToken);
  }, []);
  
  useEffect(() => {
    if (!token) {
      navigate('/signin');
    } else {
      const method = 'GET';
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      fetch(url, {
        method: method,
        headers: headers,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.error);
        })
        .then((data) => {
          console.log('todo get: 요청이 성공했습니다.', data);
          setTodos(data);
        })
        .catch((error) => {
          console.error('todo get: 요청이 실패했습니다.', error);
        });
    }
  }, [token]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
    const method = 'POST';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
      todo: inputValue,
      isCompleted: true,
    });

    fetch(url, {
      method: method,
      headers: headers,
      body: body,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('todo: 요청이 실패했습니다.');
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('todo : 요청이 실패했습니다.', error);
      });
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  
  return (
    <RootCont>
      <Cont>
        <h1>투두 리스트</h1>
        <div>
          <input data-testid="new-todo-input" type="text" value={inputValue} onChange={handleInputChange} />
          <Btn data-testid="new-todo-add-button" onClick={handleAddTodo}>추가</Btn>
        </div>

        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <input type="checkbox" isCompleted={todo.isCompleted} />
              <span>{todo.todo}</span>
              <Btn onClick={() => handleDeleteTodo(index)}>삭제</Btn>
            </li>
          ))}
        </ul>
      </Cont>
    </RootCont>
  );
}

export default Todo
