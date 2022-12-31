import { Box, Button, Popover } from '@mui/material';
import '../Styles/header.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import AuthUser from '../Hook/AuthUser';
import { useNavigate } from 'react-router-dom';

const Header = ({logoutUser}) => {
    const { getUser } = AuthUser()
    const userType = getUser().user_type;
    
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const styles = {
        logodiv:{
            margin:"0 5px"
        },
        logo:{
            height:"55px"
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
            boxShadow:'0px 2px 3px 0px rgb(0,0,0,.5)'
        },
        text:{
            margin:0
        },
        box:{
            display:'flex',
            height:50
        },
        logout:{
            color:'black',
            margin:'.5vw 2vw'
        }

    }
    return ( 
        <Box className="header">
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
            <Box style={{ flexDirection:'row', ...styles.box}}>
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
        </Box>
     );
}
 
export default Header;