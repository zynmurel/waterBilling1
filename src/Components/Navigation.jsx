import '../Styles/navigation.css'
import {NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import PaymentsIcon from '@mui/icons-material/Payments';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
const Navigation = () => {
  const activeStyle = {backgroundColor:'rgb(0, 43, 80)',color:"white",}
  const styles = { display:"flex", alignItems:"center", flexDirection:"row"}
    return ( 
        <div className="navigation">
        <NavLink
        to="/home"
        style={({ isActive }) =>
        isActive ? {...activeStyle, ...styles}: styles
        }
      >
        <HomeIcon />&nbsp;HOME
      </NavLink>

            <NavLink
            to="/consumerManagement"
            style={({ isActive }) =>
              isActive ? {...activeStyle, ...styles}: styles
            }
          > 
           <GroupIcon />&nbsp; CONSUMER MANAGEMENT
          </NavLink>

            <NavLink
            to="/inquire"
            style={({ isActive }) =>
            isActive ? {...activeStyle, ...styles}: styles
            }
          >
           <PaymentsIcon/>&nbsp; INQUIRE
          </NavLink>

          <NavLink
            to="/meterReading"
            style={({ isActive }) =>
            isActive ? {...activeStyle, ...styles}: styles
            }
          >
            <ChromeReaderModeIcon/>&nbsp; METER READING
          </NavLink>

          <NavLink
            to="/reports"
            style={({ isActive }) =>
            isActive ? {...activeStyle, ...styles}: styles
            }
          >
            <AssessmentIcon/>&nbsp;REPORTS
          </NavLink>

          <NavLink
            to="/systemMaintenance"
            style={({ isActive }) =>
            isActive ? {...activeStyle, ...styles}: styles
            }
          >
            <EngineeringIcon/>&nbsp;SYSTEM MAINTENANCE
          </NavLink>

          <NavLink
            to="/help"
            style={({ isActive }) =>
            isActive ? {...activeStyle, ...styles}: styles
            }
          >
            <HelpCenterIcon/>&nbsp;HELP
          </NavLink>
          
        </div>
     );
}
 
export default Navigation;