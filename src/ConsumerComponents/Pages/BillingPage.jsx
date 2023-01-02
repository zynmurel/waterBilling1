import { Box, Dialog, DialogContent, DialogTitle, Typography,Button } from "@mui/material";
import { useState } from "react";
import Select from '../ReadyComponent/Select'
import ReadingTable from "../ReadyComponent/CReadingTable";

const BillingPage = ({ month, consumersData, year, consumersBillings }) => {
    let datenow = new Date();
    const [selectedYear, setSelectedYear] = useState(datenow.getFullYear());
    const [selectedBilling, setSelectedBilling] = useState({})
    console.log(selectedBilling)
    const { data:consumers, isPending:consumerIsPending, error:consumerError } = consumersData;
    const { data:billings, isPending:billingIsPending, error:billingError } = consumersBillings;

    const styles = {
        billings:{
            backgroundColor:"white",
            color:'rgb(12,20,52)',
            margin:'0 30px',
        },
        billingYear:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'start',
        alignItems:'center',
        },
        table:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        }
    }
    const sorter = (a, b) => {
        const ayear = new Date(a.date)
        const byear = new Date(b.date)
        if(byear.getFullYear() !== ayear.getFullYear()){
        return   byear.getFullYear() - ayear.getFullYear();
        }else{
        return  byear.getMonth() - ayear.getMonth() ;
        };
    };
    billings && billings.sort(sorter)
    return ( 
        <Box style={ styles.billings }>
            <Box style={styles.billingYear} className={'billingYear'}>
                <h1 style={{ marginRight:10 }}>Billing Records: </h1>
                <Select
                year={year}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                />
            </Box>
            <Box style={styles.table}>
            <ReadingTable 
                setSelectedBilling={setSelectedBilling}
                month={month}
                newrb={billings}
                scale={.9}
                height={420}
                rbIsPending={billingIsPending}
                rbError={billingError}
                />
            </Box>
            <Dialog open={JSON.stringify(selectedBilling)!=="{}"} maxWidth={'xs'} fullWidth className="dialog">
                <DialogTitle style={{margin:0,  textAlign:"left",paddingBottom:1}}>
                <Typography gutterBottom fontWeight={"bold"} fontSize={30} style={{margin:"0 auto", borderBottom:"1px solid gray"}}>
                    Billing Computation
                </Typography>
                </DialogTitle>

                    <DialogContent style={{ display:'flex', justifyContent:'center', flexDirection:'column' }}>
                        {JSON.stringify(selectedBilling)!=="{}" &&
                        <h1>{selectedBilling.reading_id}</h1>
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