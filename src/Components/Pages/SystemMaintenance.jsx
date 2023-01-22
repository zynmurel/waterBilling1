import { Box } from '@mui/system';
import { useState } from 'react';
import '../../Styles/PageStyles/systemmaintenance.css'
import Utilities from "../ReadyComponents/SystemMaintenance/Utilities";
import Accounts from "../ReadyComponents/SystemMaintenance/Accounts";
import NavBar from '../ReadyComponents/SystemMaintenance/SMNavBar';
import { Alert, Paper, Snackbar } from '@mui/material';
import GetData from '../../Hook/SampleData'
const SystemMaintenance = ({usersData, settings, hostLaravel}) => {  
  const {data:users, isPending, error, reload, setReload}= usersData

  const { data:setting, isPending:settingPending, error:settingError, reload:settingReload, setReload:settingSetReload} =settings

    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("warning")
    const [alertText, setAlertText] = useState("")

    const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }

        setAlert(false);
    }
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
            backgroundColor:'white',
        }
     }
    return (
        <Box className="systemMaintenance">
            <Box style={styles.content}>
                <NavBar setActive={setActive} active={active}/> 
                <Paper style={styles.paper}>   
                    {active==='utilities' && 
                    <Utilities
                    setting={setting}
                    settingPending={settingPending} 
                    settingError={settingError}
                    settingReload={settingReload}
                    settingSetReload={settingSetReload}
                    settings={settings}
                    hostLaravel={hostLaravel}
                    alert={alert}
                    setAlert={setAlert}
                    alertType={alertType}
                    setAlertType={setAlertType}
                    alertText={alertText}
                    setAlertText={setAlertText}
                    handleAlertClose={handleAlertClose}/>}
                    
                    {active==='accounts' && 
                    <Accounts
                    usersData={usersData}
                    users={users}
                    isPending={isPending}
                    error={error}
                    reload={reload}
                    setReload={setReload}
                    alert={alert}
                    setAlert={setAlert}
                    alertType={alertType}
                    setAlertType={setAlertType}
                    alertText={alertText}
                    setAlertText={setAlertText}
                    handleAlertClose={handleAlertClose}
                    hostLaravel={hostLaravel}/>}
                </Paper>


                <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose} className={'snackbarPopup'}>
                    <Alert
                    onClose={handleAlertClose}  
                    severity={alertType} sx={{ width: '100%' }}
                    >
                    {alertText}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
     );
}
 
export default SystemMaintenance;