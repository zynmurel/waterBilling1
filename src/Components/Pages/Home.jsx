import { Box, Button, Card, Typography, Alert, Snackbar, Modal } from '@mui/material';
import GetData from '../../Hook/SampleData'
import { useState } from 'react';
import { MdCalendarToday, MdCalendarViewMonth, MdOutlineVerifiedUser, MdOutlineWaterDrop, MdPerson, MdPersonAddDisabled, MdPersonOff, MdPersonPin, MdPersonRemove } from "react-icons/md";
import '../../Styles/PageStyles/home.css'
import axios from 'axios';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

const Home = ({ hostLaravel, month, collectionReports, consumerReports, dateNow}) => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const { data:collection , isPending:collectionPending, error:collectionError } = collectionReports
    const { data:consumer , isPending:consumerPending, error:consumerError, reload, setReload } = consumerReports
    var makeDate = new Date();
    const prev = new Date(makeDate.getFullYear(), makeDate.getMonth()-1)
    const isGenerate = GetData(hostLaravel, `api/isGenerate/${prev.getFullYear()}/${month[prev.getMonth()].slice(0,3)}`)
    const { data:regen , isPending:regenIsPending, error:regenError, reload:regenReload, setReload:setRegenReload } = isGenerate
    console.log(isGenerate && isGenerate.data!==null)

    const rowsPerPage = 10
    const handleOpen = () => {
        setOpen(true);
      };
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setPage(0);
      };
      const handleClose = () => {
        setOpen(false);
      };
    const handleSubmit = () => {
        const headers = { 
            'Content-type' : 'application/json',
            'Accept' : 'application/json',
          };
          axios.put(`${hostLaravel}/api/generateDelinquents`, [], { headers })
              .then(response => {
                console.log(response)
                setReload(reload? false:true)
                setAlert(true)
                setAlertText('Delinquents Generated!')
                setAlertType("success")
            })
              .catch(error => {
                console.error('There was an error!', error);
                setAlert(true)
                setAlertText(error.response.data.message)
                setAlertType("error")
            });
    }
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
        },
          tableRow1:{ fontWeight:'bold',fontSize:13,  textAlign:'center', borderWidth:1, borderStyle:'solid', justifyContent:'center', padding:10 },
          tableRow:{ fontWeight:'bold',fontSize:13,  textAlign:'center', borderWidth:1, borderStyle:'solid', justifyContent:'center', padding:10, marginTop:-1 },
          generateButton:{padding:10, color:'white', backgroundColor:'#D1D1D1', fontSize:15, marginLeft:10},
          style:{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid orange',
              boxShadow: 24,
              pt: 2,
              px: 4,
              pb: 3,
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
                                {consumerPending && <span style={styles.isPending}>...</span>}
                                {consumerError && <span style={styles.error}>err</span>}
                            </Typography>
                        </Box>
                    </Card>
                    </Box>
                    <Box>
                            <p style={{ margin:0, width:380, marginTop:0 }}>Generate Delinquent :</p>
                            <Button variant="contained"  style={{ color:'white', backgroundColor:regenIsPending || isGenerate.data===null || isGenerate.data.delinquents.length===0?'#CBCBCB':'orange', fontSize:18, padding:"18px 10px", margin:"10px 25px", width:400,  }}
                            onClick={()=>{
                                setOpen(true);
                                //setReload(!reload)
                                //handleSubmit()
                                //setRegenReload(!regenReload)
                            }}
                            disabled={regenIsPending || isGenerate.data===null || isGenerate.data.delinquents.length===0 }
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

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...styles.style, width: 550 , color:'black'}}>
                    <h2 id="parent-modal-title">Delinquent Consumer/s of {month[prev.getMonth()].slice(0,3)} {prev.getFullYear()}</h2>
                
                    <TableContainer component={Paper} sx={{ maxHeight:450 }}>
                    <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell style={{ width:20, fontWeight:'bold' }}>No.</TableCell>
                            <TableCell style={{ width:50, fontWeight:'bold' }} align="left">ID</TableCell>
                            <TableCell style={{ flex:1, fontWeight:'bold' }} align="left">Name</TableCell>
                            <TableCell style={{ width:120, fontWeight:'bold' }} align="left">Barangay</TableCell>
                            <TableCell style={{ width:20, fontWeight:'bold' }} align="left">Purok</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {!regenIsPending && isGenerate.data!==null && isGenerate.data.delinquents.length!==0 &&
                       isGenerate.data.delinquents
                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                       .map((del, index)=>(
                            <TableRow
                            key={del.consumer_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell style={{ width:20 }}>{index+1}</TableCell>
                            <TableCell style={{ width:50 }} align="left">{del.consumer_id.toString().padStart(6, "0")}</TableCell>
                            <TableCell style={{ flex:1 }} align="left">{del.consumer_name}</TableCell>
                            <TableCell style={{ width:150 }} align="left">{del.barangay}</TableCell>
                            <TableCell style={{ width:20 }} align="center">{del.purok}</TableCell>
                            </TableRow>
                        ))
                        }
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <TablePagination
                    sx={
                        {
                        color:'rgb(12,20,52)',
                        boxShadow:'0px 0px 1px 0px rgb(0,0,0,.5)'
                        }}
                        component="div"
                        rowsPerPageOptions={[]}
                        count={!regenIsPending && isGenerate.data!==null && isGenerate.data.delinquents.length!==0? isGenerate.data.delinquents.length:0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <div style={{ width:'100%',display:'flex', alignItems:"flex-end", justifyContent:'flex-end', marginTop:10 }}>
                        <Button style={{ ...styles.generateButton }}
                        onClick={()=>{
                            setOpen(false);
                            setPage(0);
                        }
                        }
                        >
                            Cancel
                        </Button>
                        <Button style={{ ...styles.generateButton, backgroundColor:'orange' }}
                        onClick={()=>{
                            setReload(!reload)
                            handleSubmit()
                            setRegenReload(!regenReload)
                            setOpen(false)
                        }}>
                            Generate
                        </Button>
                    </div>
                    </Box>
                </Modal>
           
                </Box>
            </Box>
     );
}
 
export default Home;