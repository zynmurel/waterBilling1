import { Dialog, DialogContent, DialogTitle, Typography, Box, Button, IconButton } from "@mui/material";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import EditIcon from '@mui/icons-material/Edit';

const UpdateUser = ({
  children, 
  setUserUpdate, 
  userUpdate,
  openEmailPopup,
  setOpenEmailPopup}) => {
  const styles ={
  }
  const openPopUp =  Object.keys(userUpdate).length!==0
  return ( 
    <Dialog open={openPopUp && openEmailPopup} maxWidth={"md"} >
      <DialogTitle style={{ paddingBottom:0 }}>
        <Typography gutterBottom style={{ fontSize:20, fontWeight:'bold', margin:0 }}>
            {`Update ${openPopUp ? userUpdate.user_type: ""}'s Email`}
        </Typography>
      </DialogTitle>

      <DialogContent style={styles.content}>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
   );
}
 
export default UpdateUser;