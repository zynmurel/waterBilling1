import { Box } from "@mui/material";
const PaymentInfo = ({
    searchedConsumer,
    balance,
    bill,
    isPending,
    billError,
    billIsPending,
    total
}) => {
    console.log(bill && bill.billing)
    return ( 
    <Box style={{  padding:5, width:250,  margin:5, color:'black' }}>
    <h2 style={{ margin:0 }}>
        {searchedConsumer.user_key}
    </h2>
    <h2 style={{ margin:0 }}>{searchedConsumer.consumer_id}</h2>
    <h3 style={{ margin:0 }}>{`${searchedConsumer.first_name} ${searchedConsumer.middle_name} ${searchedConsumer.last_name}`}</h3>
    <p style={{ margin:0 }}>{`${searchedConsumer.usage_type}`}</p>
    <p style={{ margin:0 }}>{`${searchedConsumer.barangay}`}</p>
    <p style={{ margin:0 }}>{`Purok ${searchedConsumer.purok}`}</p>
    <div style={{ width:"100%", display:'flex', flexDirection:'column', alignItems:'center', justifyContentL:'center' }}>
        <h1 style={{ margin:"20px 0 0 0", color:'rgb(37, 104, 40)' }}>{`Total Bill`}</h1>
        <p style={{ color:'rgb(39, 39, 39)', margin:"0", fontSize:40 }}>₱{ total }</p>
    </div>


</Box> );
}
 
export default PaymentInfo;