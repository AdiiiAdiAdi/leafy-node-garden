
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
}

const CartItem = ({
  id,
  name,
  price,
  image,
  quantity,
  updateQuantity,
  removeItem
}: CartItemProps) => {
  return (
    <div className="flex items-center border-b border-gray-200 py-4">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{name}</h3>
          <p className="ml-4">₹{(price * quantity).toFixed(2)}</p>
        </div>
        
        <div className="flex items-center justify-between text-sm mt-2">
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => updateQuantity(id, Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus size={14} />
            </Button>
            <span className="px-2">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => updateQuantity(id, quantity + 1)}
            >
              <Plus size={14} />
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-red-500 hover:text-red-700"
            onClick={() => removeItem(id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
