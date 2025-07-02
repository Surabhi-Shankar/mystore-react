import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import About from "./components/About";
import CartPage from "./components/CartPage";
import Contact from "./components/Contact";
import Shopping from "./components/Shopping";
import StoreTopbar from "./components/StoreTopbar";

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
        }
  });

  const [showAddNotification, setShowAddNotification] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    setShowAddNotification(true);
    setTimeout(() => setShowAddNotification(false), 2000);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart =>
      prevCart.filter(item => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const currentCartItemCount = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

  return (
    <>
      <StoreTopbar cartItemCount={currentCartItemCount} showAddNotification={showAddNotification} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Shopping addToCart={addToCart} />} />
          <Route path="/cart" element={
            <CartPage
              cartItems={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
