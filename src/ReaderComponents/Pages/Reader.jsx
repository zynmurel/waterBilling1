import '../../Styles/PageStyles/consumermanagement.css'
import '../../Styles/PageStyles/home.css'
import '../../App.css'
import axios from "axios"
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
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
import { Box, Button, Dialog, DialogTitle, DialogContent, Typography, TextField, Snackbar, Alert, InputAdornment  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GetData from '../../Hook/SampleData';
import AuthUser from '../../Hook/AuthUser';


 
const Reader = ({
  hostJson,
  hostLaravel,
  reading,
}) => {

  //Date to Timestamp Format
  const date = new Date()
  const datum = Date.parse(date)

  const { getUser } = AuthUser();
  const reader = getUser()
   const consumersData = GetData(`${hostLaravel}/api`, '/consumer');
  const brgyPrkData = GetData(`${hostLaravel}/api`, '/brgyprk');
  
  const [page, setPage] = useState(0);
  const [popUp, setPopUp] = useState(false)
  const [inputReading, setInputReading] = useState(null)

  const [consumerInfo, setConsumerInfo] = useState({})

  const {data:consumer, isPending:conIsPending, error:conError}= consumersData
  const {data:brgyPrk, isPending:bpIsPending, error:bpError}= brgyPrkData
  
  const  readingInfo = GetData(hostJson, `/PastReadings${consumerInfo && '?id='}${consumerInfo && consumerInfo.consumer_id}`) 


  const {data:pastReading, isPending:pastReadingIsPending, error:pastReadingError, reload, setReload}= readingInfo;
  console.log(pastReading)
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
  const [purok, setPurok] = useState(7);
  const [barangay, setBarangay] = useState("");
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
  
    //StickyTable
    const bCon = consumer && barangay && purok? consumer.filter((c)=> c.barangay === barangay && (c.purok === purok || purok ===7)):consumer
    const newCon = bCon? bCon.filter((c)=> `${c.first_name.toLowerCase()} ${c.middle_name.toLowerCase()} ${c.last_name.toLowerCase()}`.includes(name.toLowerCase())||`${c.consumer_id}`.includes(name)) : bCon
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

    //Submit Reading function
    const submitReading = () => {
    //   http.post('/reading', {
    //     reader_id:1,
    //         consumer_id:3,
    //         service_period_id:12,
    //         previous_reading:0,
    //         present_reading:12,
    //         reading_date:1642118400
    // }).then((res)=>{
    //     console.log(res.message)
    //   }).catch((err)=>{
    //       console.log(err)
    //   })

    const reading = {
              reader_id: reader.user_id,
              consumer_id: consumerInfo.consumer_id,
              service_period_id:12,
              previous_reading:0,
              present_reading: inputReading,
              reading_date:datum/1000
      };
    const headers = { 
      'Content-type' : 'application/json',
      'Accept' : 'application/json',
    };
    axios.post(`${hostLaravel}/api/reading`, reading, { headers })
        .then(response => console.log(response))
        .catch(error => {
          console.error('There was an error!', error);
      });
    }
     

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
              <AutoComplete  
            width={'100%'} 
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
            minWidth={'100%'} 
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
           {readingInfo!==undefined && readingInfo.data && 
           <Dialog open={popUp} maxWidth={'xs'} fullWidth className='readerDialog'>
                <DialogTitle style={{margin:0,  textAlign:"left",paddingBottom:1}}>
                    <Typography gutterBottom fontWeight={"bold"} fontSize={30} style={{margin:"0 auto", borderBottom:"1px solid gray"}}>
                        {consumerInfo.consumer_id}
                    </Typography>
                    </DialogTitle>

                    <DialogContent style={{ display:'flex', justifyContent:'center', flexDirection:'column' }}>
                    <Box>
                    <h3 style={{ margin:0, marginTop:5 }}>{`${consumerInfo.first_name} ${consumerInfo.middle_name} ${consumerInfo.last_name}`}</h3>
                    <p style={{ margin:0 }}>{`${consumerInfo.usage_type}`}</p>
                    <p style={{ margin:0 }}>{`${consumerInfo.barangay}`}</p>
                    <p style={{ margin:0 }}>{`Purok ${consumerInfo.purok}`}</p>
                    <br />
                    <h4 style={{ margin:0 }}>Past Reading:</h4> 

                    {consumerInfo && pastReading.length!==0 && !pastReadingError && !pastReadingIsPending && 
                    <Box style={{display:"flex", justifyContent:"left", alignItems:"left", flexDirection:"column"}}>
                      <p style={styles.para}>{`Reading: ${pastReading[0].past_reading}`}</p>
                      <p style={styles.para}>{`Month: ${pastReading[0].month}`}</p>
                      <p style={styles.para}>{`Year: ${pastReading[0].year}`}</p> 
                      </Box>
                    }

                    {pastReadingIsPending && 
                    <Box style={{color:"gray", display:"flex", justifyContent:"left", alignItems:"center"}}>Loading...</Box>
                    }

                    {pastReadingError && <Box style={{color:"rgb(255, 82, 82)", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <h3>Failed To Fetch Data</h3></Box>
                    }

                    {reading && !pastReadingError && !pastReading.past_reading && 
                    <Box style={{color:"gray", display:"flex", justifyContent:"center", alignItems:"center"}}><h3>No Past Reading</h3></Box>
                    }

                    <NumericFormat
                            label="Input new reading" 
                            variant="outlined" 
                            placeholder={`ex: ${pastReading.length!==0 && pastReading[0].past_reading+1}`} 
                            allowNegative={false}
                            value={inputReading}
                            //disabled={}
                            isAllowed={(values) => {
                              const { value } = values;
                              return value < 99999 && !value.includes(".");
                            }}
                            onChange={(e) =>{
                                const val = e.target.value
                                setInputReading(val)
                            }}
                            customInput={TextField}
                            style={styles.textfield}
                            disabled={(pastReading.length===0 || pastReadingIsPending || pastReadingError)?true:false}
                            />

                    { ( pastReading.length!==0 && inputReading>pastReading[0].past_reading?false:true && inputReading!==null && consumerInfo &&!pastReadingError && !pastReadingIsPending ) ?//inputReading!==null &&
                    <Box style={{display:"flex", justifyContent:"center", alignItems:"center", color:"red", fontSize:12}}>{"Reading must not be equals or below  "+pastReading[0].past_reading}</Box>
                    :<Box style={{display:"flex", justifyContent:"center", alignItems:"center", color:"gray", fontSize:12}}>{""}</Box>
                    }
                    
                      
                      <Box style={{  display:'flex', justifyContent:'end' }}>
                      <Button
                                variant="outlined"
                                disabled={consumerInfo? false:true} 
                                style={{height:40, width:100, fontSize:12, margin:5}}
                                onClick={()=>{
                                  setPopUp(false);
                                  setInputReading(null);
                                }}>
                                Cancel
                                </Button>
                                
                                <Button  
                                variant="contained"
                                disabled={( pastReadingIsPending || pastReadingError || pastReading.length === 0 || inputReading===null || inputReading.length===0)? true:false} 
                                style={{height:40, width:120, fontSize:12, margin:5}}
                                onClick={()=>submitReading()}
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