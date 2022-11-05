import { Box, Card, Autocomplete } from '@mui/material';
import '../../Styles/PageStyles/inquire.css'
import { TextField} from '@mui/material';
import { createFilterOptions } from '@mui/material';
import { useState } from 'react';

const Inquire = ({result}) => {
    const { data:consumer, isPending, error } = result

    const [ searchConsumer, setSearchConsumer ] = useState("")

    const OPTIONS_LIMIT = 8;
    const filterOptions = createFilterOptions({
        limit: OPTIONS_LIMIT
      });

    console.log(searchConsumer? true: false)
      

    const styles = {
        inquire:{
            color:"grey"
        },
        container:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        },
        box1:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
        },
        box2:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            flex:5,
            width:800,
            height:800,
            color:"rgb(75, 75, 75)",
            margin:"20px"
        },
        text1:{
            fontSize:50, 
            margin:0, 
            color:"rgb(15,94,156)",
            margin:" 0px 0 10px 0"
        }
    }
    return ( 
            <Box className="inquire" sx={{...styles.inquire}}>
                <Box className="container" sx={{...styles.container}}>
                    <Box className="box1" sx={styles.box1}>
                            <h1 style={styles.text1}>INQUIRE FOR PAYMENT</h1>

                        <Box className="box1">
                        <Autocomplete
                            disablePortal
                            disabled={isPending || error}
                            getOptionLabel={(option) => `${option.id} ${option.first_name} ${option.middle_name} ${option.last_name}`}
                            id="combo-box-demo"
                            options={consumer? consumer: []}
                            filterOptions={filterOptions}                      
                            sx={{ width: 400 }}
                            onChange={(event , val)=>{ setSearchConsumer(val); console.log(val)}}
                            renderInput={(params) => 
                            <TextField
                            {...params} 
                            label={ isPending?"Loading...":"Search ID Number/Name" }
                            />}
                            />
                        </Box>
                    </Box>
                    <Card style={styles.box2}>
                        <Box></Box>
                    </Card>
           
                </Box>
            </Box>
     );
}
 
export default Inquire;