import { Alert, Box, Snackbar, TextField } from "@mui/material";
import { NumericFormat, PatternFormat } from 'react-number-format';
import { Button } from '@mui/material';
import { useState } from "react";
import axios from "axios";
const PopupContent = ({
    hostLaravel,
    openCubicMeter,
    setOpenCubicMeter,
    cubicMeterData,
    setCubicMeterData,
    isCubicMeter,
    cubic_rates,
    reload,
    setReload,
    alert,
    setAlert,
    alertType,
    setAlertType,
    alertText,
    setAlertText,
    handleAlertClose
}) => {
    console.log(cubicMeterData)
    const rateSet = isCubicMeter && cubicMeterData.cr.cubic_rate!=0? cubicMeterData.cr.cubic_rate : cubicMeterData.cr.fixed_rate
    const [rate, setRate] = useState(rateSet)
    const styles={
        container:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column'
        },
        input:{
            marginTop:10,
            width:300
        },
        button:{
            margin:10
        }
    }
        const handleSubmit = (id) => {
        const headers = { 
            'Content-type' : 'application/json',
            'Accept' : 'application/json',
          };
          const data = {
            setting_value:JSON.stringify(cubic_rates)
          }
          axios.put(`${hostLaravel}/api/settingUpdate/${id}`, data, { headers })
              .then(response => {
                console.log(response)
                setCubicMeterData({})
                setReload(reload? false:true)
                setAlert(true)
                setAlertText('Settings Updated!')
                setAlertType("success")
            })
              .catch(error => {
                console.error('There was an error!', error);
                setAlert(true)
                setAlertText(error.response.data.message)
                setAlertType("error")
            });
    }
    const updateUtility = (type, value, setValue) => (
      <NumericFormat
      label={type} 
      variant="outlined" 
      value={value}
      allowNegative={false}
      isAllowed={(values) => {           
        const { value } = values;
        return value < 200 && !value.includes(".");
      }}
      onChange={
        (e)=> {
            console.log(cubic_rates)
            cubicMeterData.cr.min_cubic==="1" ? cubic_rates[cubicMeterData.index].fixed_rate= e.target.value  :  cubic_rates[cubicMeterData.index].cubic_rate= e.target.value
            console.log(cubic_rates[cubicMeterData.index])
            console.log(cubicMeterData.index === "1" || cubicMeterData.index === "5" ? true:false)
            console.log(cubicMeterData.cr)
            setValue(e.target.value)
        }
      }
      customInput={TextField}
      style={ styles.input }
      />)
      console.log(cubic_rates)
    

    return ( 
        <Box style={styles.container}>
                {updateUtility("Update Cubic Rate", rate, setRate)}
                <Box>
                <Button
                variant="outlined"
                style={{ ...styles.button, color:'rgb(12,20,52)', border:"solid 1px rgb(12,20,52)"}}
                onClick={()=> {
                    setOpenCubicMeter(false)
                    setCubicMeterData({})
                }}
                >Cancel</Button>
                
                <Button
                variant="contained"
                style={{ ...styles.button,backgroundColor:'rgb(12,20,52)' }}
                disabled={rate===""}
                onClick={()=>handleSubmit(3)}
                >Submit</Button>

                </Box>
                <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose} className={'snackbarPopup'}>
                    <Alert
                    onClose={handleAlertClose}  
                    severity={alertType} sx={{ width: '100%' }}
                    >
                    {alertText}
                    </Alert>
                </Snackbar>
        </Box>
    );
}
 
export default PopupContent;