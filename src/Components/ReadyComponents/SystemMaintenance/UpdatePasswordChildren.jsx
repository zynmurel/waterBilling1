import { Alert, Box, Button, Snackbar, TextField } from "@mui/material"
import { useState } from "react";
import axios from "axios";
import GetData from '../../../Hook/SampleData'

const UpdatePasswordChildren = ({
    setUserUpdate, 
    userUpdate, 
    hostLaravel, 
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
    const userData = GetData(hostLaravel, `/api/consumer/${userUpdate.user_id}`);
    const [newPassword, setNewPassword] = useState("")
    const [passwordErr , setPasswordErr] = useState(false)
    const handleSubmit = () => {
        const headers = { 
            'Content-type' : 'application/json',
            'Accept' : 'application/json',
          };
          const data = {
            email:newPassword
          }
          axios.put(`${hostLaravel}/api/user/${userUpdate.user_id}`, data, { headers })
              .then(response => {
                console.log(response)
                setUserUpdate({})
                setReload(reload? false:true)
                setAlert(true)
                setAlertText('Email Updated!')
                setAlertType("success")})
              .catch(error => {
                console.error('There was an error!', error);
                setAlert(true)
                setAlertText(error.response.data.message)
                setAlertType("error")
            });
    }
    return ( 
        <Box>
            <TextField 
            id="outlined-basic" 
            label="Input New Password" 
            variant="standard" 
            type="text"
            placeholder="ex: password123"
            onChange={(e) =>{
                const val = e.target.value
                setNewPassword(val);
                setPasswordErr(false)
            }}
            style={{ width:250, margin:"0px 20px 20px 20px"}}
            value={newPassword}
            error={passwordErr}
            disabled={userData.data === null ? true:false}
            required
            />
            <Box style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
            <Box>                   
            <Button 
            variant="contained" 
            style={{ backgroundColor:'white', color:'black', flex:1, marginRight:10}}
            onClick={()=>{
                setUserUpdate({})
            }}
            >Cancel</Button>

            <Button 
            variant="contained" 
            style={{backgroundColor:'#0f5e9c', flex:1, marginRight:10}}
            type="submit"
            onClick={()=>{
                if(newPassword.length<8){
                setPasswordErr(true)
                }else{
                handleSubmit()}
            }}
            >Submit</Button>
            </Box>
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
 
export default UpdatePasswordChildren;