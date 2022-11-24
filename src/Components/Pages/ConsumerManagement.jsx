import '../../Styles/PageStyles/consumermanagement.css'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
// import Table from '../ReadyComponents/CTable';
import StickyHeadTable from '../ReadyComponents/CTable'
import AutoComplete from '../ReadyComponents/CAutoComplete'
import SelectLabels from '../ReadyComponents/CSelectLabel';
import AddPopup from '../ReadyComponents/ConsumerManagement/AddNewPopUp';
import ConsumerPopUp from '../ReadyComponents/ConsumerManagement/ConsumerPopUp'
import { useEffect, useState } from 'react';
import React from 'react';
import AddConsumer from '../ReadyComponents/ConsumerManagement/AddConsumer';
import ConsumerData from '../ReadyComponents/ConsumerManagement/ConsumerData';
import { Button, TextField, Snackbar, Alert, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AuthUser from '../../Hook/AuthUser';



const ConsumerManagement = ({
  barangayData, 
  purokData, 
  gender, 
  civil_status, 
  usage_type, 
  brand, 
  result, 
  month, 
  reading, 
  billing
}) => {
  
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

  const {data:readings, isPending:rbIsPending, error:rbError}= reading
  const {data:billings, isPending:billIsPending, error:billError}= billing
  const {data:consumer, isPending:conIsPending, error:conError, reload, setReload}= result


  //getBarangay & Purok
  const {http} = AuthUser();
  const [brgyPrk, setBrgyPrk] = useState();
  useEffect(()=>{
    fetchBrgyPrk()
  },[])
  const fetchBrgyPrk = () => {
    http.get('/brgyprk').then((res)=>{
      setBrgyPrk(res.data)
    })
  }


  //StickyBar()
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }

        setAlert(false);
    }

    //Autocomple - Barangay
    const allbarangay = []
    for (const key in brgyPrk) {
      allbarangay.push(key)
    }
    let allpurok = barangay && brgyPrk ? brgyPrk[barangay].sort() : [];

    allpurok = allpurok.map((p)=>{
        return +p
    })
  
    //StickyTable
    const bCon = consumer&& barangay && purok? consumer.filter((c)=> c.barangay === barangay && (c.purok === purok || purok ===7)):consumer
    const newCon = bCon? bCon.filter((c)=> `${c.first_name.toLowerCase()} ${c.middle_name.toLowerCase()} ${c.last_name.toLowerCase()}`.includes(name.toLowerCase())||`${c.id}`.includes(name)) : bCon
    const columns = [
      { id: 'id', label: 'Consumer #', minWidth: 120 },
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
            dataSetter={setBarangay}
            buttonDisabler={setPurok}
            pageSetter={setPage}
            autoComHeight={500}
            options={allbarangay}
            />
            
            <SelectLabels 
            minWidth={100} 
            m={0} 
            label={'Purok'} 
            purokData={allpurok}
            barangay={barangay}
            purok={purok} 
            setPurok={setPurok} 
            setPage={setPage}/>

            <Button 
            disabled={conError?true:false || conIsPending}
            variant="outlined" 
            style={{width:200}}
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
           />

           <AddPopup
             openPopup={openPopup}
             setOpenPopup={setOpenPopup}
             maxWidth={"md"}
             consumerInfo={consumerInfo}
             >
               <AddConsumer 
               consumer={consumer}
               conIsPending={conIsPending}
               conError={conError}
               reload={reload}
               setReload={setReload}

               setOpenPopup={setOpenPopup}
               barangayData={barangayData}
               purokData={purokData}
               brand={brand}
               gender={gender}
               civil_status={civil_status}
               usage_type={usage_type}
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
              barangayData={barangayData} 
              result={result}
              consumerInfo={consumerInfo}
              month={month}
              readings={readings}
              billings={billings}
              rbIsPending={rbIsPending}
              rbError={rbError}
              />

          </ConsumerPopUp>


          <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose}>
                    <Alert
                    onClose={handleAlertClose}  
                    severity={alertType} sx={{ width: '100%' }}
                    style={{zIndex:6}}>
                    {alertText}
                    </Alert>
                </Snackbar>
           
           </div>
        </div>
     );
}
 
export default ConsumerManagement;