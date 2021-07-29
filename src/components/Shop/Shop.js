import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import Product from '../Product/Product';
import './Shop.css';
const Shop = () => {
    //console.log(fakeData);
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
        const product = fakeData.find(pd => pd.key === existingKey);
        product.quantity = savedCart[existingKey];
        return product;
        })
        
        setCart(previousCart);
}, [])



    const handleAddProduct  =  (product) =>{
        //console.log('Product add', product);
        
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);

        let count = 1;
        let newCart;

        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];

        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
       
        setCart(newCart);
        addToDatabaseCart(product.key,count);
    }
    
    return (
    <div className="twin-container">

            {/* <h1> This is shop</h1>
            <h3>{products.length}</h3> */}

        <div className="product-container">
                {
                    products.map(pd => <Product
                       key= {pd.key}
                        ShowAddToCart = {true}
                        handleAddProduct = {handleAddProduct}
                        product ={pd}>
                        </Product>)
                }
            
        </div>
        <div className="cart-container">
          <Cart cart={cart}><Link to="/review"><button className="cart-button">Review Order</button></Link></Cart>
        </div>
            
    </div>
    );
};
const first10 = fakeData.slice(0,10);
export default Shop;