import { Box } from "@mui/material";
import Header from "../ConsumerComponents/Header";
import AuthUser from "../Hook/AuthUser";
import {  Routes, Route } from 'react-router-dom';
import BillingPage from "../ConsumerComponents/Pages/BillingPage";
import NotFound from '../Components/Pages/NotFound';
import GetData from '../Hook/SampleData';
import Skeleton from '@mui/material/Skeleton';

const Consumer = ({hostJson, hostLaravel, year, month}) => {
    const {token, logout, getUser} = AuthUser();

    //sample consumer
  const consumersData = GetData(hostLaravel, `/api/consumer/${getUser().user_id}`);
  const billingsPaymentsReadings =  GetData(hostLaravel, `/api/showReadBillPayConsumer/${getUser().user_id}`);
  console.log(billingsPaymentsReadings.data && billingsPaymentsReadings.data)

    const { data:consumer, isPending:consumerIsPending, error:consumerError } = consumersData;
    console.log(consumer && consumer)
    console.log(consumer? consumer:'')


    const logoutUser = () => {
      if(token != undefined){
        logout(); 
      }
    }
    const styles = {
        body:{
            height:"100%",
            width:"100%"
        },
        container:{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          height:"100%",
        },
        content:{
        },
        id:{
          fontSize:"80px",
          margin:"0px 0 0 0"
        },
        name:{
          fontSize:"40px",
          margin:0,
        },
        top:{
          margin:'10px 10px 0 30px',
          color:'rgb(12,20,52)',
        },
        skeletonBox:{
          margin: '0 0'
        }
    }
    return ( 
        <div className="consumerpage">
        <Header 
        consumer={consumer}
        consumerError={consumerError}
        consumerIsPending={consumerIsPending}
        logoutUser={logoutUser}
        />
        <Box className="consumerContainer">
          <Routes>  

          <Route path="/consumerBilling" element={
        <Box className="consumerContent">
           {!consumerIsPending && consumer && consumer.length!==0 && 
           <Box className={'consumerIdName'}>
           <h1 >{"ID "+consumer.consumer_id}</h1> 
           <p >{`${consumer.first_name} ${consumer.middle_name} ${consumer.last_name}`}</p>
           </Box>
           }

          { consumerIsPending && 
          <Box className={'skeletonConsumer'}> 
            <Skeleton className="skeleton3" variant="rectangular" height={80} />
            <Skeleton className="skeleton2" variant="rounded" height={40} />
          </Box>
          }
          <BillingPage
          billingsPaymentsReadings={billingsPaymentsReadings}
            year={year}
            month={month}
            consumersData={consumersData}
          />
        </Box>}>
          </Route> 

          <Route path="*" element={<NotFound/>}/>

          </Routes>
        </Box>


        </div>
     );
}
 
export default Consumer;