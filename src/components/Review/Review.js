import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'
const Review = () => {
const [cart, setCart] = useState([]);
const [orderPlaced, setOrderPlaced] = useState(false);

const handlePlaceOrder = () => {
  setCart([]);
  setOrderPlaced(true);
  processOrder();
} 

const removeProduct = (productKey) => {
  console.log('remove clicked', productKey);
  const newCart = cart.filter(pd => pd.key !== productKey);
  setCart(newCart);
  removeFromDatabaseCart(productKey);
}
    useEffect(() =>{
     //cart
      const savedCart = getDatabaseCart();
      const productKeys = Object.keys(savedCart);

      const cartProducts = productKeys.map(key =>{
        const product = fakeData.find(pd => pd.key === key);
        product.quantity = savedCart[key];
        return product;
      });
      setCart(cartProducts);  
    }, []);
const pictureStyle =  {height:'600px',width:'1050px',border:'1px solid green', margin: '10px', padding: '10px'};
    let ThankYou;
     if(orderPlaced){
       ThankYou = <img style={pictureStyle} src={happyImage} alt="" />
     }

    return (
        <div className="twin-container">
            <div className="product-container">
             {
                 cart.map(pd => <ReviewItem
                    key={pd.key}
                    removeProduct = {removeProduct}
                    product={pd}> </ReviewItem>)
             } 
             {
               ThankYou
             }
            </div> 
             <div className="cart-container">
                <Cart cart ={cart}>
                  <button onClick={handlePlaceOrder} className="cart-button">Place Order</button>
                </Cart>
             </div>
        </div>
    );
};

export default Review;