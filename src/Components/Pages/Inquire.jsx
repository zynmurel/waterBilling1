import { Box, Card, Autocomplete, Button } from '@mui/material';
import '../../Styles/PageStyles/inquire.css'
import { TextField} from '@mui/material';
import { createFilterOptions } from '@mui/material';
import { useState, useRef } from 'react';
import ReadingTable from '../../CashierComponents/ReadyComponents/ReadingTableCashier';
import useEffect from '../../Hook/useFetch';
import ReactToPrint from 'react-to-print'
import GetData from '../../Hook/SampleData'

const Inquire = ({ hostLaravel, consumersData, month}) => {
    const dateNow = new Date()
    let total = {total_amount:0, total_penalty:0}

    const componentRef = useRef()
    const { data:consumer, isPending, error  } = consumersData
 
    const [ searchedConsumer, setSearchedConsumer ] = useState({})

    const readingBillingRecords =  GetData(hostLaravel, `/api/inquire/${Object.keys(searchedConsumer).length!==0?searchedConsumer.user_id:2}`);
    const { data:bill, isPending:billIsPending, error:billError , reload, setReload } = readingBillingRecords;
    console.log(bill && bill)
 
    const isBill = Object.keys(searchedConsumer).length!==0 && bill.billing.billing ? Object.keys(bill.billing.billing).length!==0:false
    const isReading = Object.keys(searchedConsumer).length!==0 && bill.billing.payment? Object.keys(bill.billing.payment).length!==0:false
    const shortCutBill = isBill && bill.billing.billing[0]
    const shortCutRead = isBill && bill.billing.reading
    const shortCutPay = isBill && bill.billing.payment[0]
    const toPay = ((isBill ? shortCutBill.previous_bill:0))+(isBill ? shortCutBill.present_bill:0)+(isBill ? shortCutBill.penalty:0)
    const paid = shortCutBill.previous_payment;
    const totalBilling = toPay - paid
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
            mariginBottom:0
        },
        box1_1:{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            width:580
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
            margin:0, 
            color:"rgb(12,20,52)",
            margin:" 0px 0 10px 0",
        },
        h1:{
            color:"#989898",
            fontSize:20,
            marginTop:200
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
    //date sorter
    const sorter = (a, b) => {
        const ayear = new Date(a.registered_at)
        const byear = new Date(b.registered_at)
        if(byear.getFullYear() !== ayear.getFullYear()){
        return   ayear.getFullYear() - byear.getFullYear();
        }else{
        return  ayear.getMonth() - byear.getMonth() ;
        };
    };
    const reversedbill = Object.keys(searchedConsumer).length!==0 && bill!==null && !billIsPending && bill.listofbill ? bill.listofbill.sort((a, b)=> b.billing_id - a.billing_id) : []
    console.log(reversedbill)

    return ( 
            <Box className="inquire" sx={{...styles.inquire}}>
                <Box className="container" sx={{...styles.container}}>
                    <Box className="box1" sx={styles.box1}>
                            <h1 style={styles.text1}>INQUIRE FOR PAYMENT</h1>

                        <Box className="inquireBox1">
                            <Box style={styles.box1_1}>
                                <Autocomplete
                                    disablePortal
                                    disabled={isPending || error}
                                    getOptionLabel={(option) => `${option.consumer_id} ${option.first_name} ${option.middle_name} ${option.last_name}`}
                                    id="combo-box-demo"
                                    options={consumer ? consumer: []}
                                    filterOptions={filterOptions}                      
                                    sx={{ width: 400 }}
                                    onChange={(event, val)=>{ setSearchedConsumer(val?val:{}); setReload(reload?false:true) }}
                                    renderInput={(params) => 
                                    <TextField
                                    {...params} 
                                    label={ isPending?"Loading...":"Search ID Number/Name" }
                                    />}
                                    />
                                <ReactToPrint
                                trigger={() => 
                                <Button  
                                variant="contained"
                                disabled={searchedConsumer? false:true} 
                                style={{height:55, color:'white', backgroundColor: searchedConsumer? 'rgb(12,20,52)':'rgb(191, 191, 191)'}} 
                                >Print/Download</Button>}
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
           
                </Box>
            </Box>
     );
}
 
export default Inquire;