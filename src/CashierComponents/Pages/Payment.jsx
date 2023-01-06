import { Box, Card, Autocomplete, Button, Dialog, DialogTitle, DialogContent, Typography  } from '@mui/material';
import '../../Styles/PageStyles/inquire.css'
import { TextField} from '@mui/material';
import { createFilterOptions } from '@mui/material';
import { useState, useRef } from 'react';
import ReadingTable from '../../Components/ReadyComponents/CReadingTable';
import ReactToPrint from 'react-to-print';
import GetData from '../../Hook/SampleData';
import PaymentInfo from '../ReadyComponents/PaymentInfo';
import Confirmation from '../ReadyComponents/Confirmation';
import { NumericFormat } from 'react-number-format';

const Payment = ({month}) => {

    const consumersData = GetData('http://127.0.0.1:8000/api', '/consumer');
    const readingData = GetData('http://localhost:8001', '/reading');
    const componentRef = useRef()
    const { data:consumer, isPending, error  } = consumersData
    const {data:readings, conIsPending, conError}= readingData

    const [ searchedConsumer, setSearchedConsumer ] = useState("")
    const [ searchedConsumerId, setSearchedConsumerId ] = useState("")
    const [popUp, setPopUp] = useState(false)
    const [confirmPopup, setConfirmPopup] = useState(false)

    const OPTIONS_LIMIT = 8;
    const filterOptions = createFilterOptions({
        limit: OPTIONS_LIMIT
      });
      

    const styles = {
        inquire:{
            color:"grey"
        },
        container:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
        },
        box1:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
        },
        box1_1:{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-around",
            width:580
        },
        box2:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            flex:5,
            width:600,
            height:700,
            color:"rgb(75, 75, 75)",
            margin:"20px"
        },
        box3:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"flex-start",
            height:800,
            width:600,
            padding:"25px 15px"
        },
        box3_1:{
            display:"flex",
            flexDirection:"column",
            alignItems:"flex-start",
            justifyContent:"space-between",
            width:550,
        },
        box3_2:{
            width:550,
        },
        box3_3:{
            padding:5,
            overflow: "hidden",
            overflowY: "scroll",
            height:230,
            marginTop:20
        },
        box3_1_1:{
            padding:"0 15px",
            backgroundColor: searchedConsumer && searchedConsumer.consumer_status==="connected"?"rgb(156, 218, 32)":"rgb(242, 54, 54)",
            color:"white",
            borderRadius:"2px",
        },
        text1:{
            fontSize:60, 
            margin:0, 
            marginTop:"-15px",
            color:"rgb(12,20,52)",
            margin:" 0px 0 10px 0",
        },
        h1:{
            color:"#989898",
            fontSize:20
        },
        h11:{
            margin:0,
            fontSize:30,
            color:"rgb(12,20,52)",
        },
        h12:{
            margin:0,
            fontSize:25,
            color:"rgb(12,20,52)",
        },
        box3text:{
            margin:"5px 0",
        },
        billtextfield:{
            margin:10
        }
    }
    //date sorter
    const sorter = (a, b) => {
        const ayear = new Date(a.date)
        const byear = new Date(b.date)
        if(byear.getFullYear() !== ayear.getFullYear()){
        return   ayear.getFullYear() - byear.getFullYear();
        }else{
        return  ayear.getMonth() - byear.getMonth() ;
        };
    };
    readings && readings.sort(sorter)

    //filter readings - only searched && paid
    const newrb = readings && searchedConsumer? readings.filter((rb)=>{
        console.log(rb.paid)
        return rb.consumerId==searchedConsumer.consumer_id && rb.date_paid === ""
        }):""

    //array of bills
    //add all bill from "arrayOfBill"

    let arrayOfBill = [] 
    newrb && newrb.forEach(bill => {
        if(bill.date_paid ==="") {
            arrayOfBill.push(bill.bill)}
    })
    const sum =  arrayOfBill.reduce((accumulator, value) => {
        return accumulator + value;
   }, 0)
   console.log(sum!==0 && searchedConsumer?false:true)

    return ( 
            <Box className="inquire" sx={{...styles.inquire}}>
                <Box className="container" sx={{...styles.container}}>
                    <Box className="box1" sx={styles.box1}>
                            <h1 style={styles.text1}>PAYMENT</h1>

                        <Box className="box1">
                            <Box style={styles.box1_1}>
                                <Autocomplete
                                    disablePortal
                                    disabled={isPending || error}
                                    getOptionLabel={(option) => `${option.consumer_id} ${option.first_name} ${option.middle_name} ${option.last_name}`}
                                    id="combo-box-demo"
                                    options={consumer ? consumer: []}
                                    filterOptions={filterOptions}                      
                                    sx={{ width: 400 }}
                                    onChange={(event , val)=>{ setSearchedConsumer(val);}}
                                    renderInput={(params) => 
                                    <TextField
                                    {...params} 
                                    label={ isPending?"Loading...":"Search ID Number/Name" }
                                    />}
                                    />
                                    <Button  
                                    variant="contained"
                                    disabled={sum!==0 && searchedConsumer?false:true} 
                                    style={{height:50, width:100, fontSize:15, marginLeft:5, color:'white', backgroundColor:(sum!==0 && searchedConsumer?false:true)?'rgb(191, 191, 191)':'rgb(6, 185, 0)'}}
                                    onClick={()=>setPopUp(true)}
                                    >Pay</Button>

                                    <ReactToPrint
                                    trigger={() => 
                                    <Button  
                                    variant="contained"
                                    disabled={sum!==0 && searchedConsumer?false:true} 
                                    style={{height:50, width:100, fontSize:15, marginLeft:5, color:'white', backgroundColor:(sum!==0 && searchedConsumer?false:true)?'rgb(191, 191, 191)':'rgb(12,20,52)' }}
                                    >Print</Button>}
                                    content={() => componentRef.current}
                                    />
                            </Box>
                        </Box>
                    </Box>
                    <Card style={styles.box2}
                    ref={componentRef}>
                        {searchedConsumer ? 
                        <Box style={styles.box3}>
                            <Box style={styles.box3_1}>
                                <h1 style={styles.h11}>{`${searchedConsumer.consumer_id}`}</h1>
                                <h2 style={styles.h12}>{`${searchedConsumer.first_name} ${searchedConsumer.middle_name} ${searchedConsumer.last_name}`}</h2>
                            </Box>
                            <Box style={styles.box3_2}>
                                <p style={{marginLeft:"1px",...styles.box3text}}>{`${searchedConsumer.barangay}, Purok ${searchedConsumer.purok}`}</p>
                                <strong style={{marginLeft:"1px",...styles.box3text}}>{searchedConsumer.usage_type}</strong>
                            </Box>
                            <Box style={styles.box3_3}>
                                <ReadingTable
                                month={month}
                                newrb={newrb}
                                readings={readings}
                                scale={1}
                                height={230}
                                conIsPending={conIsPending} 
                                conError={conError}
                                />
                            </Box>
                            <h3>Total Billing: {sum}</h3>
                        </Box>:
                        <Box>
                            <h1 style={styles.h1}>SEARCH CONSUMER</h1>
                        </Box>
                        }
                    </Card>
                    <Dialog open={popUp} maxWidth={'xs'} fullWidth >
                    <DialogTitle style={{margin:0,  textAlign:"left",paddingBottom:1}}>
                        <Typography gutterBottom fontWeight={"bold"} fontSize={30} style={{margin:"0 auto", borderBottom:"1px solid gray"}}>
                            Payment
                        </Typography>
                        </DialogTitle>

                        <DialogContent style={{ display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center' }}>
                                    {searchedConsumer && 
                                    <PaymentInfo
                                    searchedConsumer={searchedConsumer}
                                    />
                                    }
                                    <NumericFormat
                                        label="Input Payment" 
                                        variant="outlined" 
                                        placeholder={`Bill: 34`} 
                                        allowNegative={false}
                                        value={""}
                                        //disabled={}
                                        isAllowed={(values) => {
                                        const { value } = values;
                                        return value < 99999 && !value.includes(".");
                                        }}
                                        onChange={(e) =>{
                                            const val = e.target.value
                                        }}
                                        customInput={TextField}
                                        style={styles.billtextfield}
                                        />
                                    <Box style={{  display:'flex', justifyContent:'end', width:400 }}>
                                    <Button
                                    variant="outlined"
                                    disabled={searchedConsumer? false:true} 
                                    style={{height:40, width:80, fontSize:12, margin:2}}
                                    onClick={()=>setPopUp(false)}>
                                    Cancel
                                    </Button>
                                    
                                    <Button  
                                    variant="contained"
                                    disabled={searchedConsumer? false:true} 
                                    style={{height:40, width:100, fontSize:12, margin:2}}
                                    onClick={()=> setConfirmPopup(true)}
                                    >Pay</Button>
                                    </Box>
                        </DialogContent>
                </Dialog>

                <Dialog open={confirmPopup} maxWidth={'xs'} fullWidth >
                    <DialogTitle style={{margin:0,  textAlign:"left",paddingBottom:1}}>
                        <Typography gutterBottom fontWeight={"bold"} fontSize={30} style={{margin:"0 auto"}}>
                            Confirmation
                        </Typography>
                        </DialogTitle>

                        <DialogContent style={{ display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center' }}>
                                    {searchedConsumer && 
                                    <Confirmation
                                    searchedConsumer={searchedConsumer}
                                    />
                                    }
                                    <Box style={{  display:'flex', justifyContent:'end', width:400 }}>
                                    <Button
                                    variant="outlined"
                                    disabled={searchedConsumer? false:true} 
                                    style={{height:40, width:80, fontSize:12, margin:2}}
                                    onClick={()=>setConfirmPopup(false)}>
                                    Cancel
                                    </Button>
                                    
                                    <Button  
                                    variant="contained"
                                    disabled={searchedConsumer? false:true} 
                                    style={{height:40, width:160, fontSize:12, margin:2}}
                                    >Confirm Payment</Button>
                                    </Box>
                        </DialogContent>
                </Dialog>
           
                </Box>
            </Box>
     );
}
 
export default Payment;