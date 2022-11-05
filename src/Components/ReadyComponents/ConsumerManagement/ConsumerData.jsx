import { Box, Paper } from "@mui/material";
import moment from "moment/moment";

const ConsumerData = ({consumerInfo, month}) => {
    const date = new Date(consumerInfo.date)
    const styles = {
        container:{
            display:"flex",
            flexDirection:"row",
            height:520,
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
        },
        strong:{
            color:"rgb(15,94,156)"
        }
    }
    return (  
        <Box style={styles.container}>
            <Box style={styles.subcontainer1}>
                <h2 style={{margin:0, color:"rgb(15,94,156)"}}><strong>{`${consumerInfo.first_name} ${consumerInfo.middle_name} ${consumerInfo.last_name}`.toLocaleUpperCase()}</strong> </h2>
                <p style={styles.textStyle}><strong>GENDER: <span style={styles.strong}>{`${consumerInfo.gender}`}</span></strong></p>
                <p style={styles.textStyle}><strong>AGE: <span style={styles.strong}>{`${consumerInfo.age}`}</span></strong></p>
                <p style={styles.textStyle}><strong>PHONE: <span style={styles.strong}>{consumerInfo.phone? `${consumerInfo.phone}`:"(No Phone Number)"}</span></strong> </p>
                <p style={styles.textStyle}><strong> BARANGAY: <span style={styles.strong}>{`${consumerInfo.barangay}`}</span></strong></p>
                <p style={styles.textStyle}><strong>PUROK: <span style={styles.strong}>{`${consumerInfo.purok}`}</span></strong></p>
                <p style={styles.textStyle}><strong>HOUSEHOLD NO: <span style={styles.strong}>{`${consumerInfo.household_no}`}</span></strong></p>
                <p style={styles.textStyle}><strong>CIVIL STATUS: <span style={styles.strong}>{`${consumerInfo.civil_status}`}</span></strong></p>
                {consumerInfo.name_of_spouse && <p style={styles.textStyle}><strong>NAME OF SPOUSE: <span style={styles.strong}> {`${consumerInfo.name_of_spouse}`}</span></strong></p>}
                <p style={styles.textStyle}><strong>USAGE TYPE: <span style={styles.strong}>{`${consumerInfo.usage_type}`}</span></strong></p>
                <p style={styles.textStyle}><strong>BRAND: <span style={styles.strong}>{`${consumerInfo.brand}`}</span></strong></p>
                <p style={styles.textStyle}><strong>SERIAL NO: <span style={styles.strong}>{`${consumerInfo.serial_no}`}</span></strong></p>
                <p style={styles.textStyle}><strong>FIRST READING: <span style={styles.strong}>{`${consumerInfo.first_reading}`}</span></strong></p>
                <p style={styles.textStyle}><strong>REGISTRATION: <span style={styles.strong}>{`${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}</span></strong></p>
            </Box>
            <Paper style={styles.subcontainer2}>

            </Paper>
        </Box>
    );
}
 
export default ConsumerData;