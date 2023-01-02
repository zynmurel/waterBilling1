import { Box } from "@mui/material";
import Header from "../ConsumerComponents/Header";
import AuthUser from "../Hook/AuthUser";
import {  Routes, Route } from 'react-router-dom';
import BillingPage from "../ConsumerComponents/Pages/BillingPage";
import NotFound from '../Components/Pages/NotFound';
import GetData from '../Hook/SampleData';
import Skeleton from '@mui/material/Skeleton';

const Consumer = () => {
    const {token, logout, getUser} = AuthUser();
    const month= ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const year= [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022, 2023];

    //sample consumer
    const consumersData = GetData('http://127.0.0.1:8001', `/UserConsumer?user_id=${getUser().user_id}`);
    const consumersBillings = GetData('http://127.0.0.1:8001', `/reading`);
    const { data:consumer, isPending:consumerIsPending, error:consumerError } = consumersData;

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
          height:"100%",
          width:"100%",
          maxWidth:"750px",
          minWidth:"750px",
          overflow:'hidden'
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
        skeleton1:{
          margin:'22px 10px 0 20px'
        },
        skeleton2:{
          margin:'10px 10px 0 20px'
        },
        skeletonBox:{
          margin: '0 0'
        }
    }
    return ( 
        <div className="consumerpage" style={styles.body}>
        <Header 
        consumer={consumer}
        consumerError={consumerError}
        consumerIsPending={consumerIsPending}
        logoutUser={logoutUser}
        />
        <Box style={styles.container}>
          <Routes>  

          <Route path="/consumerBilling" element={
        <Box style={styles.content}>
           {!consumerIsPending && consumer && consumer.length!==0 && 
           <Box style={styles.top}>
           <h1 style={styles.id}>{consumer[0].consumer_id}</h1> 
           <p style={styles.name}>{`${consumer[0].first_name} ${consumer[0].middle_name} ${consumer[0].last_name}`}</p>
           </Box>
           }

          {consumerIsPending &&
          <Box style={styles.skeletonBox}> 
            <Skeleton style={styles.skeleton1} variant="rectangular" width={"500px"} height={80} />
            <Skeleton style={styles.skeleton2} variant="rounded" width={"300px"} height={40} />
          </Box>
          }
          <BillingPage
            consumersBillings={consumersBillings}
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