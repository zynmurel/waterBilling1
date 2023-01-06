import { Box, Button } from '@mui/material';
import '../Styles/header.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AuthUser from '../Hook/AuthUser';
import { useNavigate } from 'react-router-dom';

const Header = ({logoutUser}) => {
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
        }

    }
    return ( 
        <Box className="header" >
            <h1 style={{ color:'white' }}>Home</h1>
            <Box style={{ flexDirection:'row', ...styles.box}}>
            <Box style={{...styles.box, flexDirection:'column',alignItems:"end", color:"rgb(12,20,52)", justifyContent:"center"}}>
                <h2 style={styles.text}>Reader</h2>
            </Box>
            <Button 
            variant="text" 
            style={styles.button}
            >
            <AccountCircleIcon sx={{ fontSize: 40, ...styles.icon}}/>
            <ArrowDropDownIcon  sx={{ fontSize: 30, ...styles.icon }}/>
            </Button>
            <Button
            onClick={logoutUser}
            >
                Logout
            </Button>
            </Box>
        </Box>
     );
}
 
export default Header;