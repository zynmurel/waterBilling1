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
import Box from '@mui/material/Box';
import GetData from '../../../Hook/SampleData'


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

  const bCon = consumers && barangay && purok? consumers.filter((c)=> c.barangay === barangay && (c.purok == purok || purok ==7)):consumers
  const newCon = bCon? bCon.filter((c)=> `${c.consumer_name.toLowerCase()}`.includes(name.toLowerCase())||`${c.consumer_id}`.includes(name)) : bCon
  console.log(consumers && bCon)
  const rowsPerPage = 10;

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
];

console.log(meterReadingsData)
  return (
    <Paper className='meterReadingTableContent'>
      <TableContainer sx={{ maxHeight: 570,minHeight: 550 }}>
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
                  <TableRow hover tabIndex={-1} key={row.reading_id} >
                    {columns.map((column) => {
                      let value = row[column.id];
                      if(column.id==="total_reading"){
                        value = row['present_reading']- row['previous_reading']
                      }
                      return (
                        <TableCell key={column.id} align={column.align} onClick={()=>{ 
                            // setConsumerPopup(true); setConsumerInfo(row) 
                            }}>
                          {value}
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
    </Paper>
  );
}

