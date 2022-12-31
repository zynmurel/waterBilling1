import { Box } from "@mui/material";
import Header from "../ConsumerComponents/Header";
import AuthUser from "../Hook/AuthUser";
import {  Routes, Route } from 'react-router-dom';
import BillingPage from "../ConsumerComponents/Pages/BillingPage";
import NotFound from '../Components/Pages/NotFound';
import GetData from '../Hook/SampleData';

const Consumer = () => {
    const {token, logout, getUser} = AuthUser();
    const month= ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const year= ["2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022"];
    

    //sample consumer
    const consumersData = GetData('http://127.0.0.1:8001', `/UserConsumer`);
    const { data:consumers, isPending:consumerIsPending, error:consumerError } = consumersData
    console.log(consumers && consumers)


    const logoutUser = () => {
      if(token != undefined){
        logout();
      }
    }
    const styles = {
        body:{
            height:100
        }
    }
    return ( 
        <div className="consumerpage" style={styles.body}>
        <Header 
        logoutUser={logoutUser}
        />
        <Routes>  

        <Route path="/consumerBilling" element={
        <BillingPage

        />}>
        </Route> 

        <Route path="*" element={<NotFound/>}/>

        </Routes>

        </div>
     );
}
 
export default Consumer;