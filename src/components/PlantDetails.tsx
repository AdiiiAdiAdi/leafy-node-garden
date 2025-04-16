
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Plant {
  id: number;
  name: string;
  type: string;
  image: string;
  quantity: number;
  price: number;
  wateringFrequency: string;
  lightRequirements: string;
  description: string;
}

interface PlantDetailsProps {
  plant: Plant;
  onDelete: (id: number) => void;
  onUpdateInventory: (id: number, quantity: number) => void;
}

const PlantDetails = ({ plant, onDelete, onUpdateInventory }: PlantDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newQuantity, setNewQuantity] = useState(plant.quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setNewQuantity(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateInventory(plant.id, newQuantity);
    setIsEditing(false);
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-0">
        <img 
          src={plant.image} 
          alt={plant.name} 
          className="w-full h-56 object-cover rounded-t-lg"
        />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-[#2A5D42]">{plant.name}</h2>
              <p className="text-gray-600">{plant.type}</p>
            </div>
            <p className="text-xl font-bold text-[#2A5D42]">${plant.price.toFixed(2)}</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">{plant.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="bg-[#F2FCE2] p-3 rounded-md">
                <p className="font-medium">Watering</p>
                <p className="text-gray-600">{plant.wateringFrequency}</p>
              </div>
              <div className="bg-[#F2FCE2] p-3 rounded-md">
                <p className="font-medium">Light</p>
                <p className="text-gray-600">{plant.lightRequirements}</p>
              </div>
            </div>

            <div className="bg-[#F9F9F7] p-4 rounded-md">
              <div className="flex justify-between items-center">
                <p className="font-medium">Inventory</p>
                {!isEditing && (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    variant="outline" 
                    size="sm"
                    className="text-[#2A5D42] border-[#2A5D42] hover:bg-[#F2FCE2]"
                  >
                    Update
                  </Button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
                  <Input
                    type="number"
                    value={newQuantity}
                    onChange={handleQuantityChange}
                    min="0"
                    className="w-24"
                  />
                  <Button 
                    type="submit"
                    size="sm"
                    className="bg-[#4A7C61] hover:bg-[#3A6D52]"
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setNewQuantity(plant.quantity);
                    }}
                  >
                    Cancel
                  </Button>
                </form>
              ) : (
                <p className={plant.quantity < 10 ? "text-red-500 font-bold" : ""}>
                  {plant.quantity} units in stock
                </p>
              )}
            </div>
          </div>

          <Button 
            onClick={() => onDelete(plant.id)}
            variant="destructive" 
            className="w-full"
          >
            Delete Plant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlantDetails;
