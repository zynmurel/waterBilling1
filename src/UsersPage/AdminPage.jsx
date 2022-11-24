import Header from '../Components/Header';
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

const AdminPage = () => {
  const result= useFetch("http://localhost:8001/Consumers");
  const barangayData = useFetch("http://localhost:8001/barangay");
  const purokData = useFetch("http://localhost:8001/purok");
  const reading = useFetch("http://localhost:8001/reading");
  const billing = useFetch("http://localhost:8001/billing");
  const month= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const year= ["2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022"];
  const brand = ["Brand", "Sunrise"];
  const usage_type = ["Residential","Commercial"];
  const civil_status = ["Single", "Married"];
  const gender = ["Male", "Female"];
  const {token, logout} = AuthUser();

  const logoutUser = () => {
    if(token != undefined){
      logout();
    }
  }
    return ( 
        <div className="adminpage">
      <Header 
      logoutUser={logoutUser}
      />
      <div className="body1">
        <Navigation/>  
        <div className='routes' >
        <Routes>  
          <Route path="/home" element={
          <Home
          result={result} 
          />}></Route>

          <Route path="/consumerManagement" element={
          <ConsumerManagement 
          result={result} 
          barangayData={barangayData}
          purokData={purokData}
          brand={brand}
          gender={gender}
          civil_status={civil_status}
          usage_type={usage_type}
          month={month}
          reading={reading}
          billing={billing}
           />}></Route> 

          <Route path="/inquire" element={<Inquire
          result={result} 
          month={month}
          reading={reading}
          billing={billing}
          />}></Route> 

          <Route path="/meterReading" element={
          <MeterReading
          barangayData={barangayData}
          purokData={purokData}
          month={month}
          year={year}
          result={result} 
          reading={reading}
          />}></Route> 

          <Route path="/reports" element={<Reports/>}></Route> 

          <Route path="/systemMaintenance" element={<SystemMaintenance/>}></Route> 

          <Route path="/help" element={<Help/>}></Route> 

          <Route path="*" element={<NotFound/>}/>
        </Routes>
        </div>
      </div>
      </div>
     );
}
 
export default AdminPage;