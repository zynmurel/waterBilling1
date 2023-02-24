import { FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { NumericFormat } from 'react-number-format';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const WaterInfo = ({
    dataIsOn,
    setButtonPending,
    style,  
    usage_type, 
    brand,

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
                                disabled={dataIsOn?true:false}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Usage Type"
                                defaultValue={""}
                                onChange={(e) =>{
                                    const val = e.target.value
                                    setButtonPending(false);
                                    setConsumerWaterType(val);
                                    if(val){setErrConsumerWaterType(false)}
                                }}
                                value={consumerWaterType}
                                required
                                >{
                                    usage_type.map((ut)=>(
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
                                disabled={dataIsOn?true:false}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Meter Brand"
                                    defaultValue={""}
                                    onChange={(e) =>{
                                        const val = e.target.value
                                        setButtonPending(false);
                                        setConsumerWaterBrand(val);
                                        if(val){setErrConsumerWaterBrand(false)}
                                    }}
                                    value={consumerWaterBrand}
                                    required
                                    >{
                                        brand.map((br)=>(
                                            <MenuItem value={br} key={br}>{br}</MenuItem>
                                        ))
                                    }
                                    </Select>
                                </FormControl>

                                <TextField 
                                disabled={dataIsOn?true:false}
                                id="outlined-basic" 
                                label="Serial No." 
                                variant="outlined" 
                                type="text"
                                placeholder="ex: 1234"
                                onChange={(e) =>{
                                    const val = e.target.value.replace(/[^0-9,\-]/gi, '');

                                    setButtonPending(false);
                                    setConsumerWaterSerial(val);
                                    !val || val.length>4? setErrConsumerWaterSerial(true) : setErrConsumerWaterSerial(false)
                                }}
                                style={style.textfield}
                                value={consumerWaterSerial}
                                required
                                error={errConsumerWaterSerial}
                                />


                                <NumericFormat
                                disabled={dataIsOn?true:false}
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
                                    setButtonPending(false);
                                    setConsumerWaterFirstReading(val)
                                    val===""? setErrConsumerWaterFirstReading(true): setErrConsumerWaterFirstReading(false)
                                }}
                                customInput={TextField}
                                style={style.textfield}
                                error={errConsumerWaterFirstReading}
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                disabled={dataIsOn?true:false}
                                    label="Registration Date"
                                    value={consumerWaterRegDate}
                                    onChange={(newValue) => {

                                    setButtonPending(false)
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