import { Paper, Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Autocomplete } from "@mui/material";
import { NumericFormat, PatternFormat } from 'react-number-format';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const PersonalInfo = ({
    style, 
    consumerInfo,
    allbarangay,
    brgyPrk,
    gender, 
    civil_status,

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
    errConsumerMiddleName, 
    setErrConsumerMiddleName,

    consumerLastName, 
    setConsumerLastName, 
    errConsumerLastName, 
    setErrConsumerLastName,

    consumerBirthday, 
    setConsumerBirthday, 
    errConsumerBirthday, 
    setErrConsumerBirthday,

    consumerGender, 
    setConsumerGender, 
    errConsumerGender, 
    setErrConsumerGender,

    consumerPhone, 
    setConsumerPhone, 
    errConsumerPhone, 
    setErrConsumerPhone,

    consumerCivilStatus, 
    setConsumerCivilStatus, 
    errConsumerCivilStatus, 
    setErrConsumerCivilStatus, 

    consumerSpouse, 
    setConsumerSpouse, 
    errConsumerSpouse, 
    setErrConsumerSpouse,

    consumerBarangay, 
    setConsumerBarangay, 
    errConsumerBarangay, 
    setErrConsumerBarangay,

    consumerPurok, 
    setConsumerPurok, 
    errConsumerPurok, 
    setErrConsumerPurok,

    consumerHousehold, 
    setConsumerHousehold, 
    errConsumerHousehold, 
    setErrConsumerHousehold,
}) => {

    const onKeyDown = (e) => {
        e.preventDefault();
     };
     
    const dataIsOn = Object.keys(consumerInfo).length!==0

    let allpurok = consumerBarangay && brgyPrk ? brgyPrk[consumerBarangay].sort() : [];

    allpurok = allpurok.map((p)=>{
        return +p
    })


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
                            label="Consumer ID" 
                            variant="outlined" 
                            placeholder="ex: 10000"
                            allowNegative={false}
                            value={consumerNum}
                            disabled={dataIsOn}
                            required
                            isAllowed={(values) => {
                              const { value } = values;
                              return value < 999999 && !value.includes(".");
                            }}
                            onChange={(e) =>{
                                const val = e.target.value
                                setConsumerNum(val)
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
                                const val = e.target.value.replace(/[^a-z, /s, /u00f1, /u00d1, /., /-]/gi, '');

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
                            error={errConsumerMiddleName}
                            onChange={(e) =>{
                                const val = e.target.value.replace(/[^a-z, /s, /u00f1, /u00d1, /., /-]/gi, '');

                                setConsumerMiddleName(val);
                                if(val.length>1||val.length===0){setErrConsumerMiddleName(false)}
                            }}
                            />

                            <TextField 
                            id="outlined-basic" 
                            label="Last Name" 
                            variant="outlined" 
                            type="text"
                            placeholder="ex: Enrile"
                            onChange={(e) =>{
                                const val = e.target.value.replace(/[^a-z, /s, /u00f1, /u00d1, /., /-]/gi, '');

                                setConsumerLastName(val);
                                if(val.length>1){setErrConsumerLastName(false)}
                            }}
                            style={style.textfield}
                            value={consumerLastName}
                            required
                            error={errConsumerLastName}
                            />

                            
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Birthday"
                                    value={consumerBirthday}
                                    onChange={(newValue) => {
                                    newValue? setConsumerBirthday(newValue): setConsumerBirthday("")
                                    newValue && (isNaN(newValue.$D) || newValue.$D==null )? setErrConsumerBirthday(true): setErrConsumerBirthday(false)
                                    }}
                                    renderInput={(params, validator) => 
                                    <TextField 
                                    style={style.textfield}
                                    onKeyDown={onKeyDown}
                                    {...params}
                                    error={errConsumerBirthday} />}
                                />
                            </LocalizationProvider>
                            
                            <FormControl 
                            error={errConsumerGender}
                            style={style.textfield}>
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
                                >{
                                    gender && gender.map((gen)=>(
                                        <MenuItem value={gen} key={gen}>{gen}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>
                        
                        </Box>
                        <Box style={{display:"flex", flexDirection:"column", flex:1}}>

                            <PatternFormat 
                            customInput={TextField}
                            style={style.textfield}
                            label="Consumer Phone Number" 
                            format="#### ### ####" 
                            mask="#"
                            onChange={(e) =>{
                                const val = e.target.value
                                setConsumerPhone(val)
                                !val.includes("#") || val.length===0 ?setErrConsumerPhone(false): setErrConsumerPhone(true)
                            }}
                            value={consumerPhone}
                            error={errConsumerPhone}
                             />

                            <FormControl 
                            style={style.textfield}
                            error={errConsumerCivilStatus}>
                                <InputLabel 
                                id="demo-simple-select-helper-label">
                                Civil Status
                                </InputLabel>
                                <Select
                                label="Civil Status"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={""}
                                onChange={(e) =>{
                                    const val = e.target.value
                                    if(val==="Single"){
                                        setConsumerSpouse("")
                                    }
                                    setConsumerCivilStatus(val);
                                    if(val){setErrConsumerCivilStatus(false)}
                                }}
                                value={consumerCivilStatus}
                                required
                                >{
                                    civil_status && civil_status.map((cs)=>(
                                        <MenuItem value={cs} key={cs}>{cs}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>

                            <TextField 
                            id="outlined-basic" 
                            label="Name of Spouse" 
                            variant="outlined" 
                            type="text"
                            placeholder="ex: Juan"
                            onChange={(e) =>{
                                const val = e.target.value.replace(/[^a-z, /s, /u00f1, /u00d1, /., /-]/gi, '');

                                setConsumerSpouse(val);
                                if(val.length>1||val.length===0){setErrConsumerSpouse(false)}
                            }}
                            style={style.textfield}
                            value={consumerSpouse}
                            required
                            disabled={consumerCivilStatus==="Single"}
                            error={errConsumerSpouse}
                            />
                            <Autocomplete 
                            disablePortal={false}
                            ListboxProps={{ style: { maxHeight: 150 }, position: "top-start" }}
                            onChange={(event , val)=>{ 
                                setConsumerBarangay(val)
                                if(val){setErrConsumerBarangay(false)}
                            }}
                            value={consumerBarangay}
                            options={allbarangay}
                            renderInput={(params) => (
                                <TextField
                                error={errConsumerBarangay}
                                {...params}
                                label="Barangay"
                                variant="outlined"
                                />
                            )}
                            />

                            <FormControl style={{marginTop:10,...style.textfield}}
                            error={errConsumerPurok}>
                                <InputLabel 
                                id="demo-simple-select-helper-label"
                                >
                                Purok
                                </InputLabel>
                                <Select
                                label="Purok"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={""}
                                onChange={(e) =>{
                                    const val = e.target.value
                                    setConsumerPurok(val);
                                    if(val){setErrConsumerPurok(false)}
                                }}
                                value={consumerPurok}
                                required
                                >{
                                    allpurok && allpurok.map((p)=>(
                                        <MenuItem value={p} key={p}>{p}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>

                            <NumericFormat
                            label="Household Number" 
                            variant="outlined" 
                            placeholder="ex: 1234"
                            value={consumerHousehold}
                            allowNegative={false}
                            required
                            isAllowed={(values) => {
                              const { value } = values;
                              return value < 10000 && !value.includes(".");
                            }}
                            onChange={(e) =>{
                                const val = e.target.value
                                setConsumerHousehold(val)
                                if(val){setErrConsumerHousehold(false)}
                            }}
                            customInput={TextField}
                            style={style.textfield}
                            error={errConsumerHousehold}
                            />
                            
                        </Box>
                    </Box>
                </Paper>
     );
}
 
export default PersonalInfo;