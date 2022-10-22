import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const Popup = ({title, children, openPopup, setOpenPopup}) => {
  return ( 
    <Dialog open={openPopup}>
      <DialogTitle>
        <div>title goes here</div>
      </DialogTitle>
      <DialogContent>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
   );
}
 
export default Popup;