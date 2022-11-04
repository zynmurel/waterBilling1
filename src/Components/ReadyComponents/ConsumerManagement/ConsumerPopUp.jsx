import { Dialog, DialogContent, DialogTitle, Typography, Box, Button, IconButton } from "@mui/material";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import EditIcon from '@mui/icons-material/Edit';

const ConsumerPopup = ({title, children, consumerPopUp, maxWidth, setConsumerPopup, consumerInfo}) => {
  const styles ={
    dialogTitle:{
      margin:"0 0 0px 0",  
      textAlign:"left", 
      padding:"0px 10px 0px 20px",
      display:"flex",
      justifyContent:"space-between",
      backgroundColor:"rgb(230, 235, 239)"
    },
    typography:{
      margin:"0"
    },
    box:{
      display:"flex",
      alignItems:"center"
    },
    content:{
      padding:"10px 20px"
    },
    button:{ 
    }
  }
  return ( 
    <Dialog open={consumerPopUp} maxWidth={maxWidth} fullWidth>

      <DialogTitle style={styles.dialogTitle}>
        <Typography gutterBottom fontWeight={"bold"} fontSize={40} style={styles.typography}>
            {consumerInfo.id? consumerInfo.id : "none"} 
        </Typography>
        <Box style={styles.box}>
          <IconButton color="warning" aria-label="edit" onClick={()=> setConsumerPopup(false)}><EditIcon sx={{fontSize:30, color:"warning", margin:"0 5px"}}/></IconButton>
          <IconButton color="error" aria-label="exit" onClick={()=> setConsumerPopup(false)}><DisabledByDefaultIcon sx={{fontSize:30, color:"error", margin:"0 5px" }} /></IconButton>
          
        </Box>
      </DialogTitle>

      <DialogContent style={styles.content}>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
   );
}
 
export default ConsumerPopup;