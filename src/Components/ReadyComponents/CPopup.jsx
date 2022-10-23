import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const Popup = ({title, children, openPopup, setOpenPopup, maxWidth}) => {
  return ( 
    <Dialog open={openPopup} maxWidth={maxWidth} fullWidth>
      <DialogTitle>
        <div>title goes here</div>
      </DialogTitle>
      <DialogContent >
        <div>{children}</div>
      </DialogContent>
    </Dialog>
   );
}
 
export default Popup;