import { Paper, Box, createFilterOptions, FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import useFetch from '../../Hook/useFetch';
import { Button, Card } from '@mui/material';
import AutoComplete from '../ReadyComponents/Reports/CAutoComplete'
import { useRef, useState } from 'react';
import '../../Styles/PageStyles/reports.css'
import ReactToPrint from 'react-to-print';
import GetData from '../../Hook/SampleData'
import SelectLabels from '../ReadyComponents/CSelectLabel';

const Reports = ({ 
    month:allmonth, 
    year:allyear, 
    hostLaravel, 
    consumerReports, 
    brgyPrkData}) => {
    let dateNow = new Date()
    const [month, setMonth] = useState(allmonth[dateNow.getMonth()-1]);
    const [year, setYear] = useState(dateNow.getFullYear().toString()); 
    const [purok, setPurok] = useState(7);
    const [barangay, setBarangay] = useState("All");
    const reportType = ["Billing Report", "Consumer Report"];
    const [report, setReport] = useState(reportType[0]);
    const collectionReports = GetData(hostLaravel, `api/getPaymentReports/${year}/${month.slice(0,3)}` );
    console.log(collectionReports && collectionReports.data)
    const { data:collection, isPending:collectionPending, error:collectionError, reload, setReload} = collectionReports
    const {data:brgyPrk, isPending:bpIsPending, error:bpError}= brgyPrkData
    const componentRef = useRef()
    let total = {current:0, previous:0, penalty:0, totalbill:0, payment:0 }
    const styles = {
        box1_1:{
            width:'100%',
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            padding:10
        },box2:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            flex:5,
            width:800,
            minHeight:550,
            color:"rgb(75, 75, 75)",
            margin:"0",
            backgroundColor:'white',
            padding:20,
            alignItems:'center'
            
        },
        box1_1_1:{
            width:'60%',
            display:'flex',
            flexDirection:'row'
        },
        tableRow1:{ fontWeight:'bold',fontSize:11,  textAlign:'center', borderWidth:.5, borderStyle:'solid', justifyContent:'center' },
        tableRow:{ fontSize:11,  textAlign:'center', borderWidth:.5, borderStyle:'solid', justifyContent:'center',padding:"5px 0", height:20 }
        
    }

    //Autocomplete - Barangay
    let allbarangay = ["All"]
    for (const key in brgyPrk) {
      allbarangay.push(key)
    }
    let allpurok = barangay && brgyPrk && barangay!=="All"? brgyPrk[barangay].sort() : [];

    allpurok = allpurok.map((p)=>{
        return +p
    })
    const collectionAll = collection!==null ? collection.payment_reports:[]
    const filteredCollection = collection && barangay!=="All" ? collectionAll.filter((col)=>(col.barangay===barangay)):collectionAll
    console.log(filteredCollection)
    return ( 
        <div className="reports">
            <Box style={styles.box1_1}>

                <Box style={styles.box1_1_1}>
                    <FormControl sx={{ m: 0, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-helper-label">{"Report"}</InputLabel>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={report}
                        label="Report"
                        onChange={(val)=>setReport(val.target.value)}
                        >
                        {reportType && reportType.map((p)=>
                            <MenuItem value={p} key={p}>{p}</MenuItem>
                        )}
                        </Select>
                    </FormControl>

                    <div style={{ visibility:report==="Billing Report"?"visible":'hidden', display:'flex', flexDirection:'row', justifyContent:'space-around', margin:"0 5px" }}>
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
                    <FormControl sx={{ minWidth: 200, margin:"0 2px 0 2px" }}>
                        <InputLabel id="demo-simple-select-helper-label">{"Barangay"}</InputLabel>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={barangay}
                        label="Barangay"
                        onChange={(event)=>{
                            setBarangay(event.target.value);
                        }}
                        >
                        {allbarangay && allbarangay.map((p)=>
                            <MenuItem value={p} key={p}>{p}</MenuItem>
                        )}
                        </Select>
                    </FormControl>
                    {/* <FormControl sx={{ m: 0, minWidth: 80, margin:"0 2px 0 2px" }}>
                        <InputLabel id="demo-simple-select-helper-label">{"Purok"}</InputLabel>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={purok}
                        disabled={!barangay || barangay==="All"}
                        label="Purok"
                        onChange={(event)=>{
                            setPurok(event.target.value);
                        }}
                        >
                        <MenuItem value={7}>
                            All
                        </MenuItem>
                        {allpurok && allpurok.map((p)=>
                            <MenuItem value={p} key={p}>{p}</MenuItem>
                        )}
                        </Select>
                    </FormControl> */}
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
            <div style={{ overflow:'scroll', padding:"10px 30px",backgroundColor:'#E6E6E6', borderRadius:3 }}>
            <Box style={styles.box2} ref={componentRef}>
            <div style={{ width:'100%' }}>
                <Box style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', position:'relative' }}>
                    <img src='/balilihan-logo.png' alt='balilihanlogo' width={60} style={{ position:'absolute', left:150, top:0}}/>
                    <div style={{ 
                        flexDirection:'row',
                        width:500,
                        marginTop:10 }}>
                    <h1 style={{ fontSize:20, margin:"0 auto 0px auto",textAlign:'center' }}>BALILIHAN WATERWORKS SYSTEM</h1>
                    <h1 style={{ fontSize:18, margin:"0 auto 0px auto",textAlign:'center' }}>LGU - BALILIHAN</h1>
                    <p style={{ fontSize:14,textAlign:'center', fontWeight:'bold', marginBottom:0 }}>REPORTS OF WATERWORKS COLLECTION</p>
                    <p style={{ fontSize:14,textAlign:'center', margin:0, marginBottom:10 }}>For the month of {month}, {year}</p>
                    </div>
                </Box>
            </div>
            <div style={{ borderWidth:1, width:'100%', borderStyle:'solid' }}>
            <div style={{ width:'100%', display:'flex', flexDirection:'row' }}>
                <div style={{ ...styles.tableRow1, width:40 }}>
                    <p style={{ margin:0, marginTop:4 }}>No.</p>
                </div>
                <div style={{ ...styles.tableRow1, width:65 }}>
                    <p style={{ margin:0, marginTop:4 }}>Date</p>
                </div>
                <div style={{ ...styles.tableRow1, width:50 }}>
                    <p style={{ margin:0, marginTop:4 }}>ID</p>
                </div>
                <div style={{ ...styles.tableRow1, width:135 }}>
                    <p style={{ margin:0, marginTop:4 }}>Name</p>
                </div>
                <div style={{ ...styles.tableRow1, width:105 }}>
                    <p style={{ margin:0, marginTop:4 }}>Barangay</p>
                </div>
                <div style={{ ...styles.tableRow1, flex:1 }}>
                    <p style={{ margin:0 }}>Current Account</p>
                </div>
                <div style={{ ...styles.tableRow1, flex:1 }}>
                    <p style={{ margin:0 }}>Previous Account</p>
                </div>
                <div style={{ ...styles.tableRow1, flex:1 }}>
                    <p style={{ margin:0, marginTop:4 }}>Penalties</p>
                </div>
                <div style={{ ...styles.tableRow1, flex:1, backgroundColor:'#FAFFC1' }}>
                    <p style={{ margin:0, marginTop:4 }}>Total Bill</p>
                </div>
                <div style={{ ...styles.tableRow1, flex:1, backgroundColor:'#C1FFC4' }}>
                    <p style={{ margin:0, marginTop:4 }}>Payment</p>
                </div>
            </div>
            </div>
            <div style={{ borderWidth:1, width:'100%', borderStyle:'solid', marginTop:-2 }}>
            {report === "Billing Report" && collection!==null && !collectionPending && collection.payment_reports.length!==0 &&
                <>
                {filteredCollection.map((pr,index)=>{
                    const date = new Date(pr.created_at)
                    total = {
                        current:total.current+pr.present_bill, 
                        previous:total.previous+pr.previous_bill, 
                        penalty:total.penalty+pr.penalty, 
                        totalbill:total.totalbill+pr.present_bill+pr.previous_bill+pr.penalty, 
                        payment:total.payment+pr.previous_payment
                    }
                    return(
                    
                        <div style={{ width:'100%', display:'flex', flexDirection:'row' }} key={pr.consumer_id}>
                        <div style={{ ...styles.tableRow1, width:40 }}>
                            <p style={{ margin:0, marginTop:4 }}>{index+1}</p>
                        </div>
                            <div style={{ ...styles.tableRow, width:65 }}>
                                <p style={{ margin:0 }}>{(date.getMonth()+1).toString().padStart(2,"0")+"/"+date.getDate()+"/"+date.getFullYear()}</p>
                            </div>
                            <div style={{ ...styles.tableRow, width:50 }}>
                                <p style={{ margin:0 }}>{pr.consumer_id.toString().padStart(6,"0")}</p>
                            </div>
                            <div style={{ ...styles.tableRow, width:135 }}>
                                <p style={{ margin:0 }}>{pr.consumer_name}</p>
                            </div>
                            <div style={{ ...styles.tableRow, width:105}}>
                                <p style={{ margin:0 }}>{pr.barangay}</p>
                            </div>
                            <div style={{ ...styles.tableRow, flex:1 }}>
                                <p style={{ margin:0, textAlign:'start', margin:'0px 5px' }}>₱ {pr.present_bill}</p>
                            </div>
                            <div style={{ ...styles.tableRow, flex:1 }}>
                                <p style={{ margin:0, textAlign:'start', margin:'0px 5px' }}>₱ {pr.previous_bill}</p>
                            </div>
                            <div style={{ ...styles.tableRow, flex:1 }}>
                                <p style={{ margin:0, textAlign:'start', margin:'0px 5px' }}>₱ {pr.penalty}</p>
                            </div>
                            <div style={{ ...styles.tableRow, flex:1, backgroundColor:'#FDFFEE' }}>
                                <p style={{ margin:0, textAlign:'start', margin:'0px 5px'}}>₱ {pr.present_bill+pr.previous_bill+pr.penalty}</p>
                            </div>
                            <div style={{ ...styles.tableRow, flex:1, backgroundColor:'#EEFFEE' }}>
                                <p style={{ margin:0, textAlign:'start', margin:'0px 5px' }}>₱ {pr.previous_payment}</p>
                            </div>
                        </div>
                            )
                })}

                <div style={{ width:'100%', display:'flex', flexDirection:'row' }}>
                    <div style={{ ...styles.tableRow, width:65, borderRightColor:'white' }}>
                        <p style={{ margin:0, marginTop:4 }}></p>
                    </div>
                    <div style={{ ...styles.tableRow, width:60, borderRightColor:'white', borderLeftColor:'white' }}>
                        <p style={{ margin:0, marginTop:4 }}></p>
                    </div>
                    <div style={{ ...styles.tableRow, width:155, borderRightColor:'white', borderLeftColor:'white' }}>
                        <p style={{ margin:0, marginTop:4 }}></p>
                    </div>
                    <div style={{ ...styles.tableRow, width:115, borderLeftColor:'white' }}>
                        <p style={{ margin:0, textAlign:'end', margin:'0px 5px', fontSize:12, fontWeight:'bold' }}>{"Sub-Total : "}</p>
                    </div>
                    <div style={{ ...styles.tableRow, flex:1 }}>
                        <p style={{ margin:0, textAlign:'start', margin:'0px 5px' }}>₱ {total.current}</p>
                    </div>
                    <div style={{ ...styles.tableRow, flex:1 }}>
                        <p style={{ margin:0, textAlign:'start', margin:'0px 5px' }}>₱ {total.previous}</p>
                    </div>
                    <div style={{ ...styles.tableRow, flex:1 }}>
                        <p style={{ margin:0, textAlign:'start', margin:'0px 5px' }}>₱ {total.penalty}</p>
                    </div>
                    <div style={{ ...styles.tableRow, flex:1, backgroundColor:'#FAFFC1' }}>
                        <p style={{ margin:0, textAlign:'start', margin:'0px 5px'}}>₱ {total.totalbill}</p>
                    </div>
                    <div style={{ ...styles.tableRow, flex:1, backgroundColor:'#C1FFC4' }}>
                        <p style={{ margin:0, textAlign:'start', margin:'0px 5px' }}>₱ {total.payment}</p>
                    </div>
                </div>
                <div style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-end', margin:'40px 20px' }}>
                <p style={{ margin:'5px', textAlign:'end', marginTop:-10 }}>Prepared by : </p>
                <div>
                <p style={{ margin:0, textAlign:'end' }}>_____________________________</p>
                <p style={{ margin:0, textAlign:'center', fontStyle:'italic', fontSize:12 }}>Signature over Printed Name</p>
                </div>

                </div>
                </>
                }
            
            {report === "Billing Report" && collection!==null && !collectionPending && collection.payment_reports.length===0 &&
                <Box>
                   <h1 style ={{ ...styles.h1, color:'gray', textAlign:'center'}}>No Collection Reports</h1>
                </Box>
                }
            {report === "Billing Report" &&  collectionPending &&
            <Box>
                <h1 style ={{ ...styles.h1, color:'gray', textAlign:'center'}}>Loading ...</h1>
            </Box>
            }
            </div>
                
            </Box>
            </div>
        </div>
     );
}
 
export default Reports;