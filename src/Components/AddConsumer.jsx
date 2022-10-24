import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import PersonalInfo from "./ReadyComponents/PersonalInfo";
import WaterInfo from "./ReadyComponents/WaterInfo";
import { useState } from "react";

const AddConsumer = ({Utilities, result, setOpenPopup}) => {

    const {data:consumer, conIsPending, conError}= result

    const [alert, setAlert] = useState(false)

    const [ consumerNum, setConsumerNum ] = useState()
    const [ errConsumerNum, setErrConsumerNum ] = useState(false)
    
    const [ consumerFirstName, setConsumerFirstName ] = useState("")
    const [ errConsumerFirstName, setErrConsumerFirstName ] = useState(false)
    
    const [ consumerMiddleName, setConsumerMiddleName ] = useState("")

    const [ consumerLastName, setConsumerLastName ] = useState("")
    const [ errConsumerLastName, setErrConsumerLastName ] = useState(false)

    const [ consumerAge, setConsumerAge ] = useState("")
    const [ errConsumerAge, setErrConsumerAge ] = useState(false)

    const [ consumerGender, setConsumerGender ] = useState("")
    const [ errConsumerGender, setErrConsumerGender ] = useState(false)

    const handleSubmit = (e) =>{
        e.preventDefault()
            const cont = consumer && consumer.find((con)=>{
            if(con.id == consumerNum){
                setAlert(true)
                setErrConsumerNum(true)
                return true
            }
            console.log("test")
    })
        if(!cont){
            if(!consumerNum){
                setErrConsumerNum(true)
            }if(!consumerFirstName){
                setErrConsumerFirstName(true)
            }if(!consumerLastName){
                setErrConsumerLastName(true)
            }if(!consumerAge){
                setErrConsumerAge(true)
            }
            if(
            consumerNum && !errConsumerNum && 
            consumerFirstName && !errConsumerFirstName &&
            consumerLastName && !errConsumerLastName &&
            consumerAge && !errConsumerAge &&
            consumerGender && !errConsumerGender
            ){
                console.log(consumerNum + consumerFirstName + consumerMiddleName + consumerLastName + consumerAge + consumerGender)
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
                    <Alert  severity="warning" sx={{ width: '100%' }}>
                    {alert?"This Consumer Number Is Already Used.":""}
                    </Alert>
                </Snackbar>

                </Box>
                </Box>

            </form>
        </Container>
     );
}
 
export default AddConsumer;