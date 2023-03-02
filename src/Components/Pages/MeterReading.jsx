import '../../Styles/PageStyles/meterreading.css'
import AutoComplete from '../ReadyComponents/CAutoComplete'
import SelectLabels from '../ReadyComponents/CSelectLabel';
import { useState } from 'react';
import React from 'react';
import {  TextField, InputAdornment, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MeterReadingTable from '../ReadyComponents/MeterReading/MeterReadingTable';
import AuthUser from '../../Hook/AuthUser';
import GetData from '../../Hook/SampleData';

const MeterReading = ({ month:allmonth, year:allyear, hostLaravel, hostJson, brgyPrkData}) => {
    const [page, setPage] = useState(0);
    const [consumerPopUp, setConsumerPopup] = useState(false)
    const [name, setName] = useState("");
    const [consumerInfo, setConsumerInfo] = useState({})
    let dateNow = new Date()
    const [month, setMonth] = useState(allmonth[dateNow.getMonth()-1]);
    const [year, setYear] = useState(dateNow.getFullYear().toString()); 
    const [barangay, setBarangay] = useState("")
    const [purok, setPurok] = useState(7)

  const meterReadings = GetData(hostLaravel, `/api/showByServicePeriod/${month && month.slice(0,3)}/${year}`);
  const { data:meterReadingsData, isPending:MRisPending, error:MRerror, reload, setReload  } = meterReadings

    //getBarangay & Purok
    const {http} = AuthUser();

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
                width={120} 
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
                width={150} 
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
                style={{width:300}}
                onChange={(e)=>{setName(e.target.value); setPage(0)}}
                />
                </div>

              <div className="searchAddBar3">
                <Autocomplete
                value={barangay}
                onChange={(event, newValue) => {
                  setBarangay(newValue);
                  setPage(0);
                  setPurok(7);
                }}
                id="controllable-states-demo"
                options={allbarangay}
                sx={{ width: 300, margin:"0 2px 0 2px" }}
                renderInput={(params) => <TextField {...params} label={"Barangay"} />}
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
              barangay={barangay}
              purok={purok}
              name={name}
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