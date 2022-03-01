import './App.css';
import { MdOutlineInventory } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'
import { useEffect, useState } from 'react';
import Popup from './Components/popup/Popup';
import Axios from "axios"

function App() {
  const [products, setProducts] = useState([])
  const [popup,setPopup] = useState(false)


  useEffect(() => {
    Axios.get('http://localhost:3001/products').then((response) => (setProducts(response.data)));
}, [])

  return (
    <div className='grid-container'>
      <Popup setProducts={setProducts} popup={popup} setPopup={setPopup} />
      <div className='header'>
        <MdOutlineInventory className='headericon'/> Stock
        <button onClick={() => setPopup(true)} className='btn'>Add Product</button>
      </div>
      <div className='display'>
        <div className="headProducts">
          <span className="id" >#Id</span>
          <span className="desc" >Description</span>
          <span className="price">Price</span>
          <span className="qty">Quantity</span>
          <span className="amount">Amount</span>
          <span className="delete">Delete</span>
         </div>
         {products.map((product) => (
           <div className="product">
             <span className="rid" >{product.id}</span>
            <span className="rdesc" >{product.name}</span>
            <span className="rprice">{product.price}</span>
            <span className="rqty">{product.qty}</span>
            <span className="ramount">{product.price*product.qty}</span>
            <span /* onClick={() => setItemToDelete(item)} */ className="rdelete"><AiFillDelete/></span>
         </div>
         ))}
      </div>
    </div>
  );
}

export default App;
