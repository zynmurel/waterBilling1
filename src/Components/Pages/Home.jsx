import { Box, Card, Typography } from '@mui/material';
import GetData from '../../Hook/SampleData'
import '../../Styles/PageStyles/home.css'
const Home = ({ hostLaravel, month, collectionReports, consumerReports, dateNow}) => {

    const { data:collection , isPending:collectionPending, error:collectionError } = collectionReports
    const { data:consumer , isPending:consumerPending, error:consumerError } = consumerReports
    console.log(consumer && consumer.consumerReport)
    var makeDate = new Date();
    const prev = new Date(makeDate.getFullYear(), makeDate.getMonth()-1)
    console.log(prev)
    const styles = {
        home:{
            color:"grey"
        },
        container:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            padding:10
        },
        box1:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            flex:1
        },
        box2:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            flex:6,
            width:800,
            backgroundColor:"rgb(230, 235, 239)",
            color:"rgb(75, 75, 75)"
        },
        box2_1:{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
            margin:10,
            width:600,
        },
        text1:{
            fontSize:100, 
            margin:0, 
            color:"rgb(12,20,52)",
            margin:" -25px 0 0 0"
        },
        text2:{
            fontSize:60, 
            margin:" -25px 0 5px 0"
        },
        boxFont:{
            fontSize:35,
            color:"rgb(15,94,156)"
        },
        isPending:{
            color:"gray", 
            margin:0
        },
        error:{
            color:"rgb(220, 24, 24)", 
            margin:0
        }
        
    }
    return ( 
            <Box className="home" sx={{...styles.home}}>
                <Box className="container" sx={{...styles.container}}>
                    <Box className="box1" sx={styles.box1}>
                        <h1 style={styles.text1}>BALILIHAN</h1>
                        <h1 style={styles.text2}>WATERWORKS</h1>
                    </Box>
                    <Card style={styles.box2}>
                        <Box style={styles.box2_1}>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize}>
                                Consumer/s:
                            </Typography>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize} sx={{color:styles.boxFont.color}}>
                                {consumer&& !consumerPending && consumer.consumerReport.totalConsumers}
                                {consumerPending && <span style={styles.isPending}>...</span>}
                                {consumerError && <span style={styles.error}>err</span>}
                            </Typography>
                        </Box>
                        <Box style={styles.box2_1}>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize} >
                                Delinquent Consumer/s:
                            </Typography>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize} sx={{color:styles.boxFont.color}}>
                                {consumer&& !consumerPending && consumer.consumerReport.totalDelinquent}
                                {consumerPending && <span style={styles.isPending}>...</span>}
                                {consumerError && <span style={styles.error}>err</span>}
                            </Typography>
                        </Box>
                        <Box style={styles.box2_1}>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize}>
                                Disconnected Consumer/s:
                            </Typography>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize} sx={{color:styles.boxFont.color}}>
                                {consumer&& !consumerPending && consumer.consumerReport.totalDisconnected}
                                {consumerPending && <span style={styles.isPending}>...</span>}
                                {consumerError && <span style={styles.error}>err</span>}
                            </Typography>
                        </Box>
                        <Box style={styles.box2_1}>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize}>
                                Collection ( {month[prev.getMonth()].slice(0,3)} {prev.getFullYear()} ):
                            </Typography>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize} sx={{color:styles.boxFont.color}}>
                                {collection&& !collectionPending ?`₱ ${collection.collectionReport.totalCollection }`:''}
                                {collectionPending && <span style={styles.isPending}>...</span>}
                                {collectionError && <span style={styles.error}>err</span>}
                            </Typography>
                        </Box>
                    </Card>
           
                </Box>
            </Box>
     );
}
 
export default Home;