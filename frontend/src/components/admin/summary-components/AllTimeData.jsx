import {useSelector} from "react-redux"
import styled from "styled-components"
const AllTimeData = ()=>{
    const {items} = useSelector(state=>state.products)
    return (<Main>
    <h3>All Time</h3>
    <Info>
        <Title>Users</Title>
        <Data>{items.length}</Data>
    </Info>
    <Info>
        <Title>Products</Title>
        <Data>{items.length}</Data>
    </Info>
    <Info>
        <Title>Orders</Title>
        <Data>200</Data>
    </Info>
    <Info>
        <Title>Earnings</Title>
        <Data>200</Data>
    </Info>
    <Info>
        <Title>Users</Title>
        <Data>&#8377;20,000</Data>
    </Info>
    </Main>)
}
export default AllTimeData;

const Main = styled.div`
background: rgb(48, 51, 78);
    border-radius: 5px;
    color: rgba(234, 234, 255, 0.87);
    font-size: 14px;
    margin-top: 1.5rem;
    padding: 1rem;
`

const Info = styled.div`
background:rgba(38,198,249,0.12);
border-radius:3px;
display:flex;
margin-top:1rem;
padding:0.3rem;
&:n-th child(even){
background:rgba(102,108,255,0.12);
}
`
const Title = styled.div`
flex: 1;
`
const Data = styled.div`
flex: 1;
font-weight: 700;
`