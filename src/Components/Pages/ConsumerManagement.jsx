import '../../Styles/PageStyles/consumermanagement.css'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import Table from '../ReadyComponents/CTable';
import AutoComplete from '../ReadyComponents/CAutoComplete'
import SelectLabels from '../ReadyComponents/CSelectLabel';
import useFetch from '../../Hook/useFetch';
import { Button } from '@mui/material';
import { useState } from 'react';


const ConsumerManagement = () => {
  const result= useFetch("http://localhost:8000/Consumers");
  const allPurok= useFetch("http://localhost:8000/Purok");
  const [purok, setPurok] = useState(0);

    return ( 
        <div className="consumerManagement">
           <div className="container">
           <div className="searchAddBar">
           <AutoComplete width={400} label={'Search Name/ID'}/>
           <AutoComplete  width={200} label={'Barangay'}/>
           <SelectLabels minWidth={120} m={0} label={'Purok'} data={allPurok} purok={purok} setPurok={setPurok}/>

            <Button variant="contained" style={{width:'33vh', backgroundColor:'#0f5e9c'}}><PersonAddAltRoundedIcon/>Add Consumer</Button>
           </div>
           <Table result = {result} purok={purok}/>
           </div>
        </div>
     );
}
 
export default ConsumerManagement;