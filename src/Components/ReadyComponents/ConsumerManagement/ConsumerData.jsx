import { Box, Paper } from "@mui/material";
import moment from "moment/moment";
import ReadingTable from "../CReadingConsumer";
import GetData from "../../../Hook/SampleData"

const ConsumerData = ({
    consumerInfo, 
    month, 
    hostLaravel
}) => {
    let statusColor = '#0ED000'
    if(consumerInfo.status === 'Connected'){
      statusColor = '#0ED000'
    }else if(consumerInfo.status === 'Disconnected'){
      statusColor = '#EC2626'
    }else if(consumerInfo.status === 'Archive'){
      statusColor = '#ECBE26'
    }
 const readingBillingRecords = GetData(hostLaravel, `/api/billing/${+consumerInfo.consumer_id}`);
 console.log(readingBillingRecords)
    const dateNow = new Date()
    const birthday = new Date(consumerInfo.birthday *1000)
    const age = () =>{
        let age = dateNow.getFullYear() - birthday.getFullYear() - 1
        if(dateNow.getMonth()<=birthday.getMonth() && dateNow.getDate()<=birthday.getDate()){
            age+=1
        }
        return age
    }
    const date = new Date(consumerInfo.registered_at)
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
            margin:5,
            padding:"20px 5px",
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        },
        subcontainer2_2:{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            width:400
        },
        textStyle:{
            margin:"5px 0",
            fontSize:18
        },
        h2style:{
            margin:"10px 0 0px 0",
            color:"rgba(35,43,75,255)",
            fontSize:22
        },
        strong:{
            color:"rgba(35,43,75,255)"
        },
        box2_2_1:{
            padding:"0 15px",
            backgroundColor: statusColor,
            color:"white",
            borderRadius:"2px",
            height:40,
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        },
        box2_2_2:{
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        }
    }

    const sorter = (a, b) => {
        const ayear = new Date(a.date)
        const byear = new Date(b.date)
        if(byear.getFullYear() !== ayear.getFullYear()){
        return byear.getFullYear() - ayear.getFullYear();
        }else{
        return byear.getMonth() - ayear.getMonth();
        };
    };

  function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
    return (  
        <Box style={styles.container}>
            <Box style={styles.subcontainer1}>
                <h2 style={{margin:"10px 0", color:"rgba(35,43,75,255)"}}><strong>{`${consumerInfo.first_name} ${consumerInfo.middle_name} ${consumerInfo.last_name}`.toLocaleUpperCase()}</strong> </h2>
                <p style={styles.textStyle}><strong>USERNAME: <span style={styles.strong}>{`${consumerInfo.user_name}`}</span></strong></p>
                <p style={styles.textStyle}><strong>GENDER: <span style={styles.strong}>{`${consumerInfo.gender}`}</span></strong></p>
                <p style={styles.textStyle}><strong>BIRTHDAY: <span style={styles.strong}>{`${month[birthday.getMonth()]} ${birthday.getDate()}, ${birthday.getFullYear()}`}</span></strong></p>
                <p style={styles.textStyle}><strong>AGE: <span style={styles.strong}>{calculate_age(new Date(`${birthday.getFullYear()}/${birthday.getMonth()+1}/${birthday.getDate()}`))}</span></strong></p>
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
                <Box style={styles.subcontainer2_2}>
                    <Box style={styles.box2_2_2}><h2 style={{margin:0}}>Billing Records</h2></Box>
                    <Box style={styles.box2_2_1}><p style={styles.p}>{consumerInfo.status}</p></Box>
                </Box>
                <ReadingTable 
                readingBillingRecords={readingBillingRecords}
                hostLaravel={hostLaravel}
                month={month}
                scale={.9}
                height={400}
                />
            </Paper>
        </Box>
    );
}
 
export default ConsumerData;