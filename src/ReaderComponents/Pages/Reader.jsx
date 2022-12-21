import '../../Styles/PageStyles/consumermanagement.css'
import '../../Styles/PageStyles/home.css'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import ReadingTable from '../../ReaderComponents/ReadyComponents/ReadingTable'
import AutoComplete from '../../Components/ReadyComponents/CAutoComplete'
import SelectLabels from '../../Components/ReadyComponents/CSelectLabel';
//import AddPopup from '../ReadyComponents/ConsumerManagement/AddNewPopUp';
//import ConsumerPopUp from '../ReadyComponents/ConsumerManagement/ConsumerPopUp'
import { useEffect, useState } from 'react';
import React from 'react';
//import AddConsumer from '../ReadyComponents/ConsumerManagement/AddConsumer';
//import ConsumerData from '../ReadyComponents/ConsumerManagement/ConsumerData';
import { Box, Button, Dialog, DialogTitle, DialogContent, Typography, TextField, Snackbar, Alert, InputAdornment  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GetData from '../../Hook/SampleData';



const Reader = ({
  gender, 
  civil_status, 
  usage_type, 
  brand, 
  month, 
  reading,
}) => {
  
  const consumersData = GetData('http://localhost:8001', '/consumers');
  const brgyPrkData = GetData('http://127.0.0.1:8000/api', '/brgyprk');
  const sample = GetData('http://localhost:8001', '/reading?consumerId=10002')
  console.log(sample && sample.data)
  const [page, setPage] = useState(0);
  const [popUp, setPopUp] = useState(false)

  const [consumerInfo, setConsumerInfo] = useState({})
  const  readingInfo = GetData('http://localhost:8001', `/reading?consumerId=${consumerInfo.user_key?consumerInfo.user_key:10001}`)
  const {data:readings, isPending:rbIsPending, error:rbError, reload, setReload}= readingInfo
  const reloadToggle = () => {
    setReload(reload? false:true)
  }
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
    readings && readings.sort(sorter)
  const [purok, setPurok] = useState(7);
  const [barangay, setBarangay] = useState("");
  const [name, setName] = useState("");

  const [alert, setAlert] = useState(false)
  const [alertType, setAlertType] = useState("warning")
  const [alertText, setAlertText] = useState("")
  const {data:consumer, isPending:conIsPending, error:conError}= consumersData
  const {data:brgyPrk, isPending:bpIsPending, error:bpError}= brgyPrkData

  const styles = {
    h1:{
        fontSize:60,
        color:"rgb(12,20,52)",
        marginBottom:10,
        marginTop:"-15px",
        display:"flex",
        justifyContent:"center"
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
  
    //StickyTable
    const bCon = consumer && barangay && purok? consumer.filter((c)=> c.barangay === barangay && (c.purok === purok || purok ===7)):consumer
    const newCon = bCon? bCon.filter((c)=> `${c.first_name.toLowerCase()} ${c.middle_name.toLowerCase()} ${c.last_name.toLowerCase()}`.includes(name.toLowerCase())||`${c.id}`.includes(name)) : bCon
    const columns = [
      { id: 'user_key', label: 'Consumer #', minWidth: 120 },
      { id: 'name', label: 'Name', minWidth: 300 },
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
            <h1 className="box1" style={{ ...styles.h1 }}>READER</h1>
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
           </div>

          <div style={{ width:'100%', display:"flex", justifyContent:"center" }}>
           <ReadingTable
           reloadToggle={reloadToggle}
           page={page}
           setPage={setPage}
           setPopUp={setPopUp}
           setConsumerInfo={setConsumerInfo}
           conIsPending={conIsPending} 
           conError={conError}
           newCon={newCon}
           columns={columns}
           height={490}
           rowPerPage={7}
           />
           </div>
           {readingInfo!==undefined && readingInfo.data && <Dialog open={popUp} maxWidth={'xs'} fullWidth >
                <DialogTitle style={{margin:0,  textAlign:"left",paddingBottom:1}}>
                    <Typography gutterBottom fontWeight={"bold"} fontSize={30} style={{margin:"0 auto", borderBottom:"1px solid gray"}}>
                        {consumerInfo.user_key}
                    </Typography>
                    </DialogTitle>

                    <DialogContent style={{ display:'flex', justifyContent:'center', flexDirection:'column' }}>
                    <Box className='content'>
                    <h3 style={{ margin:0, marginTop:5 }}>{`${consumerInfo.first_name} ${consumerInfo.middle_name} ${consumerInfo.last_name}`}</h3>
                    <p style={{ margin:0 }}>{`${consumerInfo.usage_type}`}</p>
                    <p style={{ margin:0 }}>{`${consumerInfo.barangay}`}</p>
                    <p style={{ margin:0 }}>{`Purok ${consumerInfo.purok}`}</p>
                    <br />
                    <h4 style={{ margin:0 }}>Past Reading:</h4>
                    {readings && <p>{readings[0].service_period}</p>}
                    
                      
                      <Box style={{  display:'flex', justifyContent:'end', width:400 }}>
                      <Button
                                variant="outlined"
                                disabled={consumerInfo? false:true} 
                                style={{height:40, width:100, fontSize:12, margin:5}}
                                onClick={()=>setPopUp(false)}>
                                Cancel
                                </Button>
                                
                                <Button  
                                variant="contained"
                                disabled={consumerInfo? false:true} 
                                style={{height:40, width:120, fontSize:12, margin:5}}
                                >Submit</Button>
                      </Box>
                    </Box>
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