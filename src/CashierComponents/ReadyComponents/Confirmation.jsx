import { Box } from "@mui/material";
const Confirmation = ({ searchedConsumer, payment, total,balance}) => {
    return ( 
    <Box style={{  padding:5, width:300,  margin:5, color:'black' }}>
        <p style={{ margin:5 }}>{`Bill : ₱ ${total}`}</p>
        <p style={{ margin:5 }}>{`Payment : ₱ ${ payment.toFixed(2)}`}</p>
        <p style={{ margin:5 }}>{`Balance : ₱ ${  (total) - payment.toFixed(2)}`}</p>
        {/* <h2 style={{ margin:5 }}>{`Balance : ₱ ${(totalBilling - payment).toFixed(2)}`}</h2> */}
    </Box> );
}
 
export default Confirmation;