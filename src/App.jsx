import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import Checkout from './components/checkout';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Loading from './components/Loading'; 

const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));

const App = () => {
  return (
    <Suspense fallback={<Loading />}> {/* Use Loading component as fallback */}
      <Router>
        <div className="app-container">
          <Header /> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Suspense>
  );
};

export default App;
