import { Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import { useState } from "react";

const Popup = ({title, children, openPopup, maxWidth, consumerInfo}) => {

  const dataIsOn = Object.keys(consumerInfo).length!==0
  
  return ( 
    <Dialog open={openPopup} maxWidth={maxWidth} fullWidth>

      <DialogTitle style={{margin:0,  textAlign:"left"}}>
        <Typography gutterBottom fontWeight={"bold"} fontSize={30} style={{margin:"0 auto", borderBottom:"1px solid gray"}}>
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