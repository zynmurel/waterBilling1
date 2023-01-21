import { Box, Button, Dialog, DialogTitle, DialogContent, Typography, Skeleton } from "@mui/material";
import PopupContent from "./DialogContent";
import BasicTable from "./UtilitiesList";
import { TiEdit } from "react-icons/ti";
import { useState } from "react";
import GetData from '../../../Hook/SampleData';

const Utilities = ({ 
    setting,
    settingPending,
    settingError,
    settingReload,
    settingSetReload,
    settings,
}) => {
    console.log(setting && setting.collectionReport[0])
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
    return ( 
        <Box style={styles.content}>
        <h2 style={styles.h2}>SYSTEM UTILITIES</h2>
            <Box style={styles.box}>
                <Box style={{ width:"100%" }}>
                    <Box style={styles.boxOfUser}>
                    <h2 style={styles.h2User}>DUE DATE</h2>
                        { settings && setting && !settingPending &&

                            <Box style={ styles.boxUser } key={setting.collectionReport[0].setting_key}>
                                <Box style={styles.userBox1}><p style={styles.pUser}>Day</p></Box>
                                <Box style={styles.userBox2}><p style={styles.pUser}>{`Day ${setting.collectionReport[0].setting_value} of the month`}</p></Box>
                                <TiEdit className={'updateIcon'}
                                onClick={()=>{
                                }}/>
                            </Box>
                        }
                        { settingPending &&
                            <Skeleton className="skeleton2" variant="rounded" height={40} width={"100%"} style={{ margin:"10px 0 10px 0" }} />
                        }
                    </Box>

                <Dialog open={false} maxWidth={'xs'} fullWidth>
                <DialogTitle style={{margin:0,  textAlign:"left"}}>
                    <Typography gutterBottom fontWeight={"bold"} fontSize={30} style={{margin:"0 auto", borderBottom:"1px solid gray"}}>
                        "hehe"
                    </Typography>
                    </DialogTitle>

                    <DialogContent >
                            <PopupContent
                            />
                    </DialogContent>
                </Dialog>
            </Box>
            </Box>
        </Box>
     );
}
 
export default Utilities;