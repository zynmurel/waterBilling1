import './App.css';
import AdminPage from './UsersPage/AdminPage';
import CashierPage from './UsersPage/CashierPage';
import Login from './UsersPage/Login';
import AuthUser from './Hook/AuthUser';
import ReaderPage from './UsersPage/ReaderPage'

import {  Routes, Route} from 'react-router-dom';
import ConsumersPage from './UsersPage/ConsumersPage';

function App() {
  const {getToken, getUser} = AuthUser();
  const userDetails = getUser()
  console.log(userDetails? userDetails.user_type : false);
  if(!getToken()){
    return (<Routes>
              <Route path="/" element={<Login/>}></Route> 
            </Routes>)
  }
  else if(userDetails && userDetails.user_type == 'Admin'){
    return <AdminPage/>
  }
  else if(userDetails && userDetails.user_type == 'Cashier'){
    return <CashierPage/>
  }
  else if(userDetails && userDetails.user_type == 'Reader'){
    return <ReaderPage/>
  }
  else if(userDetails && userDetails.user_type == 'Consumer'){
    return <ConsumersPage/>
  }
    

}

export default App;
