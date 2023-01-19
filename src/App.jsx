import './App.css';
import AdminPage from './UsersPage/AdminPage';
import CashierPage from './UsersPage/CashierPage';
import Login from './UsersPage/Login';
import AuthUser from './Hook/AuthUser';
import ReaderPage from './UsersPage/ReaderPage'

import {  Routes, Route} from 'react-router-dom';
import ConsumersPage from './UsersPage/ConsumersPage';

function App() {
  const date = new Date();
  const month= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let year= [];
  let x =2000;
  for( x ; x<=date.getFullYear(); x++){
    year.push(x.toString())
  }

  const datum = Date.parse(date)
  //console.log(date)
  const {getToken, getUser, hostLaravel} = AuthUser();
  const userDetails = getUser();
  //Dolores Wifi
  //const hostJson = 'http://192.168.254.174:8001';

  //Selwin Wifi
  const hostJson = 'http://192.168.0.115:8001';

  //return <ReaderPage/>
  //  return <AdminPage
  //  year={year}
  //  month={month} 
  //  hostJson={hostJson}
  //  hostLaravel={hostLaravel}/>
  // return <CashierPage/>
  // return <ConsumersPage/>
  if(!getToken()){
    return (<Routes>
              <Route path="/" element={<Login/>}></Route> 
            </Routes>)
  }
  else if(userDetails && userDetails.user_type == 'Admin'){
    return <AdminPage  
    year={year}
    month={month} 
    hostJson={hostJson}
    hostLaravel={hostLaravel}/>
  }
  else if(userDetails && userDetails.user_type == 'Cashier'){
    return (
    <CashierPage
    year={year}
    month={month}
    hostJson={hostJson}
    hostLaravel={hostLaravel}
    /> 
    )
  }
  else if(userDetails && userDetails.user_type == 'Reader'){
    return <ReaderPage
    year={year}
    month={month}
    hostJson={hostJson}
    hostLaravel={hostLaravel}/>
  }
  else if(userDetails && userDetails.user_type == 'Consumer'){
    return (
    <ConsumersPage
    year={year}
    month={month}
    hostJson={hostJson}
    hostLaravel={hostLaravel}
    />)
  }
    

}

export default App;
