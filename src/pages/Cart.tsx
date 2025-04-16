
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/CartItem";
import { ShoppingBag } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);
  
  const updateQuantity = (id: number, quantity: number) => {
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const handleCheckout = () => {
    // Store cart for the invoice
    localStorage.setItem("orderItems", JSON.stringify(cartItems));
    // Clear the cart
    localStorage.setItem("cart", JSON.stringify([]));
    navigate("/invoice");
  };
  
  return (
    <div className="min-h-screen bg-[#F9F9F7]">
      {/* Header */}
      <header className="bg-[#2A5D42] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">GreenLife Garden</h1>
          <Button 
            onClick={() => navigate("/")}
            className="bg-[#4A7C61] hover:bg-[#3A6D52] text-white"
          >
            Continue Shopping
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold text-[#2A5D42] mb-6">Your Shopping Cart</h2>
        
        {cartItems.length === 0 ? (
          <div className="bg-white p-10 rounded-lg shadow-sm text-center">
            <div className="flex flex-col items-center gap-4">
              <ShoppingBag className="h-16 w-16 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-700">Your cart is empty</h3>
              <p className="text-gray-500 mb-4">Looks like you haven't added any plants to your cart yet.</p>
              <Button 
                onClick={() => navigate("/")}
                className="bg-[#2A5D42] hover:bg-[#1A4D32] text-white"
              >
                Browse Plants
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h3 className="text-lg font-semibold border-b pb-4">Order Summary</h3>
                
                <div className="py-4">
                  <div className="flex justify-between mb-2">
                    <p>Subtotal</p>
                    <p>₹{calculateSubtotal().toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p>Shipping</p>
                    <p>₹100.00</p>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t mt-4 pt-4">
                    <p>Total</p>
                    <p>₹{(calculateSubtotal() + 100).toFixed(2)}</p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-[#2A5D42] hover:bg-[#1A4D32] text-white mt-4"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#2A5D42] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 GreenLife Garden</p>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
