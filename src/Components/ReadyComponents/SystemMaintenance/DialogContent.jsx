import { Box, TextField } from "@mui/material";
import { NumericFormat, PatternFormat } from 'react-number-format';
import { Button } from '@mui/material';
const PopupContent = ({
  res1to5,
  setRes1to5,
  res6to10, 
  setRes6to10,
  res11to20,
  setRes11to20,
  res21to50,
  setRes21to50,
  res51up,
  setRes51up,

  com1to5,
  setCom1to5,
  com6to10,
  setCom6to10,
  com11to20,
  setCom11to20,
  com21to50,
  setCom21to50,
  com51up,
  setCom51up,
    penalty,
    setPenalty,
    dueDate,
    setDueDate,
    update,
    setUpdate
}) => {
    const styles={
        container:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column'
        },
        input:{
            marginTop:10,
            width:300
        },
        button:{
            margin:10
        }
    }

    const updateUtility = (type, value, setValue) => (
      <NumericFormat
      label={type} 
      variant="outlined" 
      value={value}
      allowNegative={false}
      isAllowed={(values) => {
        const { value } = values;
        return value < 99 && !value.includes(".");
      }}
      onChange={(e) =>{
          const val = e.target.value
          setValue(val)
      }}
      customInput={TextField}
      style={ styles.input }
      />)
    

    return ( 
        <Box style={styles.container}>
        {update === 'Residential 1-5' && updateUtility(update, res1to5, setRes1to5)}
        {update === 'Residential 6-10' && updateUtility(update, res6to10, setRes6to10)}
        {update === 'Residential 11-20' && updateUtility(update, res11to20, setRes11to20)}
        {update === 'Residential 21-50' && updateUtility(update, res21to50, setRes21to50)}
        {update === 'Residential 51 up' && updateUtility(update, res51up, setRes51up)}

        {update === 'Commercial 1-5' && updateUtility(update, com1to5, setCom1to5)}
        {update === 'Commercial 6-10' && updateUtility(update, com6to10, setCom6to10)}
        {update === 'Commercial 11-20' && updateUtility(update, com11to20, setCom11to20)}
        {update === 'Commercial 21-50' && updateUtility(update, com21to50, setCom21to50)}
        {update === 'Commercial 51 up' && updateUtility(update, com51up, setCom51up)}

        {update === 'Penalty' && updateUtility(update, penalty, setPenalty)}
        {update === 'Due Date ( Day )' && updateUtility(update, dueDate, setDueDate)}

                <Box>

                <Button
                variant="outlined"
                style={{ ...styles.button, color:'rgb(12,20,52)', border:"solid 1px rgb(12,20,52)"}}
                onClick={()=>setUpdate('')}>Cancel</Button>
                
                <Button
                variant="contained"
                style={{ ...styles.button,backgroundColor:'rgb(12,20,52)' }}
                onClick={()=>setUpdate('')}>Submit</Button>

                </Box>
        </Box>
    );
}
 
export default PopupContent;