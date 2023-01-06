import { Box, } from '@mui/material';
import '../Styles/header.css'
import { useState } from 'react';
import AuthUser from '../Hook/AuthUser';
import { useNavigate } from 'react-router-dom';
import UserButton from './UserButton';

const Header = ({logoutUser, userType}) => {
    const styles = {
        logodiv:{
            margin:"0 5px"
        },
        logo:{
            height:"55px"
        }

    }
    return ( 
        <Box className="header">
            <UserButton
            logoutUser={logoutUser}
            userType={userType}
            />
        </Box>
     );
}
 
export default Header;