import { useState, useEffect } from "react";
import Tile from "./Tile";
import AddImprovementDialog from "./AddImprovementDialog";
import EditImprovementDialog from "./EditImprovementDialog";
import { Resources } from "../../models/Resources";

interface MapProps {
  gridSize: number;
  resources: Resources;
  setResources: React.Dispatch<React.SetStateAction<Resources>>;
  improvementsData: Record<string, { cost: Resources; benefit: Resources }>;
  resetKey: number;
}

const Map = ({ gridSize, resources, setResources, improvementsData, resetKey }: MapProps) => {
  const [tiles, setTiles] = useState<(string | null)[]>(Array(gridSize * gridSize).fill(null));
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const [improvementLevels, setImprovementLevels] = useState<Record<number, number>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    setTiles(Array(gridSize * gridSize).fill(null));
    setImprovementLevels({});
    setSelectedTile(null);
  }, [resetKey]);

  const handleTileClick = (index: number) => {
    setSelectedTile(index);
  };

  const handleCloseDialog = () => {
    setSelectedTile(null);
  };

  const handleSelectImprovement = (improvement: string) => {
    if (selectedTile === null) return;

    const { cost, benefit } = improvementsData[improvement];
    const canAfford = Object.entries(cost).every(
      ([key, value]) => resources[key as keyof Resources] >= value
    );

    if (!canAfford) {
      setPopupMessage("Not enough resources!");
      setShowPopup(true);
      return;
    }

    setResources((prev) => {
      const updated = { ...prev };
      Object.entries(cost).forEach(([key, value]) => updated[key as keyof Resources] -= value);
      Object.entries(benefit).forEach(([key, value]) => updated[key as keyof Resources] += value);
      return updated;
    });

    setTiles((prev) => {
      const newTiles = [...prev];
      newTiles[selectedTile] = improvement;
      return newTiles;
    });

    setImprovementLevels((prev) => ({ ...prev, [selectedTile]: 1 }));
    setSelectedTile(null);
  };

  const handleUpgrade = () => {
    if (selectedTile === null) return;
    const improvement = tiles[selectedTile];
    if (!improvement) return;

    const currentLevel = improvementLevels[selectedTile] || 1;
    const nextLevel = currentLevel + 1;

    const { cost, benefit } = improvementsData[improvement];

    const scaledCost = Object.fromEntries(
      Object.entries(cost).map(([key, value]) => [key, value * nextLevel])
    );

    const scaledBenefit = Object.fromEntries(
      Object.entries(benefit).map(([key, value]) => [key, value])
    );

    const canAfford = Object.entries(scaledCost).every(
      ([key, value]) => resources[key as keyof Resources] >= value
    );

    if (!canAfford) {
      setPopupMessage("Not enough resources!");
      setShowPopup(true);
      return;
    }

    setResources((prev) => {
      const updated = { ...prev };
      Object.entries(scaledCost).forEach(([key, value]) => updated[key as keyof Resources] -= value);
      Object.entries(scaledBenefit).forEach(([key, value]) => updated[key as keyof Resources] += value);
      return updated;
    });

    setImprovementLevels((prev) => ({
      ...prev,
      [selectedTile]: nextLevel,
    }));
  };

  const handleDowngrade = () => {
    if (selectedTile === null) return;
    const improvement = tiles[selectedTile];
    if (!improvement) return;

    const currentLevel = improvementLevels[selectedTile];
    if (currentLevel <= 1) {
      setPopupMessage("Cannot downgrade below level 1!");
      setShowPopup(true);
      return;
    }

    const { cost, benefit } = improvementsData[improvement];

    const scaledCost = Object.fromEntries(
      Object.entries(cost).map(([key, value]) => [key, value * currentLevel])
    );

    const scaledBenefit = Object.fromEntries(
      Object.entries(benefit).map(([key, value]) => [key, value])
    );

    setResources((prev) => {
      const updated = { ...prev };
      Object.entries(scaledCost).forEach(([key, value]) => updated[key as keyof Resources] += value);
      Object.entries(scaledBenefit).forEach(([key, value]) => {
        updated[key as keyof Resources] = Math.max(0, updated[key as keyof Resources] - value);
      });
      return updated;
    });

    setImprovementLevels((prev) => ({
      ...prev,
      [selectedTile]: currentLevel - 1,
    }));
  };

  const handleRemoveImprovement = () => {
    if (selectedTile === null) return;
    const improvement = tiles[selectedTile];
    const level = improvementLevels[selectedTile] || 1;

    if (improvement) {
      const { cost, benefit } = improvementsData[improvement];

      setResources((prev) => {
        const updated = { ...prev };
        Object.entries(cost).forEach(([key, value]) => updated[key as keyof Resources] += value * level);
        Object.entries(benefit).forEach(([key, value]) => {
          updated[key as keyof Resources] = Math.max(0, updated[key as keyof Resources] - value * level);
        });
        return updated;
      });
    }

    setTiles((prev) => {
      const newTiles = [...prev];
      newTiles[selectedTile] = null;
      return newTiles;
    });

    setImprovementLevels((prev) => {
      const updated = { ...prev };
      delete updated[selectedTile];
      return updated;
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
          level={improvementLevels[index] || 1}
          onClick={handleTileClick}
        />
      ))}

      {showPopup && (
        <>
          <div className="overlay" onClick={() => setShowPopup(false)} />
          <div className="popup-container">
            <h3>{popupMessage}</h3>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </>
      )}

      {selectedTile !== null && tiles[selectedTile] === null ? (
        <AddImprovementDialog
          tileIndex={selectedTile}
          onClose={handleCloseDialog}
          onSelectImprovement={handleSelectImprovement}
          improvementsData={improvementsData}
        />
      ) : (
        selectedTile !== null &&
        tiles[selectedTile] !== null && (
          <EditImprovementDialog
            improvement={tiles[selectedTile] as string}
            level={improvementLevels[selectedTile] || 1}
            resources={resources}
            onUpgrade={handleUpgrade}
            onDowngrade={handleDowngrade}
            onRemove={handleRemoveImprovement}
            onClose={handleCloseDialog}
            improvementsData={improvementsData}
          />
        )
      )}
    </div>
  );
};

export default Map;
