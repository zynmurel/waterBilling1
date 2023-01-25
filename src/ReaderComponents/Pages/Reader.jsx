import '../../Styles/PageStyles/consumermanagement.css'
import '../../Styles/PageStyles/home.css'
import '../../App.css'
import axios from "axios"
import { NumericFormat } from 'react-number-format';
import ReadingTable from '../../ReaderComponents/ReadyComponents/ReadingTable'
import AutoComplete from '../../Components/ReadyComponents/CAutoComplete'
import SelectLabels from '../../Components/ReadyComponents/CSelectLabel';
//import AddPopup from '../ReadyComponents/ConsumerManagement/AddNewPopUp';
//import ConsumerPopUp from '../ReadyComponents/ConsumerManagement/ConsumerPopUp'
import { useEffect, useState } from 'react';
import React from 'react';
//import AddConsumer from '../ReadyComponents/ConsumerManagement/AddConsumer';
//import ConsumerData from '../ReadyComponents/ConsumerManagement/ConsumerData';
import { Box, Button, Dialog, DialogTitle, DialogContent, Typography, TextField, Snackbar, Alert, InputAdornment, Autocomplete  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GetData from '../../Hook/SampleData';
import AuthUser from '../../Hook/AuthUser';
import BillingPopup from '../ReadyComponents/BillingPopUp';


 
const Reader = ({
  hostJson,
  hostLaravel,
  reading,
  barangay,
  purok,
  setBarangay,
  setPurok,
  consumersData
}) => {


  //Date to Timestamp Format
  const date = new Date()
  const datum = Date.parse(date)

  const { getUser } = AuthUser();
  const reader = getUser()
  const brgyPrkData = GetData(`${hostLaravel}/api`, '/brgyprk');
  
  const [page, setPage] = useState(0);
  const [popUp, setPopUp] = useState(false)
  const [inputReading, setInputReading] = useState(null)

  const [consumerInfo, setConsumerInfo] = useState({})

  const {data, isPending:conIsPending, error:conError, reload, setReload}= consumersData
  const {data:brgyPrk, isPending:bpIsPending, error:bpError}= brgyPrkData

  const consumer = consumersData.data && data.filter((con)=>(
    con.service_period_id!=con.service_period_id_to_be
  ))
      //date sorter
    const sorter = (a, b) => {
        const ayear = new Date(a.date)
        const byear = new Date(b.date)
        if(byear.getFullYear() !== ayear.getFullYear()){
        return   byear.getFullYear() - ayear.getFullYear();
        }else{
        return  byear.getMonth() - ayear.getMonth() ;
        };
    };
  const [name, setName] = useState("");

  const [alert, setAlert] = useState(false)
  const [alertType, setAlertType] = useState("warning")
  const [alertText, setAlertText] = useState("")

  const styles = {
    textfield:{
      display:"flex", 
      justifyContent:"center", 
      alignItems:"center",
      width:180,
      margin:"20px auto 5px auto"
    },
    para:{
      margin:0
    }
  }

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
    console.log(consumer && consumer)
  
    //StickyTable
    const bCon = consumer && barangay && purok? consumer.filter((c)=> c.barangay === barangay && (c.purok == purok || purok ==7)):consumer
    let newCon = bCon? bCon.filter((c)=> `${c.first_name.toLowerCase()} ${c.middle_name.toLowerCase()} ${c.last_name.toLowerCase()}`.includes(name.toLowerCase())||`${c.consumer_id}`.includes(name)) : bCon
    newCon = newCon && newCon.filter((con)=>(
      con.service_period_id !== con.service_period_id_to_be
    ))
    const columns = [
      { id: 'consumer_id', label: 'Consumer #', minWidth: 100 },
      { id: 'name', label: 'Name', minWidth: 130 },
      { id: 'barangay', label: 'Barangay', minWidth: 120 },
      {
        id: 'purok',
        label: 'Purok',
        minWidth: 80,
        align: 'center',
      }
    ];
    console.log(newCon)

     

    return ( 
        <div className="consumerManagement">
           <div className="container" style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
            <h1 className="box1">READER</h1>
           <div className='searchBar'>
           <div className="searchAddBar1">
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
              style={{width:'100%'}}
              onChange={(e)=>{setName(e.target.value); setPage(0)}}
              />
           </div>
           
            <div className="searchAddBar2">
            <Autocomplete
              value={barangay}
              ListboxProps={{ style: { maxHeight: 500 }, position: "top-start" }}
              disabled={bpError?true:false || bpIsPending}
              id="combo-box-demo"
              options={allbarangay? allbarangay : []}
              sx={{ width: 300, margin:"0 2px 0 2px" }}
              onChange={(event , val)=>{ setBarangay(val); setPage(0);  }}
              renderInput={(params) => <TextField {...params} label={"Barangay"} />}
            />
            
            <SelectLabels 
            minWidth={'30%'} 
            m={0} 
            label={'Purok'} 
            allpurok={allpurok}
            barangay={barangay}
            purok={purok} 
            setPurok={setPurok} 
            setPage={setPage}/>
            </div>
           </div>

          <div style={{ display:"flex", justifyContent:"center" }} className={'readingTable'}>
           <ReadingTable
           reload={reload}
           setReload={setReload}
           page={page}
           setPage={setPage}
           setPopUp={setPopUp}
           setConsumerInfo={setConsumerInfo}
           conIsPending={conIsPending} 
           conError={conError}
           newCon={newCon}
           columns={columns}
           height={490}
           rowPerPage={8}
           />
           </div>
           {consumerInfo && 
           <Dialog open={popUp} maxWidth={'xs'} className='readerDialog'>
                <DialogTitle style={{margin:0,  textAlign:"left",paddingBottom:1}}>
                    <Typography gutterBottom fontWeight={"bold"} fontSize={30} style={{margin:"0 auto", borderBottom:"1px solid gray"}}>
                        {consumerInfo.consumer_id}
                    </Typography>
                    </DialogTitle>

                    <DialogContent style={{ display:'flex', justifyContent:'center', flexDirection:'column' }}>
                        <BillingPopup
                        alert={alert}
                        setAlert={setAlert}
                        alertType={alertType}
                        setAlertType={setAlertType}
                        alertText={alertText}
                        setAlertText={setAlertText}
                        handleAlertClose={handleAlertClose}
                        setPopUp={setPopUp}
                        consumerInfo={consumerInfo}
                        hostLaravel={hostLaravel}
                        setConsumerInfo={setConsumerInfo}
                        reload={reload}
                        setReload={setReload}
                        />
                    </DialogContent>
                </Dialog>}


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
 
export default Reader;