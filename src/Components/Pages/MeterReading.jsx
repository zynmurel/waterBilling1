import '../../Styles/PageStyles/meterreading.css'
import AutoComplete from '../ReadyComponents/CAutoComplete'
import SelectLabels from '../ReadyComponents/CSelectLabel';
import AddPopup from '../ReadyComponents/ConsumerManagement/AddNewPopUp';
import ConsumerPopUp from '../ReadyComponents/ConsumerManagement/ConsumerPopUp'
import { useState } from 'react';
import React from 'react';
import AddConsumer from '../ReadyComponents/ConsumerManagement/AddConsumer';
import ConsumerData from '../ReadyComponents/ConsumerManagement/ConsumerData';
import { Button, TextField, Snackbar, Alert, InputAdornment } from '@mui/material';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import SearchIcon from '@mui/icons-material/Search';
import MeterReadingTable from '../ReadyComponents/MeterReading/MeterReadingTable';
const MeterReading = ({barangayData, purokData, month:allmonth, year:allyear, result}) => {
    console.log(result)
    const [page, setPage] = useState(0);
    const [consumerPopUp, setConsumerPopup] = useState(false)
    const [readings, setReadings] = useState({})
    const [purok, setPurok] = useState(7);
    const [barangay, setBarangay] = useState("");
    const [name, setName] = useState("");
    const [consumerInfo, setConsumerInfo] = useState({})
    let dateNow = new Date()
    const [month, setMonth] = useState(allmonth[dateNow.getMonth()]);
    const [year, setYear] = useState(dateNow.getFullYear().toString()); 

    const { data:barData, isPending:barIsPending, error:barError } = barangayData
    const { data:purData, isPending:purIsPending, error:purError } = purokData;
    const allbarangay = []
    barData && barData.map((r) => {
      allbarangay.push(r.barangay)
    } )

    const allpurok = []
    purData && purData.map((r) => {
      allpurok.push(r.purok)
    } )

    //StickyTable
    const {data:consumer, isPending:conIsPending, error:conError, reload, setReload}= result
    const bCon = consumer&& barangay && purok? consumer.filter((c)=> c.barangay === barangay && (c.purok === purok || purok ===7)):consumer
    const newCon = bCon? bCon.filter((c)=> `${c.first_name.toLowerCase()} ${c.middle_name.toLowerCase()} ${c.last_name.toLowerCase()}`.includes(name.toLowerCase())||`${c.id}`.includes(name)) : bCon
    const columns = [
        { id: 'id', label: 'Consumer #', minWidth: 120 },
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'totalReading', label: 'Total Reading', minWidth: 150},
        { id: 'barangay', label: 'Barangay', minWidth: 150 },
        { id: 'purok', label: 'Purok', minWidth: 100, align: 'center'}
    ];

    return ( 
        <div className="meterReading">
            <div className="container">
            <div className="searchAddBar">


            <AutoComplete  
              width={125} 
              label={'Year'} 
              dataSetter={setYear}
              buttonDisabler={setPurok}
              pageSetter={setPage}
              autoComHeight={500}
              options={allyear}
              isPending={barIsPending} 
              error={barError} 
              firstData={year}
              /> 
              
              <AutoComplete  
              width={180} 
              label={'Month'} 
              dataSetter={setMonth}
              buttonDisabler={setPurok}
              pageSetter={setPage}
              autoComHeight={500}
              options={allmonth}
              isPending={barIsPending} 
              error={barError} 
              firstData={month}
              />

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
              style={{width:400}}
              onChange={(e)=>{setName(e.target.value); setPage(0)}}
              />
            
            <AutoComplete  
              width={220} 
              label={'Barangay'} 
              dataSetter={setBarangay}
              buttonDisabler={setPurok}
              pageSetter={setPage}
              autoComHeight={500}
              options={allbarangay}
              isPending={barIsPending} 
              error={barError} 
              />    
            
                <SelectLabels 
                minWidth={80} 
                m={0}
                label={'Purok'} 
                purokData={allpurok}
                purError={purError}
                purIsPending={purIsPending}
                barangay={barangay}
                purok={purok} 
                setPurok={setPurok} 
                setPage={setPage}/>

           </div>

           <MeterReadingTable
           page={page}
           setPage={setPage}
           setConsumerPopup={setConsumerPopup}
           setConsumerInfo={setConsumerInfo}
           conIsPending={conIsPending} 
           conError={conError}
           newCon={newCon}
           columns={columns}
           />
           </div>
        </div>
     );
}
 
export default MeterReading;