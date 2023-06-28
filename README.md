
## 실행방법
1. 이 프로젝트를 clone 한 후, 터미널에서 아래 명령어를 실행해주세요.
```bash
npm install
npm start
```
2. 브라우저로 다음 링크에 접속해 확인합니다.
http://localhost:3000

## 데모영상
[https://youtu.be/nWyD4Mg5xmM](https://youtu.be/nWyD4Mg5xmM)

## 사용 라이브러리
react-router
styled-component

## 구현방법
### Component
다음과 같이 컴포넌트를 분할했습니다.

<img width="306" alt="스크린샷 2023-06-28 오전 8 58 46" src="https://github.com/YaeheeChoe/wanted-pre-onboarding-frontend/assets/72256237/89e4835d-301a-4b63-9da9-09de0f0fa8f1">

### State
각 페이지 컴포넌트에서 사용하는 state를 가지고있고, setState를 각 컴포넌트에 넘겨주는 방식을 구현했습니다.   
Signin.js 36
```
function Signin() {
    const [isEmailRight, setEmailRight] = useState(false);
    const [isPasswordRight, setPasswordRight] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
...
```
Signin.js 79
```
...
<EmailInput setSubmitable={setEmailRight} setParent={setEmail} />
<PasswordInput setSubmitable={setPasswordRight} setParent={setPassword}/>
{isEmailRight && isPasswordRight ? <Btn onClick={onSubmit}>로그인</Btn> : <DisabledBtn disabled>로그인</DisabledBtn>
...
```

### Style
전역 color를 정의해두고 사용했습니다.   
colors.js
```
export const COLORS = {
    background: '#F4F0FF',
    primary: '#6C5DD3',
    white: '#FFFFFF',
    black: '#081735',
    coolgray001: '#FAFAFA',
    coolgray002: '#A0AEC0',
    coolgray003: '#718096',
}
```
styled componet의 글로벌 스타일을 사용해 input, button등 공통적으로 적용되는 스타일은 전역으로 사용했습니다.   
global.js
```
import { createGlobalStyle } from 'styled-components' 
import { COLORS } from './colors'
export default createGlobalStyle`
    html {
        height: 100%;
    }
    
    input{
        background: ${COLORS.coolgray001};
        border: none;
        padding: 16px;
        border-radius: 12px;
        color: ${COLORS.coolgray003};
    }
    input::placeholder{
        color: ${COLORS.coolgray002};
    }
    button{
        background: ${COLORS.primary};
        color : ${COLORS.white};
        border:none;
        border-radius: 12px;
    }
    textarea:focus, input:focus {
        color: ${COLORS.coolgray003};
        outline: none;
    }
`
```
### 이미 로그인된 경우 todo로 리다이렉션

Signin.js 43
```
useEffect(() => {
      const token = localStorage.getItem('access_token');
      if (token !== null) {
        navigate('/todo');
      }
    }, []);
```
### Todo
GET에 해당하는 loadTodos에서 todo state및 수정중 여부state(setUpdating)를 다루도록 해두고, todo의 리렌더링이 필요할 때마다(ADD, DELETE 등 후) 호출하도록 구현했습니다.
Todo.js 40
```
useEffect(() => {
    loadTodos();

  }, [token]);

  const loadTodos = () => {
    if (token === null) {
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

```
Todo.js 112
```
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
```

### 오류 발생하는 부분
Todo.js 35
```
useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    setToken(storedToken);
  }, []);
  
  useEffect(() => {
    loadTodos();
  }, [token]); // useEffect 관련 에러, 깜빡거린다. 무한렌더링 위험이 있다고 함.
```
