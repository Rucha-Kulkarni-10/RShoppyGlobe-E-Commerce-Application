import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import axios from 'axios';
import './ProductDetails.css'; 
import Loading from './Loading'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); 
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products. Please try again later.'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query using name and description
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>

      {loading && <Loading />} 

      <div className="product-list">
        {error ? (
          <p>{error}</p> 
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p> 
        )}
      </div>
    </div>
  );
};

export default ProductList;
