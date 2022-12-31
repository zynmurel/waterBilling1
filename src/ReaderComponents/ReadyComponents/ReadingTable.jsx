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
import GetData from '../../Hook/SampleData'


export default function StickyHeadTable({
  page, 
  setPage, 
  setConsumerInfo, 
  setPopUp,
  conIsPending, 
  conError,
  newCon,
  columns,
  height,
  rowPerPage,
  reload, 
  setReload
}) {
  const rowsPerPage = rowPerPage;


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
  };

  return (
    <Paper sx={{ width: '80%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 570,minHeight: height, }}>
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
            {newCon && newCon
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.consumer_id} >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} 
                        onClick={()=>{ 
                          setPopUp(true); 
                          setConsumerInfo(row); 
                          setReload(reload? false:true);
                          }}>
                          {column.id === "name"? `${row.first_name} ${row.middle_name? row.middle_name[0]+".":""} ${row.last_name}` :value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
         {
           conIsPending &&
          <Box sx={{ display: 'flex', height:400, justifyContent:"center", alignItems:"center",}}>
            <CircularProgress />
           </Box>
          }
          {
            conError &&
           <Box sx={{ display: 'flex', height:400, justifyContent:"center", alignItems:"center" }}>
             <h1 style={{color:"rgb(255, 82, 82)"}}>{conError}</h1>
            </Box>
           }
          { 
            !conIsPending && newCon && newCon.length === 0 && 
            <Box sx={{ display: 'flex', height:400, justifyContent:"center", alignItems:"center",}}>
              <h1 style={{color:"gray"}}>No Consumer</h1>
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
        count={newCon? newCon.length:0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

