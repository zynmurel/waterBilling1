import { Box, Card, Typography } from '@mui/material';
import { style } from '@mui/system';
import '../../Styles/PageStyles/home.css'
const Home = ({result}) => {
    const { data:consumer, isPending, error } = result
    const styles = {
        home:{
            color:"grey"
        },
        container:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
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
            flex:5,
            width:800,
            height:800,
            backgroundColor:"rgb(230, 235, 239)",
            color:"rgb(75, 75, 75)",
            border: "2px solid grey"
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
            fontSize:110, 
            margin:0, 
            color:"rgb(15,94,156)",
            margin:" -25px 0 0 0"
        },
        text2:{
            fontSize:70, 
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
                                {consumer && consumer.length}
                                {isPending && <span style={styles.isPending}>...</span>}
                                {error && <span style={styles.error}>err</span>}
                            </Typography>
                        </Box>
                        <Box style={styles.box2_1}>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize} >
                                Delinquent Consumer/s:
                            </Typography>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize} sx={{color:styles.boxFont.color}}>
                                {consumer && "1"}
                                {isPending && <span style={styles.isPending}>...</span>}
                                {error && <span style={styles.error}>err</span>}
                            </Typography>
                        </Box>
                        <Box style={styles.box2_1}>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize}>
                                Disconnected Consumer/s:
                            </Typography>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize} sx={{color:styles.boxFont.color}}>
                                {consumer && "2"}
                                {isPending && <span style={styles.isPending}>...</span>}
                                {error && <span style={styles.error}>err</span>}
                            </Typography>
                        </Box>
                        <Box style={styles.box2_1}>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize}>
                                Collection in September:
                            </Typography>
                            <Typography gutterBottom fontWeight={"bold"} fontSize={styles.boxFont.fontSize} sx={{color:styles.boxFont.color}}>
                                {consumer && "P20000"}
                                {isPending && <span style={styles.isPending}>...</span>}
                                {error && <span style={styles.error}>err</span>}
                            </Typography>
                        </Box>
                    </Card>
           
                </Box>
            </Box>
     );
}
 
export default Home;