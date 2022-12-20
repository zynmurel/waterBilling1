import './App.css';
import AdminPage from './UsersPage/AdminPage';
import CashierPage from './UsersPage/CashierPage';
import Login from './UsersPage/Login';
import AuthUser from './Hook/AuthUser';

import {  Routes, Route} from 'react-router-dom';

function App() {
  const {getToken, getUser} = AuthUser();
  const userDetails = getUser()
  console.log(userDetails? userDetails.user_type : false);
  if(!getToken()){
  
  return (<Routes>
      <Route path="/login" element={<Login/>}></Route> 
    </Routes>)

  }
  else if(userDetails && userDetails.user_type == 'admin'){
    return <AdminPage/>
  }
  else if(userDetails && userDetails.user_type == 'cashier'){
    return <CashierPage/>
  }
    

}

export default App;
