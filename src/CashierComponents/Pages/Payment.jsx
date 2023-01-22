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

const Payment = ({month, hostJson, hostLaravel}) => {
    console.log(hostJson )
    console.log(hostLaravel)
    const consumersData = GetData(`${hostLaravel}/api`, '/consumer');
    const readingData = GetData(hostJson, '/reading');
    const componentRef = useRef()
    const { data:consumer, isPending, error  } = consumersData

    const [ searchedConsumer, setSearchedConsumer ] = useState({})

    const readingBillingRecords =  GetData(hostLaravel, `/api/inquire/${Object.keys(searchedConsumer).length!==0?searchedConsumer.user_id:1}`);
    const { data:bill, isPending:billIsPending, error:billError , reload, setReload } = readingBillingRecords;
    const [popUp, setPopUp] = useState(false)
    const [confirmPopup, setConfirmPopup] = useState(false)

    const isBill = Object.keys(searchedConsumer).length!==0 && bill.billing.billing ? Object.keys(bill.billing.billing).length!==0:false
    const isReading = Object.keys(searchedConsumer).length!==0 && bill.billing.payment? Object.keys(bill.billing.payment).length!==0:false
    const shortCutBill = isBill && bill.billing.billing[0]
    const shortCutRead = isBill && bill.billing.reading
    const shortCutPay = isBill && bill.billing.payment[0]

    const totalBilling = ((isBill ? shortCutBill.previous_bill - shortCutBill.previous_payment:0))+(isBill ? shortCutBill.present_bill:0)+(isBill ? shortCutBill.penalty:0)
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
            justifyContent:"space-between",
            width:580,
            alignItems:'center'
        },
        box2:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            flex:5,
            width:450,
            color:"rgb(75, 75, 75)",
            margin:"0 20px 20px 20px",
            backgroundColor:'white'
        },
        box3:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"flex-start",
            width:800,
            padding:"25px 15px"
        },
        box3_1:{
            display:"flex",
            flexDirection:"column",
            alignItems:"flex-start",
            justifyContent:"space-between",
            width:350,
        },
        box3_2:{
            width:350,
        },
        box3_3:{
            padding:5,
            overflow: "hidden",
            overflowY: "scroll",
            height:300,
            marginTop:20
        },
        box3_3_3:{
            display:"flex",
            flexDirection:"row",
            alignItems:"start",
            justifyContent:"space-between",
            width:650,
        },
        box3_1_1:{
            padding:"0 15px",
            backgroundColor: searchedConsumer && searchedConsumer.status==="Connected"?"rgb(156, 218, 32)":"rgb(242, 54, 54)",
            color:"white",
            borderRadius:"2px",
        },
        text1:{
            fontSize:50, 
            color:"rgb(12,20,52)",
            margin:" 0px 0 20px 0",
        },
        h1:{
            color:"#989898",
            fontSize:20
        },
        herror:{
            color:"red",
            fontSize:20
        },
        h11:{
            margin:0,
            fontSize:25,
            color:"rgb(12,20,52)",
        },
        box3text:{
            margin:"5px 0",
        }
    }


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
                                    sx={{ width: 400, height:55 }}
                                    onChange={(event, val)=>{ setSearchedConsumer(val?val:{}); setReload(reload?false:true) }}
                                    renderInput={(params) => 
                                    <TextField
                                    {...params} 
                                    label={ isPending?"Loading...":"Search ID Number/Name" }
                                    />}
                                    />
                                    <Button  
                                    variant="contained"
                                    style={{height:50, width:100, fontSize:15, marginLeft:5, color:'white', backgroundColor:(totalBilling ===0 || Object.keys(searchedConsumer).length===0)?'rgb(191, 191, 191)':'rgb(6, 185, 0)'}}
                                    onClick={()=>setPopUp(true)}
                                    disabled={totalBilling ===0 || Object.keys(searchedConsumer).length===0 || billIsPending}
                                    >Pay</Button>

                                    <ReactToPrint
                                    trigger={() => 
                                    <Button  
                                    variant="contained"
                                    disabled={totalBilling ===0 || Object.keys(searchedConsumer).length===0 || billIsPending }
                                    style={{height:50, width:100, fontSize:15, marginLeft:5, color:'white', backgroundColor:(totalBilling ===0 || Object.keys(searchedConsumer).length===0)?'rgb(191, 191, 191)':'rgb(12,20,52)' }}
                                    >Print</Button>}
                                    content={() => componentRef.current}
                                    />
                            </Box>
                        </Box>
                    </Box>
                    <Box style={styles.box2} ref={componentRef}>
                    {Object.keys(searchedConsumer).length!==0 && bill!==null && !billIsPending &&
                        <Box style={styles.box3}>
                            <Box style={styles.box3_1}>
                                <h1 style={{ fontSize:23, margin:"0 auto 20px auto", fontFamily:"'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif" }}>BALILIHAN WATER BILLING</h1>
                                <h1 style={styles.h11}>{bill.billing.consumer_id}</h1>
                            </Box>
                            <Box style={styles.box3_2}>
                                <h2 style={{ ...styles.box3text, margin:0 }}>{`${bill.billing.consumer_name}`}</h2>
                                <p style={{marginLeft:"1px",...styles.box3text}}>{`${bill.billing.barangay}, Purok ${bill.newReading.purok}`}</p>
                                <p style={{marginLeft:"1px",...styles.box3text}}><strong >{bill.billing.usage_type}</strong></p>
                                <p style={{marginLeft:"1px",...styles.box3text}}><strong >{bill.billing.service_period}</strong></p>
                                <div style={{ margin:"15px 0" }}>
                                <p style={{marginLeft:"1px",...styles.box3text}}><strong >Reading: </strong></p>
                                <p style={{marginLeft:"1px",...styles.box3text}}>Previous:{ bill.billing.reading ? bill.billing.reading.previous_reading: " none"}</p>
                                <p style={{marginLeft:"1px",...styles.box3text}}>Present:{ bill.billing.reading ? bill.billing.reading.present_reading:" none"}</p>
                                <p style={{marginLeft:"1px",...styles.box3text}}>Total:{ bill.billing.reading ? (bill.billing.reading.present_reading - bill.billing.reading.previous_reading):" none" }</p>
                                </div>

                                <div style={{ margin:"15px 0" }}>
                                <p style={{marginLeft:"1px",...styles.box3text}}><strong >Billing: </strong></p>
                                <p style={{marginLeft:"1px",...styles.box3text}}>Remaining Bill: ₱{isBill ? (shortCutBill.previous_bill - shortCutBill.previous_payment):0}</p>
                                <p style={{marginLeft:"1px",...styles.box3text}}>Present Bill: ₱{isBill ? shortCutBill.present_bill:0}</p>
                                <p style={{marginLeft:"1px",...styles.box3text}}>Penalty: ₱{isBill ? shortCutBill.penalty:0}</p>
                                </div>
                                <div style={{ margin:"20px 0", display:'flex', alignItems:'center', flexDirection:'column' }}>
                                <p style={{marginLeft:"1px",...styles.box3text, textAlign:"center", width:150, margin:0}}><strong >{`₱${totalBilling}`}</strong></p>
                                <p style={{marginLeft:"1px",...styles.box3text, borderTop:"solid black", width:150, textAlign:"center", padding:5}}><strong >Total Bill </strong></p>
                                </div>
                            </Box>
                        </Box>}
                        { Object.keys(searchedConsumer).length===0 &&
                        <Box>
                            <h1 style={styles.h1}>SEARCH CONSUMER</h1>
                        </Box>}
                        {
                            billIsPending && Object.keys(searchedConsumer).length!==0 && 
                            <Box>
                            <h1 style={styles.h1}>LOADING...</h1>
                        </Box>
                        }
                        {
                            billError && 
                            <Box>
                            <h1 style={styles.herror}>Something went wrong...</h1>
                        </Box>
                        }
                    </Box>
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
                                    onClick={()=>{
                                        setPopUp(false);
                                        setSearchedConsumer({});
                                    }
                                    }>
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