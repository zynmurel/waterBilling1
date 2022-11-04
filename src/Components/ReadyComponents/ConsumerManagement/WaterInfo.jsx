import { FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { NumericFormat } from 'react-number-format';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const WaterInfo = ({
    style, 
    Utilities,

    consumerWaterType, 
    setConsumerWaterType,
    errConsumerWaterType,
    setErrConsumerWaterType,

    consumerWaterBrand, 
    setConsumerWaterBrand,
    errConsumerWaterBrand,
    setErrConsumerWaterBrand,

    consumerWaterSerial, 
    setConsumerWaterSerial,
    errConsumerWaterSerial,
    setErrConsumerWaterSerial,

    consumerWaterFirstReading, 
    setConsumerWaterFirstReading,
    errConsumerWaterFirstReading,
    setErrConsumerWaterFirstReading,

    consumerWaterRegDate,
    setConsumerWaterRegDate,
    errConsumerWaterRegDate,
    setErrConsumerWaterRegDate,

}) => {
    const {data:uti, isPending, error}= Utilities
    const onKeyDown = (e) => {
        e.preventDefault();
     };
    return ( 
        <Paper style={{marginBottom:10 ,flex:6,...style.paper }}>
                    <Typography variant="h7" gutterBottom fontWeight={"bold"} style={style.typography}>
                        WATER METER INFORMATION
                    </Typography>

                        <FormControl 
                            error={errConsumerWaterType}
                            style={style.textfield}>
                                <InputLabel 
                                id="demo-simple-select-helper-label">
                                Usage Type
                                </InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Usage Type"
                                defaultValue={""}
                                onChange={(e) =>{
                                    const val = e.target.value
                                    setConsumerWaterType(val);
                                    if(val){setErrConsumerWaterType(false)}
                                }}
                                value={consumerWaterType}
                                required
                                >{
                                    uti && uti.usage_type.map((ut)=>(
                                        <MenuItem value={ut} key={ut}>{ut}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>

                            <FormControl 
                                error={errConsumerWaterBrand}
                                style={style.textfield}>
                                    <InputLabel 
                                    id="demo-simple-select-helper-label">
                                    Meter Brand
                                    </InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Meter Brand"
                                    defaultValue={""}
                                    onChange={(e) =>{
                                        const val = e.target.value
                                        setConsumerWaterBrand(val);
                                        if(val){setErrConsumerWaterBrand(false)}
                                    }}
                                    value={consumerWaterBrand}
                                    required
                                    >{
                                        uti && uti.brand.map((br)=>(
                                            <MenuItem value={br} key={br}>{br}</MenuItem>
                                        ))
                                    }
                                    </Select>
                                </FormControl>

                                <TextField 
                                id="outlined-basic" 
                                label="Serial No." 
                                variant="outlined" 
                                type="text"
                                placeholder="ex: 1234"
                                onChange={(e) =>{
                                    const val = e.target.value.replace(/[^0-9,\-]/gi, '');

                                    setConsumerWaterSerial(val);
                                    !val || val.length>4? setErrConsumerWaterSerial(true) : setErrConsumerWaterSerial(false)
                                }}
                                style={style.textfield}
                                value={consumerWaterSerial}
                                required
                                error={errConsumerWaterSerial}
                                />


                                <NumericFormat
                                label="First Reading" 
                                variant="outlined" 
                                placeholder="ex: 3412"
                                value={consumerWaterFirstReading}
                                allowNegative={false}
                                required
                                isAllowed={(values) => {
                                const { value } = values;
                                return value.length<5 && !value.includes(".");
                                }}
                                onChange={(e) =>{
                                    const val = e.target.value
                                    setConsumerWaterFirstReading(val)
                                    val===""? setErrConsumerWaterFirstReading(true): setErrConsumerWaterFirstReading(false)
                                }}
                                customInput={TextField}
                                style={style.textfield}
                                error={errConsumerWaterFirstReading}
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Registration Date"
                                    value={consumerWaterRegDate}
                                    onChange={(newValue) => {
                                    newValue? setConsumerWaterRegDate(newValue): setConsumerWaterRegDate("")
                                    newValue && (isNaN(newValue.$D) || newValue.$D==null )? setErrConsumerWaterRegDate(true): setErrConsumerWaterRegDate(false)
                                    }}
                                    renderInput={(params, validator) => 
                                    <TextField 
                                    onKeyDown={onKeyDown}
                                    {...params}
                                    error={errConsumerWaterRegDate} />}
                                />
                                </LocalizationProvider>

                </Paper>
     );
}
 
export default WaterInfo;