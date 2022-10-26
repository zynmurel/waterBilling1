import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography  } from "@mui/material";
import { Container } from "@mui/system";
import PersonalInfo from "./ReadyComponents/PersonalInfo";
import WaterInfo from "./ReadyComponents/WaterInfo";
import { useState } from "react";

const AddConsumer = ({Utilities, result, setOpenPopup}) => {

    const {data:consumer, conIsPending, conError}= result

    const [alert, setAlert] = useState(false)
    const [alertText, setAlertText] = useState("")

    const [ consumerNum, setConsumerNum ] = useState()
    const [ errConsumerNum, setErrConsumerNum ] = useState(false)
    
    const [ consumerFirstName, setConsumerFirstName ] = useState("")
    const [ errConsumerFirstName, setErrConsumerFirstName ] = useState(false)
    
    const [ consumerMiddleName, setConsumerMiddleName ] = useState("")
    const [ errConsumerMiddleName, setErrConsumerMiddleName ] = useState(false)

    const [ consumerLastName, setConsumerLastName ] = useState("")
    const [ errConsumerLastName, setErrConsumerLastName ] = useState(false)

    const [ consumerAge, setConsumerAge ] = useState("")
    const [ errConsumerAge, setErrConsumerAge ] = useState(false)

    const [ consumerGender, setConsumerGender ] = useState("")
    const [ errConsumerGender, setErrConsumerGender ] = useState(false)

    const [ consumerPhone, setConsumerPhone ] = useState("")
    const [ errConsumerPhone, setErrConsumerPhone ] = useState(false)

    const [ consumerCivilStatus, setConsumerCivilStatus ] = useState("")
    const [ errConsumerCivilStatus, setErrConsumerCivilStatus ] = useState(false)

    const [ consumerSpouse, setConsumerSpouse ]= useState("")
    const [ errConsumerSpouse, setErrConsumerSpouse ] = useState(false)

    const [ consumerBarangay, setConsumerBarangay ]= useState("")
    const [ errConsumerBarangay, setErrConsumerBarangay ] = useState(false)

    const [ consumerPurok, setConsumerPurok ]= useState("")
    const [ errConsumerPurok, setErrConsumerPurok ] = useState(false)

    const [ consumerHousehold, setConsumerHousehold ]= useState("")
    const [ errConsumerHousehold, setErrConsumerHousehold ] = useState(false)
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

            setAlert(false);
        }
 
    const handleSubmit = (e) =>{
        setAlert(false);
        e.preventDefault()
            const cont = consumer && consumer.find((con)=>{
                if(con.id == consumerNum){
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
            consumerHousehold && !errConsumerHousehold
            ){
                console.log(consumerNum + consumerFirstName + consumerMiddleName + consumerLastName + consumerAge + consumerGender + consumerPhone + consumerCivilStatus + consumerSpouse + consumerPurok + consumerHousehold)
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
                    Utilities={Utilities}

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
                    Utilities={Utilities}/>
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
                >Submit</Button>
                <Snackbar open={alert} autoHideDuration={6000}>
                    <Alert onClose={handleAlertClose} 
                    severity="warning" sx={{ width: '100%' }}>
                    {alert? alertText:""}
                    </Alert>
                </Snackbar>

                </Box>
                </Box>

            </form>
        </Container>
     );
}
 
export default AddConsumer;