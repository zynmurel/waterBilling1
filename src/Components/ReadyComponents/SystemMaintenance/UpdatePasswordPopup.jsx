import { Dialog, DialogContent, DialogTitle, Typography, Box, Button, IconButton } from "@mui/material";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import EditIcon from '@mui/icons-material/Edit';

const UpdatePassword = ({children, setUserUpdate, userUpdate, openPasswordPopup}) => {
  const styles ={
  }
  const openPopUp =  Object.keys(userUpdate).length!==0
  return ( 
    <Dialog open={openPasswordPopup && openPopUp} maxWidth={"md"} >
      <DialogTitle style={{ paddingBottom:0 }}>
        <Typography gutterBottom style={{ fontSize:20, fontWeight:'bold' }}>
            {`Update ${openPasswordPopup ? userUpdate.user_type: ""}'s Password`}
        </Typography>
      </DialogTitle>

      <DialogContent style={styles.content}>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
   );
}
 
export default UpdatePassword;