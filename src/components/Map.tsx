import { useState } from "react";
import Tile from "./Tile";
import "../Map.sass";

interface MapProps {
  gridSize: number;
}

const Map = ({ gridSize }: MapProps) => {
  const [selectedTile, setSelectedTile] = useState<number | null>(null);

  const handleTileClick = (index: number) => {
    console.log(`Tile ${index} clicked`);
    setSelectedTile(index);
  };

  return (
    <div className="map" style={{
      display: "grid",
      gridTemplateColumns: `repeat(${gridSize}, 1fr)`, //might be redundant and not needed
      gridTemplateRows: `repeat(${gridSize}, 1fr)`, 
      width: "500px",
      height: "500px",
      gap: "4px",
      border: "2px solid #5a7d7c"
    }}>
      {Array(gridSize * gridSize)
        .fill(null)
        .map((_, index) => (
          <Tile key={index} index={index} onClick={handleTileClick} />
        ))}
    </div>
  );
};

export default Map;


