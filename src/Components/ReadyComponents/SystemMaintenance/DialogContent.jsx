import { Box, TextField } from "@mui/material";
import { NumericFormat, PatternFormat } from 'react-number-format';
import { Button } from '@mui/material';
const PopupContent = ({
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
      value={0}
      allowNegative={false}
      isAllowed={(values) => {
        const { value } = values;
        return value < 99 && !value.includes(".");
      }}
      customInput={TextField}
      style={ styles.input }
      />)
    

    return ( 
        <Box style={styles.container}>

                <Box>

                <Button
                variant="outlined"
                style={{ ...styles.button, color:'rgb(12,20,52)', border:"solid 1px rgb(12,20,52)"}}
                >Cancel</Button>
                
                <Button
                variant="contained"
                style={{ ...styles.button,backgroundColor:'rgb(12,20,52)' }}
                >Submit</Button>

                </Box>
        </Box>
    );
}
 
export default PopupContent;