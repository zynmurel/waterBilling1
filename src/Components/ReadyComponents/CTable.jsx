import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'name', label: "Consumer's Name", minWidth: 250 },
  {
    id: 'barangay',
    label: 'Barangay',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'purok',
    label: 'Purok',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export default function StickyHeadTable({result, purok}) {
  const { data:consumer, isPending, error } = result;
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor:'	#0f5e9c', color:'white' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {consumer && consumer
              .map((con) => 
                (purok === 0)? (
                  <TableRow hover role="checkbox" tabIndex={-1} key={con.id}>
                    {columns.map((column) => {
                      const value = con[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'name'? `${value.first} ${value.middle} ${value.last}`: value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ):(
                  con.purok === purok && <TableRow hover role="checkbox" tabIndex={-1} key={con.id}>
                    {columns.map((column) => {
                      const value = con[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'name'? `${value.first} ${value.middle} ${value.last}`: value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
