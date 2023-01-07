import '../Styles/navigation.css';
import Header from '../UsersPage/Header';
import Navigation from '../ReaderComponents/Navigation';
import {  Routes, Route } from 'react-router-dom';
import Help from '../Components/Pages/Help';
import Reader from '../ReaderComponents/Pages/Reader'
import NotFound from '../Components/Pages/NotFound';
import AuthUser from '../Hook/AuthUser';
import MeterReading from '../Components/Pages/MeterReading'


const Cashier = () => {
  const {token, logout, getUser} = AuthUser();
  const month= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const year= ["2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022"];

  const logoutUser = () => {
    if(token != undefined){
      logout();
    }
  }
  const userType = getUser().user_type;
    return ( 
        <div className="cashierpage" >
        <div className="body1">
        <Navigation
        logoutUser={logoutUser}
        month={month}
        year={year}/>  
        <div className='routes' >
        <Header 
        logoutUser={logoutUser}
        userType={userType}
        />
        <Routes>  

          <Route path="/reading" element={
          <Reader
          month={month}
          />}></Route> 

          <Route path="/meterReading" element={
          <MeterReading
          month={month}
          year={year}
          />}></Route>
          
          <Route path="/help" element={<Help/>}></Route> 

          <Route path="*" element={<NotFound/>}/>
        </Routes>
        </div>
      </div>
        </div>
     );
}
 
export default Cashier;