import '../../Styles/PageStyles/consumermanagement.css'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
// import Table from '../ReadyComponents/CTable';
import StickyHeadTable from '../ReadyComponents/CTable'
import AutoComplete from '../ReadyComponents/CAutoComplete'
import SelectLabels from '../ReadyComponents/CSelectLabel';
import AddPopup from '../ReadyComponents/ConsumerManagement/AddNewPopUp';
import ConsumerPopUp from '../ReadyComponents/ConsumerManagement/ConsumerPopUp'
import { useState } from 'react';
import React from 'react';
import AddConsumer from '../ReadyComponents/ConsumerManagement/AddConsumer';
import ConsumerData from '../ReadyComponents/ConsumerManagement/ConsumerData';
import { Button, TextField, Snackbar, Alert, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';



const ConsumerManagement = ({Utilities, result, month}) => {
  const [page, setPage] = useState(0);
  const [openPopup, setOpenPopup] = useState(false)
  const [consumerPopUp, setConsumerPopup] = useState(false)
  const [consumerInfo, setConsumerInfo] = useState({})
  const [purok, setPurok] = useState(7);
  const [barangay, setBarangay] = useState("");
  const [name, setName] = useState("");

  const [alert, setAlert] = useState(false)
  const [alertType, setAlertType] = useState("warning")
  const [alertText, setAlertText] = useState("")

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }

        setAlert(false);
    }

    return ( 
        <div className="consumerManagement">
           <div className="container">
           <div className="searchAddBar">
            <TextField 
              id="outlined-basic" 
              label={"Search ID Number/Name" }
              InputProps= {{
              endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
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
            onClick={()=> {setOpenPopup(true); setConsumerInfo({})}}
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
             consumerInfo={consumerInfo}
             >
               <AddConsumer 
               setOpenPopup={setOpenPopup}
               Utilities={Utilities}
               result={result}
               consumerInfo={consumerInfo}
               setConsumerInfo={setConsumerInfo}
               setAlert={setAlert}
               setAlertText={setAlertText}
               setAlertType={setAlertType}
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
              month={month}
              />

          </ConsumerPopUp>


          <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose} >
                    <Alert
                    onClose={handleAlertClose}  
                    severity={alertType} sx={{ width: '100%' }}>
                    {alertText}
                    </Alert>
                </Snackbar>
           
           </div>
        </div>
     );
}
 
export default ConsumerManagement;