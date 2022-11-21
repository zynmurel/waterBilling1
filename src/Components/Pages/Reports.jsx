import useFetch from '../../Hook/useFetch';
import '../../Styles/PageStyles/reports.css'
const Reports = () => {
    const sample = useFetch('http://127.0.0.1:8000/api/prkbrgy')
    console.log(sample)
    return ( 
        <div className="reports">
            {sample.data && sample.data.map((dt)=>(
                <p style={{ margin:3 }}>{dt.barangay}</p>
            ))
            }{sample.isPending && 
                <h1>Loading...</h1>
            
            }
        </div>
     );
}
 
export default Reports;