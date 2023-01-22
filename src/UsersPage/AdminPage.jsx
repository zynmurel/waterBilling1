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
import AuthUser from '../Hook/AuthUser';
import GetData from '../Hook/SampleData'

const AdminPage = ({year, month, hostLaravel}) => {

  const {token, logout, getData, getUser} = AuthUser();
  const date = new Date('1644883200' * 1000)
  const brand = ["Philippine Valve", "Sunrise", "Asahi"];
  const usage_type = ["Residential","Commercial"];
  const civil_status = ["Single", "Married"];
  const gender = ["Male", "Female"];

  const dateNow = new Date();
  //REQUESTS

  //home && reports
  const consumerReports = GetData(hostLaravel, 'api/consumerReport' );

  //home
  const collectionReports = GetData(hostLaravel, `api/collectionReports/${dateNow.getFullYear()}/${month[dateNow.getMonth()].slice(0,3)}` );

  //consumer management
  const consumersData = GetData(`${hostLaravel}/api`, '/consumer');
  //consumer management && meter readings
  const brgyPrkData = GetData(`${hostLaravel}/api`, '/brgyprk');

  //inquire
  const consumersDataChange = GetData(`${hostLaravel}/api`, '/consumer');

  //system maintenance
  const usersData = GetData(`${hostLaravel}/api`, '/user');
  const settings = GetData(hostLaravel, 'api/settings');

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
          dateNow={dateNow}
          consumerReports={consumerReports}
          collectionReports={collectionReports}
          month={month}
          hostLaravel={hostLaravel}
          />}></Route>

          <Route path="/consumerManagement" element={
          <ConsumerManagement 
          consumersData={consumersData}
          brgyPrkData={brgyPrkData}
          hostLaravel={hostLaravel}
          brand={brand}
          gender={gender}
          civil_status={civil_status}
          usage_type={usage_type}
          month={month}
           />}></Route> 

          <Route path="/inquire" element={<Inquire
          hostLaravel={hostLaravel}
          consumersData={consumersDataChange}
          />}></Route> 

          <Route path="/meterReading" element={
          <MeterReading
          month={month}
          year={year}
          hostLaravel={hostLaravel}
          brgyPrkData={brgyPrkData}
          />}></Route> 

          <Route path="/reports" element={
          <Reports 
          consumerReports={consumerReports}    
          month={month}
          year={year}
          hostLaravel={hostLaravel}
          />}></Route> 

          <Route path="/systemMaintenance" element={<SystemMaintenance
          hostLaravel={hostLaravel}
          usersData={usersData}
          settings={settings}/>}></Route> 

          <Route path="/help" element={<Help/>}></Route> 

          <Route path="*" element={<NotFound/>}/>
        </Routes>
        </div>
      </div>
      </div>
     );
}
 
export default AdminPage;