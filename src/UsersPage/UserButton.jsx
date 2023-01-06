import { Box, Button, Popover } from '@mui/material';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const UserButton = ({ logoutUser, userType }) => {
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const styles = {
        logout:{
            color:'black',
            margin:'.5vw 2vw'
        },
        box:{
            display:'flex',
            height:50
        },
        icon:{ 
            marginRight:-1,
            color:"rgb(12,20,52)" 
        },
        button:{
            width:70, 
            height:50, 
            margin:"0 1vw", 
            fontSize:"20px",
            boxShadow:'0px 2px 3px 0px rgb(0,0,0,.5)',
            backgroundColor:'white'
        },
        text:{
            margin:0
        }
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return ( 
        <div style={{ /*visibility:'hidden'*/ }}>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            >   
                <Button
                    style={styles.logout}
                    onClick={logoutUser}
                    >
                    Logout
                </Button>   
            </Popover>
            <Box style={{ flexDirection:'row', ...styles.box}} >
            <Box style={{...styles.box, flexDirection:'column',alignItems:"end", color:"rgb(12,20,52)", justifyContent:"center"}}>
                <h2 style={styles.text}>{userType}</h2>
            </Box>
            <Button 
            variant="text" 
            style={styles.button}
            aria-describedby={id} 
            onClick={handleClick}
            >
            <AccountCircleIcon sx={{ fontSize: 40, ...styles.icon}}/>
            <ArrowDropDownIcon  sx={{ fontSize: 30, ...styles.icon }}/>
            </Button>
            </Box>
        </div>
     );
}
 
export default UserButton;