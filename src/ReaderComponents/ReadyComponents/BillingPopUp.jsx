import { Box, Button, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { useActionData } from "react-router-dom";
import GetData from '../../Hook/SampleData';
import { useState } from "react";
import AuthUser from "../../Hook/AuthUser";
import axios from "axios";

const BillingPopup = ({
    alert,
    setAlert,
    alertType,
    setAlertType,
    alertText,
    setAlertText,
    handleAlertClose,
    reload,
    setReload,
    consumerInfo,
     hostLaravel,
     setConsumerInfo,
     setPopUp
    }) => {
    var moment = require('moment');
    const billingAndReading = GetData(hostLaravel, `/api/findBillReading/${+consumerInfo.consumer_id}`)
    const {data, isPending, error} = billingAndReading 

    const date = new Date()
    var dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} 12:00:00`;
    const {getUser} = AuthUser()
    const [readingInput, setReadingInput] = useState(0);
    console.log(billingAndReading.data)
    const styles = {
    para:{
        margin:0
      },
      textfield:{
        margin:"20px auto",
      }
    }
    console.log(consumerInfo)
    //Submit Reading function
    const handleSubmit = () => {
        let present_bill = 0
        const totalReading = (readingInput - (data.read!==null?data.read.present_reading:0))
        const timestamp = moment(dateString).unix();
        const datenowtimestamp = moment(date).unix();
        console.log(dateString)
        if(consumerInfo.usage_type.toLowerCase()==="residential"){
            if(totalReading <=data.cubic_rates[0].max_cubic){

                present_bill=data.cubic_rates[0].fixed_rate

            }else if(totalReading>=data.cubic_rates[1].min_cubic && totalReading<=data.cubic_rates[1].max_cubic){

                present_bill = totalReading * data.cubic_rates[1].cubic_rate

            }else if(totalReading>=data.cubic_rates[2].min_cubic && totalReading<=data.cubic_rates[2].max_cubic){

                present_bill = totalReading * data.cubic_rates[2].cubic_rate

            }else if(totalReading>=data.cubic_rates[3].min_cubic && totalReading<=data.cubic_rates[3].max_cubic){

                present_bill = totalReading * data.cubic_rates[3].cubic_rate

            }else if(totalReading>=data.cubic_rates[4].min_cubic){

                present_bill = totalReading * data.cubic_rates[4].cubic_rate

            }
        }
        if(consumerInfo.usage_type.toLowerCase()==="commercial"){

            if(totalReading <=data.cubic_rates[5].max_cubic){

                present_bill=data.cubic_rates[5].fixed_rate

            }else if(totalReading>=data.cubic_rates[6].min_cubic && totalReading<=data.cubic_rates[1].max_cubic){

                present_bill = totalReading * data.cubic_rates[6].cubic_rate

            }else if(totalReading>=data.cubic_rates[7].min_cubic && totalReading<=data.cubic_rates[2].max_cubic){
                
                present_bill = totalReading * data.cubic_rates[7].cubic_rate

            }else if(totalReading>=data.cubic_rates[8].min_cubic && totalReading<=data.cubic_rates[8].max_cubic){

                present_bill = totalReading * data.cubic_rates[8].cubic_rate

            }else if(totalReading>=data.cubic_rates[9].min_cubic){

                present_bill = totalReading * data.cubic_rates[9].cubic_rate
            }
        }
        console.log(consumerInfo.delinquent?true:false)
        console.log((data.penalty/100)*present_bill)
        const reading = {
            reader_id :getUser().user_id,
            consumer_id :consumerInfo.consumer_id,
            service_period_id :consumerInfo.service_period_id_to_be,
            previous_reading :data.read === null? 0:data.read.present_reading,
            present_reading :readingInput,
            reading_date :datenowtimestamp,
            due_date :timestamp,
            previous_bill :data.read === null? 0:((data.bill.previous_bill - data.bill.previous_payment)+data.bill.penalty+data.bill.present_bill),
            previous_payment :0,
            penalty :consumerInfo.delinquent?((data.penalty/100)*present_bill):0,
            present_bill :present_bill
          };
          console.log(reading)
            const headers = { 
            'Content-type' : 'application/json',
            'Accept' : 'application/json',
            };
            axios.post(`${hostLaravel}/api/storeBillReading`, reading, { headers })
                .then(response => {
                console.log(response)
                setReload(reload?false:true)
                setAlert(true)
                setAlertText('Reading Added! Updated!')
                setAlertType("success")
            }
                )
                .catch(error => {
                console.error('There was an error!', error);
                setAlert(true)
                setAlertText(error.response.data.message)
                setAlertType("error")
            });
        }
    return ( 
            <Box>
                    <h3 style={{ margin:0, marginTop:5 }}>{`${consumerInfo.first_name} ${consumerInfo.middle_name} ${consumerInfo.last_name}`}</h3>
                    <p style={{ margin:0 }}>{`${ consumerInfo.barangay } - Purok ${consumerInfo.purok}`}</p>
                    <p style={{ margin:0 }}>{`${consumerInfo.service_period}`}</p>
                    <p style={{ margin:0 }}>{`${consumerInfo.usage_type}`}</p>
                    <br />
                    <h1 style={{ margin:"0 auto", textAlign:'center' }}>Recent Reading</h1> 
                    {
                        data!==null && !isPending && 
                        <Box>
                            {data.bill===null && data.read===null? 
                            <p style={{ margin:5,fontSize:30, textAlign:'center' }}>0</p>:
                            <p style={{ margin:5,fontSize:30, textAlign:'center' }}>{data.read.present_reading}</p>
                        }
                        </Box> 
                    }
                    { isPending &&
                    <Box style={{color:"gray", display:"flex", justifyContent:"center", alignItems:"center", margin:5,fontSize:30, textAlign:'center'}}>Loading...</Box>
                    }

                    { error &&
                        <Box style={{color:"rgb(255, 82, 82)", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <h3>Failed To Fetch Data</h3></Box>
                    }
                    <Box style={{ width:"100%", display:'flex', justifyContent:'center' }}>
                    <NumericFormat
                            label="Input new reading" 
                            variant="outlined" 
                            placeholder={`ex: ${123}`} 
                            allowNegative={false}
                            value={readingInput}
                            //disabled={}
                            isAllowed={(values) => {
                                const { value } = values;
                                return value < 9999 && !value.includes(".");
                            }}
                            onChange={(e) =>{
                                const val = e.target.value
                                setReadingInput(val)
                            }}
                            customInput={TextField}
                            style={styles.textfield}
                            disabled={ isPending || billingAndReading.data ===null  }
                            />
                    </Box>

                    
                      
                      <Box style={{  display:'flex', justifyContent:'end' }}>
                      <Button 
                                variant="outlined"
                                style={{height:40, width:100, fontSize:12, margin:5, color:'rgb(12,20,52)', border:"solid 1px rgb(12,20,52)"}}
                                onClick={()=>{
                                    setConsumerInfo({})
                                    setPopUp(false)
                                }}>
                                Cancel
                                </Button>
                                
                                <Button  
                                variant="contained"
                                style={ billingAndReading.data ===null || (billingAndReading.data.read!==null && billingAndReading.data.read.present_reading>=readingInput) ?{height:40, width:120, fontSize:12, margin:5, backgroundColor:'rgb(188, 188, 188)'}:{height:40, width:120, fontSize:12, margin:5,backgroundColor:'rgb(12,20,52)'}}
                                disabled={ billingAndReading.data ===null || (billingAndReading.data.read!==null && billingAndReading.data.read.present_reading>=readingInput) }
                                onClick={()=>{
                                    handleSubmit()
                                    setPopUp(false)
                                }}
                                >Submit</Button>
                      </Box>
                    </Box>
     );
}
 
export default BillingPopup;