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



const ConsumerManagement = ({Place, result,purok, setPurok,barangay, setBarangay,name, setName}) => {
  const [page, setPage] = useState(0);
  const [openPopup, setOpenPopup] = useState(false)

    return ( 
        <div className="consumerManagement">
           <div className="container">
           <div className="searchAddBar">
            <TextField 
              id="outlined-basic" 
              label="Search ID/Name" 
              variant="outlined" 
              style={{width:'60vh'}}
              onChange={(e)=>{setName(e.target.value); setPage(0)}}
              />
            <AutoComplete  
            width={250} 
            label={'Barangay'} 
            data={Place} 
            barangay={barangay} 
            setBarangay={setBarangay}
            setPurok={setPurok}
            setPage={setPage}/>
            
            <SelectLabels 
            minWidth={80} 
            m={0} 
            label={'Purok'} 
            data={Place} 
            purok={purok} 
            setPurok={setPurok} 
            barangay={barangay}
            setPage={setPage}/>

            <Button 
            variant="contained" 
            style={{width:'33vh', backgroundColor:'#0f5e9c'}}
            onClick={()=> setOpenPopup(true)}>
              <PersonAddAltRoundedIcon/>Add Consumer</Button>
           </div>
           {/* <Table 
           result = {result} 
           purok={purok} 
           name={name} 
           barangay={barangay}
           /> */}
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
              <AddConsumer/>
          </Popup>
           
           </div>
        </div>
     );
}
 
export default ConsumerManagement;