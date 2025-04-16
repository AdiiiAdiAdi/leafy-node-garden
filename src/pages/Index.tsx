
import { useState, useEffect } from "react";
import PlantList from "../components/PlantList";
import PlantDetails from "../components/PlantDetails";
import AddPlantForm from "../components/AddPlantForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// This would later be fetched from your PHP backend
const initialPlants = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    type: "Indoor",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800",
    quantity: 15,
    price: 35.99,
    wateringFrequency: "Weekly",
    lightRequirements: "Indirect bright light",
    description: "The Swiss Cheese Plant, known for its iconic split leaves."
  },
  {
    id: 2,
    name: "Snake Plant",
    type: "Indoor",
    image: "https://images.unsplash.com/photo-1593482892420-9c85c09c83f4?auto=format&fit=crop&w=800",
    quantity: 28,
    price: 22.50,
    wateringFrequency: "Bi-weekly",
    lightRequirements: "Low to bright indirect",
    description: "Very low maintenance plant, perfect for beginners."
  },
  {
    id: 3,
    name: "Lavender",
    type: "Outdoor",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800",
    quantity: 42,
    price: 12.99,
    wateringFrequency: "When soil is dry",
    lightRequirements: "Full sun",
    description: "Aromatic herb with purple flowers, attracts butterflies."
  },
  {
    id: 4,
    name: "Peace Lily",
    type: "Indoor",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=800",
    quantity: 10,
    price: 28.50,
    wateringFrequency: "Weekly",
    lightRequirements: "Low to medium indirect",
    description: "Beautiful white flowers and air-purifying qualities."
  },
  {
    id: 5,
    name: "Tomato Plant",
    type: "Edible",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800",
    quantity: 35,
    price: 8.99,
    wateringFrequency: "Daily",
    lightRequirements: "Full sun",
    description: "Produces red fruits perfect for cooking."
  },
  {
    id: 6,
    name: "Fiddle Leaf Fig",
    type: "Indoor",
    image: "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=800",
    quantity: 8,
    price: 65.00,
    wateringFrequency: "Weekly",
    lightRequirements: "Bright indirect light",
    description: "Popular houseplant with large, violin-shaped leaves."
  }
];

const Index = () => {
  const [plants, setPlants] = useState(initialPlants);
  const [selectedPlant, setSelectedPlant] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  
  const handleSelectPlant = (plant: any) => {
    setSelectedPlant(plant);
    setShowAddForm(false);
  };
  
  const handleAddPlant = (newPlant: any) => {
    const plant = {
      ...newPlant,
      id: plants.length + 1
    };
    setPlants([...plants, plant]);
    setShowAddForm(false);
    setSelectedPlant(plant);
  };
  
  const handleDeletePlant = (id: number) => {
    setPlants(plants.filter(plant => plant.id !== id));
    if (selectedPlant && selectedPlant.id === id) {
      setSelectedPlant(null);
    }
  };
  
  const handleUpdateInventory = (id: number, newQuantity: number) => {
    setPlants(plants.map(plant => 
      plant.id === id ? { ...plant, quantity: newQuantity } : plant
    ));
    
    if (selectedPlant && selectedPlant.id === id) {
      setSelectedPlant({ ...selectedPlant, quantity: newQuantity });
    }
  };
  
  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || plant.type === filterType;
    return matchesSearch && matchesFilter;
  });
  
  const plantTypes = ["All", ...Array.from(new Set(plants.map(plant => plant.type)))];

  return (
    <div className="min-h-screen bg-[#F9F9F7]">
      {/* Header */}
      <header className="bg-[#2A5D42] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Green Thumb Nursery</h1>
          <Button 
            onClick={() => {
              setShowAddForm(true);
              setSelectedPlant(null);
            }}
            className="bg-[#4A7C61] hover:bg-[#3A6D52] text-white"
          >
            Add New Plant
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Search and Filter Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 border-gray-200"
              />
            </div>
            <div className="flex-shrink-0">
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full md:w-40 p-2 border rounded-md border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#4A7C61]"
              >
                {plantTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Plant List */}
          <div className="lg:w-1/2">
            <PlantList 
              plants={filteredPlants} 
              onSelectPlant={handleSelectPlant}
              selectedPlantId={selectedPlant?.id}
            />
          </div>

          {/* Right Side - Details or Add Form */}
          <div className="lg:w-1/2">
            {showAddForm ? (
              <AddPlantForm onAddPlant={handleAddPlant} onCancel={() => setShowAddForm(false)} />
            ) : selectedPlant ? (
              <PlantDetails 
                plant={selectedPlant} 
                onDelete={handleDeletePlant} 
                onUpdateInventory={handleUpdateInventory} 
              />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-sm text-center h-64 flex items-center justify-center">
                <div className="text-gray-500">
                  <p className="text-lg">Select a plant to view details or add a new plant</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#2A5D42] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Green Thumb Nursery</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
