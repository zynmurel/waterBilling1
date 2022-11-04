import '../../Styles/PageStyles/consumermanagement.css'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
// import Table from '../ReadyComponents/CTable';
import StickyHeadTable from '../ReadyComponents/CTable'
import AutoComplete from '../ReadyComponents/CAutoComplete'
import SelectLabels from '../ReadyComponents/CSelectLabel';
import AddPopup from '../ReadyComponents/ConsumerManagement/AddNewPopUp';
import ConsumerPopUp from '../ReadyComponents/ConsumerManagement/ConsumerPopUp'
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import React from 'react';
import AddConsumer from '../ReadyComponents/ConsumerManagement/AddConsumer';
import ConsumerData from '../ReadyComponents/ConsumerManagement/ConsumerData';



const ConsumerManagement = ({Utilities, result}) => {
  const [page, setPage] = useState(0);
  const [openPopup, setOpenPopup] = useState(false)
  const [consumerPopUp, setConsumerPopup] = useState(false)
  const [consumerInfo, setConsumerInfo] = useState({})
  const [purok, setPurok] = useState(7);
  const [barangay, setBarangay] = useState("");
  const [name, setName] = useState("");

  console.log(new Date("2022-10-17T16:00:00.000Z"))

    return ( 
        <div className="consumerManagement">
           <div className="container">
           <div className="searchAddBar">
            <TextField 
              id="outlined-basic" 
              label="Search Consumer Number/Name" 
              variant="outlined" 
              style={{width:450}}
              onChange={(e)=>{setName(e.target.value); setPage(0)}}
              />
            <AutoComplete  
            width={300} 
            label={'Barangay'} 
            Utilities={Utilities} 
            barangay={barangay} 
            setBarangay={setBarangay}
            setPurok={setPurok}
            setPage={setPage}
            autoComHeight={500}/>
            
            <SelectLabels 
            minWidth={100} 
            m={0} 
            label={'Purok'} 
            Utilities={Utilities} 
            purok={purok} 
            setPurok={setPurok} 
            barangay={barangay}
            setPage={setPage}/>

            <Button 
            variant="outlined" 
            style={{width:200}}
            onClick={()=> {setOpenPopup(true)}}
            >
              <PersonAddAltRoundedIcon
              sx={{ marginRight:1}}
              />Add Consumer</Button>
           </div>

           <StickyHeadTable
           result = {result} 
           purok={purok} 
           name={name} 
           barangay={barangay}
           page={page}
           setPage={setPage}
           setOpenPopup={setOpenPopup}
           setConsumerPopup={setConsumerPopup}
           setConsumerInfo={setConsumerInfo}
           />

           <AddPopup
             openPopup={openPopup}
             setOpenPopup={setOpenPopup}
             maxWidth={"lg"}
             >
               <AddConsumer 
               setOpenPopup={setOpenPopup}
               Utilities={Utilities}
               result={result}
               consumerInfo={consumerInfo}
               />
           </AddPopup>

          <ConsumerPopUp
            consumerPopUp={consumerPopUp}
            setOpenPopup = {setOpenPopup}
            setConsumerPopup={setConsumerPopup}
            consumerInfo={consumerInfo}
            result={result}
            maxWidth={"md"}
            setConsumerInfo={setConsumerInfo}
            >
              <ConsumerData 
              setConsumerPopup={setConsumerPopup}
              Utilities={Utilities}
              result={result}
              consumerInfo={consumerInfo}
              />
          </ConsumerPopUp>
           
           </div>
        </div>
     );
}
 
export default ConsumerManagement;