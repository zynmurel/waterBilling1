import '../Styles/navigation.css'
import {NavLink } from 'react-router-dom';
const Navigation = () => {
  const activeStyle = {background:'linear-gradient(to right,#ABF8E4 1%,rgb(0, 43, 79) 1% 40%)',}
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