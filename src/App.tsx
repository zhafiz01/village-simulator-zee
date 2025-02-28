import Map from "./components/Map";
import { useState } from 'react'


const App = () => {
  const [resources, setResources] = useState<Resource[]>([
    {
      type: "lumberMill",
      amount: 5
    },
    {
      type: "Grain",
      amount: 5, 
    },
    {
      type: "Water",
      amount: 5, 
    },
    {
      type: "Sheep",
      amount: 1, 
    },
    {
      type: "People",
      amount: 0, 
    },
  ]);


  return (
    <div>
      <h1>Village Simulator</h1>
      <Map gridSize={5} /> {/* You can change this number if needed */}
    </div>
  );
};

export default App;
