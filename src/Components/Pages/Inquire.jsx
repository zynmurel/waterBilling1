import { Box, Card, Autocomplete } from '@mui/material';
import '../../Styles/PageStyles/inquire.css'
import { TextField} from '@mui/material';
import { createFilterOptions } from '@mui/material';
import { useState } from 'react';

const Inquire = ({result}) => {
    const { data:consumer, isPending, error } = result

    const [ searchedConsumer, setSearchedConsumer ] = useState("")

    const OPTIONS_LIMIT = 8;
    const filterOptions = createFilterOptions({
        limit: OPTIONS_LIMIT
      });

    console.log(searchedConsumer? true: false)
      

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
            width:600,
            height:800,
            color:"rgb(75, 75, 75)",
            margin:"20px"
        },
        box3:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"flex-start",
            height:800,
            width:600,
            padding:"25px 15px"
        },
        box3_1:{
            display:"flex",
            flexDirection:"row",
            alignItems:"flex-start",
            justifyContent:"space-between",
            width:550,
        },
        box3_2:{
            width:550,
        },
        box3_1_1:{
            padding:"0 15px",
            backgroundColor: searchedConsumer && searchedConsumer.connected?"rgb(156, 218, 32)":"rgb(242, 54, 54)",
            color:"white",
            borderRadius:"2px",
        },
        text1:{
            fontSize:50, 
            margin:0, 
            color:"rgb(15,94,156)",
            margin:" 0px 0 10px 0",
        },
        h1:{
            color:"#989898",
            fontSize:20
        },
        h11:{
            margin:0,
            fontSize:40,
            color:"rgb(15,94,156)",
        },
        box3text:{
            margin:"5px 0",
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
                            onChange={(event , val)=>{ setSearchedConsumer(val); console.log(val)}}
                            renderInput={(params) => 
                            <TextField
                            {...params} 
                            label={ isPending?"Loading...":"Search ID Number/Name" }
                            />}
                            />
                        </Box>
                    </Box>
                    <Card style={styles.box2}>
                        {searchedConsumer ? 
                        <Box style={styles.box3}>
                            <Box style={styles.box3_1}>
                                <h1 style={styles.h11}>{searchedConsumer.id}</h1>
                                <Box style={styles.box3_1_1}><p>{searchedConsumer.connected? "Connected":"Disconnected"}</p></Box>
                            </Box>
                            <Box style={styles.box3_2}>
                                <h2 style={styles.box3text}>{`${searchedConsumer.first_name} ${searchedConsumer.middle_name} ${searchedConsumer.last_name}`}</h2>
                                <p style={{marginLeft:"1px",...styles.box3text}}>{`${searchedConsumer.barangay}, Purok ${searchedConsumer.purok}`}</p>
                            </Box>
                        </Box>:
                        <Box>
                            <h1 style={styles.h1}>SEARCH CONSUMER</h1>
                        </Box>
                        }
                    </Card>
           
                </Box>
            </Box>
     );
}
 
export default Inquire;