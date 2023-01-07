import '../Styles/navigation.css'
import { TbReport } from "react-icons/tb";
import { BsInputCursorText } from "react-icons/bs";
import { MdOutlineWaterDrop, MdPayments } from "react-icons/md";
import { DashboardOutlined, } from '@ant-design/icons';
import {NavLink } from 'react-router-dom';
import { Box } from '@mui/material';
import AuthUser from '../Hook/AuthUser';
import TemporaryDrawer from './ReadyComponents/Drawer';

const Navigation = ({logoutUser, month, year}) => {

  const { getUser } = AuthUser()
  const userType = getUser().user_type;
  const activeStyle = {backgroundColor:'rgb(42, 53, 94)',color:"white"}
  const styles = {
    navbar:{
      display:"flex", 
      alignItems:"center", 
      flexDirection:"row",

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
    logo:{
        height:"55px"
    },
    icon:{
      fontSize:22
    }
  }
    return ( 
        <div className="navigation">
 
      <Box className='logodiv'>
      <MdOutlineWaterDrop className='logodivicon' />
      <Box className='logoText'>
          <h1 >BALILIHAN</h1>
          <h3 >WATERWORKS</h3>
      </Box>
      </Box>
            <NavLink
            to="/reading"
            style={({ isActive }) =>
            isActive ? {...activeStyle, ...styles.navbar}: styles.navbar
            }
            className={'navbar'}
          >
           <BsInputCursorText className='icon'/>&nbsp;&nbsp;Reader
          </NavLink>

          <NavLink
            to="/meterReading"
            style={({ isActive }) =>
            isActive ? {...activeStyle, ...styles.navbar}: styles.navbar
            }
            className={'navbar'}
          >
            <DashboardOutlined className='icon'/>&nbsp;&nbsp;Meter Readings
          </NavLink>
          
          <div className='logoutNav'>
            <TemporaryDrawer
            logoutUser={logoutUser}/>
          </div>

          {/* <NavLink
            to="/help"
            style={({ isActive }) =>
            isActive ? {...activeStyle, ...styles.navbar}: styles.navbar
            }
          >
            <QuestionCircleOutlined style={styles.icon}/>&nbsp;&nbsp;Help
          </NavLink> */}
          
        </div>
     );
}
 
export default Navigation;