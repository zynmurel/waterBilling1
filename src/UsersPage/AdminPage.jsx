import Header from '../UsersPage/Header';
import Navigation from '../Components/Navigation';
import Home from '../Components/Pages/Home';
import {  Routes, Route} from 'react-router-dom';
import ConsumerManagement from '../Components/Pages/ConsumerManagement';
import Inquire from '../Components/Pages/Inquire';
import MeterReading from '../Components/Pages/MeterReading';
import SystemMaintenance from '../Components/Pages/SystemMaintenance';
import Help from '../Components/Pages/Help';
import Reports from '../Components/Pages/Reports';
import NotFound from '../Components/Pages/NotFound';
import useFetch from '../Hook/useFetch';
import AuthUser from '../Hook/AuthUser';
import GetData from '../Hook/SampleData'
import { useState, useEffect } from 'react';

const AdminPage = ({year, month, hostJson, hostLaravel}) => {

  const {token, logout, getData, getUser} = AuthUser();
  const result = GetData(hostJson, `/consumers`);
  const reading = GetData(hostJson, `/reading`);
  const date = new Date('1644883200' * 1000)
  const brand = ["Nature Spring", "Sunrise"];
  const usage_type = ["Residential","Commercial"];
  const civil_status = ["Single", "Married"];
  const gender = ["Male", "Female"];

  const logoutUser = () => {
    if(token != undefined){
      logout();
    }
  }
  const userType = getUser().user_type;
    return ( 
        <div className="adminpage">
 
      <div className="body1">
        <Navigation/>  
        <div className='routes' >
        <Header 
        logoutUser={logoutUser}
        userType={userType}
        />
        <Routes>  
          <Route path="/home" element={
          <Home
          result={result} 
          />}></Route>

          <Route path="/consumerManagement" element={
          <ConsumerManagement 
          hostJson={hostJson}
          hostLaravel={hostLaravel}
          brand={brand}
          gender={gender}
          civil_status={civil_status}
          usage_type={usage_type}
          month={month}
           />}></Route> 

          <Route path="/inquire" element={<Inquire
          hostJson={hostJson}
          hostLaravel={hostLaravel}
          result={result} 
          month={month}
          reading={reading}
          />}></Route> 

          <Route path="/meterReading" element={
          <MeterReading
          month={month}
          year={year}
          hostJson={hostJson}
          hostLaravel={hostLaravel}
          />}></Route> 

          <Route path="/reports" element={
          <Reports     
          month={month}
          year={year}
          result={result} 
          reading={reading}
          hostLaravel={hostLaravel}
          />}></Route> 

          <Route path="/systemMaintenance" element={<SystemMaintenance
          hostJson={hostJson}
          hostLaravel={hostLaravel}/>}></Route> 

          <Route path="/help" element={<Help/>}></Route> 

          <Route path="*" element={<NotFound/>}/>
        </Routes>
        </div>
      </div>
      </div>
     );
}
 
export default AdminPage;