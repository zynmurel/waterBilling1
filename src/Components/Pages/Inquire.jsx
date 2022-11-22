import { Box, Card, Autocomplete, Button } from '@mui/material';
import '../../Styles/PageStyles/inquire.css'
import { TextField} from '@mui/material';
import { createFilterOptions } from '@mui/material';
import { useState, useRef } from 'react';
import ReadingTable from '../ReadyComponents/CReadingTable';
import useEffect from '../../Hook/useFetch';
import ReactToPrint from 'react-to-print'

const Inquire = ({result, month ,reading, billing}) => {
    const componentRef = useRef()

    const {data:billings, isPending:billIsPending, error:billError}= billing

    const { data:consumer, isPending, error  } = result

    const {data:readings, conIsPending, conError}= reading
    const [ searchedConsumer, setSearchedConsumer ] = useState("")
    const [ searchedConsumerId, setSearchedConsumerId ] = useState("")

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
            alignItems:"center"
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
            justifyContent:"space-between",
            width:580
        },
        box2:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            flex:5,
            width:600,
            height:800,
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
            flexDirection:"row",
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
            backgroundColor: searchedConsumer && searchedConsumer.connected?"rgb(156, 218, 32)":"rgb(242, 54, 54)",
            color:"white",
            borderRadius:"2px",
        },
        text1:{
            fontSize:50, 
            margin:0, 
            color:"rgb(15,94,156)",
            margin:" 0px 0 10px 0",
        },
        h1:{
            color:"#989898",
            fontSize:20
        },
        h11:{
            margin:0,
            fontSize:40,
            color:"rgb(15,94,156)",
        },
        box3text:{
            margin:"5px 0",
        }
    }

    //filter readings - only searched && paid
    const newrb = readings? readings.filter((rb)=>{
        let billing = billings.find((bill)=>{
            return bill.consumerId===rb.consumerId && bill.readingId===rb.id ?  bill : undefined
          })
        return rb.consumerId==searchedConsumerId && billing.paid === false
        }):""

    //date sorter
    const sorter = (a, b) => {
        const ayear = new Date(a.date)
        const byear = new Date(b.date)
        if(byear.getFullYear() !== ayear.getFullYear()){
        return byear.getFullYear() - ayear.getFullYear();
        }else{
        return byear.getMonth() - ayear.getMonth();
        };
    };
    readings && newrb.sort(sorter)

    //array of bills
    const arrayOfBill = []
    billings && billings.forEach((bill)=>{
        return bill.consumerId === searchedConsumerId && bill.paid === false && arrayOfBill.push(bill.bill)
    })

    //add all bill from "arrayOfBill"
    const sum = arrayOfBill.reduce((accumulator, value) => {
        return accumulator + value;
    }, 0);

    return ( 
            <Box className="inquire" sx={{...styles.inquire}}>
                <Box className="container" sx={{...styles.container}}>
                    <Box className="box1" sx={styles.box1}>
                            <h1 style={styles.text1}>INQUIRE FOR PAYMENT</h1>

                        <Box className="box1">
                            <Box style={styles.box1_1}>
                                <Autocomplete
                                    disablePortal
                                    disabled={isPending || error}
                                    getOptionLabel={(option) => `${option.id} ${option.first_name} ${option.middle_name} ${option.last_name}`}
                                    id="combo-box-demo"
                                    options={consumer? consumer: []}
                                    filterOptions={filterOptions}                      
                                    sx={{ width: 400 }}
                                    onChange={(event , val)=>{ setSearchedConsumer(val); setSearchedConsumerId(val? val.id:"")}}
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
                                style={{height:55}}
                                >Print/Download</Button>}
                                content={() => componentRef.current}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Card style={styles.box2} ref={componentRef}>
                        {searchedConsumer ? 
                        <Box style={styles.box3}>
                            <Box style={styles.box3_1}>
                                <h1 style={styles.h11}>{searchedConsumer.id}</h1>
                                <Box style={styles.box3_1_1}><p>{searchedConsumer.connected? "Connected":"Disconnected"}</p></Box>
                            </Box>
                            <Box style={styles.box3_2}>
                                <h2 style={styles.box3text}>{`${searchedConsumer.first_name} ${searchedConsumer.middle_name} ${searchedConsumer.last_name}`}</h2>
                                <p style={{marginLeft:"1px",...styles.box3text}}>{`${searchedConsumer.barangay}, Purok ${searchedConsumer.purok}`}</p>
                                <strong style={{marginLeft:"1px",...styles.box3text}}>{searchedConsumer.usage_type}</strong>
                            </Box>
                            <Box style={styles.box3_3}>
                                <ReadingTable 
                                month={month}
                                newrb={newrb}
                                billings={billings}
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
           
                </Box>
            </Box>
     );
}
 
export default Inquire;