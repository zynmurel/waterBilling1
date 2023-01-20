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
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordErr , setPasswordErr] = useState(false)
    const [confirmErr , setConfirmErr] = useState(false)
    const handleSubmit = () => {
        const headers = { 
            'Content-type' : 'application/json',
            'Accept' : 'application/json',
          };
          const data = {
            password:newPassword,
            password_confirmation:confirmPassword
          }
          axios.put(`${hostLaravel}/api/userPassword/${userUpdate.user_id}`, data, { headers })
              .then(response => {
                console.log(response)
                setUserUpdate({})
                setReload(reload? false:true)
                setAlert(true)
                setAlertText('Password Updated!')
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
            <Box style={{ display:'flex', flexDirection:'column' }}>
            { Object.keys(userUpdate).length!==0 &&
            <div>
                <p style={{ margin:0, fontSize:15 }}>{`User Type : ${userUpdate.user_type}`}</p>
                <p style={{ margin:0, fontSize:15 }}>{`User ID : ${userUpdate.user_id}`}</p>
            </div>
        }
                <TextField 
                id="outlined-basic" 
                label="Input New Password" 
                variant="filled" 
                type="text"
                placeholder="ex: password123"
                onChange={(e) =>{
                    const val = e.target.value
                    setNewPassword(val);
                    setPasswordErr(false)
                }}
                style={{ width:200, margin:"20px 50px 20px 50px"}}
                value={newPassword}
                error={passwordErr}
                required
                />

                <TextField 
                id="outlined-basic" 
                label="Confirm Password" 
                variant="filled" 
                type="text"
                placeholder="ex: password123"
                onChange={(e) =>{
                    const val = e.target.value
                    setConfirmPassword(val);
                    setConfirmErr(false)
                }}
                style={{ width:200, margin:"0px 50px 30px 50px"}}
                value={confirmPassword}
                error={confirmErr}
                required
                />
            </Box>
            <Box style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
            <div></div>
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
                setAlert(true)
                setAlertText('Password must be atleast 8 characters!')
                setAlertType("error")
                }else if(confirmPassword!==newPassword){
                setConfirmErr(true)
                setAlert(true)
                setAlertText('Passwords does not match!')
                setAlertType("error")
                }else{
                handleSubmit()
            }
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