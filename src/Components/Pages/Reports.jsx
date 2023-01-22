import { Paper, Box, createFilterOptions, FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import useFetch from '../../Hook/useFetch';
import { Button, Card } from '@mui/material';
import AutoComplete from '../ReadyComponents/Reports/CAutoComplete'
import { useRef, useState } from 'react';
import '../../Styles/PageStyles/reports.css'
import ReactToPrint from 'react-to-print';
import GetData from '../../Hook/SampleData'
import SelectLabels from '../ReadyComponents/CSelectLabel';

const Reports = ({ month:allmonth, year:allyear, hostLaravel, consumerReports}) => {
    let dateNow = new Date()
    const [month, setMonth] = useState(allmonth[dateNow.getMonth()]);
    const [year, setYear] = useState(dateNow.getFullYear().toString()); 
    const reportType = ["Collection Report", "Consumer Report"];
    const [report, setReport] = useState(reportType[0]);
    const collectionReports = GetData(hostLaravel, `api/collectionReports/${year}/${month.slice(0,3)}` );
    const { data:collection, isPending:collectionPending, error:collectionError, reload, setReload} = collectionReports
    console.log(collectionReports && collectionReports)
    const componentRef = useRef()
    const styles = {
        box1_1:{
            width:700,
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            padding:10
        },box2:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            flex:5,
            width:600,
            height:700,
            color:"rgb(75, 75, 75)",
            margin:"0",
            backgroundColor:'white'
        },
        box1_1_1:{
            display:'flex',
            flexDirection:'row'
        }
    }
    const OPTIONS_LIMIT = 8;
    const filterOptions = createFilterOptions({
        limit: OPTIONS_LIMIT
      });
    return ( 
        <div className="reports">
            <Box style={styles.box1_1}>

                <Box style={styles.box1_1_1}>
                    <FormControl sx={{ m: 0, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-helper-label">{"Reports"}</InputLabel>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={report}
                        label="Reports"
                        onChange={(val)=>setReport(val.target.value)}
                        >
                        {reportType && reportType.map((p)=>
                            <MenuItem value={p} key={p}>{p}</MenuItem>
                        )}
                        </Select>
                    </FormControl>

                    <div style={{ visibility:report==="Collection Report"?"visible":'hidden', display:'flex', flexDirection:'row', justifyContent:'space-around', margin:"0 5px" }}>
                    <AutoComplete  
                    width={95} 
                    label={'Year'} 
                    setReload={setReload}
                    reload={reload}
                    dataSetter={setYear}
                    autoComHeight={500}
                    options={allyear}
                    firstData={year}
                    /> 
                    
                    <AutoComplete  
                    width={140} 
                    label={'Month'} 
                    setReload={setReload}
                    reload={reload}
                    dataSetter={setMonth}
                    autoComHeight={500}
                    options={allmonth}
                    firstData={month}
                    />
                    </div>
                </Box>
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
                    {console.log(collection===null)}
            {report === "Collection Report" && collection!==null && !collectionPending && collection.collectionReport.totalBilling===0 &&
                <Box>
                   <h1 style ={{ ...styles.h1, marginTop:250, color:'gray'}}>No Collection Reports</h1>
                </Box>
                }
                {report === "Collection Report" && collection!==null && collection.collectionReport.totalBilling!==0 && !collectionPending &&
                <Box>
                    <h1 style={{ fontSize:23, margin:"0 auto 20px auto", fontFamily:"'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif", textAlign:'center',
                    margin:"100px 0 20px 0", fontSize:45
                 }}>BALILIHAN WATER BILLING</h1> 
                 <h1 style={{ fontSize:23, margin:"0 auto 20px auto", fontFamily:"'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif", textAlign:'center',
                 
              }}>( {collection.collectionReport.service_period_id} )</h1>
                    <Box style={{ fontFamily:"'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
                                display:"flex", flexDirection:'column', justifyContent:'center', alignItems:'start', width:450, padding:"0 80px"
                }}>
                    <h2 style={{ margin:"10px 0" }}>TOTAL OF BILLINGS : {collection.collectionReport.totalBilling}</h2>
                    <h2 style={{ margin:"10px 0" }}>TOTAL OF PAYMENTS : {collection.collectionReport.totalPayments}</h2>
                    <h2 style={{ margin:"10px 0" }}>TOTAL COLLECTION : ₱ {collection.collectionReport.totalCollection}</h2>
                    </Box>
                </Box>
                }
                {report === "Collection Report" && collection!==null && collectionPending &&
                <Box>
                    <h1 style ={{ ...styles.h1, marginTop:250, color:'gray'}}>Loading ...</h1>
                </Box>
                }
                {report === "Consumer Report" && collection!==null && collectionPending &&
                <Box>
                    <h1 style ={{ ...styles.h1, marginTop:250, color:'gray'}}>Loading ...</h1>
                </Box>
                }
                {report === "Consumer Report" && collection!==null && !collectionPending &&
                    <Box>
                    <h1 style={{ fontSize:23, margin:"0 auto 20px auto", fontFamily:"'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif", textAlign:'center',
                    margin:"100px 0 20px 0", fontSize:45
                        }}>BALILIHAN WATER BILLING</h1> 
                        <h1 style={{ fontSize:23, margin:"0 auto 20px auto", fontFamily:"'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif", textAlign:'center',
                
                        }}>( Balilihan, Bohol )</h1>
                        <Box style={{ fontFamily:"'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
                                display:"flex", flexDirection:'column', justifyContent:'center', alignItems:'start', width:450, padding:"0 80px"
                        }}>
                            {console.log(collection.consumers.original.consumerReport)}
                    <h2 style={{ margin:"10px 0" }}>TOTAL OF CONSUMERS : {collection.consumers.original.consumerReport.totalConsumers}</h2>
                    <h2 style={{ margin:"10px 0" }}>DELINQUENT/S : {collection.consumers.original.consumerReport.totalDelinquent}</h2>
                    <h2 style={{ margin:"10px 0" }}>DISCONNECTED :  {collection.consumers.original.consumerReport.totalDisconnected}</h2>
                    </Box>
                </Box>
                }
                
            </Box>
        </div>
     );
}
 
export default Reports;