
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Printer, Check, Leaf } from "lucide-react";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Customer {
  name: string;
  email: string;
}

const Invoice = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [invoiceId] = useState(`INV-${Math.floor(100000 + Math.random() * 900000)}`);
  const [orderDate] = useState(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedItems = localStorage.getItem("orderItems");
    if (savedItems) {
      setOrderItems(JSON.parse(savedItems));
    }
    
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCustomer(JSON.parse(savedUser));
    }
  }, []);
  
  const calculateSubtotal = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="min-h-screen bg-[#F2FCE2]">
      {/* Header - hidden when printing */}
      <header className="bg-[#2A5D42] text-white p-4 shadow-md print:hidden">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center">
            <Leaf className="mr-2" /> GreenLife Garden
          </h1>
          <Button 
            onClick={() => navigate("/")}
            className="bg-[#4A7C61] hover:bg-[#3A6D52] text-white"
          >
            Continue Shopping
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4 print:p-0">
        {/* Success Message - hidden when printing */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3 print:hidden">
          <div className="bg-green-100 rounded-full p-1">
            <Check className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-green-800">Your order has been successfully placed!</p>
        </div>
        
        {/* Invoice Actions - hidden when printing */}
        <div className="flex justify-end gap-3 mb-4 print:hidden">
          <Button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#4A7C61] hover:bg-[#3A6D52]"
          >
            <Printer size={16} />
            Print Invoice
          </Button>
        </div>
        
        {/* Invoice */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8 max-w-4xl mx-auto border-2 border-[#8E9196]">
          {/* Invoice Header with Indian-inspired decorative pattern */}
          <div className="relative border-b-2 border-[#FDE1D3] pb-6 mb-6">
            <div className="absolute top-0 left-0 w-20 h-20 opacity-10" style={{
              backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\"><path d=\"M0,0 L40,40 M40,0 L0,40\" stroke=\"%236E59A5\" stroke-width=\"1\"/></svg>')"
            }}></div>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-[#6E59A5]">INVOICE</h2>
                <p className="text-gray-500">{invoiceId}</p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-semibold flex items-center justify-end">
                  <Leaf className="mr-2 text-[#2A5D42]" /> GreenLife Garden
                </h3>
                <p className="text-sm text-gray-500">123 Botanical Street</p>
                <p className="text-sm text-gray-500">Garden City, 560001</p>
                <p className="text-sm text-gray-500">contact@greenlife.com</p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20 opacity-10" style={{
              backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\"><path d=\"M0,0 L40,40 M40,0 L0,40\" stroke=\"%236E59A5\" stroke-width=\"1\"/></svg>')"
            }}></div>
          </div>
          
          {/* Customer & Order Info */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Bill To:</h4>
              <p className="font-semibold">{customer?.name || "Guest Customer"}</p>
              <p className="text-gray-600">{customer?.email || "guest@example.com"}</p>
            </div>
            <div className="text-right">
              <div className="mb-2">
                <span className="font-medium text-gray-700">Invoice Date:</span>
                <span className="ml-2">{orderDate}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium text-gray-700">Payment Method:</span>
                <span className="ml-2">Cash on Delivery</span>
              </div>
            </div>
          </div>
          
          {/* Order Items */}
          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-[#FEC6A1]">
                <th className="px-2 py-3 text-left">Item</th>
                <th className="px-2 py-3 text-right">Quantity</th>
                <th className="px-2 py-3 text-right">Unit Price</th>
                <th className="px-2 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="px-2 py-4">{item.name}</td>
                  <td className="px-2 py-4 text-right">{item.quantity}</td>
                  <td className="px-2 py-4 text-right">₹{item.price.toFixed(2)}</td>
                  <td className="px-2 py-4 text-right">₹{(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Totals */}
          <div className="border-t-2 border-[#FEC6A1] pt-4">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Subtotal</span>
              <span>₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Shipping</span>
              <span>₹100.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t-2 border-[#FEC6A1]">
              <span>Total</span>
              <span>₹{(calculateSubtotal() + 100).toFixed(2)}</span>
            </div>
          </div>
          
          {/* Thank You Note with Indian-inspired decorative elements */}
          <div className="mt-8 text-center text-gray-600 relative">
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-5">
              <svg viewBox="0 0 100 100" className="w-20 h-20">
                <path d="M50,0 L60,40 L100,50 L60,60 L50,100 L40,60 L0,50 L40,40 z" fill="#6E59A5" />
              </svg>
            </div>
            <p className="relative z-10">Thank you for shopping with GreenLife Garden!</p>
            <p className="relative z-10 text-sm mt-2">🌱 Grow with nature, flourish with us 🌱</p>
          </div>
        </div>
      </div>

      {/* Footer - hidden when printing */}
      <footer className="bg-[#2A5D42] text-white p-4 mt-8 print:hidden">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 GreenLife Garden</p>
        </div>
      </footer>
    </div>
  );
};

export default Invoice;

