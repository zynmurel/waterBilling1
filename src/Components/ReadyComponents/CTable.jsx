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


export default function StickyHeadTable({
  page, 
  setPage, 
  setConsumerInfo, 
  setConsumerPopup,
  conIsPending, 
  conError,
  newCon,
  columns,
  height,
  rowPerPage
}) {
  const rowsPerPage = rowPerPage;


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                        <TableCell key={column.id} align={column.align} onClick={()=>{ setConsumerPopup(true); setConsumerInfo(row) }}>
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
          <Box sx={{ display: 'flex', height:520, justifyContent:"center", alignItems:"center",}}>
            <CircularProgress />
           </Box>
          }
          {
            conError &&
           <Box sx={{ display: 'flex', height:520, justifyContent:"center", alignItems:"center" }}>
             <h1 style={{color:"rgb(255, 82, 82)"}}>{conError}</h1>
            </Box>
           }
          { 
            !conIsPending && newCon && newCon.length === 0 && 
            <Box sx={{ display: 'flex', height:520, justifyContent:"center", alignItems:"center",}}>
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



// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';


// const columns = [
//   { id: 'id', label: 'ID', minWidth: 100 },
//   { id: 'name', label: "Consumer's Name", minWidth: 350 },
//   {
//     id: 'barangay',
//     label: 'Barangay',
//     minWidth: 100,
//     align: 'left',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'purok',
//     label: 'Purok',
//     minWidth: 50,
//     align: 'center',
//     format: (value) => value.toLocaleString('en-US'),
//   },
// ];

// export default function StickyHeadTable({result, purok, name, barangay}) {
//   const { data:consumer, isPending, error } = result;
//   const bCon = consumer&& barangay && purok? consumer.filter((c)=> c.barangay === barangay && (c.purok === purok || purok ===7)):consumer
//   const newCon = bCon? bCon.filter((c)=> `${c.first_name.toLowerCase()} ${c.middle_name.toLowerCase()} ${c.last_name.toLowerCase()}`.includes(name.toLowerCase())||`${c.id}`.includes(name)) : bCon

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 600 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth, backgroundColor:'rgb(44, 76, 114)', color:'white' }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           { consumer && 
//           <TableBody>
//             {newCon && newCon 
//               .map((con, index) => 
//               {
//                 if (purok === 7){ 
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={con.id}>
//                     {columns.map((column) => {
//                       const value = con[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.id === 'name'? `${con.first_name} ${con.middle_name} ${con.last_name}`: value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 )}else if(purok<7){
//                 return (con.purok === purok && 
//                   <TableRow  hover role="checkbox" tabIndex={-1} key={con.id}>
//                     {columns.map((column) => {
//                       const value = con[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.id === 'name'? `${con.first_name} ${con.middle_name} ${con.last_name}`: value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 )}}
//               )
//               }
              
//           </TableBody>}
//         </Table>
//         {
//            isPending &&
//           <Box sx={{ display: 'flex', height: "37.5vw", justifyContent:"center", alignItems:"center" }}>
//             <CircularProgress />
//            </Box>
//           }
//           { 
//             !isPending && newCon.length===0 && 
//             <Box sx={{ display: 'flex', height: "37.5vw", justifyContent:"center", alignItems:"center" }}>
//               <h1 style={{color:"gray"}}>No Consumer</h1>
//             </Box>
//           }
//       </TableContainer>
//     </Paper>
//   );
// }
