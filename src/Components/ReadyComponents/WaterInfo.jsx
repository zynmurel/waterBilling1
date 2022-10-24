import { FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
const WaterInfo = ({style, Utilities}) => {
    const {data:uti, isPending, error}= Utilities
    return ( 
        <Paper style={{marginBottom:10 ,flex:6,...style.paper }}>
                    <Typography variant="h7" gutterBottom fontWeight={"bold"} style={style.typography}>
                        WATER METER INFORMATION
                    </Typography>

                        <FormControl style={style.textfield}>
                            <InputLabel id="demo-simple-select-helper-label">Usage Type</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Gender"
                            >{
                                uti && uti.usage_type.map((ut)=>(
                                    <MenuItem value={ut} key={ut}>{ut}</MenuItem>
                                ))
                            }
                            </Select>
                        </FormControl>

                        <FormControl style={style.textfield}>
                            <InputLabel id="demo-simple-select-helper-label">Meter Brand</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Gender"
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
                        style={style.textfield} />

                        <TextField 
                        id="outlined-basic" 
                        label="First Reading" 
                        variant="outlined"
                        style={style.textfield} />

                        <TextField 
                        id="outlined-basic" 
                        label="Installation Date" 
                        variant="outlined"
                        style={style.textfield} />

                </Paper>
     );
}
 
export default WaterInfo;