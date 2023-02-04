import './App.css';
import "react-toastify/dist/ReactToastify.css"
import {BrowserRouter, Route,Routes} from "react-router-dom"
import { ToastContainer} from "react-toastify"
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CheckoutSuccess from './components/CheckoutSuccess';
import Dashboard from './components/admin/Dashboard'
import Products from './components/admin/Products'
import Summary from './components/admin/Summary'
import CreateProduct from './components/admin/CreateProduct'
import ProductsList from './components/admin/list/ProductsList';
import Users from './components/admin/Users';
import Orders from './components/admin/Orders';
import Product from './components/Details/Product';
import UserProfile from './components/Details/UserProfile';
import Order from './components/Details/Order';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      <ToastContainer/>
        <Navbar/>
        <Routes>
          <Route path="/not-found" element={<NotFound/>}/>
          <Route path="/cart" exact element={<Cart/>}/>
          <Route path="/checkout-success" exact element={<CheckoutSuccess/>}/>
          <Route path="/register" exact element={<Register/>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/product/:id" exact element={<Product/>}/>
          <Route path="/order/:id" exact element={<Order/>}/>
          <Route path="/user/:id" exact element={<UserProfile/>}/>

          <Route path="/admin" exact element={<Dashboard/>}>
            <Route path="products" exact element={<Products/>}>
              <Route index element={<ProductsList/>}/>
              <Route path="create-product" exact element={<CreateProduct/>}/>
            </Route>
            <Route path="summary" exact element={<Summary/>}/>
            <Route path="users" exact element={<Users/>}/>
            <Route path="orders" exact element={<Orders/>}/>
          </Route>
          <Route path="/" exact element={<Home/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
