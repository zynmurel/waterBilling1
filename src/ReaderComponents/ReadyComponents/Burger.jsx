import { GiHamburgerMenu } from "react-icons/gi";
import { Box, Button, Popover } from '@mui/material';
import {NavLink } from 'react-router-dom';
import { DashboardOutlined, } from '@ant-design/icons';
import { BsInputCursorText } from "react-icons/bs";
import { useState } from 'react';
const UserButton = ({ logoutUser, userType, month, year }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const activeStyle = {backgroundColor:'rgb(42, 53, 94)',color:"white"}
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const styles = {
        box:{
            display:'flex',
            height:50
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
            boxShadow:'0px 2px 3px 0px rgb(0,0,0,.5)',
            backgroundColor:'white'
        },
        text:{
            margin:0
        }
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return ( 
        <div style={{ /*visibility:'hidden'*/ }}>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                className={'readerPopUp'}
            >   
                <Button
                    style={styles.logout}
                    onClick={logoutUser}
                    >
                    Logout
                </Button>   
            </Popover> 

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                className={'readerPopUpMobile'}
            >   

            <div className="burgerContent">
            <NavLink
                to="/reading"
                style={({ isActive }) =>
                isActive ? {...activeStyle, ...styles.navbar}: styles.navbar
                }
                className={'navbarMobile'}
            >
            <BsInputCursorText className='iconMobile'/>&nbsp;&nbsp;Reader
            </NavLink>

            <NavLink
                to="/meterReading"
                style={({ isActive }) =>
                isActive ? {...activeStyle, ...styles.navbar}: styles.navbar
                }
                className={'navbarMobile'}
            >
                <DashboardOutlined className='iconMobile'/>&nbsp;&nbsp;Meter Readings
            </NavLink>
                <Box
                    className="readerLogoutMobile"
                    onClick={logoutUser}
                    >
                    Logout
                </Box>  
                </div> 
            </Popover> 

            <Box >
            <GiHamburgerMenu
            className="readerBurger"
            onClick={handleClick}/>
            </Box>
        </div>
     );
}
 
export default UserButton;