import { Box, Button, Paper, Popover } from '@mui/material';
import '../Styles/header.css'
import { MdOutlineWaterDrop } from "react-icons/md";
import { useState } from 'react';

const Header = ({logoutUser}) => {
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
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          margin:'10px 0',
        },
        logodivText:{
        },
        logodivh1:{
          margin:0
        },
        logodivh3:{
          margin:0
        },
        logodivicon:{
          fontSize:60,
          marginTop:5
        },
        paper:{
            maxWidth:70,
            maxHeight:70,
            minWidth:70,
            minHeight:70,
            margin:"0 1vw", 
            borderRadius:"20vw",
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        },
        text:{
            margin:0
        },
        box:{
            display:'flex',
            height:100,
            width:'100%',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            margin:'0 2%'
        },
        logout:{
            color:'black',
            margin:'.5vw 2vw'
        }

    }
    return ( 
        <Box className="headerMobileView">
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
            <Box style={{...styles.box}}>
                <Box className='logodiv' style={styles.logodiv}>
                    <MdOutlineWaterDrop style={styles.logodivicon} />
                    <Box style={styles.logodivText}>
                        <h1 style={styles.logodivh1}>BALILIHAN</h1>
                        <h3 style={styles.logodivh3}>WATERWORKS</h3>
                    </Box>
                </Box>

                <Paper style={styles.paper} aria-describedby={id} onClick={handleClick}>
                    <h2>SM</h2>
                </Paper>

                {/* <Button
                onClick={logoutUser}
                >
                Logout
            </Button> */}
            </Box>
        </Box>
     );
}
 
export default Header;