import {  Box, Button, Snackbar, Select, InputLabel, MenuItem, FormControl, Alert  } from "@mui/material";
import { Container } from "@mui/system";
import PersonalInfo from "./PersonalInfo";
import WaterInfo from "./WaterInfo";
import { useState } from "react";
import axios from "axios"

const AddConsumer = ({
    hostLaravel,
    allbarangay,
    brgyPrk,
    brand, 
    gender, 
    civil_status, 
    usage_type, 
    consumersData, 
    setOpenPopup, 
    consumerInfo, 
    setConsumerInfo, 
    setAlertUpdate, 
    setAlert, 
    setAlertText, 
    setAlertType, 

    setConsumerPopup,

    consumer, 
    conIsPending, 
    conError, 
    reload, 
    setReload,

    alert,
    alertText,
    alertType,
    handleAlertClose,
}) => {
    const sampleDate = new Date()
    const birthdate = new Date(consumerInfo.birthday * 1000)
    const birthdateFormat = `${birthdate.getFullYear()}/${birthdate.getMonth()+1}/${birthdate.getDate()}`
    console.log(`${birthdate.getFullYear()}/${birthdate.getMonth()+1}/${birthdate.getDate()}`)
    const dataIsOn = Object.keys(consumerInfo).length!==0

    const [buttonPending, setButtonPending] = useState(true)
    console.log(consumerInfo)
    const [ consumerEmail, setConsumerEmail ] = useState(dataIsOn? consumerInfo.consumer_id:"")
    const [ errConsumerEmail, setErrConsumerEmail ] = useState(false)
    
    const [ consumerFirstName, setConsumerFirstName ] = useState(dataIsOn? consumerInfo.first_name:"")
    const [ errConsumerFirstName, setErrConsumerFirstName ] = useState(false)
    
    const [ consumerMiddleName, setConsumerMiddleName ] = useState(dataIsOn? consumerInfo.middle_name?consumerInfo.middle_name:"":"")
    const [ errConsumerMiddleName, setErrConsumerMiddleName ] = useState(false)

    const [ consumerLastName, setConsumerLastName ] = useState(dataIsOn? consumerInfo.last_name:"")
    const [ errConsumerLastName, setErrConsumerLastName ] = useState(false)

    const [ consumerBirthday, setConsumerBirthday ] = useState(dataIsOn? birthdateFormat:"")
    const [ errConsumerBirthday, setErrConsumerBirthday ] = useState(false)

    const [ consumerGender, setConsumerGender ] = useState(dataIsOn? consumerInfo.gender:"")
    const [ errConsumerGender, setErrConsumerGender ] = useState(false)

    const [ consumerPhone, setConsumerPhone ] = useState(dataIsOn? consumerInfo.phone:"")
    const [ errConsumerPhone, setErrConsumerPhone ] = useState(false)

    const [ consumerCivilStatus, setConsumerCivilStatus ] = useState(dataIsOn? consumerInfo.civil_status:"")
    const [ errConsumerCivilStatus, setErrConsumerCivilStatus ] = useState(false)

    const [ consumerSpouse, setConsumerSpouse ]= useState(dataIsOn? consumerInfo.name_of_spouse?consumerInfo.name_of_spouse:"":"")
    const [ errConsumerSpouse, setErrConsumerSpouse ] = useState(false)

    const [ consumerBarangay, setConsumerBarangay ]= useState(dataIsOn? consumerInfo.barangay:"")
    const [ errConsumerBarangay, setErrConsumerBarangay ] = useState(false)

    const [ consumerPurok, setConsumerPurok ]= useState(dataIsOn? consumerInfo.purok:"")
    const [ errConsumerPurok, setErrConsumerPurok ] = useState(false)

    const [ consumerHousehold, setConsumerHousehold ]= useState(dataIsOn? consumerInfo.household_no:"")
    const [ errConsumerHousehold, setErrConsumerHousehold ] = useState(false)

    const [ consumerWaterType, setConsumerWaterType ]= useState(dataIsOn? consumerInfo.usage_type:"")
    const [ errConsumerWaterType, setErrConsumerWaterType ] = useState(false)

    const [ consumerWaterBrand, setConsumerWaterBrand ]= useState(dataIsOn? consumerInfo.brand:"")
    const [ errConsumerWaterBrand, setErrConsumerWaterBrand ] = useState(false)

    const [ consumerWaterSerial, setConsumerWaterSerial ]= useState(dataIsOn? consumerInfo.serial_no:"")
    const [ errConsumerWaterSerial, setErrConsumerWaterSerial ] = useState(false)

    const [ consumerWaterFirstReading, setConsumerWaterFirstReading ]= useState(dataIsOn? consumerInfo.first_reading:"")
    const [ errConsumerWaterFirstReading, setErrConsumerWaterFirstReading ] = useState(false)
    const [ consumerWaterRegDate, setConsumerWaterRegDate ]= useState(dataIsOn? consumerInfo.registered_at :"")

    const registrationDate = new Date(consumerWaterRegDate)
    const [ errConsumerWaterRegDate, setErrConsumerWaterRegDate ] = useState(false)

    const [status, setStatus] = useState(dataIsOn? consumerInfo.status:"")

    const handleChange = (event) => {
        setStatus(event.target.value)
    }
    const handleSubmit = (e) =>{
        setAlertType("warning")
        e.preventDefault()
        setAlert(false);
            if(!consumerFirstName){
                setErrConsumerFirstName(true)
                setAlert(true)
                setAlertText("Please fill up consumer's First name")
            }else if(consumerFirstName.length<2){
                setErrConsumerFirstName(true)
                setAlert(true)
                setAlertText("Consumer's First name should atleast contain two letters")
            }else if(consumerMiddleName.length<2 && consumerMiddleName.length!==0){
                setErrConsumerMiddleName(true)
                setAlert(true)
                setAlertText("Consumer's Middle name should atleast contain two letters")
            }else if(!consumerLastName){
                setErrConsumerLastName(true)
                setAlert(true)
                setAlertText("Please fill up consumer's Last name")
            }else if(!consumerEmail){
                setErrConsumerEmail(true)
                setAlert(true)
                setAlertText("Please fill up consumer's ID")
            }else if(consumerLastName.length<2){
                setErrConsumerLastName(true)
                setAlert(true)
                setAlertText("Consumer's Last name should atleast contain two letters")
            }else if(!consumerBirthday){
                setErrConsumerBirthday(true)
                setAlert(true)
                setAlertText("Please fill up consumer's Age")
            }else if(consumerBirthday<18){
                setErrConsumerBirthday(true)
                setAlert(true)
                setAlertText("Consumer's Age must not be 18 below")
            }else if(!consumerGender){
                setErrConsumerGender(true)
                setAlert(true)
                setAlertText("Please choose consumer's Gender")
            }else if(consumerPhone.includes("#")){
                setErrConsumerPhone(true)
                setAlert(true)
                setAlertText("Please follow format for Phone Number ( Empty if none )")
            }else if(!consumerCivilStatus){
                setErrConsumerCivilStatus(true)
                setAlert(true)
                setAlertText("Please choose consumer's Civil status")
            }else if(!consumerSpouse && consumerCivilStatus==="Married"){
                setErrConsumerSpouse(true)
                setAlert(true)
                setAlertText("Please fill up consumer's Spouse name")
            }else if(!consumerBarangay){
                setErrConsumerBarangay(true)
                setAlert(true)
                setAlertText("Please fill up consumer's Barangay")
            }else if(!consumerPurok){
                setErrConsumerPurok(true)
                setAlert(true)
                setAlertText("Please choose up consumer's Purok")
            }else if(!consumerHousehold){
                setErrConsumerHousehold(true)
                setAlert(true)
                setAlertText("Please fill up consumer's Household Number")
            }else if(!consumerWaterType){
                setErrConsumerWaterType(true)
                setAlert(true)
                setAlertText("Please choose Water Meter Usage Type")
            }else if(!consumerWaterBrand){
                setErrConsumerWaterBrand(true)
                setAlert(true)
                setAlertText("Please choose Water Meter Brand")
            }else if(!consumerWaterSerial || consumerWaterSerial==0){
                setErrConsumerWaterSerial(true)
                setAlert(true)
                setAlertText("Please input Water Meter Serial")
            }else if(consumerWaterFirstReading===""){
                setErrConsumerWaterFirstReading(true)
                setAlert(true)
                setAlertText("Please input Meter's First Reading")
            }else if(!consumerWaterRegDate){
                setErrConsumerWaterRegDate(true)
                setAlert(true)
                setAlertText("Please fill up Registration Date")
            }
            if(
                consumerEmail && !errConsumerEmail && 
                consumerFirstName && !errConsumerFirstName &&
                consumerLastName && !errConsumerLastName &&
                consumerBirthday && !errConsumerBirthday &&
                consumerGender && !errConsumerGender&&
                !errConsumerPhone &&
                consumerCivilStatus && !errConsumerCivilStatus &&
                !errConsumerSpouse &&
                consumerBarangay && !errConsumerBarangay &&
                consumerPurok && !errConsumerPurok &&
                consumerHousehold && !errConsumerHousehold &&
                consumerWaterBrand && !errConsumerWaterBrand &&
                 !errConsumerWaterFirstReading &&
                consumerWaterSerial && !errConsumerWaterSerial &&
                consumerWaterType && !errConsumerWaterType &&
                consumerWaterRegDate && !errConsumerWaterRegDate
            ){
                const bdayDate = new Date(consumerBirthday)
                const data = { 
                first_name:consumerFirstName,
                last_name:consumerLastName,
                middle_name:consumerMiddleName,
                gender:consumerGender,
                birthday:`${bdayDate.getFullYear()}/${bdayDate.getMonth()+1}/${bdayDate.getDate()}`,
                phone:consumerPhone,
                civil_status:consumerCivilStatus,
                name_of_spouse:consumerSpouse,
                household_no:consumerHousehold,
                first_reading:consumerWaterFirstReading,
                usage_type:consumerWaterType,
                serial_no:consumerWaterSerial,
                brand:consumerWaterBrand,
                email:consumerEmail,
                status:"Connected",
                delinquent:0,
                registered_at:`${registrationDate.getFullYear()}-${registrationDate.getMonth()+1}-${registrationDate.getDate()}`,
                user_type:"Consumer",
                password:`${consumerFirstName.toLowerCase()}${consumerLastName.toLowerCase()}123`.replace(" ",""),
                barangay: consumerBarangay,
                purok:consumerPurok
            }
                if(!dataIsOn){
                    const headers = { 
                        'Content-type' : 'application/json',
                        'Accept' : 'application/json',
                      };
                      axios.post(`${hostLaravel}/api/consumer`, data, { headers })
                          .then(response => {
                            console.log(response)
                            setOpenPopup(false)
                            setButtonPending(false)
                            setReload(reload? false: true)
                            setAlert(true)
                            setAlertText("Consumer Added!")
                            setAlertType("success")})
                          .catch(error => {
                            console.error('There was an error!', error)
                            setAlert(true)
                            setAlertText(error.response.data.message)
                            console.log(error.response.data.message)
                            setAlertType("error")
                        });
                      
                    
                }else{
                    const sample = {
                        first_name:consumerFirstName,
                        last_name:consumerLastName,
                        middle_name:consumerMiddleName,
                        gender:consumerGender,
                        birthday:`${bdayDate.getFullYear()}/${bdayDate.getMonth()+1}/${bdayDate.getDate()}`,
                        phone:consumerPhone,
                        civil_status:consumerCivilStatus,
                        name_of_spouse:consumerSpouse,
                        barangay: consumerBarangay,
                        purok:consumerPurok,
                        household_no:consumerHousehold,
                        first_reading:consumerWaterFirstReading,
                        usage_type:consumerWaterType,
                        serial_no:consumerWaterSerial,
                        brand:consumerWaterBrand,
                        status:status,
                        delinquent:0,
                        registered_at:`${registrationDate.getFullYear()}-${registrationDate.getMonth()+1}-${registrationDate.getDate()}`
                }
                    const headers = { 
                        'Content-type' : 'application/json',
                        'Accept' : 'application/json',
                      };
                      axios.put(`${hostLaravel}/api/consumer/${consumerInfo.user_id}`, sample, { headers })
                          .then(response => {
                            console.log(response)
                            setOpenPopup(false)
                            setConsumerPopup(false)
                            setButtonPending(false)
                            setReload(reload? false: true)
                            setAlert(true)
                            setAlertText("Consumer Updated!")
                            setAlertType("success")})
                          .catch(error => {
                            console.error('There was an error!', error);
                        });
                }
            }
    }

    const style={
        form:{
            display:"flex", 
            flexDirection:"row", 
            justifyContent:"space-between"
    },
        paper:{
            marginRight:10, 
            padding:10, 
            display:"flex", 
            flexDirection:"column"
    },
        container:{
            padding:0
    },  
        typography:{
            marginBottom:15
    },
        textfield:{
            marginBottom:10
        }
    }
    return ( 
        <Container style={style.container} >
            <form autoComplete="off" noValidate style={style.form} onSubmit={handleSubmit}>

        {dataIsOn && 
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, position:'absolute', top:5, right:50 }}>
            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={status}
              onChange={(e)=> {
                handleChange(e);
                setButtonPending(false);
              }}
              label="Status"
            >
              <MenuItem value={"Connected"}>Connected</MenuItem>
              <MenuItem value={"Disconnected"}>Disconnected</MenuItem>
              <MenuItem value={"Archive"}>Archive</MenuItem>
            </Select>
          </FormControl>}
                    <PersonalInfo
                    style={style}
                    allbarangay={allbarangay}
                    brgyPrk={brgyPrk}
                    gender={gender}
                    civil_status={civil_status}
                    consumerInfo={consumerInfo}
                    dataIsOn={dataIsOn}
                    setButtonPending={setButtonPending}

                    setAlert={setAlert}
                    
                    consumerEmail={consumerEmail}
                    setConsumerEmail={setConsumerEmail}
                    errConsumerEmail={errConsumerEmail} 
                    setErrConsumerEmail={setErrConsumerEmail}

                    consumerFirstName={consumerFirstName}
                    setConsumerFirstName={setConsumerFirstName}
                    errConsumerFirstName={errConsumerFirstName} 
                    setErrConsumerFirstName={setErrConsumerFirstName}

                    consumerMiddleName={consumerMiddleName}
                    setConsumerMiddleName={setConsumerMiddleName}
                    errConsumerMiddleName={errConsumerMiddleName} 
                    setErrConsumerMiddleName={setErrConsumerMiddleName}

                    consumerLastName={consumerLastName}
                    setConsumerLastName={setConsumerLastName}
                    errConsumerLastName={errConsumerLastName} 
                    setErrConsumerLastName={setErrConsumerLastName}

                    consumerBirthday={consumerBirthday}
                    setConsumerBirthday={setConsumerBirthday}
                    errConsumerBirthday={errConsumerBirthday} 
                    setErrConsumerBirthday={setErrConsumerBirthday}

                    consumerGender={consumerGender}
                    setConsumerGender={setConsumerGender}
                    errConsumerGender={errConsumerGender} 
                    setErrConsumerGender={setErrConsumerGender}

                    consumerPhone={consumerPhone}
                    setConsumerPhone={setConsumerPhone}
                    errConsumerPhone={errConsumerPhone} 
                    setErrConsumerPhone={setErrConsumerPhone}

                    consumerCivilStatus={consumerCivilStatus}
                    setConsumerCivilStatus={setConsumerCivilStatus}
                    errConsumerCivilStatus={errConsumerCivilStatus} 
                    setErrConsumerCivilStatus={setErrConsumerCivilStatus}

                    consumerSpouse={consumerSpouse}
                    setConsumerSpouse={setConsumerSpouse}
                    errConsumerSpouse={errConsumerSpouse} 
                    setErrConsumerSpouse={setErrConsumerSpouse}

                    consumerBarangay={consumerBarangay}
                    setConsumerBarangay={setConsumerBarangay}
                    errConsumerBarangay={errConsumerBarangay} 
                    setErrConsumerBarangay={setErrConsumerBarangay}

                    consumerPurok={consumerPurok}
                    setConsumerPurok={setConsumerPurok}
                    errConsumerPurok={errConsumerPurok} 
                    setErrConsumerPurok={setErrConsumerPurok}

                    consumerHousehold={consumerHousehold}
                    setConsumerHousehold={setConsumerHousehold}
                    errConsumerHousehold={errConsumerHousehold} 
                    setErrConsumerHousehold={setErrConsumerHousehold}

                    
                    />
                <Box style={{display:"flex", flexDirection:"column", flex:1}}>
                    <WaterInfo 
                    setButtonPending={setButtonPending}
                    style={style}
                    brand={brand}
                    usage_type={usage_type}

                    consumerWaterType={consumerWaterType}
                    setConsumerWaterType={setConsumerWaterType}
                    errConsumerWaterType={errConsumerWaterType} 
                    setErrConsumerWaterType={setErrConsumerWaterType}

                    consumerWaterBrand={consumerWaterBrand}
                    setConsumerWaterBrand={setConsumerWaterBrand}
                    errConsumerWaterBrand={errConsumerWaterBrand} 
                    setErrConsumerWaterBrand={setErrConsumerWaterBrand}

                    consumerWaterSerial={consumerWaterSerial}
                    setConsumerWaterSerial={setConsumerWaterSerial}
                    errConsumerWaterSerial={errConsumerWaterSerial} 
                    setErrConsumerWaterSerial={setErrConsumerWaterSerial}

                    consumerWaterFirstReading={consumerWaterFirstReading}
                    setConsumerWaterFirstReading={setConsumerWaterFirstReading}
                    errConsumerWaterFirstReading={errConsumerWaterFirstReading} 
                    setErrConsumerWaterFirstReading={setErrConsumerWaterFirstReading}

                    consumerWaterRegDate={consumerWaterRegDate}
                    setConsumerWaterRegDate={setConsumerWaterRegDate}
                    errConsumerWaterRegDate={errConsumerWaterRegDate} 
                    setErrConsumerWaterRegDate={setErrConsumerWaterRegDate}
                    
                    />
                <Box style={{flex:1, display:"flex", flexDirection:"row" , justifyContent:"space-around" }}>

                <Button 
                variant="contained" 
                style={{ backgroundColor:'white', color:'black', flex:1, marginRight:10}}
                onClick={()=>setOpenPopup(false)}
                >Cancel</Button>

                <Button 
                variant="contained" 
                style={{backgroundColor:'#0f5e9c', flex:1, marginRight:10}}
                type="submit"
                disabled={buttonPending}
                >Submit</Button>

                </Box>
                </Box>
                <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose} className={'snackbarPopup'}>
                    <Alert
                    onClose={handleAlertClose}  
                    severity={alertType} sx={{ width: '100%' }}
                    >
                    {alertText}
                    </Alert>
                </Snackbar>
            </form>
        </Container>
     );
}
 
export default AddConsumer;