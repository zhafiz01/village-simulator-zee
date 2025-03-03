import Map from "./components/Map";

const App = () => {
  return (
    <div>
      <h1>Village Simulator</h1>
      <Map gridSize={5} />
    </div>
  );
};

export default App;
