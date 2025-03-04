import Map from "./components/Map";
import { Improvement } from "models/Improvement";
import { useState } from "react";

const App = () => {
  const [resources, setResources] = useState({
    Lumber: 5,
    Grain: 5,
    Water: 5,
    Sheep: 1,
  });

  const [improvements, setImprovements] = useState([]);

  const improvementTypes = [
    {
      name: "House",
      cost: [
        { type: "Lumber", amount: 5 },
        { type: "Grain", amount: 5 },
        { type: "Water", amount: 5 },
        { type: "Sheep", amount: 1 },
      ],
      produces: [{ type: "People", amount: 5 }],
    },
    {
      name: "Field",
      cost: [
        { type: "People", amount: 1 },
        { type: "Water", amount: 2 },
      ],
      produces: [{ type: "Grain", amount: 10 }],
    },
    {
      name: "Pasture",
      cost: [
        { type: "People", amount: 1 },
        { type: "Grain", amount: 2 },
        { type: "Water", amount: 2 },
      ],
      produces: [{ type: "Sheep", amount: 5 }],
    },
    {
      name: "Lumber Mill",
      cost: [{ type: "People", amount: 1 }],
      produces: [{ type: "Lumber", amount: 10 }],
    },
    {
      name: "Well",
      cost: [
        { type: "People", amount: 1 },
        { type: "Lumber", amount: 2 },
      ],
      produces: [{ type: "Water", amount: 10 }],
    },
  ];

  function handleResourceUpdate(_improvement: Improvement) {
    setResources((prevResources) => {
      const updatedResources = { ...prevResources };
      return updatedResources; // Ensure function returns updated state
    });
  }

  const canPlaceImprovement = (type: string) => {
    const improvement = improvementTypes.find((imp) => imp.name === type);
    if (!improvement) return false;

    return improvement.cost.every(({ type, amount }) => (resources[type] ?? 0) >= amount);
  };

  const placeImprovement = (type: String) => {
    const improvement = improvementTypes.find((imp) => imp.name === type);
    if (!improvement || !canPlaceImprovement(type)) return alert("Not enough resources!");

    const newResources = { ...resources };
    improvement.cost.forEach(({ type, amount }) => {
      newResources[type] -= amount;
    });

    setImprovements([...improvements, { type, level: 1 }]);
    setResources(newResources);
  };

  const generateResources = () => {
    const newResources = { ...resources };

    improvements.forEach(({ type, level }) => {
      const improvement = improvementTypes.find((imp) => imp.name === type);
      if (!improvement) return;

      improvement.produces.forEach(({ type, amount }) => {
        newResources[type] = (newResources[type] ?? 0) + amount * level;

      });
    });

    setResources(newResources);
  };

  return (
    <div>
      <h1>Village Simulator</h1>
      <Map gridSize={5} /> 
    </div>
  );
};

export default App;

