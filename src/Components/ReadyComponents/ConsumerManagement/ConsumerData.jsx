import { Box, Paper } from "@mui/material";
import { height } from "@mui/system";

const ConsumerData = ({consumerInfo}) => {
    const styles = {
        container:{
            display:"flex",
            flexDirection:"row",
            height:500,
        },
        subcontainer1:{
            flex:1,
            margin:5
        },
        subcontainer2:{
            flex:1,
            margin:5
        },
        textStyle:{
            margin:"5px 0",
            fontSize:18
        },
        h2style:{
            margin:"10px 0 0px 0",
            color:"rgb(15,94,156)",
            fontSize:22
        }

    }
    return (  
        <Box style={styles.container}>
            <Box style={styles.subcontainer1}>
                <h2 style={styles.h2style}>PERSONAL INFORMATION</h2>
                <p style={styles.textStyle}><strong>NAME:</strong> {`${consumerInfo.first_name} ${consumerInfo.middle_name} ${consumerInfo.last_name}`}</p>
                <p style={styles.textStyle}><strong>GENDER:</strong> {`${consumerInfo.gender}`}</p>
                <p style={styles.textStyle}><strong>AGE:</strong> {`${consumerInfo.age}`}</p>
                <p style={styles.textStyle}><strong>PHONE:</strong> {consumerInfo.phone? `${consumerInfo.phone}`:"(No Phone Number)"}</p>
                <p style={styles.textStyle}><strong>BARANGAY:</strong> {`${consumerInfo.barangay}`}</p>
                <p style={styles.textStyle}><strong>PUROK:</strong> {`${consumerInfo.purok}`}</p>
                <p style={styles.textStyle}><strong>HOUSEHOLD NO:</strong> {`${consumerInfo.household_no}`}</p>
                <p style={styles.textStyle}><strong>CIVIL STATUS:</strong> {`${consumerInfo.civil_status.toUpperCase()}`}</p>
                {consumerInfo.name_of_spouse && <p style={styles.textStyle}><strong>NAME OF SPOUSE:</strong> {`${consumerInfo.name_of_spouse}`}</p>}
                <h2 style={styles.h2style}>WATER METER INFORMATION</h2>
                <p style={styles.textStyle}><strong>USAGE TYPE:</strong> {`${consumerInfo.usage_type}`}</p>
                <p style={styles.textStyle}><strong>BRAND:</strong> {`${consumerInfo.brand}`}</p>
                <p style={styles.textStyle}><strong>SERIAL NO:</strong> {`${consumerInfo.serial_no}`}</p>
                <p style={styles.textStyle}><strong>FIRST READING:</strong> {`${consumerInfo.first_reading}`}</p>
            </Box>
            <Paper style={styles.subcontainer2}>

            </Paper>
        </Box>
    );
}
 
export default ConsumerData;