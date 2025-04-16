
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Plant {
  id: number;
  name: string;
  type: string;
  image: string;
  quantity: number;
  price: number;
}

interface PlantListProps {
  plants: Plant[];
  onSelectPlant: (plant: Plant) => void;
  selectedPlantId: number | null;
}

const PlantList = ({ plants, onSelectPlant, selectedPlantId }: PlantListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#2A5D42] mb-4">Plant Inventory</h2>
      
      {plants.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">No plants found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {plants.map((plant) => (
            <Card 
              key={plant.id} 
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-md",
                selectedPlantId === plant.id 
                  ? "border-[#4A7C61] border-2" 
                  : "border-gray-200"
              )}
              onClick={() => onSelectPlant(plant)}
            >
              <div className="flex items-center p-3">
                <div className="w-16 h-16 flex-shrink-0">
                  <img 
                    src={plant.image} 
                    alt={plant.name} 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-medium">{plant.name}</h3>
                  <p className="text-sm text-gray-500">{plant.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#2A5D42]">${plant.price.toFixed(2)}</p>
                  <p className={cn(
                    "text-sm",
                    plant.quantity < 10 ? "text-red-500" : "text-gray-500"
                  )}>
                    {plant.quantity} in stock
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlantList;
