
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PlantFormData {
  name: string;
  type: string;
  image: string;
  quantity: number;
  price: number;
  wateringFrequency: string;
  lightRequirements: string;
  description: string;
}

interface AddPlantFormProps {
  onAddPlant: (plant: PlantFormData) => void;
  onCancel: () => void;
}

const AddPlantForm = ({ onAddPlant, onCancel }: AddPlantFormProps) => {
  const [formData, setFormData] = useState<PlantFormData>({
    name: "",
    type: "Indoor",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800",
    quantity: 1,
    price: 19.99,
    wateringFrequency: "Weekly",
    lightRequirements: "Indirect light",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "quantity" || name === "price") {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setFormData({ ...formData, [name]: numValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPlant(formData);
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-[#2A5D42] mb-4">Add New Plant</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Plant Name*</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type*</Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border rounded-md border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#4A7C61]"
                required
              >
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Succulent">Succulent</option>
                <option value="Herb">Herb</option>
                <option value="Edible">Edible</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image URL*</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price*</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity*</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                step="1"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wateringFrequency">Watering Frequency*</Label>
              <Input
                id="wateringFrequency"
                name="wateringFrequency"
                value={formData.wateringFrequency}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lightRequirements">Light Requirements*</Label>
              <Input
                id="lightRequirements"
                name="lightRequirements"
                value={formData.lightRequirements}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description*</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>
          
          <div className="flex gap-2 justify-end pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-[#4A7C61] hover:bg-[#3A6D52]"
            >
              Add Plant
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddPlantForm;
