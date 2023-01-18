import { Dialog, DialogContent, DialogTitle, Typography, Box, Button, IconButton } from "@mui/material";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import EditIcon from '@mui/icons-material/Edit';

const UpdateUser = ({children, setUserUpdate, userUpdate}) => {
  const styles ={
  }
  const openPopUp =  Object.keys(userUpdate).length!==0
  return ( 
    <Dialog open={openPopUp} maxWidth={"md"} >
      <DialogTitle>
        <Typography gutterBottom style={{ fontSize:20, fontWeight:'bold' }}>
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