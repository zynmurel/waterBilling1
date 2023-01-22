import '../Styles/navigation.css';
import Header from '../UsersPage/Header';
import Navigation from '../ReaderComponents/Navigation';
import {  Routes, Route } from 'react-router-dom';
import Help from '../Components/Pages/Help';
import Reader from '../ReaderComponents/Pages/Reader'
import NotFound from '../Components/Pages/NotFound';
import AuthUser from '../Hook/AuthUser';
import MeterReading from '../Components/Pages/MeterReading'
import { useState } from 'react';
import GetData from '../Hook/SampleData'


const Cashier = ({year, month, hostJson, hostLaravel}) => {
  const {token, logout, getUser} = AuthUser();

  const [purok, setPurok] = useState(7);
  const [barangay, setBarangay] = useState("");

  //Requests
  //meter readings
  const brgyPrkData = GetData(`${hostLaravel}/api`, '/brgyprk');

  //inquire
  const consumersData = GetData(`${hostLaravel}/api`, '/toReadConsumers');
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
          consumersData={consumersData}
          barangay={barangay}
          purok={purok}
          setBarangay={setBarangay}
          setPurok={setPurok}
          hostJson={hostJson}
          hostLaravel={hostLaravel}
          month={month}
          />}></Route> 

          <Route path="/meterReading" element={
          <MeterReading
          brgyPrkData={brgyPrkData}
          barangay={barangay}
          purok={purok}
          setBarangay={setBarangay}
          setPurok={setPurok}
          month={month}
          year={year}
          hostJson={hostJson}
          hostLaravel={hostLaravel}
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