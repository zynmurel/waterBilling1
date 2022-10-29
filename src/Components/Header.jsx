import { Box, Button } from '@mui/material';
import '../Styles/header.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Header = () => {
    const styles = {
        logodiv:{
            margin:"0 5px"
        },
        logo:{
            height:"55px"
        },
        icon:{ 
            marginRight:-1,
            color:"rgb(15,94,156)" 
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
        }

    }
    return ( 
        <Box className="header">
            <Box className='logodiv' style={styles.logodiv}>
                <img className="logo" src='/waterlogo2.png' alt="waterbilllogo" style={styles.logo}/>
            </Box>
            <Box style={{ flexDirection:'row', ...styles.box}}>
            <Box style={{...styles.box, flexDirection:'column',alignItems:"end", color:"rgb(15,94,156", justifyContent:"center"}}>
                <h2 style={styles.text}>USER</h2>
                <p style={styles.text}>Administrator</p>
            </Box>
            <Button 
            variant="text" 
            style={styles.button}
            >
            <AccountCircleIcon sx={{ fontSize: 40, ...styles.icon}}/>
            <ArrowDropDownIcon  sx={{ fontSize: 30, ...styles.icon }}/>
            </Button>
            </Box>
        </Box>
     );
}
 
export default Header;