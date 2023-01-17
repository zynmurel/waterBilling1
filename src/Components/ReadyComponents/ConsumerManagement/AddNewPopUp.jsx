import { Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import { useState } from "react";

const Popup = ({title, children, openPopup, maxWidth, consumerInfo, status, setStatus}) => {
  const dataIsOn = Object.keys(consumerInfo).length!==0
  return ( 
    <Dialog open={openPopup} maxWidth={maxWidth} fullWidth>

      <DialogTitle style={{margin:0,  textAlign:"left", display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderBottom:"1px solid gray", padding:"15px 30px 10px 30px"}}>
        <Typography gutterBottom fontWeight={"bold"} fontSize={30} style={{margin:0}}>
          {dataIsOn? "UPDATE CONSUMER":"ADD NEW CONSUMER"} 
        </Typography>
      </DialogTitle>

      <DialogContent >
        <div>{children}</div>
      </DialogContent>
    </Dialog>
   );
}
 
export default Popup;