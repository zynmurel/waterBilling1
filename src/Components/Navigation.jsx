import '../Styles/navigation.css'
import {NavLink } from 'react-router-dom';
const Navigation = () => {
  const activeStyle = {background:'linear-gradient(to right,rgb(0, 43, 80) 20%, rgb(17, 99, 170))',color:"white"}
    return ( 
        <div className="navigation">
        <NavLink
        to="/home"
        style={({ isActive }) =>
          isActive ? activeStyle: undefined
        }
      >
        HOME
      </NavLink>

            <NavLink
            to="/consumerManagement"
            style={({ isActive }) =>
              isActive ? activeStyle: undefined
            }
          > 
            CONSUMER MANAGEMENT
          </NavLink>

            <NavLink
            to="/inquire"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            INQUIRE
          </NavLink>

          <NavLink
            to="/meterReading"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            METER READING
          </NavLink>

          <NavLink
            to="/reports"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            REPORTS
          </NavLink>

          <NavLink
            to="/systemMaintenance"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            SYSTEM MAINTENANCE
          </NavLink>

          <NavLink
            to="/help"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            HELP
          </NavLink>
          
        </div>
     );
}
 
export default Navigation;