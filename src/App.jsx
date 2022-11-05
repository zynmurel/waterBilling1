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
import { useState } from 'react';

function App() {
  const result= useFetch("http://localhost:8000/Consumers");
  const Utilities = useFetch("http://localhost:8000/Utilities");
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
          Utilities={Utilities} />}></Route> 

          <Route path="/inquire" element={<Inquire
          result={result} 
          Utilities={Utilities}
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
