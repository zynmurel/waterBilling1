import '../Styles/navigation.css'
import { TbReport } from "react-icons/tb";
import { MdOutlineWaterDrop, MdPayments } from "react-icons/md";
import { HomeOutlined, 
  UserOutlined, 
  DatabaseOutlined, 
  DashboardOutlined, 
  SettingOutlined, 
  QuestionCircleOutlined } from '@ant-design/icons';
import {NavLink } from 'react-router-dom';
import { Box } from '@mui/material';
const Navigation = () => {
  const activeStyle = {backgroundColor:'rgb(42, 53, 94)',color:"white",}
  const styles = {
    navbar:{
      display:"flex", 
      alignItems:"center", 
      flexDirection:"row"
    },
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
    logo:{
        height:"55px"
    },
    icon:{
      fontSize:22
    }
  }
    return ( 
        <div className="navigation">

      <Box className='logodiv' style={styles.logodiv}>
      <MdOutlineWaterDrop style={styles.logodivicon} />
      <Box style={styles.logodivText}>
          <h1 style={styles.logodivh1}>BALILIHAN</h1>
          <h3 style={styles.logodivh3}>WATERWORKS</h3>
      </Box>
      </Box>
            <NavLink
            to="/payment"
            style={({ isActive }) =>
            isActive ? {...activeStyle, ...styles.navbar}: styles.navbar
            }
          >
           <MdPayments style={styles.icon}/>&nbsp;&nbsp;Payment
          </NavLink>

          <NavLink
            to="/reports"
            style={({ isActive }) =>
            isActive ? {...activeStyle, ...styles.navbar}: styles.navbar
            }
          >
            <TbReport style={styles.icon}/>&nbsp;&nbsp;Reports
          </NavLink>

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