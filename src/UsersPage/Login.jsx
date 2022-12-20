import React from 'react';
import {
  Grid,
  TextField,
  Paper,
  Button
} from '@mui/material';
import { height } from '@mui/system';
import AuthUser from '../Hook/AuthUser';
import { useState } from 'react';
import useFetch from '../Hook/useFetch';

const Login = () => {
     const styles ={
        parent:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height:'100%'
        },
        content:{
            width:400,
            height:450,
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        }
     }
    const { http, setToken, token, user, getToken } = AuthUser();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onSubmit = () => {
      http.post('/login', {email:email, password:password}).then((res)=>{
        setToken(res.data.data.user, res.data.data.token);
      }).catch((err)=>{
          console.log(err)
      })
    }

    return ( 
        <div style={styles.parent}>
      <Paper
      style={styles.content}
      >
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
          <Grid item xs={12}>
            <TextField 
            label="Username"
            onChange={(e)=>setEmail(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
            label="Password" 
            type={'password'}
            onChange={(e)=>setPassword(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            <Button 
            fullWidth
            variant="contained"
            onClick={onSubmit}
            > Login </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
     );
}
 
export default Login;