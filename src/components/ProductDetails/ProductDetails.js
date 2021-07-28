import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    return (
        <div>
            <h1>This Site is Working... Not Finished Yet!!!</h1>
            <h3>{productKey} Details Coming Soon!!!!</h3>
            <Product ShowAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;