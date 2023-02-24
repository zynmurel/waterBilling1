import '../../Styles/PageStyles/consumermanagement.css'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
// import Table from '../ReadyComponents/CTable';
import StickyHeadTable from '../ReadyComponents/CTable'
import AutoComplete from '../ReadyComponents/CAutoCompleteBP'
import SelectLabels from '../ReadyComponents/CSelectLabel';
import AddPopup from '../ReadyComponents/ConsumerManagement/AddNewPopUp';
import ConsumerPopUp from '../ReadyComponents/ConsumerManagement/ConsumerPopUp'
import { useEffect, useState } from 'react';
import React from 'react';
import AddConsumer from '../ReadyComponents/ConsumerManagement/AddConsumer';
import ConsumerData from '../ReadyComponents/ConsumerManagement/ConsumerData';
import { Button, TextField, Snackbar, Alert, InputAdornment, FormControl, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GetData from '../../Hook/SampleData';



const ConsumerManagement = ({
  hostLaravel,
  gender, 
  civil_status, 
  usage_type, 
  brand, 
  month, 
  consumersData,
  brgyPrkData
}) => {
  const [page, setPage] = useState(0);
  const [consumerStatus, setConsumerStatus]=useState('Connected')
  let statusColor = '#0ED000'
  if(consumerStatus === 'Connected'){
    statusColor = '#0ED000'
  }else if(consumerStatus === 'Disconnected'){
    statusColor = '#EC2626'
  }else if(consumerStatus === 'Archive'){
    statusColor = '#ECBE26'
  }
  const statusArr = ['Connected', 'Disconnected', 'Archive']
  const [openPopup, setOpenPopup] = useState(false)
  const [consumerPopUp, setConsumerPopup] = useState(false)
  const [consumerInfo, setConsumerInfo] = useState({})
  const [purok, setPurok] = useState(7);
  const [barangay, setBarangay] = useState("");
  const [name, setName] = useState("");

  const [alert, setAlert] = useState(false)
  const [alertType, setAlertType] = useState("warning")
  const [alertText, setAlertText] = useState("")

  const {data:consumer, isPending:conIsPending, error:conError, reload, setReload}= consumersData
  const {data:brgyPrk, isPending:bpIsPending, error:bpError}= brgyPrkData
  //console.log(brgyPrk)


  //StickyBar()
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }

        setAlert(false);
    }

    //Autocomplete - Barangay
    let allbarangay = []
    for (const key in brgyPrk) {
      allbarangay.push(key)
    }
    let allpurok = barangay && brgyPrk ? brgyPrk[barangay].sort() : [];

    allpurok = allpurok.map((p)=>{
        return +p
    })

    allbarangay = allbarangay.sort()
    //StickyTable
    const byStatus = consumer && consumer.filter(c=> c.status === consumerStatus)
    const bCon = consumer && barangay && purok? byStatus.filter((c)=> c.barangay === barangay && (c.purok == purok || purok ==7)):byStatus
    const newCon = bCon? bCon.filter((c)=> `${c.first_name.toLowerCase()} ${c.middle_name && c.middle_name.toLowerCase()} ${c.last_name.toLowerCase()}`.includes(name.toLowerCase())||`${c.consumer_id}`.includes(name)) : bCon
    const columns = [
      { id: 'consumer_id', label: 'Consumer #', minWidth: 120 },
      { id: 'name', label: 'Name', minWidth: 500 },
      { id: 'barangay', label: 'Barangay', minWidth: 200 },
      {
        id: 'purok', 
        label: 'Purok',
        minWidth: 100,
        align: 'center',
      }
    ];
     

    return ( 
        <div className="consumerManagement">
           <div className="container">
           <div className="searchAddBar">
 
           <FormControl sx={{ m: 0, minWidth: 150 }}>
              <Select
                style={{ backgroundColor:statusColor, color:'white', fontWeight:'bold' }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={consumerStatus}
                onChange = {(e)=>{
                  setConsumerStatus(e.target.value)
                }}
              >
                {statusArr && statusArr.map((p)=>
                  <MenuItem value={p} key={p}>{p}</MenuItem>
                )}
              </Select>
            </FormControl>

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
              style={{width:350}}
              onChange={(e)=>{setName(e.target.value); setPage(0)}}
              />

            <AutoComplete  
            width={250} 
            data={barangay}
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
            minWidth={100} 
            m={0} 
            label={'Purok'} 
            allpurok={allpurok}
            barangay={barangay}
            purok={purok} 
            setPurok={setPurok} 
            setPage={setPage}/>

            <Button 
            disabled={conError?true:false || conIsPending}
            variant="contained" 
            style={{width:200, backgroundColor:'rgb(12,20,52)', color:'white', backgroundColor: (conError?true:false || conIsPending)?'rgb(191, 191, 191)':'rgb(12,20,52)'}}
            onClick={()=> {setOpenPopup(true); setConsumerInfo({})}}
            > 
              <PersonAddAltRoundedIcon
              sx={{ marginRight:1}}
              />Add Consumer</Button>
           </div>

           <StickyHeadTable
           page={page}
           setPage={setPage}
           setConsumerPopup={setConsumerPopup}
           setConsumerInfo={setConsumerInfo}
           conIsPending={conIsPending} 
           conError={conError}
           newCon={newCon}
           columns={columns}
           height={550}
           rowPerPage={10}

           />

           <AddPopup
             openPopup={openPopup}
             setOpenPopup={setOpenPopup}
             maxWidth={"md"}
             consumerInfo={consumerInfo}
             >
               <AddConsumer 
               hostLaravel={hostLaravel}
               consumer={consumer}
               conIsPending={conIsPending}
               conError={conError}
               reload={reload}
               setReload={setReload}
               consumersData={consumersData}
               setConsumerPopup={setConsumerPopup}

               setOpenPopup={setOpenPopup}
               allbarangay={allbarangay}
               brgyPrk={brgyPrk}
               brand={brand}
               gender={gender}
               civil_status={civil_status}
               usage_type={usage_type}
               consumerInfo={consumerInfo}
               setConsumerInfo={setConsumerInfo}
               setAlert={setAlert}
               setAlertText={setAlertText}
               setAlertType={setAlertType}

               alert={alert}
               alertText={alertText}
               alertType={alertType}
               handleAlertClose={handleAlertClose}
               />
           </AddPopup>

          <ConsumerPopUp
            consumerPopUp={consumerPopUp}
            setOpenPopup = {setOpenPopup}
            setConsumerPopup={setConsumerPopup}
            consumerInfo={consumerInfo}
            maxWidth={"md"}
            setConsumerInfo={setConsumerInfo}
            >
              <ConsumerData 
               hostLaravel={hostLaravel}
              setConsumerPopup={setConsumerPopup}
              consumerInfo={consumerInfo}
              month={month}
              />

          </ConsumerPopUp>


          <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose} className={'snackbarPopup'}>
                    <Alert
                    onClose={handleAlertClose}  
                    severity={alertType} sx={{ width: '100%' }}
                    >
                    {alertText}
                    </Alert>
                </Snackbar>
           
           </div>
        </div>
     );
}
 
export default ConsumerManagement;