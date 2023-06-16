import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Signin from './page/Signin';
import Signup from './page/Signup';
import Todo from './page/Todo';
import Main from './page/Main';
import NotFound from './page/NotFound';
import { GlobalStyles } from './styles'
function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/todo' element={<Todo/>}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
