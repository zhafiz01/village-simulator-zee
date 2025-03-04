import { useState } from "react";
import Tile from "./Tile";
import AddImprovementDialog from "./AddImprovementDialog";
import "../Map.sass";

interface MapProps {
  gridSize: number;
  resources: {
    lumber: number;
    grain: number;
    water: number;
    sheep: number;
    people: number;
  };
  setResources: React.Dispatch<
    React.SetStateAction<{
      lumber: number;
      grain: number;
      water: number;
      sheep: number;
      people: number;
    }>
  >;
}

// Resource costs for each improvement
const improvementCosts = {
  House: { lumber: 5, grain: 5, water: 5, sheep: 1 },
  Field: { people: 1, water: 2 },
  Pasture: { people: 1, grain: 2, water: 2 },
  "Lumber Mill": { people: 1 },
  Well: { people: 1, lumber: 2 },
};

const Map = ({ gridSize, resources, setResources }: MapProps) => {
  const [tiles, setTiles] = useState<(string | null)[]>(
    Array(gridSize * gridSize).fill(null)
  );
  const [selectedTile, setSelectedTile] = useState<number | null>(null);

  const handleTileClick = (index: number) => {
    console.log(`Tile ${index} clicked`);
    setSelectedTile(index);
  };

  const handleCloseDialog = () => {
    setSelectedTile(null);
  };

  const hasEnoughResources = (cost: Partial<typeof resources>) => {
    return Object.entries(cost).every(
      ([key, value]) => resources[key as keyof typeof resources] >= value!
    );
  };

  const handleSelectImprovement = (improvement: string) => {
    if (selectedTile === null) return;

    const cost = improvementCosts[improvement as keyof typeof improvementCosts];

    if (!hasEnoughResources(cost)) {
      alert("Not enough resources to build this improvement!");
      return;
    }

    setResources((prev) => {
      const updated = { ...prev };

      // deduct the costs of improvements
      Object.entries(cost).forEach(([key, value]) => {
        updated[key as keyof typeof prev] -= value!;
      });

      // adds the benefits the improvements have
      switch (improvement) {
        case "House":
          updated.people += 5;
          break;
        case "Field":
          updated.grain += 10;
          break;
        case "Pasture":
          updated.sheep += 5;
          break;
        case "Lumber Mill":
          updated.lumber += 10;
          break;
        case "Well":
          updated.water += 10;
          break;
      }

      return updated;
    });

    setTiles((prevTiles) => {
      const newTiles = [...prevTiles];
      newTiles[selectedTile] = improvement;
      return newTiles;
    });

    setSelectedTile(null);
  };

  return (
    <div className="map">
      {tiles.map((improvement, index) => (
        <Tile
          key={index}
          index={index}
          improvement={improvement}
          onClick={handleTileClick}
        />
      ))}

      {selectedTile !== null && (
        <AddImprovementDialog
          tileIndex={selectedTile}
          onClose={handleCloseDialog}
          onSelectImprovement={handleSelectImprovement}
        />
      )}
    </div>
  );
};

export default Map;
