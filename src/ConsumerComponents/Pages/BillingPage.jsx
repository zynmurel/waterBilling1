import { Box } from "@mui/material";
import { useState } from "react";
import Select from '../ReadyComponent/Select'
import ReadingTable from "../ReadyComponent/CReadingTable";

const BillingPage = ({ month, consumersData, year, consumersBillings }) => {
    let datenow = new Date();
    const [selectedYear, setSelectedYear] = useState(datenow.getFullYear());
    const { data:consumers, isPending:consumerIsPending, error:consumerError } = consumersData;
    const { data:billings, isPending:billingIsPending, error:billingError } = consumersBillings;
    console.log(billings && billings)

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
                month={month}
                newrb={billings}
                scale={.9}
                height={420}
                rbIsPending={billingIsPending}
                rbError={billingError}
                />
            </Box>
        </Box>
     );
}
 
export default BillingPage;