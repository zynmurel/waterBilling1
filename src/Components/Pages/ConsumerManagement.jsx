import '../../Styles/PageStyles/consumermanagement.css'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
// import Table from '../ReadyComponents/CTable';
import StickyHeadTable from '../ReadyComponents/CTable'
import AutoComplete from '../ReadyComponents/CAutoComplete'
import SelectLabels from '../ReadyComponents/CSelectLabel';
import Popup from '../ReadyComponents/CPopup';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import React from 'react';
import AddConsumer from '../AddConsumer';



const ConsumerManagement = ({Utilities, result,purok, setPurok,barangay, setBarangay,name, setName}) => {
  const [page, setPage] = useState(0);
  const [openPopup, setOpenPopup] = useState(false)

    return ( 
        <div className="consumerManagement">
           <div className="container">
           <div className="searchAddBar">
            <TextField 
              id="outlined-basic" 
              label="Search Consumer Number/Name" 
              variant="outlined" 
              style={{width:'60vh'}}
              onChange={(e)=>{setName(e.target.value); setPage(0)}}
              />
            <AutoComplete  
            width={250} 
            label={'Barangay'} 
            Utilities={Utilities} 
            barangay={barangay} 
            setBarangay={setBarangay}
            setPurok={setPurok}
            setPage={setPage}
            autoComHeight={500}/>
            
            <SelectLabels 
            minWidth={80} 
            m={0} 
            label={'Purok'} 
            Utilities={Utilities} 
            purok={purok} 
            setPurok={setPurok} 
            barangay={barangay}
            setPage={setPage}/>

            <Button 
            variant="contained" 
            style={{width:'33vh', backgroundColor:'#0f5e9c'}}
            onClick={()=> setOpenPopup(true)}
            disabled={ Utilities.data && result.data ? false : true }
            >
              <PersonAddAltRoundedIcon/>Add Consumer</Button>
           </div>

           <StickyHeadTable
           result = {result} 
           purok={purok} 
           name={name} 
           barangay={barangay}
           page={page}
           setPage={setPage}
           setOpenPopup={setOpenPopup}/>

          <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            maxWidth={"lg"}
            >
              <AddConsumer 
              setOpenPopup={setOpenPopup}
              Utilities={Utilities}
              result={result}
              />
          </Popup>
           
           </div>
        </div>
     );
}
 
export default ConsumerManagement;