import Map from "./components/Map";
import { Improvement } from "models/Improvement"
import { useState } from 'react'


const App = () => {
  const [resources, setResources] = useState({
    Lumber: 5,
    Grain: 5,
    Water: 5,
    Sheep: 1

  });

  const [improvements, setImprovements] = useState ([])

  const improvementTypes = {
    House: {
      cost: {
        Lumber: 5,
        Grain: 5,
        Water: 5,
        Sheep: 1
      },
      produces: {People: 5}
    },
    Field: {
      cost: {
        People: 1,
        Water: 2
      },
      produces: {Grain: 10}
    },
    LumberMill: {
      cost: {Person: 1},
      produces: {Lumber: 10}
    },
    Pasture: {
      cost: {Grain: 3},
      produces: {Sheep: 1}
    },
    Well: {
      cost: {
        people: 1,
        Lumber: 2
      },
      produces: {water: 10}

    }
  }

  //checks resources for improvement
  const canPlaceImprovement = (type) => {
    const cost = improvementTypes[type].cost;
    return Object.
  }

const useResource = (resource: any, amount: any) => {
  setResources(prevState => ({
    ...prevState,
    [resource]: Math.max(0, prevState[resource] - amount),
  }));
}
  


  return (
    <div>
      <h1>Village Simulator</h1>
      <Map gridSize={5} /> {/* You can change this number if needed */}
    </div>
  );
};

export default App;
