import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {NavLink } from 'react-router-dom';
import { DashboardOutlined, } from '@ant-design/icons';
import { BsInputCursorText } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";

export default function TemporaryDrawer({logoutUser}) {
  const [state, setState] = React.useState({
    right: false,
  });
  const location = useLocation().pathname

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <NavLink
            to="/reading">
            <ListItem key={"Reader"} disablePadding >
                <ListItemButton  style={location === '/reading'? { backgroundColor:'rgb(42, 53, 94)' }:{color:'black', backgroundColor:'rgb(226, 226, 226)'}}>
                    <ListItemIcon>    
                        <BsInputCursorText style={location === '/reading'? { fontSize:25, color:'white' }:{ fontSize:25, color:'black' }}/>
                    </ListItemIcon>
                    <ListItemText primary={"Reader"} />
                </ListItemButton>
            </ListItem>
        </NavLink>
        <NavLink
            to="/meterReading" >
            <ListItem key={"Meter Readings"} disablePadding >
                <ListItemButton  style={location === '/meterReading'? { backgroundColor:'rgb(42, 53, 94)' }:{color:'black', backgroundColor:'rgb(226, 226, 226)'}}>
                    <ListItemIcon>    
                        <DashboardOutlined style={location === '/meterReading'? { fontSize:25, color:'white' }:{ fontSize:25, color:'black' }}/>
                    </ListItemIcon>
                    <ListItemText primary={"Meter Readings"} />
                </ListItemButton>
            </ListItem>
        </NavLink>
      </List>
      <Divider style={{ margin:'20px 0 0px 0' }}/>
      <List>
        <ListItem key={'Logout'} disablePadding 
        onClick={logoutUser}
        >
            <ListItemButton >
              <ListItemIcon>
                <LogoutIcon style={{ color:'red' }}/>
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            <GiHamburgerMenu 
            className="readerBurger"
            onClick={toggleDrawer(anchor, true)}/>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}