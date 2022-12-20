import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';



export default function BasicTable({
  setUpdate,

  res1to5,
  res6to10,
  res11to20,
  res21to50,
  res51up,

  com1to5,
  com6to10,
  com11to20,
  com21to50,
  com51up,

  penalty,
  dueday
}) {
  const styles ={
    update:{
      fontSize:'small', 
      color:"white", 
      backgroundColor:'orange', 
      padding:1, 
      borderRadius:2, 
      cursor:'pointer'
    },
    cell:{
      paddingTop:4,
      paddingBottom:2
    },
    table:{
      marginBottom:5
    }
  }
  return (
    <div>
      <TableContainer component={Paper} style={styles.table} >
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
      <TableHead>
          <TableRow>
            <TableCell style={{padding:10, width:130 }}><h3 style={{ margin:0 }}>Residential</h3></TableCell>
            <TableCell align="center" style={{padding:10 }}><h3 style={{ margin:0 }}>Price</h3></TableCell>
            <TableCell align="center" style={{padding:10, width:80 }}><h3 style={{ margin:0 }}>Update</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              key={'Residential1to5'}
            >
              <TableCell component="th" scope="row" style={styles.cell}>
                1-5 Cubic Meter
              </TableCell>
              <TableCell align="center" style={styles.cell}>{`₱${res1to5}`}</TableCell>
              <TableCell align="center" style={styles.cell}>
                <EditIcon sx={styles.update}
                onClick={()=>setUpdate('Residential 1-5')}/>
               </TableCell>

            </TableRow>

            <TableRow
              key={'Residential6to10'}
            >
              <TableCell component="th" scope="row" style={styles.cell}>
                6-10 Cubic Meter
              </TableCell>
              <TableCell align="center" style={styles.cell}>{`₱${res6to10}`}</TableCell>
              <TableCell align="center" style={styles.cell}>
                <EditIcon sx={styles.update}
                onClick={()=>setUpdate('Residential 6-10')}/>
               </TableCell>

            </TableRow>

            <TableRow
              key={'Residential11to20'}
            >
              <TableCell component="th" scope="row" style={styles.cell}>
                11-20 Cubic Meter
              </TableCell>
              <TableCell align="center" style={styles.cell}>{`₱${res11to20}`}</TableCell>
              <TableCell align="center" style={styles.cell}>
                <EditIcon sx={styles.update}
                onClick={()=>setUpdate('Residential 11-20')}/>
               </TableCell>

            </TableRow>

            <TableRow
              key={'Residential21to50'}
            >
              <TableCell component="th" scope="row" style={styles.cell}>
                21-50 Cubic Meter
              </TableCell>
              <TableCell align="center" style={styles.cell}>{`₱${res21to50}`}</TableCell>
              <TableCell align="center" style={styles.cell}>
                <EditIcon sx={styles.update}
                onClick={()=>setUpdate('Residential 21-50')}/>
               </TableCell>

            </TableRow>

            <TableRow
              key={'Residential51up'}
            >
              <TableCell component="th" scope="row" style={styles.cell}>
                51 up Cubic Meter
              </TableCell>
              <TableCell align="center" style={styles.cell}>{`₱${res51up}`}</TableCell>
              <TableCell align="center" style={styles.cell}>
                <EditIcon sx={styles.update}
                onClick={()=>setUpdate('Residential 51 up')}/>
               </TableCell>

            </TableRow>
           
        </TableBody>
      </Table>

    </TableContainer>
    
    <TableContainer component={Paper} style={styles.table}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
      <TableHead>
          <TableRow>
            <TableCell style={{padding:10, width:130 }}><h3 style={{ margin:0 }}>Commercial</h3></TableCell>
            <TableCell align="center" style={{padding:10 }}><h3 style={{ margin:0 }}>Price</h3></TableCell>
            <TableCell align="center" style={{padding:10, width:80 }}><h3 style={{ margin:0 }}>Update</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              key={'Commercial1to5'}
            >
              <TableCell component="th" scope="row" style={styles.cell}>
                1-5 Cubic Meter
              </TableCell>
              <TableCell align="center" style={styles.cell}>{`₱${com1to5}`}</TableCell>
              <TableCell align="center" style={styles.cell}>
                <EditIcon sx={styles.update}
                onClick={()=>setUpdate('Commercial 1-5')}/>
               </TableCell>

            </TableRow>

            <TableRow
              key={'Commercial6to10'}
            >
              <TableCell component="th" scope="row" style={styles.cell}>
                6-10 Cubic Meter
              </TableCell>
              <TableCell align="center" style={styles.cell}>{`₱${com6to10}`}</TableCell>
              <TableCell align="center" style={styles.cell}>
                <EditIcon sx={styles.update}
                onClick={()=>setUpdate('Commercial 6-10')}/>
               </TableCell>

            </TableRow>

            <TableRow
              key={'Commercial11to20'}
            >
              <TableCell component="th" scope="row" style={styles.cell}>
                11-20 Cubic Meter
              </TableCell>
              <TableCell align="center" style={styles.cell}>{`₱${com11to20}`}</TableCell>
              <TableCell align="center" style={styles.cell}>
                <EditIcon sx={styles.update}
                onClick={()=>setUpdate('Commercial 11-20')}/>
               </TableCell>

            </TableRow>

            <TableRow
              key={'Commercial21to50'}
            >
              <TableCell component="th" scope="row" style={styles.cell}>
                21-50 Cubic Meter
              </TableCell>
              <TableCell align="center" style={styles.cell}>{`₱${com21to50}`}</TableCell>
              <TableCell align="center" style={styles.cell}>
                <EditIcon sx={styles.update}
                onClick={()=>setUpdate('Commercial 21-50')}/>
               </TableCell>

            </TableRow>

            <TableRow
              key={'Commercial51up'}
            >
              <TableCell component="th" scope="row" style={styles.cell}>
                51 up Cubic Meter
              </TableCell>
              <TableCell align="center" style={styles.cell}>{`₱${com51up}`}</TableCell>
              <TableCell align="center" style={styles.cell}>
                <EditIcon sx={styles.update}
                onClick={()=>setUpdate('Commercial 51 up')}/>
               </TableCell>
            </TableRow>
           
        </TableBody>
      </Table>
    </TableContainer>

    <TableContainer component={Paper} style={styles.table}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
      <TableHead>
          <TableRow>
            <TableCell style={{padding:10, width:130 }}><h3 style={{ margin:0 }}>Penalty</h3></TableCell>
            <TableCell align="center" style={{padding:10 }}><h3 style={{ margin:0 }}>Percent</h3></TableCell>
            <TableCell align="center" style={{padding:10, width:80 }}><h3 style={{ margin:0 }}>Update</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              key={'Penalty'}
            >
              <TableCell component="th" scope="row" style={styles.cell}>
                Monthly
              </TableCell>
              <TableCell align="center" style={styles.cell}>{`${penalty}%`}</TableCell>
              <TableCell align="center" style={styles.cell}>
                <EditIcon sx={styles.update}
                onClick={()=>setUpdate('Penalty')}/>
               </TableCell>

            </TableRow>
        </TableBody>

      </Table>
    </TableContainer>

    <TableContainer component={Paper} style={styles.table}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
      <TableHead>
          <TableRow>
            <TableCell style={{padding:10, width:110 }}><h3 style={{ margin:0 }}>Due Date</h3></TableCell>
            <TableCell style={{padding:10 }}><h3 style={{ margin:0 }}>---</h3></TableCell>
            <TableCell align="right" style={{padding:10 }}><h3 style={{ margin:0 }}>{dueday}st Day of the Month</h3></TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
    </div>
  );
}