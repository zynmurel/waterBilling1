import { Alert, Box, Button, Snackbar, TextField } from "@mui/material"
import { useState } from "react";
import axios from "axios";

const UpdateUserChildren = ({
    setUserUpdate, 
    userUpdate, 
    hostLaravel, 
    reload, 
    setReload,
    openPopup,
    alert,
    setAlert,
    alertType,
    setAlertType,
    alertText,
    setAlertText,
    handleAlertClose,
    openPasswordPopup,
    setOpenPasswordPopup,
    setOpenEmailPopup
}) => {
    const [newEmail, setNewEmail] = useState(userUpdate.email)
    const handleSubmit = () => {
        const headers = { 
            'Content-type' : 'application/json',
            'Accept' : 'application/json',
          };
          const data = {
            email:newEmail
          }
          axios.put(`${hostLaravel}/api/user/${userUpdate.user_id}`, data, { headers })
              .then(response => {
                console.log(response)
                setUserUpdate({})
                setReload(reload? false:true)
                setAlert(true)
                setAlertText('Email Updated!')
                setAlertType("success")
            })
              .catch(error => {
                console.error('There was an error!', error);
                setAlert(true)
                setAlertText(error.response.data.message)
                setAlertType("error")
            });
    }
    return ( 
        <Box>
        { Object.keys(userUpdate).length!==0 &&
            <div>
                <p style={{ margin:0, fontSize:15 }}>{`User Type : ${userUpdate.user_type}`}</p>
                <p style={{ margin:0, fontSize:15 }}>{`User ID : ${userUpdate.user_id}`}</p>
            </div>
        }
            <TextField 
            id="outlined-basic" 
            label="Edit Email" 
            variant="outlined" 
            type="text"
            placeholder="ex: example@gmail.com"
            onChange={(e) =>{
                const val = e.target.value
                setNewEmail(val);
                console.log(val.includes('@gmail.com'))
            }}
            style={{ width:350, margin:"30px 20px 20px 20px"}}
            value={newEmail}
            error={newEmail.includes('@gmail.com')?false:true }
            required
            />
            <Box style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
            <Button variant="text"
            onClick={()=>{
                setOpenEmailPopup(false);
                setOpenPasswordPopup(true);
            }}>Change Password?</Button>
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
                handleSubmit()
            }}
            disabled={newEmail.includes('@gmail.com')?false:true}
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
 
export default UpdateUserChildren;