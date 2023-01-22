import { Box } from "@mui/material";
const Confirmation = ({ searchedConsumer, payment, totalBilling}) => {
    return ( 
    <Box style={{  padding:5, width:300,  margin:5, color:'black' }}>
        <h2 style={{ margin:5 }}>{`Bill : ₱ ${totalBilling.toFixed(2)}`}</h2>
        <h2 style={{ margin:5 }}>{`Payment : ₱ ${ payment.toFixed(2)}`}</h2>
        <h2 style={{ margin:5 }}>{`Balance : ₱ ${(totalBilling - payment).toFixed(2)}`}</h2>
    </Box> );
}
 
export default Confirmation;