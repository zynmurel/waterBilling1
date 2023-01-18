import { Dialog, DialogContent, DialogTitle, Typography, Box, Button, IconButton } from "@mui/material";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import EditIcon from '@mui/icons-material/Edit';

const ConsumerPopup = ({title, children, consumerPopUp, maxWidth, setConsumerPopup, consumerInfo, setOpenPopup, setConsumerInfo}) => {
  const styles ={
    dialogTitle:{
      margin:"0 0 0px 0",  
      textAlign:"left", 
      padding:"0px 10px 0px 20px",
      display:"flex",
      justifyContent:"space-between",
      backgroundColor:"rgb(12,20,52)"
    },
    typography:{
      margin:"0",
      color:"white"
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
    <Dialog open={consumerPopUp} maxWidth={maxWidth} fullWidth className="dialogConsumer">

      <DialogTitle style={styles.dialogTitle}>
        <Typography gutterBottom fontWeight={"bold"} fontSize={40} style={styles.typography}>
            {consumerInfo.consumer_id? consumerInfo.consumer_id : "none"} 
        </Typography>
        <Box style={styles.box}>
          <Button color="warning" aria-label="edit" onClick={()=> setOpenPopup(true)}><EditIcon sx={{fontSize:35, color:"orange", margin:"0 5px"}}/></Button>
          <Button color="error" aria-label="exit" onClick={()=>{ setConsumerPopup(false)}}><DisabledByDefaultIcon sx={{fontSize:35, color:"rgb(255, 59, 59)", margin:"0 5px" }} /></Button>
          
        </Box>
      </DialogTitle>

      <DialogContent style={styles.content}>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
   );
}
 
export default ConsumerPopup;