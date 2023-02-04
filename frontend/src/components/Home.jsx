import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router"; 
import { addToCart } from "../slices/cartSlice";
import {useGetAllProductsQuery } from "../slices/productsApi";
import {Link} from "react-router-dom"
const Home = () => {
  const {items: data,status} = useSelector((state)=>state.products)
  // console.log(auth)
  const { data1, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch() 
  const navigate = useNavigate()
  const handleAddToCart = (product)=>{
    dispatch(addToCart(product));
    navigate("/cart")
  }
  return (
    <div className="home-container">
      {isLoading ? <p>loading</p> : error ? <p>An error occured</p> : <><h2>New Arrivals</h2>
      <div className="products">
        {data?.map(product=> <div key={product._id} className="product">
          <Link to ={`/product/${product._id}`}> {/*add it to image*/}
          <h3>{product.name}</h3>
          {/* <img src={product.image.url} alt={product.name} /> */}
          </Link>
          <div className="details">
            <span>{product.desc}</span>
            <span className="price">&#8377;{product.price}</span>
          </div>
          <button onClick={()=>handleAddToCart(product)}>Add To Cart</button>
          </div>)}  
      </div></>}
    </div>
  );
};

export default Home;
