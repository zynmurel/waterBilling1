import { Box } from "@mui/system";

const Accounts = () => {
    const styles = {
        content:{
            padding:"0 20px",
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
        },
        h2:{
            marginTop:0
        },
        box:{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            backgroundColor:'rgb(218, 222, 233)',
            padding:20,
            width:530,
            height:515,
            marginTop:20,
            borderRadius:5,
            overflow:'auto',
        },
        button:{
            marginTop:10
        }
    }
    return ( 
        <Box style={styles.content}>
        <Box style={styles.box}>
        <h2 style={styles.h2}>MANAGE ACCOUNT</h2>
        </Box>
        </Box>
     );
}
 
export default Accounts;