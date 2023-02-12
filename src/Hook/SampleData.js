import { useEffect, useState } from "react";
import axios from "axios"
import AuthUser from "./AuthUser";


const useFetch = (baseUrl, url)=> {
    const {token} = AuthUser()
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [reload, setReload] = useState(false)

    const http = axios.create({
        baseURL:baseUrl,
        headers:{
            'Content-type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    });
 
    useEffect(()=>{
      setIsPending(true)
        setTimeout(()=>{
          http.get(url)
          .then(res=>{
            if(res.statusText!=="OK"){
              throw Error('Could not fetch data of for that resource');
            }
            return res.data;
          })
          .then(data=>{
            setData(data)
            setIsPending(false)
            setError(null)
          })
          .catch(err=> { 
            setIsPending(false)
            setError("Cannot fetch this data...")
            setData(null)
          })
        },1000)

      },[reload])

      
    return {data, isPending, error, reload, setReload};
}
 
export default useFetch;