import { Box, Dialog, DialogContent, DialogTitle, Typography,Button } from "@mui/material";
import { useState } from "react";
import Select from '../ReadyComponent/Select'
import ReadingTable from "../ReadyComponent/CReadingTable";

const BillingPage = ({ month, consumersData, year, consumersBillings, billingsPaymentsReadings }) => {
    let datenow = new Date();
    const [selectedYear, setSelectedYear] = useState(datenow.getFullYear());
    const [selectedBilling, setSelectedBilling] = useState({})
    const { data:consumers, isPending:consumerIsPending, error:consumerError } = consumersData;
    const { data:billings, isPending:billingIsPending, error:billingError } = billingsPaymentsReadings;
    const styles = {
        billings:{
        },
        table:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        }
    }
    const sorter = (a, b) => {
        const ayear = new Date(a.created_at)
        const byear = new Date(b.created_at)
        if(byear.getFullYear() !== ayear.getFullYear()){
        return   byear.getFullYear() - ayear.getFullYear();
        }else{
        return  byear.getMonth() - ayear.getMonth() ;
        };
    };
    return ( 
        <Box className={'billingContainer'}>
            <Box style={styles.billingYear} className={'billingYear'}>
                <h1>Billing Records: </h1>
                <Select
                year={year}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                />
            </Box>
            <Box style={styles.table}>
            <ReadingTable 
                selectedYear={selectedYear}
                setSelectedBilling={setSelectedBilling}
                month={month}
                newrb={billings && billings.billing}
                scale={.9}
                height={420}
                rbIsPending={billingIsPending}
                rbError={billingError}
                />
            </Box>
            <Dialog open={JSON.stringify(selectedBilling)!=="{}"} maxWidth={'xs'} fullWidth className="dialog">
                <DialogTitle style={{margin:0,  textAlign:"left",paddingBottom:1}}>
                <Typography gutterBottom fontWeight={"bold"} fontSize={30} style={{margin:"0 auto", borderBottom:"1px solid gray"}}>
                    Billing Information
                </Typography>
                </DialogTitle>

                    <DialogContent style={{ display:'flex', justifyContent:'center', flexDirection:'column' }}>
                        {JSON.stringify(selectedBilling)!=="{}" &&
                        <div>
                        <h2 style={{ margin:"5px 0 0 0"}}>{`Billing ID : ${selectedBilling.billing_id}`}</h2>
                        <h3 style={{ margin:0 }}>{`${selectedBilling.service_period}`}</h3>
                        <h3 style={{ marginBottom:0 }}>Reading: </h3>
                        <p style={{ margin:0 }}>{`Previous : ${selectedBilling.reading.previous_reading} cu m`}</p>
                        <p style={{ margin:0 }}>{`Present : ${selectedBilling.reading.present_reading} cu m`}</p>
                        <p style={{ margin:0 }}>{`Total : ${selectedBilling.reading.present_reading - selectedBilling.reading.previous_reading} cu m`}</p>

                        <h3 style={{ marginBottom:0 }}>Billing: </h3>
                        <p style={{ margin:0 }}>{`Remaining : ₱ ${selectedBilling.previous_bill - selectedBilling.previous_payment}`}</p>
                        <p style={{ margin:0 }}>{`Present : ₱ ${selectedBilling.present_bill}`}</p>
                        <p style={{ margin:0 }}>{`Penalty : ₱ ${selectedBilling.penalty}`}</p>
                        <p style={{ margin:0 }}>{`Total : ₱ ${(selectedBilling.previous_bill - selectedBilling.previous_payment)+selectedBilling.present_bill+selectedBilling.penalty}`}</p>

                        <h3 style={{ marginBottom:0 }}>Payment: </h3>
                        <p style={{ margin:0 }}>{`Due Date : ${selectedBilling.due_date}`}</p>
                        {selectedBilling.payment.date_paid ? <p style={{ margin:0 }}>{`Date Paid : ${selectedBilling.payment.date_paid}`}</p>: <p style={{ margin:0 }}>{`Not Paid`}</p> }
                        <p style={{ margin:0 }}>{`Amount Paid : ₱ ${selectedBilling.penalty}`}</p>
                        </div>
                        }
                      
                        <div style={{ display:'flex', justifyContent:'end' }}>
                        <Button
                        variant="contained"
                        style={{height:40, width:100, fontSize:12, margin:5, color:'white', backgroundColor:'rgb(12,20,52)'}}
                        onClick={()=>{
                            setSelectedBilling({});
                        }}>
                        Close
                        </Button>
                        </div>
                    </DialogContent>
                </Dialog>
        </Box>
     );
}
 
export default BillingPage;