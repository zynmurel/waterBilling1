import { useEffect, useState } from "react";


const useFetch = (url, actualId)=> {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [reload, setReload] = useState(false)

    useEffect(()=>{
        setTimeout(()=>{
          fetch(url)
          .then(res=>{
            if(!res.ok){
              throw Error('Could not fetch data of for that resource');
            }
            return res.json();
          })
          .then(data=>{
            setData(data)
            setIsPending(false)
            setError(null)
          })
          .catch(err=> { 
            setIsPending(false)
            setError(err.message)
            setData(null)
          })
        },1000)

      },[reload])

      
    return {data, isPending, error, reload, setReload};
}
 
export default useFetch;
