import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

const CartPage = lazy(() => import("cart/Page"));
const WishlistPage = lazy(() => import("wishlist/Page"));

function HomePage() {
  const navigate=useNavigate();
  return (
    <div>
      <h1>Homepage (Host)</h1>
      <p>Welcome to the Homepage!</p>
      <button style={{margin:"5px"}} onClick={()=>navigate("/cart")}>Go to cart</button>
      <button onClick={()=>navigate("/wishlist")}>Go to wishlist</button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: "sans-serif", padding: 16 }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart/*" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
