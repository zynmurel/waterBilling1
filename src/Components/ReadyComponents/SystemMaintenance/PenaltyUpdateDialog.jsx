import { Alert, Box, Snackbar, TextField } from "@mui/material";
import { NumericFormat, PatternFormat } from 'react-number-format';
import { Button } from '@mui/material';
import { useState } from "react";
import axios from "axios";
const PenaltyPopup = ({
    hostLaravel,
    reload,
    setReload,
    alert,
    setAlert,
    alertType,
    setAlertType,
    alertText,
    setAlertText,
    handleAlertClose,
    penaltyData,
    setPenaltyData
}) => {
    
    const [penalty, setPenalty] = useState(penaltyData.setting_value)
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
            setting_value:penalty+""
          }
          axios.put(`${hostLaravel}/api/settingUpdate/${id}`, data, { headers })
              .then(response => {
                console.log(response)
                setPenaltyData({})
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
        return value < 60 && !value.includes(".");
      }}
      onChange={(e)=>{
        setPenalty(e.target.value)
      }}
      customInput={TextField}
      style={ styles.input }
      />)
    

    return ( 
        <Box style={styles.container}>
                {updateUtility("Update Penalty (%)", penalty, setPenalty)}
                <Box>
                <Button
                variant="outlined"
                style={{ ...styles.button, color:'rgb(12,20,52)', border:"solid 1px rgb(12,20,52)"}}
                onClick={()=>{
                    setPenaltyData({})
                }}
                >Cancel</Button>
                
                <Button
                variant="contained"
                style={{ ...styles.button,backgroundColor:'rgb(12,20,52)' }}
                onClick={()=>{
                    handleSubmit(2)
                }}
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
 
export default PenaltyPopup;