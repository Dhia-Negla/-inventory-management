import React, { useRef } from 'react';
import "./popup.css"
import { AiFillCloseSquare } from "react-icons/ai"
import Axios from "axios"

function Popup({setProducts, popup, setPopup}) {
    const name = useRef();
    const price = useRef();
    const qty = useRef();

    function handleConfirm() {
        Axios.post(
            'http://localhost:3001/create',
            {
                name: name.current.value,
                price: price.current.value,
                qty: qty.current.value
            }).then(() => {
                Axios.get('http://localhost:3001/products').then((response) => {
                    setProducts(response.data)
                })
            })
        setPopup(false);
    }

  return popup ?
    <div className='background'>
        <div className='pop'>
            <div className='addproduct'>
                Add Product
                <AiFillCloseSquare onClick={() => setPopup(false)} className="closeicon" />
            </div>
            <div className='field'>
                <label>name: </label> <input type="text" ref={name} name="name" placeholder="name" className='input'/>
            </div>
            <div className='field'>
                <label>price: </label> <input type="number" ref={price} name="price" placeholder="price" className='input'/>
            </div>
            <div className='field'>
                <label>quantity: </label> <input type="number" ref={qty} name="qty" placeholder="quantity" className='input'/>
            </div>
            <div className='confirm'>
                <button onClick={() => setPopup(false)} className='btn1'>Cancel</button>
                <button onClick={handleConfirm} className='btn2'>Confirm</button>
            </div>
        </div>
    </div>
    : null;
}

export default Popup;
