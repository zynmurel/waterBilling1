import { Box, Card } from '@mui/material';
import '../../Styles/PageStyles/home.css'
const Home = () => {
    const styles = {
        home:{
            padding:2,
            color:"black"
        },
        container:{

        }
    }
    return ( 
            <Box className="home" sx={{...styles.home}}>
                <Box className="container" sx={{...styles.container}}>
                    <Box>
                        <h1>BALILIHAN</h1>
                        <h1>WATERWORKS</h1>
                    </Box>
                    <Card>

                    </Card>
           
                </Box>
            </Box>
     );
}
 
export default Home;