import { Box } from "@mui/material";
const PaymentInfo = ({componentRef, searchedConsumer}) => {
    return ( 
    <Box ref={componentRef} style={{  padding:5, width:370,  margin:5, color:'black' }}>
    <h2 style={{ margin:0 }}>
        {searchedConsumer.user_key}
    </h2>
    <h3 style={{ margin:0 }}>{`${searchedConsumer.first_name} ${searchedConsumer.middle_name} ${searchedConsumer.last_name}`}</h3>
    <p style={{ margin:0 }}>{`${searchedConsumer.usage_type}`}</p>
    <p style={{ margin:0 }}>{`${searchedConsumer.barangay}`}</p>
    <p style={{ margin:0 }}>{`Purok ${searchedConsumer.purok}`}</p>


</Box> );
}
 
export default PaymentInfo;