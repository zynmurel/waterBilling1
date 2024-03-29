import '../Styles/navigation.css';
import Header from '../UsersPage/Header';
import Navigation from '../CashierComponents/Navigation';
import {  Routes, Route } from 'react-router-dom';
import Help from '../Components/Pages/Help';
import Payment from '../CashierComponents/Pages/Payment'
import NotFound from '../Components/Pages/NotFound';
import AuthUser from '../Hook/AuthUser';
import Reports from '../Components/Pages/Reports';
import GetData from '../Hook/SampleData'
import MeterReading from '../Components/Pages/MeterReading';

const Cashier = ({hostJson, hostLaravel, year, month}) => {
  const {token, logout, getUser} = AuthUser();
  const consumerReports = GetData(hostLaravel, 'api/consumerReport' );
  const logoutUser = () => {
    if(token != undefined){
      logout();
    }
  }
  //consumer management && meter readings
  const brgyPrkData = GetData(`${hostLaravel}/api`, '/brgyprk');
  const userType = getUser().user_type;
    return ( 
        <div className="cashierpage" >
        <div className="body1">
        <Navigation/>  
        <div className='routes' >
        <Header 
        logoutUser={logoutUser}
        userType={userType}
        />
        <Routes>  

          <Route path="/payment" element={
          <Payment
          month={month}
          hostJson={hostJson}
          hostLaravel={hostLaravel}
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
          month={month}
          year={year} 
          hostLaravel={hostLaravel}
          brgyPrkData={brgyPrkData}
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