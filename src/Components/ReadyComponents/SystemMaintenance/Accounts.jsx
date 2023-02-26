import { Box } from "@mui/system";
import GetData from '../../../Hook/SampleData';
import { TiEdit } from "react-icons/ti";
import UpdateUser from "./UpdateUserPopUp";
import { useState } from "react";
import { Button, Skeleton } from "@mui/material";
import UpdateUserChildren from "./UpdateUserChildren";
import UpdatePassword from "./UpdatePasswordPopup";
import UpdatePasswordChildren from "./UpdatePasswordChildren";

const Accounts = ({
    users, isPending, error, reload, setReload, usersData,
    hostLaravel,

    alert,
    setAlert,
    alertType,
    setAlertType,
    alertText,
    setAlertText,
    handleAlertClose
}) => {
    const styles = {
        content:{
            padding:"0 20px",
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
        },
        h2:{
            marginTop:20
        },
        box:{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            backgroundColor:'rgb(240, 240, 240)',
            padding:20,
            width:540,
            height:455,
            borderRadius:5,
            overflow:'auto',
        },
        button:{
            marginTop:10
        },
        boxUser:{
            display:'flex',
             alignItems:'center', 
             justifyContent:'space-between',
             color:'white',
             backgroundColor:'rgb(81, 84, 111)',
             margin:"10px 0",
             borderRadius:5,
        },
        userBox1:{
            padding:"10px 10px",
            backgroundColor:'rgb(26, 30, 65)',
            borderRadius:5,
        },
        userBox2:{
            width:360
        },
        pUser:{
            fontSize:15,
            margin:0
        },
        boxOfUser:{
            backgroundColor:'rgb(208, 211, 236)',
            padding:"15px 20px",
            borderRadius:15,
            marginBottom:10
        },
        h2User:{
            margin:0,
        },
        userBox2:{
            width:360
        }
    }
    const [userUpdate, setUserUpdate] = useState({})
    console.log(userUpdate)

  const [openPasswordPopup, setOpenPasswordPopup] = useState(false)
  const [openEmailPopup, setOpenEmailPopup] = useState(false)

  console.log(usersData && usersData)
    return ( 
        <Box style={styles.content}>
        <h2 style={styles.h2}>MANAGE ACCOUNT</h2>
        <Box style={styles.box}>
        
           
            <Box style={{ width:"100%" }}>
                    <Box style={styles.boxOfUser}>
                        <h2 style={styles.h2User}>ADMIN</h2>
                        { usersData && users && !isPending &&

                        usersData.data.admin.map((admn)=>(
                            <Box style={ styles.boxUser } key={admn.user_id}>
                            <Box style={styles.userBox1}><p style={styles.pUser}>Username</p></Box>
                            <Box style={styles.userBox2}><p style={styles.pUser}>{admn.email}</p></Box>
                            <TiEdit className={'updateIcon'}
                            onClick={()=>{
                                setOpenPasswordPopup(false)
                                setOpenEmailPopup(true)
                                setUserUpdate(admn)
                            }}/>
                            </Box>
                        ))
                        }
                        { isPending &&
                            <Skeleton className="skeleton2" variant="rounded" height={40} width={"100%"} style={{ margin:"10px 0 10px 0" }} />
                        }
                    </Box>


                    <Box style={styles.boxOfUser}>
                        <h2 style={styles.h2User}>CASHIER</h2>
                        { usersData && users && !isPending &&

                        usersData.data.cashier.map((cashr)=>(
                            <Box style={ styles.boxUser } key={cashr.user_id}>
                            <Box style={styles.userBox1}><p style={styles.pUser}>Username</p></Box>
                            <Box style={styles.userBox2}><p style={styles.pUser}>{cashr.email}</p></Box>
                            <TiEdit className={'updateIcon'}
                            onClick={()=>{
                                setOpenPasswordPopup(false)
                                setOpenEmailPopup(true)
                                setUserUpdate(cashr)
                            }}/>
                            </Box>
                        ))
                        }
                        { isPending &&
                            <Skeleton className="skeleton2" variant="rounded" height={40} width={"100%"} style={{ margin:"10px 0 10px 0" }} />
                        }
                    </Box>

                    <Box style={styles.boxOfUser}>
                        <h2 style={styles.h2User}>READER/S</h2>
                        { usersData && users && !isPending &&

                        usersData.data.reader.map((rdr)=>(
                            <Box style={ styles.boxUser } key={rdr.user_id}>
                            <Box style={styles.userBox1}><p style={styles.pUser}>Username</p></Box>
                            <Box style={styles.userBox2}><p style={styles.pUser}>{rdr.email}</p></Box>
                            <TiEdit  className={'updateIcon'}
                            onClick={()=>{
                                setOpenPasswordPopup(false)
                                setOpenEmailPopup(true)
                                setUserUpdate(rdr)
                            }}/>
                            </Box>
                        ))
                        }
                        { isPending &&
                            <Box>

                            <Skeleton className="skeleton2" variant="rounded" height={40} width={"100%"} style={{ margin:"10px 0 10px 0" }} />
                            <Skeleton className="skeleton2" variant="rounded" height={40} width={"100%"} style={{ margin:"10px 0 10px 0" }} />
                            <Skeleton className="skeleton2" variant="rounded" height={40} width={"100%"} style={{ margin:"10px 0 10px 0" }} />
                            </Box>
                        }
                    </Box>
                    <UpdateUser
                    userUpdate={userUpdate}
                    setUserUpdate={setUserUpdate}
                    openEmailPopup={openEmailPopup}
                    setOpenEmailPopup={setOpenEmailPopup}>
                        <UpdateUserChildren
                        alert={alert}
                        setAlert={setAlert}
                        alertType={alertType}
                        setAlertType={setAlertType}
                        alertText={alertText}
                        setAlertText={setAlertText}
                        handleAlertClose={handleAlertClose}
                        openPasswordPopup={openPasswordPopup}
                        setOpenPasswordPopup={setOpenPasswordPopup}
                        openEmailPopup={openEmailPopup}
                        setOpenEmailPopup={setOpenEmailPopup}
                        reload={reload}
                        setReload={setReload}
                        hostLaravel={hostLaravel}
                        userUpdate={userUpdate}
                        setUserUpdate={setUserUpdate}/>
                    </UpdateUser>
                    <UpdatePassword
                    userUpdate={userUpdate}
                    setUserUpdate={setUserUpdate}
                    openPasswordPopup={openPasswordPopup}
                    setOpenEmailPopup={setOpenEmailPopup}>
                        <UpdatePasswordChildren
                        hostLaravel={hostLaravel}
                        alert={alert}
                        setAlert={setAlert}
                        alertType={alertType}
                        setAlertType={setAlertType}
                        alertText={alertText}
                        setAlertText={setAlertText}
                        handleAlertClose={handleAlertClose}
                        reload={reload}
                        setReload={setReload}
                        userUpdate={userUpdate}
                        setUserUpdate={setUserUpdate}/>
                    </UpdatePassword>
            </Box>
        
        </Box>
        </Box>
     );
}
 
export default Accounts;