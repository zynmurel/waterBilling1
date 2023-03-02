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
                setAlertText('Username Updated!')
                setAlertType("success")
            })
              .catch(error => {
                console.error('There was an error!', error);
                setAlert(true)
                setAlertText(error.response.data.message==="The email has already been taken."?"This username has already been taken.":error.response.data.message)
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
            label="Edit Username" 
            variant="outlined" 
            type="text"
            placeholder="ex: user_sample123"
            onChange={(e) =>{
                const val = e.target.value
                setNewEmail(val);
            }}
            style={{ width:350, margin:"30px 20px 20px 20px"}}
            value={newEmail}
            error={newEmail.length<8 }
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
            disabled={newEmail.length<8 }
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