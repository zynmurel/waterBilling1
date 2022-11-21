import './App.css';
import AdminPage from './UsersPage/AdminPage';
import Login from './UsersPage/Login';
import AuthUser from './Hook/AuthUser';

import {  Routes, Route} from 'react-router-dom';

function App() {
  const {getToken} = AuthUser();
  
  if(!getToken()){
    return (
      <Routes>
          <Route path="/" element={<Login/>}/>
      </Routes>)
  }else{
    return <AdminPage/>
  }
    

}

export default App;
