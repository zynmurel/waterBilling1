import { Box, Button, TextField } from "@mui/material"
import { useState } from "react";
import axios from "axios";

const UpdateUserChildren = ({setUserUpdate, userUpdate, hostLaravel, reload, setReload}) => {
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
                setReload(reload? false:true)})
              .catch(error => {
                console.error('There was an error!', error);
                console.log(error.response.data.message)
            });
    }
    return ( 
        <Box>
            <TextField 
            id="outlined-basic" 
            label="Email" 
            variant="outlined" 
            type="text"
            placeholder="ex: example@gmail.com"
            onChange={(e) =>{
                const val = e.target.value
                setNewEmail(val);
                console.log(val.includes('@gmail.com'))
            }}
            style={{ width:350, margin:"10px 20px 20px 20px"}}
            value={newEmail}
            error={newEmail.includes('@gmail.com')?false:true}
            required
            />
            <Box style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
            Change Password?
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
        </Box>
     );
}
 
export default UpdateUserChildren;