import { Paper, Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { NumericFormat } from 'react-number-format';
import AutoComplete from './CAutoComplete'
const PersonalInfo = ({
    style, 
    Utilities, 
    result, 
    setAlert,

    consumerNum, 
    setConsumerNum,
    errConsumerNum,
    setErrConsumerNum,

    consumerFirstName, 
    setConsumerFirstName, 
    errConsumerFirstName, 
    setErrConsumerFirstName,

    consumerMiddleName,
    setConsumerMiddleName,

    consumerLastName, 
    setConsumerLastName, 
    errConsumerLastName, 
    setErrConsumerLastName,

    consumerAge, 
    setConsumerAge, 
    errConsumerAge, 
    setErrConsumerAge,

    consumerGender, 
    setConsumerGender, 
    errConsumerGender, 
    setErrConsumerGender,
}) => {
    const {data:uti, utiIsPending, utiError}= Utilities


    return ( 
        <Paper style={{flex:2,...style.paper}}>
                <Typography variant="h7" gutterBottom fontWeight={"bold"} style={style.typography}>
                        PERSONAL INFORMATION
                    </Typography>
                    <Box style={{display:"flex", justifyContent:"center", flexDirection:"row"}}>
                        <Box style={{display:"flex", flexDirection:"column", flex:1, marginRight:10}}>
                            <NumericFormat
                            //{...other}
                            //getInputRef={ref}
                            label="Consumer Number" 
                            variant="outlined" 
                            placeholder="ex: 10000"
                            value={consumerNum}
                            required
                            isAllowed={(values) => {
                              const { value } = values;
                              return value < 999999 && !value.includes(".");
                            }}
                            onChange={(e) =>{
                                const val = e.target.value
                                setConsumerNum(val)
                                setAlert(false)
                                if(val){setErrConsumerNum(false)}
                            }}
                            customInput={TextField}
                            style={style.textfield}
                            error={errConsumerNum}
                            />
                            
                            <TextField 
                            id="outlined-basic" 
                            label="First Name" 
                            variant="outlined" 
                            type="text"
                            placeholder="ex: Juan"
                            onChange={(e) =>{
                                const val = e.target.value.replace(/[^a-z, /s, \u00f1, \u00d1, \., \-]/gi, '');

                                setConsumerFirstName(val);
                                if(val.length>1){setErrConsumerFirstName(false)}
                            }}
                            style={style.textfield}
                            value={consumerFirstName}
                            required
                            error={errConsumerFirstName}
                            />

                            <TextField 
                            id="outlined-basic" 
                            label="Middle Name" 
                            variant="outlined"
                            type="text"
                            placeholder="ex: Ponse"
                            style={style.textfield} 
                            value={consumerMiddleName}
                            onChange={(e) =>{
                                const val = e.target.value.replace(/[^a-z, /s, \u00f1, \u00d1, \., \-]/gi, '');

                                setConsumerMiddleName(val);
                            }}
                            />

                            <TextField 
                            id="outlined-basic" 
                            label="Last Name" 
                            variant="outlined" 
                            type="text"
                            placeholder="ex: Enrile"
                            onChange={(e) =>{
                                const val = e.target.value.replace(/[^a-z, /s, \u00f1, \u00d1, \., \-]/gi, '');

                                setConsumerLastName(val);
                                if(val.length>1){setErrConsumerLastName(false)}
                            }}
                            style={style.textfield}
                            value={consumerLastName}
                            required
                            error={errConsumerLastName}
                            />

                            <NumericFormat
                            label="Age" 
                            variant="outlined" 
                            placeholder="ex: 34"
                            value={consumerAge}
                            required
                            isAllowed={(values) => {
                              const { value } = values;
                              return value < 99 && !value.includes(".");
                            }}
                            onChange={(e) =>{
                                const val = e.target.value
                                setConsumerAge(val)
                                if(val){setErrConsumerAge(false)}
                            }}
                            customInput={TextField}
                            style={style.textfield}
                            error={errConsumerAge}
                            />
                            
                            <FormControl style={style.textfield}>
                                <InputLabel 
                                id="demo-simple-select-helper-label">
                                Gender
                                </InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Gender"
                                defaultValue={""}
                                onChange={(e) =>{
                                    const val = e.target.value
                                    setConsumerGender(val);
                                    if(val){setErrConsumerGender(false)}
                                }}
                                value={consumerGender}
                                required
                                error={errConsumerGender}
                                >{
                                    uti && uti.gender.map((gen)=>(
                                        <MenuItem value={gen} key={gen}>{gen}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>
                        
                        </Box>
                        <Box style={{display:"flex", flexDirection:"column", flex:1}}>

                            <TextField 
                            id="outlined-basic" 
                            label="Phone Number (Optional)" 
                            variant="outlined"
                            style={style.textfield} />

                            <FormControl style={style.textfield}>
                                <InputLabel id="demo-simple-select-helper-label">Civil Status</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Gender"
                                >{
                                    uti && uti.civil_status.map((stat)=>(
                                        <MenuItem value={stat} key={stat}>{stat}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>

                            <TextField 
                            id="outlined-basic" 
                            label="Name of Spouse" 
                            variant="outlined"
                            style={style.textfield} />

                            <AutoComplete  
                            label={'Barangay'} 
                            Utilities={Utilities}
                            autoComHeight={150}
                             />

                            <FormControl style={{marginTop:10,...style.textfield}}>
                                <InputLabel id="demo-simple-select-helper-label">Purok</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Gender"
                                >
                                <MenuItem value={10}>Single</MenuItem>
                                <MenuItem value={20}>Married</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField 
                            id="outlined-basic" 
                            label="Household Number" 
                            variant="outlined"
                            style={style.textfield} />
                            
                        </Box>
                    </Box>
                </Paper>
     );
}
 
export default PersonalInfo;