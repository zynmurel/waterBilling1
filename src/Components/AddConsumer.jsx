import { Box, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import PersonalInfo from "./ReadyComponents/PersonalInfo";

const AddConsumer = () => {
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
            <form autoComplete="off" noValidate style={style.form}>
                <Paper style={{flex:2,...style.paper}}>
                <Typography variant="h7" gutterBottom fontWeight={"bold"} style={style.typography}>
                        PERSONAL INFORMATION
                    </Typography>
                    <PersonalInfo
                    style={style}
                    />
                </Paper>
                <Paper style={{flex:1,...style.paper }}>
                    <Typography variant="h7" gutterBottom fontWeight={"bold"} style={style.typography}>
                        WATER METER INFO
                    </Typography>
                </Paper>
            </form>
        </Container>
     );
}
 
export default AddConsumer;