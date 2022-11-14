
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';

const columns = [
  { id: 'Year', label: 'Year', minWidth: 60 ,    align: 'center',},
  { id: 'Month', label: 'Month', minWidth: 70 ,     align: 'center',},
  {
    id: 'totalReading',
    label: 'Total Reading',
    minWidth: 90,
    align: 'center',
  },
  {
    id: 'bill',
    label: 'Bill',
    minWidth: 60,
    align: 'center',
  }
];

export default function ReadingTable({month, newrb , scale, height, conIsPending, conError, billings}) {
  return (
    <Paper sx={{ width: 450, overflow: 'hidden', transform:`scale(${scale})`}}>

      <TableContainer sx={{ maxHeight: height,minHeight: height }}>
        <Table stickyHeader aria-label="sticky table" sx={{
            "& .MuiTableRow-root:hover": {
            backgroundColor: "rgb(255, 229, 169)"
            },
            "& .MuiTableRow-root":{
                backgroundColor:"rgb(255, 229, 169)",
                color:"white"
            },
            "& .MuiTableCell-head":{
                backgroundColor: "gray",
                color:"white",
                fontWeight:"bold",
            }
  }}>
          <TableHead >
            <TableRow >
              {columns.map((column) => (
                <TableCell 
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, padding:10 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {newrb && newrb
              .map((row) => {
                const date = new Date(row.date)

                const billing = billings.find((bill)=>{
                  return row.consumerId===bill.consumerId && row.id===bill.readingId ?  bill : undefined
                })

                return (
                  <TableRow  role="checkbox" tabIndex={-1} key={row.id} style={billing.paid===true? {backgroundColor:"rgb(132, 240, 139)", height:10}:{}}>
                    {columns.map((column) => {
                      let value = "";
                      if (column.id === "Year"){
                        value = date.getFullYear()
                      } else if (column.id === "Month"){
                        value = month[date.getMonth()]
                      } else if (column.id === "totalReading"){
                        value = row.totalReading
                      } else if (column.id === "bill"){
                        value = billing.bill
                      } 

                      return (
                        <TableCell key={column.id} align={column.align} style={{padding:10}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
              {newrb.length === 0 && <Box style={{height:height-50, color:"gray", display:"flex", justifyContent:"center", alignItems:"center"}}><h3>No Billing Record</h3></Box>}
              {conIsPending && <Box style={{height:height-50, color:"gray", display:"flex", justifyContent:"center", alignItems:"center"}}><CircularProgress/></Box>}
              {conError && <Box style={{height:height-50, color:"rgb(255, 82, 82)", display:"flex", justifyContent:"center", alignItems:"center"}}><h3>Failed To Fetch Data</h3></Box>}
      </TableContainer>
    </Paper>
  );
}