import { useEffect, useState } from "react";
import axios from "axios"
import AuthUser from "./AuthUser";
const CreateData = (baseUrl, url, data) => {
    const {token} = AuthUser()
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [reload, setReload] = useState(false)

    const http = axios.create({
        baseURL:baseUrl,
        headers:{
            'Content-type' : 'application/json',
            'Authorization' : `Bearer ${token}`,
            'Accept': 'application/json'
        },
        body: JSON.stringify()
    });
    
            http.get(url)
            .then(res=>{
              if(res.statusText!=="OK"){
                throw Error('Could not fetch data of for that resource');
              }
              return res.data;
            })
            .then(data=>{
                console.log("data")
            })
            .catch(err=> { 
               console.log(err)
            })
  
        
      return {data, isPending, error, reload, setReload};
}
 
export default CreateData;