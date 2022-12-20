import { Box } from '@mui/system';
import { useState } from 'react';
import '../../Styles/PageStyles/systemmaintenance.css'
import Utilities from "../ReadyComponents/SystemMaintenance/Utilities";
import Accounts from "../ReadyComponents/SystemMaintenance/Accounts";
import NavBar from '../ReadyComponents/SystemMaintenance/SMNavBar';
import { Paper } from '@mui/material';
const SystemMaintenance = () => {
    const [active, setActive] = useState('utilities')
    const styles = {
        content:{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
        },
        paper:{
            width:600,
            height:600,
            overflow:'auto',
            backgroundColor:'white',
        }
    }
    return (
        <Box className="systemMaintenance">
            <Box style={styles.content}>
                <NavBar setActive={setActive} active={active}/> 
                <Paper style={styles.paper}>   
                    {active==='utilities' && <Utilities/>}
                    {active==='accounts' && <Accounts/>}
                </Paper>
            </Box>
        </Box>
     );
}
 
export default SystemMaintenance;