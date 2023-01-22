import { Box, Button, Dialog, DialogTitle, DialogContent, Typography, Skeleton } from "@mui/material";
import PopupContent from "./DialogContent";
import BasicTable from "./UtilitiesList";
import { TiEdit } from "react-icons/ti";
import { useState } from "react";
import GetData from '../../../Hook/SampleData';
import PenaltyPopup from "./PenaltyUpdateDialog";

const Utilities = ({ 
    hostLaravel,
    setting,
    settingPending,
    settingError,
    settingReload,
    settingSetReload,
    settings,
    alert,
    setAlert,
    alertType,
    setAlertType,
    alertText,
    setAlertText,
    handleAlertClose
}) => {
    const cubic_rates = JSON.parse(setting && setting.collectionReport[2].setting_value)
    const [openCubicMeter , setOpenCubicMeter] = useState(false)
    const [cubicMeterData, setCubicMeterData ] = useState({})

    const [openPenalty , setOpenPenalty] = useState(false)
    const [penaltyData, setPenaltyData ] = useState({})
    console.log(JSON.stringify(cubic_rates))

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
        userBox1:{
            padding:"10px 20px",
            backgroundColor:'rgb(26, 30, 65)',
            borderRadius:5,
        },
        userBox2:{
            width:360,
            padding:"0 15px"
        },
        pUser:{
            fontSize:15,
            margin:0
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
        boxOfUser:{
            backgroundColor:'rgb(208, 211, 236)',
            padding:"15px 20px",
            borderRadius:15,
            marginBottom:10
        },
        h2User:{
            margin:0,
        },
    }

    const isPenalty = Object.keys(penaltyData).length!==0;
    const isCubicMeter = Object.keys(cubicMeterData).length!==0
    console.log(Object.keys(cubicMeterData).length!==0 && cubicMeterData.cr.max_cubic)
    return ( 
        <Box style={styles.content}>
        <h2 style={styles.h2}>SYSTEM UTILITIES</h2>
            <Box style={styles.box}>
                <Box style={{ width:"100%" }}>
                <Box style={styles.boxOfUser}>
                <h2 style={styles.h2User}>RESIDENTIAL RATE</h2>
                        { settings && setting && !settingPending && cubic_rates && 
                            cubic_rates.map((cr, index)=>{
                                if(cr.usage_type==="residential"){
                                    return(
                                        <Box style={ styles.boxUser } key={cr.id}>
                                            <Box style={{ ...styles.userBox1, width:90 }}><p style={styles.pUser}>{`${cr.min_cubic}${cr.max_cubic!=0?"-":" up"}${cr.max_cubic!=0 ? cr.max_cubic:""} Cubic Meter`}</p></Box>
                                            <Box style={{ ...styles.userBox2, width:300 }}><p style={styles.pUser}>{`${cr.cubic_rate!=""? "₱ "+cr.cubic_rate+" Per Cubic Meter"  :  "₱ "+cr.fixed_rate+" Fixed Rate"}`}</p></Box>
                                            <TiEdit className={'updateIcon'}
                                            onClick={()=>{
                                                setCubicMeterData({cr, index})
                                                setOpenCubicMeter(true);
                                            }}/>
                                        </Box>
                                        )
                                }
                            })
                        }
                        
                        { settingPending &&
                            <Skeleton className="skeleton2" variant="rounded" height={40} width={"100%"} style={{ margin:"10px 0 10px 0" }} />
                        }
                <h2 style={styles.h2User}>COMMERCIAL RATE</h2>
                        { settings && setting && !settingPending && cubic_rates!==null &&
                            cubic_rates.map((cr, index)=>{
                                if(cr.usage_type==="commercial"){
                                    return(
                                        <Box style={ styles.boxUser } key={cr.id}>
                                        <Box style={{ ...styles.userBox1, width:90 }}><p style={styles.pUser}>{`${cr.min_cubic}${cr.max_cubic!=0?"-":" up"}${cr.max_cubic!=0 ? cr.max_cubic:""} Cubic Meter`}</p></Box>
                                        <Box style={{ ...styles.userBox2, width:300 }}><p style={styles.pUser}>{`${cr.cubic_rate!=""? "₱ "+cr.cubic_rate+" Per Cubic Meter"  :  "₱ "+cr.fixed_rate+" Fixed Rate"}`}</p></Box>
                                            <TiEdit className={'updateIcon'}
                                            onClick={()=>{
                                                setCubicMeterData({cr, index})
                                                setOpenCubicMeter(true);
                                            }}/>
                                        </Box>
                                        )
                                }
                            })
                        }
                        
                        { settingPending &&
                            <Skeleton className="skeleton2" variant="rounded" height={40} width={"100%"} style={{ margin:"10px 0 10px 0" }} />
                        }
                    </Box>

                <Box style={styles.boxOfUser}>
                    <h2 style={styles.h2User}>PENALTY</h2>
                        { settings && setting && !settingPending &&

                            <Box style={ styles.boxUser } key={setting.collectionReport[1].setting_key}>
                                <Box style={styles.userBox1}><p style={styles.pUser}>Percent</p></Box>
                                <Box style={styles.userBox2}><p style={styles.pUser}>{`${setting.collectionReport[1].setting_value}%`}</p></Box>
                                <TiEdit className={'updateIcon'}
                                onClick={()=>{
                                    setPenaltyData(setting.collectionReport[1])
                                    setOpenPenalty(true)
                                }}/>
                            </Box>
                        }
                        { settingPending &&
                            <Skeleton className="skeleton2" variant="rounded" height={40} width={"100%"} style={{ margin:"10px 0 10px 0" }} />
                        }
                    </Box>

                    <Box style={styles.boxOfUser}>
                    <h2 style={styles.h2User}>DUE DATE</h2>
                        { settings && setting && !settingPending &&

                            <Box style={ styles.boxUser } key={setting.collectionReport[0].setting_key}>
                                <Box style={styles.userBox1}><p style={styles.pUser}>Day</p></Box>
                                <Box style={{ ...styles.userBox2, width:410 }}><p style={styles.pUser}>{`Day ${setting.collectionReport[0].setting_value} of the month`}</p></Box>
                            </Box>
                        }
                        { settingPending &&
                            <Skeleton className="skeleton2" variant="rounded" height={40} width={"100%"} style={{ margin:"10px 0 10px 0" }} />
                        }
                    </Box>

                {isCubicMeter && <Dialog open={openCubicMeter} maxWidth={'xs'} fullWidth>
                <DialogTitle style={{margin:0,  textAlign:"left"}}>
                    <Typography gutterBottom fontWeight={"bold"} fontSize={30} style={{margin:"0 auto", borderBottom:"1px solid gray"}}>
                        {Object.keys(cubicMeterData).length!==0 && `${cubicMeterData.cr.usage_type.toUpperCase()} ( ${cubicMeterData.cr.min_cubic} ${cubicMeterData.cr.max_cubic!=0?" - ":" up"} ${cubicMeterData.cr.max_cubic!=0? cubicMeterData.cr.max_cubic:""} )`}
                    </Typography>
                    </DialogTitle>

                    <DialogContent >
                            <PopupContent
                            alert={alert}
                            setAlert={setAlert}
                            alertType={alertType}
                            setAlertType={setAlertType}
                            alertText={alertText}
                            setAlertText={setAlertText}
                            handleAlertClose={handleAlertClose}
                            setReload={settingSetReload}
                            reload={settingReload}
                            hostLaravel={hostLaravel}
                            cubic_rates={cubic_rates}
                            isCubicMeter={isCubicMeter}
                            setCubicMeterData={setCubicMeterData}
                            cubicMeterData={cubicMeterData}
                            openCubicMeter={openCubicMeter}
                            setOpenCubicMeter={setOpenCubicMeter}
                            />
                    </DialogContent>
                </Dialog>}
                {isPenalty && <Dialog open={openPenalty} maxWidth={'xs'} fullWidth>
                <DialogTitle style={{margin:0,  textAlign:"left"}}>
                    <Typography gutterBottom fontWeight={"bold"} fontSize={30} style={{margin:"0 auto", borderBottom:"1px solid gray"}}>
                        PENALTY
                    </Typography>
                    </DialogTitle>

                    <DialogContent >
                        <PenaltyPopup
                            setPenaltyData={setPenaltyData}
                            penaltyData={penaltyData}
                            alert={alert}
                            setAlert={setAlert}
                            alertType={alertType}
                            setAlertType={setAlertType}
                            alertText={alertText}
                            setAlertText={setAlertText}
                            handleAlertClose={handleAlertClose}
                            setReload={settingSetReload}
                            reload={settingReload}
                            hostLaravel={hostLaravel}
                        />
                    </DialogContent>
                </Dialog>}
            </Box>
            </Box>
        </Box>
     );
}
 
export default Utilities;