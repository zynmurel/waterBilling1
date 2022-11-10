import { Alert, Box, Button, Snackbar  } from "@mui/material";
import { Container } from "@mui/system";
import PersonalInfo from "./PersonalInfo";
import WaterInfo from "./WaterInfo";
import { useState } from "react";

const AddConsumer = ({barangayData, purokData, brandData, genderData, civil_statusData, usage_typeData, result, setOpenPopup, consumerInfo, setConsumerInfo, setAlertUpdate, setAlert, setAlertText, setAlertType}) => {
    const dataIsOn = Object.keys(consumerInfo).length!==0
    const {data:consumer, conIsPending, conError, reload, setReload}= result

    const [buttonPending, setButtonPending] = useState(false)

    const [ consumerNum, setConsumerNum ] = useState(dataIsOn? consumerInfo.id:"")
    const [ errConsumerNum, setErrConsumerNum ] = useState(false)
    
    const [ consumerFirstName, setConsumerFirstName ] = useState(dataIsOn? consumerInfo.first_name:"")
    const [ errConsumerFirstName, setErrConsumerFirstName ] = useState(false)
    
    const [ consumerMiddleName, setConsumerMiddleName ] = useState(dataIsOn? consumerInfo.middle_name:"")
    const [ errConsumerMiddleName, setErrConsumerMiddleName ] = useState(false)

    const [ consumerLastName, setConsumerLastName ] = useState(dataIsOn? consumerInfo.last_name:"")
    const [ errConsumerLastName, setErrConsumerLastName ] = useState(false)

    const [ consumerAge, setConsumerAge ] = useState(dataIsOn? consumerInfo.age:"")
    const [ errConsumerAge, setErrConsumerAge ] = useState(false)

    const [ consumerGender, setConsumerGender ] = useState(dataIsOn? consumerInfo.gender:"")
    const [ errConsumerGender, setErrConsumerGender ] = useState(false)

    const [ consumerPhone, setConsumerPhone ] = useState(dataIsOn? consumerInfo.phone:"")
    const [ errConsumerPhone, setErrConsumerPhone ] = useState(false)

    const [ consumerCivilStatus, setConsumerCivilStatus ] = useState(dataIsOn? consumerInfo.civil_status:"")
    const [ errConsumerCivilStatus, setErrConsumerCivilStatus ] = useState(false)

    const [ consumerSpouse, setConsumerSpouse ]= useState(dataIsOn? consumerInfo.name_of_spouse:"")
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

    const [ consumerWaterRegDate, setConsumerWaterRegDate ]= useState(dataIsOn? consumerInfo.date :"")
    const [ errConsumerWaterRegDate, setErrConsumerWaterRegDate ] = useState(false)
   
    const handleSubmit = (e) =>{
        setAlertType("warning")
        e.preventDefault()
        setAlert(false);
            const cont = consumer && consumer.find((con)=>{
                if(con.id == consumerNum && !dataIsOn){
                    setAlert(true)
                    setErrConsumerNum(true)
                    setAlertText("This Consumer Number Is Already Used.")
                    return true
                }
    })
        if(!cont){
            if(!consumerNum){
                setErrConsumerNum(true)
                setAlert(true)
                setAlertText("Please fill up consumer's ID")
            }else if(!consumerFirstName){
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
            }else if(consumerLastName.length<2){
                setErrConsumerLastName(true)
                setAlert(true)
                setAlertText("Consumer's Last name should atleast contain two letters")
            }else if(!consumerAge){
                setErrConsumerAge(true)
                setAlert(true)
                setAlertText("Please fill up consumer's Age")
            }else if(consumerAge<18){
                setErrConsumerAge(true)
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
            consumerNum && !errConsumerNum && 
            consumerFirstName && !errConsumerFirstName &&
            consumerLastName && !errConsumerLastName &&
            consumerAge && !errConsumerAge &&
            consumerGender && !errConsumerGender&&
            !errConsumerPhone &&
            consumerCivilStatus && !errConsumerCivilStatus &&
            !errConsumerSpouse &&
            consumerBarangay && !errConsumerBarangay &&
            consumerPurok && !errConsumerPurok &&
            consumerHousehold && !errConsumerHousehold &&
            consumerWaterBrand && !errConsumerWaterBrand &&
            consumerWaterFirstReading && !errConsumerWaterFirstReading &&
            consumerWaterSerial && !errConsumerWaterSerial &&
            consumerWaterType && !errConsumerWaterType &&
            consumerWaterRegDate && !errConsumerWaterRegDate
            ){
                // console.log(consumerNum + consumerFirstName + consumerMiddleName + consumerLastName + consumerAge + consumerGender + consumerPhone + consumerCivilStatus + consumerSpouse + consumerPurok + consumerHousehold)
                // console.log(consumerWaterBrand + consumerWaterFirstReading + consumerWaterSerial + consumerWaterType + consumerWaterRegDate.$M+consumerWaterRegDate.$D +  consumerWaterRegDate.$y)
                const data = {
                    id:consumerNum,
                    first_name: consumerFirstName,
                    last_name: consumerLastName,
                    middle_name: consumerMiddleName,
                    phone: consumerPhone,
                    gender: consumerGender,
                    age: consumerAge,
                    barangay: consumerBarangay,
                    purok: consumerPurok,
                    household_no: consumerHousehold,
                    civil_status: consumerCivilStatus,
                    name_of_spouse: consumerSpouse,
                    usage_type: consumerWaterType,
                    first_reading: consumerWaterFirstReading,
                    serial_no: consumerWaterSerial,
                    brand: consumerWaterBrand,
                    date: consumerWaterRegDate,
                    delinquent:false,
                    connected:true,
                    archive:false
                }

                setButtonPending(true)
                if(!dataIsOn){
                    fetch("http://localhost:8000/Consumers",{
                    method: 'POST',
                    headers: { "Content-Type":"application/json" },
                    body: JSON.stringify(data)
                }).then(()=>{
                        console.log(data)
                        setOpenPopup(false)
                        setButtonPending(false)
                        setReload(reload? false: true)
                        setAlert(true)
                        setAlertText("Consumer Added!")
                        setAlertType("success")
                })
                .catch(err=> {
                    setOpenPopup(true)
                    setButtonPending(true)
                    setAlert(true)
                    setAlertText(err)
                    setAlertType("error")
                })
                }else{
                    const requestOptions = {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    };
                    fetch('http://localhost:8000/Consumers/'+consumerInfo.id, requestOptions)
                        .then(response => response.json())
                        .then((data) => {
                            setOpenPopup(false)
                            setButtonPending(false)
                            setReload(reload? false: true)
                            setConsumerInfo(data)
                            setAlert(true)
                            setAlertText("Consumer Updated!")
                            setAlertType("success")
                        })
                        .catch(err=> {
                            console.log(err.message)
                            setOpenPopup(false)
                            setButtonPending(false)
                            setAlert(true)
                            setAlertText(err.message)
                            setAlertType("error")
                        })
                }
            }}
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
        <Container style={style.container}>
            <form autoComplete="off" noValidate style={style.form} onSubmit={handleSubmit}>
                    <PersonalInfo
                    style={style}
                    result={result}
                    barangayData={barangayData}
                    purokData={purokData}
                    genderData={genderData}
                    civil_statusData={civil_statusData}
                    consumerInfo={consumerInfo}

                    setAlert={setAlert}
                    
                    consumerNum={consumerNum}
                    setConsumerNum={setConsumerNum}
                    errConsumerNum={errConsumerNum} 
                    setErrConsumerNum={setErrConsumerNum}

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

                    consumerAge={consumerAge}
                    setConsumerAge={setConsumerAge}
                    errConsumerAge={errConsumerAge} 
                    setErrConsumerAge={setErrConsumerAge}

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
                    style={style}
                    brandData={brandData}
                    usage_typeData={usage_typeData}

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

            </form>
        </Container>
     );
}
 
export default AddConsumer;