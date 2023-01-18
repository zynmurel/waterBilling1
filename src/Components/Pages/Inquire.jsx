import { Box, Card, Autocomplete, Button } from '@mui/material';
import '../../Styles/PageStyles/inquire.css'
import { TextField} from '@mui/material';
import { createFilterOptions } from '@mui/material';
import { useState, useRef } from 'react';
import ReadingTable from '../../CashierComponents/ReadyComponents/ReadingTableCashier';
import useEffect from '../../Hook/useFetch';
import ReactToPrint from 'react-to-print'
import GetData from '../../Hook/SampleData'

const Inquire = ({month, hostLaravel, hostJson}) => {

    const consumersData = GetData(`${hostLaravel}/api`, '/consumer');
    //const readingData = GetData('http://127.0.0.1:8000/api', '/reading');
    const componentRef = useRef()
    const { data:consumer, isPending, error  } = consumersData

    const [ searchedConsumer, setSearchedConsumer ] = useState({})

    const readingBillingRecords =  GetData(hostLaravel, `/api/inquire/${Object.keys(searchedConsumer).length!==0?searchedConsumer.user_id:1}`);
    const { data:bill, isPending:billIsPending, error:billError , reload, setReload } = readingBillingRecords;
    console.log(Object.keys(searchedConsumer).length!==0)


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
            width:580
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
            margin:0, 
            color:"rgb(12,20,52)",
            margin:" 0px 0 10px 0",
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
                                <h1 style={{ fontSize:23, margin:"0 auto 20px auto", fontFamily:"'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif" }}>BALILIHAN WATER BILLING</h1>
                                <h1 style={styles.h11}>{bill.newReading.consumer_id}</h1>
                            </Box>
                            <Box style={styles.box3_2}>
                                <h2 style={{ ...styles.box3text, margin:0 }}>{`${bill.newReading.consumer_name}`}</h2>
                                <p style={{marginLeft:"1px",...styles.box3text}}>{`${bill.newReading.barangay}, Purok ${bill.newReading.purok}`}</p>
                                <p style={{marginLeft:"1px",...styles.box3text}}><strong >{bill.newReading.usage_type}</strong></p>
                                <p style={{marginLeft:"1px",...styles.box3text}}><strong >{bill.newReading.service_period}</strong></p>
                                <div style={{ margin:"15px 0" }}>
                                <p style={{marginLeft:"1px",...styles.box3text}}><strong >Reading: </strong></p>
                                <p style={{marginLeft:"1px",...styles.box3text}}>Previous:{bill.newReading.prev_reading}</p>
                                <p style={{marginLeft:"1px",...styles.box3text}}>Present:{bill.newReading.present_reading}</p>
                                <p style={{marginLeft:"1px",...styles.box3text}}>Total:{bill.newReading.present_reading - bill.newReading.prev_reading}</p>
                                </div>

                                <div style={{ margin:"15px 0" }}>
                                <p style={{marginLeft:"1px",...styles.box3text}}><strong >Billing: </strong></p>
                                <p style={{marginLeft:"1px",...styles.box3text}}>Remaining Bill: ₱{bill.newReading.prev_bill}</p>
                                <p style={{marginLeft:"1px",...styles.box3text}}>Present Bill: ₱{bill.newReading.present_bill}</p>
                                <p style={{marginLeft:"1px",...styles.box3text}}>Penalty: ₱{bill.newReading.penalty}</p>
                                </div>
                                <div style={{ margin:"20px 0", display:'flex', alignItems:'center', flexDirection:'column' }}>
                                <p style={{marginLeft:"1px",...styles.box3text, textAlign:"center", width:150, margin:0}}><strong >{`₱${bill.newReading.prev_bill+bill.newReading.present_bill+bill.newReading.penalty}`}</strong></p>
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
           
                </Box>
            </Box>
     );
}
 
export default Inquire;