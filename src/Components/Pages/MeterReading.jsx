import '../../Styles/PageStyles/meterreading.css'
import AutoComplete from '../ReadyComponents/CAutoComplete'
import SelectLabels from '../ReadyComponents/CSelectLabel';
import AddPopup from '../ReadyComponents/ConsumerManagement/AddNewPopUp';
import ConsumerPopUp from '../ReadyComponents/ConsumerManagement/ConsumerPopUp'
import { useState, useEffect } from 'react';
import React from 'react';
import AddConsumer from '../ReadyComponents/ConsumerManagement/AddConsumer';
import ConsumerData from '../ReadyComponents/ConsumerManagement/ConsumerData';
import { Button, TextField, Snackbar, Alert, InputAdornment } from '@mui/material';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import SearchIcon from '@mui/icons-material/Search';
import MeterReadingTable from '../ReadyComponents/MeterReading/MeterReadingTable';
import AuthUser from '../../Hook/AuthUser';
import GetData from '../../Hook/SampleData';

const MeterReading = ({ month:allmonth, year:allyear, hostLaravel, hostJson,barangay, purok, setBarangay, setPurok}) => {
    const [page, setPage] = useState(0);
    const [consumerPopUp, setConsumerPopup] = useState(false)
    const [name, setName] = useState("");
    const [consumerInfo, setConsumerInfo] = useState({})
    let dateNow = new Date()
    const [month, setMonth] = useState(allmonth[dateNow.getMonth()]);
    const [year, setYear] = useState(dateNow.getFullYear().toString()); 

  const meterReadings = GetData(hostLaravel, `/api/showByServicePeriod/${month && month.slice(0,3)}/${year}`);
  const { data:meterReadingsData, isPending:MRisPending, error:MRerror, reload, setReload  } = meterReadings

    //getBarangay & Purok
    const {http} = AuthUser();

    const brgyPrkData = GetData(`${hostLaravel}/api`, '/brgyprk');
    const {data:brgyPrk, isPending:bpIsPending, error:bpError}= brgyPrkData

    //Autocomplete - Barangay
    const allbarangay = []
    for (const key in brgyPrk) { 
      allbarangay.push(key)
    }
    let allpurok = barangay && brgyPrk ? brgyPrk[barangay].sort() : [];

    allpurok = allpurok.map((p)=>{
        return +p
    })


    return ( 
        <div className="meterReading">
            <div className="meterReadingContent">
            <div className="searchBarMR">
            <div className="searchBar">

              <div className="searchAddBar1">

                <AutoComplete
                reload={reload}
                setReload={setReload}  
                width={"100%"} 
                label={'Year'} 
                dataSetter={setYear}
                buttonDisabler={setPurok}
                pageSetter={setPage}
                autoComHeight={500}
                options={allyear}
                firstData={year}
                /> 
                
                <AutoComplete  
                reload={reload}
                setReload={setReload} 
                width={"100%"} 
                label={'Month'} 
                dataSetter={setMonth}
                buttonDisabler={setPurok}
                pageSetter={setPage}
                autoComHeight={500}
                options={allmonth}
                firstData={month}
                />
                </div>

                <div className="searchAddBar2"> 

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
                </div>

              <div className="searchAddBar3">

              <AutoComplete  
                width={220} 
                label={'Barangay'} 
                dataSetter={setBarangay}
                buttonDisabler={setPurok}
                pageSetter={setPage}
                autoComHeight={500}
                options={allbarangay}
                isPending={bpIsPending}
                error={bpError}
                />    

                  <SelectLabels 
                  minWidth={80} 
                  m={0}
                  label={'Purok'} 
                  allpurok={allpurok}
                  barangay={barangay}
                  purok={purok} 
                  setPurok={setPurok} 
                  setPage={setPage}/>

              </div>
              </div>

              <div className="meterReadingTable">
              <MeterReadingTable
              meterReadingsData={meterReadingsData}
              MRerror={MRerror}
              MRisPending={MRisPending}
              page={page}
              setPage={setPage}
              setConsumerPopup={setConsumerPopup}
              setConsumerInfo={setConsumerInfo}
              hostLaravel={hostLaravel}
              month={month}
              year={year}
              />
              </div>
            </div>
           </div>
        </div>
     );
}
 
export default MeterReading;