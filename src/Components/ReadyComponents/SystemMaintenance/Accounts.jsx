import { Box } from "@mui/system";
import GetData from '../../../Hook/SampleData';
import { TiEdit } from "react-icons/ti";
import UpdateUser from "./UpdateUserPopUp";
import { useState } from "react";
import { Button } from "@mui/material";
import UpdateUserChildren from "./UpdateUserChildren";

const Accounts = ({hostLaravel}) => {
    const styles = {
        content:{
            padding:"0 20px",
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
        },
        h2:{
            marginTop:0
        },
        box:{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            backgroundColor:'rgb(250, 250, 250)',
            padding:20,
            width:540,
            height:515,
            marginTop:20,
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
        pUser:{
            fontSize:18,
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
        userBox1:{
            padding:"10px 20px",
            backgroundColor:'rgb(26, 30, 65)',
            borderRadius:5,
        },
        userBox2:{
            width:350
        }
    }
    const [userUpdate, setUserUpdate] = useState({})
    console.log(userUpdate)
  const usersData = GetData(`${hostLaravel}/api`, '/user');
  const {data:users, isPending, error, reload, setReload}= usersData
  console.log(usersData && usersData)
    return ( 
        <Box style={styles.content}>
        <Box style={styles.box}>
        <h2 style={styles.h2}>MANAGE ACCOUNT</h2>
        
           
            <Box style={{ width:"100%" }}>
                    <Box style={styles.boxOfUser}>
                        <h2 style={styles.h2User}>ADMIN</h2>
                        { usersData && usersData.data && 

                        usersData.data.admin.map((admn)=>(
                            <Box style={ styles.boxUser } key={admn.user_id}>
                            <Box style={styles.userBox1}><p style={styles.pUser}>Email</p></Box>
                            <Box style={styles.userBox2}><p style={styles.pUser}>{admn.email}</p></Box>
                            <TiEdit style={styles.userEditIcon} className={'updateIcon'}
                            onClick={()=>{
                                setUserUpdate(admn)
                            }}/>
                            </Box>
                        ))
                        }
                    </Box>


                    <Box style={styles.boxOfUser}>
                        <h2 style={styles.h2User}>CASHIER</h2>
                        { usersData && usersData.data && 

                        usersData.data.cashier.map((cashr)=>(
                            <Box style={ styles.boxUser } key={cashr.user_id}>
                            <Box style={styles.userBox1}><p style={styles.pUser}>Email</p></Box>
                            <Box style={styles.userBox2}><p style={styles.pUser}>{cashr.email}</p></Box>
                            <TiEdit style={styles.userEditIcon} className={'updateIcon'}
                            onClick={()=>{
                                setUserUpdate(cashr)
                            }}/>
                            </Box>
                        ))
                        }
                    </Box>

                    <Box style={styles.boxOfUser}>
                        <h2 style={styles.h2User}>READER/S</h2>
                        { usersData && usersData.data && 

                        usersData.data.reader.map((rdr)=>(
                            <Box style={ styles.boxUser } key={rdr.user_id}>
                            <Box style={styles.userBox1}><p style={styles.pUser}>Email</p></Box>
                            <Box style={styles.userBox2}><p style={styles.pUser}>{rdr.email}</p></Box>
                            <TiEdit style={styles.userEditIcon} className={'updateIcon'}
                            onClick={()=>{
                                setUserUpdate(rdr)
                            }}/>
                            </Box>
                        ))
                        }
                    </Box>
                    <UpdateUser
                    userUpdate={userUpdate}
                    setUserUpdate={setUserUpdate}>
                        <UpdateUserChildren
                        reload={reload}
                        setReload={setReload}
                        hostLaravel={hostLaravel}
                        userUpdate={userUpdate}
                        setUserUpdate={setUserUpdate}/>
                    </UpdateUser>
            </Box>
        
        </Box>
        </Box>
     );
}
 
export default Accounts;