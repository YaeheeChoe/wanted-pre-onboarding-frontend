import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../styles/colors';
const RootCont =styled.div`
    position: absolute;
    width :800px;
    height: 300px;
    top: calc(50% - 100px);
    left: calc(50% - 400px);
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
    margin: 8px 0px 8px 8px;
`

function Todo() {
  const [todos, setTodos] = useState([]);
  const [isUpdating,setUpdating]  = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [updateValue, setUpdateValue] = useState('');
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const url = 'https://www.pre-onboarding-selection-task.shop/todos';

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('access_token'));
    setToken(storedToken);
  }, []);
  
  useEffect(() => {
    loadTodos();

  }, [token]);

  const loadTodos = () => {
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
          setTodos(data);
          setUpdating(Array.from({ length: data.length }, () => false));
        })
        .catch((error) => {
          console.error('todo get: 요청이 실패했습니다.', error);
        });
      }
  }
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleUpdateInputChange = (event) => {
    setUpdateValue(event.target.value);
  };
  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setInputValue('');
    }
    const method = 'POST';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
      todo: inputValue,
      isCompleted: false,
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
        loadTodos();
      })
      .catch((error) => {
        console.error('todo : 요청이 실패했습니다.', error);
      });
  };

  const handleDeleteTodo = async (index) => {
    const method = 'DELETE';
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(`${url}/${index}`, {
        method: method,
        headers: headers,
      });
  
      if (response.status === 204) {
        console.log('Todo 삭제: 요청이 성공했습니다.');
        loadTodos();
      } else {
        console.error('Todo 삭제: 요청이 실패했습니다.');
      }
    } catch (error) {
      console.error('Todo 삭제: 요청이 실패했습니다.', error);
    }
  }
  const handleUpdateTodo = (id,index, isCompleted) => {
    const newUpdating  = [...isUpdating];
    newUpdating[index] = false;
    setUpdating(newUpdating);
    updateTodo(id, updateValue,isCompleted);
  }
  const updateTodo = async (id, updatedTodo, isCompleted) => {
    const method = 'PUT';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
      todo: updatedTodo,
      isCompleted: isCompleted,
    });
  
    try {
      const response = await fetch(`${url}/${id}`, {
        method: method,
        headers: headers,
        body: body,
      });
  
      if (response.status === 200) {
        console.log('Todo 업데이트: 요청이 성공했습니다.');
        loadTodos();
      } else {
        console.error('Todo 업데이트: 요청이 실패했습니다.');
      }
    } catch (error) {
      console.error('Todo 업데이트: 요청이 실패했습니다.', error);
    }
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
              <input type="checkbox" checked={todo.isCompleted} onChange={() => updateTodo(todo.id,index,todo.todo,!todo.isCompleted)} />
              {isUpdating[index] ?
              <>
              <input data-testid="modify-input" value={updateValue} onChange={handleUpdateInputChange} />
              <Btn data-testid="submit-button" onClick={() => handleUpdateTodo(todo.id,index, todo.isCompleted)}>제출</Btn>
              <Btn data-testid="cancel-button"
              onClick={()  => {
                  const newUpdating  = [...isUpdating];
                  newUpdating[index] = false;
                  setUpdating(newUpdating);
                }}>취소</Btn>
              </>:
              <>
                <span>{todo.todo}</span>
                <Btn data-testid="modify-button" onClick={()  => {
                  const newUpdating  = [...isUpdating];
                  newUpdating[index] = true;
                  setUpdating(newUpdating);
                  setUpdateValue(todo.todo);
                }} >수정</Btn>                
                <Btn data-testid="delete-button" onClick={() => handleDeleteTodo(todo.id)}>삭제</Btn>
              </>
              }
            </li>
          ))}
        </ul>
      </Cont>
    </RootCont>
  );
}

export default Todo
