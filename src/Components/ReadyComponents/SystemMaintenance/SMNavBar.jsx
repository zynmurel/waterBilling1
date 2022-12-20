import { Box } from "@mui/material";
import '../../../Styles/PageStyles/systemmaintenance.css'

const NavBar = ({setActive, active}) => {
    const styles = {
        container:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            width:600,
            height:50,
            margin:'20px 0'
        },
        topNav:{
            backgroundColor:'rgb(42, 53, 94)',
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            width:300,
            color:'gray'
        },
        activeNav:{
            backgroundColor:'rgb(12,20,52)',
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            width:300,
            color:'white',
            transform: 'scale(1.03)',
        }
    }
    return ( 
        <Box style={styles.container} >
            <div className="navButtons" style={active==='utilities'?styles.activeNav:{}} onClick={()=>setActive('utilities')}>UTILITIES</div>
            <Box className="navButtons" style={active==='accounts'?styles.activeNav:{}} onClick={()=>setActive('accounts')}>ACCOUNTS</Box>
        </Box>
     );
}
 
export default NavBar;