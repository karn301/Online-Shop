import styled from "styled-components"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect,useState } from "react";
import axios from "axios"
import { url } from "../../../slices/api";
import { setHeaders } from "../../../slices/api";
const Chart = ()=>{
    const [sales,setSales] = useState([])
    const [loading,setLoading] = useState(false)
    function compare(a,b){
        if(a._id < b._id){
            return 1
        }
        if(a._id > b._id){
            return 1
        }
        return 0;

    }
    useEffect(()=>{
      setLoading(true)
        async function fetchData(){
            try{
                const res = await axios.get(`${url}/orders/week-sales`,setHeaders())
                res.data.sort(compare)
                const newdata = res.data.map((item)=>{
                  const DAYS = [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thur",
                    "Fri",
                    "Sat",
                  ]
                  return {
                    day:DAYS[item._id - 1],
                    amount: item.total / 100
                  }
                })
                setSales(newdata)
                setLoading(false)
            }
            catch(err){
                console.log(err)
                setLoading(false)

              }
        }
        fetchData()
    },[])
   
    return (
    <>
    {
      loading ? <Loader>Loading Chart ...</Loader>:
    <StyledChart>
        <h3>Last 7 Days Earnings(INR &#8377;)</h3>
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={sales}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </StyledChart>
}
    </>
    )
}
export default Chart 

const StyledChart = styled.div`
    width:100%;
    height:300px;
    margin-top:2rem;
    padding:1rem;
    border:2px solid rgba(48,51,78,0.2);
    border-radius:5px;
    h3{
        margin-bootm:1rem;
    }
`

const Loader = styled.p`
margin-top:2rem;
`
