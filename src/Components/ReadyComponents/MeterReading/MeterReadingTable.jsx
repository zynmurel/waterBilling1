import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import {Box, Modal, Button} from '@mui/material';
import GetData from '../../../Hook/SampleData'
import { useState } from 'react';
import Base64Image from '../../../Hook/Base64Image';


export default function MeterReadingTable({
  page, 
  setPage, 
  meterReadingsData,
  MRisPending,
  MRerror,
  barangay,
  purok,
  name,
}) {

  let consumers = meterReadingsData && meterReadingsData.newReading 


  console.log(consumers)
  const [openImage, setOpenImage] = useState(false)
  const [proofImage, setProofImage] = useState('')
  const [imageInfo, setImageInfo] = useState({date:"", reading:"", consumer_name:"", place:"", consumer_id:""})
  const bCon = consumers && barangay && purok? consumers.filter((c)=> c.barangay === barangay && (c.purok == purok+"" || purok ==7)):consumers
  const newCon = bCon? bCon.filter((c)=> `${c.consumer_name.toLowerCase()}`.includes(name.toLowerCase())||`${c.consumer_id}`.includes(name)) : bCon
  console.log(consumers && bCon)
  const rowsPerPage = 10;
  const readingDate = new Date(imageInfo.date)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
  };

  const columns = [
    { id: 'consumer_id', label: 'Consumer ID', minWidth: 100, align:'left' },
    { id: 'consumer_name', label: 'Consumer Name', minWidth: 150, align:'left' },
    { id: 'previous_reading', label: 'Past Reading', minWidth: 80, align:'center' },
    { id: 'present_reading', label: 'Current Reading', minWidth: 80, align:'center' },
    { id: 'total_reading', label: 'Total Reading', minWidth: 80, align:'center' },
    { id: 'image', label: 'Reading Photo', minWidth: 80, align:'center' },
];

const styles = {
  generateButton:{padding:5, color:'white', backgroundColor:'rgb(12,20,52)', fontSize:12, marginLeft:10},
  
}

console.log(meterReadingsData)
  return (
    <Paper style={{ width:1000 }}>
      <TableContainer sx={{ height: 550 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{
        "& th": {
          fontSize: "1rem",
          color: "white",
          fontWeight:"bold",
          color:"rgb(12,20,52)"
        }
      }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!MRisPending && meterReadingsData && newCon 
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow tabIndex={-1} key={row.reading_id}
                   >

                    {columns.map((column) => {
                      let value = row[column.id];
                      if(column.id==="total_reading"){
                        value = (row['present_reading']- row['previous_reading'])+ " cu m"
                      }else if(column.id==="present_reading"){
                        value = row['present_reading'].toString().padStart(5,"0")
                      }else if(column.id==="previous_reading"){
                        value = row['previous_reading'].toString().padStart(5,"0")
                      }
                      return (
                        <TableCell key={column.id} align={column.align} style={{ padding:10 }} onClick={()=>{ 
                            // setConsumerPopup(true); setConsumerInfo(row) 
                            }}>
                          {value}
                          {column.id==='image' && 
                          <Button style={{ color:'orange', fontWeight:'bold', backgroundColor:'#FFF8E4', margin:0, fontSize:12 }}
                          onClick={()=>{
                            setOpenImage(true)
                            setProofImage(row.proof_image)
                            setImageInfo({date:row.created_at, reading:row.present_reading, consumer_name:row.consumer_name, place:`${row.barangay} Purok ${row.purok}`, consumer_id:row.consumer_id})
                            }}>
                            View Photo
                          </Button>}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
         {
           MRisPending &&
          <Box sx={{ display: 'flex', height:520, justifyContent:"center", alignItems:"center",}}>
            <CircularProgress />
           </Box>
          }
          {
            MRerror &&
           <Box sx={{ display: 'flex', height:520, justifyContent:"center", alignItems:"center" }}>
             <h1 style={{color:"rgb(255, 82, 82)"}}>{"Error"}</h1>
            </Box>
           }
          { 
            !MRerror && !MRisPending  && meterReadingsData && meterReadingsData.newReading.length === 0 &&
            <Box sx={{ display: 'flex', height:520, justifyContent:"center", alignItems:"center",}}>
              <h1 style={{color:"gray"}}>No Readings</h1>
            </Box>
          }
      </TableContainer>
      <TablePagination
      sx={
        {
          color:'rgb(12,20,52)',
          boxShadow:'0px 0px 1px 0px rgb(0,0,0,.5)'
        }}
        component="div"
        rowsPerPageOptions={[]}
        count={!MRisPending && meterReadingsData ? meterReadingsData.newReading.length:0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
                    open={openImage}
                    onClose={()=>setOpenImage(false)}
                    style={{  }}
                >
                    <Box style={{ 
                      backgroundColor:'white', 
                      width:320, 
                      position:'absolute', 
                      top:'50%', 
                      left:'50%',
                      transform: 'translate(-50%, -50%)',
                      justifyContent:'center', 
                      alignItems:'center', }}>
                    <h2 style={{ margin:0 , backgroundColor:'rgb(12,20,52)', padding:"5px 15px"}}>Reading Image</h2>
                    <div style={{ padding:10, color:'black' }}>
                      <div style={{ backgroundColor:'#FFF3D0', padding:10, borderRadius:5 , marginBottom:5}}>
                      <p style={{ color:'gray', fontSize:10, margin:0, marginBottom:-2 }}>Consumer Name</p>
                      <p style={{  fontSize:18, margin:0, fontWeight:'bold' }}>{imageInfo.consumer_name}</p>
                      <p style={{  fontSize:13, margin:0, }}>{imageInfo.place}</p>
                      <p style={{  fontSize:13, margin:0, marginTop:10 }}>Reading : {imageInfo.reading.toString().padStart(5,"0")}</p>
                      <p style={{  fontSize:13, margin:0, }}>Reading Date : {`${readingDate.getMonth()+1}/${readingDate.getDate()}/${readingDate.getFullYear()}`}</p>
                      </div>
                      {proofImage!=="" && <Base64Image src={proofImage} />}

                    <div style={{ width:'100%',display:'flex', alignItems:"flex-end", justifyContent:'flex-end', marginTop:0 }}>
                        <Button style={{ ...styles.generateButton }}
                        onClick={()=>{
                          setOpenImage(false)
                        }
                        }
                        >
                            Close
                        </Button>
                    </div>
                    </div>
                    </Box>
                </Modal>
    </Paper>
  );
}

