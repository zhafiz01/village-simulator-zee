import { useState } from "react";
import Map from "./components/Map";
import ResourcesView from "./components/ResourceView";
import "./App.sass";

const App = () => {
  const [resources, setResources] = useState({
    lumber: 5,
    grain: 5,
    water: 5,
    sheep: 1,
    people: 0,
  });

  return (
    <div>
      <h1>Village Simulator</h1>
      <ResourcesView resources={resources} />
      <Map gridSize={5} resources={resources} setResources={setResources} />
    </div>
  );
};

export default App;
