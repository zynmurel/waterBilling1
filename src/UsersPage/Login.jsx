import React from 'react';
import {
  Box,
  TextField,
  Paper,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import '../App.css'
import AuthUser from '../Hook/AuthUser';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { MdOutlineWaterDrop } from "react-icons/md";

const Login = () => {
     const styles ={
        logodiv:{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          margin:'10px 0',
        },
        logodivText:{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
        },
        logodivh1:{
          margin:0,
          fontSize:50,
          marginBottom:'-5px'
        },
        logodivh3:{
          margin:0
        },
        logodivicon:{
          fontSize:80,
          marginTop:5,
          marginBottom:'-10px'
        },
        button:{
          width:'300px',
          height:'55px',
          backgroundColor:'rgb(12,20,52)',
          marginTop:'10px',
          marginBottom:'40px',
          borderRadius:40
        }
     }
    const { http, setToken, token, user, getToken } = AuthUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false)
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    //Submit Button Handler
    const onSubmit = () => {
      if(email.length<8){
        setEmailError(true)
        setErrorMessage("Email can't be shorter than 8 characters")
      }else if(password.length<8){
        setPasswordError(true)
        setErrorMessage("Password can't be shorter than 8 characters")
      }


      http.post('/login', {email:email, password:password}).then((res)=>{
        setToken(res.data.data.user, res.data.data.token);
      }).catch((err)=>{
          console.log(err)
          if(email.length>=8 && password.length>=8){
          setErrorMessage("User not registered");
          setEmailError(true);
          setPasswordError(true);
          }
      })
    }

    //Show Pass Handler
    const handleClickShowPassword = () => {
      setShowPass(showPass ? false:true)
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    //on change email handler
    const onChangeEmail = (e) => {
      setEmail(e.target.value)
      setEmailError(false)
    };   
    
    //on change password handler
    const onChangePassword = (e) => {
      setPassword(e.target.value)
      setPasswordError(false)
    };

    //alert close handler
    const handleAlertClose = (event, reason) => {
      if (reason === 'clickaway') {
      return;
      }
  
          setErrorMessage("");
      }
    return ( 
        <div style={styles.parent} className={'parent'}>
      <Box
      className={'content'}
      >
        
        <Box className='logodiv' style={styles.logodiv}>
                    <Box style={styles.logodivText}>
                    <MdOutlineWaterDrop style={styles.logodivicon} />
                        <h1 style={styles.logodivh1}>BALILIHAN</h1>
                        <h3 style={styles.logodivh3}>WATERWORKS</h3>
                    </Box>
                </Box>

         <div className={'textFieldBox'}>
         <TextField 
            className={'textField'}
            label="Username" 
            onChange={(e)=>onChangeEmail(e)}
            error={emailError}
            ></TextField>
         </div>

          <div className={'textFieldBox'}>
          <FormControl 
            className={'textField'}
            variant="outlined"
            error={passwordError}>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={(e)=>onChangePassword(e)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPass ? <Visibility /> : <VisibilityOff /> }
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
          </div>

            <Button 
            style={styles.button}
            fullWidth
            variant="contained"
            onClick={onSubmit}
            > Login </Button>


      </Box>
            <Snackbar 
            className='snackbar'
            open={errorMessage.length!==0?true:false} 
            autoHideDuration={4000} 
            onClose={handleAlertClose}
            anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
            style={{ width:'300px' }}
            >
                    <Alert
                    onClose={handleAlertClose}  
                    severity={'error'} sx={{ width: '100%' }}
                    style={{zIndex:6}}>
                    {errorMessage}
                    </Alert>
                </Snackbar>
    </div>
     );
}
 
export default Login;