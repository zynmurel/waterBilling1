import './App.css';
import Header from './Components/Header';
import Navigation from './Components/Navigation';
import Home from './Components/Pages/Home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ConsumerManagement from './Components/Pages/ConsumerManagement';
import Inquire from './Components/Pages/Inquire';
import MeterReading from './Components/Pages/MeterReading';
import SystemMaintenance from './Components/Pages/SystemMaintenance';
import Help from './Components/Pages/Help';
import Reports from './Components/Pages/Reports';
import NotFound from './Components/Pages/NotFound';
import useFetch from './Hook/useFetch';

function App() {
  const result= useFetch("http://localhost:8000/Consumers");
  const barangayData = useFetch("http://localhost:8000/barangay");
  const purokData = useFetch("http://localhost:8000/purok");
  const brandData = useFetch("http://localhost:8000/brand");
  const usage_typeData = useFetch("http://localhost:8000/usage_type");
  const civil_statusData = useFetch("http://localhost:8000/civil_status");
  const genderData = useFetch("http://localhost:8000/gender");

  const month= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return (
    <div className="adminpage">
      <Router>
      <Header/>
      <div className="body1">
        <Navigation/>  
        <div className='routes'>
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
          brandData={brandData}
          genderData={genderData}
          civil_statusData={civil_statusData}
          usage_typeData={usage_typeData}
          month={month}
           />}></Route> 

          <Route path="/inquire" element={<Inquire
          result={result} 
          />}></Route> 

          <Route path="/meterReading" element={<MeterReading/>}></Route> 

          <Route path="/reports" element={<Reports/>}></Route> 

          <Route path="/systemMaintenance" element={<SystemMaintenance/>}></Route> 

          <Route path="/help" element={<Help/>}></Route> 

          <Route path="*" element={<NotFound/>}/>
        </Routes>
        </div>
      </div>
      </Router>
      </div>
  );
}

export default App;
