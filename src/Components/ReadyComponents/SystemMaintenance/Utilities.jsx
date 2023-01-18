import { Box, Button, Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import PopupContent from "./DialogContent";
import BasicTable from "./UtilitiesList";
import { useState } from "react";
import GetData from '../../../Hook/SampleData';

const Utilities = ({children, hostJson}) => {
    const consumersData = GetData(hostJson, '/CubicRate');
    console.log(consumersData.data && consumersData.data.find( item => item.id === "Residential1to5").value)
    const getUtitlity = (id) => {
        return consumersData.data && consumersData.data.find( item => item.id === id).value
    }
    const res1to5 = getUtitlity("Residential1to5")
    const res6to10 = getUtitlity("Residential6to10")
    const res11to20 = getUtitlity("Residential11to20")
    const res21to50 = getUtitlity("Residential21to50")
    const res51up = getUtitlity("Residential51up")

    const com1to5 = getUtitlity("Commercial1to5")
    const com6to10 = getUtitlity("Commercial6to10")
    const com11to20 = getUtitlity("Commercial11to20")
    const com21to50 = getUtitlity("Commercial21to50")
    const com51up = getUtitlity("Commercial51up")

    const penalty = getUtitlity("penalty")
    const dueday = getUtitlity("dueday")
    const [update, setUpdate] = useState("")
    const styles = {
        content:{
            padding:"0 20px",
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
        },
        h2:{
            marginTop:0
        },
        box:{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            backgroundColor:'rgb(250, 250, 250)',
            padding:20,
            width:540,
            height:515,
            marginTop:20,
            borderRadius:5,
            overflow:'auto',
        },
    }
    return ( 
        <Box style={styles.content}>
            <Box style={styles.box}>
            <h2 style={styles.h2}>SYSTEM UTILITIES</h2>
                {
                consumersData.data && 
                <BasicTable
                    setUpdate={setUpdate}

                    res1to5={res1to5}
                    res6to10={res6to10}
                    res11to20={res11to20}
                    res21to50={res21to50}
                    res51up={res51up}

                    com1to5={com1to5} 
                    com6to10={com6to10} 
                    com11to20={com11to20}
                    com21to50={com21to50} 
                    com51up={com51up}

                    penalty={penalty}
                    dueday={dueday}
                    />
                }
                <Dialog open={update?true:false} maxWidth={'xs'} fullWidth>
                <DialogTitle style={{margin:0,  textAlign:"left"}}>
                    <Typography gutterBottom fontWeight={"bold"} fontSize={30} style={{margin:"0 auto", borderBottom:"1px solid gray"}}>
                        {update}
                    </Typography>
                    </DialogTitle>

                    <DialogContent >
                            <PopupContent
                            res1to5={res1to5} 
                            res6to10={res6to10} 
                            res11to20={res11to20}
                            res21to50={res21to50} 
                            res51up={res51up}

                            com1to5={com1to5} 
                            com6to10={com6to10} 
                            com11to20={com11to20}
                            com21to50={com21to50} 
                            com51up={com51up}

                            penalty={penalty}

                            dueday={dueday}

                            update={update}
                            setUpdate={setUpdate}
                            />
                    </DialogContent>
                </Dialog>
            </Box>
        </Box>
     );
}
 
export default Utilities;