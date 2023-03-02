import { Box } from "@mui/system";
import GetData from '../../../Hook/SampleData';
import { TiEdit } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import UpdateUser from "./UpdateUserPopUp";
import { useState } from "react";
import { Button, Skeleton, Modal, TextField } from "@mui/material";
import UpdateUserChildren from "./UpdateUserChildren";
import UpdatePassword from "./UpdatePasswordPopup";
import UpdatePasswordChildren from "./UpdatePasswordChildren";
import axios from "axios";
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
    const [userId, setUserId] = useState();
    const [openDelete, setOpenDelete] = useState(false);
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newConfirmPass, setNewConfirmPass] = useState('')
    const [openPasswordPopup, setOpenPasswordPopup] = useState(false)
    const [openAddReader, setOpenAddReader] = useState(false)
  const [openEmailPopup, setOpenEmailPopup] = useState(false)
  function handleDeleteUser() {
    axios.delete(`${hostLaravel}/api/user/${userId}`)
        .then(response => {
            setOpenDelete(false)
            setReload(reload? false: true)
            setAlert(true)
            setAlertText("Reader Deleted!")
            setAlertType("success")
        })
        .catch(error => {
            setAlert(true)
            setAlertText(error.response.data.message.includes("The email has already been taken.")? "The username has already been taken":error.response.data.message)
            setAlertType("error")
        });
}
    const handleAddReader = () => {
        const data ={
            email:newEmail,
            password:newPassword,
            password_confirmation:newConfirmPass,
            user_type:"Reader"
        }
        const headers = { 
            'Content-type' : 'application/json',
            'Accept' : 'application/json',
            };
            axios.post(`${hostLaravel}/api/user`, data, { headers })
                .then(response => {
                console.log(response)
                setOpenAddReader(false)
                setReload(reload? false: true)
                setAlert(true)
                setAlertText("Reader Added!")
                setAlertType("success")})
                .catch(error => {
                console.error('There was an error!', error)
                setAlert(true)
                setAlertText(error.response.data.message.includes("The email has already been taken.")? "The username has already been taken":error.response.data.message)
                setAlertType("error")
            });
    }
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
                            <Box style={{ ...styles.userBox2, width:320 }}><p style={styles.pUser}>{rdr.email}</p></Box>
                            <div style={{ width:70, display:'flex', justifyContent:'flex-end' }}>
                            { usersData.data.reader.length>1 &&
                                <MdDeleteForever  
                                className={'updateIcon'}
                                style={{ backgroundColor:'#E80000' }}
                                onClick={()=>{
                                    setOpenDelete(true)
                                    setUserId(rdr.user_id)
                                }}/>
                            }
                            <TiEdit  className={'updateIcon'}
                            onClick={()=>{
                                setOpenPasswordPopup(false)
                                setOpenEmailPopup(true)
                                setUserUpdate(rdr)
                            }}/>
                            </div>
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
                        <div style={{ width:'100%', display:'flex', justifyContent:'flex-end' }}>
                        <Button
                        onClick={()=>setOpenAddReader(true)}
                        style={{ padding:10, backgroundColor:'rgb(26, 30, 65)', color:'white' }}
                        >Add Reader</Button>
                        </div>
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



                    <Modal
                    open={openAddReader}
                    onClose={()=>setOpenAddReader(false)}
                    style={{  }}
                >
                    <Box style={{ 
                      backgroundColor:'white', 
                      position:'absolute', 
                      top:'50%', 
                      left:'50%',
                      transform: 'translate(-50%, -50%)',
                      justifyContent:'center', 
                      alignItems:'center', }}>
                    <h2 style={{ margin:0 , backgroundColor:'rgb(12,20,52)', padding:"5px 15px"}}>Add New Reader</h2>
                    <div style={{ padding:10, color:'black', display:"flex", flexDirection:'column', justifyContent:'center' }}>
                    <TextField 
                        id="outlined-basic" 
                        label="Input New Username" 
                        variant="outlined" 
                        type="text"
                        placeholder="ex: user_sample123"
                        onChange={(e) =>{
                            const val = e.target.value
                            setNewEmail(val);
                        }}
                        style={{ width:200, margin:"20px 50px 20px 50px"}}
                        value={newEmail}
                        //error={newEmail.length<8 }
                        required
                        />

                    <TextField 
                        id="outlined-basic" 
                        label="Input New Password" 
                        variant="filled" 
                        type="text"
                        placeholder="ex: password123"
                        onChange={(e) =>{
                            const val = e.target.value
                            setNewPassword(val);
                            //setPasswordErr(false)
                        }}
                        style={{ width:200, margin:"20px 50px 20px 50px"}}
                        value={newPassword}
                        //error={passwordErr}
                        required
                        />

                        <TextField 
                        id="outlined-basic" 
                        label="Confirm Password" 
                        variant="filled" 
                        type="text"
                        placeholder="ex: password123"
                        onChange={(e) =>{
                            const val = e.target.value
                            setNewConfirmPass(val);
                            //setConfirmErr(false)
                        }}
                        style={{ width:200, margin:"0px 50px 30px 50px"}}
                        value={newConfirmPass}
                        //error={confirmErr}
                        required
                        />

                    <div style={{ width:'100%',display:'flex', alignItems:"flex-end", justifyContent:'flex-end', marginTop:0 }}>
                    <Button style={{ ...styles.generateButton }}
                        onClick={()=>{
                          setOpenAddReader(false)
                        }
                        }
                        >
                            Cancel
                        </Button>
                        <Button style={{ ...styles.generateButton }}
                        onClick={()=>{
                          handleAddReader()
                        }
                        }
                        >
                            Add Reader
                        </Button>
                    </div>
                    </div>
                    </Box>
                </Modal>
                <Modal
                    open={openDelete}
                    onClose={()=>setOpenDelete(false)}
                    style={{  }}
                >
                    <Box style={{ 
                      backgroundColor:'white', 
                      position:'absolute', 
                      top:'50%', 
                      left:'50%',
                      transform: 'translate(-50%, -50%)',
                      justifyContent:'center', 
                      alignItems:'center', }}>
                        <h2 style={{ margin:0 , backgroundColor:'rgb(12,20,52)', padding:"5px 15px"}}>Confirm Delete</h2>
                        <p style={{ color:'black', padding:10, margin:0 }}>Do you want to Delete this Reader?</p>
                        <div style={{ padding:10, color:'black', display:"flex", flexDirection:'row', justifyContent:'center' }}>
                        
                         <Button style={{ color:'gray' }}
                        onClick={()=>{
                          setOpenDelete(false)
                          setUserId("")
                        }
                        }
                        >
                            Cancel
                        </Button>
                        <Button style={{ color:'red' }}
                        onClick={()=>{
                            handleDeleteUser()
                        }
                        }
                        >
                            Delete
                        </Button>
                        </div>
                    
                    </Box>
                </Modal>



            </Box>
        
        </Box>
        </Box>
     );
}
 
export default Accounts;