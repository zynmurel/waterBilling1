import { Paper, Box, createFilterOptions } from '@mui/material';
import useFetch from '../../Hook/useFetch';
import { Button, Card } from '@mui/material';
import AutoComplete from '../ReadyComponents/CAutoComplete'
import { useRef, useState } from 'react';
import '../../Styles/PageStyles/reports.css'
import ReactToPrint from 'react-to-print';
import GetData from '../../Hook/SampleData'

const Reports = ({ month:allmonth, year:allyear, result, reading, hostLaravel}) => {
    let dateNow = new Date()
    const [month, setMonth] = useState(allmonth[dateNow.getMonth()]);
    const [year, setYear] = useState(dateNow.getFullYear().toString()); 
    const reports = GetData(hostLaravel, `/api/reports/1`);
    console.log(reports)
    const componentRef = useRef()
    const styles = {
        box1_1:{
            width:500,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            padding:10
        },box2:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            flex:5,
            width:600,
            height:700,
            color:"rgb(75, 75, 75)",
            margin:"0",
            backgroundColor:'white'
        },
    }
    const OPTIONS_LIMIT = 8;
    const filterOptions = createFilterOptions({
        limit: OPTIONS_LIMIT
      });
    return ( 
        <div className="reports">
            <Box style={styles.box1_1}>
            <AutoComplete  
              width={125} 
              label={'Year'} 
              dataSetter={setYear}
              autoComHeight={500}
              options={allyear}
              firstData={year}
              /> 
              
              <AutoComplete  
              width={180} 
              label={'Month'} 
              dataSetter={setMonth}
              autoComHeight={500}
              options={allmonth}
              firstData={month}
              />
                <ReactToPrint
                trigger={() => 
                <Button  
                variant="contained"
                disabled={false} 
                style={{height:55, backgroundColor:'rgb(12,20,52)'}}
                >Print/Download</Button>}
                content={() => componentRef.current}
                />
            </Box>
            <Box style={styles.box2} ref={componentRef}>
                
                <Box>
                    <h1 style={styles.h1}>No Reports</h1>
                </Box>
                
            </Box>
        </div>
     );
}
 
export default Reports;