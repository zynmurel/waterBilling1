import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
const PersonalInfo = ({style}) => {
    return ( 
        <Box style={{display:"flex", justifyContent:"center", flexDirection:"row"}}>
                        <Box style={{display:"flex", flexDirection:"column", flex:1, marginRight:10}}>
                            <TextField 
                            id="outlined-basic" 
                            label="Consumer Number" 
                            variant="outlined" 
                            style={style.textfield}
                            />
                            
                            <TextField 
                            id="outlined-basic" 
                            label="First Name" 
                            variant="outlined" 
                            style={style.textfield}
                            />

                            <TextField 
                            id="outlined-basic" 
                            label="Middle Name" 
                            variant="outlined"
                            style={style.textfield} />

                            <TextField 
                            id="outlined-basic" 
                            label="Last Name" 
                            variant="outlined"
                            style={style.textfield} />

                            <TextField 
                            id="outlined-basic" 
                            label="Age" 
                            variant="outlined"
                            style={style.textfield} />
                            
                            <FormControl style={style.textfield}>
                                <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Gender"
                                >
                                <MenuItem value={10}>Male</MenuItem>
                                <MenuItem value={20}>Female</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField 
                            id="outlined-basic" 
                            label="Phone Number (Optional)" 
                            variant="outlined"
                            style={style.textfield} />
                        
                        </Box>
                        <Box style={{display:"flex", flexDirection:"column", flex:1}}>

                            <FormControl style={style.textfield}>
                                <InputLabel id="demo-simple-select-helper-label">Civil Status</InputLabel>
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
                            label="Name of Spouse" 
                            variant="outlined"
                            style={style.textfield} />

                            <FormControl style={style.textfield}>
                                <InputLabel id="demo-simple-select-helper-label">Barangay</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Gender"
                                >
                                <MenuItem value={10}>Single</MenuItem>
                                <MenuItem value={20}>Married</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl style={style.textfield}>
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
     );
}
 
export default PersonalInfo;