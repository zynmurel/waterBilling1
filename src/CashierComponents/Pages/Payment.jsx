import { Box, Card, Autocomplete, Button, Dialog, DialogTitle, DialogContent, Typography, Snackbar, Alert  } from '@mui/material';
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
import axios from 'axios';
import AuthUser from '../../Hook/AuthUser';

const Payment = ({ hostLaravel, month}) => {
    const {getUser} = AuthUser();
    const dateNow = new Date()
    let total = {total_amount:0, total_penalty:0}

    var moment = require('moment');
    const date = new Date()
    const datenowtimestamp = moment(date).unix();

    const consumersData = GetData(`${hostLaravel}/api`, '/consumer');
    const componentRef = useRef()
    const { data:consumer, isPending, error  } = consumersData

    const [ searchedConsumer, setSearchedConsumer ] = useState({})

    const readingBillingRecords =  GetData(hostLaravel, `/api/inquire/${Object.keys(searchedConsumer).length!==0?searchedConsumer.consumer_id:2}`);
    const { data:bill, isPending:billIsPending, error:billError , reload, setReload } = readingBillingRecords;
    const [popUp, setPopUp] = useState(false)
    const [confirmPopup, setConfirmPopup] = useState(false)
    console.log(searchedConsumer)
    
    //const isBill = Object.keys(searchedConsumer).length!==0 && bill.billing.billing ? Object.keys(bill.billing.billing).length!==0:false
    //const isReading = Object.keys(searchedConsumer).length!==0 && bill.billing.payment? Object.keys(bill.billing.payment).length!==0:false
    //const shortCutBill = bill && bill.listofbill[0]
    //const shortCutRead = isBill && bill.billing.reading
    //const shortCutPay = isBill && bill.billing.payment[0]

    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("warning")
    const [alertText, setAlertText] = useState("")
      //StickyBar()
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }

        setAlert(false);
    }
    
    //const toPay = ((isBill ? shortCutBill.previous_bill:0))+(isBill ? shortCutBill.present_bill:0)+(isBill ? shortCutBill.penalty:0)
    const [ payment, setPayment ] = useState(0)
    const OPTIONS_LIMIT = 8;
    const filterOptions = createFilterOptions({
        limit: OPTIONS_LIMIT
      });
    console.log(bill && bill)

    const handleSubmit = (id) => {
        const headers = { 
            'Content-type' : 'application/json',
            'Accept' : 'application/json',
          };
          const data = {
            cashier_id: getUser().user_id,
            consumer_id: id,
            date_paid: datenowtimestamp,
            amount_paid: payment
          }
          axios.post(`${hostLaravel}/api/storePayment/${id}`, data, { headers })
              .then(response => {
                console.log(response)
                setConfirmPopup(false)
                setPayment(0)
                setPopUp(false);
                setReload(reload? false:true)
                setAlert(true)
                setAlertText('Payment Success!')
                setAlertType("success")
            })
              .catch(error => {
                console.error('There was an error!', error);
                setAlert(true)
                setAlertText(error.response.data.message)
                setAlertType("error")
            });
    }
      

    const reversedbill = Object.keys(searchedConsumer).length!==0 && bill!==null && !billIsPending && bill.listofbill ? bill.listofbill.sort((a, b)=> a.billing_id - b.billing_id) : []
    console.log(reversedbill)
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
            width:500,
            color:"rgb(75, 75, 75)",
            margin:"0 20px 20px 20px",
            backgroundColor:'white',
            minHeight:400,
            paddingBottom:40
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
            justifyContent:"center",
            width:450,
            flexDirection:'row'
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
        },
        billtextfield:{
            margin:'0 0 10px 0'
        },
        topTextInquire:{
            justifyContent:'center',
            alignItems:'center',
        },
        topTextInquire2:{
            flexDirection:'row',
            width:400,
            marginTop:10
        },
        topofboxofreading:{
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'row',
            borderStyle:'solid',
            borderWidth:1,
            borderColor:'black',
            padding:8,
            width:150
        },
        topofboxofreading2:{
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'row',
            borderStyle:'solid',
            borderWidth:1,
            borderColor:'black',
            padding:5,
            width:80,
            marginLeft:-1,
            textAlign:'center'
        },
        containerofboxofreading:{
            display:'flex',
            flexDirection:'row'
        },
        readingrow1col1:{
            borderStyle:'solid',
            borderWidth:1,
            borderColor:'black',
            padding:5,
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
                                    style={{height:50, width:100, fontSize:15, marginLeft:5, color:'white', backgroundColor:((bill && (bill.listofbill.length!==0 &&bill.listofbill[bill.listofbill.length-1].present_bill+bill.listofbill[bill.listofbill.length-1].previous_bill+bill.listofbill[bill.listofbill.length-1].penalty))+(bill &&( bill.bal===null?0:bill.bal)) ===0 || Object.keys(searchedConsumer).length===0)?'rgb(191, 191, 191)':'rgb(6, 185, 0)'}}
                                    onClick={()=>setPopUp(true)}
                                    disabled={(bill && (bill.listofbill.length!==0 &&bill.listofbill[bill.listofbill.length-1].present_bill+bill.listofbill[bill.listofbill.length-1].previous_bill+bill.listofbill[bill.listofbill.length-1].penalty))+(bill &&( bill.bal===null?0:bill.bal)) ===0 || Object.keys(searchedConsumer).length===0 || billIsPending}
                                    >Pay</Button>

                                    <ReactToPrint
                                    trigger={() => 
                                    <Button  
                                    variant="contained"
                                    disabled={ Object.keys(searchedConsumer).length===0 || billIsPending }
                                    style={{height:50, width:100, fontSize:15, marginLeft:5, color:'white', backgroundColor:(Object.keys(searchedConsumer).length===0)?'rgb(191, 191, 191)':'rgb(12,20,52)' }}
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
                                <img src='/balilihan-logo.png' alt='balilihanlogo' width={50} style={{marginLeft:-50, marginRight:20}}/>
                                <div style={styles.topTextInquire}>
                                <h1 style={{ fontSize:18, margin:"0 auto 0px auto",textAlign:'center', fontFamily:"'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif" }}>BALILIHAN WATERWORKS SYSTEM</h1>
                                <h1 style={{ fontSize:18, margin:"0 auto 0px auto",textAlign:'center', fontFamily:"'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif" }}>LGU - BALILIHAN</h1>
                                </div>
                            </Box>
                            <Box style={styles.topTextInquire2}>
                                <p style={{ margin:0 }}>WATER BILL &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;{` Date: `}<span style={{ textDecoration:'underline' }}>{`${month[dateNow.getMonth()]} ${dateNow.getDate()}, ${dateNow.getFullYear()}`}</span></p>
                            </Box>
                            <Box style={styles.topTextInquire2}>
                                <p style={{ margin:2 }}>{`Consumer's ID: `}<span style={{ textDecoration:'underline' }}>{`${bill.billing.consumer_id}`}</span></p>
                                <p style={{ margin:2 }}>{`Consumer's Name: `}<span style={{ textDecoration:'underline' }}>{`${bill.billing.consumer_name}`}</span></p>
                                <p style={{ margin:2 }}>{`Barangay: `}<span style={{ textDecoration:'underline' }}>{`${bill.billing.barangay} - Purok ${bill.billing.purok}`}</span></p>
                            </Box>
                            
                            
                            <>
                            <p style={{ width:420, marginBottom:2}}>FOR THE MONTH</p>
                            <Box style={styles.containerofboxofreading}>
                                <div style={styles.topofboxofreading}>
                                        MONTH/YEAR
                                </div>
                                <div style={styles.topofboxofreading2}>
                                        Cu. M
                                </div>
                                <div style={styles.topofboxofreading2}>
                                        Amount
                                </div>
                                <div style={styles.topofboxofreading2}>
                                        Penalty
                                </div>
                            </Box>
                            </>
                            
                            {bill.listofbill.length!==0 && 
                                reversedbill.map((lb, index)=>{
                                return (
                                    <Box style={styles.containerofboxofreading} key={lb.billing_id}>
                                        <div style={{ ...styles.topofboxofreading, marginTop:-1 }}>
                                               {index+1}.) {lb.service_period} 
                                        </div>
                                        <div style={{ ...styles.topofboxofreading2, marginTop:-1 }}>
                                                {lb.total_cuM} cu. m
                                        </div>
                                        <div style={{ ...styles.topofboxofreading2, marginTop:-1 }}>
                                        ₱ {lb.present_bill}
                                        </div>
                                        <div style={{ ...styles.topofboxofreading2, marginTop:-1 }}>
                                        ₱ {lb.penalty}
                                        </div>
                                    </Box>
                                )})
                            }
                            {
                                bill.listofbill.length===0 && 
                                <h1 style={{ margin:0 ,padding:"10px 50px", borderStyle:'solid', borderWidth:1, color:'#9F9F9F', width:340, textAlign:'center' }}>No Billing</h1>
                            }
                            {bill &&<p style={{ width:400, textAlign:'right', margin:10 }}>
                               {` Balance : `}<span style={{ textDecoration:'underline' }}>{`_₱ ${bill.bal}_`}</span>
                               
                            </p>}
                            
                            {
                                bill && 
                                <>
                                <p style={{ width:400, textAlign:'right', margin:0 }}>
                                   {` Total Amount: `}<span style={{ textDecoration:'underline' }}>{`_₱ ${bill.listofbill.length!==0?(bill.listofbill[bill.listofbill.length-1].present_bill+bill.listofbill[bill.listofbill.length-1].previous_bill+bill.listofbill[bill.listofbill.length-1].penalty):0+bill.bal}_`}</span>
                                   
                                </p>
                                <p style={{ width:400, textAlign:'left' }}>
                                   {` ISSUED BY: `}<span >______________________</span>
                                </p>
                                </>
                            }
                        </Box>}
                        { Object.keys(searchedConsumer).length===0 &&
                        <Box marginTop={25}>
                            <h1 style={styles.h1}>SEARCH CONSUMER</h1>
                        </Box>}
                        {
                            billIsPending && Object.keys(searchedConsumer).length!==0 && 
                            <Box marginTop={25}>
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
                    <Dialog open={popUp} maxWidth={'xs'} >
                    <DialogTitle style={{margin:0,  textAlign:"left",paddingBottom:1, width:'250px'}}>
                        <Typography gutterBottom fontWeight={"bold"} fontSize={25} style={{margin:"0 auto", borderBottom:"1px solid gray"}}>
                            Water Bill Payment
                        </Typography>
                        </DialogTitle>

                        <DialogContent style={{ display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', width:'250px' }}>
                                    {searchedConsumer && 
                                    <PaymentInfo
                                    balance = {bill?bill.bal:0}
                                    total={bill && bill.listofbill.length!==0?(bill.listofbill[bill.listofbill.length-1].present_bill+bill.listofbill[bill.listofbill.length-1].previous_bill+bill.listofbill[bill.listofbill.length-1].penalty):0+(bill &&( bill.bal===null?0:bill.bal))}
                                    searchedConsumer={searchedConsumer}
                                    bill={bill}
                                    isPending={isPending}
                                    billError={billError}
                                    billIsPending={billIsPending}
                                    />
                                    }
                                    <NumericFormat
                                        label="Input Payment" 
                                        variant="outlined" 
                                        placeholder={`Bill: 34`} 
                                        allowNegative={false}
                                        value={payment}
                                        //disabled={}
                                        isAllowed={(values) => {
                                        const { value } = values;
                                        return value < 99999 ;
                                        }}
                                        onChange={(e) =>{
                                            const val = e.target.value
                                            setPayment(val*1)
                                        }}
                                        customInput={TextField}
                                        error={ bill && ( bill.listofbill.length!==0?(bill.listofbill[bill.listofbill.length-1].present_bill+bill.listofbill[bill.listofbill.length-1].previous_bill+bill.listofbill[bill.listofbill.length-1].penalty):0+(bill?bill.bal:0))<payment? true:false }
                                        style={styles.billtextfield}
                                        />
                                    <Box style={{  display:'flex', justifyContent:'end', width:260 }}>
                                    <Button
                                    variant="outlined"
                                    disabled={searchedConsumer? false:true} 
                                    style={{height:40, width:80, fontSize:12, margin:2}}
                                    onClick={()=>{
                                        setPayment(0);
                                        setPopUp(false)
                                    }
                                    }>
                                    Cancel
                                    </Button>
                                    
                                    <Button  
                                    variant="contained"
                                    disabled={bill && ( bill.listofbill.length!==0?(bill.listofbill[bill.listofbill.length-1].present_bill+bill.listofbill[bill.listofbill.length-1].previous_bill+bill.listofbill[bill.listofbill.length-1].penalty):0+(bill?bill.bal:0))<payment || payment===0? true:false} 
                                    style={{height:40, width:100, fontSize:12, margin:2, backgroundColor:bill && ( bill.listofbill.length!==0?(bill.listofbill[bill.listofbill.length-1].present_bill+bill.listofbill[bill.listofbill.length-1].previous_bill+bill.listofbill[bill.listofbill.length-1].penalty):0+(bill?bill.bal:0))<payment || payment===0?'#9F9F9F':'rgb(12,20,52)'}}
                                    onClick={()=> setConfirmPopup(true)}

                                    >Pay</Button>
                                    </Box>
                        </DialogContent>
                </Dialog>

                <Dialog open={confirmPopup} maxWidth={'xs'} className='readerDialog'>
                    <DialogTitle style={{margin:0,  textAlign:"left",paddingBottom:1}}>
                        <Typography gutterBottom fontWeight={"bold"} fontSize={30} style={{margin:"0 auto"}}>
                            Confirmation
                        </Typography>
                        </DialogTitle>

                        <DialogContent style={{ display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', width:300 }}>
                                    {searchedConsumer && 
                                    <Confirmation
                                    balance = {bill?bill.bal:0}
                                    total={bill && bill.listofbill.length!==0?(bill.listofbill[bill.listofbill.length-1].present_bill+bill.listofbill[bill.listofbill.length-1].previous_bill+bill.listofbill[bill.listofbill.length-1].penalty):0+(bill &&( bill.bal===null?0:bill.bal))}
                                    searchedConsumer={searchedConsumer}
                                    payment = {payment}
                                    />
                                    }
                                    <Box style={{  display:'flex', justifyContent:'end', width:300 }}>
                                    <Button
                                    variant="outlined"
                                    disabled={searchedConsumer? false:true} 
                                    style={{height:40, width:80, fontSize:12, margin:2}}
                                    onClick={()=>{
                                        setConfirmPopup(false)
                                        }}>
                                    Cancel
                                    </Button>
                                    
                                    <Button  
                                    variant="contained"
                                    disabled={bill && bill.listofbill.length!==0 && searchedConsumer && (bill.listofbill[bill.listofbill.length-1].present_bill+bill.listofbill[bill.listofbill.length-1].previous_bill+bill.listofbill[bill.listofbill.length-1].penalty)<payment? true:false} 
                                    style={{height:40, width:160, fontSize:12, margin:2, backgroundColor:bill && bill.listofbill.length!==0 && searchedConsumer && (bill.listofbill[bill.listofbill.length-1].present_bill+bill.listofbill[bill.listofbill.length-1].previous_bill+bill.listofbill[bill.listofbill.length-1].penalty)<payment?'#9F9F9F':'rgb(12,20,52)'}}
                                    onClick={()=>{
                                        setConfirmPopup(false)
                                        handleSubmit(+searchedConsumer.consumer_id);
                                    }}
                                    >Confirm Payment</Button>
                                    </Box>
                        </DialogContent>
                </Dialog>

                <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose}>
                        <Alert
                        onClose={handleAlertClose}  
                        severity={alertType} sx={{ width: '100%' }}
                        style={{zIndex:6}}>
                        {alertText}
                        </Alert>
                    </Snackbar>
           
                </Box>
            </Box>
     );
}
 
export default Payment;