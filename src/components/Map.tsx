import { useState } from "react";
import Tile from "./Tile";
import AddImprovementDialog from "./AddImprovementDialog";
import "../Map.sass";

interface MapProps {
  gridSize: number;
}

const Map = ({ gridSize }: MapProps) => {
  const [tiles, setTiles] = useState<(string | null)[]>(Array(gridSize * gridSize).fill(null)); // Stores improvements

  const [selectedTile, setSelectedTile] = useState<number | null>(null); // Tracks selected tile

  const handleTileClick = (index: number) => {
    console.log(`Tile ${index} clicked`);
    setSelectedTile(index); // Opens dialog for selected tile
  };

  const handleCloseDialog = () => {
    setSelectedTile(null); // Closes the dialog
  };

  const handleSelectImprovement = (improvement: string) => {
    if (selectedTile !== null) {
      setTiles((prevTiles) => {
        const newTiles = [...prevTiles];
        newTiles[selectedTile] = improvement; // Places improvement on tile
        return newTiles;
      });
    }
    setSelectedTile(null); // Closes dialog after placing
  };

  return (
    <div className="map">
      {tiles.map((improvement, index) => (
        <Tile key={index} index={index} improvement={improvement} onClick={handleTileClick} />
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
