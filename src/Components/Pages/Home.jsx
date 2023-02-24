import { Box, Button, Card, Typography, Alert, Snackbar } from '@mui/material';
import GetData from '../../Hook/SampleData'
import { useState } from 'react';
import { MdCalendarToday, MdCalendarViewMonth, MdOutlineVerifiedUser, MdOutlineWaterDrop, MdPerson, MdPersonAddDisabled, MdPersonOff, MdPersonPin, MdPersonRemove } from "react-icons/md";
import '../../Styles/PageStyles/home.css'

const Home = ({ hostLaravel, month, collectionReports, consumerReports, dateNow}) => {

    const { data:collection , isPending:collectionPending, error:collectionError } = collectionReports
    const { data:consumer , isPending:consumerPending, error:consumerError, reload, setReload } = consumerReports
    const delinquentsData = GetData(hostLaravel, 'api/generateDelinquents')
    const { data:delinquents , isPending:delIsPending, error:delError, reload:delReload, setReload:delSetReload } = delinquentsData
    console.log(consumer && consumer.consumerReport)
    var makeDate = new Date();
    const prev = new Date(makeDate.getFullYear(), makeDate.getMonth()-1)


  const [alert, setAlert] = useState(false)
  const [alertType, setAlertType] = useState("success")
  const [alertText, setAlertText] = useState("")

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }
        setAlertText("")
        setAlert(false);
    }
    const styles = {
        home:{
            color:"grey"
        },
        container:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            padding:10
        },
        box1:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            flex:1
        },
        box2:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            flex:6,
            width:450,
            backgroundColor:'white',
            color:"rgb(75, 75, 75)",
            padding:"10px 0px",
            margin:10
        },
        box2_1:{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
            margin:2,
            width:400,
        },
        text1:{
            fontSize:100, 
            margin:0, 
            color:"rgb(12,20,52)",
            margin:" -25px 0 0 0"
        },
        text2:{
            fontSize:60, 
            margin:" -25px 0 5px 0"
        },
        boxFont:{
            fontSize:28,
            color:"rgb(12,20,52)"
        },
        isPending:{
            color:"gray", 
            margin:0
        },
        error:{
            color:"rgb(220, 24, 24)", 
            margin:0
        }
        
    }
    return ( 
            <Box className="home" sx={{...styles.home}}>
                <Box className="container" sx={{...styles.container}}>
                    <Box className="box1" sx={styles.box1}>
                        <h1 style={styles.text1}>BALILIHAN</h1>
                        <h1 style={styles.text2}>WATERWORKS</h1>
                    </Box>
                    <Box style={{ display:'flex', flexDirection:'row' }}>
                    <Box>
                    <p style={{ margin:0, width:380 }}>Consumers :</p>
                    <Card style={styles.box2}>
                        <Box style={styles.box2_1}>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize} style={{ justifyContent:'center', alignItems:'center', margin:0 }}>
                            <MdPerson fontSize={20} color='white'  style={{ marginRight:0, marginBottom:-5, padding:5, backgroundColor:'#00A115', borderRadius:30 }} /> Connected :
                            </Typography>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize} sx={{color:styles.boxFont.color}}>
                                {consumer&& !consumerPending && consumer.consumerReport.totalConnected}
                                {consumerPending && <span style={styles.isPending}>...</span>}
                                {consumerError && <span style={styles.error}>err</span>}
                            </Typography>
                        </Box>
                        <Box style={styles.box2_1}>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize}>
                            <MdPersonOff fontSize={20} color='white'  style={{ marginRight:0, marginBottom:-5, padding:5,backgroundColor:'#D21C00', borderRadius:30 }} /> Disconnected :
                            </Typography>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize} sx={{color:styles.boxFont.color}}>
                                {consumer&& !consumerPending && <>
                                    {consumer.consumerReport.totalDisconnected}
                                    
                                </> }
                                {consumerPending && <span style={styles.isPending}>...</span>}
                                {consumerError && <span style={styles.error}>err</span>}
                            </Typography>
                        </Box>
                        <Box style={styles.box2_1}>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize} >
                            <MdPersonRemove fontSize={20} color='white'  style={{ padding:5,marginRight:7, marginBottom:-5,  backgroundColor:'#D26200', borderRadius:30 }} />
                            Delinquent :
                            </Typography>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize} sx={{color:styles.boxFont.color}}>
                            {consumer&& !consumerPending && <>
                                    {consumer.consumerReport.totalDelinquent}</>}
                                {console.log(delinquents)}
                                {consumerPending && <span style={styles.isPending}>...</span>}
                                {consumerError && <span style={styles.error}>err</span>}
                            </Typography>
                        </Box>
                    </Card>
                    </Box>
                    <Box>
                            <p style={{ margin:0, width:380, marginTop:0 }}>Generate Delinquent :</p>
                            <Button variant="contained"  style={{ color:'white', backgroundColor:'orange', fontSize:18, padding:"18px 10px", margin:"10px 25px", width:400,  }}
                            onClick={()=>{
                                setReload(!reload)
                                setAlert(!delIsPending)
                                setAlertText(`Delinquent Consumer/s Generated`)
                            }}
                            >Generate Delinquent/s for {month[prev.getMonth()].slice(0,3)} {prev.getFullYear()}</Button>
                            <p style={{ margin:0, width:380, marginTop:0 }}>Collection :</p>
                    <Card style={styles.box2}>
                        <Box style={styles.box2_1}>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize}>
                            <MdCalendarViewMonth fontSize={20} color='white'  style={{ padding:5,marginRight:7, marginBottom:-5,  backgroundColor:'rgb(12,20,52)', borderRadius:30 }} /> {month[prev.getMonth()].slice(0,3)} {prev.getFullYear()} :
                            </Typography>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize} sx={{color:styles.boxFont.color}}>
                                {collection&& !collectionPending ?`₱ ${collection.collectionReport.totalCollection }`:''}
                                {collectionPending && <span style={styles.isPending}>...</span>}
                                {collectionError && <span style={styles.error}>err</span>}
                            </Typography>
                        </Box>
                    </Card>
                    </Box>
                    </Box>

                <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose} className={'snackbarPopup'}>
                    <Alert
                    onClose={handleAlertClose}  
                    severity={alertType} sx={{ width: '100%' }}
                    >
                    {alertText}
                    </Alert>
                </Snackbar>
           
                </Box>
            </Box>
     );
}
 
export default Home;